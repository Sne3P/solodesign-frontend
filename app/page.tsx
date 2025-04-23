'use client'

import React, { useState, useEffect } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import { useScroll, useSpring, motion } from 'framer-motion'
import SocialLinks from '../components/layout/SocialLinks'
import MenuButton from '../components/layout/MenuButton'
import ScrollArrow from '../components/layout/ScrollArrow'
import Cursor from '../components/layout/Cursor'
import HeroSection from '../components/sections/HeroSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import ServicesSection from '../components/sections/ServicesSection'
import AboutSection from '../components/sections/AboutSection'
import ContactSection from '../components/sections/ContactSection'
import Footer from '../components/sections/Footer'
import LogoTitle from '../components/layout/LogoTitle'  // Ajout du LogoTitle

const Portfolio = () => {
  const [menuOpen, setMenuOpen] = useState(false)
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
        <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* Sections */}
        <HeroSection />
        <ProjectsSection />
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

        {/* Animation de fond */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '0px -30px']
          }}
          transition={{
            backgroundPosition: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 10,
              ease: "linear"
            }
          }}
        />
      </div>
    </ParallaxProvider>
  )
}

export default Portfolio
