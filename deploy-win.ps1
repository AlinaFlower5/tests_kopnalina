# === Установка зависимостей: client ===
Set-Location "$PSScriptRoot/client"
npm install

# === Установка зависимостей: server ===
Set-Location "$PSScriptRoot/server"
npm install

# === Запуск client и server ===
Start-Process "cmd.exe" -ArgumentList '/k', "cd /d `"$PSScriptRoot\client`" && npm run dev"
Start-Process "cmd.exe" -ArgumentList '/k', "cd /d `"$PSScriptRoot\server`" && npm run dev"

# === Ждем сервер ===
Start-Sleep -Seconds 5

# === Импорт тестов ===
Set-Location "$PSScriptRoot/server"
node scripts/importTests.js

Pause
