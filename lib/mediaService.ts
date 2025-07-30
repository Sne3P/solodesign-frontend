import { ProjectImage, ProjectVideo } from './types'
import { dataPersistence } from './dataPersistence'
import fs from 'fs'
import path from 'path'

class MediaService {
  private uploadDir = path.join(process.cwd(), 'public', 'uploads')
  private projectImages: Map<string, ProjectImage[]> = new Map()
  private projectVideos: Map<string, ProjectVideo[]> = new Map()

  constructor() {
    // Créer le dossier uploads s'il n'existe pas
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true })
    }

    // Charger les médias sauvegardés
    this.loadMediaData()
  }

  // Charger les données depuis le fichier
  private loadMediaData(): void {
    try {
      const mediaData = dataPersistence.loadMedia()
      
      // Convertir les objets en Map
      if (mediaData.images) {
        Object.entries(mediaData.images).forEach(([projectId, images]) => {
          this.projectImages.set(projectId, images as ProjectImage[])
        })
      }
      
      if (mediaData.videos) {
        Object.entries(mediaData.videos).forEach(([projectId, videos]) => {
          this.projectVideos.set(projectId, videos as ProjectVideo[])
        })
      }
    } catch (error) {
      console.error('Erreur chargement médias:', error)
    }
  }

  // Sauvegarder les données dans le fichier
  private saveMediaData(): void {
    try {
      const mediaData = {
        images: Object.fromEntries(this.projectImages),
        videos: Object.fromEntries(this.projectVideos)
      }
      dataPersistence.saveMedia(mediaData)
    } catch (error) {
      console.error('Erreur sauvegarde médias:', error)
    }
  }

  // Générer un ID unique pour les médias
  private generateMediaId(): string {
    return `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Obtenir une extension sécurisée
  private getFileExtension(filename: string): string {
    return path.extname(filename).toLowerCase()
  }

  // Vérifier si le type de fichier est autorisé
  private isAllowedFileType(mimeType: string): boolean {
    const allowedImages = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    const allowedVideos = ['video/mp4', 'video/webm', 'video/mov', 'video/avi']
    
    return [...allowedImages, ...allowedVideos].includes(mimeType)
  }

  // Sauvegarder un fichier et retourner les informations
  async saveFile(file: File, projectId: string): Promise<ProjectImage | ProjectVideo> {
    if (!this.isAllowedFileType(file.type)) {
      throw new Error('Type de fichier non autorisé')
    }

    const mediaId = this.generateMediaId()
    const extension = this.getFileExtension(file.name)
    const filename = `${mediaId}${extension}`
    const filePath = path.join(this.uploadDir, filename)

    // Convertir le File en Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Sauvegarder le fichier
    fs.writeFileSync(filePath, buffer)

    const mediaInfo = {
      id: mediaId,
      filename,
      originalName: file.name,
      url: `/uploads/${filename}`,
      size: file.size,
      mimeType: file.type,
      uploadedAt: new Date().toISOString()
    }

    // Ajouter aux collections appropriées
    if (file.type.startsWith('image/')) {
      const imageInfo = mediaInfo as ProjectImage
      if (!this.projectImages.has(projectId)) {
        this.projectImages.set(projectId, [])
      }
      this.projectImages.get(projectId)!.push(imageInfo)
      this.saveMediaData() // Sauvegarder après ajout
      return imageInfo
    } else {
      const videoInfo = mediaInfo as ProjectVideo
      if (!this.projectVideos.has(projectId)) {
        this.projectVideos.set(projectId, [])
      }
      this.projectVideos.get(projectId)!.push(videoInfo)
      this.saveMediaData() // Sauvegarder après ajout
      return videoInfo
    }
  }

  // Obtenir toutes les images d'un projet
  getProjectImages(projectId: string): ProjectImage[] {
    return this.projectImages.get(projectId) || []
  }

  // Obtenir toutes les vidéos d'un projet
  getProjectVideos(projectId: string): ProjectVideo[] {
    return this.projectVideos.get(projectId) || []
  }

  // Supprimer un fichier média
  deleteMedia(mediaId: string, projectId: string): boolean {
    try {
      // Chercher dans les images
      const images = this.projectImages.get(projectId) || []
      const imageIndex = images.findIndex(img => img.id === mediaId)
      
      if (imageIndex !== -1) {
        const image = images[imageIndex]
        const filePath = path.join(this.uploadDir, image.filename)
        
        // Supprimer le fichier physique
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
        
        // Supprimer de la collection
        images.splice(imageIndex, 1)
        this.saveMediaData() // Sauvegarder après suppression
        return true
      }

      // Chercher dans les vidéos
      const videos = this.projectVideos.get(projectId) || []
      const videoIndex = videos.findIndex(vid => vid.id === mediaId)
      
      if (videoIndex !== -1) {
        const video = videos[videoIndex]
        const filePath = path.join(this.uploadDir, video.filename)
        
        // Supprimer le fichier physique
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
        
        // Supprimer de la collection
        videos.splice(videoIndex, 1)
        this.saveMediaData() // Sauvegarder après suppression
        return true
      }

      return false
    } catch (error) {
      console.error('Erreur lors de la suppression du média:', error)
      return false
    }
  }

  // Supprimer tous les médias d'un projet (suppression en cascade)
  deleteAllProjectMedia(projectId: string): void {
    try {
      // Supprimer toutes les images
      const images = this.projectImages.get(projectId) || []
      images.forEach(image => {
        const filePath = path.join(this.uploadDir, image.filename)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      })
      this.projectImages.delete(projectId)

      // Supprimer toutes les vidéos
      const videos = this.projectVideos.get(projectId) || []
      videos.forEach(video => {
        const filePath = path.join(this.uploadDir, video.filename)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      })
      this.projectVideos.delete(projectId)

      // Sauvegarder après suppression en cascade
      this.saveMediaData()

    } catch (error) {
      console.error('Erreur lors de la suppression en cascade:', error)
    }
  }

  // Nettoyer les fichiers orphelins (fichiers sans projet associé)
  cleanOrphanedFiles(): void {
    try {
      const allFiles = fs.readdirSync(this.uploadDir)
      const usedFiles = new Set<string>()

      // Collecter tous les fichiers utilisés
      this.projectImages.forEach(images => {
        images.forEach(image => usedFiles.add(image.filename))
      })
      this.projectVideos.forEach(videos => {
        videos.forEach(video => usedFiles.add(video.filename))
      })

      // Supprimer les fichiers non utilisés
      allFiles.forEach(filename => {
        if (!usedFiles.has(filename)) {
          const filePath = path.join(this.uploadDir, filename)
          fs.unlinkSync(filePath)
          console.log(`Fichier orphelin supprimé: ${filename}`)
        }
      })
    } catch (error) {
      console.error('Erreur lors du nettoyage:', error)
    }
  }

  // Obtenir la taille totale des médias d'un projet
  getProjectMediaSize(projectId: string): number {
    const images = this.projectImages.get(projectId) || []
    const videos = this.projectVideos.get(projectId) || []
    
    const imageSize = images.reduce((total, img) => total + img.size, 0)
    const videoSize = videos.reduce((total, vid) => total + vid.size, 0)
    
    return imageSize + videoSize
  }

  // Formater la taille en lecture humaine
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
}

export const mediaService = new MediaService()
