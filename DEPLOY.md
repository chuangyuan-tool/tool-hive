# ToolHive 出海上线手册（toolhive.com.cn）

> 大白话版。你按顺序做，卡哪一步把报错截图发我。代码侧我已经全部就绪，你只需做"账号 + 点击"这部分。

## 你要有的 3 个账号
- **GitHub**（你已登录 ✅）
- **Vercel**（用 GitHub 登录注册，免费：vercel.com）
- **阿里云**（域名 `toolhive.com.cn` 在这里）

---

## 一、推代码到 GitHub

**1. 建一个空仓库**（如果还没建）
- 打开 github.com（已登录）→ 右上角 `+` → **New repository**
- Repository name 填：`tool-hive`
- **不要勾选** Add README / .gitignore / license（保持空，否则推送会冲突）
- 点 Create → 把地址 `https://github.com/你的用户名/tool-hive` 发我

**2. 我帮你 push**（或你自己跑下面命令）
```
cd "E:\deepseek harness工作区\tool-hive"
git remote add origin https://github.com/你的用户名/tool-hive.git
git push -u origin master
```
凭证会自动带上（你客户端已登录）；万一弹登录框，确认一下即可。

---

## 二、Vercel 部署（网页操作）
1. 打开 https://vercel.com → **用 GitHub 账号登录**
2. 点 **New Project** → 找到 `tool-hive` 仓库 → 点 Import
3. 框架会自动识别为 **Next.js**，构建命令/目录都不用填 → 点 **Deploy**
4. 等 1~2 分钟，得到一个 `https://xxx.vercel.app`（此时网站已经能访问了！）

---

## 三、Vercel 绑定域名
1. Vercel → 你的项目 → **Settings** → **Domains** → Add
2. 填 `toolhive.com.cn`
3. Vercel 会显示需要添加的 DNS 记录（A + CNAME）→ **把那个 IP 值和 CNAME 值记下来/截图发我**，我给你转成阿里云要填的格式

---

## 四、阿里云 DNS（让 toolhive.com.cn 指向 Vercel）
1. 阿里云控制台 → 域名 → 点 `toolhive.com.cn` → **管理** → **解析设置**
2. 添加两条记录：
   - **A 记录**：主机记录 `@`，记录值 = Vercel 给的那个 IP
   - **CNAME 记录**：主机记录 `www`，记录值 = `cname.vercel-dns.com`
   （具体值以 Vercel 页面为准，照抄）
3. 保存，等 5 分钟~1 小时生效

---

## 五、验证上线
浏览器打开 `https://toolhive.com.cn`，能看到网站 = 上线成功 ✅

---

## 六、接收款（Creem，上线后做）
1. 网站上线后，你去 **creem.io** 注册（个人身份可，需实名 + 人脸验证）
2. 后台建 2 个订阅产品：**ToolHive Pro $9/月**、**ToolHive Team $29/月**
3. 每个产品点 **Copy checkout link**，把 2 条链接发我
4. 我填进 pricing 页 → 客户点按钮付款（卡/USDT/PayPal/钱包都行）→ 自动开套餐

---

## 七、广告 / 联盟（位置已铺好，以后激活）
- 代码里已内置**广告位**（工具页顶/底）和**联盟推荐位**，现在没配 ID 所以不显示。
- **开广告**：AdSense 审批通过后，在 Vercel 后台 **Settings → Environment Variables** 加两条：
  - `NEXT_PUBLIC_ADSENSE_CLIENT` = 你的 `ca-pub-xxxxxxxx`
  - `NEXT_PUBLIC_ADSENSE_SLOT` = 你的广告单元号
  - 重新部署一次，工具页顶/底就出广告。
- **开联盟推荐**：告诉我要推哪个工具/云/SaaS + 你的专属链接，我帮你填进 `AffiliateBlock`。

---

## 八、监控三件套（上线后接，全免费）
- **UptimeRobot**：监控 `toolhive.com.cn`，挂了立刻发邮件 + Telegram
- **Sentry**：抓客户浏览器 JS 报错（白屏/工具崩了你也能看到）
- **定时探活**：我加个任务每小时探一次 Creem checkout 能不能打开
- **域名续费提醒**：给你加一条日历/邮件提醒，别漏了导致网站全挂

---

## 九、以后更新 / 加功能的循环
```
本地改代码（localhost:3000 预览）→ build 验证 → git push → Vercel 自动重新部署 → 域名上客户看到新版
```
你只管"改"，我帮你 build + push，客户刷新即是新版。
