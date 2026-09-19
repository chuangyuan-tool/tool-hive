'use client';

import ToolCard from '@/components/ToolCard';
import { tools } from '@/lib/tools-data';
import { useI18n } from '@/components/I18nProvider';

export default function ToolsPage() {
  const { t } = useI18n();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t.allToolsHeading}</h1>
      <p className="text-gray-600 mb-10">{t.allToolsSub}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
