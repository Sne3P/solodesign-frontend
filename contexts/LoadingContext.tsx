"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  startNavigation: () => void;
  finishNavigation: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // Commence en loading
  const [navigationTimeout, setNavigationTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Temps minimum d'affichage du loader (UX)
  const MINIMUM_LOADING_TIME = 1500;

  useEffect(() => {
    // Au premier chargement, afficher le loader pendant un temps minimum
    const initialTimeout = setTimeout(() => {
      setIsLoading(false);
    }, MINIMUM_LOADING_TIME);

    return () => clearTimeout(initialTimeout);
  }, []);

  useEffect(() => {
    // Gérer les changements de route - simple nettoyage
    return () => {
      if (navigationTimeout) {
        clearTimeout(navigationTimeout);
      }
    };
  }, [pathname, navigationTimeout]);

  const setLoading = (loading: boolean) => {
    if (loading) {
      setIsLoading(true);
    } else {
      // Toujours respecter le temps minimum
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, MINIMUM_LOADING_TIME);
      
      setNavigationTimeout(timeout);
    }
  };

  const startNavigation = () => {
    if (navigationTimeout) {
      clearTimeout(navigationTimeout);
      setNavigationTimeout(null);
    }
    setIsLoading(true);
  };

  const finishNavigation = () => {
    // Délai pour permettre aux animations d'entrée de page de se préparer
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    setNavigationTimeout(timeout);
  };

  const value: LoadingContextType = {
    isLoading,
    setLoading,
    startNavigation,
    finishNavigation
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};
