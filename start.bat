@echo off
echo Memulai Backend FastAPI...
start cmd /k "cd backend && call .venv\Scripts\activate 2>nul || echo Virtual env tidak aktif, menggunakan global && uvicorn main:app --reload"

echo Memulai Frontend Next.js...
start cmd /k "cd frontend && npm run dev"

echo Selesai! Backend berjalan di http://localhost:8000 dan Frontend di http://localhost:3000
