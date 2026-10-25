import type { ReactNode } from 'react';
import type { Metadata } from 'next';

// /tools 页面本身是客户端组件，metadata 只能放在 layout 里。
export const metadata: Metadata = {
  title: 'All Tools — Free Online Developer Utilities',
  description:
    'Browse every ToolHive tool: JSON formatter, JWT decoder, hash calculator, regex tester, image compressor, QR codes, unit converter and more. All free, all in your browser.',
  alternates: { canonical: 'https://toolhive.com.cn/tools' },
};

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
