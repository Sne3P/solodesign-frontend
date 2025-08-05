"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { Home, ServerCrash, RefreshCw, Wrench, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LogoTitle from '@/components/layout/LogoTitle';
import SocialLinks from '@/components/layout/SocialLinks';
import MenuButton from '@/components/layout/MenuButton';
import FooterMinimal from '@/components/sections/FooterMinimal';
import BackgroundPattern from '@/components/layout/BackgroundPattern';
import Cursor from '@/components/layout/Cursor';

const InternalServerError = () => {
  const router = useRouter();
  const [sparks, setSparks] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // Génération d'étincelles animées
    const generateSparks = () => {
      const newSparks = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 2 + 1,
      }));
      setSparks(newSparks);
    };

    generateSparks();
    const interval = setInterval(generateSparks, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    }
  };

  const errorVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
      }
    }
  };

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-black relative overflow-hidden">
        <BackgroundPattern />
        <LogoTitle />
        <SocialLinks />
        <MenuButton />
        <Cursor />

        {/* Animated Sparks */}
        <AnimatePresence>
          {sparks.map((spark) => (
            <motion.div
              key={spark.id}
              className="fixed pointer-events-none bg-red-400 rounded-full opacity-60"
              style={{
                width: `${spark.size}px`,
                height: `${spark.size}px`,
                left: `${spark.x}%`,
                top: `${spark.y}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [-30, 30],
                x: [0, Math.random() * 40 - 20],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: spark.duration,
                ease: "easeOut",
              }}
            />
          ))}
        </AnimatePresence>

        {/* Circuit Pattern */}
        <motion.div
          className="fixed inset-0 opacity-5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #000 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, #000 1px, transparent 1px),
              linear-gradient(45deg, transparent 40%, #000 41%, #000 42%, transparent 43%)
            `,
            backgroundSize: "60px 60px, 30px 30px, 40px 40px",
          }}
        />

        <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <Parallax speed={-2}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center max-w-4xl mx-auto"
            >
              {/* Error Number */}
              <motion.div
                variants={errorVariants}
                className="mb-8 relative"
              >
                <motion.h1
                  className="text-[10rem] md:text-[14rem] lg:text-[18rem] font-black leading-none"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(239, 68, 68, 0.5)",
                      "0 0 40px rgba(239, 68, 68, 0.8)",
                      "0 0 20px rgba(239, 68, 68, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    background: "linear-gradient(45deg, #ef4444, #dc2626, #b91c1c)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  500
                </motion.h1>

                {/* Warning Icons */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <AlertCircle className="w-16 h-16 text-red-500 opacity-20" />
                </motion.div>
              </motion.div>

              {/* Server Icon */}
              <motion.div
                variants={itemVariants}
                className="mb-8 flex justify-center"
              >
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center border-2 border-red-200"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      borderColor: "#ef4444"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 15, -15, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ServerCrash className="w-16 h-16 text-red-600" />
                    </motion.div>
                  </motion.div>

                  {/* Error indicators */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.6, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="text-white text-xs font-bold">!</span>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Title */}
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              >
                <motion.span
                  className="inline-block"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  Erreur
                </motion.span>{" "}
                <motion.span
                  className="inline-block bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05, rotate: -1 }}
                >
                  Serveur
                </motion.span>
              </motion.h2>

              {/* Description */}
              <motion.div
                variants={itemVariants}
                className="mb-12"
              >
                <motion.p
                  className="text-xl md:text-2xl text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Houston, nous avons un problème ! Nos serveurs rencontrent une difficulté technique.
                </motion.p>
                
                <motion.div
                  className="flex items-center justify-center space-x-2 text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <Wrench className="w-4 h-4" />
                  <span>Notre équipe technique est sur le coup...</span>
                </motion.div>
              </motion.div>

              {/* Status Indicators */}
              <motion.div
                variants={itemVariants}
                className="mb-12 flex justify-center space-x-8"
              >
                {[
                  { label: "Serveur Web", status: "error" },
                  { label: "Base de données", status: "warning" },
                  { label: "API", status: "checking" }
                ].map((service, index) => (
                  <motion.div
                    key={service.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                  >
                    <motion.div
                      className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                        service.status === 'error' ? 'bg-red-500' :
                        service.status === 'warning' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 1 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="text-xs text-gray-500">{service.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.button
                  onClick={() => window.location.reload()}
                  className="group relative px-8 py-4 bg-red-600 text-white rounded-full font-semibold overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center space-x-2 group-hover:text-red-600 transition-colors">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw className="w-5 h-5" />
                    </motion.div>
                    <span>Réessayer</span>
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => router.push('/')}
                  className="group px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-black hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center space-x-2">
                    <Home className="w-5 h-5" />
                    <span>Retour à l&apos;accueil</span>
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => router.push('/contact')}
                  className="group px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Signaler le problème</span>
                  </span>
                </motion.button>
              </motion.div>

              {/* Error Code */}
              <motion.div
                variants={itemVariants}
                className="mt-16 p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 rounded-2xl"
              >
                <h3 className="text-lg font-semibold text-red-800 mb-2">Code d&apos;erreur</h3>
                <p className="text-red-600 font-mono text-sm">
                  ERROR_500_INTERNAL_SERVER_ERROR
                </p>
                <p className="text-red-500 text-sm mt-2">
                  Si le problème persiste, veuillez contacter notre support technique.
                </p>
              </motion.div>
            </motion.div>
          </Parallax>
        </main>

        <FooterMinimal />
      </div>
    </ParallaxProvider>
  );
};

export default InternalServerError;
