'use client'

import React, { useEffect } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import { useScroll, useSpring, motion } from 'framer-motion'
import SocialLinks from '../components/layout/SocialLinks'
import MenuButton from '../components/layout/MenuButton'
import ScrollArrow from '../components/layout/ScrollArrow'
import BackgroundPattern from '../components/layout/BackgroundPattern'
import dynamic from 'next/dynamic';
const Cursor = dynamic(() => import('../components/layout/Cursor'), { ssr: false });
import HeroSection from '../components/sections/HeroSection'
import StatsSection from '../components/sections/StatsSection'
import ExpertiseSection from '../components/sections/ExpertiseSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import ProcessSection from '../components/sections/ProcessSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import ServicesSection from '../components/sections/ServicesSection'
import AboutSection from '../components/sections/AboutSection'
import ContactSection from '../components/sections/ContactSection'
import Footer from '../components/sections/Footer'
import LogoTitle from '../components/layout/LogoTitle'
import SEO from '../components/seo/SEO'

const Portfolio = () => {
  const { scrollYProgress } = useScroll()
  const progressionDefilementFluide = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Données structurées ultra-complètes pour la page d'accueil
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://solodesign.fr/#website",
        "name": "SoloDesign - Expert en Création de Sites Web & Solutions Digitales",
        "alternateName": "SoloDesign",
        "url": "https://solodesign.fr",
        "description": "Expert français en création de sites web, applications mobiles, ERP, CRM, e-commerce et solutions digitales innovantes. Design moderne, développement sur mesure.",
        "inLanguage": "fr-FR",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://solodesign.fr/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://solodesign.fr/#organization",
        "name": "SoloDesign",
        "url": "https://solodesign.fr",
        "logo": {
          "@type": "ImageObject",
          "url": "https://solodesign.fr/logo-solodesign.png",
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
        "serviceArea": {
          "@type": "Country",
          "name": "France"
        },
        "knowsAbout": [
          "Création de sites web",
          "Développement d'applications",
          "ERP sur mesure",
          "CRM personnalisé",
          "E-commerce",
          "Solutions digitales",
          "Design UI/UX",
          "Référencement SEO",
          "React",
          "Next.js",
          "TypeScript",
          "Node.js"
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://solodesign.fr/#webpage",
        "url": "https://solodesign.fr",
        "name": "Accueil - SoloDesign Expert Web",
        "isPartOf": {
          "@id": "https://solodesign.fr/#website"
        },
        "about": {
          "@id": "https://solodesign.fr/#organization"
        },
        "description": "Page d'accueil de SoloDesign, expert en création de sites web et solutions digitales",
        "breadcrumb": {
          "@id": "https://solodesign.fr/#breadcrumb"
        },
        "inLanguage": "fr-FR"
      }
    ]
  };

  useEffect(() => {
    document.body.classList.add('cursor-none')
    return () => {
      document.body.classList.remove('cursor-none')
    }
  }, [])

  return (
    <>
      <SEO
        title="SoloDesign - Expert Création Site Web, ERP, CRM & Solutions Digitales France"
        description="🚀 Expert français en création de sites web modernes, applications mobiles, ERP sur mesure, CRM personnalisé, e-commerce et solutions digitales innovantes. Design UI/UX professionnel, développement React/Next.js, référencement SEO. Transformez votre vision en réalité digitale avec SoloDesign ⭐"
        keywords="création site web France, développement web professionnel, application mobile sur mesure, design UI UX moderne, ERP sur mesure France, CRM personnalisé entreprise, e-commerce boutique en ligne, solutions digitales innovantes, développement React Next.js, référencement SEO professionnel, webdesign responsive, Progressive Web App PWA, API REST développement, base de données optimisation, hébergement web maintenance, refonte site web, landing page conversion, portfolio professionnel, blog entreprise, plateforme web, consultant digital France, freelance développeur expert, agence digitale, transformation digitale PME, digitalisation processus, automatisation métier, intégration systèmes, migration données cloud, audit technique SEO, optimisation performances web, sécurité applications RGPD, accessibilité web WCAG, TypeScript JavaScript, Node.js backend, Tailwind CSS design, Framer Motion animations, MongoDB PostgreSQL, AWS Azure déploiement, Git versioning, CI/CD DevOps, tests automatisés, documentation technique, formation développement"
        url="https://solodesign.fr"
        image="/og-solodesign-accueil-expert-web.jpg"
        type="website"
        structuredData={homeStructuredData}
        category="Développement Web & Solutions Digitales"
      />
      <ParallaxProvider>
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Logo en haut à gauche */}
        <LogoTitle />

        {/* Liens sociaux */}
        <SocialLinks />

        {/* Bouton de menu */}
        <MenuButton />

        {/* Sections */}
        <HeroSection />
        <StatsSection />
        <ExpertiseSection />
        <ProjectsSection />
        <ProcessSection />
        <TestimonialsSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />

        {/* Pied de page */}
        <Footer />

        {/* Flèche de défilement */}
        <ScrollArrow />

        {/* Curseur personnalisé */}
        <Cursor />

        {/* Progression de défilement */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-white mix-blend-difference origin-left"
          style={{ scaleX: progressionDefilementFluide }}
        />

        {/* Animation de fond avec effet magnétique optimisé */}
        <BackgroundPattern magneticEffect={true} opacity={0.2} />
      </div>
    </ParallaxProvider>
    </>
  )
}

export default Portfolio
