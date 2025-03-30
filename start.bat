@echo off
echo Запуск бэкенда...

rem Запуск Backend
start "" .\backend\backend.exe

rem Запуск Admin Frontend в отдельном окне
echo Запуск Admin Frontend...
start cmd /k "cd .\frontend\adminFrontend && npm install && npm run build && npm start"

rem Запуск Landing Frontend в отдельном окне
echo Запуск Landing Frontend...
start cmd /k "cd .\frontend\landingFrontend && npm install && npm run build && npm start"

echo Все сервисы запущены!

rem Закрытие окна Batch скрипта
exit