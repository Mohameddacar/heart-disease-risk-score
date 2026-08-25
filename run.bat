@echo off
echo ==========================================
echo Starting HeartGuard AI Platform
echo ==========================================
echo.

echo [1/2] Starting Python FastAPI Backend...
start "HeartGuard Backend" cmd /k "cd backend && call .venv\Scripts\activate && python -m uvicorn main:app --host 0.0.0.0 --port 3201 --reload"

echo [2/2] Starting Next.js Frontend...
start "HeartGuard Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers have been launched in separate windows!
echo - Frontend URL: http://localhost:3000
echo - Backend API:  http://127.0.0.1:3201
echo.
echo You can close this window now. The servers will continue running in their own windows.
