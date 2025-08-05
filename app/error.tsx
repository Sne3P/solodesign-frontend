"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';
import CustomLink from '@/components/ui/CustomLink';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <motion.div
          className="w-full h-full"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `
              linear-gradient(45deg, white 1px, transparent 1px),
              linear-gradient(-45deg, white 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Error particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: 0 
            }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0]
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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-2xl mx-auto px-4"
      >
        {/* Error icon */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex justify-center"
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-24 h-24 border-2 border-red-500/30 rounded-full flex items-center justify-center"
          >
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <AlertTriangle className="w-12 h-12 text-red-400" />
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
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            500
          </motion.h1>
          
          <motion.h2
            className="text-2xl md:text-3xl font-light mb-4 tracking-wide"
            variants={itemVariants}
          >
            Erreur serveur
          </motion.h2>
          
          <motion.p
            className="text-white/60 text-lg leading-relaxed mb-6"
            variants={itemVariants}
          >
            Une erreur inattendue s&apos;est produite. Veuillez réessayer.
          </motion.p>

          {/* Error details */}
          {error.message && (
            <motion.div
              variants={itemVariants}
              className="bg-white/5 border border-white/10 rounded-lg p-4 mb-8 text-left"
            >
              <p className="text-red-400 text-sm font-mono">
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
          className="w-32 h-px bg-red-500/20 mx-auto mb-12"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-red-400 to-transparent"
            animate={{
              x: [-100, 100]
            }}
            transition={{
              duration: 2,
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
            className="group px-8 py-4 bg-red-500/20 text-white rounded-full font-light hover:bg-red-500/30 transition-all duration-300 flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-5 h-5" />
            </motion.div>
            <span>Réessayer</span>
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CustomLink
              href="/"
              className="group px-8 py-4 border border-white/20 text-white rounded-full font-light hover:border-white/40 hover:bg-white/5 transition-all duration-300 flex items-center space-x-3"
            >
              <Home className="w-5 h-5" />
              <span>Retour à l&apos;accueil</span>
            </CustomLink>
          </motion.div>
        </motion.div>

        {/* Status indicator */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-2"
        >
          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-red-500/30 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Error;
