'use client';

import { useState } from 'react';
import { csvToJson, jsonToCsv } from '@/lib/tools/csv';

const SAMPLE_CSV = 'name,age,city\nAlice,30,Beijing\nBob,25,London\nCarol,35,"New York"';
const SAMPLE_JSON = '[\n  { "name": "Alice", "age": 30, "city": "Beijing" },\n  { "name": "Bob", "age": 25, "city": "London" }\n]';

export default function CsvToJson() {
  const [tab, setTab] = useState<'csv2json' | 'json2csv'>('csv2json');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const loadSample = () => {
    setInput(tab === 'csv2json' ? SAMPLE_CSV : SAMPLE_JSON);
    setOutput('');
    setError('');
  };

  const convert = () => {
    try {
      if (tab === 'csv2json') {
        setOutput(JSON.stringify(csvToJson(input), null, 2));
      } else {
        setOutput(jsonToCsv(input));
      }
      setError('');
    } catch (e) {
      setOutput('');
      setError((e as Error).message);
    }
  };

  const copy = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  const switchTab = (t: 'csv2json' | 'json2csv') => {
    setTab(t);
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">CSV &amp; JSON Converter</h1>
      <p className="text-gray-500 mb-8">Convert between CSV and JSON. Parsed locally in your browser.</p>

      <div className="flex gap-2 mb-6">
        <button onClick={() => switchTab('csv2json')} className={'px-4 py-2 rounded-lg text-sm font-medium transition-colors ' + (tab === 'csv2json' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>CSV to JSON</button>
        <button onClick={() => switchTab('json2csv')} className={'px-4 py-2 rounded-lg text-sm font-medium transition-colors ' + (tab === 'json2csv' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>JSON to CSV</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">{tab === 'csv2json' ? 'CSV input' : 'JSON input'}</label>
            <button onClick={loadSample} className="text-xs text-blue-500 hover:text-blue-700">Load sample</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tab === 'csv2json' ? 'name,age\nAlice,30' : '[{"name": "Alice"}]'}
            className="w-full h-64 p-4 border border-gray-200 rounded-xl font-mono text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">{tab === 'csv2json' ? 'JSON output' : 'CSV output'}</label>
            <button onClick={copy} disabled={!output} className="text-xs text-blue-500 hover:text-blue-700 disabled:opacity-40">Copy</button>
          </div>
          <div className="w-full h-64 p-4 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50 whitespace-pre-wrap overflow-auto">
            {output || <span className="text-gray-400">Result will appear here...</span>}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button onClick={convert} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
          {tab === 'csv2json' ? 'Convert to JSON' : 'Convert to CSV'}
        </button>
      </div>

      {error && <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{error}</div>}
    </div>
  );
}
