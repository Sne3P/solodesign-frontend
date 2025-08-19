"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const lastUpdate = useRef<number>(0);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      // Optimisation: limiter les mises à jour
      const now = Date.now();
      if (now - lastUpdate.current < 16) return; // 60fps max
      
      lastUpdate.current = now;
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const clickable = target?.closest?.('a, button, .social-icon, .menu-item, .service-card, input, textarea, .clickable');
      setHover(!!clickable);
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseover', handleHover, { passive: true });
    document.addEventListener('mouseout', handleHover, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseout', handleHover);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[10001] mix-blend-difference"
      style={{
        x: position.x - 12,
        y: position.y - 12,
        willChange: 'transform'
      }}
      animate={{ 
        scale: hover ? 1.8 : 1,
        opacity: 1
      }}
      transition={{ 
        type: "spring", 
        stiffness: 600, 
        damping: 25,
        mass: 0.3
      }}
    >
      {/* Cercle principal */}
      <motion.div 
        className="absolute inset-0 rounded-full border-2 border-white"
        animate={{
          backgroundColor: hover ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ 
          duration: 0.2,
          ease: "easeOut"
        }}
      />
      
      {/* Point central */}
      <motion.div 
        className="absolute top-1/2 left-1/2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" 
        animate={{
          width: hover ? 4 : 3,
          height: hover ? 4 : 3,
          opacity: hover ? 0 : 1,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 600, 
          damping: 25 
        }}
      />
      
      {/* Effet de pulse uniquement sur hover - sans clignotement */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/50"
        animate={hover ? {
          scale: [1, 1.8, 1],
          opacity: [0.6, 0, 0.6],
        } : {
          scale: 1,
          opacity: 0
        }}
        transition={{ 
          duration: 2, 
          repeat: hover ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default Cursor;
