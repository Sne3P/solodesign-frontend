import Image from 'next/image'
import { useState } from 'react'

interface UploadedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
  priority?: boolean
  fill?: boolean
  sizes?: string
  onClick?: () => void
  onLoad?: () => void
  onError?: () => void
}

export default function UploadedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className,
  style,
  priority = false,
  fill = false,
  sizes,
}: UploadedImageProps) {
  const [error, setError] = useState(false)

  // Pour les images uploadées, utiliser directement l'URL sans optimisation Next.js si problème
  const isUploadedImage = src.startsWith('/uploads/')
  
  if (error || isUploadedImage) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        onLoad={() => {}}
        onError={() => setError(true)}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      style={style}
      priority={priority}
      sizes={sizes}
      onLoad={() => {}}
      onError={() => setError(true)}
    />
  )
}
