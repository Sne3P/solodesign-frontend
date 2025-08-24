"use client";
import { useState, useEffect } from 'react';

/**
 * Hook pour détecter si l'utilisateur est sur un appareil mobile
 * Prend en compte la taille d'écran, les capacités tactiles et l'user agent
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(true); // Par défaut sur mobile pour éviter les hydratation mismatches

  useEffect(() => {
    const checkIsMobile = () => {
      const width = window.innerWidth;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      const mobile = width < 1024 || isTouchDevice || isMobileUA;
      setIsMobile(mobile);
    };

    // Vérification initiale
    checkIsMobile();

    // Écouter les changements de taille d'écran
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
};
