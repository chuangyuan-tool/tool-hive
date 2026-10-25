import type { ReactNode } from 'react';
import type { Metadata } from 'next';

// /api-docs 页面是客户端组件，metadata 只能放在 layout 里。
export const metadata: Metadata = {
  title: 'API Documentation — ToolHive Developer API',
  description:
    'REST API reference for ToolHive: authentication with API keys, endpoint list, request and response formats, rate limits and error codes.',
  alternates: { canonical: 'https://toolhive.com.cn/api-docs' },
};

export default function ApiDocsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
