'use client';

import { useMemo, useState } from 'react';
import { markdownToHtml } from '@/lib/tools/markdown';

const SAMPLE = `# Heading

**bold**, *italic*, \`code\`, [a link](https://example.com)

- item 1
- item 2

| a | b |
|---|---|
| 1 | 2 |`;

export default function MarkdownPreview() {
  const [md, setMd] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => markdownToHtml(md), [md]);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Markdown Preview</h1>
      <p className="text-gray-600 mb-4">Write Markdown, see the rendered result instantly. Rendered locally in your browser.</p>
      <div className="grid md:grid-cols-2 gap-4">
        <textarea value={md} onChange={(e) => setMd(e.target.value)} rows={16} className="w-full p-4 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50" />
        <div className="border border-gray-200 rounded-xl p-4 text-sm text-gray-800 overflow-auto max-h-[28rem] prose prose-sm">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
      <button onClick={copyHtml} className="mt-4 text-xs text-blue-500 hover:text-blue-700">{copied ? 'HTML copied!' : 'Copy rendered HTML'}</button>
    </div>
  );
}
