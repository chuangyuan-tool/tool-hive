'use client';

import { useState, useMemo } from 'react';

export default function JsonValidator() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!input.trim()) return { status: 'empty' as const, message: '', pretty: '' };
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      return { status: 'valid' as const, message: 'Valid JSON', pretty };
    } catch (e: any) {
      return { status: 'invalid' as const, message: e.message, pretty: '' };
    }
  }, [input]);

  const copy = () => {
    navigator.clipboard.writeText(result.pretty);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={8}
        placeholder="Paste JSON here to validate and pretty-print..."
        className="w-full rounded-lg border border-gray-200 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {result.status !== 'empty' && (
        <div className={`rounded-lg p-3 text-sm ${result.status === 'valid' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {result.status === 'valid' ? '✓ Valid JSON' : '✗ ' + result.message}
        </div>
      )}
      {result.status === 'valid' && result.pretty && (
        <div>
          <button onClick={copy} className="mb-2 text-xs text-blue-600 hover:underline">{copied ? 'Copied!' : 'Copy pretty JSON'}</button>
          <pre className="rounded-lg bg-gray-50 p-3 text-xs font-mono overflow-x-auto max-h-64 overflow-y-auto">{result.pretty}</pre>
        </div>
      )}
    </div>
  );
}
