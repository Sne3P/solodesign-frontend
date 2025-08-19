import { isValidUrl, getMediaType } from '@/lib/mediaUtils'

/**
 * Service de vérification et gestion des chemins de médias
 */
export class MediaPathService {
  
  /**
   * Chemins statiques valides dans le projet
   */
  private static validStaticPaths = [
    '/placeholder.png',
    '/logo_white_png.png',
    '/robots.txt',
    '/sitemap.xml',
    '/manifest.json'
  ]

  /**
   * Extensions de fichiers autorisées pour les uploads
   */
  private static allowedUploadExtensions = [
    // Images
    '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp',
    // Vidéos
    '.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv'
  ]

  /**
   * Vérifie si un chemin d'upload est valide
   */
  static isValidUploadPath(path: string): boolean {
    if (!path) return false
    
    // Vérifier si c'est un chemin d'upload
    if (!path.startsWith('/uploads/')) return false
    
    // Vérifier l'extension
    const extension = path.toLowerCase().substring(path.lastIndexOf('.'))
    return this.allowedUploadExtensions.includes(extension)
  }

  /**
   * Vérifie si un chemin statique existe
   */
  static isValidStaticPath(path: string): boolean {
    if (!path) return false
    return this.validStaticPaths.includes(path)
  }

  /**
   * Obtient le chemin de fallback approprié selon le type de média
   */
  static getFallbackPath(originalPath: string): string {
    const mediaType = getMediaType(originalPath)
    
    switch (mediaType) {
      case 'video':
        return '/placeholder.png' // Ou une miniature vidéo par défaut
      case 'image':
        return '/placeholder.png'
      default:
        return '/placeholder.png'
    }
  }

  /**
   * Valide et nettoie un chemin de média
   */
  static validateAndCleanPath(path: string): {
    isValid: boolean
    cleanedPath: string
    mediaType: 'image' | 'video' | 'unknown'
    fallbackPath: string
  } {
    if (!path) {
      return {
        isValid: false,
        cleanedPath: '',
        mediaType: 'unknown',
        fallbackPath: this.getFallbackPath('')
      }
    }

    // Nettoyer le chemin
    const cleanedPath = path.trim()
    const mediaType = getMediaType(cleanedPath)
    
    // Vérifier la validité
    const isValid = 
      isValidUrl(cleanedPath) || 
      this.isValidStaticPath(cleanedPath) || 
      this.isValidUploadPath(cleanedPath)

    return {
      isValid,
      cleanedPath,
      mediaType,
      fallbackPath: this.getFallbackPath(cleanedPath)
    }
  }

  /**
   * Génère une URL de prévisualisation sécurisée
   */
  static getPreviewUrl(path: string): string {
    const validation = this.validateAndCleanPath(path)
    
    if (!validation.isValid) {
      return validation.fallbackPath
    }

    // Pour les chemins relatifs, s'assurer qu'ils commencent par /
    if (!path.startsWith('http') && !path.startsWith('/')) {
      return `/${path}`
    }

    return validation.cleanedPath
  }

  /**
   * Vérifie si un fichier existe (pour le côté client)
   */
  static async checkFileExists(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      return response.ok
    } catch {
      return false
    }
  }

  /**
   * Obtient des informations détaillées sur un média
   */
  static getMediaInfo(path: string) {
    const validation = this.validateAndCleanPath(path)
    
    return {
      ...validation,
      isUpload: path.startsWith('/uploads/'),
      isStatic: this.isValidStaticPath(path),
      isExternal: path.startsWith('http'),
      previewUrl: this.getPreviewUrl(path),
      fileName: path.split('/').pop() || '',
      extension: path.substring(path.lastIndexOf('.')) || ''
    }
  }

  /**
   * Génère un nom de fichier unique pour les uploads
   */
  static generateUniqueFileName(originalName: string): string {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = originalName.substring(originalName.lastIndexOf('.'))
    
    return `media_${timestamp}_${randomString}${extension}`
  }

  /**
   * Valide la taille et le type de fichier pour les uploads
   */
  static validateUploadFile(file: File): {
    isValid: boolean
    error?: string
    mediaType: 'image' | 'video' | 'unknown'
  } {
    // Taille max : 50MB pour vidéos, 10MB pour images
    const maxSizeVideo = 50 * 1024 * 1024 // 50MB
    const maxSizeImage = 10 * 1024 * 1024 // 10MB
    
    const mediaType = getMediaType(file.name)
    
    if (mediaType === 'unknown') {
      return {
        isValid: false,
        error: 'Type de fichier non supporté',
        mediaType
      }
    }

    const maxSize = mediaType === 'video' ? maxSizeVideo : maxSizeImage
    
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024))
      return {
        isValid: false,
        error: `Fichier trop volumineux. Taille maximum: ${maxSizeMB}MB`,
        mediaType
      }
    }

    return {
      isValid: true,
      mediaType
    }
  }
}
