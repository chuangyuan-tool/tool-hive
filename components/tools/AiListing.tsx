'use client';

import { useState } from 'react';

export default function AiListing() {
  const [product, setProduct] = useState({ name: '', category: '', features: '', brand: '', price: '' });
  const [platform, setPlatform] = useState('amazon');
  const [langs, setLangs] = useState<string[]>(['en']);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const allLangs = ['en', 'ja', 'de', 'fr', 'es', 'pt', 'ko'];

  const toggleLang = (l: string) => {
    setLangs(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l]);
  };

  const generate = async () => {
    if (!product.name) { setError('Please enter product name'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/ai/listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, platform, langs }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || 'Generation failed');
      }
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">✨ AI Listing Generator</h1>
      <p className="text-gray-500">Enter product info, pick a platform and target languages, get optimized listings instantly.</p>

      {/* 产品信息 */}
      <div className="grid grid-cols-2 gap-3">
        <input placeholder="Product name *" value={product.name} onChange={e => setProduct({...product, name: e.target.value})} className="border rounded px-3 py-2 text-sm" />
        <input placeholder="Category" value={product.category} onChange={e => setProduct({...product, category: e.target.value})} className="border rounded px-3 py-2 text-sm" />
        <input placeholder="Key features (e.g. noise cancelling / 30h battery)" value={product.features} onChange={e => setProduct({...product, features: e.target.value})} className="border rounded px-3 py-2 text-sm col-span-2" />
        <input placeholder="Brand" value={product.brand} onChange={e => setProduct({...product, brand: e.target.value})} className="border rounded px-3 py-2 text-sm" />
        <input placeholder="Price range" value={product.price} onChange={e => setProduct({...product, price: e.target.value})} className="border rounded px-3 py-2 text-sm" />
      </div>

      {/* 平台选择 */}
      <div className="flex gap-2">
        {['amazon', 'shopify', 'tiktok', 'temu'].map(p => (
          <button key={p} onClick={() => setPlatform(p)} className={`px-3 py-1 rounded text-sm ${platform === p ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
            {p}
          </button>
        ))}
      </div>

      {/* 语言选择 */}
      <div className="flex gap-2 flex-wrap">
        {allLangs.map(l => (
          <button key={l} onClick={() => toggleLang(l)} className={`px-2 py-1 rounded text-xs ${langs.includes(l) ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <button onClick={generate} disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded font-medium disabled:opacity-50">
        {loading ? 'Generating...' : `Generate (${langs.length} language${langs.length > 1 ? 's' : ''})`}
      </button>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* 结果 */}
      {result && (
        <div className="space-y-4">
          {Object.entries(result).map(([lang, data]: [string, any]) => (
            <details key={lang} open className="border rounded p-3">
              <summary className="font-medium cursor-pointer">{lang.toUpperCase()}</summary>
              <div className="mt-2 text-sm space-y-2">
                <p><strong>Title:</strong> {data.title}</p>
                <p><strong>Description:</strong> {data.description?.slice(0, 200)}...</p>
                {data.bullets?.map((b: string, i: number) => <p key={i} className="ml-4">• {b}</p>)}
                <p><strong>Keywords:</strong> {data.keywords?.join(', ')}</p>
                <button onClick={() => navigator.clipboard.writeText(JSON.stringify(data, null, 2))} className="text-xs text-blue-500 hover:underline">Copy JSON</button>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
