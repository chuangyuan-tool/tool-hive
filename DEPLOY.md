# 把网站发到网上（Vercel）

收款方式（PayPal / USDT）已经写进网站里了，不需要配置任何后台。
部署只需要 3 步：

## 第 1 步：上传代码到 GitHub

1. 打开 https://github.com 注册/登录账号
2. 点右上角 + → "New repository"，名字填 tool-hive，点 Create
3. 打开 https://vercel.com ，点 "New Project" → 选 "Import Git Repository" → 登录 GitHub → 选 tool-hive 仓库（先把代码 push 上去，见下）

## 第 2 步：让 Vercel 构建

- Vercel 会自动识别 Next.js，点 "Deploy" 按钮即可，等 1~2 分钟

## 第 3 步：完成

- Vercel 会给你一个 https://xxx.vercel.app 网址，任何人都能访问
- 可以在 Vercel 后台 Settings → Domains 绑定自己的域名（可选）

---

## 本地使用（已经帮你弄好了，不需要看这段）

- 双击桌面「ToolHive 网站」→ 浏览器打开 http://localhost:3000
- 关黑窗口 = 停止网站
