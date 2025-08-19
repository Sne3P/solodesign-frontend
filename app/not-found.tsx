"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CustomLink from '@/components/ui/CustomLink';

const NotFound = () => {
  const router = useRouter();

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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <motion.div
          className="w-full h-full"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `
              linear-gradient(90deg, white 1px, transparent 1px),
              linear-gradient(0deg, white 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: 0 
            }}
            animate={{ 
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
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
        {/* 404 Number */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.h1
            variants={floatingVariants}
            animate="animate"
            className="text-8xl md:text-9xl font-extralight tracking-wider mb-4"
            style={{
              textShadow: "0 0 30px rgba(255,255,255,0.1)"
            }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Error message */}
        <motion.div
          variants={itemVariants}
          className="mb-12"
        >
          <motion.h2
            className="text-2xl md:text-3xl font-light mb-4 tracking-wide"
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Page introuvable
          </motion.h2>
          
          <motion.p
            className="text-white/60 text-lg md:text-xl leading-relaxed"
            variants={itemVariants}
          >
            La page que vous recherchez semble avoir disparu dans l&apos;espace numérique.
          </motion.p>
        </motion.div>

        {/* Animated separator */}
        <motion.div
          variants={itemVariants}
          className="w-32 h-px bg-white/20 mx-auto mb-12"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-white to-transparent"
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

          <motion.button
            onClick={() => router.back()}
            className="group px-8 py-4 bg-white/10 text-white rounded-full font-light hover:bg-white/20 transition-all duration-300 flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Page précédente</span>
          </motion.button>

          <motion.button
            onClick={() => window.location.reload()}
            className="group px-8 py-4 border border-white/20 text-white rounded-full font-light hover:border-white/40 hover:bg-white/5 transition-all duration-300 flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-5 h-5" />
            </motion.div>
            <span>Actualiser</span>
          </motion.button>
        </motion.div>

        {/* Status indicator */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-2"
        >
          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white/20 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
