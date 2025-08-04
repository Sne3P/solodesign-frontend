"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface BackgroundPatternProps {
  opacity?: number;
  spacing?: number;
  duration?: number;
  dotOpacity?: number;
  zIndex?: number;
  magneticEffect?: boolean; // Nouvelle prop pour activer/désactiver l'effet magnétique
}

const BackgroundPattern = ({ 
  opacity = 0.2, 
  spacing = 30, 
  duration = 10,
  dotOpacity = 0.3,
  zIndex = 10,
  magneticEffect = true
}: BackgroundPatternProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const lastMouseUpdate = useRef<number>(0);

  // Optimisation: réduire drastiquement la fréquence de mise à jour
  const updateMousePosition = useCallback((e: MouseEvent) => {
    if (!magneticEffect) return;
    
    const now = Date.now();
    if (now - lastMouseUpdate.current < 32) return; // 30fps pour l'effet magnétique
    
    lastMouseUpdate.current = now;
    setMousePos({ x: e.clientX, y: e.clientY });
  }, [magneticEffect]);

  useEffect(() => {
    if (magneticEffect) {
      window.addEventListener('mousemove', updateMousePosition, { passive: true });
    }
    
    return () => {
      if (magneticEffect) {
        window.removeEventListener('mousemove', updateMousePosition);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateMousePosition, magneticEffect]);

  // Effet canvas ultra-optimisé - seulement si l'effet magnétique est activé
  useEffect(() => {
    if (!magneticEffect) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Configurer le canvas pour de meilleures performances
    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Limiter le DPR pour les perfs
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Animation ultra-légère avec seulement quelques points près du curseur
    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Points magnétiques - seulement dans un rayon de 100px du curseur
      const radius = 100;
      const gridSize = spacing;
      
      // Calculer la grille locale autour du curseur
      const startX = Math.floor((mousePos.x - radius) / gridSize) * gridSize;
      const endX = Math.ceil((mousePos.x + radius) / gridSize) * gridSize;
      const startY = Math.floor((mousePos.y - radius) / gridSize) * gridSize;
      const endY = Math.ceil((mousePos.y + radius) / gridSize) * gridSize;

      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(dotOpacity * 1.5, 0.8)})`;

      // Réduire encore plus le nombre de points
      for (let x = startX; x <= endX; x += gridSize) {
        for (let y = startY; y <= endY; y += gridSize) {
          const distance = Math.hypot(mousePos.x - x, mousePos.y - y);
          
          if (distance < radius) {
            // Effet magnétique plus subtil
            const force = Math.pow(1 - distance / radius, 2);
            const angle = Math.atan2(y - mousePos.y, x - mousePos.x);
            const offset = force * 8; // Réduire l'offset
            
            const finalX = x + Math.cos(angle) * offset;
            const finalY = y + Math.sin(angle) * offset;
            
            // Taille du point basée sur la proximité
            const size = 0.8 + force * 1.5;
            
            ctx.beginPath();
            ctx.arc(finalX, finalY, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos, spacing, dotOpacity, magneticEffect]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Trame de base avec CSS pur - ultra performant */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity}) 1px, transparent 1px)`,
          backgroundSize: `${spacing}px ${spacing}px`,
          backgroundPosition: '0px 0px',
          animation: `backgroundMove-${spacing} ${duration}s linear infinite`
        }}
      />
      
      {/* Canvas pour l'effet magnétique optimisé - seulement si activé */}
      {magneticEffect && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ 
            mixBlendMode: 'screen',
            filter: 'blur(0.3px)'
          }}
        />
      )}
    </motion.div>
  );
};

export default BackgroundPattern;
