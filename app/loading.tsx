"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { Home, RefreshCw, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LogoTitle from '@/components/layout/LogoTitle';
import SocialLinks from '@/components/layout/SocialLinks';
import MenuButton from '@/components/layout/MenuButton';
import FooterMinimal from '@/components/sections/FooterMinimal';
import BackgroundPattern from '@/components/layout/BackgroundPattern';
import Cursor from '@/components/layout/Cursor';

const Loading = () => {
  const router = useRouter();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Chargement...");
  const [dots, setDots] = useState("");

  useEffect(() => {
    const loadingSteps = [
      "Initialisation...",
      "Connexion au serveur...",
      "Chargement des ressources...",
      "Optimisation...",
      "Finalisation...",
      "Presque prêt..."
    ];

    // Animation de progression
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 800);

    // Animation des points
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);

    // Changement du texte de chargement
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingSteps.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingSteps.length;
        return loadingSteps[nextIndex];
      });
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
      clearInterval(textInterval);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    }
  };

  const pulseVariants = {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
  };

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-black relative overflow-hidden">
        <BackgroundPattern />
        <LogoTitle />
        <SocialLinks />
        <MenuButton />
        <Cursor />

        {/* Animated Background Elements */}
        <motion.div
          className="fixed inset-0 opacity-5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, #000 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, #000 1px, transparent 1px),
              radial-gradient(circle at 40% 40%, #000 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px, 150px 150px, 80px 80px",
          }}
        />

        <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <Parallax speed={-2}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center max-w-2xl mx-auto"
            >
              {/* Main Loading Icon */}
              <motion.div
                variants={itemVariants}
                className="mb-12 flex justify-center"
              >
                <motion.div
                  className="relative w-32 h-32"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* Outer Ring */}
                  <motion.div
                    className="absolute inset-0 border-4 border-gray-200 rounded-full"
                    animate={{
                      scale: pulseVariants.scale,
                      opacity: pulseVariants.opacity,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Progress Ring */}
                  <motion.div
                    className="absolute inset-2 border-4 border-transparent border-t-black rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  {/* Inner Ring */}
                  <motion.div
                    className="absolute inset-4 border-2 border-gray-400 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  {/* Center Dot */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-8 h-8 bg-black rounded-full" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Loading Text */}
              <motion.div
                variants={itemVariants}
                className="mb-8"
              >
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-4"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {loadingText}
                  <motion.span
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {dots}
                  </motion.span>
                </motion.h1>
                
                <motion.p
                  className="text-xl text-gray-600"
                  variants={itemVariants}
                >
                  Préparation de votre expérience Solo Design
                </motion.p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                variants={itemVariants}
                className="mb-12"
              >
                <div className="w-full max-w-md mx-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Progression</span>
                    <span className="text-sm font-semibold text-gray-700">
                      {Math.round(loadingProgress)}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-gray-600 to-black rounded-full relative"
                      initial={{ width: "0%" }}
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                        animate={{ x: [-100, 100] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{ width: "100px" }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Loading Steps Indicators */}
              <motion.div
                variants={itemVariants}
                className="mb-12 flex justify-center space-x-2"
              >
                {Array.from({ length: 6 }, (_, i) => (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < Math.floor(loadingProgress / 16.6) 
                        ? 'bg-black' 
                        : 'bg-gray-300'
                    }`}
                    animate={{
                      scale: i === Math.floor(loadingProgress / 16.6) 
                        ? [1, 1.3, 1] 
                        : 1,
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: i === Math.floor(loadingProgress / 16.6) 
                        ? Infinity 
                        : 0,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
                  onClick={() => router.push('/')}
                  className="group px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-black hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center space-x-2">
                    <Home className="w-4 h-4" />
                    <span>Aller à l&apos;accueil</span>
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => window.location.reload()}
                  className="group px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </motion.div>
                    <span>Actualiser</span>
                  </span>
                </motion.button>
              </motion.div>

              {/* Status Message */}
              <motion.div
                variants={itemVariants}
                className="mt-12 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl"
              >
                <div className="flex items-center justify-center space-x-2 text-blue-800">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">
                    Temps de chargement estimé : quelques secondes
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </Parallax>
        </main>

        <FooterMinimal />
      </div>
    </ParallaxProvider>
  );
};

export default Loading;
