'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Trophy, Clock, Star } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "150+",
      label: "Clients Satisfaits",
      description: "Projets réalisés avec succès"
    },
    {
      icon: Trophy,
      number: "95%",
      label: "Taux de Satisfaction",
      description: "Clients qui recommandent"
    },
    {
      icon: Clock,
      number: "48h",
      label: "Délai Moyen",
      description: "De la conception à la livraison"
    },
    {
      icon: Star,
      number: "5★",
      label: "Note Moyenne",
      description: "Évaluations clients"
    }
  ]

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            
            return (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Icon */}
                <motion.div
                  className="mx-auto mb-4 w-16 h-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center transition-colors duration-300"
                >
                  <Icon className="w-8 h-8 text-white transition-colors duration-300" />
                </motion.div>

                {/* Number */}
                <motion.div
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.05 + 0.1,
                    type: "spring",
                    stiffness: 120,
                    damping: 15
                  }}
                >
                  <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    {stat.number}
                  </span>
                </motion.div>

                {/* Label */}
                <motion.h3 
                  className="text-lg sm:text-xl font-semibold text-white mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.05 + 0.2
                  }}
                >
                  {stat.label}
                </motion.h3>

                {/* Description */}
                <motion.p 
                  className="text-sm sm:text-base text-gray-400 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.05 + 0.3
                  }}
                >
                  {stat.description}
                </motion.p>

                {/* Hover line effect */}
                <div className="h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mt-4 mx-auto opacity-0" />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Floating accent dots */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-10"
          style={{
            left: `${15 + i * 20}%`,
            top: `${20 + i * 15}%`
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </section>
  )
}

export default StatsSection
