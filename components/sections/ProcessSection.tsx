"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Palette, CheckCircle, Rocket, HeadphonesIcon } from 'lucide-react';
import ActionButton from '../ui/ActionButton';

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
          {/* Ligne centrale pour desktop - parfaitement centrée */}
          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-white/20 via-white/40 to-white/20" style={{ transform: 'translateX(-50%)' }} />
          
          {/* Ligne latérale pour mobile - alignée avec le cercle */}
          <div className="lg:hidden absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-white/20 via-white/40 to-white/20" />

          <div className="space-y-24 lg:space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 120,
                  damping: 20
                }}
              >
                {/* Layout desktop */}
                <div className="hidden lg:block">
                  {/* Contenu à gauche ou à droite */}
                  <div className={`flex w-full ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}>
                    <motion.div
                      className="w-5/12"
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        
                        {/* Icône et durée */}
                        <div className={`flex items-center gap-4 mb-6 ${
                          index % 2 === 0 ? 'justify-start' : 'justify-end'
                        }`}>
                          <motion.div
                            className="flex items-center justify-center w-14 h-14 bg-white/10 rounded-xl text-white"
                            whileHover={{ 
                              rotate: 360,
                              scale: 1.1 
                            }}
                            transition={{ duration: 0.4 }}
                          >
                            {step.icon}
                          </motion.div>
                          <span className="text-sm font-medium text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                            {step.duration}
                          </span>
                        </div>

                        {/* Titre */}
                        <h3 className={`text-2xl font-bold text-white mb-4 ${
                          index % 2 === 0 ? 'text-left' : 'text-right'
                        }`}>
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className={`text-gray-300 leading-relaxed ${
                          index % 2 === 0 ? 'text-left' : 'text-right'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Numéro central - Parfaitement centré sur la ligne */}
                  <motion.div
                    className="absolute w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-xl font-bold shadow-lg z-10"
                    style={{
                      left: 'calc(50% - 32px)',
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 5
                    }}
                  >
                    {index + 1}
                  </motion.div>
                </div>

                {/* Layout mobile */}
                <div className="lg:hidden relative flex items-start gap-4 pl-4">
                  {/* Numéro mobile - parfaitement aligné avec la ligne */}
                  <motion.div
                    className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-xl font-bold shadow-lg flex-shrink-0 relative z-10"
                    style={{
                      marginLeft: '-2rem'
                    }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 5
                    }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Contenu mobile */}
                  <motion.div
                    className="flex-1 ml-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                      
                      {/* Icône et durée */}
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl text-white"
                          whileHover={{ 
                            rotate: 360,
                            scale: 1.1 
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          {step.icon}
                        </motion.div>
                        <span className="text-sm font-medium text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                          {step.duration}
                        </span>
                      </div>

                      {/* Titre */}
                      <h3 className="text-xl font-bold text-white mb-3">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-lg text-gray-300 mb-8">
            Prêt à démarrer votre projet ? • Devis gratuit • Prototype offert
          </p>
          <div className="flex justify-center">
            <ActionButton
              variant="primary"
              size="lg"
              onClick={() => window.location.href = '/contact'}
            >
              Discutons de votre projet
            </ActionButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
