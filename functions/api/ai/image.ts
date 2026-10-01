// Cloudflare Pages Function - POST /api/ai/image
// CF edge; local dev uses app/api/ai/image/route.ts
// Backend: Agnes Images (agnes-image-2.5-flash, text-to-image)

const AGNES_BASE = 'https://apihub.agnes-ai.com/v1';
// key via context.env.AGNES_API_KEY
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

async function safeFetch(url: string, opts: RequestInit, retries = 3): Promise<{ ok: boolean; status: number; data: any; wafBlocked: boolean }> {
  let lastResp: Response | null = null;
  for (let i = 0; i < retries; i++) {
    if (i > 0) await new Promise(r => setTimeout(r, 2000));
    try {
      lastResp = await fetch(url, opts);
      const text = await lastResp.text();
      let data: any;
      try { data = JSON.parse(text); } catch { data = { raw: text.substring(0, 200) }; }
      const isWaf = !lastResp.ok && /error code: 1\d{3}/.test(data.raw || '');
      return { ok: lastResp.ok, status: lastResp.status, data, wafBlocked: isWaf };
    } catch (e: any) {
      if (i < retries - 1) continue;
      return { ok: false, status: 0, data: { message: e?.message }, wafBlocked: false };
    }
  }
  return { ok: false, status: lastResp?.status || 0, data: {}, wafBlocked: false };
}

export async function onRequestPost(context: { request: Request; env: Record<string, string> }): Promise<Response> {
  try {
    const body = await context.request.json().catch(() => ({}));
    const { mode = 'white-bg', style } = body;

    const parts = [MODE_PROMPTS[mode] || MODE_PROMPTS['white-bg']];
    if (style && String(style).trim()) parts.push(String(style.trim()));
    parts.push('photorealistic product image');
    const prompt = parts.join(', ');

    const result = await safeFetch(`${AGNES_BASE}/images/generations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${context.env.AGNES_API_KEY}` },
      body: JSON.stringify({ model: AGNES_MODEL, prompt, n: 1 }),
    });

    if (result.wafBlocked) {
      return jsonResp({ success: false, waf: true, message: 'CF edge WAF blocked (1015), client fallback should handle' }, 502);
    }
    if (!result.ok) {
      return jsonResp({ success: false, message: result.data?.error?.message || `HTTP ${result.status}` }, 502);
    }
    const url = result.data?.data?.[0]?.url;
    if (!url) {
      return jsonResp({ success: false, message: result.data?.error?.message || 'No image URL in response' }, 502);
    }
    return jsonResp({ success: true, data: url, mode, style });
  } catch (e: any) {
    return jsonResp({ error: e?.message || 'Internal error' }, 500);
  }
}