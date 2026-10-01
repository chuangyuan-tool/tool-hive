'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';
const USDT_ADDRESS = 'TLMkaNbVeoTDcij65dkh2VKwSQ862oRGBx';
// 填入Creem结账链接
const CREEM_PRO_LINK = 'https://www.creem.io/payment/prod_14cJqr9OgcOjMSjekXXLdC';
const CREEM_TEAM_LINK = 'https://www.creem.io/payment/prod_6oAsKohcroodQqIuKesDRc';
export default function PricingPage() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const copyUsdt = async () => {
    try {
      await navigator.clipboard.writeText(USDT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = USDT_ADDRESS;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };
  const plans = [
    { key: 'free', name: 'Free', price: '$0', desc: t.freeDesc, features: [t.featBasic, t.featDaily, t.featCommunity], cta: t.ctaFree, highlight: true, pay: false },
    { key: 'pro', name: 'ToolHive Basic', price: '$9', desc: t.proDesc, features: [t.featEverything, t.featUnlimited, t.featAi, t.featNoAds, t.featPriority], cta: t.ctaPro, highlight: false, pay: true, link: CREEM_PRO_LINK },
    { key: 'team', name: 'ToolHive Pro Plan', price: '$29', desc: t.teamDesc, features: [t.featEverything, t.featSeats, t.featApi, t.featWorkspace], cta: t.ctaTeam, highlight: false, pay: true, link: CREEM_TEAM_LINK },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.pricingTitle}</h1>
        <p className="text-xl text-gray-600">{t.pricingSub}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        {plans.map((plan) => (
          <div key={plan.name} className={'bg-white rounded-2xl p-8 border ' + (plan.highlight ? 'shadow-lg border-2 border-blue-500 relative' : 'shadow-sm border-gray-200')}>
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap">{plan.key === 'free' ? 'Recommended' : t.mostPopular}</div>
            )}
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{plan.name}</h3>
            <p className="text-gray-500 mb-6">{plan.desc}</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
              <span className="text-gray-500">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center text-gray-600 text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            {plan.pay ? (
              <a
                href={plan.link}
                target="_blank"
                rel="noopener noreferrer"
                className={'block text-center py-3 rounded-lg font-medium transition-colors ' + (plan.highlight ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700')}
              >
                {plan.cta}
              </a>
            ) : (
              <Link href="/tools" className="block text-center py-3 rounded-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
                {plan.cta}
              </Link>
            )}
          </div>
        ))}
      </div>
      <div id="pay" className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">{t.payTitle}</h2>
        <p className="text-gray-500 text-center mb-6">{t.paySubtitle}</p>
        <div className="border border-gray-200 rounded-xl p-4 mb-6">
          <div className="text-sm font-medium text-gray-700 mb-2">{t.payUsdt}</div>
          <div className="flex items-center gap-2">
            <code className="flex-1 font-mono text-sm bg-gray-50 rounded-lg p-2.5 break-all text-gray-900">{USDT_ADDRESS}</code>
            <button
              onClick={copyUsdt}
              className="shrink-0 px-4 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
            >
              {copied ? t.payCopied + ' ✓' : t.payCopy}
            </button>
          </div>
        </div>
        <div className="border border-gray-200 rounded-xl p-4 mb-6">
          <div className="text-sm font-medium text-gray-700 mb-2">💳 Pay by Card / Crypto (Creem)</div>
          {CREEM_PRO_LINK || CREEM_TEAM_LINK ? (
            <div className="space-y-2">
              {CREEM_PRO_LINK ? (
                <a href={CREEM_PRO_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-block px-4 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors">
                  💳 Upgrade to ToolHive Basic ($9/mo)
                </a>
              ) : null}
              {CREEM_TEAM_LINK ? (
                <a href={CREEM_TEAM_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-block px-4 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors">
                  💳 Upgrade to ToolHive Pro Plan ($29/mo)
                </a>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Online card &amp; crypto checkout is being set up. For now, pay via <b>USDT</b> (address above) or <b>email</b> (below) and we'll activate your plan within minutes.
            </p>
          )}
        </div>
        <p className="text-center text-sm mt-4" style={{ color: '#666' }}>Payment will be available after store verification.</p>
        <div className="border border-gray-200 rounded-xl p-4">
          <div className="text-sm text-gray-600 mb-2">{t.payMore}</div>
          <a
            href="mailto:15981927999@163.com"
            className="inline-block px-4 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
          >
            15981927999@163.com
          </a>
        </div>
        <p className="text-xs text-gray-400 text-center mt-5">{t.payNote}</p>
      </div>
      <div className="mt-10 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-900">Contact &amp; Support</h3>
        <p className="text-gray-600 mt-2">If you have any questions, please email us: <a href="mailto:15981927999@163.com" className="text-blue-600 hover:underline">15981927999@163.com</a></p>
      </div>
      <div className="mt-10 max-w-2xl mx-auto text-sm text-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Terms of Service</h3>
        <p className="mb-2">All products are digital virtual goods. Our Pro and Team plans are recurring monthly subscriptions, and we also offer one-time purchase products. Subscriptions renew monthly until you cancel; you can cancel anytime from your account dashboard and keep access until the end of the current billing period. See our <a href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</a> for billing and refund details.</p>
        <p className="mb-2"><b>Refund Policy:</b> Full refund within 14 days of purchase if the service cannot be delivered. Once the digital service is activated and used, refunds will not be accepted.</p>
        <p className="mb-2"><b>Disclaimer:</b> The service is provided "as is". We do not guarantee the service will be uninterrupted or error-free. We are not liable for any indirect losses caused by using this service.</p>
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Privacy Policy</h3>
        <p>We only collect necessary information for order processing. Your personal data will not be sold or shared with third parties for marketing purposes. For privacy questions, contact us: <a href="mailto:15981927999@163.com" className="text-blue-600 hover:underline">15981927999@163.com</a></p>
      </div>
      <div className="mt-8 text-center text-xs text-gray-400">
        <p><a href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</a> | <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a></p>
      </div>
    </div>
  );
}
