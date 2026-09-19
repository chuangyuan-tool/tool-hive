'use client';

import { useState } from 'react';
import { encodeBase64, decodeBase64 } from '@/lib/tools/base64';

export default function Base64Converter() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }
    try {
      const result = mode === 'encode' ? encodeBase64(input) : decodeBase64(input);
      setOutput(result);
      setError('');
    } catch (e) {
      setOutput('');
      setError('Invalid input for ' + mode + ' mode.');
    }
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const useOutputAsInput = () => {
    setInput(output);
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setOutput('');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Base64 Converter</h1>
      <p className="text-gray-500 mb-8">Encode and decode Base64 instantly. Fully in your browser.</p>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setMode('encode'); setOutput(''); setError(''); }}
          className={'px-4 py-2 rounded-lg text-sm font-medium transition-colors ' + (mode === 'encode' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}
        >
          Encode
        </button>
        <button
          onClick={() => { setMode('decode'); setOutput(''); setError(''); }}
          className={'px-4 py-2 rounded-lg text-sm font-medium transition-colors ' + (mode === 'decode' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}
        >
          Decode
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{mode === 'encode' ? 'Plain text' : 'Base64'}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={convert}
          placeholder={mode === 'encode' ? 'Type or paste your text...' : 'Paste Base64...'}
          className="w-full h-36 p-4 border border-gray-200 rounded-xl font-mono text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          spellCheck={false}
        />
      </div>

      <div className="flex items-center justify-between my-4">
        <button onClick={useOutputAsInput} disabled={!output} className="text-sm text-blue-500 hover:text-blue-700 disabled:opacity-40">
          {'⇄ Use output as input'}
        </button>
        <button onClick={copy} disabled={!output} className="text-sm text-blue-500 hover:text-blue-700 disabled:opacity-40">
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{mode === 'encode' ? 'Base64' : 'Plain text'}</label>
        <div className="w-full h-36 p-4 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50 whitespace-pre-wrap overflow-auto">
          {output || <span className="text-gray-400">Result will appear here...</span>}
        </div>
      </div>

      {error && <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{error}</div>}
    </div>
  );
}
