import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "../components/ui/toaster";
import { LoadingProvider } from "../contexts/LoadingContext";
import LoaderGlobal from "../components/global/LoaderGlobal";
import SEO from "../components/seo/SEO";
import DeferredAnalytics from "../components/analytics/DeferredAnalytics";
import { generatePageMetadata, getStructuredData } from "../lib/seo-utils";
import PerformanceMonitor from "../components/performance/PerformanceMonitor";
import ServiceWorkerRegistration from "../components/performance/ServiceWorkerRegistration";

// Configuration optimisée des fonts pour Performance
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif']
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono", 
  weight: "100 900",
  display: 'swap',
  preload: false,
  fallback: ['ui-monospace', 'Monaco', 'monospace']
});

// Métadonnées générées automatiquement avec notre système SEO optimisé
// Ajout explicite de metadataBase pour corriger l'avertissement Next.js
const baseMetadata = generatePageMetadata('home') as Metadata;
export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
};

// IMPORTANT :
// Ne jamais modifier la classe du <html> côté client (pas de document.documentElement.classList.add/remove)
// Si besoin d'une classe dynamique (ex: dark mode), la gérer ici côté serveur (SSR) uniquement.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Si besoin d'ajouter une classe dynamique, le faire ici (ex: lire un cookie ou header SSR)
  const htmlClass = `${geistSans.variable} ${geistMono.variable} antialiased`;
  
  // Données structurées pour le SEO
  const organizationData = getStructuredData('organization');
  const websiteData = getStructuredData('website');
  
  return (
    <html lang="fr" className={htmlClass}>
      <head>
        {/* Preconnect pour les ressources externes critiques */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch pour les domaines tiers */}
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://static.hotjar.com" />
        
        {/* Preload des ressources critiques pour LCP */}
        <link 
          rel="preload" 
          href="/app/fonts/GeistVF.woff" 
          as="font" 
          type="font/woff" 
          crossOrigin="anonymous" 
        />
        
        <SEO />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteData),
          }}
        />
      </head>
      <body>
        <LoadingProvider>
          <LoaderGlobal />
          {children}
          <Toaster />
          <DeferredAnalytics />
          <PerformanceMonitor />
          <ServiceWorkerRegistration />
        </LoadingProvider>
      </body>
    </html>
  );
}
