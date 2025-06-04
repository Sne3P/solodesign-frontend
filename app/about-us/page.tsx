"use client"

import React, { useEffect, useState } from "react"
import { ParallaxProvider } from "react-scroll-parallax"
import { motion, useScroll, useSpring } from "framer-motion"
import SocialLinks from "../../components/layout/SocialLinks"
import MenuButton from "../../components/layout/MenuButton"
import ScrollArrow from "../../components/layout/ScrollArrow"
import Cursor from "../../components/layout/Cursor"
import Footer from "../../components/sections/Footer"
import LogoTitle from "../../components/layout/LogoTitle"
import { AboutSection } from "../../components/pages/about-us"

const AboutUs = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    document.body.classList.add("cursor-none")
    return () => {
      document.body.classList.remove("cursor-none")
    }
  }, [])

  const titleWords = ["Solo", "Design", "Creative", "Interactive"]

  const sections = [
    {
      title: "Notre Vision",
      subtitle: "Façonner l'avenir du design",
      content:
        "Chez Solo Design, nous croyons en la puissance de la simplicité et de l'élégance. Notre approche du design moderne transcende les tendances éphémères pour créer des expériences visuelles durables et impactantes.",
    },
    {
      title: "Notre Approche",
      subtitle: "Fusion de créativité et de fonctionnalité",
      content:
        "Nous fusionnons créativité et fonctionnalité, en utilisant des lignes épurées, des espaces négatifs stratégiques et une typographie soigneusement sélectionnée pour communiquer avec clarté et style.",
    },
    {
      title: "Notre Équipe",
      subtitle: "Des innovateurs passionnés",
      content:
        "Composée de designers passionnés et d'innovateurs créatifs, notre équipe s'efforce constamment de repousser les limites du design tout en restant fidèle à notre philosophie minimaliste.",
    },
    {
      title: "Notre Impact",
      subtitle: "Laisser une empreinte durable",
      content:
        "Chaque projet que nous entreprenons vise à laisser une empreinte durable dans le monde du design, inspirant et influençant la façon dont les marques communiquent visuellement avec leur audience.",
    },
  ]

  return (
    <ParallaxProvider>
      <div className="relative min-h-screen bg-black text-white overflow-hidden px-4 sm:px-8 md:px-16 lg:px-32">
        <LogoTitle />
        <SocialLinks />
        <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <main className="pt-24 pb-16">
          <div className="fixed top-4 left-4 sm:top-1/3 sm:left-8 md:left-16 lg:left-32 z-10">
            {titleWords.map((word, index) => (
              <motion.h1
                key={word}
                className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter mb-1 sm:mb-2 transition-colors duration-1000 ease-in-out ${
                  activeSection === index ? "text-white" : "text-gray-500"
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
              >
                {word}
              </motion.h1>
            ))}
          </div>

          {sections.map((section, index) => (
            <AboutSection
              key={index}
              index={index}
              setActiveSection={setActiveSection}
              {...section}
              totalSections={sections.length}
            />
          ))}
        </main>

        <Footer />
        <ScrollArrow />
        <Cursor />

        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-white mix-blend-difference origin-left"
          style={{ scaleX: smoothProgress }}
        />
      </div>
    </ParallaxProvider>
  )
}


export default AboutUs

