const fs = require('fs');
const path = require('path');

// Configuration des couleurs pour les logs
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}[INFO]${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}[WARNING]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}[ERROR]${colors.reset} ${msg}`),
};

// Structure des dossiers à créer
const directoryStructure = [
  'src/components/UI',
  'src/components/Forms',
  'src/components/Tables',
  'src/components/Charts',
  'src/components/Layout',
  'src/pages/Auth',
  'src/pages/Dashboard',
  'src/pages/Equipment',
  'src/pages/WorkOrders',
  'src/pages/Maintenance',
  'src/pages/Inventory',
  'src/pages/Users',
  'src/pages/Reports',
  'src/pages/Profile',
  'src/hooks',
  'src/services',
  'src/router/guards',
  'src/context',
  'src/utils',
  'src/constants',
  'src/assets/images',
  'src/assets/icons',
  'public/images',
];

// Templates de fichiers
const fileTemplates = {
  // Package.json
  'package.json': `{
  "name": "gmao-frontend",
  "version": "1.0.0",
  "description": "Application GMAO - Gestion de Maintenance Assistée par Ordinateur",
  "private": true,
  "dependencies": {
    "@headlessui/react": "^1.7.17",
    "@heroicons/react": "^2.0.18",
    "@hookform/resolvers": "^3.3.2",
    "axios": "^1.6.2",
    "clsx": "^2.0.0",
    "date-fns": "^2.30.0",
    "html5-qrcode": "^2.3.8",
    "js-qr-generator": "^1.1.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.48.2",
    "react-hot-toast": "^2.4.1",
    "react-query": "^3.39.3",
    "react-router-dom": "^6.20.1",
    "react-scripts": "5.0.1",
    "recharts": "^2.8.0",
    "yup": "^1.3.3",
    "zustand": "^4.4.7"
  },
  "devDependencies": {
    "@types/react": "^18.2.42",
    "@types/react-dom": "^18.2.17",
    "autoprefixer": "^10.4.16",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "postcss": "^8.4.32",
    "prettier": "^3.1.0",
    "tailwindcss": "^3.3.6"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write src/**/*.{js,jsx,ts,tsx,json,css,md}"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "prettier"
    ],
    "plugins": ["react-hooks", "prettier"],
    "rules": {
      "prettier/prettier": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  }
}`,

  // Tailwind config
  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}`,

  // PostCSS config
  'postcss.config.js': `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,

  // Prettier config
  '.prettierrc': `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}`,

  // Environment variables
  '.env': `# API Configuration
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_API_TIMEOUT=30000

# Application
REACT_APP_NAME=GMAO Pro
REACT_APP_VERSION=1.0.0
REACT_APP_DESCRIPTION=Gestion de Maintenance Assistée par Ordinateur

# Features
REACT_APP_ENABLE_NOTIFICATIONS=true
REACT_APP_ENABLE_QR_CODE=true
REACT_APP_ENABLE_OFFLINE_MODE=false

# Development
REACT_APP_DEBUG=true
REACT_APP_LOG_LEVEL=debug`,

  '.env.production': `# API Configuration
REACT_APP_API_URL=https://api.gmao-pro.com
REACT_APP_API_TIMEOUT=30000

# Application
REACT_APP_NAME=GMAO Pro
REACT_APP_VERSION=1.0.0
REACT_APP_DESCRIPTION=Gestion de Maintenance Assistée par Ordinateur

# Features
REACT_APP_ENABLE_NOTIFICATIONS=true
REACT_APP_ENABLE_QR_CODE=true
REACT_APP_ENABLE_OFFLINE_MODE=true

# Production
REACT_APP_DEBUG=false
REACT_APP_LOG_LEVEL=error`,

  // Fichier principal index.js
  'src/index.js': `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Configuration React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#10B981',
            },
          },
          error: {
            duration: 5000,
            theme: {
              primary: '#EF4444',
            },
          },
        }}
      />
    </QueryClientProvider>
  </React.StrictMode>
);`,

  // CSS principal
  'src/index.css': `@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Base styles */
@layer base {
  body {
    @apply font-sans antialiased bg-gray-50 text-gray-900;
  }
  
  * {
    @apply border-gray-200;
  }
}

/* Components */
@layer components {
  .btn-primary {
    @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200;
  }
  
  .btn-secondary {
    @apply inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200;
  }
  
  .input-base {
    @apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm;
  }
  
  .card {
    @apply bg-white shadow rounded-lg;
  }
  
  .card-header {
    @apply px-6 py-4 border-b border-gray-200;
  }
  
  .card-body {
    @apply px-6 py-4;
  }
  
  .badge {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
  }
  
  .badge-success {
    @apply badge bg-green-100 text-green-800;
  }
  
  .badge-warning {
    @apply badge bg-yellow-100 text-yellow-800;
  }
  
  .badge-error {
    @apply badge bg-red-100 text-red-800;
  }
  
  .table-auto {
    @apply min-w-full divide-y divide-gray-200;
  }
  
  .table-header {
    @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
  }
  
  .table-cell {
    @apply px-6 py-4 whitespace-nowrap text-sm text-gray-900;
  }
}

/* Utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .scrollbar-thin {
    scrollbar-width: thin;
  }
  
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }
}

/* Animations globales */
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive design helpers */
@media (max-width: 640px) {
  .responsive-padding {
    @apply px-4;
  }
}

@media (min-width: 641px) {
  .responsive-padding {
    @apply px-6;
  }
}

@media (min-width: 1024px) {
  .responsive-padding {
    @apply px-8;
  }
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
  
  .print-break {
    page-break-after: always;
  }
}`,

  // App.js principal
  'src/App.js': `import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import RouterConfig from './router';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
            <div className="App">
              <RouterConfig />
            </div>
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;`,

  // README.md
  'README.md': `# 🏭 GMAO Pro - Frontend

Application de **Gestion de Maintenance Assistée par Ordinateur** développée en React.

## 🚀 Fonctionnalités

### 🔧 Gestion des équipements
- ✅ Inventaire complet avec QR codes
- ✅ Fiches techniques détaillées
- ✅ Historique des interventions
- ✅ Géolocalisation des équipements

### 📋 Ordres de travail
- ✅ Création et assignation d'ordres
- ✅ Suivi en temps réel
- ✅ Gestion des priorités
- ✅ Validation par étapes

### ⚙️ Maintenance
- ✅ Planification préventive
- ✅ Calendrier des interventions
- ✅ Templates de maintenance
- ✅ Alertes automatiques

### 📊 Reporting
- ✅ Tableaux de bord interactifs
- ✅ KPIs de performance
- ✅ Rapports personnalisables
- ✅ Export PDF/Excel

## 🛠️ Technologies

- **React 18** - Framework frontend
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **React Router** - Routing
- **React Hook Form** - Gestion des formulaires
- **React Query** - Gestion d'état et cache
- **Zustand** - État global
- **Axios** - Requêtes HTTP
- **Recharts** - Graphiques
- **HeadlessUI** - Composants accessibles

## 🚀 Installation

\`\`\`bash
# Cloner le projet
git clone [url-du-repo]
cd gmao-frontend

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env

# Démarrer l'application
npm start
\`\`\`

L'application sera accessible sur \`http://localhost:3000\`

## 📁 Structure du projet

\`\`\`
src/
├── components/          # Composants réutilisables
│   ├── UI/             # Composants de base
│   ├── Forms/          # Formulaires métier
│   ├── Tables/         # Tableaux de données
│   └── Charts/         # Graphiques
├── pages/              # Pages de l'application
├── hooks/              # Hooks personnalisés
├── services/           # Services API
├── router/             # Configuration du routing
├── context/            # Contextes React
├── utils/              # Utilitaires
└── constants/          # Constantes
\`\`\`

## 🔧 Configuration

### Variables d'environnement

\`\`\`env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_NAME=GMAO Pro
REACT_APP_ENABLE_QR_CODE=true
\`\`\`

### Scripts disponibles

\`\`\`bash
npm start          # Démarrage en mode développement
npm run build      # Build de production
npm test           # Lancement des tests
npm run lint       # Vérification du code
npm run format     # Formatage du code
\`\`\`

## 🧪 Tests

\`\`\`bash
# Tests unitaires
npm test

# Tests avec coverage
npm test -- --coverage

# Tests E2E
npm run test:e2e
\`\`\`

## 📦 Déploiement

### Build de production

\`\`\`bash
npm run build
\`\`\`

### Docker

\`\`\`dockerfile
docker build -t gmao-frontend .
docker run -p 3000:80 gmao-frontend
\`\`\`

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (\`git checkout -b feature/nouvelle-fonctionnalite\`)
3. Commit les changements (\`git commit -m 'Ajout nouvelle fonctionnalité'\`)
4. Push vers la branche (\`git push origin feature/nouvelle-fonctionnalite\`)
5. Créer une Pull Request

## 📄 License

Ce projet est sous licence MIT.

## 👥 Équipe

- **Lead Developer** - [Nom]
- **UI/UX Designer** - [Nom]
- **DevOps** - [Nom]

## 📞 Support

- 📧 Email: support@gmao-pro.com
- 📖 Documentation: [lien]
- 🐛 Issues: [lien GitHub]`,

  // Gitignore
  '.gitignore': `# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS generated files
Thumbs.db
ehthumbs.db

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/`,

  // HTML de base
  'public/index.html': `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#3B82F6" />
    <meta name="description" content="GMAO Pro - Gestion de Maintenance Assistée par Ordinateur" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>GMAO Pro</title>
</head>
<body>
    <noscript>Vous devez activer JavaScript pour exécuter cette application.</noscript>
    <div id="root"></div>
</body>
</html>`,

  // Manifest PWA
  'public/manifest.json': `{
  "short_name": "GMAO Pro",
  "name": "GMAO Pro - Gestion de Maintenance",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#3B82F6",
  "background_color": "#ffffff"
}`,

  // Fichier de constantes
  'src/constants/index.js': `// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT) || 30000,
};

// Application Configuration
export const APP_CONFIG = {
  NAME: process.env.REACT_APP_NAME || 'GMAO Pro',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  DESCRIPTION: process.env.REACT_APP_DESCRIPTION || 'Gestion de Maintenance Assistée par Ordinateur',
};

// Feature Flags
export const FEATURES = {
  NOTIFICATIONS: process.env.REACT_APP_ENABLE_NOTIFICATIONS === 'true',
  QR_CODE: process.env.REACT_APP_ENABLE_QR_CODE === 'true',
  OFFLINE_MODE: process.env.REACT_APP_ENABLE_OFFLINE_MODE === 'true',
};

// Routes Constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/app/dashboard',
  EQUIPMENT: '/app/equipment',
  WORK_ORDERS: '/app/work-orders',
  MAINTENANCE: '/app/maintenance',
  INVENTORY: '/app/inventory',
  REPORTS: '/app/reports',
  USERS: '/app/users',
  PROFILE: '/app/profile',
};

// User Roles
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  TECHNICIAN: 'technician',
  OPERATOR: 'operator',
};

// Permissions
export const PERMISSIONS = {
  // Equipment
  EQUIPMENT_VIEW: 'equipment:view',
  EQUIPMENT_CREATE: 'equipment:create',
  EQUIPMENT_EDIT: 'equipment:edit',
  EQUIPMENT_DELETE: 'equipment:delete',
  
  // Work Orders
  WORK_ORDER_VIEW: 'work_order:view',
  WORK_ORDER_CREATE: 'work_order:create',
  WORK_ORDER_EDIT: 'work_order:edit',
  WORK_ORDER_DELETE: 'work_order:delete',
  WORK_ORDER_ASSIGN: 'work_order:assign',
  
  // Maintenance
  MAINTENANCE_VIEW: 'maintenance:view',
  MAINTENANCE_CREATE: 'maintenance:create',
  MAINTENANCE_EDIT: 'maintenance:edit',
  MAINTENANCE_DELETE: 'maintenance:delete',
  
  // Users
  USER_VIEW: 'user:view',
  USER_CREATE: 'user:create',
  USER_EDIT: 'user:edit',
  USER_DELETE: 'user:delete',
  
  // Reports
  REPORT_VIEW: 'report:view',
  REPORT_CREATE: 'report:create',
  REPORT_EXPORT: 'report:export',
};

// Equipment Status
export const EQUIPMENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  OUT_OF_ORDER: 'out_of_order',
};

// Work Order Status
export const WORK_ORDER_STATUS = {
  DRAFT: 'draft',
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  ON_HOLD: 'on_hold',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Priority Levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
  EMERGENCY: 'emergency',
};

// Maintenance Types
export const MAINTENANCE_TYPES = {
  PREVENTIVE: 'preventive',
  CORRECTIVE: 'corrective',
  PREDICTIVE: 'predictive',
  CONDITION_BASED: 'condition_based',
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
  API: 'yyyy-MM-dd',
  API_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss",
};
// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 25,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  MAX_VISIBLE_PAGES: 5,
};

// Colors for charts and status
export const CHART_COLORS = {
  PRIMARY: '#3B82F6',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  DANGER: '#EF4444',
  INFO: '#06B6D4',
  SECONDARY: '#6B7280',
  PALETTE: [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ],
};

// Status Colors
export const STATUS_COLORS = {
  [EQUIPMENT_STATUS.ACTIVE]: 'text-green-600 bg-green-100',
  [EQUIPMENT_STATUS.INACTIVE]: 'text-gray-600 bg-gray-100',
  [EQUIPMENT_STATUS.MAINTENANCE]: 'text-yellow-600 bg-yellow-100',
  [EQUIPMENT_STATUS.OUT_OF_ORDER]: 'text-red-600 bg-red-100',
  
  [WORK_ORDER_STATUS.DRAFT]: 'text-gray-600 bg-gray-100',
  [WORK_ORDER_STATUS.OPEN]: 'text-blue-600 bg-blue-100',
  [WORK_ORDER_STATUS.IN_PROGRESS]: 'text-yellow-600 bg-yellow-100',
  [WORK_ORDER_STATUS.ON_HOLD]: 'text-orange-600 bg-orange-100',
  [WORK_ORDER_STATUS.COMPLETED]: 'text-green-600 bg-green-100',
  [WORK_ORDER_STATUS.CANCELLED]: 'text-red-600 bg-red-100',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'gmao_auth_token',
  USER_PREFERENCES: 'gmao_user_preferences',
  THEME: 'gmao_theme',
  LANGUAGE: 'gmao_language',
  SIDEBAR_STATE: 'gmao_sidebar_state',
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  EQUIPMENT: {
    LIST: '/equipment',
    CREATE: '/equipment',
    DETAIL: (id) => `/equipment/${id}`,
    UPDATE: (id) => `/equipment/${id}`,
    DELETE: (id) => `/equipment/${id}`,
    QR_CODE: (id) => `/equipment/${id}/qr-code`,
  },
  WORK_ORDERS: {
    LIST: '/work-orders',
    CREATE: '/work-orders',
    DETAIL: (id) => `/work-orders/${id}`,
    UPDATE: (id) => `/work-orders/${id}`,
    DELETE: (id) => `/work-orders/${id}`,
    ASSIGN: (id) => `/work-orders/${id}/assign`,
    COMPLETE: (id) => `/work-orders/${id}/complete`,
  },
  MAINTENANCE: {
    LIST: '/maintenance',
    CREATE: '/maintenance',
    DETAIL: (id) => `/maintenance/${id}`,
    SCHEDULES: '/maintenance/schedules',
  },
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    DETAIL: (id) => `/users/${id}`,
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },
  REPORTS: {
    DASHBOARD: '/reports/dashboard',
    EQUIPMENT: '/reports/equipment',
    MAINTENANCE: '/reports/maintenance',
    EXPORT: '/reports/export',
  },
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: {
    IMAGES: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    DOCUMENTS: ['.pdf', '.doc', '.docx', '.xls', '.xlsx'],
    ALL: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf', '.doc', '.docx', '.xls', '.xlsx'],
  },
};

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s-()]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  EQUIPMENT_CODE: /^[A-Z]{2,3}-\d{3,6}$/,
  QR_CODE: /^[A-Z0-9]{8,16}$/,
};

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Ce champ est obligatoire',
  INVALID_EMAIL: 'Adresse email invalide',
  INVALID_PHONE: 'Numéro de téléphone invalide',
  WEAK_PASSWORD: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre',
  PASSWORDS_DONT_MATCH: 'Les mots de passe ne correspondent pas',
  MIN_LENGTH: (min) => `Minimum ${min} caractères requis`,
  MAX_LENGTH: (max) => `Maximum ${max} caractères autorisés`,
  INVALID_FORMAT: 'Format invalide',
  NETWORK_ERROR: 'Erreur de connexion réseau',
  UNAUTHORIZED: 'Non autorisé',
  FORBIDDEN: 'Accès interdit',
  NOT_FOUND: 'Ressource non trouvée',
  SERVER_ERROR: 'Erreur serveur',
};

// Equipment Categories
export const EQUIPMENT_CATEGORIES = {
  PRODUCTION: 'production',
  HVAC: 'hvac',
  ELECTRICAL: 'electrical',
  MECHANICAL: 'mechanical',
  SAFETY: 'safety',
  IT: 'it',
  TRANSPORT: 'transport',
  OTHER: 'other',
};

// Maintenance Frequencies
export const MAINTENANCE_FREQUENCIES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  SEMI_ANNUAL: 'semi_annual',
  ANNUAL: 'annual',
  CUSTOM: 'custom',
};

// Time Durations (in minutes)
export const TIME_DURATIONS = {
  HOUR: 60,
  DAY: 24 * 60,
  WEEK: 7 * 24 * 60,
  MONTH: 30 * 24 * 60,
  YEAR: 365 * 24 * 60,
};

// Export formats
export const EXPORT_FORMATS = {
  PDF: 'pdf',
  EXCEL: 'xlsx',
  CSV: 'csv',
  JSON: 'json',
};

// Default avatar
export const DEFAULT_AVATAR = '/images/default-avatar.png';

// Theme Configuration
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// Languages
export const LANGUAGES = {
  FR: 'fr',
  EN: 'en',
  ES: 'es',
};

// Dashboard refresh interval (in seconds)
export const REFRESH_INTERVALS = {
  DASHBOARD: 30,
  NOTIFICATIONS: 60,
  WORK_ORDERS: 15,
};

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
};`,

  // ErrorBoundary component
  'src/components/ErrorBoundary.js': `import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to monitoring service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-lg font-medium text-gray-900">
                Oops! Une erreur s'est produite
              </h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Nous sommes désolés, mais quelque chose s'est mal passé. 
              L'équipe technique a été notifiée.
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="mb-4 text-sm">
                <summary className="cursor-pointer text-gray-700 font-medium">
                  Détails de l'erreur (développement)
                </summary>
                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            
            <div className="flex space-x-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Recharger la page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-gray-200 text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;`,
};

// Fonction pour créer les dossiers
function createDirectories() {
  log.info('Création de la structure des dossiers...');
  
  directoryStructure.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      log.success(`Dossier créé: ${dir}`);
    }
  });
}

// Fonction pour créer les fichiers
function createFiles() {
  log.info('Génération des fichiers de base...');
  
  Object.entries(fileTemplates).forEach(([filename, content]) => {
    const filePath = path.join(process.cwd(), filename);
    
    try {
      // Créer le dossier parent si nécessaire
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Écrire le fichier
      fs.writeFileSync(filePath, content);
      log.success(`Fichier créé: ${filename}`);
    } catch (error) {
      log.error(`Erreur lors de la création de ${filename}: ${error.message}`);
    }
  });
}

// Fonction pour créer les fichiers de base des composants
function createComponentStubs() {
  const components = [
    'src/context/AuthContext.js',
    'src/context/NotificationContext.js',
    'src/router/index.js',
  ];

  const stubContent = {
    'src/context/AuthContext.js': `import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // TODO: Implement login logic
      console.log('Login:', credentials);
      setIsAuthenticated(true);
      setUser({ id: 1, name: 'John Doe', role: 'admin' });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};`,

    'src/context/NotificationContext.js': `import React, { createContext, useContext } from 'react';
import toast from 'react-hot-toast';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const showSuccess = (message) => {
    toast.success(message);
  };

  const showError = (message) => {
    toast.error(message);
  };

  const showWarning = (message) => {
    toast(message, { icon: '⚠️' });
  };

  const showInfo = (message) => {
    toast(message, { icon: 'ℹ️' });
  };

  const value = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};`,

    'src/router/index.js': `import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Temporary placeholder components
const Dashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
    <p className="text-gray-600 mt-2">Bienvenue dans GMAO Pro</p>
  </div>
);

const Login = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold text-center mb-6">Connexion GMAO Pro</h2>
      <form>
        <div className="mb-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-6">
          <input 
            type="password" 
            placeholder="Mot de passe" 
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <button className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
          Se connecter
        </button>
      </form>
    </div>
  </div>
);

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/app/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
    </Routes>
  );
};

export default RouterConfig;`,
  };

  components.forEach(component => {
    const filePath = path.join(process.cwd(), component);
    const content = stubContent[component] || '// TODO: Implement component';
    
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(filePath, content);
      log.success(`Composant créé: ${component}`);
    } catch (error) {
      log.error(`Erreur lors de la création de ${component}: ${error.message}`);
    }
  });
}

// Execution principale
function main() {
  try {
    log.info('🚀 Génération du projet GMAO Frontend...');
    
    createDirectories();
    createFiles();
    createComponentStubs();
    
    log.success('✨ Génération terminée avec succès!');
    log.info('📁 Structure du projet créée');
    log.info('⚙️ Fichiers de configuration générés');
    log.info('🎨 Composants de base créés');
    
    console.log('\n🎯 Prochaines étapes:');
    console.log('   1. npm install');
    console.log('   2. npm start');
    console.log('   3. Ouvrir http://localhost:3000');
    
  } catch (error) {
    log.error(`Erreur lors de la génération: ${error.message}`);
    process.exit(1);
  }
}

// Lancer le script
main();