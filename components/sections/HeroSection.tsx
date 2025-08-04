import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Clock } from 'lucide-react';
import TitleAnimation from '../ui/TitleAnimation';

const HeroSection = () => (
  <section id="accueil" className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative">
    
    {/* Badge d'expertise */}
    <motion.div
      className="absolute top-24 sm:top-32 left-1/2 transform -translate-x-1/2"
      initial={{ opacity: 0, y: -20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
        <Sparkles className="w-5 h-5 text-yellow-400" />
        <span className="text-white font-medium text-sm sm:text-base">10+ ans d&apos;expertise créative</span>
      </div>
    </motion.div>

    {/* Titre principal */}
    <Parallax speed={-20}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100, damping: 10 }}
        className="mb-8 sm:mb-12"
      >
        <TitleAnimation texte="Solo Design" />
      </motion.div>
    </Parallax>

    {/* Sous-titre principal */}
    <Parallax speed={-10}>
      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-center max-w-4xl mx-auto mb-6 leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
          Créations minimalistes, impact maximal.
        </span>
      </motion.h2>
    </Parallax>

    {/* Description étendue */}
    <motion.p
      className="text-base sm:text-lg md:text-xl text-center max-w-2xl mx-auto mb-10 text-gray-300 leading-relaxed"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      Nous transformons vos idées en expériences digitales exceptionnelles. 
      Design, développement et stratégie pour faire briller votre marque.
    </motion.p>

    {/* Call-to-actions */}
    <motion.div
      className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.8 }}
    >
      {/* Bouton principal */}
      <motion.button
        className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-200 group"
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
        <span>Découvrir notre expertise</span>
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </motion.button>

      {/* Bouton secondaire */}
      <motion.button
        className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-200 group"
        whileHover={{ 
          scale: 1.02,
          borderColor: "rgba(255, 255, 255, 0.4)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Voir nos projets</span>
      </motion.button>
    </motion.div>

    {/* Badge de réactivité */}
    <motion.div
      className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 2.1 }}
    >
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <Clock className="w-4 h-4 text-green-400" />
      </div>
      <span className="text-white text-sm font-medium">
        Réponse garantie en 24h
      </span>
    </motion.div>

    {/* Stats rapides */}
    <motion.div
      className="absolute bottom-20 sm:bottom-32 left-1/2 transform -translate-x-1/2 w-full max-w-4xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.4 }}
    >
      <div className="grid grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">120+</div>
          <div className="text-xs sm:text-sm text-gray-400">Projets réalisés</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">100%</div>
          <div className="text-xs sm:text-sm text-gray-400">Clients satisfaits</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">4.9/5</div>
          <div className="text-xs sm:text-sm text-gray-400">Note moyenne</div>
        </div>
      </div>
    </motion.div>
  </section>
);

export default HeroSection;
