'use client'

import { useWebVitals } from '@/hooks/usePerformance'
import { useEffect } from 'react'

interface GtagWindow extends Window {
  gtag?: (...args: unknown[]) => void
}

export default function PerformanceMonitor() {
  const metrics = useWebVitals()

  useEffect(() => {
    // Log des métriques pour le debug en développement
    if (process.env.NODE_ENV === 'development') {
      console.group('🚀 Web Vitals Performance')
      console.log('LCP (Largest Contentful Paint):', metrics.LCP ? `${metrics.LCP.toFixed(2)}ms` : 'N/A')
      console.log('FCP (First Contentful Paint):', metrics.FCP ? `${metrics.FCP.toFixed(2)}ms` : 'N/A')
      console.log('CLS (Cumulative Layout Shift):', metrics.CLS ? metrics.CLS.toFixed(3) : 'N/A')
      console.log('TTFB (Time to First Byte):', metrics.TTFB ? `${metrics.TTFB.toFixed(2)}ms` : 'N/A')
      console.groupEnd()
    }

    // Envoi des métriques en production (optionnel)
    if (process.env.NODE_ENV === 'production' && metrics.LCP && metrics.FCP) {
      const win = window as GtagWindow
      if (win.gtag) {
        win.gtag('event', 'web_vitals', {
          custom_parameter_1: metrics.LCP,
          custom_parameter_2: metrics.FCP,
          custom_parameter_3: metrics.CLS,
        })
      }
    }
  }, [metrics])

  // Composant invisible, juste pour le monitoring
  return null
}
