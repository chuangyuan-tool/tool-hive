'use client';

import { useTheme } from '@/lib/theme-context';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const trackCls = theme === 'editorial' ? 'bg-[#1a1a1a]' : 'bg-gray-200';
  return (
    <button
      onClick={toggle}
      title={theme === 'classic' ? 'Switch to Editorial theme' : 'Switch to Classic theme'}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${trackCls}`}
      aria-label="Toggle theme"
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm
          transition-transform duration-300 flex items-center justify-center text-[10px]"
        style={{ transform: theme === 'editorial' ? 'translateX(24px)' : 'translateX(0)' }}
      >
        {theme === 'editorial' ? '✦' : '◻'}
      </span>
    </button>
  );
}
