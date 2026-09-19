'use client';

import { useI18n } from '@/components/I18nProvider';

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
      className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 rounded-lg px-3 py-1.5"
      aria-label="Switch language"
    >
      <span>{lang === 'en' ? '中文' : 'EN'}</span>
      <span className="text-xs">{'⇄'}</span>
    </button>
  );
}
