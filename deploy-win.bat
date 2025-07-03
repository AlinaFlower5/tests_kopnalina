@echo off
REM Установка зависимостей
cd /d %~dp0client
npm install
cd /d %~dp0server
npm install

REM Запуск client и server в отдельных окнах
start "client" cmd /k "cd /d %~dp0client && npm run dev"
start "server" cmd /k "cd /d %~dp0server && npm run dev"

REM Ждем 5 секунд, чтобы сервер успел подняться
ping -n 6 127.0.0.1 >nul

REM Импорт тестов
cd /d %~dp0server
node scripts/importTests.js 