"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { Home, Shield, Lock, Key, AlertOctagon, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LogoTitle from '@/components/layout/LogoTitle';
import SocialLinks from '@/components/layout/SocialLinks';
import MenuButton from '@/components/layout/MenuButton';
import FooterMinimal from '@/components/sections/FooterMinimal';
import Cursor from '@/components/layout/Cursor';

const Forbidden = () => {
  const router = useRouter();
  const [securityLevel, setSecurityLevel] = useState(0);
  const [scanLines, setScanLines] = useState([]);

  useEffect(() => {
    // Animation de niveau de sécurité
    const interval = setInterval(() => {
      setSecurityLevel(prev => (prev + 1) % 4);
    }, 1500);

    // Génération de lignes de scan
    const generateScanLines = () => {
      const lines = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        height: Math.random() * 3 + 1,
        top: Math.random() * 100,
        duration: Math.random() * 2 + 1,
      }));
      setScanLines(lines);
    };

    generateScanLines();
    const scanInterval = setInterval(generateScanLines, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(scanInterval);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      }
    }
  };

  const securityVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -90 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      }
    }
  };

  const securityColors = [
    "from-yellow-400 to-orange-500",
    "from-orange-500 to-red-500", 
    "from-red-500 to-red-700",
    "from-red-700 to-red-900"
  ];

  const securityTexts = [
    "Accès vérifié...",
    "Autorisation requise...",
    "Accès refusé !",
    "Sécurité maximale"
  ];

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50" />
        <LogoTitle />
        <SocialLinks />
        <MenuButton />
        <Cursor />

        {/* Scan Lines */}
        <AnimatePresence>
          {scanLines.map((line) => (
            <motion.div
              key={line.id}
              className="fixed w-full bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"
              style={{
                height: `${line.height}px`,
                top: `${line.top}%`,
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              exit={{ opacity: 0 }}
              transition={{
                duration: line.duration,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          ))}
        </AnimatePresence>

        {/* Digital Rain Effect */}
        <motion.div
          className="fixed inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "0% 100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 70%, #00ff00 71%, #00ff00 72%, transparent 73%),
              linear-gradient(0deg, transparent 70%, #ff0000 71%, #ff0000 72%, transparent 73%)
            `,
            backgroundSize: "20px 40px, 40px 20px",
          }}
        />

        <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <Parallax speed={-1}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center max-w-4xl mx-auto"
            >
              {/* Error Number */}
              <motion.div
                variants={securityVariants}
                className="mb-8 relative"
              >
                <motion.h1
                  className="text-[10rem] md:text-[14rem] lg:text-[18rem] font-black leading-none"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(239, 68, 68, 0.8)",
                      "0 0 40px rgba(239, 68, 68, 1)",
                      "0 0 60px rgba(239, 68, 68, 0.8)",
                      "0 0 20px rgba(239, 68, 68, 0.8)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    background: "linear-gradient(45deg, #ff0000, #ff4444, #ff6666)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  403
                </motion.h1>

                {/* Security Grid */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="grid grid-cols-6 gap-2 h-full">
                    {Array.from({ length: 24 }, (_, i) => (
                      <motion.div
                        key={i}
                        className="bg-red-500 rounded"
                        animate={{
                          opacity: [0.1, 0.5, 0.1],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Security Icon */}
              <motion.div
                variants={itemVariants}
                className="mb-8 flex justify-center"
              >
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className={`w-32 h-32 bg-gradient-to-br ${securityColors[securityLevel]} rounded-2xl flex items-center justify-center border-2 border-red-400 shadow-xl`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 10,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Shield className="w-16 h-16 text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Lock Icons */}
                  <motion.div
                    className="absolute -top-3 -right-3 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Lock className="w-4 h-4 text-white" />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-3 -left-3 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    <Key className="w-4 h-4 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Security Status */}
              <motion.div
                variants={itemVariants}
                className="mb-6"
              >
                <motion.div
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-red-900 border border-red-700 rounded-full"
                  animate={{
                    borderColor: [
                      "rgb(185, 28, 28)",
                      "rgb(239, 68, 68)",
                      "rgb(185, 28, 28)"
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <AlertOctagon className="w-5 h-5 text-red-400" />
                  <span className="text-red-300 font-mono text-sm">
                    {securityTexts[securityLevel]}
                  </span>
                </motion.div>
              </motion.div>

              {/* Title */}
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              >
                <motion.span
                  className="inline-block text-red-400"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  Accès
                </motion.span>{" "}
                <motion.span
                  className="inline-block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05, rotate: -1 }}
                >
                  Interdit
                </motion.span>
              </motion.h2>

              {/* Description */}
              <motion.div
                variants={itemVariants}
                className="mb-12"
              >
                <motion.p
                  className="text-xl md:text-2xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Vous n&apos;avez pas les autorisations nécessaires pour accéder à cette zone sécurisée.
                </motion.p>
                
                <motion.div
                  className="flex items-center justify-center space-x-2 text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <Eye className="w-4 h-4" />
                  <span>Cette tentative d&apos;accès a été enregistrée</span>
                </motion.div>
              </motion.div>

              {/* Security Meters */}
              <motion.div
                variants={itemVariants}
                className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[
                  { label: "Niveau de sécurité", value: 95, color: "red" },
                  { label: "Autorisation", value: 0, color: "gray" },
                  { label: "Accès refusé", value: 100, color: "red" }
                ].map((meter, index) => (
                  <motion.div
                    key={meter.label}
                    className="text-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                  >
                    <h4 className="text-sm text-gray-400 mb-2">{meter.label}</h4>
                    <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                      <motion.div
                        className={`h-2 rounded-full bg-${meter.color}-500`}
                        initial={{ width: "0%" }}
                        animate={{ width: `${meter.value}%` }}
                        transition={{ duration: 2, delay: 0.8 + index * 0.3 }}
                      />
                    </div>
                    <span className="text-lg font-bold text-white">{meter.value}%</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.button
                  onClick={() => router.push('/')}
                  className="group relative px-8 py-4 bg-red-600 text-white rounded-full font-semibold overflow-hidden border-2 border-red-500"
                  whileHover={{ scale: 1.05, borderColor: "#ffffff" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center space-x-2 group-hover:text-red-600 transition-colors">
                    <Home className="w-5 h-5" />
                    <span>Zone sécurisée</span>
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => router.push('/contact')}
                  className="group px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-full font-semibold hover:border-white hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center space-x-2">
                    <Key className="w-5 h-5" />
                    <span>Demander l&apos;accès</span>
                  </span>
                </motion.button>
              </motion.div>

              {/* Security Notice */}
              <motion.div
                variants={itemVariants}
                className="mt-16 p-6 bg-gradient-to-r from-red-900 to-red-800 border border-red-600 rounded-2xl"
              >
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <AlertOctagon className="w-6 h-6 text-red-300" />
                  <h3 className="text-lg font-semibold text-red-200">Avertissement de sécurité</h3>
                </div>
                <p className="text-red-300 text-sm">
                  Cette zone est protégée. Toute tentative d&apos;accès non autorisée est surveillée et peut faire l&apos;objet de poursuites.
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

export default Forbidden;
