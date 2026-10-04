'use client';

import { useState, useMemo } from 'react';

function diffWords(a: string, b: string) {
  const wordsA = a.split(/(\s+)/);
  const wordsB = b.split(/(\s+)/);
  const max = Math.max(wordsA.length, wordsB.length);
  const result: { text: string; type: 'same' | 'add' | 'del' }[] = [];
  for (let i = 0; i < max; i++) {
    const wa = wordsA[i] || '';
    const wb = wordsB[i] || '';
    if (wa === wb) {
      result.push({ text: wa, type: 'same' });
    } else {
      if (wa) result.push({ text: wa, type: 'del' });
      if (wb) result.push({ text: wb, type: 'add' });
    }
  }
  return result;
}

export default function TextDiff() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [showDiff, setShowDiff] = useState(false);

  const diff = useMemo(() => (textA || textB) ? diffWords(textA, textB) : [], [textA, textB]);

  const addCount = diff.filter(d => d.type === 'add').reduce((s, d) => s + d.text.trim().split(' ').filter(Boolean).length, 0);
  const delCount = diff.filter(d => d.type === 'del').reduce((s, d) => s + d.text.trim().split(' ').filter(Boolean).length, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-gray-500">Original</label>
          <textarea value={textA} onChange={e => setTextA(e.target.value)} rows={6}
            placeholder="Paste original text..."
            className="mt-1 w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Modified</label>
          <textarea value={textB} onChange={e => setTextB(e.target.value)} rows={6}
            placeholder="Paste modified text..."
            className="mt-1 w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <button onClick={() => setShowDiff(true)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
        Compare
      </button>
      {showDiff && diff.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-2">
            <span className="text-green-600">+{addCount} added</span> · <span className="text-red-600">-{delCount} removed</span>
          </p>
          <pre className="rounded-lg bg-gray-50 p-3 text-xs overflow-x-auto">
            {diff.map((d, i) => (
              <span key={i} className={d.type === 'add' ? 'bg-green-100 text-green-800' : d.type === 'del' ? 'bg-red-100 text-red-800 line-through' : ''}>
                {d.text}
              </span>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}
