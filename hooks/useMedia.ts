import { useState, useCallback } from 'react'
import { useNotifications } from '../contexts/NotificationContext'

export interface MediaFile {
  id: string
  filename: string
  originalName: string
  url: string
  type: 'image' | 'video'
  mimeType: string
  size: number
  projectId: string
  uploadedAt: string
}

export const useMedia = (projectId: string) => {
  const [uploading, setUploading] = useState(false)
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set())
  const { addNotification } = useNotifications()

  // Upload d'un fichier
  const uploadFile = useCallback(async (file: File): Promise<MediaFile | null> => {
    try {
      setUploading(true)
      console.log(`📤 useMedia: Upload de ${file.name} pour le projet ${projectId}`)

      // Validation côté client
      const maxSize = 50 * 1024 * 1024 // 50MB
      if (file.size > maxSize) {
        throw new Error('Fichier trop volumineux (max 50MB)')
      }

      const allowedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
        'video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'
      ]

      if (!allowedTypes.includes(file.type)) {
        throw new Error('Type de fichier non autorisé')
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('projectId', projectId)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Erreur HTTP: ${response.status}`)
      }

      const result = await response.json()
      console.log('✅ useMedia: Upload réussi:', result)

      addNotification({
        type: 'success',
        title: 'Upload réussi',
        message: `${file.name} a été uploadé avec succès`,
        duration: 3000
      })

      return result.file || result.media

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de l\'upload'
      console.error('💥 useMedia: Erreur upload:', error)
      
      addNotification({
        type: 'error',
        title: 'Erreur d\'upload',
        message: errorMessage
      })
      
      return null
    } finally {
      setUploading(false)
    }
  }, [projectId, addNotification])

  // Upload multiple de fichiers
  const uploadFiles = useCallback(async (files: FileList): Promise<MediaFile[]> => {
    const results: MediaFile[] = []
    
    for (const file of Array.from(files)) {
      const result = await uploadFile(file)
      if (result) {
        results.push(result)
      }
    }
    
    return results
  }, [uploadFile])

  // Suppression d'un fichier
  const deleteFile = useCallback(async (filename: string, fileId?: string): Promise<boolean> => {
    try {
      const id = fileId || filename
      setDeletingIds(prev => new Set(prev).add(id))
      
      console.log(`🗑️ useMedia: Suppression de ${filename}`)

      const response = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Erreur HTTP: ${response.status}`)
      }

      console.log('✅ useMedia: Suppression réussie')

      addNotification({
        type: 'success',
        title: 'Fichier supprimé',
        message: 'Le fichier a été supprimé avec succès',
        duration: 3000
      })

      return true

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la suppression'
      console.error('💥 useMedia: Erreur suppression:', error)
      
      addNotification({
        type: 'error',
        title: 'Erreur de suppression',
        message: errorMessage
      })
      
      return false
    } finally {
      const id = fileId || filename
      setDeletingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }, [addNotification])

  // Validation des fichiers avant upload
  const validateFiles = useCallback((files: FileList): { valid: File[], errors: string[] } => {
    const valid: File[] = []
    const errors: string[] = []
    const maxSize = 50 * 1024 * 1024 // 50MB
    
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
      'video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'
    ]

    Array.from(files).forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: Type de fichier non autorisé`)
      } else if (file.size > maxSize) {
        errors.push(`${file.name}: Fichier trop volumineux (max 50MB)`)
      } else {
        valid.push(file)
      }
    })

    return { valid, errors }
  }, [])

  // Formatage de la taille des fichiers
  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }, [])

  // Obtenir le type de média
  const getMediaType = useCallback((mimeType: string): 'image' | 'video' | 'unknown' => {
    if (mimeType.startsWith('image/')) return 'image'
    if (mimeType.startsWith('video/')) return 'video'
    return 'unknown'
  }, [])

  return {
    // État
    uploading,
    deletingIds,
    
    // Actions
    uploadFile,
    uploadFiles,
    deleteFile,
    
    // Utilitaires
    validateFiles,
    formatFileSize,
    getMediaType,
    
    // Helpers
    isDeleting: (id: string) => deletingIds.has(id)
  }
}
