'use client';

import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';
import LanguageToggle from '@/components/LanguageToggle';

export default function Navbar() {
  const { t } = useI18n();
  return (
    <nav className="bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ToolHive</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/tools" className="hidden sm:block text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">{t.navTools}</Link>
            <Link href="/pricing" className="hidden sm:block text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">{t.navPricing}</Link>
            <Link href="/dashboard" className="hidden sm:block text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">{t.navDashboard}</Link>
            <Link href="/login" className="hidden sm:block text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">{t.navLogin}</Link>
            <LanguageToggle />
            <Link href="/pricing" className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">{t.navPro}</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
