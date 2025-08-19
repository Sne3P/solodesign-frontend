"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Home, RefreshCw, Shield } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError: React.FC<GlobalErrorProps> = ({ error, reset }) => {
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

  return (
    <html>
      <body>
        <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
          {/* Critical error background */}
          <div className="absolute inset-0 opacity-[0.02]">
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
                  radial-gradient(circle at 50% 50%, white 1px, transparent 1px)
                `,
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          {/* Critical particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-orange-500/40 rounded-full"
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920), 
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                  opacity: 0 
                }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  scale: [0, 2, 0]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 text-center max-w-2xl mx-auto px-4"
          >
            {/* Critical error icon */}
            <motion.div
              variants={itemVariants}
              className="mb-8 flex justify-center"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-28 h-28 border-2 border-orange-500/40 rounded-full flex items-center justify-center"
              >
                <motion.div
                  animate={{
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Shield className="w-16 h-16 text-orange-400" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Error title */}
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <motion.h1
                className="text-6xl md:text-7xl font-extralight tracking-wider mb-4"
                animate={{
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                403
              </motion.h1>
              
              <motion.h2
                className="text-2xl md:text-3xl font-light mb-4 tracking-wide"
                variants={itemVariants}
              >
                Erreur critique
              </motion.h2>
              
              <motion.p
                className="text-white/60 text-lg leading-relaxed mb-6"
                variants={itemVariants}
              >
                Une erreur critique du système s&apos;est produite. L&apos;application doit être redémarrée.
              </motion.p>

              {/* Error details */}
              {error.message && (
                <motion.div
                  variants={itemVariants}
                  className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8 text-left"
                >
                  <p className="text-orange-400 text-sm font-mono">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-white/40 text-xs mt-2">
                      ID: {error.digest}
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Animated separator */}
            <motion.div
              variants={itemVariants}
              className="w-32 h-px bg-orange-500/30 mx-auto mb-12"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-orange-400 to-transparent"
                animate={{
                  x: [-100, 100]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ width: "50px" }}
              />
            </motion.div>

            {/* Action buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <motion.button
                onClick={reset}
                className="group px-8 py-4 bg-orange-500/20 text-white rounded-full font-light hover:bg-orange-500/30 transition-all duration-300 flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.div>
                <span>Redémarrer</span>
              </motion.button>

              <motion.button
                onClick={() => window.location.href = '/'}
                className="group px-8 py-4 border border-white/20 text-white rounded-full font-light hover:border-white/40 hover:bg-white/5 transition-all duration-300 flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5" />
                <span>Accueil</span>
              </motion.button>
            </motion.div>

            {/* Critical status indicator */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center space-x-2"
            >
              {Array.from({ length: 3 }, (_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-orange-500/40 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
