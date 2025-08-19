import { useState } from 'react'
import CoverMedia from '@/components/ui/CoverMedia'
import { getMediaType } from '@/lib/mediaUtils'

interface MediaTestItem {
  id: string
  src: string
  alt: string
  type: 'image' | 'video' | 'unknown'
}

export default function MediaTestComponent() {
  const [testMedias] = useState<MediaTestItem[]>([
    {
      id: '1',
      src: '/placeholder.svg',
      alt: 'Image placeholder',
      type: 'image'
    },
    {
      id: '2',
      src: '/uploads/media_1754661304487_53afi3upb.mp4',
      alt: 'Vidéo de test',
      type: 'video'
    },
    {
      id: '3',
      src: '/uploads/sample.webm',
      alt: 'Vidéo WebM',
      type: 'video'
    },
    {
      id: '4',
      src: '/uploads/image.jpg',
      alt: 'Image JPEG',
      type: 'image'
    },
    {
      id: '5',
      src: '',
      alt: 'Média vide (fallback)',
      type: 'unknown'
    }
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Test du Composant CoverMedia
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testMedias.map((media) => {
          const detectedType = getMediaType(media.src)
          
          return (
            <div key={media.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video bg-gray-100">
                <CoverMedia
                  src={media.src}
                  alt={media.alt}
                  className="w-full h-full object-cover"
                  autoPlay={detectedType === 'video'}
                  muted={true}
                  loop={true}
                  controls={false}
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{media.alt}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Type attendu:</span> {media.type}
                  </p>
                  <p>
                    <span className="font-medium">Type détecté:</span> {detectedType}
                  </p>
                  <p>
                    <span className="font-medium">Source:</span> 
                    <span className="break-all ml-1">{media.src || 'Vide'}</span>
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Fonctionnalités du Composant CoverMedia
        </h2>
        
        <ul className="space-y-2 text-gray-700">
          <li>✅ Détection automatique du type de média (image/vidéo)</li>
          <li>✅ Gestion des erreurs avec fallback automatique</li>
          <li>✅ Support des formats vidéo: MP4, WebM, OGG, AVI, MOV, etc.</li>
          <li>✅ Support des formats image: JPG, PNG, WebP, SVG, GIF, etc.</li>
          <li>✅ Contrôles vidéo personnalisables</li>
          <li>✅ Indicateurs de chargement</li>
          <li>✅ Animations avec Framer Motion</li>
          <li>✅ Optimisation pour Next.js avec le composant Image</li>
          <li>✅ Accessibilité avec alt text approprié</li>
        </ul>
      </div>
    </div>
  )
}
