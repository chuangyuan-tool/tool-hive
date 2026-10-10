# ============================================================
# ToolHive 一键部署：build → deploy → purge CDN
# 用法：powershell -File scripts\deploy.ps1
# ============================================================

$ErrorActionPreference = "Stop"
$ProjectDir = "E:\deepseek harness工作区\tool-hive"
$ZoneID = "ba16afd67b44949feb6f1290850effd4"

Set-Location $ProjectDir

# ===== 1. Build =====
Write-Host "🔨 [1/3] 构建中..." -ForegroundColor Cyan
npx next build
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Build 失败，停止部署" -ForegroundColor Red; exit 1 }

Write-Host "📋 [1.5/3] 复制 _headers 到 out/..." -ForegroundColor Cyan
Copy-Item "public\_headers" "out\_headers" -Force

# ===== 2. Deploy to Cloudflare Pages =====
Write-Host "🚀 [2/3] 部署到 Cloudflare Pages..." -ForegroundColor Cyan
npx wrangler pages deploy out --project-name=tool-hive
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Deploy 失败" -ForegroundColor Red; exit 1 }

# ===== 3. Purge CDN Cache =====
Write-Host "🧹 [3/3] 清空 CDN 缓存..." -ForegroundColor Cyan

# 读取 wrangler OAuth token
$cfgFile = "C:\Users\admin\AppData\Roaming\xdg.config\.wrangler\config\default.toml"
$cfg = Get-Content $cfgFile -Raw
$ApiToken = [regex]::Match($cfg, 'oauth_token = "([^"]+)"').Groups[1].Value

$headers = @{
    "Authorization" = "Bearer $ApiToken"
    "Content-Type"  = "application/json"
}
$body = '{"purge_everything": $true}'

$resp = Invoke-RestMethod `
    -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneID/purge_cache" `
    -Method POST -Headers $headers -Body $body

if ($resp.success) {
    Write-Host "✅ 全部完成！30 秒后访问 https://toolhive.com.cn 验证" -ForegroundColor Green
} else {
    Write-Host "⚠️ 部署成功但 CDN 清空失败：$($resp.errors | ConvertTo-Json)" -ForegroundColor Yellow
    Write-Host "   页面可能 1-5 分钟后自动更新"
}
