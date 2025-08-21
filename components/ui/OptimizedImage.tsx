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

  if (hasError) {
    return (
      <div 
        className={cn(containerClass, 'flex items-center justify-center bg-gray-100')}
        style={{ aspectRatio }}
      >
        <Image 
          src="/placeholder.svg" 
          alt={alt || "Image non disponible"}
          width={width || 400}
          height={height || 300}
          className="w-full h-full object-contain opacity-50"
        />
      </div>
    )
  }

  return (
    <div className={containerClass} style={{ aspectRatio }}>
      {/* Placeholder pendant le chargement */}
      <div className={cn('absolute inset-0 bg-gray-200 transition-opacity duration-300', {
        'opacity-100': isLoading,
        'opacity-0': !isLoading,
      })} />
      
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
