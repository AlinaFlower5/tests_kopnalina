Start-Process "cmd.exe" -ArgumentList '/k', "cd /d `"$PSScriptRoot\client`" && npm run dev"
Start-Process "cmd.exe" -ArgumentList '/k', "cd /d `"$PSScriptRoot\server`" && npm run dev"