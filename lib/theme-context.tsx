'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'classic' | 'editorial';

interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'classic', toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('editorial');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('toolhive-theme') as Theme | null;
      if (saved === 'classic' || saved === 'editorial') setTheme(saved);
    } catch { /* SSR safe */ }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('toolhive-theme', theme); } catch {}
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'classic' ? 'editorial' : 'classic'));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
