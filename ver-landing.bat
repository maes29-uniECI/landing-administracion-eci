@echo off
rem Abre la landing en http://localhost:8000 con un servidor local.
rem Deja esta ventana abierta mientras usas la pagina; para apagarla, cierrala o presiona Ctrl+C.
cd /d "%~dp0"
where py >nul 2>nul && (set "PY=py") || (set "PY=python")
start "" "http://localhost:8000"
echo Landing en http://localhost:8000  (cierra esta ventana para apagarla)
%PY% -m http.server 8000 --bind 127.0.0.1
