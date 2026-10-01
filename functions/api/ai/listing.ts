// Cloudflare Pages Function — POST /api/ai/listing
// 生产环境（toolhive.com.cn / tool-hive.pages.dev）由 CF 边缘执行本文件；
// 本地 npm run dev 走 app/api/ai/listing/route.ts，逻辑完全一致。
// 后端：Agnes API（chat，agnes-3.0-flash）

const AGNES_BASE = 'https://apihub.agnes-ai.com/v1';
const AGNES_KEY = process.env.AGNES_API_KEY;
const MODEL = 'agnes-3.0-flash';

const LANG_NAMES: Record<string, string> = {
  en: 'English', ja: '日本語', de: 'Deutsch', fr: 'Français', es: 'Español',
  pt: 'Português', it: 'Italiano', nl: 'Nederlands', ko: '한국어', ar: 'العربية',
};

const PLATFORM_REQS: Record<string, any> = {
  amazon: { title: 'Max 200 chars, main keywords, brand first', description: 'HTML-friendly, 2000 chars max', bullets: '5 points, each max 200 chars, benefit-driven', keywords: '5 backend search terms, 50 bytes' },
  shopify: { title: 'Clean, brand + product + variant', description: 'Rich text, 1500 chars, storytelling', bullets: '3-5 key features', keywords: 'Meta keywords for SEO' },
  tiktok: { title: 'Short punchy, under 50 chars, hook + CTA', description: 'Casual, emoji-friendly, 500 chars', bullets: '3 selling points, trending', keywords: 'Hashtags 5-10' },
  temu: { title: 'Keyword-stuffed 80 chars', description: 'Specs-focused 500 chars', bullets: '3-5 specs', keywords: 'High-volume search terms' },
};

function jsonResp(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  try {
    const body = await context.request.json();
    const { product, platform = 'amazon', langs = ['en'] } = body;

    if (!product?.name) {
      return jsonResp({ error: 'product.name is required' }, 400);
    }

    const pr = PLATFORM_REQS[platform] || PLATFORM_REQS.amazon;
    const results: Record<string, any> = {};

    for (const lang of langs) {
      const langName = LANG_NAMES[lang] || lang;
      const prompt = `You are a professional cross-border e-commerce copywriter. Generate a product listing in ${langName} (${lang}) for ${platform.toUpperCase()}.

Product: ${product.name} | Category: ${product.category || 'general'} | Features: ${product.features || 'N/A'} | Brand: ${product.brand || 'Generic'}

Requirements:
- Title: ${pr.title}
- Description: ${pr.description}
- Bullets: ${pr.bullets}
- Keywords: ${pr.keywords}

Return ONLY valid JSON: {"title":"","description":"","bullets":[],"keywords":[]}`;

      const resp = await fetch(`${AGNES_BASE}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AGNES_KEY}` },
        body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: prompt }], temperature: 0.7 }),
      });
      const data = await resp.json();
      const raw = data.choices?.[0]?.message?.content || '{}';
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      results[lang] = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw };
    }

    return jsonResp({ success: true, data: results });
  } catch (e: any) {
    return jsonResp({ error: e?.message || 'Internal error' }, 500);
  }
}
