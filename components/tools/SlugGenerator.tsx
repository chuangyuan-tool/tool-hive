'use client';

import { useState, useMemo } from 'react';

export default function SlugGenerator() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const slug = useMemo(() => {
    return input
      .trim()
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }, [input]);

  const copy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <input value={input} onChange={e => setInput(e.target.value)}
        placeholder="Enter a title, e.g. My Blog Post!"
        className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {slug && (
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-500">Slug</span>
            <button onClick={copy} className="text-xs text-blue-600 hover:underline">{copied ? 'Copied!' : 'Copy'}</button>
          </div>
          <div className="font-mono text-sm break-all">{slug}</div>
        </div>
      )}
    </div>
  );
}
