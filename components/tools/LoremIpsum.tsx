'use client';

import { useState } from 'react';

const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim minim quis nostrud exercitation ullamco labora nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum'.split(' ');

function genSentences(count: number): string[] {
  const arr: string[] = [];
  for (let i = 0; i < count; i++) {
    const len = 6 + Math.floor(Math.random() * 10);
    const words = Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
    words[0] = words[0][0].toUpperCase() + words[0].slice(1);
    arr.push(words.join(' ') + '.');
  }
  return arr;
}

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3);
  const [sentences, setSentences] = useState(4);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const paras: string[] = [];
    for (let i = 0; i < paragraphs; i++) {
      paras.push(genSentences(sentences).join(' '));
    }
    setOutput(paras.join('\n\n'));
  };

  const copyAll = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div>
          <label className="text-xs text-gray-500">Paragraphs</label>
          <input type="number" min={1} max={20} value={paragraphs} onChange={e => setParagraphs(Number(e.target.value))}
            className="mt-1 w-20 rounded-lg border border-gray-200 p-2 text-sm" />
        </div>
        <div>
          <label className="text-xs text-gray-500">Sentences / para</label>
          <input type="number" min={1} max={15} value={sentences} onChange={e => setSentences(Number(e.target.value))}
            className="mt-1 w-20 rounded-lg border border-gray-200 p-2 text-sm" />
        </div>
      </div>
      <button onClick={generate} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
        Generate
      </button>
      {output && (
        <div>
          <button onClick={copyAll} className="mb-2 text-xs text-blue-600 hover:underline">{copied ? 'Copied!' : 'Copy all'}</button>
          <div className="rounded-lg bg-gray-50 p-4 text-sm leading-relaxed whitespace-pre-line">{output}</div>
        </div>
      )}
    </div>
  );
}
