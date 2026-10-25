# ToolHive 推广投稿包

> 更新：2026-10-26。本文里的文案可直接复制粘贴，不用改写。
> 每条都标注了「要不要账号」「要不要手机号」「我能不能代做」。

---

## 零、先看这条：哪些渠道已经被排除

查过原文规则，下面这些**别再花时间**：

| 渠道 | 为什么不行 | 依据 |
|---|---|---|
| **free-for-dev**（140k★，最大渠道） | 明确拒绝工具站 | CONTRIBUTING.md 原文："Generic developer 'toolbox' sites - format converters, calculators etc, we have too many already and more will not add value" |
| **awesome-selfhosted** | 你的站不是可自托管软件 | 它收录的是能自己部署的服务，不是在线工具站 |
| **awesome-cli-apps** | 同上，要命令行工具 | — |
| **DevHunt** | 收 $49 上线费 | 官网明码标价 |
| **Awesome Tools** | 要求站点 DR≥30 | submitmap.com 汇总的准入条件 |

结论：**工具站这条路，目录提交能用的很少**。真正有效的是 ①搜索引擎收录 ②Show HN ③写文章。

---

## 一、已经做完的（不用你动手）

| 事项 | 状态 | 说明 |
|---|---|---|
| 每个工具页独立 title | ✅ 已上线 | 原来 46 个页面共用一个标题，Google 当成同一页 |
| sitemap.xml | ✅ 已上线 | 原来 404，现在 25 条 URL |
| robots.txt | ✅ 已上线 | 原来只有 Cloudflare 默认文件，没有 sitemap 声明 |
| 重复法律页合并 | ✅ 已上线 | /privacy → /privacy-policy（301） |
| 仓库 README 重写 | ✅ 已上线 | 原来写着"6 个工具""PayPal 收款"，与实际不符 |
| 仓库描述 + topics | ✅ 已设置 | 开发者目录审核会看这些 |
| IndexNow 推送 | ✅ 已推送 | Bing / Yandex 已接受（HTTP 202），通常几小时内开始抓 |

---

## 二、需要你做的（按性价比排序）

### 优先级 1：Google Search Console（最关键，10 分钟）

**为什么必须先做这个**：现在 Google 只收录了你的首页，20 个工具页一个都没进索引。
我刚修好了 title 重复问题，但 Google 需要你**主动告诉它**去重抓一遍。

**要不要账号**：要 Google 账号（你有 163 邮箱绑的那个）
**要不要手机号**：不要
**我能不能代做**：不能，验证域名需要你的 Google 账号

步骤：
1. 浏览器打开 https://search.google.com/search-console
2. 左上角选「网域」→ 填 `toolhive.com.cn` → 继续
3. 它会给你一条 **TXT 记录**（形如 `google-site-verification=xxxxx`）
4. **把那条 TXT 记录原文发给我**，我帮你加到 Cloudflare DNS（我有 wrangler 权限，2 分钟）
5. 加完你回 Search Console 点「验证」
6. 验证通过后 → 左侧「站点地图」→ 填 `sitemap.xml` → 提交

做完这步，等 3-7 天，`site:toolhive.com.cn` 应该能看到 20+ 个工具页。

---

### 优先级 2：Bing Webmaster Tools（可选，5 分钟）

IndexNow 已经在推了，但有了后台能看到实际抓取数据。
https://www.bing.com/webmasters → 可直接从 Google Search Console 导入（省一步验证）

---

### 优先级 3：Show HN（要账号，风险中等）

**要不要账号**：要 Hacker News 账号（邮箱注册，不要手机号）
**风险**：HN 社区对"工具站合集"态度偏冷，历史上同类帖子多数沉底。发之前先想清楚。

HN 的 Show HN 规则原文要求：「项目应该是你亲手做的、你现在能在场讨论的」「让人容易试用，最好不要注册」。
你的站符合「不用注册」这条。

**标题**（不能改格式，必须以 Show HN 开头）：
```
Show HN: ToolHive – 20 browser-only dev tools, nothing leaves your machine
```

**正文**（发帖时填 URL 栏用站点首页，这段放评论第一条）：
```
I kept hitting the same annoyance with online dev tools: paste a JWT or a JSON
blob into one, and it goes to someone's server. So I built a set where the
work happens in the tab.

What's there: JSON formatter, JWT decoder, hash calculator (MD5/SHA-1/256/512),
regex tester, base64, URL codec, timestamp converter, UUID generator, cron
generator, text diff, CSV↔JSON, unit converter, QR codes, markdown preview,
image compressor, color picker with WCAG contrast.

Everything above runs client-side — Web Crypto for hashes, Canvas for image
compression, no upload for anything. Three AI tools (product listing, product
image, ecom workflows) do call a server, and they're labelled as such.

Stack: Next.js 14 static export on Cloudflare Pages. Source:
https://github.com/chuangyuan-tool/tool-hive

Happy to hear what's missing or broken.
```

**发帖时间建议**：美东时间周二到周四上午 8-10 点（北京 20:00-22:00）。

---

### 优先级 4：dev.to 文章（要账号，最安全）

**要不要账号**：要（邮箱或 GitHub 登录，不要手机号）
**风险**：低。dev.to 欢迎"我做了个东西"类文章，只要不是纯广告。

标题：
```
Why I made a dev tool site where nothing gets uploaded
```

正文：
```markdown
Every time I needed to decode a JWT or format a JSON blob, I'd open a random
"free online tool" site and paste in whatever I was working on. Then one day I
was looking at a production JWT — with a real user id and expiry in it — sitting
in the network tab of a site I'd never heard of.

That's a bad habit I had, and I suspect I'm not alone.

## What I built

[ToolHive](https://toolhive.com.cn) — 20 tools, and the ones that can run
client-side actually do:

- **Hashes** go through Web Crypto (`crypto.subtle.digest`), not a fetch
- **Image compression** is Canvas + `toBlob`, the file never leaves the tab
- **JWT decoding** is `atob` on the three segments — the token isn't sent anywhere
- **JSON / regex / base64 / URL / timestamps / UUIDs / cron / diff** are plain JS

Three tools do need a server (AI product listings, AI product images, ecommerce
workflows). Those are visually marked, because pretending otherwise would defeat
the point.

## The part that was actually hard

Not the tools — those are a weekend each. The hard part was the build/deploy
pipeline staying boring:

- `output: 'export'` means the whole site is static HTML. No Node server, no
  cold starts, no runtime to patch.
- Cloudflare Pages builds on push to `master`, so shipping a tool is `git push`.
- Each tool page pulls its `<title>`, description and canonical from one table
  (`lib/tool-seo.ts`). I originally let all 46 pages inherit the layout's title,
  which meant Google saw one page instead of twenty. Fixing that was a one-file
  change plus a metadata export per page.
- A `live: false` flag in that same table lets me ship a tool to production but
  keep it `noindex` and out of the sitemap until it's ready. Staged rollouts
  without a separate environment.

## What I'd do differently

I'd have written the SEO table on day one. Retrofitting metadata across 30 pages
is mechanical but tedious, and in the meantime the site was invisible.

Source is public if you want to see how any specific tool works:
https://github.com/chuangyuan-tool/tool-hive
```

**标签**：`webdev`, `javascript`, `nextjs`, `privacy`

---

### 优先级 5：Reddit（要账号，风险偏高）

**要不要账号**：要，且新号容易被判 spam
**风险**：高。r/webdev 和 r/programming 对自我推广有严格规则，新账号直接发链接大概率被删或被封。

**建议**：先别发。等站有了自然流量和几个真实用户反馈，用"分享数据/复盘"的角度发，不要用"我做了个站"的角度。

如果一定要发，只发 r/SideProject（规则最宽松）：
- 标题：`I built 20 dev tools that run entirely in the browser (no uploads)`
- 内容用上面 dev.to 那篇的前两段即可

---

## 三、我还能替你做的（说一声就做）

| 事情 | 说明 |
|---|---|
| 加 Google 验证 TXT 到 DNS | 你把 TXT 内容发我，2 分钟搞定 |
| 给某个工具写独立的 SEO 落地页文案 | 比如给 JSON Formatter 写一段 300 字的使用说明，提升长尾词排名 |
| 把 10 个储备工具上架 | 说「上架 word-counter 和 slug-generator」即可，改 2 行 + push，5 分钟 |
| 接 AdSense | 上线后有流量了再加，env 变量一填就生效 |
| 做英文版落地页对比表 | 比如 "ToolHive vs jsonformatter.org"，抢对比类关键词 |

---

## 四、别做的事（避免白费力气）

1. **别再提 free-for-dev 的 PR** —— 规则明确拒绝工具站
2. **别买目录提交服务** —— 那些站基本是垃圾外链，还可能被 Google 判作弊
3. **别在没流量时投付费广告** —— TLDR / daily.dev 起投价几百美元，没转化数据等于烧钱
4. **别指望 Show HN 一次爆** —— 历史上工具站类 Show HN 成功率不高，当成"拿反馈"而不是"拿流量"
5. **别反复改 title 试排名** —— 改完等 2-4 周看 Search Console 数据再动
