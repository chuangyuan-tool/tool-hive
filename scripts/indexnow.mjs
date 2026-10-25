#!/usr/bin/env node
// IndexNow 推送：把 sitemap 里的 URL 主动告诉 Bing / Yandex / Seznam / Naver。
//
// 为什么需要：新站等搜索引擎自己发现要几周到几个月，IndexNow 是主动通知，
// 通常几小时内就能抓。Google 不参与 IndexNow，Google 那边得靠 Search Console
// 提交 sitemap（见下方 README 说明）。
//
// 用法：
//   node scripts/indexnow.mjs              # 推送 sitemap 里所有 URL
//   node scripts/indexnow.mjs --dry-run    # 只打印，不真发
//
// 依赖：Node 18+（自带 fetch）。无需 npm 安装任何东西。

const KEY = 'cee07103bdcd149839132deb7ec73e8b';
const HOST = 'toolhive.com.cn';
const BASE = `https://${HOST}`;
const SITEMAP = `${BASE}/sitemap.xml`;

const dryRun = process.argv.includes('--dry-run');

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP);
  if (!res.ok) throw new Error(`抓 sitemap 失败: HTTP ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) throw new Error('sitemap 里没解析到任何 URL');
  return urls;
}

async function verifyKeyFile() {
  // IndexNow 要求 key 文件可访问且内容等于 key 本身，否则请求会被拒。
  const url = `${BASE}/${KEY}.txt`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`key 文件不可访问: ${url} -> HTTP ${res.status}`);
  const body = (await res.text()).trim();
  if (body !== KEY) throw new Error(`key 文件内容不匹配: 期望 ${KEY}，实际 ${body}`);
  console.log(`key 文件校验通过: ${url}`);
}

async function submit(urls) {
  // 一个请求最多 10000 条，这里远低于上限，一次发完。
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `${BASE}/${KEY}.txt`,
    urlList: urls,
  };

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
  ];

  for (const endpoint of endpoints) {
    if (dryRun) {
      console.log(`[dry-run] 会 POST ${urls.length} 个 URL 到 ${endpoint}`);
      continue;
    }
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
      });
      // 200 = 接受；202 = 已接受待处理。两者都算成功。
      const ok = res.status === 200 || res.status === 202;
      console.log(`${ok ? 'OK  ' : 'FAIL'} ${endpoint} -> HTTP ${res.status}`);
      if (!ok) {
        const text = await res.text().catch(() => '');
        if (text) console.log(`     ${text.slice(0, 300)}`);
      }
    } catch (err) {
      console.log(`FAIL ${endpoint} -> ${err.message}`);
    }
  }
}

const urls = await fetchSitemapUrls();
console.log(`sitemap 共 ${urls.length} 个 URL`);
if (!dryRun) await verifyKeyFile();
await submit(urls);
console.log(dryRun ? '\n干跑结束，未发送。' : '\n推送完成。Bing 通常几小时内开始抓取。');
