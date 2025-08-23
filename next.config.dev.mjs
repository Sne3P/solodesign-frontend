/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: !isDev, // Désactivé en dev pour de meilleures performances
  
  // Configuration différente selon l'environnement
  ...(isDev ? {
    // Configuration pour développement
    output: undefined, // Pas de standalone en dev
    typescript: {
      ignoreBuildErrors: false, // Stricte en dev
    },
    eslint: {
      ignoreDuringBuilds: false, // Stricte en dev
    }
  } : {
    // Configuration pour production
    output: 'standalone',
    typescript: {
      ignoreBuildErrors: false,
    },
    eslint: {
      ignoreDuringBuilds: false,
    }
  }),
  
  // Optimisations expérimentales compatibles Next 15
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-toast'],
    serverComponentsExternalPackages: ['sharp'],
    optimizeCss: !isDev, // Seulement en production
    
    // Hot reload optimisé pour le développement
    ...(isDev ? {
      webpackBuildWorker: true,
      useWasmBinary: false,
    } : {}),
  },
  
  // Configuration des images simplifiée
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: isDev ? 60 : 31536000, // Cache court en dev
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Configuration de base
  compress: !isDev, // Compression seulement en prod
  poweredByHeader: false,
  generateEtags: !isDev, // ETags seulement en prod
  
  // Webpack configuration optimisée
  webpack: (config, { dev, isServer }) => {
    // Optimisations spécifiques au développement
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
      
      // Fast Refresh optimisé
      config.module.rules.push({
        test: /\.(tsx|ts|jsx|js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            plugins: [
              ['react-refresh/babel', { skipEnvCheck: true }]
            ]
          }
        }
      })
    }
    
    // Optimisations pour la production seulement
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            animations: {
              name: 'animations',
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              priority: 20,
              reuseExistingChunk: true
            },
            icons: {
              name: 'icons', 
              test: /[\\/]node_modules[\\/](lucide-react)[\\/]/,
              priority: 20,
              reuseExistingChunk: true
            },
            ui: {
              name: 'ui',
              test: /[\\/]node_modules[\\/](@radix-ui)[\\/]/,
              priority: 15,
              reuseExistingChunk: true
            }
          }
        }
      }
    }

    // Optimisation des SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  },
  
  // Headers conditionnels
  headers: async () => {
    if (isDev) {
      // Headers minimaux pour le développement
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN'
            },
            {
              key: 'Cache-Control',
              value: 'no-cache, no-store, must-revalidate'
            }
          ]
        }
      ]
    }
    
    // Headers complets pour la production
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options', 
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://static.hotjar.com https://script.hotjar.com https://www.clarity.ms; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.clarity.ms wss://script.hotjar.com; frame-src https://www.googletagmanager.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none';"
          }
        ]
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=600, stale-while-revalidate=86400'
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/uploads/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000'
          }
        ]
      }
    ]
  },

  // Redirections SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      }
    ]
  },
}

export default nextConfig
