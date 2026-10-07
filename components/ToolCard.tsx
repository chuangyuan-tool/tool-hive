'use client';

import Link from 'next/link';
import type { Tool } from '@/lib/tools-data';
import { useI18n } from '@/components/I18nProvider';
import { useTheme } from '@/lib/theme-context';

export default function ToolCard({ tool, index }: { tool: Tool; index?: number }) {
  const { t, toolName } = useI18n();
  const { theme } = useTheme();
  const ed = theme === 'editorial';
  const name = toolName(tool.id, tool.name);
  const desc = t.toolDescs[tool.id] ?? tool.description;

  if (ed) {
    return (
      <Link href={tool.url} className="th-card p-6 block group hover:-translate-y-1 transition-transform duration-200">
        <div className="flex items-start justify-between mb-3">
          <span className="font-mono text-sm font-bold text-[#1a1a1a]">
            {String((index ?? 0) + 1).padStart(2, '0')}
          </span>
          {tool.popular && (
            <span className="th-pill bg-[#06d6a0] text-white text-xs">★</span>
          )}
        </div>
        <h3 className="text-xl font-bold text-[#1a1a1a] mb-1 group-hover:underline underline-offset-4">{name}</h3>
        <p className="text-sm text-[#555] mb-3">{desc}</p>
        <span className="text-xs text-[#999] font-mono uppercase">{tool.category}</span>
      </Link>
    );
  }

  // Classic
  return (
    <Link href={tool.url} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 block group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-2xl">{tool.icon}</div>
        {tool.popular && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">Popular</span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{name}</h3>
      <p className="text-gray-500 text-sm mb-3">{desc}</p>
      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">{tool.category}</span>
    </Link>
  );
}
