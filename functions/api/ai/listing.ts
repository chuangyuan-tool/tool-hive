// Cloudflare Pages Function - POST /api/ai/listing
// CF edge (toolhive.com.cn / tool-hive.pages.dev); local dev uses app/api/ai/listing/route.ts
// Backend: Agnes API (chat, agnes-3.0-flash)

const AGNES_BASE = 'https://apihub.agnes-ai.com/v1';
// key via context.env.AGNES_API_KEY
const MODEL = 'agnes-3.0-flash';

const LANG_NAMES: Record<string, string> = {
  en: 'English', ja: '日本語', de: 'Deutsch', fr: 'Français', es: 'Español',
  pt: 'Português', it: 'Italiano', nl: 'Nederlands', ko: '한국어', ar: 'العربية',
};

const PLATFORM_REQS: Record<string, any> = {
  amazon: { title: 'Max 200 chars, main keywords, brand first', description: 'HTML-friendly, 2000 chars max', bullets: '5 points, each max 200 chars, benefit-driven', keywords: '5 backend search terms, 50 bytes' },
  shopify: { title: 'Clean, brand + product + variant', description: 'Rich text, 1500 chars, storytelling', bullets: '3-5 selling points', keywords: 'Meta keywords for SEO' },
  tiktok: { title: 'Short punchy, under 50 chars, hook + CTA', description: 'Casual, emoji-friendly, 500 chars', bullets: '3 selling points, trending', keywords: 'Hashtags 5-10' },
  temu: { title: 'Keyword-stuffed 80 chars', description: 'Specs-focused, 500 chars', bullets: '3-5 specs', keywords: 'High-volume search terms' },
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
      if (isWaf && i < retries - 1) { lastResp = null; continue; }
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

      const result = await safeFetch(`${AGNES_BASE}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${context.env.AGNES_API_KEY}` },
        body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: prompt }], temperature: 0.7 }),
      });

      if (result.wafBlocked) {
        return jsonResp({ success: false, waf: true, message: 'CF edge WAF blocked (1015), client fallback should handle' }, 502);
      }
      if (!result.ok) {
        return jsonResp({ success: false, message: result.data?.error?.message || `HTTP ${result.status}` }, 502);
      }
      const raw = result.data.choices?.[0]?.message?.content || '{}';
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      results[lang] = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw };
    }

    return jsonResp({ success: true, data: results });
  } catch (e: any) {
    return jsonResp({ error: e?.message || 'Internal error' }, 500);
  }
}
