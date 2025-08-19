"use client"

import React, { useEffect, useRef, useState } from "react"
import { ParallaxProvider } from "react-scroll-parallax"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
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
      <div className="relative min-h-screen bg-black text-white overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <LogoTitle />
        <SocialLinks />
        <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <main className="pt-16 sm:pt-20 md:pt-24 pb-16">
          {/* Titre fixe - responsive selon la taille d'écran */}
          <div className="hidden lg:block fixed top-4 lg:top-1/3 lg:left-12 xl:left-16 z-10">
            {titleWords.map((word, index) => (
              <motion.h1
                key={word}
                className={`text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tighter mb-2 transition-colors duration-1000 ease-in-out ${
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
              titleWords={titleWords}
            />
          ))}
        </main>

        <ScrollArrow />
        <Cursor />

        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-white mix-blend-difference origin-left z-50"
          style={{ scaleX: smoothProgress }}
        />
      </div>
    </ParallaxProvider>
  )
}

interface AboutSectionProps {
  index: number
  setActiveSection: (index: number) => void
  title: string
  subtitle: string
  content: string
  totalSections: number
  titleWords: string[]
}

const AboutSection: React.FC<AboutSectionProps> = ({
  index,
  setActiveSection,
  title,
  subtitle,
  content,
  totalSections,
  titleWords,
}) => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const sectionProgress = useTransform(scrollYProgress, [0, 1], [index / totalSections, (index + 1) / totalSections])

  useEffect(() => {
    const unsubscribe = sectionProgress.onChange((latest) => {
      if (latest > (index + 0.3) / totalSections && latest < (index + 0.7) / totalSections) {
        setActiveSection(index)
      }
    })
    return () => unsubscribe()
  }, [sectionProgress, setActiveSection, index, totalSections])

  const isLastSection = index === totalSections - 1

  const opacity = useTransform(
    sectionProgress,
    [
      index / totalSections,
      (index + 0.2) / totalSections,
      (index + 0.4) / totalSections,
      (index + 0.6) / totalSections,
      (index + 0.8) / totalSections,
      (index + 1) / totalSections,
    ],
    [0, 0, 1, 1, isLastSection ? 1 : 0, isLastSection ? 1 : 0],
  )
  const y = useTransform(
    sectionProgress,
    [
      index / totalSections,
      (index + 0.2) / totalSections,
      (index + 0.4) / totalSections,
      (index + 0.6) / totalSections,
      (index + 0.8) / totalSections,
      (index + 1) / totalSections,
    ],
    [50, 50, 0, 0, isLastSection ? 0 : -50, isLastSection ? 0 : -50],
  )
  const x = useTransform(
    sectionProgress,
    [
      index / totalSections,
      (index + 0.2) / totalSections,
      (index + 0.4) / totalSections,
      (index + 0.6) / totalSections,
      (index + 0.8) / totalSections,
      (index + 1) / totalSections,
    ],
    [100, 100, 0, 0, isLastSection ? 0 : -100, isLastSection ? 0 : -100],
  )
  const rotate = useTransform(
    sectionProgress,
    [
      index / totalSections,
      (index + 0.2) / totalSections,
      (index + 0.4) / totalSections,
      (index + 0.6) / totalSections,
      (index + 0.8) / totalSections,
      (index + 1) / totalSections,
    ],
    [10, 10, 0, 0, isLastSection ? 0 : -10, isLastSection ? 0 : -10],
  )
  const scale = useTransform(
    sectionProgress,
    [
      index / totalSections,
      (index + 0.2) / totalSections,
      (index + 0.4) / totalSections,
      (index + 0.6) / totalSections,
      (index + 0.8) / totalSections,
      (index + 1) / totalSections,
    ],
    [0.9, 0.9, 1, 1, isLastSection ? 1 : 0.9, isLastSection ? 1 : 0.9],
  )

  return (
    <section ref={sectionRef} className="min-h-screen mb-16 sm:mb-20 md:mb-24 lg:mb-32 xl:mb-48 2xl:mb-64">
      {/* Layout Mobile - Titre en haut, contenu en bas */}
      <div className="sm:hidden flex flex-col h-screen">
        {/* Titre mobile en haut */}
        <div className="flex-1 flex items-end justify-center pb-8">
          <motion.div
            className="text-center"
            style={{
              opacity,
              y: useTransform(y, (value) => value * 0.5),
              scale,
              willChange: "opacity, transform",
            }}
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              duration: 1,
              delay: 0.2,
            }}
          >
            <motion.h1
              className={`text-4xl font-bold tracking-tighter mb-2 transition-colors duration-1000 ease-in-out text-white`}
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {titleWords[index]}
            </motion.h1>
          </motion.div>
        </div>

        {/* Contenu mobile en bas */}
        <div className="flex-1 flex items-start justify-center pt-8 px-6">
          <motion.div
            className="w-full max-w-md text-center"
            style={{
              opacity,
              y: useTransform(y, (value) => value * -0.5),
              scale,
              willChange: "opacity, transform",
            }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              duration: 1,
              delay: 0.4,
            }}
          >
            <motion.h2
              className="text-xl font-semibold mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {title}
            </motion.h2>
            <motion.h3
              className="text-base text-gray-400 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {subtitle}
            </motion.h3>
            <motion.p
              className="text-sm text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {content}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Layout Tablette - Version hybride centrée */}
      <div className="hidden sm:flex lg:hidden flex-col items-center justify-center h-screen px-8 md:px-12">
        {/* Titre tablette centré en haut */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          style={{
            opacity,
            y: useTransform(y, (value) => value * 0.3),
            scale,
            willChange: "opacity, transform",
          }}
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            duration: 1,
            delay: 0.2,
          }}
        >
          <motion.h1
            className={`text-5xl md:text-6xl font-bold tracking-tighter mb-4 transition-colors duration-1000 ease-in-out text-white`}
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {titleWords[index]}
          </motion.h1>
        </motion.div>

        {/* Contenu tablette centré */}
        <motion.div
          className="w-full max-w-2xl md:max-w-3xl text-center"
          style={{
            opacity,
            y: useTransform(y, (value) => value * -0.3),
            scale,
            willChange: "opacity, transform",
          }}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            duration: 1,
            delay: 0.4,
          }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {title}
          </motion.h2>
          <motion.h3
            className="text-lg md:text-xl text-gray-400 mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {subtitle}
          </motion.h3>
          <motion.p
            className="text-base md:text-lg text-gray-300 leading-relaxed max-w-xl md:max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {content}
          </motion.p>
        </motion.div>
      </div>

      {/* Layout Desktop - Original côte à côte (lg et plus) */}
      <div className="hidden lg:flex items-center justify-end h-screen">
        <motion.div
          className="w-full lg:max-w-4xl xl:max-w-5xl lg:fixed lg:top-1/2 lg:right-12 xl:right-16 transform lg:-translate-y-1/2"
          style={{
            opacity,
            y,
            x,
            rotate,
            scale,
            willChange: "opacity, transform",
          }}
          initial={
            index === 0
              ? { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }
              : { opacity: 0, y: 50, x: 100, rotate: 10, scale: 0.9 }
          }
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            duration: 1,
          }}
        >
          <motion.h2
            className="text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4 lg:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {title}
          </motion.h2>
          <motion.h3
            className="text-xl lg:text-2xl xl:text-3xl text-gray-400 mb-6 lg:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {subtitle}
          </motion.h3>
          <motion.p
            className="text-lg lg:text-xl xl:text-2xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {content}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutUs

