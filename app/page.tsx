'use client';

import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import { tools } from '@/lib/tools-data';
import { useI18n } from '@/components/I18nProvider';
import { useTheme } from '@/lib/theme-context';

export default function Home() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const ed = theme === 'editorial';

  if (ed) {
    return <HomeEditorial t={t} tools={tools} />;
  }

  // === CLASSIC THEME (existing) ===
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

      <div className="text-center pb-4">
        <p className="text-xs text-gray-400 max-w-xl mx-auto">
          ToolHive (toolhive.com.cn) is independently operated, and has no affiliation with toolhive.com or other open-source projects named ToolHive.
        </p>
      </div>
    </div>
  );
}

// === EDITORIAL THEME ===
function HomeEditorial({ t, tools }: { t: any; tools: any[] }) {
  const accentColors = ['#8b5cf6', '#ff6b2b', '#06d6a0'];
  const sectionCount = tools.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* HERO SECTION */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-6">
          <span className="th-mono-label">TOOL PLATFORM</span>
          <span className="th-mono-label">01 / 04</span>
        </div>
        <div className="mb-3">
          <span className="th-pill bg-[#8b5cf6] text-white">Free & Local</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#1a1a1a] leading-tight mb-4">
          {t.heroTitle1} {t.heroTitle2}
        </h1>
        <p className="text-xl text-[#555] max-w-2xl">{t.heroSubtitle}</p>
      </section>

      {/* CAPABILITY MAP - TOOL GRID */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <span className="th-mono-label">TOOL MAP</span>
          <span className="th-mono-label">02 / 04</span>
        </div>
        <div className="mb-3">
          <span className="th-pill bg-[#ff6b2b] text-white">All Tools</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-2">
          {t.allToolsHeading}
        </h2>
        <p className="text-lg text-[#555] mb-8">{t.allToolsSub}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {tools.map((tool, i) => (
            <Link
              key={tool.id}
              href={tool.url}
              className="th-card th-card-strip p-7 block group hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="mb-3">
                <span className="font-mono text-sm font-bold text-[#1a1a1a]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[#1a1a1a] mb-1 group-hover:underline underline-offset-4">
                {tool.name}
              </h3>
              <p className="text-sm text-[#555] mb-3">{tool.description}</p>
              <span className="text-xs text-[#999] font-mono uppercase">{tool.category}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY SECTION - FLOW BAR */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <span className="th-mono-label">WHY TOOLHIVE</span>
          <span className="th-mono-label">03 / 04</span>
        </div>
        <div className="mb-3">
          <span className="th-pill bg-[#06d6a0] text-white">Why Us</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-2">
          {t.whyHeading}
        </h2>
        <p className="text-lg text-[#555] mb-8">
          Fast, Private, Free — three principles, zero compromise.
        </p>

        {/* 3 feature cards in a row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-8">
          <div className="th-card th-card-strip p-7">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">{t.whyFast}</h3>
            <p className="text-sm text-[#555]">{t.whyFastDesc}</p>
          </div>
          <div className="th-card th-card-strip p-7">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">{t.whyPrivate}</h3>
            <p className="text-sm text-[#555]">{t.whyPrivateDesc}</p>
          </div>
          <div className="th-card th-card-strip p-7">
            <div className="text-3xl mb-4">💸</div>
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">{t.whyFree}</h3>
            <p className="text-sm text-[#555]">{t.whyFreeDesc}</p>
          </div>
        </div>

        {/* Flow bar */}
        <div className="th-flow-bar px-6 py-4 flex items-center gap-4 overflow-x-auto">
          <div className="flex flex-col shrink-0">
            <span className="font-mono text-xs opacity-60">ONE CLICK</span>
            <span className="text-sm font-bold">Start a tool</span>
          </div>
          <span className="text-2xl opacity-60 shrink-0">→</span>
          <span className="th-flow-bar px-4 py-2 text-sm font-medium shrink-0 rounded-full border border-white/20">Local processing</span>
          <span className="text-2xl opacity-60 shrink-0">→</span>
          <span className="th-flow-bar px-4 py-2 text-sm font-medium shrink-0 rounded-full border border-white/20">Instant result</span>
          <span className="text-2xl opacity-60 shrink-0">→</span>
          <span className="px-4 py-2 text-sm font-medium shrink-0 rounded-full bg-[#06d6a0] text-[#1a1a1a] font-bold">Done</span>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <span className="th-mono-label">GET STARTED</span>
          <span className="th-mono-label">04 / 04</span>
        </div>
        <div className="mb-3">
          <span className="th-pill bg-[#1a1a1a] text-white">Action</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-4">
          {t.ctaTitle}
        </h2>
        <p className="text-lg text-[#555] mb-8">{t.ctaSub}</p>
        <Link
          href="/tools"
          className="inline-block bg-[#1a1a1a] hover:bg-[#333] text-white px-10 py-4 rounded-xl font-bold text-lg transition-colors"
        >
          {t.ctaBtn} →
        </Link>
      </section>

      {/* DISCLAIMER */}
      <div className="text-center pb-4">
        <p className="text-xs text-[#999] max-w-xl mx-auto">
          ToolHive (toolhive.com.cn) is independently operated, and has no affiliation with toolhive.com or other open-source projects named ToolHive.
        </p>
      </div>
    </div>
  );
}
