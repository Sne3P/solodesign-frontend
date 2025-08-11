/**
 * Utilitaires pour la gestion des médias (images/vidéos)
 */

/**
 * Extensions de fichiers vidéo supportées
 */
const VIDEO_EXTENSIONS = [
  '.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv'
]

/**
 * Extensions de fichiers image supportées
 */
const IMAGE_EXTENSIONS = [
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff'
]

/**
 * Types MIME pour les vidéos
 */
const VIDEO_MIME_TYPES = [
  'video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/quicktime',
  'video/x-msvideo', 'video/x-flv', 'video/x-matroska'
]

/**
 * Types MIME pour les images
 */
const IMAGE_MIME_TYPES = [
  'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
  'image/svg+xml', 'image/bmp', 'image/tiff'
]

/**
 * Détermine si un fichier est une vidéo basé sur son URL/chemin
 * @param url - L'URL ou le chemin du fichier
 * @returns true si c'est une vidéo, false sinon
 */
export const isVideo = (url: string): boolean => {
  if (!url) return false
  
  const lowercaseUrl = url.toLowerCase()
  return VIDEO_EXTENSIONS.some(ext => lowercaseUrl.includes(ext))
}

/**
 * Détermine si un fichier est une image basé sur son URL/chemin
 * @param url - L'URL ou le chemin du fichier
 * @returns true si c'est une image, false sinon
 */
export const isImage = (url: string): boolean => {
  if (!url) return false
  
  const lowercaseUrl = url.toLowerCase()
  return IMAGE_EXTENSIONS.some(ext => lowercaseUrl.includes(ext))
}

/**
 * Détermine le type de média basé sur l'URL
 * @param url - L'URL ou le chemin du fichier
 * @returns 'video' | 'image' | 'unknown'
 */
export const getMediaType = (url: string): 'video' | 'image' | 'unknown' => {
  if (!url) return 'unknown'
  
  if (isVideo(url)) return 'video'
  if (isImage(url)) return 'image'
  return 'unknown'
}

/**
 * Détermine si un type MIME correspond à une vidéo
 * @param mimeType - Le type MIME à vérifier
 * @returns true si c'est une vidéo, false sinon
 */
export const isVideoMimeType = (mimeType: string): boolean => {
  if (!mimeType) return false
  return VIDEO_MIME_TYPES.includes(mimeType.toLowerCase())
}

/**
 * Détermine si un type MIME correspond à une image
 * @param mimeType - Le type MIME à vérifier
 * @returns true si c'est une image, false sinon
 */
export const isImageMimeType = (mimeType: string): boolean => {
  if (!mimeType) return false
  return IMAGE_MIME_TYPES.includes(mimeType.toLowerCase())
}

/**
 * Obtient l'extension d'un fichier à partir de son URL
 * @param url - L'URL du fichier
 * @returns L'extension du fichier (avec le point)
 */
export const getFileExtension = (url: string): string => {
  if (!url) return ''
  
  const lastDotIndex = url.lastIndexOf('.')
  const lastSlashIndex = url.lastIndexOf('/')
  
  // S'assurer que le point est après le dernier slash (pas dans le chemin)
  if (lastDotIndex > lastSlashIndex && lastDotIndex !== -1) {
    return url.substring(lastDotIndex)
  }
  
  return ''
}

/**
 * Vérifie si une URL est valide
 * @param url - L'URL à vérifier
 * @returns true si l'URL est valide, false sinon
 */
export const isValidUrl = (url: string): boolean => {
  if (!url) return false
  
  try {
    new URL(url)
    return true
  } catch {
    // Si ce n'est pas une URL complète, vérifier si c'est un chemin relatif valide
    return url.startsWith('/') || url.startsWith('./') || url.startsWith('../')
  }
}

/**
 * Obtient le nom du fichier à partir de son URL
 * @param url - L'URL du fichier
 * @returns Le nom du fichier
 */
export const getFileName = (url: string): string => {
  if (!url) return ''
  
  const lastSlashIndex = url.lastIndexOf('/')
  return lastSlashIndex !== -1 ? url.substring(lastSlashIndex + 1) : url
}
