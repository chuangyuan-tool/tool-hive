'use client';

import { useState, useMemo } from 'react';

const BASES = [2, 8, 10, 16] as const;
const LABELS: Record<number, string> = { 2: 'Binary', 8: 'Octal', 10: 'Decimal', 16: 'Hex' };

export default function BaseConverter() {
  const [input, setInput] = useState('');
  const [fromBase, setFromBase] = useState<number>(10);

  const { val, error } = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return { val: null, error: '' };
    const clean = trimmed.replace(/^0[xXbBoO]/, '');
    const n = parseInt(clean, fromBase);
    if (isNaN(n)) return { val: null, error: `Invalid ${LABELS[fromBase]} number` };
    return { val: n, error: '' };
  }, [input, fromBase]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {BASES.map(b => (
          <button key={b} onClick={() => setFromBase(b)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${fromBase === b ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {LABELS[b]}
          </button>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)}
        placeholder={`Enter a ${LABELS[fromBase].toLowerCase()} number...`}
        className="w-full rounded-lg border border-gray-200 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {val !== null && (
        <div className="grid grid-cols-2 gap-3">
          {BASES.map(b => b !== fromBase && (
            <div key={b} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <div className="text-xs font-medium text-gray-500">{LABELS[b]}</div>
              <div className="font-mono text-sm mt-1 break-all">{val.toString(b)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}