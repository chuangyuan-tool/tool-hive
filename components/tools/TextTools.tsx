'use client';

import { useMemo, useState } from 'react';
import { dedupeLines, removeEmptyLines, normalizeSpaces, textStats } from '@/lib/tools/texttools';

export default function TextTools() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const s = useMemo(() => textStats(text), [text]);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const btn = 'px-3 py-1.5 rounded text-sm bg-gray-100 hover:bg-gray-200';
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Text Tools</h1>
      <p className="text-gray-600 mb-4">Dedupe lines, clean up whitespace, and see live stats — all in your browser.</p>

      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} placeholder="Paste your text..." className="w-full p-4 border border-gray-200 rounded-xl text-sm bg-gray-50" />

      <div className="flex gap-2 mt-3 flex-wrap">
        <button className={btn} onClick={() => setText(dedupeLines(text))}>Dedupe lines</button>
        <button className={btn} onClick={() => setText(removeEmptyLines(text))}>Remove empty lines</button>
        <button className={btn} onClick={() => setText(normalizeSpaces(text))}>Normalize spaces</button>
        <button className={btn} onClick={copy}>{copied ? 'Copied!' : 'Copy text'}</button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 mt-4">
        {([['Chars', s.chars], ['No-space', s.charsNoSpace], ['Words', s.words], ['Lines', s.lines], ['Sentences', s.sentences], ['Paragraphs', s.paragraphs], ['Unique words', s.uniqueWords]] as [string, number][]).map(([k, v]) => (
          <div key={k} className="border rounded p-2 text-center">
            <div className="text-lg font-bold text-blue-600">{v}</div>
            <div className="text-xs text-gray-500">{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
