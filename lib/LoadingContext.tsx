'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
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

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(true); // Start with true for initial load
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    // Minimum loading time for better UX (avoid flash)
    const minLoadingTime = 600;
    const startTime = Date.now();
    
    setTimeout(() => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    }, 100);
  };

  // Handle initial load and page refresh
  useEffect(() => {
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        stopLoading();
        setIsInitialLoad(false);
      }, 1400); // Initial load time

      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  // Handle route changes (navigation between pages)
  useEffect(() => {
    if (!isInitialLoad) {
      startLoading();
      const timer = setTimeout(() => {
        stopLoading();
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [pathname, isInitialLoad]);

  // Handle browser navigation events (back/forward)
  useEffect(() => {
    const handleBeforeUnload = () => {
      startLoading();
    };

    const handleLoad = () => {
      if (!isInitialLoad) {
        stopLoading();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, [isInitialLoad]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
