'use client';

import { useState } from 'react';
import { yamlToJson, jsonToYaml, xmlToJson, jsonToXml } from '@/lib/tools/convert';

const MODES = [
  { id: 'y2j', label: 'YAML → JSON', run: yamlToJson },
  { id: 'j2y', label: 'JSON → YAML', run: jsonToYaml },
  { id: 'x2j', label: 'XML → JSON', run: xmlToJson },
  { id: 'j2x', label: 'JSON → XML', run: jsonToXml },
] as const;

export default function DataConvert() {
  const [mode, setMode] = useState<(typeof MODES)[number]['id']>('y2j');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState(false);

  const run = () => {
    setErr('');
    try {
      setOutput(MODES.find((m) => m.id === mode)!.run(input));
    } catch (e: any) {
      setOutput('');
      setErr(e.message || 'Invalid input');
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Data Converter</h1>
      <p className="text-gray-600 mb-4">YAML, JSON and XML — convert in your browser, nothing uploaded.</p>

      <div className="flex gap-2 mb-3 flex-wrap">
        {MODES.map((m) => (
          <button key={m.id} onClick={() => { setMode(m.id); setOutput(''); setErr(''); }} className={`px-3 py-1 rounded text-sm ${mode === m.id ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>{m.label}</button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={12} placeholder="Paste input..." className="w-full p-4 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50" />
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 font-mono text-sm text-gray-800 overflow-auto max-h-[20rem]">
          {err ? <span className="text-amber-600">{err}</span> : output || <span className="text-gray-400">Result appears here</span>}
        </div>
      </div>
      <div className="mt-3 flex gap-3">
        <button onClick={run} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium">Convert</button>
        {output && <button onClick={copy} className="text-xs text-blue-500 hover:text-blue-700 self-center">{copied ? 'Copied!' : 'Copy result'}</button>}
      </div>
    </div>
  );
}
