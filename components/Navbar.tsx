'use client';

import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';
import { useTheme } from '@/lib/theme-context';
import LanguageToggle from '@/components/LanguageToggle';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const ed = theme === 'editorial';

  const navLinkCls = ed
    ? 'text-[#555] hover:text-[#1a1a1a]'
    : 'text-gray-600 hover:text-gray-900';

  const proBtnCls = ed
    ? 'bg-[#1a1a1a] hover:bg-[#333] text-white'
    : 'bg-blue-500 hover:bg-blue-600 text-white';

  const logoBoxCls = ed
    ? 'bg-[#1a1a1a] text-white'
    : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white';

  const logoTextCls = ed ? 'text-[#1a1a1a]' : 'text-gray-900';
  const navBorderCls = ed ? 'border-b-2 border-[#1a1a1a]' : 'border-b border-gray-200';
  const navBgCls = ed ? 'bg-[#f9f7f2]/90' : 'bg-white/90';

  return (
    <nav className={`sticky top-0 z-50 transition-colors duration-300 ${navBgCls} ${navBorderCls} backdrop-blur`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${logoBoxCls}`}>
              <span className="font-bold text-sm">T</span>
            </div>
            <span className={`text-xl font-bold ${logoTextCls}`}>ToolHive</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/tools" className={`hidden sm:block text-sm font-medium transition-colors ${navLinkCls}`}>{t.navTools}</Link>
            <Link href="/pricing" className={`hidden sm:block text-sm font-medium transition-colors ${navLinkCls}`}>{t.navPricing}</Link>
            <Link href="/dashboard" className={`hidden sm:block text-sm font-medium transition-colors ${navLinkCls}`}>{t.navDashboard}</Link>
            <Link href="/login" className={`hidden sm:block text-sm font-medium transition-colors ${navLinkCls}`}>{t.navLogin}</Link>
            <LanguageToggle />
            <ThemeToggle />
            <Link href="/pricing" className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${proBtnCls}`}>{t.navPro}</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
