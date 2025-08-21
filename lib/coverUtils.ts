import { Project } from './types'

/**
 * Utilitaires pour la gestion des images de couverture des projets
 */

export function getProjectCoverMedia(project: Project): string | null {
  // 1. Si une coverImage est explicitement définie, l'utiliser
  if (project.coverImage) {
    return project.coverImage
  }

  // 2. Sinon, prendre la première vidéo s'il y en a
  if (project.videos && project.videos.length > 0) {
    return project.videos[0].url
  }

  // 3. Sinon, prendre la première image s'il y en a
  if (project.images && project.images.length > 0) {
    return project.images[0].url
  }

  // 4. Aucun média trouvé
  return null
}

export function getProjectCoverMediaWithFallback(project: Project, fallback: string = '/placeholder.svg'): string {
  return getProjectCoverMedia(project) || fallback
}

export function isVideoMedia(url: string): boolean {
  if (!url) return false
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv']
  return videoExtensions.some(ext => url.toLowerCase().includes(ext))
}

export function isImageMedia(url: string): boolean {
  if (!url) return false
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']
  return imageExtensions.some(ext => url.toLowerCase().includes(ext))
}

/**
 * Obtient le type de média de couverture
 */
export function getCoverMediaType(project: Project): 'image' | 'video' | 'none' {
  const coverUrl = getProjectCoverMedia(project)
  
  if (!coverUrl) return 'none'
  
  if (isVideoMedia(coverUrl)) return 'video'
  if (isImageMedia(coverUrl)) return 'image'
  
  return 'image' // Par défaut, traiter comme une image
}

/**
 * Définit automatiquement une image de couverture si aucune n'est définie
 * Privilégie les images, puis les vidéos
 */
export function autoSetCoverImage(project: Project): string | null {
  // Si déjà définie, ne rien faire
  if (project.coverImage) {
    return project.coverImage
  }

  // Prioriser les images pour la couverture
  if (project.images && project.images.length > 0) {
    return project.images[0].url
  }

  // Utiliser la première vidéo comme fallback
  if (project.videos && project.videos.length > 0) {
    return project.videos[0].url
  }

  return null
}

/**
 * Obtient toutes les options de média de couverture disponibles
 */
export function getCoverMediaOptions(project: Project): Array<{url: string, type: 'image' | 'video', name: string}> {
  const options: Array<{url: string, type: 'image' | 'video', name: string}> = []

  // Ajouter toutes les images
  if (project.images) {
    project.images.forEach((image, index) => {
      options.push({
        url: image.url,
        type: 'image',
        name: image.originalName || `Image ${index + 1}`
      })
    })
  }

  // Ajouter toutes les vidéos
  if (project.videos) {
    project.videos.forEach((video, index) => {
      options.push({
        url: video.url,
        type: 'video',
        name: video.originalName || `Vidéo ${index + 1}`
      })
    })
  }

  return options
}
