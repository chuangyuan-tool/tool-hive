'use client';

import Link from 'next/link';
import type { Tool } from '@/lib/tools-data';
import { useI18n } from '@/components/I18nProvider';

export default function ToolCard({ tool }: { tool: Tool }) {
  const { t, toolName } = useI18n();
  const name = toolName(tool.id, tool.name);
  const desc = t.toolDescs[tool.id] ?? tool.description;
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
