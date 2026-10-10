# ============================================================
# ToolHive - Cloudflare CDN 全站缓存一键清空脚本
# 用法：powershell -File scripts\purge-cache.ps1
# ============================================================

$ErrorActionPreference = "Stop"

# ===== 需要你填的参数 =====
$ZoneID = "ba16afd67b44949feb6f1290850effd4"   # toolhive.com.cn 的 Zone ID（已自动查到）

# 方式 1：用 wrangler 的 OAuth token（推荐，已在本机配置）
$cfgFile = 'C:\Users\admin\AppData\Roaming\xdg.config\.wrangler\config\default.toml'
$cfg = Get-Content $cfgFile -Raw
$ApiToken = [regex]::Match($cfg, 'oauth_token = "([^"]+)"').Groups[1].Value

# 方式 2：如果上面拿不到，手动填 API Token（权限：Zone > Cache Purge）
# $ApiToken = "你的API_TOKEN_HERE"
# ============================================================

Write-Host "正在清空 toolhive.com.cn 全站 CDN 缓存..." -ForegroundColor Cyan

$headers = @{
    "Authorization" = "Bearer $ApiToken"
    "Content-Type"  = "application/json"
}

$body = '{"purge_everything": $true}'

$resp = Invoke-RestMethod `
    -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneID/purge_cache" `
    -Method POST `
    -Headers $headers `
    -Body $body `
    -ContentType "application/json"

if ($resp.success) {
    Write-Host "✅ 缓存清空成功！" -ForegroundColor Green
    Write-Host "   Cloudflare 正在刷新全球节点，约 30-60 秒完成。"
    Write-Host "   60 秒后再访问 https://toolhive.com.cn 验证。"
} else {
    Write-Host "❌ 失败：$($resp.errors | ConvertTo-Json)" -ForegroundColor Red
}

# ===== 验证步骤 =====
Write-Host "`n等待 60 秒让 CDN 节点刷新..." -ForegroundColor Yellow
Start-Sleep -Seconds 60

Write-Host "验证线上版本..." -ForegroundColor Cyan
$html = Invoke-WebRequest -Uri "https://toolhive.com.cn/" -UseBasicParsing
if ($html.Content -match 'data-theme="editorial"') {
    Write-Host "✅ 新版已生效（editorial 主题已加载）" -ForegroundColor Green
} else {
    Write-Host "⚠️ 仍可能是旧版，等 30 秒再试一次" -ForegroundColor Yellow
    Start-Sleep -Seconds 30
    $html2 = Invoke-WebRequest -Uri "https://toolhive.com.cn/" -UseBasicParsing
    if ($html2.Content -match 'data-theme="editorial"') {
        Write-Host "✅ 第二次验证通过，新版生效" -ForegroundColor Green
    } else {
        Write-Host "❌ 仍未更新，可能需要清浏览器缓存（Ctrl+Shift+R）" -ForegroundColor Red
    }
}
