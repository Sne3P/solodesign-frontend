"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface LightBackgroundPatternProps {
  opacity?: number;
  spacing?: number;
  duration?: number;
  zIndex?: number;
}

const LightBackgroundPattern = ({ 
  opacity = 0.15, 
  spacing = 30, 
  duration = 10,
  zIndex = 10
}: LightBackgroundPatternProps) => {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Version ultra-légère - seulement la trame de base */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity}) 1px, transparent 1px)`,
          backgroundSize: `${spacing}px ${spacing}px`,
          backgroundPosition: '0px 0px',
          animation: `backgroundMove-${spacing} ${duration}s linear infinite`
        }}
      />
    </motion.div>
  );
};

export default LightBackgroundPattern;
