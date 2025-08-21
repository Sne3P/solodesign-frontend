'use client'

import { useEffect } from 'react'

interface CriticalCSSProps {
  styles: string
}

export default function CriticalCSS({ styles }: CriticalCSSProps) {
  useEffect(() => {
    // Injection du CSS critique en inline pour améliorer FCP
    const styleElement = document.createElement('style')
    styleElement.innerHTML = styles
    document.head.appendChild(styleElement)

    return () => {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement)
      }
    }
  }, [styles])

  return null
}

// CSS critique pour le hero section (améliore FCP)
export const heroCriticalCSS = `
  .hero-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000000;
    position: relative;
    overflow: hidden;
  }
  
  .hero-content {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1rem;
    position: relative;
    z-index: 10;
  }
  
  .hero-title {
    font-size: clamp(3rem, 8vw, 8rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #ffffff;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .hero-subtitle {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    color: #d1d5db;
    text-align: center;
    margin-bottom: 1.5rem;
    max-width: 32rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-description {
    font-size: 1rem;
    color: #9ca3af;
    text-align: center;
    margin-bottom: 2rem;
    max-width: 28rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (max-width: 640px) {
    .hero-container {
      padding: 0 1rem;
    }
    
    .hero-title {
      font-size: 3rem;
    }
    
    .hero-subtitle {
      font-size: 1.125rem;
    }
  }
`
