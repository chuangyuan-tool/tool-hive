'use client';

import { useState } from 'react';
import { parseCron, nextRuns, describeCron } from '@/lib/tools/cron';

const PRESETS: { label: string; value: string }[] = [
  { label: 'Every 15 minutes', value: '*/15 * * * *' },
  { label: 'Every hour', value: '0 * * * *' },
  { label: 'Daily at 9:00 AM', value: '0 9 * * *' },
  { label: 'Weekdays at 9:00 AM', value: '0 9 * * 1-5' },
  { label: '1st of month at midnight', value: '0 0 1 * *' },
];

export default function CronGenerator() {
  const [expr, setExpr] = useState('0 9 * * 1-5');
  const parsed = parseCron(expr);
  const runs = parsed.valid ? nextRuns(expr, 5) : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Cron Expression Helper</h1>
      <p className="text-gray-600 mb-4">Build and validate standard 5-field cron expressions. Runs entirely in your browser.</p>

      <label className="block text-sm font-medium text-gray-700 mb-2">Cron expression</label>
      <input
        value={expr}
        onChange={(e) => setExpr(e.target.value)}
        className="w-full p-4 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50"
        placeholder="minute hour day month weekday"
      />

      <div className="flex flex-wrap gap-2 mt-3">
        {PRESETS.map((p) => (
          <button
            key={p.value}
            onClick={() => setExpr(p.value)}
            className="px-3 py-1.5 rounded-lg text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {parsed.valid ? (
          <>
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-sm mb-3">
              <span className="font-medium text-green-800">Valid.</span> <span className="text-green-700">{describeCron(expr.split(/\s+/), parsed.expanded)}</span>
            </div>
            <div className="text-sm font-medium text-gray-700 mb-2">Next 5 runs (your local time)</div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono">
              {runs.map((r, i) => (
                <div key={i} className="text-gray-700">{r.toLocaleString()}</div>
              ))}
            </div>
          </>
        ) : (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
            {parsed.error || 'Invalid expression'}
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500 font-mono bg-gray-50 border border-gray-200 rounded-xl p-3">
        Fields: minute hour day-of-month month day-of-week · &quot;*&quot; any · &quot;,&quot; list · &quot;-&quot; range · &quot;/&quot; step · weekday 0 or 7 = Sunday
      </div>

      <p className="mt-6 text-xs text-gray-400">Runs are computed in your local timezone. Exact scheduler behavior may vary by cron implementation.</p>
    </div>
  );
}
