'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Timer } from 'lucide-react'
import { ActionButton, Badge } from '@/components/ui'

const HeroSection = () => {
  // Les polices sont gérées par next/font; pas besoin de preload manuel

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
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
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            {/* Premium Badge */}
            <Badge
              variant="premium"
              size="lg"
              icon={Sparkles}
              className="mb-8"
            >
              Design Premium • Développement Expert
            </Badge>

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
                      transition: { 
                        type: "spring",
                        stiffness: 800,
                        damping: 10,
                        duration: 0.12
                      }
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
              <ActionButton
                variant="primary"
                size="lg"
                icon={ArrowRight}
                onClick={() => {
                  const projectsSection = document.getElementById('projects-section');
                  projectsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Découvrir
              </ActionButton>

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
          whileHover={{ 
            borderColor: 'rgba(255,255,255,0.8)',
            transition: { duration: 0.12 }
          }}
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
