@echo off
chcp 65001 >nul
title 钢铁侠 3D 独立展台 // MARK I (Stark Industries)
echo ============================================================
echo   STARK INDUSTRIES // 3D STANDALONE STAGE (MARK I)
echo   正在启动最新版 3D 独立展台 (手势控制 V22 丝滑版)
echo   本地访问地址: http://localhost:3001
echo ============================================================

cd /d "%~dp0"

set PYCMD=python
where python >nul 2>nul || set "PYCMD=py -3"

powershell -NoProfile -Command "$t=New-Object Net.Sockets.TcpClient;try{$t.Connect('127.0.0.1',3001);$t.Close();exit 10}catch{exit 0}"
if "%errorlevel%"=="10" (
  echo [OK] 3D 展台服务已在后台运行中，正在唤起浏览器...
) else (
  echo 正在拉起 3D 独立展台服务器 (Port: 3001)...
  start "Stark 3D Standalone Server" /min %PYCMD% server.py 3001
  timeout /t 2 /nobreak >nul
)

start "" "http://localhost:3001"
exit
