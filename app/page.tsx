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
import LogoTitle from '../components/layout/LogoTitle'  // Ajout du LogoTitle

const Portfolio = () => {
  const { scrollYProgress } = useScroll()
  const progressionDefilementFluide = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    document.body.classList.add('cursor-none')
    return () => {
      document.body.classList.remove('cursor-none')
    }
  }, [])

  return (
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
  )
}

export default Portfolio
