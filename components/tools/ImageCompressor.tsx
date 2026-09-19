'use client';

import { useState } from 'react';
import { compressImage, formatBytes, type CompressionResult } from '@/lib/tools/image';

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [quality, setQuality] = useState(0.7);
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp'>('image/jpeg');
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState('');

  const onFile = (f: File | null) => {
    if (!f) return;
    setFile(f);
    setResult(null);
    setError('');
    setPreviewUrl(URL.createObjectURL(f));
  };

  const compress = async () => {
    if (!file) return;
    setWorking(true);
    setError('');
    try {
      const r = await compressImage(file, quality, format);
      setResult(r);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setWorking(false);
    }
  };

  const savings = file && result ? Math.round((1 - result.size / file.size) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Compressor</h1>
      <p className="text-gray-500 mb-8">Compress JPG and WebP images right in your browser. Files never leave your device.</p>

      <label className="block border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-2xl p-10 text-center cursor-pointer transition-colors bg-white">
        <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => onFile(e.target.files ? e.target.files[0] : null)} />
        <div className="text-4xl mb-3">{'🖼️'}</div>
        <div className="text-gray-700 font-medium">{file ? file.name : 'Click to choose an image'}</div>
        {file && <div className="text-xs text-gray-400 mt-1">{formatBytes(file.size)} &middot; click to replace</div>}
      </label>

      {previewUrl && (
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center">
          <img src={previewUrl} alt="Original preview" className="max-h-40 rounded-lg border border-gray-100" />
          {result && (
            <div className="text-sm text-gray-600">
              <div>Original: <strong>{formatBytes(file ? file.size : 0)}</strong></div>
              <div>Compressed: <strong>{formatBytes(result.size)}</strong> ({result.width}x{result.height})</div>
              <div className={savings > 0 ? 'text-green-600 font-medium' : 'text-orange-500 font-medium'}>
                {savings >= 0 ? '-' + savings + '% size' : 'Larger than original (try higher quality)'}
              </div>
            </div>
          )}
        </div>
      )}

      {file && (
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex-1 min-w-48">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 font-medium">Quality</span>
                <span className="text-blue-600 font-mono">{Math.round(quality * 100)}%</span>
              </div>
              <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setFormat('image/jpeg')} className={'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ' + (format === 'image/jpeg' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>JPG</button>
              <button onClick={() => setFormat('image/webp')} className={'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ' + (format === 'image/webp' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>WebP</button>
            </div>
            <button onClick={compress} disabled={working} className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg font-medium transition-colors">
              {working ? 'Compressing...' : 'Compress'}
            </button>
          </div>
          {result && (
            <a href={result.url} download={'toolhive-' + (file ? file.name.replace(/.[^.]+$/, '') : 'image') + '-' + format.split('/')[1] + '.' + (format === 'image/jpeg' ? 'jpg' : 'webp')} className="inline-block mt-4 text-blue-500 hover:text-blue-700 text-sm font-medium">
              {'↓ Download compressed image (' + formatBytes(result.size) + ')'}
            </a>
          )}
          {error && <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{error}</div>}
        </div>
      )}
    </div>
  );
}
