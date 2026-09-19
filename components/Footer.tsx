'use client';

import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-lg font-bold text-gray-900">ToolHive</span>
            </div>
            <p className="text-gray-500 text-sm">{t.footerTagline}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">{t.footerTools}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools/json-formatter" className="text-gray-500 hover:text-gray-900">JSON Formatter</Link></li>
              <li><Link href="/tools/password-generator" className="text-gray-500 hover:text-gray-900">Password Generator</Link></li>
              <li><Link href="/tools/base64-converter" className="text-gray-500 hover:text-gray-900">Base64 Converter</Link></li>
              <li><Link href="/tools/color-picker" className="text-gray-500 hover:text-gray-900">Color Picker</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">{t.footerMore}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools/image-compressor" className="text-gray-500 hover:text-gray-900">Image Compressor</Link></li>
              <li><Link href="/tools/csv-to-json" className="text-gray-500 hover:text-gray-900">CSV to JSON</Link></li>
              <li><Link href="/pricing" className="text-gray-500 hover:text-gray-900">{t.navPricing}</Link></li>
              <li><Link href="/tools" className="text-gray-500 hover:text-gray-900">{t.navTools}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">{t.footerLegal}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-500 hover:text-gray-900">{t.privacy}</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900">{t.terms}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-8 pt-6 text-center text-sm text-gray-400">
          &copy; 2026 {t.copyright}
        </div>
      </div>
    </footer>
  );
}
