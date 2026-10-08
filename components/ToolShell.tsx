'use client';

import type { ReactNode } from 'react';
import AdSlot from '@/components/ads/AdSlot';

// 工具页统一外壳：editorial 风格页面结构 + 广告位
export default function ToolShell({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="editorial-tool max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AdSlot variant="top" />
      {children}
      <AdSlot variant="bottom" />
    </div>
  );
}
