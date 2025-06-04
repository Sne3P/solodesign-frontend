import React, { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export interface AboutSectionProps {
  index: number
  setActiveSection: (index: number) => void
  title: string
  subtitle: string
  content: string
  totalSections: number
}

const AboutSection: React.FC<AboutSectionProps> = ({
  index,
  setActiveSection,
  title,
  subtitle,
  content,
  totalSections,
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })

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
    [0, 0, 1, 1, isLastSection ? 1 : 0, isLastSection ? 1 : 0]
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
    [50, 50, 0, 0, isLastSection ? 0 : -50, isLastSection ? 0 : -50]
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
    [100, 100, 0, 0, isLastSection ? 0 : -100, isLastSection ? 0 : -100]
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
    [10, 10, 0, 0, isLastSection ? 0 : -10, isLastSection ? 0 : -10]
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
    [0.9, 0.9, 1, 1, isLastSection ? 1 : 0.9, isLastSection ? 1 : 0.9]
  )

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-end mb-32 sm:mb-64">
      <motion.div
        className="w-full sm:max-w-2xl sm:fixed sm:top-1/2 sm:right-8 md:right-16 lg:right-32 transform sm:-translate-y-1/2"
        style={{ opacity, y, x, rotate, scale, willChange: "opacity, transform" }}
        initial={index === 0 ? { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 } : { opacity: 0, y: 50, x: 100, rotate: 10, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 50, damping: 20, duration: 1 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {title}
        </motion.h2>
        <motion.h3
          className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {subtitle}
        </motion.h3>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {content}
        </motion.p>
      </motion.div>
    </section>
  )
}

AboutSection.displayName = "AboutSection"

export default AboutSection
