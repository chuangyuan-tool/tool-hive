export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  url: string;
  popular: boolean;
}

export const tools: Tool[] = [
  { id: 'json-formatter', name: 'JSON Formatter', description: 'Format, validate, minify JSON and auto-generate TypeScript types.', category: 'Developer', icon: '{}', url: '/tools/json-formatter', popular: true },
  { id: 'password-generator', name: 'Password Generator', description: 'Generate strong random passwords with real-time strength analysis.', category: 'Security', icon: '🔐', url: '/tools/password-generator', popular: true },
  { id: 'base64-converter', name: 'Base64 Converter', description: 'Encode and decode Base64 strings instantly, fully in your browser.', category: 'Developer', icon: '🔄', url: '/tools/base64-converter', popular: false },
  { id: 'color-picker', name: 'Color Picker', description: 'Pick colors, convert between HEX/RGB and check WCAG contrast.', category: 'Design', icon: '🎨', url: '/tools/color-picker', popular: true },
  { id: 'image-compressor', name: 'Image Compressor', description: 'Compress JPG/WebP images in your browser. No uploads, no queue.', category: 'Design', icon: '🖼️', url: '/tools/image-compressor', popular: true },
  { id: 'csv-to-json', name: 'CSV to JSON', description: 'Convert CSV to JSON and back, with clean client-side parsing.', category: 'Data', icon: '📊', url: '/tools/csv-to-json', popular: false },
  { id: 'ai-listing', name: 'AI Listing Generator', description: 'Generate multi-language product listings for Amazon, Shopify, TikTok and Temu in one click.', category: 'Marketing', icon: '✨', url: '/tools/ai-listing', popular: true },
  { id: 'ai-product-image', name: 'AI Product Image', description: 'Turn a product photo into clean white-background, scene or high-res images with AI.', category: 'Design', icon: '🖼️', url: '/tools/ai-product-image', popular: true },
  { id: 'ecom-automation', name: 'E-commerce Automation', description: 'Pick ready-made workflows — order sync, review replies, daily reports, price monitoring. No coding.', category: 'Marketing', icon: '⚡', url: '/tools/ecom-automation', popular: false },
  { id: 'hash-calculator', name: 'Hash Calculator', description: 'Generate MD5, SHA-1, SHA-256 and SHA-512 hashes instantly in your browser.', category: 'Developer', icon: '#', url: '/tools/hash-calculator', popular: false },
  { id: 'timestamp-converter', name: 'Timestamp Converter', description: 'Convert Unix timestamps to human-readable dates and back, with timezone support.', category: 'Developer', icon: '⏱️', url: '/tools/timestamp-converter', popular: false },
  { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate UUID v4 and v7 identifiers in bulk, copy-ready format.', category: 'Developer', icon: '🆔', url: '/tools/uuid-generator', popular: false },
  { id: 'url-codec', name: 'URL Encoder / Decoder', description: 'Encode and decode URL components, query strings, and percent-encoding.', category: 'Developer', icon: '🔗', url: '/tools/url-codec', popular: false },
  { id: 'qrcode', name: 'QR Code Generator', description: 'Create QR codes for URLs, text, Wi-Fi, and vCard. Adjustable size and error correction.', category: 'Utility', icon: '▦', url: '/tools/qrcode', popular: true },
  { id: 'regex-tester', name: 'Regex Tester', description: 'Test regular expressions with live highlighting, match groups, and flags.', category: 'Developer', icon: '↔', url: '/tools/regex-tester', popular: false },
  { id: 'cron-generator', name: 'Cron Generator', description: 'Build and decode cron expressions with a human-readable explanation and next-run preview.', category: 'Developer', icon: '🗓️', url: '/tools/cron-generator', popular: false },
  { id: 'unit-converter', name: 'Unit Converter', description: 'Convert length, weight, temperature, and more across metric and imperial units.', category: 'Utility', icon: '📐', url: '/tools/unit-converter', popular: true },
  { id: 'markdown-preview', name: 'Markdown Preview', description: 'Write Markdown with live HTML preview, GitHub-style rendering in your browser.', category: 'Writing', icon: '📝', url: '/tools/markdown-preview', popular: false },
  { id: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode and inspect JSON Web Tokens — header and payload, no upload.', category: 'Developer', icon: '🔑', url: '/tools/jwt-decoder', popular: false },
  { id: 'text-diff', name: 'Text Diff', description: 'Compare two blocks of text and highlight added and removed words instantly.', category: 'Developer', icon: '⇄', url: '/tools/text-diff', popular: false },
];
