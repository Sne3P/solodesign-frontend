import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "../components/ui/toaster";
import { LoadingProvider } from "../contexts/LoadingContext";
import LoaderGlobal from "../components/global/LoaderGlobal";
import SEO from "../components/seo/SEO";
import { GoogleAnalytics, Clarity, Hotjar } from "../components/analytics/Analytics";
import { generatePageMetadata, getStructuredData } from "../lib/seo-utils";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
  preload: true,
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
  preload: true,
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
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
          <Clarity projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID} />
          <Hotjar siteId={process.env.NEXT_PUBLIC_HOTJAR_ID} />
        </LoadingProvider>
      </body>
    </html>
  );
}
