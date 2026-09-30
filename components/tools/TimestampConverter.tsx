'use client';

import { useState } from 'react';
import { unixToIso, dateToUnix, unixParts, formatUnix, nowUnixSeconds } from '@/lib/tools/timestamp';

export default function TimestampConverter() {
  const [ts, setTs] = useState('');
  const [dateStr, setDateStr] = useState('');

  const parsed = ts ? Number(ts) : NaN;
  const parts = !Number.isNaN(parsed) ? unixParts(parsed) : null;
  const unixFromDate = dateStr ? dateToUnix(dateStr) : null;

  const useNow = () => setTs(String(nowUnixSeconds()));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Timestamp Converter</h1>
      <p className="text-gray-600 mb-4">Convert between Unix timestamps (seconds or milliseconds) and human-readable dates. Runs entirely in your browser.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Unix timestamp</label>
            <button onClick={useNow} className="text-xs text-blue-500 hover:text-blue-700">Use now</button>
          </div>
          <input
            value={ts}
            onChange={(e) => setTs(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50"
            placeholder="e.g. 1700000000"
          />
          {parts && (
            <div className="mt-3 space-y-2 text-sm">
              <div><span className="text-gray-500">UTC:</span> <span className="font-mono">{parts.utc}</span></div>
              <div><span className="text-gray-500">ISO:</span> <span className="font-mono">{parts.iso}</span></div>
              <div><span className="text-gray-500">Seconds:</span> <span className="font-mono">{parts.seconds}</span> <span className="text-gray-500">· Millis:</span> <span className="font-mono">{parts.milliseconds}</span></div>
              <div><span className="text-gray-500">Local:</span> <span className="font-mono">{formatUnix(parts.seconds, { tz: undefined })}</span></div>
              <div><span className="text-gray-500">Weekday (UTC):</span> {parts.weekday}</div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date &amp; time</label>
          <input
            type="datetime-local"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50"
          />
          {unixFromDate !== null && (
            <div className="mt-3 space-y-2 text-sm">
              <div><span className="text-gray-500">Unix seconds:</span> <span className="font-mono">{unixFromDate}</span></div>
              <div><span className="text-gray-500">Unix milliseconds:</span> <span className="font-mono">{unixFromDate * 1000}</span></div>
              <div><span className="text-gray-500">ISO (UTC):</span> <span className="font-mono">{unixToIso(unixFromDate)}</span></div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400">Dates are converted using your device&apos;s local timezone unless noted UTC.</p>
    </div>
  );
}
