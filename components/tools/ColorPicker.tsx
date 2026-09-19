'use client';

import { useState } from 'react';
import { hexToRgb, contrastRatio, readableText, complement } from '@/lib/tools/color';

export default function ColorPicker() {
  const [hex, setHex] = useState('#3B82F6');
  const [copied, setCopied] = useState(false);

  const rgb = hexToRgb(hex);
  const isValid = rgb !== null;
  const vsWhite = isValid ? contrastRatio(hex, '#FFFFFF') : 0;
  const vsBlack = isValid ? contrastRatio(hex, '#000000') : 0;
  const bestText = isValid ? readableText(hex) : 'black';
  const comp = isValid ? complement(hex) : '#000000';

  const copy = async (v: string) => {
    await navigator.clipboard.writeText(v);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleHexInput = (v: string) => {
    const cleaned = v.startsWith('#') ? v : '#' + v;
    setHex(cleaned.toUpperCase());
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Color Picker</h1>
      <p className="text-gray-500 mb-8">Pick a color, convert formats and check contrast.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div
            className="relative h-40 rounded-2xl border border-gray-200 flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: isValid ? hex : '#CCCCCC', color: bestText === 'white' ? '#FFFFFF' : '#000000' }}
          >
            <input
              type="color"
              value={isValid ? hex : '#000000'}
              onChange={(e) => setHex(e.target.value.toUpperCase())}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <span className="font-mono text-2xl font-bold select-none pointer-events-none">{hex}</span>
          </div>

          <div className="flex gap-2">
            <input
              value={hex}
              onChange={(e) => handleHexInput(e.target.value)}
              placeholder="#3B82F6"
              className="flex-1 p-3 border border-gray-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button onClick={() => copy(hex)} className="px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 transition-colors">
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {isValid ? (
            <>
              <div className="p-4 bg-white border border-gray-200 rounded-xl">
                <div className="text-sm font-medium text-gray-900 mb-3">Values</div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-gray-50 rounded-lg p-2 text-center"><div className="text-xs text-gray-400">HEX</div><div className="font-mono">{hex}</div></div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center"><div className="text-xs text-gray-400">RGB</div><div className="font-mono">{rgb.r}, {rgb.g}, {rgb.b}</div></div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center"><div className="text-xs text-gray-400">Complement</div><div className="font-mono">{comp}</div></div>
                </div>
              </div>
              <div className="p-4 bg-white border border-gray-200 rounded-xl">
                <div className="text-sm font-medium text-gray-900 mb-3">Contrast Ratio (WCAG)</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">vs White</span><span className="font-mono">{vsWhite.toFixed(2)} : 1 {vsWhite >= 4.5 ? 'AA ✓' : ''}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">vs Black</span><span className="font-mono">{vsBlack.toFixed(2)} : 1 {vsBlack >= 4.5 ? 'AA ✓' : ''}</span></div>
                  <div className="flex justify-between pt-2 border-t border-gray-100"><span className="text-gray-500">Recommended text</span><span className="font-medium text-gray-900">{bestText === 'white' ? 'White' : 'Black'}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">Enter a valid 6-digit hex color like #3B82F6.</div>
          )}
        </div>
      </div>
    </div>
  );
}
