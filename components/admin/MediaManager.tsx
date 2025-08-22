'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { ProjectImage, ProjectVideo } from '../../lib/types'
import { Trash2, Upload, Image as ImageIcon, Video, Monitor } from 'lucide-react'
import { useToast } from '../../hooks/use-toast'

interface MediaManagerProps {
  projectId: string
  images: ProjectImage[]
  videos: ProjectVideo[]
  coverImage?: string
  onMediaUpdate: () => void
  onCoverImageChange: (imageUrl: string) => void
  onRefreshProject: () => void // Nouvelle prop pour rafraîchir le projet
}

export default function MediaManager({ 
  projectId, 
  images, 
  videos, 
  coverImage, 
  onMediaUpdate,
  onCoverImageChange,
  onRefreshProject
}: MediaManagerProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const getAuthToken = () => {
    return localStorage.getItem('admin_token') || ''
  }

  const handleFileSelect = async (files: FileList) => {
    if (files.length === 0) return
    
    if (!projectId || projectId === 'undefined') {
      toast({
        title: "Erreur",
        description: "ID de projet manquant. Veuillez d'abord sauvegarder le projet.",
        variant: "destructive"
      })
      return
    }

    // Validation des fichiers
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/mov']
    const maxSize = 50 * 1024 * 1024 // 50MB
    
    const invalidFiles = Array.from(files).filter(file => 
      !allowedTypes.includes(file.type) || file.size > maxSize
    )
    
    if (invalidFiles.length > 0) {
      toast({
        title: "Fichiers invalides",
        description: `${invalidFiles.length} fichier(s) non supporté(s) ou trop volumineux (max 50MB)`,
        variant: "destructive"
      })
      return
    }

    setUploading(true)

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('projectId', projectId)

        console.log('📤 MediaManager: Upload pour projet ID:', projectId)

        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`
          },
          body: formData
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Erreur lors de l\'upload')
        }

        return await response.json()
      })

      // Attendre que tous les uploads soient terminés
      const results = await Promise.all(uploadPromises)
      
      toast({
        title: "Succès",
        description: `${results.length} fichier(s) uploadé(s) avec succès`
      })

      // Rafraîchir les données du projet pour afficher les nouveaux médias
      onRefreshProject()
      onMediaUpdate()

      // Dispatch event pour mise à jour temps réel des covers
      window.dispatchEvent(new CustomEvent('mediaUpdated', { 
        detail: { projectId } 
      }))

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de l\'upload'
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (mediaId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) return

    try {
      const response = await fetch(`/api/upload?mediaId=${mediaId}&projectId=${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la suppression')
      }

      toast({
        title: "Succès",
        description: "Fichier supprimé avec succès"
      })

      // Rafraîchir les données du projet
      onRefreshProject()
      onMediaUpdate()

      // Dispatch event pour mise à jour temps réel des covers
      window.dispatchEvent(new CustomEvent('mediaUpdated', { 
        detail: { projectId } 
      }))

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la suppression'
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive"
      })
    }
  }

  const handleCoverImageSet = async (imageUrl: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}/cover-image`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({ coverImage: imageUrl })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la mise à jour')
      }

      onCoverImageChange(imageUrl)
      onRefreshProject()
      
      // Dispatch event pour mise à jour temps réel des covers
      window.dispatchEvent(new CustomEvent('mediaUpdated', { 
        detail: { projectId } 
      }))
      
      toast({
        title: "Succès",
        description: "Image de couverture mise à jour"
      })
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la mise à jour de l\'image de couverture'
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive"
      })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = e.dataTransfer.files
    handleFileSelect(files)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Gestion des médias</h3>

      {/* Zone d'upload */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="hidden"
        />
        
        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 mb-2">
          Glissez-déposez vos fichiers ici ou{' '}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-blue-600 hover:text-blue-500 font-medium"
            disabled={uploading}
          >
            cliquez pour sélectionner
          </button>
        </p>
        <p className="text-xs text-gray-500">
          Images et vidéos supportées • Max 50MB par fichier
        </p>
        
        {uploading && (
          <div className="mt-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-xs text-gray-500 mt-1">Upload en cours...</p>
          </div>
        )}
      </div>

      {/* Images */}
      {images.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
            <ImageIcon className="w-4 h-4 mr-2" />
            Images ({images.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.originalName}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Overlay avec actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <button
                      onClick={() => handleCoverImageSet(image.url)}
                      className={`p-2 rounded-full transition-colors ${
                        coverImage === image.url
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                      title={coverImage === image.url ? 'Image de couverture' : 'Définir comme couverture'}
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Informations */}
                <div className="mt-1">
                  <p className="text-xs text-gray-600 truncate" title={image.originalName}>
                    {image.originalName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(image.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vidéos */}
      {videos.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
            <Video className="w-4 h-4 mr-2" />
            Vidéos ({videos.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="relative group">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <video
                    src={video.url}
                    className="w-full h-full object-cover"
                    controls
                  />
                </div>
                
                {/* Overlay avec actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <button
                      onClick={() => handleCoverImageSet(video.url)}
                      className={`p-2 rounded-full transition-colors ${
                        coverImage === video.url
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                      title={coverImage === video.url ? 'Vidéo de couverture' : 'Définir comme couverture'}
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Informations */}
                <div className="mt-1">
                  <p className="text-sm text-gray-900 truncate" title={video.originalName}>
                    {video.originalName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(video.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* État vide */}
      {images.length === 0 && videos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <p>Aucun média uploadé pour ce projet</p>
          <p className="text-sm">Utilisez la zone d&apos;upload ci-dessus pour ajouter des images et vidéos</p>
        </div>
      )}
    </div>
  )
}
