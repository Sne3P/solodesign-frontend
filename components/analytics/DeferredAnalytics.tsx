'use client'

import { GoogleAnalytics, Clarity, Hotjar } from "../analytics/Analytics"
import { useEffect, useState } from 'react'

export default function DeferredAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Chargement différé après l'interaction utilisateur ou après 3 secondes
    const timer = setTimeout(() => setShouldLoad(true), 3000)
    
    const handleUserInteraction = () => {
      setShouldLoad(true)
      clearTimeout(timer)
    }

    // Détection de la première interaction utilisateur
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    events.forEach(event => 
      document.addEventListener(event, handleUserInteraction, { 
        once: true, 
        passive: true 
      })
    )

    return () => {
      clearTimeout(timer)
      events.forEach(event => 
        document.removeEventListener(event, handleUserInteraction)
      )
    }
  }, [])

  if (!shouldLoad) return null

  return (
    <>
      <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      <Clarity projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID} />
      <Hotjar siteId={process.env.NEXT_PUBLIC_HOTJAR_ID} />
    </>
  )
}
