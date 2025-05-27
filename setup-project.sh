#!/bin/bash

echo "🚀 Initialisation du projet GMAO Frontend..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/"
    exit 1
fi

# Vérifier la version de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="16.0.0"

if ! node -e "process.exit(require('semver').gte('$NODE_VERSION', '$REQUIRED_VERSION'))" 2>/dev/null; then
    print_warning "Version Node.js recommandée: >= $REQUIRED_VERSION (actuelle: $NODE_VERSION)"
fi

# Nom du projet
PROJECT_NAME=${1:-"gmao-frontend"}
print_status "Création du projet: $PROJECT_NAME"

# Créer le projet React
if [ ! -d "$PROJECT_NAME" ]; then
    print_status "Création de l'application React..."
    npx create-react-app $PROJECT_NAME --template typescript
    if [ $? -ne 0 ]; then
        print_error "Échec de la création du projet React"
        exit 1
    fi
else
    print_warning "Le dossier $PROJECT_NAME existe déjà"
fi

cd $PROJECT_NAME

# Installer les dépendances
print_status "Installation des dépendances..."
npm install \
    react-router-dom \
    axios \
    @headlessui/react \
    @heroicons/react \
    react-hook-form \
    @hookform/resolvers \
    yup \
    recharts \
    date-fns \
    react-query \
    zustand \
    react-hot-toast \
    clsx \
    js-qr-generator \
    html5-qrcode

# Dépendances de développement
npm install -D \
    tailwindcss \
    postcss \
    autoprefixer \
    @types/react \
    @types/react-dom \
    eslint-plugin-react-hooks \
    prettier \
    eslint-config-prettier \
    eslint-plugin-prettier

print_success "Dépendances installées"

# Initialiser Tailwind CSS
print_status "Configuration de Tailwind CSS..."
npx tailwindcss init -p

# Exécuter le script de génération des fichiers
print_status "Génération de la structure du projet..."
node generate-files.js

print_success "Structure du projet générée"

# Nettoyer les fichiers par défaut
print_status "Nettoyage des fichiers par défaut..."
rm -f src/App.css src/App.test.js src/index.css src/logo.svg src/reportWebVitals.js src/setupTests.js

print_success "✨ Projet GMAO Frontend créé avec succès!"
print_status "📁 Dossier: $PROJECT_NAME"
print_status "🚀 Pour démarrer:"
echo "   cd $PROJECT_NAME"
echo "   npm start"