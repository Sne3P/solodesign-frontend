"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLoading } from '@/contexts/LoadingContext';

const LoaderGlobal = () => {
  const { isLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }

    // Reset progress when loading starts
    setProgress(0);
    
    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95; // Stop at 95% until loading is complete
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, [isLoading]);

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.98,
      transition: { 
        duration: 0.6, 
        ease: "easeInOut",
        delay: 0.2
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.1
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  const progressVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.5 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-[0.03]">
            <motion.div
              className="w-full h-full"
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
                  linear-gradient(90deg, white 1px, transparent 1px),
                  linear-gradient(0deg, white 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 15 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 bg-white rounded-full"
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920), 
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                  opacity: 0 
                }}
                animate={{ 
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                  y: [null, (Math.random() - 0.5) * 100]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* Logo section */}
            <motion.div
              variants={logoVariants}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                {/* Main logo */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 12, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="relative w-20 h-20 md:w-24 md:h-24"
                >
                  <Image
                    src="/logo_white_png.png"
                    alt="Solo Design"
                    fill
                    className="object-contain brightness-0 invert"
                    priority
                  />
                </motion.div>

                {/* Orbital ring */}
                <motion.div
                  className="absolute inset-[-8px] border border-white/15 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                />
                
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-[-16px] border border-white/10 rounded-full"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </div>
            </motion.div>

            {/* Brand text */}
            <motion.div
              variants={textVariants}
              className="mb-8"
            >
              <motion.h1 
                className="text-white text-lg md:text-xl font-light tracking-[0.3em] mb-2"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                SOLO DESIGN
              </motion.h1>
              
              <motion.p
                className="text-white/50 text-xs md:text-sm tracking-wide"
                animate={{
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                Expérience en cours de chargement
              </motion.p>
            </motion.div>

            {/* Progress section */}
            <motion.div
              variants={progressVariants}
              className="w-48 md:w-64 mx-auto"
            >
              {/* Progress bar container */}
              <div className="relative">
                <div className="h-[1px] bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-white/40 to-white origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: progress / 100 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                
                {/* Progress indicator */}
                <motion.div
                  className="flex justify-between items-center mt-3 text-[10px] md:text-xs text-white/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <span>Loading</span>
                  <motion.span
                    key={progress}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {Math.round(progress)}%
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>

            {/* Status dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex justify-center space-x-1 mt-8"
            >
              {Array.from({ length: 3 }, (_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-white/30 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoaderGlobal;
