# ToolHive 交接单

> 更新：2026-10-26。**这份是唯一准确的现状**。旧版（9-19）已删，里面的"未 push""Vercel 部署""阿里云 DNS"全部作废。

## 一、现在到底是什么状态

| 项 | 状态 | 证据 |
|---|---|---|
| 线上站 | ✅ 正常 | https://toolhive.com.cn 返回 200 |
| 托管 | ✅ **Cloudflare Pages**（不是 Vercel） | `wrangler pages project list` |
| 自动部署 | ✅ 已连 Git，push master 就构建 | 最新部署 commit = 本地 HEAD |
| GitHub 仓库 | ✅ **已公开** | `chuangyuan-tool/tool-hive`，匿名 API 返回 200 |
| 域名 DNS | ✅ Cloudflare 托管 | NS = etienne/emerie.ns.cloudflare.com |
| Creem 收款 | ✅ 两条 checkout 链接已填、可跳转 | `app/pricing/page.tsx` |
| 工具数 | 30 个页面，其中 20 个已上架导航 | `lib/tools-data.ts` vs `app/tools/` |
| 搜索引擎收录 | ⚠️ **只收录了首页**，工具页 0 收录 | `site:toolhive.com.cn` |

**旧 HANDOFF 里这些说法全是错的，别再照着做**：

- 错：「Vercel 导入部署」→ 实际是 Cloudflare Pages，早部署完了
- 错：「阿里云 DNS 加 A 记录」→ 域名已迁到 Cloudflare
- 错：「git 尚未 push」→ 早就推了
- 错：「仓库私有」→ 是公开的
- 错：「要翻墙开 vercel.com」→ 不需要，走 Cloudflare
- 错：「加速器 10809 不可用」→ 跟上线无关

## 二、真正的卡点：不是上线，是没人来

站能开、能收款，但 Google 只认首页。原因（已修）：

1. 46 个页面共用同一个 `<title>`（继承 layout），Google 当成同一页
   → 已给 30 个工具页配独立 title / description / canonical
2. `/sitemap.xml` 是 404 → 已生成，25 条 URL
3. `/robots.txt` 只有 Cloudflare 默认内容，没有 sitemap 声明 → 已生成
4. `/privacy` 与 `/privacy-policy` 内容重复、页脚同时链两个
   → 已删旧的，301 到新的
5. README 写着"6 个工具""PayPal 收款"，与实际严重不符 → 已重写

## 三、已经做掉的自动化动作

- IndexNow 推送：Bing / Yandex / api.indexnow.org 全部 HTTP 202 接受
  - 脚本：`node scripts/indexnow.mjs`（可重复跑，以后上新工具就推一次）
  - key 文件：`public/cee07103bdcd149839132deb7ec73e8b.txt`
- GitHub 仓库描述、homepage、12 个 topics 已设

## 四、下一步（老板要做的一件事）

**Google Search Console 验证域名** —— 只有这一步必须老板本人做（要 Google 账号）。

1. 打开 https://search.google.com/search-console → 选「网域」→ 填 `toolhive.com.cn`
2. 复制它给的 TXT 记录，发给 AI
3. AI 加到 Cloudflare DNS，老板回 GSC 点验证
4. 验证过后提交 `sitemap.xml`

详细步骤和后续推广文案都在 `PROMOTION.md`。

## 五、给新会话 AI 的启动指令

> ToolHive 已上线（Cloudflare Pages + toolhive.com.cn），代码在 `E:\deepseek harness工作区\tool-hive`。
> **先读 `HANDOFF.md`（本文件）和 `PROMOTION.md`，不要读旧文档的部署章节。**
> 关键事实：托管是 Cloudflare Pages 不是 Vercel；push master 自动部署；仓库已公开；Creem 链接已填。
> 当前阶段是「拉流量」，不是「搞上线」。别重做部署、别再提 free-for-dev PR（明确拒绝工具站）。

## 六、常用命令

```bash
cd "E:\deepseek harness工作区\tool-hive"

npm run build                                                   # 静态导出到 out/
git push origin master                                          # 触发 Cloudflare 自动构建
npx wrangler pages deployment list --project-name tool-hive     # 看部署状态
node scripts/indexnow.mjs                                       # 推 sitemap 给 Bing/Yandex
node scripts/indexnow.mjs --dry-run                             # 只打印不发送
node test/convert-smoke.mjs                                     # YAML/XML 转换冒烟测试
```

## 七、上架储备工具的方法

`app/tools/` 下有 30 个工具目录，`lib/tools-data.ts` 只注册了 20 个。要上架新的：

1. `lib/tools-data.ts` 加一条记录（id 用目录名）
2. `lib/tool-seo.ts` 把对应条目的 `live` 改成 `true`（改完才会进 sitemap）
3. build + push，5 分钟

当前未上架的 10 个：base-converter, case-converter, css-minifier, data-convert,
json-validator, lorem-ipsum, number-base, slug-generator, text-tools, word-counter

这 10 个页面线上**可访问但带 noindex**，不会稀释索引权重。

## 八、红线（别翻旧账）

- 托管平台是 Cloudflare Pages，不是 Vercel —— 别再提 Vercel
- 域名在 Cloudflare，不在阿里云 —— 别再提阿里云 DNS
- 收款是 Creem + USDT，PayPal 已删 —— 别再提 PayPal
- 不装 FreeLLMAPI / 破甲软件 —— 已在 AGENTS.md 决策
- free-for-dev 明确拒绝工具站 —— 别再提这个 PR
