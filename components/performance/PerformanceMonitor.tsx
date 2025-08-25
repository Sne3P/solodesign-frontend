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
