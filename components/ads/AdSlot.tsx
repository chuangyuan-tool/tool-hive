'use client';

import Script from 'next/script';

type AdSlotProps = { variant?: 'top' | 'bottom' };

// 广告位（AdSense）：只有配置了 Vercel 环境变量
// NEXT_PUBLIC_ADSENSE_CLIENT / NEXT_PUBLIC_ADSENSE_SLOT 时才渲染，否则页面上完全不出现。
export default function AdSlot({ variant = 'top' }: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT;

  if (!client || !slot) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-3" data-ad={variant}>
      <ins
        className="adsbyblock"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script
        id={`adsense-${variant}`}
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
        strategy="lazyOnload"
        async
        onLoad={() => {
          const w = window as unknown as { adsbygoogle?: { push: (v: object) => void } };
          try {
            w.adsbygoogle?.push({});
          } catch {
            /* noop */
          }
        }}
      />
    </div>
  );
}
