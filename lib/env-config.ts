/**
 * Configuration environnementale adaptative
 * Optimise automatiquement les paramètres selon l'environnement
 */

// Configuration par environnement
export const ENV_CONFIG = {
  development: {
    analytics: false,
    logging: true,
    sourceMap: true,
    minification: false,
    cacheHeaders: false,
    security: 'relaxed'
  },
  production: {
    analytics: true,
    logging: false,
    sourceMap: false,
    minification: true,
    cacheHeaders: true,
    security: 'strict'
  },
  test: {
    analytics: false,
    logging: false,
    sourceMap: false,
    minification: false,
    cacheHeaders: false,
    security: 'relaxed'
  }
};

// Configuration actuelle basée sur NODE_ENV
export const CURRENT_ENV = process.env.NODE_ENV || 'development';
export const IS_PRODUCTION = CURRENT_ENV === 'production';
export const IS_DEVELOPMENT = CURRENT_ENV === 'development';

// Configuration active
export const CONFIG = ENV_CONFIG[CURRENT_ENV as keyof typeof ENV_CONFIG] || ENV_CONFIG.development;

// URLs et domaines sécurisés
export const ALLOWED_DOMAINS = IS_PRODUCTION 
  ? ['solodesign.fr', 'www.solodesign.fr']
  : ['localhost', '127.0.0.1', 'localhost:3000', 'localhost:3001'];

// Configuration CORS sécurisée
export const CORS_CONFIG = {
  origin: IS_PRODUCTION 
    ? (origin: string) => ALLOWED_DOMAINS.includes(new URL(origin).hostname)
    : true,
  credentials: true,
  optionsSuccessStatus: 200
};

// Headers de sécurité adaptatifs
export const SECURITY_HEADERS = {
  'X-Frame-Options': IS_PRODUCTION ? 'DENY' : 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  ...(IS_PRODUCTION && {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com; frame-ancestors 'none';"
  })
};

export default CONFIG;
