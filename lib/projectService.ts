import { Project } from './types'
import { mediaService } from './mediaService'
import fs from 'fs'
import path from 'path'

// Fichier de sauvegarde
const DATA_DIR = path.join(process.cwd(), 'data')
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json')

// Configuration pour la sauvegarde sécurisée
const MAX_RETRIES = 3
const RETRY_DELAY = 100

// Utiliser globalThis pour persister les données entre les requêtes
declare global {
  // eslint-disable-next-line no-var
  var __projectsStore: Project[] | undefined
  // eslint-disable-next-line no-var
  var __isLoading: boolean | undefined
}

// Stockage global persistant
const projects: Project[] = globalThis.__projectsStore || []
if (!globalThis.__projectsStore) {
  globalThis.__projectsStore = projects
}

/**
 * Attendre un délai
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Charger les projets depuis le fichier
function loadProjects(): void {
  // Éviter les chargements multiples
  if (globalThis.__isLoading) return
  globalThis.__isLoading = true

  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      const data = fs.readFileSync(PROJECTS_FILE, 'utf-8')
      const loadedProjects: Project[] = JSON.parse(data)
      
      // Nettoyer et recharger complètement
      projects.splice(0, projects.length, ...loadedProjects)
      globalThis.__projectsStore = projects
      
      if (process.env.NODE_ENV === 'development') {
      }
    } else {
      if (process.env.NODE_ENV === 'development') {
      }
    }
  } catch (error) {
    console.error('❌ Erreur lors du chargement des projets:', error)
  } finally {
    globalThis.__isLoading = false
  }
}

// Sauvegarder les projets dans le fichier avec méthode sécurisée
async function saveProjects(): Promise<void> {
  const jsonContent = JSON.stringify(projects, null, 2)
  
  // Créer le dossier si nécessaire
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true, mode: 0o755 })
  }
  
  // Stratégie 1: Sauvegarde atomique avec retry
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const tempFile = `${PROJECTS_FILE}.tmp.${Date.now()}.${process.pid}`
      fs.writeFileSync(tempFile, jsonContent, { mode: 0o644 })
      
      // Forcer la synchronisation avant le rename
      const fd = fs.openSync(tempFile, 'r+')
      fs.fsyncSync(fd)
      fs.closeSync(fd)
      
      // Rename atomique
      fs.renameSync(tempFile, PROJECTS_FILE)
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ Sauvegarde projects.json réussie (tentative ${attempt})`)
      }
      return
      
    } catch (error: any) {
      if (error.code === 'EBUSY' && attempt < MAX_RETRIES) {
        console.warn(`⚠️ EBUSY détecté, retry ${attempt}/${MAX_RETRIES} pour projects.json`)
        await sleep(RETRY_DELAY * attempt)
        continue
      }
      
      console.warn(`❌ Échec sauvegarde atomique projects.json: ${error.message}`)
      break
    }
  }
  
  // Stratégie 2: Sauvegarde directe (fallback pour Docker)
  try {
    console.log(`🔄 Fallback: sauvegarde directe pour projects.json`)
    
    // Backup l'ancien fichier si il existe
    if (fs.existsSync(PROJECTS_FILE)) {
      const backupPath = `${PROJECTS_FILE}.backup.${Date.now()}`
      fs.copyFileSync(PROJECTS_FILE, backupPath)
    }
    
    // Écriture directe
    fs.writeFileSync(PROJECTS_FILE, jsonContent, { mode: 0o644 })
    
    console.log(`✅ Sauvegarde directe projects.json réussie`)
    
  } catch (directError: any) {
    console.error(`💥 Échec total sauvegarde projects.json:`, directError.message)
    throw new Error(`Impossible de sauvegarder projects.json: ${directError.message}`)
  }
}

// Initialiser les données au démarrage du module (une seule fois)
if (!globalThis.__isLoading && projects.length === 0) {
  loadProjects()
}

// Générateur d'ID séquentiel intelligent
function generateNextId(): string {
  if (projects.length === 0) return '1'
  
  // Trouver le plus grand ID numérique existant
  const numericIds = projects
    .map(p => parseInt(p.id))
    .filter(id => !isNaN(id))
  
  if (numericIds.length === 0) return '1'
  
  const maxId = Math.max(...numericIds)
  return (maxId + 1).toString()
}

export class ProjectService {
  // Initialiser le service (charger les données si nécessaire)
  private static initialize(): void {
    if (projects.length === 0 && !globalThis.__isLoading) {
      loadProjects()
    }
  }

  static getAllProjects(): Project[] {
    this.initialize()
    
    if (process.env.NODE_ENV === 'development') {
    }
    
    // Ajouter les médias en temps réel pour chaque projet
    const enrichedProjects = projects.map(project => {
      const images = mediaService.getProjectImages(project.id)
      const videos = mediaService.getProjectVideos(project.id)
      
      // Auto-définir l'image de couverture si aucune n'est définie
      let coverImage = project.coverImage
      if (!coverImage && images && images.length > 0 && images[0]) {
        coverImage = images[0]!.url
        // Mettre à jour le projet avec la nouvelle coverImage
        project.coverImage = coverImage
      } else if (!coverImage && videos && videos.length > 0 && videos[0]) {
        coverImage = videos[0]!.url
        // Mettre à jour le projet avec la nouvelle coverImage
        project.coverImage = coverImage
      }
      
      return {
        ...project,
        images,
        videos,
        coverImage
      }
    })

    // Synchroniser avec le store global
    globalThis.__projectsStore = projects
    
    return enrichedProjects
  }

  static getProjectById(id: string): Project | undefined {
    const project = projects.find(project => project.id === id)
    if (!project) {
      if (process.env.NODE_ENV === 'development') {
      }
      return undefined
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`📋 ProjectService: Récupération projet ${id}`) // Debug
    }
    
    // Ajouter les médias en temps réel
    const images = mediaService.getProjectImages(project.id)
    const videos = mediaService.getProjectVideos(project.id)
    
    // Auto-définir l'image de couverture si aucune n'est définie
    let coverImage = project.coverImage
    if (!coverImage && images && images.length > 0 && images[0]) {
      coverImage = images[0]!.url
    } else if (!coverImage && videos && videos.length > 0 && videos[0]) {
      coverImage = videos[0]!.url
    }
    
    const fullProject = {
      ...project,
      images,
      videos,
      coverImage
    }
    
    if (process.env.NODE_ENV === 'development') {
    }
    return fullProject
  }

  static async createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    this.initialize()
    
    const newProject: Project = {
      ...projectData,
      id: generateNextId(),
      images: [],
      videos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    projects.push(newProject)
    globalThis.__projectsStore = projects // Synchroniser avec le store global
    
    // Sauvegarder de façon asynchrone
    await saveProjects()
    
    if (process.env.NODE_ENV === 'development') {
    }
    
    return newProject
  }

  static async updateProject(id: string, projectData: Partial<Project>): Promise<Project | null> {
    const index = projects.findIndex(project => project.id === id)
    if (index === -1) return null

    const prev = projects[index]!
    const updated: Project = {
      ...prev,
      ...projectData,
      id, // Garder l'ID original
      title: projectData.title ?? prev.title,
      description: projectData.description ?? prev.description,
      technologies: projectData.technologies ?? prev.technologies,
      tags: projectData.tags ?? prev.tags,
      status: projectData.status ?? prev.status,
      featured: projectData.featured ?? prev.featured,
      customFields: projectData.customFields ?? prev.customFields,
      coverImage: projectData.coverImage ?? prev.coverImage,
      images: prev.images,
      videos: prev.videos,
      duration: projectData.duration ?? prev.duration,
      teamSize: projectData.teamSize ?? prev.teamSize,
      scope: projectData.scope ?? prev.scope,
      createdAt: prev.createdAt,
      updatedAt: new Date().toISOString()
    }
    projects[index] = updated
    
    globalThis.__projectsStore = projects // Synchroniser avec le store global
    await saveProjects() // Sauvegarder après mise à jour de façon asynchrone
    
    // Retourner avec les médias actuels
    const updatedAfter = projects[index]!
    return {
      ...updatedAfter,
      images: mediaService.getProjectImages(id),
      videos: mediaService.getProjectVideos(id)
    }
  }

  static async deleteProject(id: string): Promise<boolean> {
    this.initialize()
    
    const index = projects.findIndex(project => project.id === id)
    if (index === -1) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Project not found for deletion:', id)
      }
      return false
    }

    if (process.env.NODE_ENV === 'development') {
      const projectTitle = projects[index] ? projects[index]!.title : 'Unknown'
      console.log('Deleting project:', projectTitle)
    }
    
    // Supprimer tous les médias associés (suppression en cascade)
    mediaService.deleteAllProjectMedia(id)

    // Supprimer le projet
    projects.splice(index, 1)
    globalThis.__projectsStore = projects // Synchroniser avec le store global
    
    // Sauvegarder de façon asynchrone
    await saveProjects()
    
    if (process.env.NODE_ENV === 'development') {
    }
    
    return true
  }

  // Définir l'image de couverture
  static async setCoverImage(projectId: string, imageUrl: string): Promise<Project | null> {
    const project = projects.find(p => p.id === projectId)
    if (!project) return null

    project.coverImage = imageUrl
    project.updatedAt = new Date().toISOString()
    globalThis.__projectsStore = projects // Synchroniser avec le store global

    await saveProjects() // Sauvegarder après mise à jour image de couverture de façon asynchrone

    return {
      ...project,
      images: mediaService.getProjectImages(projectId),
      videos: mediaService.getProjectVideos(projectId)
    }
  }

  // Méthode utilitaire pour obtenir le nombre total de projets
  static getProjectCount(): number {
    return projects.length
  }

  // Méthode pour valider qu'un ID existe
  static validateProjectId(id: string): boolean {
    return projects.some(project => project.id === id)
  }

  // Obtenir les statistiques des projets
  static getProjectStats() {
    const totalProjects = projects.length
    const totalImages = projects.reduce((sum, project) => 
      sum + mediaService.getProjectImages(project.id).length, 0
    )
    const totalVideos = projects.reduce((sum, project) => 
      sum + mediaService.getProjectVideos(project.id).length, 0
    )
    const totalSize = projects.reduce((sum, project) => 
      sum + mediaService.getProjectMediaSize(project.id), 0
    )

    return {
      totalProjects,
      totalImages,
      totalVideos,
      totalSize: mediaService.formatFileSize(totalSize),
      totalSizeBytes: totalSize
    }
  }
}
