'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  quality?: number
  sizes?: string
  className?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  loading?: 'lazy' | 'eager'
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  aspectRatio?: string
  rounded?: boolean
  onLoad?: () => void
  onError?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  quality = 85,
  sizes,
  className,
  placeholder = 'empty',
  blurDataURL,
  loading = 'lazy',
  objectFit = 'cover',
  aspectRatio,
  rounded = false,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  // Générer un placeholder de couleur basé sur le nom de l'image
  const generatePlaceholder = (imageName: string) => {
    const colors = [
      'from-blue-100 to-blue-200',
      'from-purple-100 to-purple-200', 
      'from-green-100 to-green-200',
      'from-orange-100 to-orange-200',
      'from-pink-100 to-pink-200'
    ]
    const hash = imageName.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    return colors[Math.abs(hash) % colors.length]
  }

  const containerClass = cn(
    'relative overflow-hidden',
    {
      'rounded-lg': rounded,
      'animate-pulse': isLoading,
    },
    className
  )

  const imageClass = cn(
    'transition-opacity duration-300',
    {
      'opacity-0': isLoading && !hasError,
      'opacity-100': !isLoading || hasError,
    }
  )

  const placeholderClass = cn(
    'absolute inset-0 bg-gradient-to-br',
    generatePlaceholder(src),
    {
      'opacity-100': isLoading,
      'opacity-0': !isLoading,
    }
  )

  if (hasError) {
    return (
      <div 
        className={cn(containerClass, 'flex items-center justify-center bg-gray-100')}
        style={{ aspectRatio }}
      >
        <div className="text-gray-400 text-sm">Image non disponible</div>
      </div>
    )
  }

  return (
    <div className={containerClass} style={{ aspectRatio }}>
      {/* Placeholder pendant le chargement */}
      <div className={cn('absolute inset-0 transition-opacity duration-300', placeholderClass)} />
      
      {/* Image optimisée */}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes || (fill ? '100vw' : undefined)}
        className={imageClass}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        loading={priority ? 'eager' : loading}
        style={{ objectFit }}
        onLoad={handleLoad}
        onError={handleError}
        // Préchargement critique pour LCP
        {...(priority && {
          'data-priority': 'high'
        })}
      />
    </div>
  )
}
