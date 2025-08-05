'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Timer } from 'lucide-react'
import { Parallax } from 'react-scroll-parallax';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Geometric background elements */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03) 0%, transparent 50%)`
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 8}%`
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Parallax speed={-20}>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Premium Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Design Premium • Développement Expert</span>
            </motion.div>

            {/* Main Title avec animation SOLODESIGN */}
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="block text-white">
                {"SOLODESIGN".split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block text-white"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + index * 0.04,
                      type: "spring",
                      stiffness: 140,
                      damping: 18
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.12,
                      transition: { duration: 0.18 }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              Design moderne • Développement sur-mesure
            </motion.p>

            {/* Description */}
            <motion.p 
              className="text-base text-gray-400 mb-8 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              Transformez vos idées en expériences digitales exceptionnelles avec notre expertise.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.0 }}
            >
              <motion.button
                className="relative overflow-hidden bg-white text-black px-6 py-3 rounded-full font-bold text-base flex items-center space-x-2 group shadow-lg"
                whileHover={{ 
                  scale: 1.04,
                  transition: { duration: 0.18 }
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-200">
                  Découvrir
                </span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:text-white transition-colors duration-200" />
              </motion.button>

              {/* Response Time Badge */}
              <motion.div
                className="flex items-center space-x-2 text-gray-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Timer className="w-4 h-4" />
                <span className="text-xs font-medium">Réponse sous 24h</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </Parallax>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          whileHover={{ borderColor: 'rgba(255,255,255,0.6)' }}
        >
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
