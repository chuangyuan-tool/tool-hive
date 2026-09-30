// 客户端 AI 调用（浏览器端，'use client' 组件使用）
// 策略：先走站内 /api/ai/*（本地 dev 必通；生产 CF Functions 因 CF 出口被 Agnes WAF 拦 1015 → 自动回退），
// 回退 = 浏览器直连 Agnes（已验证 CORS 全开：ACAO=* / ACAH=* / ACAM=POST）。
// 注意：AGNES_KEY 为老板的 Agnes 免费档 key，会打进前端 bundle（公网可见，风险=配额被白嫖）。
// 规模起来后建议换成独立服务端 relay（如 E:\Data\Tools\agnes-gateway），把 key 藏到服务端。

const AGNES_BASE = 'https://apihub.agnes-ai.com/v1';
const AGNES_KEY = 'sk-IbgczHpeYRe3LIP3xZlWwcf35cHxxIrrqpGPeCwDr6zAqBDK';
const CHAT_MODEL = 'agnes-3.0-flash';
const IMAGE_MODEL = 'agnes-image-2.5-flash';

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

const MODE_PROMPTS: Record<string, string> = {
  'white-bg': 'professional e-commerce product photography on a clean pure white background, studio lighting, high detail',
  'scene': 'lifestyle scene product photography, soft natural lighting, high detail',
  'multi-angle': 'product displayed from multiple angles on a clean background, studio lighting, high detail',
  'upscale': 'extreme close-up product photography, ultra high resolution, sharp 4K detail',
};

async function agnesChat(prompt: string): Promise<string> {
  const resp = await fetch(`${AGNES_BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AGNES_KEY}` },
    body: JSON.stringify({ model: CHAT_MODEL, messages: [{ role: 'user', content: prompt }], temperature: 0.7 }),
  });
  const data = await resp.json();
  return data.choices?.[0]?.message?.content || '{}';
}

export interface ListingArgs {
  product: { name: string; category?: string; features?: string; brand?: string; price?: string };
  platform: string;
  langs: string[];
}

export async function generateListing(args: ListingArgs): Promise<{ success: boolean; data?: Record<string, any>; error?: string }> {
  // 1) 站内 API 优先（本地 dev；生产若 CF 已放行也会走这里）
  try {
    const res = await fetch('/api/ai/listing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) return data; // 成功（或 API 明确返回的业务错误）
    // 非 2xx → 落到回退
  } catch (e) {}
  // 2) 回退：浏览器直连 Agnes
  const { product, platform = 'amazon', langs = ['en'] } = args;
  if (!product?.name) return { success: false, error: 'product.name is required' };
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
    const raw = await agnesChat(prompt);
    const m = raw.match(/\{[\s\S]*\}/);
    results[lang] = m ? JSON.parse(m[0]) : { raw };
  }
  return { success: true, data: results };
}

export async function generateProductImage(args: { mode?: string; style?: string }): Promise<{ success: boolean; data?: string; message?: string; error?: string }> {
  // 1) 站内 API 优先
  try {
    const res = await fetch('/api/ai/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) return data;
  } catch (e) {}
  // 2) 回退：浏览器直连 Agnes（瞬态 502 自动重试一次）
  const mode = args.mode || 'white-bg';
  const parts = [MODE_PROMPTS[mode] || MODE_PROMPTS['white-bg']];
  if (args.style && String(args.style).trim()) parts.push(String(args.style).trim());
  parts.push('photorealistic product image');
  const prompt = parts.join(', ');
  let data: any = null;
  let lastErr = '';
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) await new Promise(r => setTimeout(r, 3000));
    try {
      const resp = await fetch(`${AGNES_BASE}/images/generations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AGNES_KEY}` },
        body: JSON.stringify({ model: IMAGE_MODEL, prompt, n: 1 }),
      });
      data = await resp.json();
      lastErr = data?.error?.message || '';
      if (data?.data?.[0]?.url) break;
    } catch (e: any) {
      lastErr = e.message;
    }
  }
  const url = data?.data?.[0]?.url;
  return url
    ? { success: true, data: url, message: args.style }
    : { success: false, message: lastErr || 'Image generation failed' };
}
