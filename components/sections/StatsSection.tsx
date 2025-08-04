"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Award, Zap } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "120+",
      label: "Projets Réalisés",
      subtitle: "Avec passion"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "100%",
      label: "Clients Satisfaits",
      subtitle: "Garantie qualité"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      number: "24h",
      label: "Temps de Réponse",
      subtitle: "Maximum"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      number: "10+",
      label: "Années d'Expertise",
      subtitle: "En design"
    }
  ];

  return (
    <section className="py-20 sm:py-24 md:py-28 lg:py-32 xl:py-36 relative">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        
        {/* Titre de section */}
        <motion.div
          className="text-center mb-16 sm:mb-20 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Nos Résultats
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Des chiffres qui parlent de notre engagement et de notre expertise
          </p>
        </motion.div>

        {/* Grille de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15,
                ease: "easeOut"
              }}
            >
              {/* Container de la stat */}
              <motion.div
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 
                           rounded-2xl p-8 sm:p-10 transition-all duration-300
                           group-hover:bg-white/10 group-hover:border-white/20"
                whileHover={{ 
                  scale: 1.05,
                  y: -8
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
              >
                {/* Icône */}
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 
                             bg-white/10 rounded-full mb-6 text-white
                             group-hover:bg-white/20 transition-colors duration-300"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1 
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {stat.icon}
                </motion.div>

                {/* Nombre */}
                <motion.div
                  className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15 + 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                >
                  <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    {stat.number}
                  </span>
                </motion.div>

                {/* Label principal */}
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {stat.label}
                </h3>

                {/* Sous-titre */}
                <p className="text-sm sm:text-base text-gray-400">
                  {stat.subtitle}
                </p>

                {/* Effet de glow au hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                             bg-gradient-to-r from-white/5 via-white/10 to-white/5
                             transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Badge de confiance */}
        <motion.div
          className="flex justify-center mt-16 sm:mt-20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="inline-flex items-center space-x-4 bg-white/5 backdrop-blur-sm 
                          border border-white/10 rounded-full px-8 py-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white font-medium">
              Disponible pour nouveaux projets
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
