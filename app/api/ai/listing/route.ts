import { NextRequest, NextResponse } from 'next/server';

// AI Listing 生成 API（后端：Agnes 直连，agnes-3.0-flash）
// POST /api/ai/listing
// Body: { product: { name, category, features, price, brand, audience }, platform: string, langs: string[] }
// 线上生产走 Cloudflare Pages Function（functions/api/ai/listing.ts），本文件仅供本地 dev

const RELAY_BASE = 'https://apihub.agnes-ai.com/v1';
const API_KEY = 'sk-IbgczHpeYRe3LIP3xZlWwcf35cHxxIrrqpGPeCwDr6zAqBDK';
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product, platform = 'amazon', langs = ['en'] } = body;

    if (!product?.name) {
      return NextResponse.json({ error: 'product.name is required' }, { status: 400 });
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

      const resp = await fetch(`${RELAY_BASE}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
        body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: prompt }], temperature: 0.7 }),
      });
      const data = await resp.json();
      const raw = data.choices?.[0]?.message?.content || '{}';
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      results[lang] = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw };
    }

    return NextResponse.json({ success: true, data: results });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Internal error' }, { status: 500 });
  }
}
