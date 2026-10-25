import type { ReactNode } from 'react';
import type { Metadata } from 'next';

// /pricing 页面本身是客户端组件，metadata 只能放在 layout 里。
export const metadata: Metadata = {
  title: 'Pricing — Free, Pro $9/mo, Team $29/mo',
  description:
    'ToolHive pricing: every browser-side tool is free forever. Pro unlocks unlimited usage and AI tools for $9/month, Team adds 5 seats and API access for $29/month.',
  alternates: { canonical: 'https://toolhive.com.cn/pricing' },
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
