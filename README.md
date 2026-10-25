# ToolHive

**Free online developer tools that run entirely in your browser.** No uploads, no accounts required, no data leaving your machine.

Live site: **https://toolhive.com.cn**

---

## Why another tool site?

Most "free online tool" sites upload your input to a server, gate the result behind a signup wall, or bury it under ads. ToolHive runs the actual computation in your browser tab using the File API, Web Crypto and Canvas — your JSON, JWTs, passwords and images never touch a server.

Every tool works without an account. The optional paid tiers exist only for higher usage limits and the AI-backed tools.

## Tools

### Developer

| Tool | What it does |
|---|---|
| [JSON Formatter](https://toolhive.com.cn/tools/json-formatter) | Format, validate, minify JSON and auto-generate TypeScript types |
| [Base64 Converter](https://toolhive.com.cn/tools/base64-converter) | Encode/decode Base64 with UTF-8 and binary safety |
| [JWT Decoder](https://toolhive.com.cn/tools/jwt-decoder) | Inspect header, payload and expiry claims without uploading the token |
| [Hash Calculator](https://toolhive.com.cn/tools/hash-calculator) | MD5, SHA-1, SHA-256, SHA-512 via Web Crypto |
| [Timestamp Converter](https://toolhive.com.cn/tools/timestamp-converter) | Unix epoch to human dates with timezone support |
| [UUID Generator](https://toolhive.com.cn/tools/uuid-generator) | Bulk UUID v4 and time-ordered v7 |
| [URL Encoder / Decoder](https://toolhive.com.cn/tools/url-codec) | Percent-encoding for URLs and query strings |
| [Regex Tester](https://toolhive.com.cn/tools/regex-tester) | Live highlighting, capture groups, flag toggles |
| [Cron Generator](https://toolhive.com.cn/tools/cron-generator) | Build cron expressions with plain-English explanation |
| [Text Diff](https://toolhive.com.cn/tools/text-diff) | Word-level diff between two text blocks |

### Design and Media

| Tool | What it does |
|---|---|
| [Color Picker](https://toolhive.com.cn/tools/color-picker) | HEX/RGB/HSL conversion plus WCAG contrast checking |
| [Image Compressor](https://toolhive.com.cn/tools/image-compressor) | Shrink JPG/PNG/WebP locally with before/after sizes |

### Data and Utility

| Tool | What it does |
|---|---|
| [CSV to JSON](https://toolhive.com.cn/tools/csv-to-json) | Two-way CSV/JSON with quoted-field handling |
| [Unit Converter](https://toolhive.com.cn/tools/unit-converter) | Length, weight, temperature, area, volume, data size |
| [QR Code Generator](https://toolhive.com.cn/tools/qrcode) | Generate and scan QR codes for URLs, text, Wi-Fi, vCard |

### Writing

| Tool | What it does |
|---|---|
| [Markdown Preview](https://toolhive.com.cn/tools/markdown-preview) | GitHub-style live preview with tables and code fences |

### AI-assisted

These three call a model server-side, so they need network access and are rate-limited on the free tier.

| Tool | What it does |
|---|---|
| [AI Listing Generator](https://toolhive.com.cn/tools/ai-listing) | Multi-language product listings for Amazon, Shopify, TikTok, Temu |
| [AI Product Image](https://toolhive.com.cn/tools/ai-product-image) | Product photo to white background, scene or high-res |
| [E-commerce Automation](https://toolhive.com.cn/tools/ecom-automation) | Ready-made no-code workflows for store ops |

## Tech stack

- **Next.js 14** (App Router) with `output: 'export'` — fully static HTML, no Node server needed
- **React 18** + **TypeScript** + **Tailwind CSS**
- **Cloudflare Pages** for hosting, with Pages Functions for the three AI endpoints
- No backend database. Nothing to leak.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Build and deploy

```bash
npm run build
```

That writes a static site to `out/`. Pushing to `master` triggers an automatic Cloudflare Pages build and deploy. Manual deploy, if ever needed:

```bash
npx wrangler pages deploy out --project-name tool-hive
```

The AI endpoints in `functions/api/ai/` read `AGNES_API_KEY` from the Pages environment. Without it those three tools return a graceful error; every other tool keeps working.

## Pricing

| Plan | Price | Notes |
|---|---|---|
| Free | $0 | All browser-side tools, 3 AI uses/day |
| Pro | $9/mo | Unlimited usage, AI access, ad-free |
| Team | $29/mo | Up to 5 seats, API access |

Checkout runs through Creem (card, crypto, PayPal). USDT (TRC20) is also accepted directly.

## Project layout

```
app/                  Next.js App Router pages
  tools/<slug>/        one page per tool (metadata from lib/tool-seo.ts)
  sitemap.ts           generated sitemap.xml
  robots.ts            generated robots.txt
components/tools/     the actual tool implementations (client-side)
functions/api/ai/     Pages Functions for the AI tools
lib/tools-data.ts     the registry of tools shown on /tools
lib/tool-seo.ts       per-tool titles, descriptions and index flags
```

## Adding a tool

1. Build the component in `components/tools/`.
2. Add a thin page at `app/tools/<slug>/page.tsx` (copy an existing one, swap the component and slug).
3. Add a matching entry to `lib/tool-seo.ts` — the page will not build without it.
4. To make it visible in navigation, add a record to `lib/tools-data.ts`.

Setting `live: false` in `lib/tool-seo.ts` keeps a tool reachable by direct URL but marks it `noindex` and leaves it out of the sitemap, which is useful for staged rollouts.

## License

Source is published for transparency and review. All rights reserved. This is not an open-source grant. If you want to reuse a specific piece, open an issue and ask.
