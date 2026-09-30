'use client';

import { useState } from 'react';
import { encodeUrl, decodeUrl, parseQuery, buildQuery, normalizeUrl } from '@/lib/tools/url';

export default function UrlCodec() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode' | 'parse' | 'build' | 'normalize'>('encode');
  const [copied, setCopied] = useState(false);

  const run = () => {
    switch (mode) {
      case 'encode': return encodeUrl(input);
      case 'decode': return decodeUrl(input);
      case 'parse': return JSON.stringify(parseQuery(input), null, 2);
      case 'build': {
        try { return buildQuery(JSON.parse(input)); } catch { return 'Invalid JSON object input'; }
      }
      case 'normalize': return normalizeUrl(input);
    }
  };

  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const apply = () => {
    const res = run();
    if (res === 'Invalid JSON object input') { setError('Enter a JSON object like {"a":"1","b":"2"}'); setOutput(''); }
    else { setOutput(String(res)); setError(''); }
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const modes: { key: typeof mode; label: string }[] = [
    { key: 'encode', label: 'Encode' },
    { key: 'decode', label: 'Decode' },
    { key: 'parse', label: 'Parse query → JSON' },
    { key: 'build', label: 'JSON → query' },
    { key: 'normalize', label: 'Normalize URL' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">URL Encoder / Decoder</h1>
      <p className="text-gray-600 mb-4">Encode, decode and transform URLs and query strings. Fully client-side.</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => { setMode(m.key); setOutput(''); setError(''); }}
            className={'px-3 py-1.5 rounded-lg text-sm ' + (mode === m.key ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}
          >
            {m.label}
          </button>
        ))}
      </div>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        {mode === 'build' ? 'JSON object' : 'Input'}
      </label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        className="w-full p-4 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50"
        placeholder={mode === 'build' ? '{"a":"1","b":"2"}' : mode === 'normalize' ? 'example.com' : 'Enter value...'}
      />

      <div className="flex gap-3 mt-3">
        <button onClick={apply} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium">Convert</button>
        <button onClick={copy} disabled={!output} className="text-sm text-blue-500 hover:text-blue-700 disabled:opacity-40">
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Result</label>
        <div className="w-full min-h-[5rem] p-4 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50 whitespace-pre-wrap break-all">
          {output || <span className="text-gray-400">Result will appear here...</span>}
        </div>
      </div>

      {error && <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{error}</div>}
      <p className="mt-6 text-xs text-gray-400">Output is for reference only.</p>
    </div>
  );
}
