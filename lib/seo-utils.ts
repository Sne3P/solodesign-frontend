import { Metadata } from 'next';
import { defaultSEO, pageSEOConfigs, generateStructuredData, SEOConfig } from '@/lib/seo-config';

/**
 * Générateur de métadonnées SEO optimisé pour Next.js 14
 */

export function generatePageMetadata(
  page: keyof typeof pageSEOConfigs,
  customConfig?: Partial<SEOConfig>
): Metadata {
  const baseConfig = defaultSEO;
  const pageConfig = pageSEOConfigs[page] || {};
  const finalConfig = { ...baseConfig, ...pageConfig, ...customConfig };

  const metadata: Metadata = {
    title: finalConfig.title,
    description: finalConfig.description,
    keywords: finalConfig.keywords,
    
    // Open Graph
    openGraph: {
      title: finalConfig.title,
      description: finalConfig.description,
      url: finalConfig.canonical || `https://solodesign.fr/${page}`,
      siteName: 'SoloDesign',
      images: [
        {
          url: finalConfig.ogImage || '/og-solodesign-creation-site-web.jpg',
          width: 1200,
          height: 630,
          alt: finalConfig.title,
        },
      ],
      locale: 'fr_FR',
      type: 'website',
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: finalConfig.title,
      description: finalConfig.description,
      images: [finalConfig.ogImage || '/og-solodesign-creation-site-web.jpg'],
      creator: '@solodesign',
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Verification
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      other: {
        ...(process.env.NEXT_PUBLIC_BING_VERIFICATION && {
          'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION
        }),
        ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && {
          'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
        }),
      },
    },

    // Canonical
    alternates: {
      canonical: finalConfig.canonical,
      languages: {
        'fr': finalConfig.canonical || 'https://solodesign.fr',
      },
    },

    // Additional
    authors: [{ name: 'SoloDesign', url: 'https://solodesign.fr' }],
    creator: 'SoloDesign',
    publisher: 'SoloDesign',
    category: 'Développement Web',
  };

  return metadata;
}

/**
 * Générateur de structured data pour injection dans les pages
 */
export function getStructuredData(type: keyof typeof generateStructuredData, customData?: Record<string, unknown>) {
  const baseData = generateStructuredData[type];
  return customData ? { ...baseData, ...customData } : baseData;
}

/**
 * Générateur de sitemap XML dynamique
 */
export function generateSitemap() {
  const baseUrl = 'https://solodesign.fr';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const staticPages = [
    { url: '', changefreq: 'weekly', priority: '1.0' },
    { url: '/services', changefreq: 'monthly', priority: '0.9' },
    { url: '/projects', changefreq: 'weekly', priority: '0.8' },
    { url: '/contact', changefreq: 'monthly', priority: '0.7' },
    { url: '/about-us', changefreq: 'monthly', priority: '0.6' },
    { url: '/legal', changefreq: 'yearly', priority: '0.3' },
    { url: '/privacy', changefreq: 'yearly', priority: '0.3' },
    { url: '/terms', changefreq: 'yearly', priority: '0.3' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${staticPages
  .map(
    page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return sitemap;
}

/**
 * Générateur de robots.txt optimisé
 */
export function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Optimisation pour les moteurs de recherche
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 2

# Interdire l'accès aux fichiers sensibles
Disallow: /api/auth/
Disallow: /admin/
Disallow: /.env
Disallow: /logs/
Disallow: /scripts/

# Fichiers importants
Sitemap: https://solodesign.fr/sitemap.xml

# Optimisation de crawl
Host: https://solodesign.fr`;
}

export default generatePageMetadata;
