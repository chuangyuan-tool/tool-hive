# ToolHive: wait for the site on :3000 to come up, then open it in the default browser
$ok = $false
for ($i = 0; $i -lt 30; $i++) {
    try { $ok = Test-NetConnection -ComputerName 127.0.0.1 -Port 3000 -InformationLevel Quiet -WarningAction Stop } catch { $ok = $false }
    if ($ok) { break }
    Start-Sleep -Seconds 1
}
if ($ok) { Start-Process 'http://localhost:3000' }
