'use client';

import { useEffect, useRef, useState } from 'react';

interface CriticalResourceOptions {
  priority?: 'high' | 'low';
  preload?: boolean;
  prefetch?: boolean;
}

export function useCriticalResource(
  href: string,
  as: string,
  options: CriticalResourceOptions = {}
) {
  const { priority = 'high', preload = true, prefetch = false } = options;
  const linkRef = useRef<HTMLLinkElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Préchargement critique pour les ressources importantes
    if (preload) {
      const existingLink = document.querySelector(`link[href="${href}"]`);
      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        link.setAttribute('data-priority', priority);
        document.head.appendChild(link);
        linkRef.current = link;
      }
    }

    // Prefetch pour les ressources futures
    if (prefetch) {
      const existingPrefetch = document.querySelector(
        `link[rel="prefetch"][href="${href}"]`
      );
      if (!existingPrefetch) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
      }
    }

    return () => {
      if (linkRef.current && linkRef.current.parentNode) {
        linkRef.current.parentNode.removeChild(linkRef.current);
      }
    };
  }, [href, as, priority, preload, prefetch]);
}

// Hook pour optimiser les images critiques (LCP)
export function useCriticalImages(images: string[], priority = true) {
  useEffect(() => {
    if (typeof window === 'undefined' || !priority) return;

    images.forEach(src => {
      const img = new Image();
      img.src = src;
      // Préchargement des images critiques pour améliorer LCP
      if (priority) {
        img.loading = 'eager';
        img.decoding = 'sync';
      }
    });
  }, [images, priority]);
}

// Hook pour observer les métriques Core Web Vitals
export function useWebVitals() {
  const [metrics, setMetrics] = useState<{
    LCP: number | null;
    FID: number | null;
    CLS: number | null;
    FCP: number | null;
    TTFB: number | null;
  }>({
    LCP: null,
    FID: null,
    CLS: null,
    FCP: null,
    TTFB: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Observer LCP (Largest Contentful Paint)
    const observeLCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
            startTime: number;
          };
          setMetrics(prev => ({ ...prev, LCP: lastEntry?.startTime || null }));
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      }
    };

    // Observer FCP (First Contentful Paint)
    const observeFCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({ ...prev, FCP: entry.startTime }));
            }
          });
        });
        observer.observe({ entryTypes: ['paint'] });
      }
    };

    // Observer CLS (Cumulative Layout Shift)
    const observeCLS = () => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const observer = new PerformanceObserver(list => {
          for (const entry of list.getEntries() as Array<
            PerformanceEntry & { value: number; hadRecentInput: boolean }
          >) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              setMetrics(prev => ({ ...prev, CLS: clsValue }));
            }
          }
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      }
    };

    // Mesurer TTFB (Time to First Byte)
    const measureTTFB = () => {
      if ('performance' in window && 'timing' in window.performance) {
        const timing = window.performance.timing;
        const ttfb = timing.responseStart - timing.navigationStart;
        setMetrics(prev => ({ ...prev, TTFB: ttfb }));
      }
    };

    observeLCP();
    observeFCP();
    observeCLS();
    measureTTFB();
  }, []);

  return metrics;
}

// Hook pour optimiser le chargement des fonts
export function useFontOptimization(fonts: string[]) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    fonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, [fonts]);
}

// Hook pour lazy loading optimisé
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsIntersecting(entry.isIntersecting);
          if (entry.isIntersecting && !hasIntersected) {
            setHasIntersected(true);
          }
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, hasIntersected, options]);

  return { isIntersecting, hasIntersected };
}
