"use client"

import React, { useEffect, useState } from "react"
import { motion, useScroll, useSpring, useInView } from "framer-motion"
import SocialLinks from "../../components/layout/SocialLinks"
import MenuButton from "../../components/layout/MenuButton"
import ScrollArrow from "../../components/layout/ScrollArrow"
import dynamic from 'next/dynamic';
const Cursor = dynamic(() => import('../../components/layout/Cursor'), { ssr: false });
import LogoTitle from "../../components/layout/LogoTitle"

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

  const sections = [
    {
      id: "vision",
      title: "Notre Vision",
      subtitle: "Façonner l'avenir du design",
      content: "Chez Solo Design, nous croyons en la puissance de la simplicité et de l'élégance. Notre approche du design moderne transcende les tendances éphémères pour créer des expériences visuelles durables et impactantes.",
    },
    {
      id: "approche", 
      title: "Notre Approche",
      subtitle: "Fusion de créativité et de fonctionnalité",
      content: "Nous fusionnons créativité et fonctionnalité, en utilisant des lignes épurées, des espaces négatifs stratégiques et une typographie soigneusement sélectionnée pour communiquer avec clarté et style.",
    },
    {
      id: "equipe",
      title: "Notre Équipe", 
      subtitle: "Des innovateurs passionnés",
      content: "Composée de designers passionnés et d'innovateurs créatifs, notre équipe s'efforce constamment de repousser les limites du design tout en restant fidèle à notre philosophie minimaliste.",
    },
    {
      id: "impact",
      title: "Notre Impact",
      subtitle: "Laisser une empreinte durable", 
      content: "Chaque projet que nous entreprenons vise à laisser une empreinte durable dans le monde du design, inspirant et influençant la façon dont les marques communiquent visuellement avec leur audience.",
    },
  ]

  const titleWords = ["Solo", "Design", "Creative", "Interactive"]

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <LogoTitle />
      <SocialLinks />
      <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="relative">
        {/* Titre fixe pour desktop */}
        <div className="hidden lg:block fixed top-1/2 left-16 transform -translate-y-1/2 z-10">
          {titleWords.map((word, index) => (
            <motion.h1
              key={word}
              className={`text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tighter mb-2 transition-colors duration-500 ease-in-out ${
                activeSection === index ? "text-white" : "text-gray-600"
              }`}
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              {word}
            </motion.h1>
          ))}
        </div>

        {/* Sections */}
        {sections.map((section, index) => (
          <AboutSection
            key={section.id}
            index={index}
            section={section}
            titleWords={titleWords}
            onActiveSectionChange={setActiveSection}
          />
        ))}
      </main>

      <ScrollArrow />
      <Cursor />

      {/* Barre de progression */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white mix-blend-difference origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />
    </div>
  )
}

interface AboutSectionProps {
  index: number
  section: {
    id: string
    title: string
    subtitle: string
    content: string
  }
  titleWords: string[]
  onActiveSectionChange: (index: number) => void
}

const AboutSection: React.FC<AboutSectionProps> = ({
  index,
  section,
  titleWords,
  onActiveSectionChange,
}) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { 
    amount: 0.5,
    margin: "-20% 0px -20% 0px"
  })

  useEffect(() => {
    if (isInView) {
      onActiveSectionChange(index)
    }
  }, [isInView, index, onActiveSectionChange])

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      {/* Version mobile */}
      <div className="lg:hidden w-full max-w-lg text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-10%" }}
        >
          {/* Titre mobile */}
          <motion.h1
            className="text-4xl sm:text-5xl font-bold tracking-tighter mb-6 text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {titleWords[index]}
          </motion.h1>

          {/* Contenu mobile */}
          <motion.h2
            className="text-xl sm:text-2xl font-semibold mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {section.title}
          </motion.h2>

          <motion.h3
            className="text-base sm:text-lg text-gray-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {section.subtitle}
          </motion.h3>

          <motion.p
            className="text-sm sm:text-base text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {section.content}
          </motion.p>
        </motion.div>
      </div>

      {/* Version desktop */}
      <div className="hidden lg:flex justify-end w-full">
        <motion.div
          className="w-full max-w-4xl mr-16 xl:mr-20"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-20%" }}
        >
          <motion.h2
            className="text-4xl xl:text-5xl font-semibold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {section.title}
          </motion.h2>

          <motion.h3
            className="text-2xl xl:text-3xl text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {section.subtitle}
          </motion.h3>

          <motion.p
            className="text-lg xl:text-xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {section.content}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutUs

