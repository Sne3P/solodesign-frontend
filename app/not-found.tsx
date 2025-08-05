"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { Home, ArrowLeft, AlertTriangle, RefreshCw, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LogoTitle from '@/components/layout/LogoTitle';
import SocialLinks from '@/components/layout/SocialLinks';
import MenuButton from '@/components/layout/MenuButton';
import FooterMinimal from '@/components/sections/FooterMinimal';
import BackgroundPattern from '@/components/layout/BackgroundPattern';
import Cursor from '@/components/layout/Cursor';

const NotFound = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Effet de glitch périodique
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  const floatingElements = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 3 + 2,
  }));

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
    hidden: { opacity: 0, y: 50, scale: 0.8 },
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

  const numberVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
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

  const glitchVariants = {
    normal: { 
      x: 0, 
      textShadow: "none",
      filter: "none"
    },
    glitch: { 
      x: [-2, 2, -1, 1, 0],
      textShadow: [
        "2px 0 #ff0000, -2px 0 #00ff00",
        "-2px 0 #ff0000, 2px 0 #00ff00",
        "2px 0 #0000ff, -2px 0 #ffff00",
        "none"
      ],
      filter: [
        "hue-rotate(90deg)",
        "hue-rotate(0deg)",
        "hue-rotate(180deg)",
        "hue-rotate(0deg)"
      ],
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-white text-black relative overflow-hidden">
        <BackgroundPattern />
        <LogoTitle />
        <SocialLinks />
        <MenuButton />
        <Cursor />

        {/* Floating Elements */}
        <AnimatePresence>
          {isLoaded && floatingElements.map((element) => (
            <motion.div
              key={element.id}
              className="fixed pointer-events-none opacity-10"
              style={{
                width: `${element.size}px`,
                height: `${element.size}px`,
                left: `${element.initialX}%`,
                top: `${element.initialY}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.5, 1],
                y: [-20, 20, -20],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: element.id * 0.2,
              }}
            >
              <div className="w-full h-full bg-gray-400 rounded-full" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Dynamic Background Grid */}
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
              linear-gradient(90deg, #000 1px, transparent 1px),
              linear-gradient(0deg, #000 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <Parallax speed={-3}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center max-w-4xl mx-auto"
            >
              {/* Error Number */}
              <motion.div
                variants={numberVariants}
                className="mb-8 relative"
              >
                <motion.h1
                  variants={glitchVariants}
                  animate={glitchActive ? "glitch" : "normal"}
                  className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black leading-none"
                  style={{
                    background: "linear-gradient(45deg, #000, #666, #000)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "300% 300%",
                  }}
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      background: "linear-gradient(45deg, #000, #666, #000)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundSize: "300% 300%",
                    }}
                  >
                    404
                  </motion.span>
                </motion.h1>

                {/* Decorative Elements around 404 */}
                <motion.div
                  className="absolute -top-8 -left-8 w-4 h-4 border-2 border-gray-400"
                  animate={{
                    rotate: [0, 90, 180, 270, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-8 -right-8 w-6 h-6 bg-gray-300 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </motion.div>

              {/* Error Icon */}
              <motion.div
                variants={itemVariants}
                className="mb-8 flex justify-center"
              >
                <motion.div
                  className="w-24 h-24 border-2 border-gray-300 rounded-full flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 360,
                    borderColor: "#000"
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <AlertTriangle className="w-12 h-12 text-gray-600" />
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
                  whileHover={{ scale: 1.05, rotate: 2 }}
                >
                  Page
                </motion.span>{" "}
                <motion.span
                  className="inline-block bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05, rotate: -2 }}
                >
                  Introuvable
                </motion.span>
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                <motion.span
                  className="inline-block"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Oups !
                </motion.span>{" "}
                La page que vous recherchez semble s&apos;être perdue dans l&apos;espace numérique.
                Ne vous inquiétez pas, nous allons vous ramener en sécurité.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.button
                  onClick={() => router.push('/')}
                  className="group relative px-8 py-4 bg-black text-white rounded-full font-semibold overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center space-x-2 group-hover:text-black transition-colors">
                    <Home className="w-5 h-5" />
                    <span>Retour à l&apos;accueil</span>
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => router.back()}
                  className="group px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-black hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center space-x-2">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Page précédente</span>
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => window.location.reload()}
                  className="group px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw className="w-5 h-5" />
                    </motion.div>
                    <span>Actualiser</span>
                  </span>
                </motion.button>
              </motion.div>

              {/* Search Suggestion */}
              <motion.div
                variants={itemVariants}
                className="mt-16 p-6 bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-2xl"
              >
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Search className="w-6 h-6 text-gray-500" />
                  <h3 className="text-xl font-semibold text-gray-800">Besoin d&apos;aide ?</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Explorez nos sections principales ou contactez notre équipe.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    { label: "Services", href: "/services" },
                    { label: "Projets", href: "/projects" },
                    { label: "À propos", href: "/about-us" },
                    { label: "Contact", href: "/contact" }
                  ].map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-black border border-gray-200 rounded-full hover:border-gray-400 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
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

export default NotFound;
