'use client';

import { useState, useMemo } from 'react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split(/\n/).length : 0;
    const sentences = text ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = text ? text.split(/\n\s*\n/).filter(Boolean).length : 0;
    const readingMin = Math.max(1, Math.round(words / 200));
    return { chars, charsNoSpace, words, lines, sentences, paragraphs, readingMin };
  }, [text]);

  const items = [
    { label: 'Words', value: stats.words },
    { label: 'Characters', value: stats.chars },
    { label: 'Chars (no space)', value: stats.charsNoSpace },
    { label: 'Sentences', value: stats.sentences },
    { label: 'Lines', value: stats.lines },
    { label: 'Paragraphs', value: stats.paragraphs },
    { label: 'Reading time', value: stats.readingMin + ' min' },
  ];

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} rows={8}
        placeholder="Type or paste your text..."
        className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map(it => (
          <div key={it.label} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
            <div className="text-xs font-medium text-gray-500">{it.label}</div>
            <div className="text-lg font-semibold text-gray-900 mt-1">{it.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
