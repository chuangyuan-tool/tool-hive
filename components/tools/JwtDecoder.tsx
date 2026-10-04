'use client';

import { useState } from 'react';

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const decode = () => {
    setError('');
    setHeader('');
    setPayload('');
    const parts = token.trim().split('.');
    if (parts.length < 2) {
      setError('Invalid JWT: expected 2 or 3 dot-separated segments');
      return;
    }
    try {
      const h = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      setHeader(JSON.stringify(h, null, 2));
    } catch {
      setError('Failed to decode header segment');
      return;
    }
    try {
      const p = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      setPayload(JSON.stringify(p, null, 2));
    } catch {
      setError('Failed to decode payload segment');
    }
  };

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div className="space-y-6">
      <textarea
        value={token}
        onChange={e => setToken(e.target.value)}
        placeholder="Paste a JWT (eyJhbGciOiJIUzI1NiIs...) here"
        rows={4}
        className="w-full rounded-lg border border-gray-200 p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={decode} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
        Decode
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {header && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-gray-700">Header</h3>
            <button onClick={() => copy(header, 'h')} className="text-xs text-blue-600 hover:underline">{copied === 'h' ? 'Copied!' : 'Copy'}</button>
          </div>
          <pre className="rounded-lg bg-gray-50 p-3 text-xs overflow-x-auto">{header}</pre>
        </div>
      )}

      {payload && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-gray-700">Payload</h3>
            <button onClick={() => copy(payload, 'p')} className="text-xs text-blue-600 hover:underline">{copied === 'p' ? 'Copied!' : 'Copy'}</button>
          </div>
          <pre className="rounded-lg bg-gray-50 p-3 text-xs overflow-x-auto max-h-64 overflow-y-auto">{payload}</pre>
        </div>
      )}
    </div>
  );
}
