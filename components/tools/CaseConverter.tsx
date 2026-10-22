'use client';

import { useState, useMemo } from 'react';

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState('');

  const variants = useMemo(() => {
    const s = input;
    return {
      lower: s.toLowerCase(),
      upper: s.toUpperCase(),
      title: s.replace(/\b\w/g, c => c.toUpperCase()),
      sentence: s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(),
      camel: s.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^[A-Z]/, c => c.toLowerCase()),
      pascal: s.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
      snake: s.trim().toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, ''),
      kebab: s.trim().toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, ''),
    };
  }, [input]);

  const copy = (v: string, label: string) => {
    navigator.clipboard.writeText(v);
    setCopied(label);
    setTimeout(() => setCopied(''), 1500);
  };

  const labels: Record<string, string> = {
    lower: 'lowercase', upper: 'UPPERCASE', title: 'Title Case', sentence: 'Sentence case',
    camel: 'camelCase', pascal: 'PascalCase', snake: 'snake_case', kebab: 'kebab-case',
  };

  const keys = Object.keys(variants);

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={4}
        placeholder="Type text to convert..."
        className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {input && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {keys.map(k => (
            <div key={k} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-gray-500">{labels[k]}</div>
                <div className="font-mono text-xs truncate">{variants[k]}</div>
              </div>
              <button onClick={() => copy(variants[k], k)}
                className="ml-2 text-xs text-blue-600 hover:underline">{copied === k ? 'Copied' : 'Copy'}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
