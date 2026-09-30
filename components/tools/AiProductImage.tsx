'use client';

import { useState } from 'react';
import { generateProductImage } from '@/lib/ai-client';

export default function AiProductImage() {
  const [image, setImage] = useState<string | null>(null);
  const [mode, setMode] = useState('white-bg');
  const [style, setStyle] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const generate = async () => {
    if (!image) { setError('Please upload a product image'); return; }
    setLoading(true);
    setError('');
    try {
      const data = await generateProductImage({ mode, style });
      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.message || data.error || 'Generation not available yet');
      }
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">🖼️ AI Product Images</h1>
      <p className="text-gray-500">Upload a product photo, choose a mode, get professional images in seconds.</p>

      {/* 上传 */}
      <div className="border-2 border-dashed rounded p-8 text-center">
        {image ? (
          <img src={image} alt="preview" className="max-h-40 mx-auto rounded" />
        ) : (
          <p className="text-gray-400 text-sm">Click to upload or drag & drop</p>
        )}
        <input type="file" accept="image/*" onChange={onFile} className="mt-3 text-sm" />
      </div>

      {/* 模式 */}
      <div className="flex gap-2">
        {[['white-bg','白底图'],['scene','场景图'],['multi-angle','多角度'],['upscale','超分放大']].map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)} className={`px-3 py-1 rounded text-sm ${mode === m ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>
            {label}
          </button>
        ))}
      </div>

      <input placeholder="Style (e.g. modern living room / car dashboard)" value={style} onChange={e => setStyle(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />

      <button onClick={generate} disabled={loading || !image} className="w-full py-3 bg-purple-600 text-white rounded font-medium disabled:opacity-50">
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {error && <div className="text-amber-600 text-sm">{error}</div>}
      {result && <img src={result} alt="result" className="w-full rounded" />}
    </div>
  );
}
