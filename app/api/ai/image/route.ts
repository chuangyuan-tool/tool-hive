import { NextRequest, NextResponse } from 'next/server';

// AI 产品图生成 API（后端：Agnes Images，agnes-image-2.5-flash，text-to-image）
// POST /api/ai/image
// Body: { image?: string (base64，用户参考图), mode: 'white-bg'|'scene'|'multi-angle'|'upscale', style?: string }
// 说明：Agnes 当前为 text2image 模型，实际出图由 mode + style 提示词驱动，上传图片作参考。
// 线上生产走 Cloudflare Pages Function（functions/api/ai/image.ts），本文件仅供本地 dev。

const AGNES_BASE = 'https://apihub.agnes-ai.com/v1';
const AGNES_KEY = 'sk-IbgczHpeYRe3LIP3xZlWwcf35cHxxIrrqpGPeCwDr6zAqBDK';
const AGNES_MODEL = 'agnes-image-2.5-flash';

const MODE_PROMPTS: Record<string, string> = {
  'white-bg': 'professional e-commerce product photography on a clean pure white background, studio lighting, high detail',
  'scene': 'lifestyle scene product photography, soft natural lighting, high detail',
  'multi-angle': 'product displayed from multiple angles on a clean background, studio lighting, high detail',
  'upscale': 'extreme close-up product photography, ultra high resolution, sharp 4K detail',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode = 'white-bg', style } = body as { mode?: string; style?: string };

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
      return NextResponse.json(
        { success: false, message: lastErr || 'Image generation failed' },
        { status: 502 },
      );
    }
    return NextResponse.json({ success: true, data: url, mode, style });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
