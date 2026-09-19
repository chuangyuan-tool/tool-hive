'use client';

import { useState } from 'react';
import { generatePassword, passwordStrength, crackTimeEstimate, type PasswordOptions } from '@/lib/tools/password';

export default function PasswordGenerator() {
  const [opts, setOpts] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setPassword(generatePassword(opts));
    setCopied(false);
  };

  const toggle = (key: keyof Omit<PasswordOptions, 'length'>) => {
    setOpts((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const copy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const strength = password ? passwordStrength(password) : null;

  const optionItems: { key: keyof Omit<PasswordOptions, 'length'>; label: string }[] = [
    { key: 'uppercase', label: 'A-Z' },
    { key: 'lowercase', label: 'a-z' },
    { key: 'numbers', label: '0-9' },
    { key: 'symbols', label: '!@#$' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Password Generator</h1>
      <p className="text-gray-500 mb-8">Generate strong, random passwords. Generated locally — never sent anywhere.</p>

      <div className="bg-gray-900 rounded-xl p-5 mb-6 flex items-center gap-3">
        <code className="flex-1 text-white font-mono text-xl break-all">{password || 'Click Generate'}</code>
        <button onClick={copy} disabled={!password} className="shrink-0 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white px-3 py-1.5 rounded-lg text-sm transition-colors">
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>

      {strength && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Strength</span>
            <span className="font-medium text-gray-700">{strength.label}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className={'h-full ' + strength.color} style={{ width: Math.round((strength.score / 6) * 100) + '%' }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Estimated time to crack: {crackTimeEstimate(password)}</p>
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
          <span>Length</span>
          <span className="text-blue-600">{opts.length}</span>
        </div>
        <input
          type="range"
          min={8}
          max={64}
          value={opts.length}
          onChange={(e) => setOpts((p) => ({ ...p, length: Number(e.target.value) }))}
          className="w-full accent-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {optionItems.map((item) => (
          <button
            key={item.key}
            onClick={() => toggle(item.key)}
            className={
              'px-4 py-3 rounded-lg border text-sm font-medium transition-colors ' +
              (opts[item.key] ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 bg-white text-gray-400 hover:bg-gray-50')
            }
          >
            {item.label}
          </button>
        ))}
      </div>

      <button onClick={generate} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3.5 rounded-xl font-semibold text-lg transition-colors">
        Generate Password
      </button>
    </div>
  );
}
