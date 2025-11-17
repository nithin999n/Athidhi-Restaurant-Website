@echo off
echo Starting Athidhi Family Restaurant...
echo.
echo This will open TWO command windows:
echo   1. Frontend (Vite) - http://localhost:5173
echo   2. Backend (Express) - http://localhost:3000
echo.
echo Press any key to continue...
pause > nul

start cmd /k "npm run dev"
timeout /t 2 > nul
start cmd /k "npm run server"

echo.
echo Both servers are starting...
echo Visit http://localhost:5173 when ready
echo.
