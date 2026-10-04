'use client';

import { useState } from 'react';

function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>~+])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\s+/g, ' ')
    .trim();
}

function beautifyCss(css: string): string {
  let indent = 0;
  let result = '';
  for (const ch of css.trim()) {
    if (ch === '{') {
      result += ch + '\n';
      indent++;
    } else if (ch === '}') {
      indent--;
      result += '\n' + '  '.repeat(Math.max(0, indent)) + ch + '\n';
    } else if (ch === ';') {
      result += ch + '\n' + '  '.repeat(Math.max(0, indent));
    } else {
      result += ch;
    }
  }
  return result.replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

export default function CssMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'minify' | 'beautify'>('minify');
  const [copied, setCopied] = useState(false);

  const process = () => {
    if (!input.trim()) { setOutput(''); return; }
    setOutput(mode === 'minify' ? minifyCss(input) : beautifyCss(input));
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const inputLines = input ? input.split('\n').length : 0;
  const outputLines = output ? output.split('\n').length : 0;
  const inputSize = input.length;
  const outputSize = output.length;
  const saving = inputSize > 0 ? Math.max(0, Math.round((1 - outputSize / inputSize) * 100)) : 0;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode('minify')}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${mode === 'minify' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
          Minify
        </button>
        <button onClick={() => setMode('beautify')}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${mode === 'beautify' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
          Beautify
        </button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={8}
        placeholder="Paste your CSS here..."
        className="w-full rounded-lg border border-gray-200 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button onClick={process} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
        {mode === 'minify' ? 'Minify' : 'Beautify'}
      </button>
      {output && (
        <div>
          <div className="mb-2 flex items-center gap-3 text-xs text-gray-500">
            <span>{inputLines} → {outputLines} lines</span>
            {mode === 'minify' && saving > 0 && <span className="text-green-600 font-medium">-{saving}% size</span>}
            <button onClick={copy} className="text-blue-600 hover:underline ml-auto">{copied ? 'Copied!' : 'Copy'}</button>
          </div>
          <pre className="rounded-lg bg-gray-50 p-3 text-xs font-mono overflow-x-auto max-h-64 overflow-y-auto">{output}</pre>
        </div>
      )}
    </div>
  );
}
