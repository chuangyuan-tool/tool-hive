# ToolHive 出海部署 — 交接单（HANDOFF）

> 给接手的新会话 / 老板看。代码侧全就绪，卡点在「网络 + 几个要老板账号配合的点击」。

## 项目
- 路径：`E:\deepseek harness工作区\tool-hive`
- 品牌：**ToolHive**（目录名 tool-hive），Next.js 14 出海开发者工具站
- 定价：**Pro $9/月、Team $29/月**（已定）
- 域名：`toolhive.com.cn`（**阿里云**购买）
- 收款：大陆个人，走 **Creem**（卡/USDT/PayPal/钱包一站式 + 帮管海外税），提现走万里汇/万里通

## 一、代码侧（已全部完成，可直接部署）
- build 通过（21 页面零报错），可 `npm run build`
- git 已 init + commit（66 个干净文件，`.gitignore` 已排除 node_modules/.next/备份/本地脚本）；**尚未 push**（等 GitHub 空仓库）
- **收款区**：`app/pricing/page.tsx` 用 Creem 占位——`CREEM_PRO_LINK`/`CREEM_TEAM_LINK` 常量（空时显示"卡/币支付开通中，可先用 USDT/邮箱"，填了链接按钮即亮）；保留 USDT(TRC20) 地址 + 邮箱兜底；**已删大陆 PayPal 死路**
- **广告/联盟（占位，未配 ID 不显示）**：`components/ads/AdSlot.tsx`（AdSense，`NEXT_PUBLIC_ADSENSE_CLIENT/SLOT` 开关）、`components/ToolShell.tsx`（工具页顶/底挂广告，6 个工具页已套上）、`components/ads/AffiliateBlock.tsx`（联盟推荐位）
- **文档**：`DEPLOY.md`（大白话 9 步上线手册）、`出海网站上线工作流.md`（可复用到未来新网站）
- **开机自启**：`start-website.vbs` 已改**静默**（后台起 server、不自动弹浏览器；3000 留作本地自用）

## 二、还没做（需老板账号 + 网络）
1. **GitHub 空仓库 tool-hive** 未建、代码未 push。（本机 GCM 已登录 github，但 `git credential fill` 取不到 token，建仓库要老板网页点）
2. **Vercel** 导入 + 部署 + 绑 `toolhive.com.cn`（需翻墙开 vercel.com）
3. **阿里云 DNS** 加记录：A `@` → Vercel IP；CNAME `www` → `cname.vercel-dns.com`
4. **Creem 申请**（老板 creem.io 注册 + 人脸 → 建 Pro/Team 订阅 → 发 2 条 checkout 链接给我 → 我填进 pricing）
5. 广告 AdSense / 联盟：上线后在 Vercel 加 env 激活

## 三、网络现状（关键卡点，会随时间变化）
- **直连 github：通但抖**（200 与 000 交替）
- **加速器端口 10808/10809：当前不可用**（走它连 google / vercel 全 000）
- **vercel.com 大陆直连打不开，必须翻墙**
- 解法：老板去加速器 App「重连 / 换节点」（**不改朋友配置**）→ 10809 通了之后，刷新 `github.com/new` 与 `vercel.com` 都能进

## 四、老板待办（按顺序）
1. 加速器 App：重连/换节点 → Edge 打开 **vercel.com** 能开=网络 OK
2. **github.com/new** 建 `tool-hive` 空仓库（不勾 README/.gitignore/license）→ 把地址发 AI
3. AI：`git remote add origin <url>` + `git push -u origin master`（直连 github 通即可推）
4. Vercel：New Project → Import `tool-hive` → Deploy → 绑 `toolhive.com.cn`，记下它给的 DNS 值
5. 阿里云 DNS：A `@` = Vercel IP；CNAME `www` = `cname.vercel-dns.com` → 等 5min~1h 生效
6. 上线后 → creem.io 申请 → 发 2 条 checkout 链接 → AI 填 pricing → 自动收款
7. （可选，上线后）监控三件套（UptimeRobot/Sentry/定时探活）+ 域名续费提醒

## 五、给新会话 AI 的启动指令（复制这段去新会话）
> 我在把 ToolHive（Next.js 出海工具站）部署上线，代码已就绪、git 已 commit 未 push。项目路径 `E:\deepseek harness工作区\tool-hive`。**先读该目录下 `HANDOFF.md`、`DEPLOY.md`、`出海网站上线工作流.md` 了解全貌**（别重做代码侧）。当前卡点：①网络（加速器 10809 不可用、vercel.com 需翻墙、直连 github 抖）② GitHub 空仓库未建。老板会把仓库 URL 给我：我就 `git remote add origin <url>` + `git push -u origin master`，然后带老板走 Vercel 导入部署 + 阿里云 DNS 绑定。收款用 Creem 占位（`app/pricing/page.tsx` 的 `CREEM_PRO_LINK/TEAM_LINK`），等老板申请 Creem 发 2 条 checkout 链接，我填入即可。
