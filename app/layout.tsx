import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { I18nProvider } from '@/components/I18nProvider';
import './globals.css';

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
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
