'use client';

import { useState } from 'react';
import { generateUuids } from '@/lib/tools/uuid';

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [list, setList] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const gen = () => setList(generateUuids(count));

  const copyAll = async () => {
    await navigator.clipboard.writeText(list.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">UUID Generator</h1>
      <p className="text-gray-600 mb-4">Generate UUID v4 identifiers locally — cryptographically random, nothing uploaded.</p>
      <label className="block text-sm font-medium text-gray-700 mb-2">How many (1-200)?</label>
      <input type="number" min={1} max={200} value={count} onChange={(e) => setCount(parseInt(e.target.value) || 1)} className="w-32 border rounded px-3 py-2 text-sm" />
      <button onClick={gen} className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium">Generate</button>
      {list.length > 0 && (
        <div className="mt-4 border rounded p-4 bg-gray-50">
          <div className="flex flex-wrap gap-1.5">
            {list.map((u, i) => (
              <code key={i} className="text-xs bg-white border rounded px-2 py-1">{u}</code>
            ))}
          </div>
          <button onClick={copyAll} className="mt-3 text-xs text-blue-500 hover:text-blue-700">{copied ? 'Copied!' : `Copy all (${list.length})`}</button>
        </div>
      )}
    </div>
  );
}
