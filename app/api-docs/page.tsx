'use client';

import { useI18n } from '@/components/I18nProvider';

export default function ApiDocsPage() {
  const { t } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.apiDocsTitle}</h1>
        <p className="text-gray-600 mt-2">{t.apiDocsSubtitle}</p>
      </div>

      <div className="space-y-8">
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Base URL</h2>
          <code className="block bg-gray-100 px-4 py-3 rounded-lg text-sm font-mono text-gray-800">
            https://api.toolhive.com/v1
          </code>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Authentication</h2>
          <p className="text-gray-600 mb-4">{t.apiDocsAuthDesc}</p>
          <pre className="bg-gray-100 px-4 py-3 rounded-lg text-sm font-mono overflow-x-auto">
{`Authorization: Bearer YOUR_API_KEY`}
          </pre>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Chat Completions</h2>
          <p className="text-gray-600 mb-4">{t.apiDocsEndpointDesc}</p>
          <pre className="bg-gray-100 px-4 py-3 rounded-lg text-sm font-mono overflow-x-auto">
{`POST /v1/chat/completions

{
  "model": "gpt-4",
  "messages": [
    {"role": "user", "content": "Hello!"}
  ],
  "max_tokens": 1000
}`}
          </pre>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.apiDocsPricing}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-4">{t.apiDocsModel}</th>
                  <th className="text-left py-2 px-4">{t.apiDocsInput}</th>
                  <th className="text-left py-2 px-4">{t.apiDocsOutput}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">gpt-4</td>
                  <td className="py-2 px-4">$0.03/1K tokens</td>
                  <td className="py-2 px-4">$0.06/1K tokens</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">gpt-3.5-turbo</td>
                  <td className="py-2 px-4">$0.0015/1K tokens</td>
                  <td className="py-2 px-4">$0.002/1K tokens</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">{t.apiDocsNote}</h2>
          <p className="text-blue-700 text-sm">{t.apiDocsNoteDesc}</p>
        </section>
      </div>
    </div>
  );
}
