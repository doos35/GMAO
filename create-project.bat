@echo off
echo 🚀 Creation du projet GMAO Frontend pour Windows...

:: Verification de Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js n'est pas installe ou pas dans le PATH
    echo Veuillez installer Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)

:: Parametres
set PROJECT_NAME=%1
if "%PROJECT_NAME%"=="" set PROJECT_NAME=gmao-frontend

echo 📁 Creation du projet: %PROJECT_NAME%

:: Creation du projet React
if not exist "%PROJECT_NAME%" (
    echo 🔧 Creation de l'application React...
    call npx create-react-app %PROJECT_NAME%
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Echec de la creation du projet React
        pause
        exit /b 1
    )
) else (
    echo ⚠️  Le dossier %PROJECT_NAME% existe deja
)

:: Entrer dans le dossier
cd %PROJECT_NAME%

:: Installer les dépendances
echo 📦 Installation des dependances...
call npm install react-router-dom axios @headlessui/react @heroicons/react react-hook-form @hookform/resolvers yup recharts date-fns react-query zustand react-hot-toast clsx js-qr-generator html5-qrcode

call npm install --save-dev tailwindcss @tailwindcss/forms @tailwindcss/typography postcss autoprefixer eslint-config-prettier eslint-plugin-prettier prettier

:: Initialiser Tailwind
echo 🎨 Configuration de Tailwind CSS...
call npx tailwindcss init -p

:: Generer les fichiers
echo 📝 Generation de la structure du projet...
call node ..\generate-files.js

echo ✨ Projet GMAO Frontend cree avec succes!
echo 📁 Dossier: %PROJECT_NAME%
echo 🚀 Pour demarrer:
echo    cd %PROJECT_NAME%
echo    npm start

pause