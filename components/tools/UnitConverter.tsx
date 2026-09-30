'use client';

import { useState } from 'react';
import { UNIT_CATEGORIES, TEMPERATURE_UNITS, convert, formatNumber } from '@/lib/tools/units';

export default function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [value, setValue] = useState('1');
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('ft');
  const [copied, setCopied] = useState(false);

  const units = category === 'temperature' ? [...TEMPERATURE_UNITS] : Object.keys(UNIT_CATEGORIES[category].units);

  const changeCategory = (c: string) => {
    setCategory(c);
    const u = c === 'temperature' ? [...TEMPERATURE_UNITS] : Object.keys(UNIT_CATEGORIES[c].units);
    setFrom(u[0]);
    setTo(u[1]);
  };

  let result = '—';
  try {
    result = formatNumber(convert(parseFloat(value) || 0, from, to, category));
  } catch (e) {}

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const sel = 'border rounded px-3 py-2 text-sm bg-white';
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Unit Converter</h1>
      <p className="text-gray-600 mb-4">Length, mass, data, time and temperature — converted locally, nothing uploaded.</p>

      <div className="flex gap-2 mb-4 flex-wrap">
        {['length', 'mass', 'data', 'time', 'temperature'].map((c) => (
          <button key={c} onClick={() => changeCategory(c)} className={`px-3 py-1 rounded text-sm ${category === c ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>{c}</button>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-32 border rounded px-3 py-2 text-sm" />
        <select value={from} onChange={(e) => setFrom(e.target.value)} className={sel}>{units.map((u) => <option key={u}>{u}</option>)}</select>
        <span className="text-gray-400">=</span>
        <select value={to} onChange={(e) => setTo(e.target.value)} className={sel}>{units.map((u) => <option key={u}>{u}</option>)}</select>
      </div>

      <div className="mt-4 border rounded p-4 bg-gray-50 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">{result} <span className="text-sm text-gray-500">{to}</span></div>
        <button onClick={copy} className="text-xs text-blue-500 hover:text-blue-700">{copied ? 'Copied!' : 'Copy'}</button>
      </div>
    </div>
  );
}
