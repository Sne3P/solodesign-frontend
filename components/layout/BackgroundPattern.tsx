"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface BackgroundPatternProps {
  opacity?: number;
  spacing?: number;
  duration?: number;
  zIndex?: number;
  magneticEffect?: boolean;
}

const BackgroundPattern = ({ 
  opacity = 0.25, 
  spacing = 35, 
  duration = 12,
  zIndex = 10,
  magneticEffect = true
}: BackgroundPatternProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const dotsRef = useRef<Array<{x: number, y: number, originalX: number, originalY: number}>>([]);

  // Suivi de la souris optimisé
  const updateMousePosition = useCallback((e: MouseEvent) => {
    if (!magneticEffect) return;
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

  // Initialisation et animation de la trame magnétique
  useEffect(() => {
    if (!magneticEffect) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const updateCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Générer la grille de points une seule fois
      const dots: Array<{x: number, y: number, originalX: number, originalY: number}> = [];
      for (let x = 0; x <= width + spacing; x += spacing) {
        for (let y = 0; y <= height + spacing; y += spacing) {
          dots.push({ x, y, originalX: x, originalY: y });
        }
      }
      dotsRef.current = dots;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Animation fluide et légère
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const magneticRadius = 120;
      const magneticStrength = 15;
      
      dotsRef.current.forEach(dot => {
        const distance = Math.hypot(mousePos.x - dot.originalX, mousePos.y - dot.originalY);
        
        if (distance < magneticRadius) {
          // Effet magnétique accentué et fluide
          const force = Math.pow(1 - distance / magneticRadius, 1.8);
          const angle = Math.atan2(mousePos.y - dot.originalY, mousePos.x - dot.originalX);
          
          // Déplacement vers la souris avec interpolation fluide
          const targetX = dot.originalX + Math.cos(angle) * force * magneticStrength;
          const targetY = dot.originalY + Math.sin(angle) * force * magneticStrength;
          
          // Interpolation plus rapide pour l'attraction, plus lente pour éviter les bugs visuels
          const attractionSpeed = 0.25;
          dot.x += (targetX - dot.x) * attractionSpeed;
          dot.y += (targetY - dot.y) * attractionSpeed;
          
          // Opacité et taille augmentées pour les points magnétiques
          const pointOpacity = Math.min(opacity * (1 + force * 2.5), 0.8);
          const pointSize = 1.4 + force * 1.2;
          
          ctx.fillStyle = `rgba(255, 255, 255, ${pointOpacity})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, pointSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Effet de glow subtil pour les points très proches
          if (force > 0.7) {
            ctx.fillStyle = `rgba(255, 255, 255, ${pointOpacity * 0.2})`;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, pointSize * 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Retour progressif à la position originale avec interpolation douce
          const returnSpeed = 0.12;
          dot.x += (dot.originalX - dot.x) * returnSpeed;
          dot.y += (dot.originalY - dot.y) * returnSpeed;
          
          // Point normal plus visible
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos, spacing, opacity, magneticEffect]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Canvas pour la trame magnétique */}
      {magneticEffect ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ 
            filter: 'blur(0.1px)'
          }}
        />
      ) : (
        /* Trame statique en fallback */
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity}) 1px, transparent 1px)`,
            backgroundSize: `${spacing}px ${spacing}px`,
            backgroundPosition: '0px 0px',
            animation: `backgroundMove-${spacing} ${duration}s linear infinite`
          }}
        />
      )}
    </motion.div>
  );
};

export default BackgroundPattern;
