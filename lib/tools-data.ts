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
  { id: 'url-encoder', name: 'URL Encoder/Decoder', description: 'Encode or decode URLs for safe transmission.', category: 'Developer', icon: '🔗', url: '/tools/url-encoder', popular: false },
  { id: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode and inspect JSON Web Tokens.', category: 'Security', icon: '🔐', url: '/tools/jwt-decoder', popular: true },
  { id: 'hash-generator', name: 'Hash Generator', description: 'Generate MD5, SHA-1, SHA-256 hashes from text.', category: 'Security', icon: '🔒', url: '/tools/hash-generator', popular: false },
  { id: 'markdown-preview', name: 'Markdown Preview', description: 'Write Markdown and see live preview.', category: 'Developer', icon: '📝', url: '/tools/markdown-preview', popular: true },
  { id: 'regex-tester', name: 'Regex Tester', description: 'Test regular expressions with live matching.', category: 'Developer', icon: '🔍', url: '/tools/regex-tester', popular: true },
];
