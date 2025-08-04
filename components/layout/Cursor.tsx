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
      const clickable = target?.closest?.('a, button, .social-icon, .menu-item, .service-card, input, textarea');
      setHover(!!clickable);
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseover', handleHover, { passive: true });
    document.addEventListener('mouseout', () => setHover(false), { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseout', () => setHover(false));
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[10001] mix-blend-difference"
      style={{
        x: position.x - 12,
        y: position.y - 12,
        backgroundColor: hover ? 'white' : 'transparent',
        border: '2px solid white',
        willChange: 'transform'
      }}
      animate={{ 
        scale: hover ? 1.8 : 1,
        opacity: hover ? 0.9 : 1
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 20,
        mass: 0.5
      }}
    >
      {/* Point central plus visible */}
      <motion.div 
        className="absolute top-1/2 left-1/2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" 
        animate={{
          width: hover ? 6 : 3,
          height: hover ? 6 : 3,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 600, 
          damping: 25 
        }}
      />
      
      {/* Effet de pulse subtil sur hover */}
      {hover && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ 
            duration: 1, 
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}
    </motion.div>
  );
};

export default Cursor;
