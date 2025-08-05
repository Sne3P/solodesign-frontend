import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "../components/ui/toaster";
import { LoadingProvider } from "../contexts/LoadingContext";
import LoaderGlobal from "../components/global/LoaderGlobal";
import SEO from "../components/seo/SEO";
import { GoogleAnalytics, Clarity, Hotjar } from "../components/analytics/Analytics";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'SoloDesign - Création Site Web, Applications & Solutions Digitales sur Mesure',
  description: 'Expert en création de sites web, applications mobiles, ERP, CRM, e-commerce et solutions digitales innovantes. Design moderne, développement sur mesure, référencement SEO, réseaux sociaux. Transformez votre vision en réalité digitale avec SoloDesign.',
  keywords: 'création site web, développement web, application mobile, design UI/UX, ERP sur mesure, CRM personnalisé, e-commerce, boutique en ligne, référencement SEO, marketing digital, réseaux sociaux, solutions digitales, développement sur mesure',
  authors: [{ name: 'SoloDesign', url: 'https://solodesign.fr' }],
  creator: 'SoloDesign',
  publisher: 'SoloDesign',
  openGraph: {
    title: 'SoloDesign - Expert en Création de Sites Web & Solutions Digitales',
    description: 'Transformez votre vision en réalité digitale avec nos solutions sur mesure : sites web, applications, ERP, CRM, e-commerce. Design moderne et développement de qualité.',
    url: 'https://solodesign.fr',
    siteName: 'SoloDesign',
    images: [
      {
        url: '/og-solodesign-creation-site-web.jpg',
        width: 1200,
        height: 630,
        alt: 'SoloDesign - Expert en création de sites web et solutions digitales',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SoloDesign - Expert en Création de Sites Web & Solutions Digitales',
    description: 'Transformez votre vision en réalité digitale avec nos solutions sur mesure : sites web, applications, ERP, CRM, e-commerce.',
    images: ['/og-solodesign-creation-site-web.jpg'],
    creator: '@solodesign',
  },
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
  verification: {
    google: 'VOTRE_CODE_GOOGLE_VERIFICATION',
    yandex: 'VOTRE_CODE_YANDEX_VERIFICATION',
    other: {
      'msvalidate.01': 'VOTRE_CODE_BING_VERIFICATION',
    },
  },
  alternates: {
    canonical: 'https://solodesign.fr',
    languages: {
      'fr': 'https://solodesign.fr',
      'en': 'https://solodesign.com',
    },
  },
  category: 'Développement Web',
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
  return (
    <html lang="fr" className={htmlClass}>
      <head>
        <SEO />
      </head>
      <body>
        <LoadingProvider>
          <LoaderGlobal />
          {children}
          <Toaster />
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
          <Clarity projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID} />
          <Hotjar hjid={process.env.NEXT_PUBLIC_HOTJAR_ID ? Number(process.env.NEXT_PUBLIC_HOTJAR_ID) : undefined} />
        </LoadingProvider>
      </body>
    </html>
  );
}
