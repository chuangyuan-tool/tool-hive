'use client';

import type { ReactNode } from 'react';
import AdSlot from '@/components/ads/AdSlot';

// 工具页统一外壳：顶部/底部自动挂广告位（未配置环境变量时不渲染，零影响现有布局）。
export default function ToolShell({ children }: { children: ReactNode }) {
  return (
    <>
      <AdSlot variant="top" />
      {children}
      <AdSlot variant="bottom" />
    </>
  );
}
