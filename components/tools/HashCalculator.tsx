'use client';

import { useState } from 'react';
import { md5, sha1, sha256 } from '@/lib/tools/hash';

export default function HashCalculator() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<{ name: string; value: string }[]>([]);
  const [copied, setCopied] = useState('');

  const compute = () => {
    if (!input) { setResults([]); return; }
    setResults([
      { name: 'MD5', value: md5(input) },
      { name: 'SHA-1', value: sha1(input) },
      { name: 'SHA-256', value: sha256(input) },
    ]);
  };

  const copy = async (v: string) => {
    await navigator.clipboard.writeText(v);
    setCopied(v);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Hash Generator</h1>
      <p className="text-gray-600 mb-4">Compute MD5, SHA-1 and SHA-256 in your browser. Nothing is uploaded.</p>

      <label className="block text-sm font-medium text-gray-700 mb-2">Input</label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        className="w-full p-4 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50"
        placeholder="Enter text to hash..."
      />

      <button onClick={compute} className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium">
        Generate hashes
      </button>

      <div className="mt-4 space-y-3">
        {results.map((r) => (
          <div key={r.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500 uppercase">{r.name}</span>
              <button onClick={() => copy(r.value)} className="text-xs text-blue-500 hover:text-blue-700">
                {copied === r.value ? 'Copied ✓' : 'Copy'}
              </button>
            </div>
            <div className="w-full p-3 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50 break-all">{r.value}</div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-gray-400">
        Hashes are one-way and shown for reference only. MD5 and SHA-1 are not collision-resistant and should not be used for security.
      </p>
    </div>
  );
}
