@echo off
REM Установка зависимостей
cd /d %~dp0client
npm install
cd /d %~dp0server
npm install

REM Запуск client и server в отдельных окнах
start "client" cmd /k "cd /d %~dp0client && npm run dev"
start "server" cmd /k "cd /d %~dp0server && npm run dev" 