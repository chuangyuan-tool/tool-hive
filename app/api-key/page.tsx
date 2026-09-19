'use client';

import { useState } from 'react';
import { useI18n } from '@/components/I18nProvider';

const KEYS = [
  { id: 1, name: 'Production', key: 'th_live_xxxxxxxxxxxxxxxxxxxxxxxx', created: '2024-01-01', status: 'active' },
  { id: 2, name: 'Testing', key: 'th_test_yyyyyyyyyyyyyyyyyyyyyyyy', created: '2024-01-15', status: 'active' },
];

export default function ApiKeyPage() {
  const { t } = useI18n();
  const [keys, setKeys] = useState(KEYS);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyKey = (id: number, key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const revokeKey = (id: number) => {
    setKeys(keys.filter(k => k.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.apiKeyTitle}</h1>
        <p className="text-gray-600 mt-2">{t.apiKeySubtitle}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            {t.apiKeyCreate}
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {keys.map((key) => (
            <div key={key.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{key.name}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      key.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {key.status === 'active' ? t.apiKeyActive : t.apiKeyRevoked}
                    </span>
                  </div>
                  <code className="text-sm text-gray-500 font-mono">{key.key}</code>
                  <p className="text-xs text-gray-400 mt-1">{t.apiKeyCreated}: {key.created}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyKey(key.id, key.key)}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {copiedId === key.id ? t.apiKeyCopied : t.apiKeyCopy}
                  </button>
                  <button
                    onClick={() => revokeKey(key.id)}
                    className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 transition-colors"
                  >
                    {t.apiKeyRevoke}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">{t.apiKeyWarning}</p>
      </div>
    </div>
  );
}
