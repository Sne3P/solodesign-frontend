import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { Play, Pause } from "lucide-react"
import { getMediaType } from "@/lib/mediaUtils"

interface CoverMediaProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  onClick?: () => void
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  poster?: string
  fallbackSrc?: string
}

/**
 * Composant pour afficher les médias de couverture (images ou vidéos)
 * Détecte automatiquement le type de média et affiche le bon conteneur
 */
export default function CoverMedia({
  src,
  alt,
  className = "",
  priority = false,
  onClick,
  autoPlay = false,
  muted = true,
  loop = true,
  controls = false,
  poster,
  fallbackSrc = "/placeholder.svg"
}: CoverMediaProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Utiliser le fallback si l'URL est vide ou invalide
  const mediaSrc = src && src.trim() ? src.trim() : fallbackSrc
  const mediaType = getMediaType(mediaSrc)
    if (process.env.NODE_ENV === 'development') {
      console.log('CoverMedia Debug:', {
    originalSrc: src,
    mediaSrc,
    mediaType,
    fallbackSrc
      })
    }

  const handleVideoToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = e.currentTarget.closest('.video-container')?.querySelector('video') as HTMLVideoElement
    
    if (video) {
      if (video.paused) {
        video.play().then(() => {
          setIsPlaying(true)
        }).catch(error => {
              if (process.env.NODE_ENV === 'development') {
                console.error('Erreur lors de la lecture de la vidéo:', error)
              }
        })
      } else {
        video.pause()
        setIsPlaying(false)
      }
    }
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  // Si erreur ou type inconnu, afficher le vrai placeholder SVG centré et contenu
  if (hasError || (mediaType === 'unknown' && mediaSrc !== fallbackSrc)) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={fallbackSrc}
          alt={alt}
          width={200}
          height={150}
          className="object-contain w-1/2 h-1/2"
          priority={priority}
          onLoad={handleLoad}
        />
      </div>
    )
  }

  // Affichage vidéo avec bords arrondis sur le container
  if (mediaType === 'video') {
    return (
      <div className="relative group w-full h-full overflow-hidden rounded-lg">
        <motion.video
          className={`${className} w-full h-full object-cover cursor-pointer`}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          poster={poster}
          onClick={onClick ? onClick : undefined}
          onError={handleError}
          onLoadedData={handleLoad}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          preload="metadata"
          playsInline
        >
          <source src={mediaSrc} type="video/mp4" />
          <source src={mediaSrc} type="video/webm" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </motion.video>

        {/* Overlay de contrôle personnalisé */}
        {!controls && (
          <motion.div
            className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 
                       transition-opacity duration-300 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.button
              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full 
                         flex items-center justify-center text-white hover:bg-white/30
                         transition-colors duration-200"
              onClick={handleVideoToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              aria-label={isPlaying ? "Pause la vidéo" : "Lire la vidéo"}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Indicateur de chargement */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    )
  }

  // Affichage image avec bords arrondis sur le container
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <Image
        src={mediaSrc}
        alt={alt}
        width={800}
        height={600}
        className={`object-cover w-full h-full ${className}`}
        priority={priority}
        onClick={onClick}
        onError={handleError}
        onLoad={handleLoad}
      />

      {/* Indicateur de chargement */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}
