'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { dictionaries, type Dict, type Lang, toolNamesZh } from '@/lib/i18n';

interface I18nState {
  lang: Lang;
  t: Dict;
  toolName: (id: string, fallback: string) => string;
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<I18nState | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('toolhive-lang');
      if (saved === 'en' || saved === 'zh') setLangState(saved);
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('toolhive-lang', lang);
    } catch (e) {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    }
  }, [lang]);

  const value: I18nState = {
    lang,
    t: dictionaries[lang],
    toolName: (id, fallback) => (lang === 'zh' ? toolNamesZh[id] ?? fallback : fallback),
    setLang: setLangState,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nState {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return { lang: 'en', t: dictionaries.en, toolName: (_id, fb) => fb, setLang: () => {} };
  }
  return ctx;
}
