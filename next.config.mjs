/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Output standalone pour Docker
  output: 'standalone',
  
  // Optimisations expérimentales
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-toast'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Configuration des images optimisée (migration vers remotePatterns)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Optimisations de performance
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Configuration webpack optimisée
  webpack: (config, { dev, isServer }) => {
    // Optimisations pour la production
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
      };
    }

    // Optimisation des SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  },
  
  // Headers de sécurité et performance optimisés
  headers: async () => {
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
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'production' 
              ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://clarity.ms https://static.hotjar.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://clarity.ms https://*.hotjar.com; frame-src 'self' https://www.youtube.com;"
              : "default-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https:; connect-src 'self' ws: wss:;"
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
    ];
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
    ];
  },

  // Rewrites pour les URLs propres
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },
};

export default nextConfig;
