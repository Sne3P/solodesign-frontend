'use client'

import { useState } from 'react'
import CoverMedia from '@/components/ui/CoverMedia'
import { getMediaType } from '@/lib/mediaUtils'
import { motion } from 'framer-motion'

export default function MediaTestPage() {
  const [testUrls] = useState([
    // Images
    '/placeholder.svg',
    '/logo_white_png.png',
    'https://via.placeholder.com/800x600.jpg',
    
    // Vidéos (URLs de test)
    '/uploads/media_1754661304487_53afi3upb.mp4',
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    
    // URLs vides/invalides pour tester le fallback
    '',
    'invalid-url',
    '/non-existent-file.jpg'
  ])

  const [selectedUrl, setSelectedUrl] = useState(testUrls[0])
  const [showControls, setShowControls] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)

  const mediaType = getMediaType(selectedUrl)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-8">
            Test du Système de Médias
          </h1>

          {/* Zone de test principale */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
              <CoverMedia
                src={selectedUrl}
                alt="Média de test"
                className="w-full h-full object-cover"
                autoPlay={autoPlay}
                controls={showControls}
                priority
              />
            </div>

            {/* Informations sur le média */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-2">Informations du média :</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">URL :</span> {selectedUrl || 'Vide'}</p>
                <p><span className="font-medium">Type détecté :</span> {mediaType}</p>
                <p><span className="font-medium">Lecture auto :</span> {autoPlay ? 'Oui' : 'Non'}</p>
                <p><span className="font-medium">Contrôles :</span> {showControls ? 'Oui' : 'Non'}</p>
              </div>
            </div>

            {/* Contrôles de test */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Sélectionner une URL de test :
                </label>
                <select
                  value={selectedUrl}
                  onChange={(e) => setSelectedUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {testUrls.map((url, index) => (
                    <option key={index} value={url}>
                      {url || `URL vide (test ${index + 1})`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showControls}
                    onChange={(e) => setShowControls(e.target.checked)}
                    className="rounded"
                  />
                  <span>Afficher les contrôles vidéo</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={autoPlay}
                    onChange={(e) => setAutoPlay(e.target.checked)}
                    className="rounded"
                  />
                  <span>Lecture automatique</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Ou entrer une URL personnalisée :
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/media.mp4"
                  onChange={(e) => setSelectedUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Grille de démonstration */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testUrls.slice(0, 6).map((url, index) => {
              const type = getMediaType(url)
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedUrl(url)}
                >
                  <div className="aspect-video">
                    <CoverMedia
                      src={url}
                      alt={`Test ${index + 1}`}
                      className="w-full h-full object-cover"
                      autoPlay={false}
                      muted={true}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium truncate">
                      {url || `Test ${index + 1} (vide)`}
                    </p>
                    <p className="text-xs text-gray-500">Type: {type}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">
              Instructions de test :
            </h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>• Cliquez sur les cartes pour tester différents médias</li>
              <li>• Les vidéos devraient se lancer automatiquement si configuré</li>
              <li>• Survolez les vidéos pour voir les contrôles personnalisés</li>
              <li>• Les images invalides devraient afficher le placeholder</li>
              <li>• Testez avec vos propres URLs dans le champ personnalisé</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
