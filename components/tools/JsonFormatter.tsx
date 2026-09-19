'use client';

import { useState } from 'react';
import { formatJSON, minifyJSON, validateJSON, generateTypeScriptTypes } from '@/lib/tools/json';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = () => {
    try {
      setOutput(formatJSON(input));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      setOutput(minifyJSON(input));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const handleValidate = () => {
    const result = validateJSON(input);
    if (result.valid) {
      setOutput('Valid JSON ✓');
      setError('');
    } else {
      setOutput('');
      setError(result.error || 'Invalid JSON');
    }
  };

  const handleTypes = () => {
    setOutput(generateTypeScriptTypes(input));
    setError('');
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">JSON Formatter</h1>
      <p className="text-gray-500 mb-8">Format, minify, validate JSON and generate TypeScript types. Everything stays in your browser.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"hello": "world"}'
            className="w-full h-80 p-4 border border-gray-200 rounded-xl font-mono text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Output</label>
            <button onClick={handleCopy} disabled={!output} className="text-sm text-blue-500 hover:text-blue-700 disabled:opacity-40">Copy</button>
          </div>
          <div className="w-full h-80 p-4 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50 whitespace-pre-wrap overflow-auto">
            {output || <span className="text-gray-400">Result will appear here...</span>}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <button onClick={handleFormat} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">Format</button>
        <button onClick={handleMinify} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition-colors">Minify</button>
        <button onClick={handleValidate} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition-colors">Validate</button>
        <button onClick={handleTypes} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition-colors">Generate Types</button>
        <button
          onClick={() => { setInput(''); setOutput(''); setError(''); }}
          className="ml-auto bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 px-5 py-2.5 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{error}</div>
      )}
    </div>
  );
}
