# 🚀 ToolHive 快速启动指南

## 立即运行网站

### 方法1：双击桌面快捷方式
- 找到桌面 **"ToolHive 网站"** 图标
- 双击即可启动

### 方法2：命令行启动
```powershell
cd "E:\deepseek harness工作区\tool-hive"
npm run dev
```

### 访问地址
- 首页：http://localhost:3000
- 工具页：http://localhost:3000/tools
- 定价页：http://localhost:3000/pricing
- 控制台：http://localhost:3000/dashboard
- 登录页：http://localhost:3000/login

---

## 📋 当前网站功能

### ✅ 已完成的页面
| 页面 | 路径 | 状态 |
|------|------|------|
| 首页 | `/` | ✅ 可用 |
| 工具列表 | `/tools` | ✅ 可用（6个工具）|
| 定价/支付 | `/pricing` | ✅ 可用（PayPal + USDT）|
| 登录 | `/login` | ⏳ 占位 |
| 注册 | `/register` | ⏳ 占位 |
| 控制台 | `/dashboard` | ✅ 可用（预留API Key）|
| API文档 | `/api-docs` | ✅ 可用 |
| 设置 | `/settings` | ✅ 可用 |
| 支付成功 | `/payment-success` | ✅ 可用 |
| 支付处理中 | `/payment-pending` | ✅ 可用 |

### 🛠️ 可用的工具
1. **JSON 格式化器** - 格式化、校验、压缩 JSON
2. **密码生成器** - 生成强随机密码
3. **Base64 转换器** - 编解码 Base64
4. **颜色选择器** - HEX/RGB 互转
5. **图片压缩器** - 本地压缩 JPG/WebP
6. **CSV 转 JSON** - 数据格式转换

### 💳 支付方式（已配置）
- **PayPal**: 链接已生效，账号 `15981927999@163.com`
- **USDT (TRC20)**: 地址已配置 `TLMkaNbVeoTDcij65dkh2VKwSQ862oRGBx`

---

## 🔧 白天需要确定的事项

### 1. 支付方式方案
- [ ] **方案A**：Lemon Squeezy（推荐）- 自动发卡密，5%手续费
- [ ] **方案B**：Gumroad - 简单，10%手续费
- [ ] **方案C**：自建系统 - 需要开发后端

### 2. 是否需要用户系统
- [ ] 只需要支付（不需要登录）
- [ ] 需要登录 + 套餐管理
- [ ] 需要完整用户系统（API Key、用量统计等）

### 3. 部署方式
- [ ] 先本地测试
- [ ] 部署到 Vercel（免费）
- [ ] 部署到自己的服务器

---

## 📞 联系信息

| 项目 | 值 |
|------|-----|
| PayPal邮箱 | 15981927999@163.com |
| USDT地址 | TLMkaNbVeoTDcij65dkh2VKwSQ862oRGBx |
| 网站路径 | E:\deepseek harness工作区\tool-hive |

---

*更新时间：2026-09-12*

---
title: 快速启动指南 - 更新版
updated: 2026-09-13
---

# 🚀 ToolHive 快速启动指南

## 📍 桌面快捷方式（推荐）

### 方法1：双击桌面图标
- 找到桌面 **"ToolHive 网站"** 图标
- 双击即可后台启动（无黑框）
- 浏览器自动打开 http://localhost:3000

### 方法2：命令行启动（调试用）
```powershell
cd "E:\deepseek harness工作区\tool-hive"
npm run dev
```
特点：显示黑色命令行窗口，方便查看日志

---

## 🌐 网站地址

| 页面 | 网址 |
|------|------|
| 首页 | http://localhost:3000 |
| 工具列表 | http://localhost:3000/tools |
| 定价/支付 | http://localhost:3000/pricing |
| 控制台 | http://localhost:3000/dashboard |
| API文档 | http://localhost:3000/api-docs |

---

## ✅ 当前可用功能

### 工具（6个）
1. JSON格式化器 - /tools/json-formatter
2. 密码生成器 - /tools/password-generator
3. Base64转换器 - /tools/base64-converter
4. 颜色选择器 - /tools/color-picker
5. 图片压缩器 - /tools/image-compressor
6. CSV转JSON - /tools/csv-to-json

### 支付配置
- PayPal: https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=15981927999@163.com&currency_code=USD
- USDT(TRC20): TLMkaNbVeoTDcij65dkh2VKwSQ862oRGBx

---

## 📁 项目位置

```
E:\deepseek harness工作区\tool-hive
```

---

*更新时间：2026-09-13*

## 🎨 图标说明

网站图标已更新为蓝色背景白色"T"字母的 ToolHive 专属图标。
图标文件位置：`E:\deepseek harness工作区\tool-hive\ToolHive.png`

---

## 🔧 故障排除

### 双击快捷方式无反应？
1. 确保网站正在运行：打开 http://localhost:3000
2. 如果打不开，手动启动：
   ```powershell
   cd "E:\deepseek harness工作区\tool-hive"
   npm run dev
   ```
3. 然后双击桌面快捷方式即可

### 图标显示不对？
- 刷新桌面（F5）
- 或右键快捷方式 → 属性 → 更改图标

---

## 🔧 故障排除

### 双击快捷方式报错 "无效字符"？
1. 删除桌面旧图标
2. 重新创建快捷方式：
   - 右键桌面 → 新建 → 快捷方式
   - 输入位置：`E:\deepseek harness工作区\tool-hive\start-website.vbs`
   - 下一步 → 输入名称：ToolHive 网站
   - 完成

### 网站打不开？
1. 手动打开浏览器访问：http://localhost:3000
2. 如果提示"无法连接"，先运行：
   ```
   cd "E:\deepseek harness工作区\tool-hive"
   npm run dev
   ```

---
