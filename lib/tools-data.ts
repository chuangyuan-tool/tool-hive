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
];
