'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';

export default function DashboardPage() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const apiKey = 'th_live_xxxxxxxxxxxxxxxxxxxxxxxx';

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.dashboardTitle}</h1>
        <p className="text-gray-600 mt-2">{t.dashboardSubtitle}</p>
      </div>

      {/* 套餐信息 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{t.dashboardCurrentPlan}</h2>
            <p className="text-gray-500 text-sm mt-1">{t.dashboardFreePlan}</p>
          </div>
          <Link 
            href="/pricing" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t.dashboardUpgrade}
          </Link>
        </div>
      </div>

      {/* API Key */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.dashboardApiKey}</h2>
        <div className="flex items-center gap-2">
          <code className="flex-1 bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm text-gray-700">
            {apiKey}
          </code>
          <button
            onClick={copyApiKey}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors"
          >
            {copied ? t.dashboardCopied : t.dashboardCopy}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">{t.dashboardApiKeyNote}</p>
      </div>

      {/* 使用统计 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.dashboardUsage}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">10</div>
            <div className="text-sm text-gray-600">{t.dashboardDailyLimit}</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-sm text-gray-600">{t.dashboardUsedToday}</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-sm text-gray-600">{t.dashboardTotalCalls}</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">0</div>
            <div className="text-sm text-gray-600">{t.dashboardTokensUsed}</div>
          </div>
        </div>
      </div>

      {/* 快速链接 */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/tools" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
          <div className="text-2xl mb-2">🛠️</div>
          <div className="text-sm font-medium text-gray-700">{t.dashboardGoTools}</div>
        </Link>
        <Link href="/pricing" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
          <div className="text-2xl mb-2">💎</div>
          <div className="text-sm font-medium text-gray-700">{t.dashboardUpgradePlan}</div>
        </Link>
        <Link href="/api-docs" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
          <div className="text-2xl mb-2">📚</div>
          <div className="text-sm font-medium text-gray-700">{t.dashboardApiDocs}</div>
        </Link>
        <Link href="/settings" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
          <div className="text-2xl mb-2">⚙️</div>
          <div className="text-sm font-medium text-gray-700">{t.dashboardSettings}</div>
        </Link>
      </div>
    </div>
  );
}
