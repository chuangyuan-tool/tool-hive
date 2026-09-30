'use client';

import { useState } from 'react';
import { testRegex, findMatches, replaceWithPattern, explainFlags } from '@/lib/tools/regex';

const FLAG_LIST = ['g', 'i', 'm', 's', 'u', 'y'];

export default function RegexTester() {
  const [pattern, setPattern] = useState('\\d+');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');
  const [replacement, setReplacement] = useState('');

  const toggleFlag = (f: string) =>
    setFlags((prev) => (prev.includes(f) ? prev.replace(f, '') : prev + f));

  const single = pattern ? testRegex(pattern, flags, text) : null;
  const matches = pattern && text ? findMatches(pattern, flags, text, 50) : [];
  const replaced = pattern && text ? replaceWithPattern(pattern, flags, text, replacement) : '';
  const flagExplain = explainFlags(flags);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Regex Tester</h1>
      <p className="text-gray-600 mb-4">Test and debug regular expressions live. Runs entirely in your browser.</p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Pattern</label>
        <input
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          className="w-full p-4 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50"
          placeholder="e.g. \\b\\d+\\b"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {FLAG_LIST.map((f) => (
            <button
              key={f}
              onClick={() => toggleFlag(f)}
              className={'w-9 h-9 rounded-lg font-mono text-sm ' + (flags.includes(f) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}
            >
              {f}
            </button>
          ))}
          {flagExplain.map((e) => (
            <span key={e.flag} className="text-xs text-gray-400 mr-2">{e.flag} · {e.label}</span>
          ))}
        </div>
      </div>

      <label className="block text-sm font-medium text-gray-700 mb-2">Test string</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="w-full p-4 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50"
        placeholder="Enter text to match against..."
      />

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Replace with (optional)</label>
        <input
          value={replacement}
          onChange={(e) => setReplacement(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50"
          placeholder="Replacement string"
        />
      </div>

      {single && !single.valid && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          Invalid pattern: {single.error}
        </div>
      )}

      {single && single.valid && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">First match</div>
            {single.match ? (
              <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-sm">
                <div>Matched: <span className="font-mono">&quot;{single.matched}&quot;</span></div>
                <div>Index: <span className="font-mono">{single.index}</span></div>
              </div>
            ) : (
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500">No match.</div>
            )}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">All matches ({matches.length})</div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono max-h-40 overflow-auto">
              {matches.length === 0 ? <span className="text-gray-400">—</span> :
                matches.map((m, i) => (
                  <div key={i} className="text-gray-700">[{m.index}] {m.matched}</div>
                ))}
            </div>
          </div>
          {replacement !== '' && (
            <div className="md:col-span-2">
              <div className="text-sm font-medium text-gray-700 mb-2">Replaced result</div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm font-mono break-all">{replaced}</div>
            </div>
          )}
        </div>
      )}

      <p className="mt-6 text-xs text-gray-400">Results are for reference only. Behavior depends on the selected flags.</p>
    </div>
  );
}
