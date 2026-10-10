import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { I18nProvider } from '@/components/I18nProvider';
import { ThemeProvider } from '@/lib/theme-context';
import './globals.css';

// Cloudflare Web Analytics
const CF_ANALYTICS_TOKEN = 'f2638ea026e1498cbf24fb978c81c885';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ToolHive - Free Online Developer Tools',
    template: '%s | ToolHive',
  },
  description: 'Fast, free online tools for developers: JSON formatter, password generator, Base64 converter, color picker, image compressor and CSV/JSON converter.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="editorial">
      <head>
        {CF_ANALYTICS_TOKEN && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CF_ANALYTICS_TOKEN })}
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <I18nProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
