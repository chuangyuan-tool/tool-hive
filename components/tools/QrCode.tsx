'use client';

import { useState } from 'react';
import { qrToSvg, qrToDataUrl } from '@/lib/tools/qrcode';
import jsQR from 'jsqr';

export default function QrCode() {
  const [text, setText] = useState('');
  const [scanText, setScanText] = useState('');
  const [scanErr, setScanErr] = useState('');
  const [copied, setCopied] = useState(false);

  const svg = text ? qrToSvg(text) : '';
  const download = () => {
    const a = document.createElement('a');
    a.href = qrToDataUrl(text, 12, 2);
    a.download = 'qr-code.png';
    a.click();
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setScanErr('');
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        const scale = Math.min(1, 1024 / Math.max(img.width, img.height));
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        const ctx = c.getContext('2d')!;
        ctx.drawImage(img, 0, 0, c.width, c.height);
        const data = ctx.getImageData(0, 0, c.width, c.height);
        const qr = jsQR(data.data, data.width, data.height);
        if (qr?.data) {
          setScanText(qr.data);
        } else {
          setScanText('');
          setScanErr('No QR code found in this image. Try a sharper photo.');
        }
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(scanText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-lg font-semibold mb-3">Generate</h2>
        <p className="text-gray-500 text-sm mb-3">Type any text or URL — the QR code is built right here in your browser.</p>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Text or URL..." className="w-full border rounded px-3 py-2 text-sm" />
        {svg && (
          <div className="mt-4 flex flex-col items-center gap-3">
            <div className="bg-white p-3 border rounded-lg" dangerouslySetInnerHTML={{ __html: svg }} />
            <button onClick={download} className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium">Download PNG</button>
          </div>
        )}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-3">Scan</h2>
        <p className="text-gray-500 text-sm mb-3">Upload a photo containing a QR code — decoded locally, nothing uploaded.</p>
        <input type="file" accept="image/*" onChange={onFile} className="text-sm" />
        {scanErr && <div className="text-amber-600 text-sm mt-3">{scanErr}</div>}
        {scanText && (
          <div className="mt-3 border rounded p-4 bg-gray-50">
            <div className="text-sm font-mono break-all">{scanText}</div>
            <button onClick={copy} className="mt-2 text-xs text-blue-500 hover:text-blue-700">{copied ? 'Copied!' : 'Copy'}</button>
          </div>
        )}
      </div>
    </div>
  );
}
