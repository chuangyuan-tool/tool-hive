'use client';

import ToolCard from '@/components/ToolCard';
import { tools } from '@/lib/tools-data';
import { useI18n } from '@/components/I18nProvider';
import { useTheme } from '@/lib/theme-context';

export default function ToolsPage() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const ed = theme === 'editorial';

  if (ed) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <span className="th-mono-label">ALL TOOLS</span>
          <span className="th-mono-label">{String(tools.length).padStart(2, '0')} / 99</span>
        </div>
        <div className="mb-3">
          <span className="th-pill bg-[#ff6b2b] text-white">Tool Map</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#1a1a1a] mb-2">
          {t.allToolsHeading}
        </h1>
        <p className="text-lg text-[#555] mb-10">{t.allToolsSub}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </div>
    );
  }

  // Classic
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t.allToolsHeading}</h1>
      <p className="text-gray-600 mb-10">{t.allToolsSub}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} index={i} />
        ))}
      </div>
    </div>
  );
}
