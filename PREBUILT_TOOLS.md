# ToolHive 预制工具清单（攒货台账）

> 定位：这批工�?*代码已写好、已测试、已能整�?build**，但**故意不进注册�?*（`lib/tools-data.ts`）、不露首页入口、不部署。等收款/会员链路（Creem + 万里汇）落地后，�?`lib/tools-data.ts` 里加一行即上线�?*无需重写整站、不耗部署积�?*�?> 更新�?026-09-22
> 关联：TOOL_ROADMAP.md（三类工�?+ 分批规划）、FULL_LOOP_BLUEPRINT.md（会�?广告/收款）、PAYMENT_LINK_PRECHECK.md（回�?项）

## 一、已预制（第一�?· 类A 纯前�?· 零成�?· 测试通过�?
| 工具 | 页面路由 | 逻辑模块 | 组件 | 测试 | 启用方式 |
|------|---------|---------|------|------|---------|
| Hash 生成器（MD5/SHA-1/SHA-256�?| /tools/hash-calculator | lib/tools/hash.ts | HashCalculator.tsx | �?| 加入 tools-data.ts |
| 时间戳转�?| /tools/timestamp-converter | lib/tools/timestamp.ts | TimestampConverter.tsx | �?| 加入 tools-data.ts |
| URL 编解�?查询�?| /tools/url-codec | lib/tools/url.ts | UrlCodec.tsx | �?| 加入 tools-data.ts |
| 正则测试�?| /tools/regex-tester | lib/tools/regex.ts | RegexTester.tsx | �?| 加入 tools-data.ts |
| Cron 表达式助�?| /tools/cron-generator | lib/tools/cron.ts | CronGenerator.tsx | �?| 加入 tools-data.ts |

说明�?- 5 个工具均纯前端本地跑（无服务器、无大模型、最隐私），贴合"隐私+�?免费"定位�?- 逻辑为纯函数，`node test/logic-test.mts` 全部通过�?3 断言）；hash �?Node 官方 crypto 对照 0�?00 长度校验�?- 整站 `npm run build` 通过�?3 静态页面，5 个新页面均入路由�?- 当前 `lib/tools-data.ts` �?6 条（原上线工具）；新�?5 �?*未注�?*，首页不露入口（预制隐藏态正确）�?
## 二、待预制 backlog（按 roadmap 分批，后续随做随攒，同样"写好+测试+不部�?�?
### 类A · 纯前端（可继续攒，零成本�?- 第二批（Pro 增强主力）：图片压缩�?批量/水印/AVIF；CSV �?XLSX/XML/SQL；JSON �?diff/Schema/YAML
- 第三批（拉新）：二维码、Markdown 预览、单位换算、文本去重统计、XML �?JSON

### 类B · 需 LLM（等接大模型再攒；已�?3 �?AI 工具预制未上线：ai-listing / ai-product-image / ecom-automation�?英文润色改写、多语言翻译、长文摘要、SEO 关键�?广告文案/社媒帖、AI 绘图 prompt、语音转文字、视频字幕、图片抠�?
### 类C · 需服务端（远期�?跨站网页元信息抓取（�?CORS 挡）、批量网站状态检�?�?需服务端代�?
## 三、长期生态方向（已吸收，远期�?- 插件市场（宽松开源协议合规；开发者刚需：Web 前端 / 开发辅助脚�?/ 独立站工�?/ AI 辅助插件；Pro 专属插件；第三方投稿分成�?- 自研二开植入（在�?SQL 编辑器、轻量代码沙盒[做好隔离]、批量重命名/请求测试�?- 用户插件收藏面板、API 调用权益、开发者社�?
## 四、一键启用流程（收款落地后执行）
1. �?`lib/tools-data.ts` �?`tools[]` 追加目标工具条目（id/name/description/category/icon/url）�?2. `npm run build` 通过后推�?�?Cloudflare Pages 自动部署�?3. 如需远程开关（不触�?build 上新）：后续�?registry 抽到 Cloudflare Pages Edge Config / 远程 JSON，改开关不重新部署�?4. 每个新工具上线时，批量同步更�?/terms�?privacy 的工具说明（不零散改）�?
## 五、纪�?- 本批**不部署、不露入�?*；代码常驻仓库随时可启用�?- 会员/广告/收款体系仍在�?Creem + 万里汇审核，未做�?
## 六、统�?/ 数据 决策（老板 2026-09-22 拍板�?- 网站**工具受欢迎度**：`tool_used` 埋点（A 方案，最小改动，每次工具出结果记一�?`tool_used(工具id)`�?*现在不做**�?*�?Creem 收款链接落地、做那次部署时同步带�?*（省一次部署）�?- 在此之前�?*保持现状，不改动任何统计相关代码**�?- 分工�?  - 访问量（粗）：用 **Cloudflare Pages 自带请求统计**（Requests / 错误�?/ 带宽），不额外装�?  - 工具热度（细）：`tool_used` 埋点，收款部署时一起上�?- 未来收款 + 会员落地后：注册量、付费会员数进后台小面板（另行规划）�?
> ⚠️ �?收款落地那次部署"会话的提醒：**部署前把 `tool_used` 埋点一起加上再�?*，不要漏掉�?
