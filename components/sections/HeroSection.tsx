import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import TitleAnimation from '../ui/TitleAnimation';

const HeroSection = () => (
  <section id="accueil" className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
    <Parallax speed={-20}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100, damping: 10 }}
        className="mb-16 sm:mb-24 md:mb-32"
      >
        <TitleAnimation texte="Solo Design" />
      </motion.div>
    </Parallax>
    <Parallax speed={-10}>
    <motion.p
        className="text-lg sm:text-xl md:text-2xl text-center max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5, type: "spring", stiffness: 100, damping: 10 }}
      >
        Créations minimalistes, impact maximal.
      </motion.p>
    </Parallax>
  </section>
);

export default HeroSection;
