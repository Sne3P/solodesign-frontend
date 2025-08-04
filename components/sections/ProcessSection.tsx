"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Palette, CheckCircle, Rocket, HeadphonesIcon } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Brief & Écoute",
      description: "Nous analysons vos besoins, votre cible et vos objectifs pour comprendre parfaitement votre vision.",
      duration: "1-2 jours"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Création & Design",
      description: "Conception créative de solutions sur-mesure qui reflètent votre identité et captivent votre audience.",
      duration: "3-7 jours"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Validation & Ajustements",
      description: "Présentation des créations et affinements selon vos retours pour un résultat parfait.",
      duration: "1-3 jours"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Livraison & Mise en Ligne",
      description: "Finalisation, optimisation et mise en ligne de votre projet avec tous les fichiers sources.",
      duration: "1-2 jours"
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "Suivi & Accompagnement",
      description: "Support technique et conseils pour optimiser vos performances et faire évoluer votre projet.",
      duration: "Continu"
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
              Notre Méthodologie
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Un processus éprouvé pour des résultats exceptionnels
          </p>
        </motion.div>

        {/* Timeline des étapes */}
        <div className="relative">
          {/* Ligne centrale pour desktop */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-white/20 via-white/40 to-white/20" />
          
          {/* Ligne latérale pour mobile */}
          <div className="lg:hidden absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-white/20 via-white/40 to-white/20" />

          <div className="space-y-16 sm:space-y-20 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 lg:gap-16`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
              >
                {/* Numéro d'étape (mobile) */}
                <div className="lg:hidden absolute left-0 top-0 w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-xl font-bold text-white backdrop-blur-sm">
                  {index + 1}
                </div>

                {/* Contenu */}
                <motion.div
                  className={`lg:w-1/2 ml-20 lg:ml-0 ${
                    index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    
                    {/* Icône et durée */}
                    <div className={`flex items-center gap-4 mb-6 ${
                      index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'
                    } justify-start`}>
                      <motion.div
                        className="flex items-center justify-center w-14 h-14 bg-white/10 rounded-full text-white"
                        whileHover={{ 
                          rotate: 360,
                          scale: 1.1 
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        {step.icon}
                      </motion.div>
                      <span className="text-sm font-medium text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                        {step.duration}
                      </span>
                    </div>

                    {/* Titre */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>

                {/* Numéro d'étape central (desktop) */}
                <motion.div
                  className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white/10 border border-white/20 rounded-full items-center justify-center text-xl font-bold text-white backdrop-blur-sm"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2 + 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    backgroundColor: "rgba(255, 255, 255, 0.2)"
                  }}
                >
                  {index + 1}
                </motion.div>

                {/* Espace pour équilibrer (desktop) */}
                <div className="hidden lg:block lg:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16 sm:mt-20 md:mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Prêt à démarrer votre projet ?
          </p>
          <motion.button
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ 
              scale: 1.05,
              y: -3
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
          >
            Discutons de votre projet
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
