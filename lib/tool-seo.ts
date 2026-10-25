import type { Metadata } from 'next';

/**
 * 每个工具页的独立 SEO 标题与描述。
 *
 * 为什么需要：静态导出（output: 'export'）下，所有子页面默认继承
 * app/layout.tsx 的同一个 <title>，Google 会把 46 个页面当成同一页，
 * 工具站等于白做 SEO。这里给每个 slug 配唯一的 title/description/canonical。
 *
 * 用法（工具页 page.tsx 里两行）：
 *   import { toolMetadata } from '@/lib/tool-seo';
 *   export const metadata = toolMetadata('json-formatter');
 */

const BASE_URL = 'https://toolhive.com.cn';

interface SeoEntry {
  title: string;
  description: string;
  /** true = 已上架（进 sitemap、允许索引）；false = 储备池（noindex） */
  live: boolean;
}

export const toolSeo: Record<string, SeoEntry> = {
  'json-formatter': {
    title: 'JSON Formatter & Validator — Beautify or Minify JSON',
    description:
      'Format, validate and minify JSON in your browser and auto-generate TypeScript types from any payload. Nothing is uploaded — 100% client-side.',
    live: true,
  },
  'password-generator': {
    title: 'Strong Password Generator — Free, Offline, No Signup',
    description:
      'Create strong random passwords with adjustable length, symbols and real-time strength analysis. Generated locally in your browser, never sent to a server.',
    live: true,
  },
  'base64-converter': {
    title: 'Base64 Encoder & Decoder — Free Online Converter',
    description:
      'Encode text or files to Base64 and decode Base64 back to plain text instantly. Handles UTF-8 and binary safely, entirely in your browser.',
    live: true,
  },
  'color-picker': {
    title: 'Color Picker — HEX/RGB Converter & WCAG Contrast Checker',
    description:
      'Pick colors, convert between HEX, RGB and HSL, and check WCAG contrast ratios for accessible text. Free, instant, no signup required.',
    live: true,
  },
  'image-compressor': {
    title: 'Image Compressor — Shrink JPG, PNG & WebP in Browser',
    description:
      'Compress JPG, PNG and WebP images without uploading them anywhere. Adjustable quality with instant before/after size comparison.',
    live: true,
  },
  'csv-to-json': {
    title: 'CSV to JSON Converter — Free Online, No Upload',
    description:
      'Convert CSV to JSON and JSON back to CSV with clean client-side parsing. Handles quoted fields, custom delimiters and nested output.',
    live: true,
  },
  'ai-listing': {
    title: 'AI Listing Generator for Amazon, Shopify, TikTok & Temu',
    description:
      'Turn a product name and a few keywords into multi-language marketplace listings — titles, bullet points and descriptions — in one click.',
    live: true,
  },
  'ai-product-image': {
    title: 'AI Product Image Generator — White Background & Scene Shots',
    description:
      'Turn a plain product photo into a clean white-background shot, a lifestyle scene or a high-resolution version with AI.',
    live: true,
  },
  'ecom-automation': {
    title: 'E-commerce Automation Workflows — No Code Required',
    description:
      'Ready-made no-code workflows for order sync, review replies, daily reports and price monitoring across your online store.',
    live: true,
  },
  'hash-calculator': {
    title: 'MD5, SHA-1, SHA-256 & SHA-512 Hash Generator',
    description:
      'Generate MD5, SHA-1, SHA-256 and SHA-512 hashes for any text instantly. Runs locally in your browser — no data ever leaves your device.',
    live: true,
  },
  'timestamp-converter': {
    title: 'Unix Timestamp Converter — Epoch to Date and Back',
    description:
      'Convert Unix timestamps to human-readable dates and back, with timezone support and a live current-epoch clock.',
    live: true,
  },
  'uuid-generator': {
    title: 'UUID Generator — Bulk v4 and v7 Identifiers',
    description:
      'Generate UUID v4 and time-ordered UUID v7 identifiers in bulk. Copy-ready output for databases, APIs and test fixtures.',
    live: true,
  },
  'url-codec': {
    title: 'URL Encoder & Decoder — Percent-Encoding Tool',
    description:
      'Encode and decode URL components, query strings and percent-encoding safely. Handles full URLs, parameters and UTF-8 characters.',
    live: true,
  },
  qrcode: {
    title: 'QR Code Generator & Scanner — URL, Text, Wi-Fi, vCard',
    description:
      'Create QR codes for links, plain text, Wi-Fi credentials and vCards with adjustable size and error correction. Scan existing codes too.',
    live: true,
  },
  'regex-tester': {
    title: 'Regex Tester — Live Highlighting and Match Groups',
    description:
      'Test regular expressions against sample text with live highlighting, capture groups and flag toggles. JavaScript regex flavour.',
    live: true,
  },
  'cron-generator': {
    title: 'Cron Expression Generator & Plain-English Explainer',
    description:
      'Build cron expressions visually, decode any schedule into plain English and preview the next run times before you deploy.',
    live: true,
  },
  'unit-converter': {
    title: 'Unit Converter — Length, Weight, Temperature & Data Size',
    description:
      'Convert length, weight, temperature, area, volume, speed and data sizes across metric and imperial units instantly.',
    live: true,
  },
  'markdown-preview': {
    title: 'Markdown Preview & Editor — GitHub-Style Rendering',
    description:
      'Write Markdown and see a GitHub-style HTML preview live. Supports tables, fenced code blocks, task lists and headings.',
    live: true,
  },
  'jwt-decoder': {
    title: 'JWT Decoder — Inspect Header, Payload and Expiry',
    description:
      'Decode and inspect JSON Web Tokens: header, payload and expiry claims. No upload, no token ever leaves your browser.',
    live: true,
  },
  'text-diff': {
    title: 'Text Diff Checker — Compare Two Texts Word by Word',
    description:
      'Compare two blocks of text and highlight added and removed words instantly. Handy for copy edits, config changes and proofreading.',
    live: true,
  },

  // ---- 储备池：页面可访问但未上架，noindex 避免稀释索引 ----
  'word-counter': {
    title: 'Word Counter — Words, Characters and Reading Time',
    description:
      'Count words, characters, sentences, paragraphs and estimated reading time as you type. Free and fully offline.',
    live: false,
  },
  'case-converter': {
    title: 'Case Converter — UPPER, lower, Title, camelCase',
    description:
      'Convert text between UPPERCASE, lowercase, Title Case, sentence case, camelCase, snake_case and kebab-case.',
    live: false,
  },
  'number-base': {
    title: 'Number Base Converter — Binary, Octal, Decimal, Hex',
    description:
      'Convert numbers between binary, octal, decimal and hexadecimal instantly, with invalid-digit detection.',
    live: false,
  },
  'slug-generator': {
    title: 'URL Slug Generator — Clean SEO-Friendly Slugs',
    description:
      'Turn any title into a clean lowercase URL slug with accent stripping and custom separator options.',
    live: false,
  },
  'json-validator': {
    title: 'JSON Validator — Find Syntax Errors Online',
    description:
      'Validate JSON and get the exact error position, plus a pretty-printed copy of any valid document.',
    live: false,
  },
  'base-converter': {
    title: 'Base Converter — Arbitrary Radix Number Tool',
    description:
      'Convert numbers between any base from 2 to 36 with instant validation and copy-ready output.',
    live: false,
  },
  'css-minifier': {
    title: 'CSS Minifier — Compress Stylesheets Online',
    description:
      'Minify CSS by stripping comments and redundant whitespace, with a live readout of bytes saved.',
    live: false,
  },
  'data-convert': {
    title: 'YAML, JSON and XML Converter',
    description:
      'Convert between YAML, JSON and XML with clean structured parsing, all in your browser.',
    live: false,
  },
  'lorem-ipsum': {
    title: 'Lorem Ipsum Generator — Paragraphs, Sentences, Words',
    description:
      'Generate lorem ipsum placeholder text by paragraph, sentence or word count for mockups and layouts.',
    live: false,
  },
  'text-tools': {
    title: 'Text Tools — Deduplicate, Trim and Clean Text',
    description:
      'Remove duplicate lines, trim whitespace, drop empty lines and clean up messy text lists in one pass.',
    live: false,
  },
};

/**
 * 生成某个工具页的 Metadata。
 * canonical 固定指向正式域名，避免 CF Pages 预览域名被当成重复内容。
 */
export function toolMetadata(slug: string): Metadata {
  const entry = toolSeo[slug];
  if (!entry) {
    throw new Error(`tool-seo: 缺少 slug "${slug}" 的 SEO 数据，请先在 toolSeo 里补一条`);
  }

  const url = `${BASE_URL}/tools/${slug}`;

  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: url },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url,
      siteName: 'ToolHive',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description: entry.description,
    },
    // 储备池工具：可访问但不进索引，等老板拍板上架再翻成 true
    robots: entry.live ? undefined : { index: false, follow: true },
  };
}
