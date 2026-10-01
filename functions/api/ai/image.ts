// Cloudflare Pages Function — POST /api/ai/image
// 生产环境由 CF 边缘执行；本地 dev 走 app/api/ai/image/route.ts，逻辑完全一致。
// 后端：Agnes Images（agnes-image-2.5-flash，text-to-image）

const AGNES_BASE = 'https://apihub.agnes-ai.com/v1';
const AGNES_KEY = process.env.AGNES_API_KEY;
const AGNES_MODEL = 'agnes-image-2.5-flash';

const MODE_PROMPTS: Record<string, string> = {
  'white-bg': 'professional e-commerce product photography on a clean pure white background, studio lighting, high detail',
  'scene': 'lifestyle scene product photography, soft natural lighting, high detail',
  'multi-angle': 'product displayed from multiple angles on a clean background, studio lighting, high detail',
  'upscale': 'extreme close-up product photography, ultra high resolution, sharp 4K detail',
};

function jsonResp(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  try {
    const body = await context.request.json().catch(() => ({}));
    const { mode = 'white-bg', style } = body;

    const parts = [MODE_PROMPTS[mode] || MODE_PROMPTS['white-bg']];
    if (style && String(style).trim()) parts.push(String(style).trim());
    parts.push('photorealistic product image');
    const prompt = parts.join(', ');

    // Agnes 偶发 502（瞬态），失败后等 3s 自动重试一次
    let data: any = null;
    let lastErr = '';
    for (let attempt = 0; attempt < 2; attempt++) {
      if (attempt > 0) await new Promise(r => setTimeout(r, 3000));
      const resp = await fetch(`${AGNES_BASE}/images/generations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AGNES_KEY}` },
        body: JSON.stringify({ model: AGNES_MODEL, prompt, n: 1 }),
      });
      data = await resp.json();
      lastErr = data?.error?.message || '';
      if (data?.data?.[0]?.url) break;
    }
    const url = data?.data?.[0]?.url;
    if (!url) {
      return jsonResp({ success: false, message: lastErr || 'Image generation failed' }, 502);
    }
    return jsonResp({ success: true, data: url, mode, style });
  } catch (e: any) {
    return jsonResp({ error: e?.message }, 500);
  }
}
