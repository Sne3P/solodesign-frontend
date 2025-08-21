'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      // Enregistrement différé pour ne pas impacter les Core Web Vitals
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js')
          
          console.log('✅ Service Worker enregistré:', registration.scope)
          
          // Écouter les mises à jour
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Nouvelle version disponible
                  console.log('🔄 Nouvelle version du Service Worker disponible')
                }
              })
            }
          })
          
        } catch (error) {
          console.log('❌ Erreur Service Worker:', error)
        }
      }
      
      // Enregistrement après le chargement de la page
      if (document.readyState === 'complete') {
        registerSW()
      } else {
        window.addEventListener('load', registerSW)
      }
    }
  }, [])

  return null
}
