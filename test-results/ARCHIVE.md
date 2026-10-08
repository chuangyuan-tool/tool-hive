# Tool-Hive 全链路测试归档

> 归档时间: 2026-10-01
> 最终 commit: 7c2d3ee
> 项目状态: ✅ 可上线

---

## 上线结论

所有 22 个页面路由 100% 通过，AI 接口前端 fallback 降级机制验证通过。
阻断问题已全部消除或定性为非代码问题（CF 基础设施限制）。

**结论：可上线，维持当前生产版本。**

---

## 已知非阻断风险（2 项）

### ① CF Functions 出站调用 Agnes 偶发 502（WAF 1015）
- **现象**：`POST /api/ai/image` 和 `POST /api/ai/listing` 间歇性返回 502
- **根因**：`apihub.agnes-ai.com` 也跑在 Cloudflare 上，CF 边缘→CF 边缘出站部分 colo 触发 WAF 1015（SNI hostname check 失败）。属于 CF 基础设施外部问题，非代码 bug。
- **影响**：前端 `lib/ai-client.ts` 的 fallback 机制自动切到浏览器直连 Agnes，**用户侧 AI 功能正常可用**
- **处理**：代码层已做 3 次重试 + WAF 结构化检测（`{waf:true, 502}`）。如需彻底解决需 Agnes 侧 CF WAF 白名单或自建中转 relay

### ② lib/ai-client.ts 前端内置 Agnes 免费 API Key
- **现象**：`AGNES_KEY` 硬编码在 `lib/ai-client.ts` L8，会打进前端 JS bundle，公网可见
- **根因**：当前设计取舍——CF Functions 不可靠时，浏览器直连是唯一兜底路径；Agnes 免费档 key 风险可控（配额被白嫖）
- **处理**：后续流量上涨后需搭建中转 relay 服务（如 `E:\Data\Tools\agnes-gateway`），移除前端硬编码密钥

---

## 测试文档清单

| 文件 | 说明 |
|---|---|
| `TEST_REPORT.md` | 首轮全链路测试报告（2026-09-27） |
| `RETEST_REPORT.md` | 二次复测报告（2026-09-27） |
| `FULL_TEST_REPORT.md` | 完整测试报告（历史） |
| `build-output.txt` | 构建输出日志 |
| `ARCHIVE.md` | 本归档文件 |

---

## 部署信息

- Cloudflare Pages 项目: `tool-hive`
- 域名: `toolhive.com.cn` / `tool-hive.pages.dev`
- 仓库: `chuangyuan-tool/tool-hive`
- 生产分支: `master`
- 当前生产版本: commit `7c2d3ee`
- 巡检脚本: `E:\Data\Tools\cloudflare-pages-monitor\toolhive-inspect.ps1`
