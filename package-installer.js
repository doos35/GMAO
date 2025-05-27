const { execSync } = require('child_process');

const dependencies = {
  production: [
    'react-router-dom@^6.20.1',
    'axios@^1.6.2',
    '@headlessui/react@^1.7.17',
    '@heroicons/react@^2.0.18',
    'react-hook-form@^7.48.2',
    '@hookform/resolvers@^3.3.2',
    'yup@^1.3.3',
    'recharts@^2.8.0',
    'date-fns@^2.30.0',
    'react-query@^3.39.3',
    'zustand@^4.4.7',
    'react-hot-toast@^2.4.1',
    'clsx@^2.0.0',
    'js-qr-generator@^1.1.1',
    'html5-qrcode@^2.3.8',
  ],
  development: [
    'tailwindcss@^3.3.6',
    '@tailwindcss/forms@^0.5.7',
    '@tailwindcss/typography@^0.5.10',
    'postcss@^8.4.32',
    'autoprefixer@^10.4.16',
    'eslint-config-prettier@^9.0.0',
    'eslint-plugin-prettier@^5.0.1',
    'prettier@^3.1.0',
  ]
};

console.log('📦 Installation automatique des dépendances...');

try {
  // Installation des dépendances de production
  console.log('🔧 Installation des dépendances principales...');
  execSync(`npm install ${dependencies.production.join(' ')}`, { stdio: 'inherit' });
  
  // Installation des dépendances de développement
  console.log('🛠️  Installation des dépendances de développement...');
  execSync(`npm install --save-dev ${dependencies.development.join(' ')}`, { stdio: 'inherit' });
  
  console.log('✅ Toutes les dépendances ont été installées avec succès!');
  
} catch (error) {
  console.error('❌ Erreur lors de l\'installation:', error.message);
  process.exit(1);
}