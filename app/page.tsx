'use client';

import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import { tools } from '@/lib/tools-data';
import { useI18n } from '@/components/I18nProvider';

export default function Home() {
  const { t } = useI18n();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {t.heroTitle1}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">{t.heroTitle2}</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t.heroSubtitle}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/tools" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">{t.browseTools}</Link>
          <Link href="/pricing" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors">{t.navPricing}</Link>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{t.allToolsHeading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">{t.whyHeading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">{'⚡'}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.whyFast}</h3>
            <p className="text-gray-600 text-sm">{t.whyFastDesc}</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">{'🔒'}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.whyPrivate}</h3>
            <p className="text-gray-600 text-sm">{t.whyPrivateDesc}</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">{'💸'}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.whyFree}</h3>
            <p className="text-gray-600 text-sm">{t.whyFreeDesc}</p>
          </div>
        </div>
      </div>

      <div className="text-center pb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
        <p className="text-gray-600 mb-8">{t.ctaSub}</p>
        <Link href="/tools" className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">{t.ctaBtn}</Link>
      </div>
    </div>
  );
}
