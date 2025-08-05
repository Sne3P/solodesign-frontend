'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLoading } from '@/lib/LoadingContext';

const LoaderGlobal = () => {
  const { isLoading } = useLoading();

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: { 
              duration: 0.8,
              ease: [0.4, 0.0, 0.2, 1]
            }
          }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          style={{ isolation: 'isolate' }}
        >
          {/* Background animated gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/3"
          />

          {/* Main content container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ 
              scale: 0.9, 
              opacity: 0,
              transition: { 
                duration: 0.6,
                ease: [0.4, 0.0, 0.2, 1]
              }
            }}
            transition={{ 
              duration: 0.8,
              ease: [0.4, 0.0, 0.2, 1],
              delay: 0.1
            }}
            className="relative flex flex-col items-center"
          >
            {/* Logo container with glow effect */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                duration: 1,
                ease: [0.4, 0.0, 0.2, 1],
                delay: 0.2
              }}
              className="relative mb-8"
            >
              {/* Glow effect behind logo */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-white rounded-full blur-xl opacity-20"
              />
              
              {/* Logo */}
              <motion.div
                animate={{ 
                  rotateY: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <Image
                  src="/logo_white_png.png"
                  alt="Solo Design"
                  width={80}
                  height={80}
                  className="object-contain filter drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Loading animation */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              exit={{ width: "100%", opacity: 0 }}
              transition={{ 
                duration: 1.2,
                ease: [0.4, 0.0, 0.2, 1],
                delay: 0.4
              }}
              className="relative w-48 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent overflow-hidden"
            >
              {/* Moving light effect */}
              <motion.div
                animate={{ 
                  x: ["-100%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute inset-0 w-16 bg-gradient-to-r from-transparent via-white to-transparent"
              />
            </motion.div>

            {/* Subtle text indicator */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ 
                duration: 0.8,
                ease: [0.4, 0.0, 0.2, 1],
                delay: 0.8
              }}
              className="mt-8"
            >
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-white/60 text-xs font-light tracking-[0.2em] uppercase"
              >
                Solo Design
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 400,
                  y: typeof window !== 'undefined' ? window.innerHeight + 20 : 800,
                  opacity: 0
                }}
                animate={{
                  y: -20,
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoaderGlobal;
