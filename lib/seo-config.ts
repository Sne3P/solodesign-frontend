/**
 * Configuration SEO centralisée et optimisée pour SoloDesign
 * Toutes les métadonnées SEO en un seul endroit
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: Record<string, unknown>;
}

// Configuration SEO de base
export const defaultSEO: SEOConfig = {
  title: 'SoloDesign - Création Site Web, Applications & Solutions Digitales sur Mesure',
  description: 'Expert en création de sites web, applications mobiles, ERP, CRM, e-commerce et solutions digitales innovantes. Design moderne, développement sur mesure, référencement SEO, réseaux sociaux. Transformez votre vision en réalité digitale avec SoloDesign.',
  keywords: 'création site web, développement web, application mobile, design UI/UX, ERP sur mesure, CRM personnalisé, e-commerce, boutique en ligne, référencement SEO, marketing digital, réseaux sociaux, solutions digitales, développement sur mesure, agence web, freelance développeur, sites responsives, Progressive Web App, PWA, React, Next.js, TypeScript, Tailwind CSS, Framer Motion, API REST, base de données, hébergement web, nom de domaine, maintenance site web, optimisation performances, audit SEO, stratégie digitale, transformation numérique, innovation technologique'
};

// Configurations SEO par page
export const pageSEOConfigs: Record<string, Partial<SEOConfig>> = {
  home: {
    title: 'SoloDesign - Agence Web & Développement Digital Sur Mesure',
    description: 'Agence web spécialisée en création de sites internet, applications mobiles et solutions digitales. Développement React/Next.js, design UI/UX moderne, SEO optimisé. Devis gratuit sous 48h.',
    keywords: 'agence web, création site internet, développement application, design web, SEO, référencement naturel, site responsive, e-commerce, vitrine digitale, portfolio en ligne',
    canonical: 'https://solodesign.fr'
  },
  
  services: {
    title: 'Services Web & Digital - Développement, Design, SEO | SoloDesign',
    description: 'Découvrez nos services : création sites web, applications mobiles, ERP/CRM sur mesure, e-commerce, design UI/UX, référencement SEO, marketing digital. Solutions complètes pour votre entreprise.',
    keywords: 'services web, développement web, création application mobile, ERP entreprise, CRM sur mesure, boutique en ligne, design graphique, identité visuelle, logo, SEO technique, audit site web, optimisation conversion, stratégie digitale, accompagnement transformation numérique',
    canonical: 'https://solodesign.fr/services'
  },
  
  projects: {
    title: 'Portfolio & Réalisations - Projets Web et Applications | SoloDesign',
    description: 'Découvrez nos réalisations : sites web, applications mobiles, plateformes e-commerce et solutions digitales innovantes. Témoignages clients et études de cas détaillées.',
    keywords: 'portfolio web, réalisations digitales, projets sites internet, applications mobiles développées, e-commerce créé, plateformes web, études de cas, témoignages clients, références projets',
    canonical: 'https://solodesign.fr/projects'
  },
  
  contact: {
    title: 'Contact & Devis Gratuit - Parlons de Votre Projet Digital | SoloDesign',
    description: 'Contactez SoloDesign pour votre projet web ou mobile. Devis gratuit sous 48h, consultation personnalisée, accompagnement de A à Z. Ensemble, créons votre succès digital.',
    keywords: 'contact agence web, devis site internet gratuit, consultation projet digital, demande devis application mobile, rendez-vous développeur, accompagnement projet web, estimation coût site web',
    canonical: 'https://solodesign.fr/contact'
  },
  
  about: {
    title: 'À Propos - Développeur Web Freelance Expert | SoloDesign',
    description: 'Développeur web freelance passionné avec expertise React/Next.js, design UI/UX et SEO. Accompagnement personnalisé pour créer des solutions digitales qui vous ressemblent.',
    keywords: 'développeur web freelance, expert React Next.js, designer UI/UX, consultant SEO, développement sur mesure, accompagnement projet digital, expertise technique web',
    canonical: 'https://solodesign.fr/about-us'
  }
};

// Mots-clés sectoriels pour cibler différents domaines
export const sectorialKeywords = {
  business: 'site vitrine entreprise, présence en ligne professionnelle, image de marque digitale, communication corporate, B2B digital',
  ecommerce: 'boutique en ligne, vente en ligne, marketplace, panier d\'achat, paiement sécurisé, gestion stock, dropshipping, multi-vendeurs',
  restaurant: 'site restaurant, carte en ligne, commande en ligne, livraison, réservation table, menu digital, QR code',
  immobilier: 'site immobilier, annonces immobilières, visite virtuelle, estimation bien, gestion locative, syndic en ligne',
  sante: 'site médical, prise rendez-vous en ligne, dossier patient, téléconsultation, planning médecin, cabinet médical',
  education: 'plateforme e-learning, formation en ligne, LMS, quiz interactifs, suivi progression, certification',
  artisan: 'site artisan, devis en ligne, showcase travaux, galerie réalisations, contact client, géolocalisation',
  association: 'site association, événements, membres, dons en ligne, bénévolat, newsletter, communication'
};

// Technologies et outils (pour référencement technique)
export const technicalKeywords = 'React, Next.js, TypeScript, Tailwind CSS, Framer Motion, API REST, GraphQL, MongoDB, PostgreSQL, Node.js, Express.js, Prisma, Vercel, Netlify, AWS, Docker, GitHub, CI/CD, Progressive Web App, PWA, AMP, Schema.org, Core Web Vitals, WebP, AVIF, lazy loading, code splitting, SSR, SSG, ISR';

// Localisation et régions
export const locationKeywords = 'France, Paris, Lyon, Marseille, Toulouse, Bordeaux, Lille, Nantes, Strasbourg, Montpellier, Nice, Rennes, développeur web local, agence proximité, prestations France entière, remote, télétravail';

// Générateur de structured data
export const generateStructuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SoloDesign",
    "url": "https://solodesign.fr",
    "logo": "https://solodesign.fr/logo_white_png.png",
    "description": "Agence web spécialisée en création de sites internet et applications mobiles sur mesure",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33-X-XX-XX-XX-XX",
      "contactType": "Customer Service",
      "availableLanguage": "French"
    },
    "sameAs": [
      "https://github.com/solodesign",
      "https://linkedin.com/company/solodesign"
    ]
  },
  
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://solodesign.fr",
    "name": "SoloDesign",
    "description": "Création de sites web et applications mobiles sur mesure",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://solodesign.fr/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  
  service: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Développement Web Sur Mesure",
    "description": "Création de sites web et applications mobiles personnalisées",
    "provider": {
      "@type": "Organization",
      "name": "SoloDesign"
    },
    "serviceType": "Web Development",
    "areaServed": "FR"
  }
};

export default defaultSEO;
