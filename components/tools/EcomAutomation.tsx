'use client';

import { useState } from 'react';

const TEMPLATES = [
  { id: 'order-sync', name: '订单同步', desc: '新订单自动通知 + 库存扣减 + 物流单号回填', platform: 'Shopify/Amazon' },
  { id: 'review-reply', name: '差评自动回复', desc: '监控 1-3 星评价，自动发优惠券 + 礼貌回复', platform: 'Amazon' },
  { id: 'daily-report', name: '日报自动生成', desc: '每天 9:00 汇总昨日销售/库存/广告数据，发 Telegram/邮件', platform: 'All' },
  { id: 'price-monitor', name: '竞品价格监控', desc: '每小时检查竞品价格，低于阈值自动通知', platform: 'Amazon' },
];

export default function EcomAutomation() {
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState('');

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const deploy = async () => {
    if (selected.length === 0) { setStatus('Please select at least one workflow'); return; }
    setStatus('Deployment requires n8n instance. Coming online after n8n is configured.');
    // TODO: 接入 n8n API 部署工作流
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">⚡ E-commerce Automation</h1>
      <p className="text-gray-500">Pick pre-built workflows, we deploy them to your store. No coding needed.</p>

      <div className="space-y-3">
        {TEMPLATES.map(t => (
          <div key={t.id} className={`border rounded p-4 cursor-pointer transition ${selected.includes(t.id) ? 'border-blue-400 bg-blue-50' : ''}`} onClick={() => toggle(t.id)}>
            <div className="font-medium">{t.name} <span className="text-xs text-gray-400 ml-2">{t.platform}</span></div>
            <div className="text-sm text-gray-600 mt-1">{t.desc}</div>
          </div>
        ))}
      </div>

      <button onClick={deploy} disabled={selected.length === 0} className="w-full py-3 bg-blue-600 text-white rounded font-medium disabled:opacity-50">
        Deploy {selected.length > 0 ? `(${selected.length} workflows)` : ''}
      </button>

      {status && <div className="text-sm text-blue-600">{status}</div>}
      <p className="text-xs text-gray-400">Note: Requires n8n self-hosted instance. Setup guide will be available after deployment.</p>
    </div>
  );
}
