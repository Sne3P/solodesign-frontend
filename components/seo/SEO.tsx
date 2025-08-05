/**
 * Composant SEO ultra-complet pour un référencement maximal
 * Optimisé pour les mots-clés : création site web, développement digital, design, ERP, CRM, e-commerce
 */

import Head from 'next/head';
import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile' | 'service' | 'product';
  locale?: string;
  siteName?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  canonical?: string;
  structuredData?: Record<string, unknown>;
  category?: string;
  price?: string;
  currency?: string;
  availability?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'SoloDesign - Création Site Web, Applications & Solutions Digitales sur Mesure',
  description = 'Expert en création de sites web, applications mobiles, ERP, CRM, e-commerce et solutions digitales innovantes. Design moderne, développement sur mesure, référencement SEO, réseaux sociaux. Transformez votre vision en réalité digitale avec SoloDesign.',
  keywords = 'création site web France métropolitaine DOM TOM, développement web professionnel Paris Lyon Marseille Toulouse Nice Strasbourg Nantes Bordeaux Lille Rennes Reims Saint-Étienne Le Havre Toulon Grenoble Dijon Angers Nîmes Villeurbanne Saint-Denis Clermont-Ferrand Aix-en-Provence Brest Le Mans Amiens Tours Limoges Perpignan Boulogne-Billancourt Metz Besançon Orléans Saint-Denis Rouen Mulhouse Caen Nancy Argenteuil Montreuil Saint-Paul, création site web Guadeloupe Martinique Guyane Réunion Mayotte Saint-Pierre-et-Miquelon Saint-Barthélemy Saint-Martin Nouvelle-Calédonie Polynésie française Wallis-et-Futuna Terres australes françaises, application mobile sur mesure iOS Android React Native Flutter, design UI UX moderne responsive mobile first, ERP sur mesure France entreprise PME TPE grands comptes, CRM personnalisé gestion client relation prospect fidélisation, e-commerce boutique en ligne vente ligne marketplace dropshipping, solutions digitales innovantes transformation numérique digitalisation, développement React Next.js TypeScript JavaScript Vue.js Angular Svelte, référencement SEO professionnel Google Bing Yahoo optimisation moteurs recherche, webdesign responsive design adaptatif mobile tablette desktop, Progressive Web App PWA application web progressive, API REST GraphQL développement backend Node.js Python Django Flask, base de données MySQL PostgreSQL MongoDB Firebase optimisation performance, hébergement web maintenance sécurité SSL HTTPS RGPD, refonte site web migration modernisation legacy, landing page conversion taux optimisation A/B testing, portfolio professionnel vitrine entreprise artisan commerce, blog professionnel CMS WordPress Drupal Joomla Prestashop Magento, plateforme web marketplace SaaS solution cloud, consultant digital France expert freelance développeur, agence digitale studio création web design graphique, transformation digitale PME TPE digitalisation processus métier, automatisation workflow intégration systèmes ERP CRM, migration données cloud AWS Azure Google Cloud OVH, audit technique SEO performance accessibilité sécurité, optimisation performances web Core Web Vitals PageSpeed Lighthouse, sécurité applications web OWASP pentest audit RGPD conformité, accessibilité web WCAG AA handicap inclusive design, formation développement web coaching mentorat accompagnement, maintenance évolutive corrective préventive monitoring, support technique hotline assistance utilisateur documentation, intégration paiement Stripe PayPal Worldline SystemPay, logistique e-commerce gestion stock commande livraison, marketing digital SEA SEM réseaux sociaux community management, création contenu rédaction web copywriting storytelling, photographie produit shooting e-commerce retouche image, vidéo motion design animation 2D 3D montage post-production, identité visuelle logo charte graphique branding communication, print carte visite flyer brochure catalogue packaging, événementiel site événement billetterie inscription gestion, immobilier site agence immobilière gestion bien location vente, santé site médical cabinet praticien télémédecine rendez-vous, éducation plateforme e-learning LMS formation ligne MOOC, tourisme site voyage réservation hôtel restaurant guide, sport fitness salle sport coach réservation planning, beauté esthétique salon coiffure spa institut, automobile garage concessionnaire location vente pièces, juridique cabinet avocat notaire expertise comptable, artisanat métier art créateur marketplace vente directe, agriculture exploitation agricole vente directe circuit court, industrie manufacturing 4.0 IoT connecté monitoring, BTP construction architecture bureau étude devis, finance banque assurance fintech investissement crowdfunding, association ONG collecte don bénévolat événement solidaire, collectivité mairie région département service public, startup incubateur accelerateur levée fonds pitch deck, franchise réseau commercial multi-sites gestion centralisée, laboratoire recherche innovation R&D publication scientifique, TypeScript JavaScript ES6 ES2023 Node.js Deno Bun, React 18 Next.js 14 Remix Gatsby Vue.js 3 Nuxt Angular 17, Tailwind CSS Styled Components Emotion SCSS SASS Less, Framer Motion GSAP Three.js WebGL Canvas 2D animation, MongoDB PostgreSQL MySQL Redis Elasticsearch Supabase, Docker Kubernetes CI/CD GitHub Actions GitLab Jenkins, Vercel Netlify Railway Heroku AWS Amplify Azure DevOps, Git versioning GitHub GitLab Bitbucket SVN collaboration, Jest Cypress Playwright Testing Library unit integration e2e, Storybook design system composant documentation, GraphQL Apollo tRPC REST API WebSocket Socket.io, Prisma TypeORM Sequelize Mongoose ODM ORM database, Stripe PayPal Square Worldline Adyen paiement gateway, Algolia ElasticSearch Solr recherche indexation full-text, Contentful Strapi Sanity Directus headless CMS JAMstack, Figma Adobe XD Sketch Photoshop Illustrator InDesign, Slack Discord Microsoft Teams communication collaboration, Notion Airtable Google Workspace productivity organisation, Analytics Google Analytics Mixpanel Amplitude Hotjar Clarity, SEO Semrush Ahrefs Moz Screaming Frog audit technique, développeur full-stack front-end back-end DevOps architect, consultant senior expert lead développeur principal, freelance indépendant auto-entrepreneur micro-entreprise, agence studio équipe remote télétravail hybride, formation bootcamp école développement reconversion, certification AWS Google Cloud Azure CompTIA développeur, veille technologique innovation tendance framework, open source contribution GitHub npm package library, sécurité cybersécurité OWASP pen-test audit vulnérabilité, performance optimisation Core Web Vitals lighthouse pagespeed, accessibilité WCAG ARIA screen reader handicap inclusion, internationalisation i18n l10n multi-langue traduction, PWA service worker cache offline first responsive, micro-services architecture serverless cloud native container, blockchain NFT crypto DeFi Web3 smart contract solidity, IA intelligence artificielle machine learning ChatGPT automation, réalité virtuelle augmentée VR AR métaverse 3D immersif, IoT internet objets connecté domotique industrie 4.0 capteur, no-code low-code Bubble Webflow Zapier automatisation, data science analyse données big data visualisation dashboard, DevSecOps security shift-left SAST DAST infrastructure code, cloud computing hybrid multi-cloud edge computing serverless, développement agile scrum kanban lean startup MVP iteration, UX recherche utilisateur persona wireframe prototype test',
  author = 'SoloDesign - Expert Digital & Développeur Full-Stack',
  url = 'https://solodesign.fr',
  image = '/og-solodesign-creation-site-web.jpg',
  type = 'website',
  locale = 'fr_FR',
  siteName = 'SoloDesign',
  noIndex = false,
  noFollow = false,
  canonical,
  structuredData,
  category = 'Développement Web',
  price,
  currency = 'EUR',
  availability = 'InStock'
}) => {
  const robotsContent = `${noIndex ? 'noindex' : 'index'},${noFollow ? 'nofollow' : 'follow'}`;
  const canonicalUrl = canonical || url;

  // Structured Data par défaut
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        "name": "SoloDesign",
        "url": url,
        "logo": {
          "@type": "ImageObject",
          "url": `${url}/logo-solodesign.png`,
          "width": 512,
          "height": 512
        },
        "description": "Expert en création de sites web et solutions digitales sur mesure",
        "foundingDate": "2024",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "FR",
          "addressLocality": "France"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+33-X-XX-XX-XX-XX",
          "contactType": "customer service",
          "availableLanguage": ["French", "English"]
        },
        "sameAs": [
          "https://linkedin.com/in/solodesign",
          "https://github.com/solodesign",
          "https://twitter.com/solodesign",
          "https://instagram.com/solodesign",
          "https://facebook.com/solodesign"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        "url": url,
        "name": siteName,
        "description": description,
        "publisher": {
          "@id": `${url}/#organization`
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${url}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "fr-FR"
      },
      {
        "@type": "Person",
        "@id": `${url}/#person`,
        "name": "SoloDesign",
        "givenName": "Solo",
        "familyName": "Design",
        "jobTitle": "Développeur Full-Stack & Designer Digital",
        "description": "Expert en création de sites web, applications et solutions digitales",
        "url": url,
        "image": `${url}/profile-solodesign.jpg`,
        "worksFor": {
          "@id": `${url}/#organization`
        },
        "knowsAbout": [
          "Développement Web",
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "UI/UX Design",
          "SEO",
          "E-commerce",
          "CRM",
          "ERP"
        ],
        "sameAs": [
          "https://linkedin.com/in/solodesign",
          "https://github.com/solodesign"
        ]
      },
      {
        "@type": "Service",
        "@id": `${url}/#service`,
        "serviceType": "Développement Web & Solutions Digitales",
        "provider": {
          "@id": `${url}/#organization`
        },
        "name": "Création de Sites Web & Applications",
        "description": "Services complets de développement web, création d'applications, ERP, CRM et solutions digitales sur mesure",
        "offers": [
          {
            "@type": "Offer",
            "name": "Création Site Web Vitrine",
            "description": "Site web professionnel responsive avec design moderne",
            "price": price || "1500",
            "priceCurrency": currency,
            "availability": `https://schema.org/${availability}`,
            "validFrom": "2024-01-01"
          },
          {
            "@type": "Offer", 
            "name": "Application Web sur Mesure",
            "description": "Développement d'applications web complexes et ERP/CRM",
            "price": "5000",
            "priceCurrency": currency,
            "availability": `https://schema.org/${availability}`,
            "validFrom": "2024-01-01"
          },
          {
            "@type": "Offer",
            "name": "E-commerce & Boutique en Ligne",
            "description": "Création de boutiques en ligne complètes avec paiement sécurisé",
            "price": "3000",
            "priceCurrency": currency,
            "availability": `https://schema.org/${availability}`,
            "validFrom": "2024-01-01"
          }
        ],
        "serviceArea": [
          {
            "@type": "Country",
            "name": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Île-de-France",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea", 
            "name": "Auvergne-Rhône-Alpes",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Nouvelle-Aquitaine", 
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Occitanie",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Hauts-de-France",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Provence-Alpes-Côte d'Azur",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Grand Est",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Pays de la Loire",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Bretagne",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Normandie",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Bourgogne-Franche-Comté",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Centre-Val de Loire",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Corse",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Guadeloupe",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Martinique", 
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Guyane",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "La Réunion",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Mayotte",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Nouvelle-Calédonie",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Polynésie française",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Saint-Pierre-et-Miquelon",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Wallis-et-Futuna",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Saint-Barthélemy",
            "containedInPlace": "France"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Saint-Martin",
            "containedInPlace": "France"
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Services Digitaux SoloDesign",
          "itemListElement": [
            {
              "@type": "OfferCatalog",
              "name": "Développement Web & Applications",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Site Web Vitrine Professionnel",
                    "description": "Création de sites web vitrines modernes, responsive et optimisés SEO pour entreprises, artisans, professions libérales"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Site E-commerce Boutique en Ligne",
                    "description": "Développement de boutiques en ligne complètes avec paiement sécurisé, gestion stock, livraison"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Application Web Progressive (PWA)",
                    "description": "Applications web modernes avec fonctionnalités mobiles, offline-first, notifications push"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Application Mobile iOS Android",
                    "description": "Développement d'applications mobiles natives et cross-platform React Native, Flutter"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Plateforme Web Marketplace",
                    "description": "Développement de plateformes complexes, marketplaces, réseaux sociaux, SaaS"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Refonte Modernisation Site Web",
                    "description": "Migration et modernisation de sites existants, optimisation performances, sécurité"
                  }
                }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "Solutions Métier Entreprise",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "ERP sur Mesure Gestion Entreprise",
                    "description": "Systèmes de gestion d'entreprise personnalisés : comptabilité, stock, production, RH"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "CRM Gestion Relation Client", 
                    "description": "Solutions CRM personnalisées : gestion prospects, clients, pipeline ventes, fidélisation"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Automatisation Processus Métier",
                    "description": "Workflow automation, intégration systèmes, API, synchronisation données"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Business Intelligence Dashboard",
                    "description": "Tableaux de bord analytics, KPI, reporting automatisé, data visualisation"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Solution Cloud Migration",
                    "description": "Migration vers le cloud AWS, Azure, Google Cloud, optimisation infrastructure"
                  }
                }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "Design & Expérience Utilisateur",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Design UI/UX Interface Utilisateur",
                    "description": "Conception d'interfaces modernes, ergonomiques, accessibles, mobile-first"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Identité Visuelle Logo Charte Graphique",
                    "description": "Création logos, charte graphique, branding, supports print et digital"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Audit UX Optimisation Conversion",
                    "description": "Analyse ergonomique, test utilisateur, optimisation taux conversion, A/B testing"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Design System Composants",
                    "description": "Création de design systems, bibliothèques composants réutilisables"
                  }
                }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "Marketing Digital & SEO",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Référencement SEO Naturel",
                    "description": "Optimisation SEO technique, contenu, netlinking, audit référencement complet"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Publicité Google Ads Facebook",
                    "description": "Campagnes SEA, SEM, publicité sociale, remarketing, optimisation ROI"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Stratégie Réseaux Sociaux",
                    "description": "Community management, création contenu, stratégie social media"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Analytics Tracking Performance",
                    "description": "Configuration Google Analytics, suivi conversions, rapports performance"
                  }
                }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "Maintenance & Support",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Maintenance Site Web Application",
                    "description": "Maintenance préventive, corrective, évolutive, monitoring, sauvegarde"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Hébergement Web Sécurisé",
                    "description": "Hébergement optimisé, SSL, CDN, monitoring performances 24/7"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Support Technique Formation",
                    "description": "Assistance utilisateur, formation équipes, documentation, hotline"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Audit Sécurité RGPD",
                    "description": "Audit sécurité, pentest, mise en conformité RGPD, protection données"
                  }
                }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "Secteurs Spécialisés",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Site Immobilier Agence Gestion",
                    "description": "Solutions immobilières : gestion biens, estimation, visite virtuelle, CRM immobilier"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Site Médical Santé Télémédecine",
                    "description": "Plateformes santé : prise rendez-vous, dossier patient, téléconsultation"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Plateforme E-learning Formation",
                    "description": "LMS, MOOC, formation en ligne, certification, suivi pédagogique"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Site Tourisme Réservation Hôtel",
                    "description": "Solutions touristiques : réservation, planning, paiement, guide voyage"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Site Association ONG Collecte",
                    "description": "Plateformes associatives : collecte dons, bénévolat, événements solidaires"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Site Collectivité Service Public",
                    "description": "Portails collectivités : démarches en ligne, information citoyenne, e-administration"
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": url
          }
        ]
      }
    ]
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      {/* Balises meta de base optimisées SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="theme-color" content="#000000" />
      
      {/* Balises pour le référencement local et géographique France + DOM-TOM */}
      <meta name="geo.region" content="FR" />
      <meta name="geo.country" content="France" />
      <meta name="geo.placename" content="France métropolitaine DOM-TOM" />
      <meta name="ICBM" content="46.603354, 1.888334" />
      <meta name="language" content="French" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="3 days" />
      <meta name="audience" content="Entreprises PME TPE Startups Collectivités Associations Artisans Commerçants Professionnels Libéraux" />
      
      {/* Balises pour les moteurs de recherche spécialisés et bots */}
      <meta name="category" content={category} />
      <meta name="coverage" content="France métropolitaine Guadeloupe Martinique Guyane Réunion Mayotte Nouvelle-Calédonie Polynésie Saint-Pierre-et-Miquelon Saint-Barthélemy Saint-Martin Wallis-Futuna" />
      <meta name="target" content="all" />
      <meta name="subject" content="Développement Web Solutions Digitales Transformation Numérique France DOM-TOM" />
      <meta name="copyright" content="SoloDesign - Tous droits réservés" />
      <meta name="abstract" content="Expert développement web et solutions digitales sur mesure pour entreprises France métropolitaine et DOM-TOM" />
      <meta name="topic" content="Développement web, applications mobiles, e-commerce, ERP, CRM, solutions digitales" />
      <meta name="summary" content="Services complets développement web et digital : sites vitrine, e-commerce, applications, ERP, CRM, SEO, design" />
      <meta name="Classification" content="Business Technology Services" />
      <meta name="designer" content="SoloDesign" />
      <meta name="reply-to" content="contact@solodesign.fr" />
      <meta name="owner" content="SoloDesign" />
      <meta name="url" content={canonicalUrl} />
      <meta name="identifier-URL" content={canonicalUrl} />
      <meta name="directory" content="submission" />
      <meta name="pagename" content={title} />
      <meta name="subtitle" content="Expert développement web France DOM-TOM" />
      <meta name="target_audience" content="B2B B2C Entreprises Particuliers" />
      <meta name="medium" content="digital web" />
      <meta name="syndication-source" content={canonicalUrl} />
      <meta name="original-source" content={canonicalUrl} />
      <meta name="verify-v1" content="SoloDesign expert développement web solutions digitales France" />
      <meta name="city" content="France" />
      <meta name="country" content="FR" />
      
      {/* Balises spécifiques pour les bots de recherche locaux */}
      <meta name="locality" content="France métropolitaine" />
      <meta name="region" content="Toutes régions françaises" />
      <meta name="postal-code" content="Toute la France" />
      <meta name="street-address" content="Intervention France entière" />
      <meta name="phone" content="+33" />
      <meta name="fax" content="+33" />
      <meta name="email" content="contact@solodesign.fr" />
      <meta name="contact" content="contact@solodesign.fr" />
      
      {/* Balises sectorielles pour ciblage métier */}
      <meta name="industry" content="Information Technology Services Web Development Digital Solutions" />
      <meta name="services" content="Développement web, e-commerce, applications mobiles, ERP, CRM, SEO, design, hébergement, maintenance" />
      <meta name="specialties" content="React Next.js TypeScript Node.js PHP Python WordPress Prestashop Magento Shopify" />
      <meta name="technologies" content="HTML5 CSS3 JavaScript TypeScript React Vue Angular Node.js PHP Python MySQL PostgreSQL MongoDB" />
      <meta name="certifications" content="Google Partner Microsoft Azure AWS Certified" />
      <meta name="experience" content="10+ ans développement web solutions digitales" />
      <meta name="portfolio" content="100+ projets réalisés entreprises PME startups" />
      <meta name="guarantee" content="Satisfaction client garantie support 24/7" />
      <meta name="delivery" content="Livraison rapide respect délais budget" />
      <meta name="pricing" content="Tarifs transparents devis gratuit" />
      <meta name="support" content="Support technique formation maintenance" />
      <meta name="hosting" content="Hébergement web sécurisé performant" />
      <meta name="security" content="Sécurité SSL HTTPS RGPD pentest" />
      <meta name="performance" content="Optimisation vitesse SEO Core Web Vitals" />
      <meta name="accessibility" content="Accessibilité WCAG handicap inclusive" />
      <meta name="responsive" content="Design responsive mobile tablet desktop" />
      <meta name="seo" content="Référencement naturel Google Bing Yahoo" />
      <meta name="analytics" content="Google Analytics tracking conversion ROI" />
      <meta name="social" content="Réseaux sociaux Facebook Instagram LinkedIn Twitter" />
      <meta name="ecommerce" content="Boutique ligne paiement sécurisé livraison" />
      <meta name="cms" content="WordPress Drupal Joomla Prestashop Magento" />
      <meta name="framework" content="React Next.js Vue.js Angular Laravel Symfony" />
      <meta name="database" content="MySQL PostgreSQL MongoDB Redis ElasticSearch" />
      <meta name="cloud" content="AWS Azure Google Cloud OVH Vercel Netlify" />
      <meta name="api" content="REST GraphQL WebSocket integration tiers" />
      <meta name="mobile" content="iOS Android React Native Flutter PWA" />
      <meta name="design" content="UI UX Figma Adobe XD Photoshop Illustrator" />
      <meta name="marketing" content="SEO SEA SEM publicité Facebook Google" />
      <meta name="conversion" content="Landing page A/B testing optimisation" />
      <meta name="automation" content="Workflow automatisation intégration" />
      <meta name="integration" content="API ERP CRM comptabilité paiement" />
      <meta name="migration" content="Refonte modernisation legacy cloud" />
      <meta name="consulting" content="Audit conseil stratégie digitale" />
      <meta name="training" content="Formation équipe documentation support" />
      <meta name="maintenance" content="Mise jour sécurité sauvegarde monitoring" />
      <meta name="legal" content="RGPD CGV mentions légales cookies" />
      <meta name="sectors" content="E-commerce Immobilier Santé Éducation Tourisme BTP Industrie Finance Association" />
      
      {/* Open Graph optimisé pour le partage social */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="SoloDesign - Expert en création de sites web et solutions digitales" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:updated_time" content={new Date().toISOString()} />
      
      {/* Balises Open Graph étendues pour les services */}
      <meta property="business:contact_data:street_address" content="France" />
      <meta property="business:contact_data:locality" content="France" />
      <meta property="business:contact_data:country_name" content="France" />
      <meta property="business:contact_data:website" content={url} />
      
      {/* Twitter Card optimisé */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@solodesign" />
      <meta name="twitter:creator" content="@solodesign" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="SoloDesign - Solutions digitales sur mesure" />
      <meta name="twitter:url" content={canonicalUrl} />
      
      {/* Balises pour LinkedIn */}
      <meta property="linkedin:owner" content="solodesign" />
      
      {/* Balises Dublin Core pour la documentation */}
      <meta name="DC.title" content={title} />
      <meta name="DC.description" content={description} />
      <meta name="DC.creator" content={author} />
      <meta name="DC.subject" content={keywords} />
      <meta name="DC.language" content="fr" />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.type" content="Service" />
      <meta name="DC.coverage" content="France" />
      <meta name="DC.rights" content="Copyright SoloDesign" />
      
      {/* Vérification des moteurs de recherche */}
      <meta name="google-site-verification" content="VOTRE_CODE_GOOGLE" />
      <meta name="msvalidate.01" content="VOTRE_CODE_BING" />
      <meta name="yandex-verification" content="VOTRE_CODE_YANDEX" />
      <meta name="baidu-site-verification" content="VOTRE_CODE_BAIDU" />
      
      {/* Liens canoniques et alternates */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" href={canonicalUrl} hrefLang="fr" />
      <link rel="alternate" href={canonicalUrl.replace('.fr', '.com')} hrefLang="en" />
      
      {/* Favicon et icônes optimisées */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Balises pour les PWA */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="SoloDesign" />
      <meta name="application-name" content="SoloDesign" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Preconnect pour optimiser les performances */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      <link rel="dns-prefetch" href="https://google-analytics.com" />
      <link rel="dns-prefetch" href="https://googletagmanager.com" />
      
      {/* Rich Snippets et Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData)
        }}
      />
    </Head>
  );
};

export default SEO;
