import { Project } from './types'
import { mediaService } from './mediaService'
import { dataPersistence } from './dataPersistence'

// Stockage en mémoire pour la démonstration
// En production, vous devriez utiliser une vraie base de données
let projects: Project[] = []

// Charger les projets au démarrage
function loadProjects(): void {
  projects = dataPersistence.loadProjects()
}

// Sauvegarder les projets
function saveProjects(): void {
  dataPersistence.saveProjects(projects)
}

// Initialiser les données
loadProjects()

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

// Réorganiser les IDs pour éviter les trous
function reorganizeIds(): void {
  projects.forEach((project, index) => {
    const oldId = project.id
    const newId = (index + 1).toString()
    
    if (oldId !== newId) {
      // Migrer les médias si l'ID change
      // Note: Dans un système réel, il faudrait migrer physiquement les fichiers
      project.id = newId
    }
    
    project.updatedAt = new Date().toISOString()
  })
}

export class ProjectService {
  static getAllProjects(): Project[] {
    // Ajouter les médias en temps réel pour chaque projet
    return projects.map(project => ({
      ...project,
      images: mediaService.getProjectImages(project.id),
      videos: mediaService.getProjectVideos(project.id)
    }))
  }

  static getProjectById(id: string): Project | undefined {
    const project = projects.find(project => project.id === id)
    if (!project) {
      console.log(`❌ ProjectService: Projet ${id} non trouvé`) // Debug
      return undefined
    }
    
    console.log(`📋 ProjectService: Récupération projet ${id}`) // Debug
    
    // Ajouter les médias en temps réel
    const images = mediaService.getProjectImages(project.id)
    const videos = mediaService.getProjectVideos(project.id)
    
    const fullProject = {
      ...project,
      images,
      videos
    }
    
    console.log(`✅ ProjectService: Projet ${id} avec ${images.length} images et ${videos.length} vidéos`) // Debug
    return fullProject
  }

  static createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
    const newProject: Project = {
      ...projectData,
      id: generateNextId(),
      images: [],
      videos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    projects.push(newProject)
    saveProjects() // Sauvegarder après création
    return newProject
  }

  static updateProject(id: string, projectData: Partial<Project>): Project | null {
    const index = projects.findIndex(project => project.id === id)
    if (index === -1) return null

    projects[index] = {
      ...projects[index],
      ...projectData,
      id, // Garder l'ID original
      updatedAt: new Date().toISOString()
    }
    
    saveProjects() // Sauvegarder après mise à jour
    
    // Retourner avec les médias actuels
    return {
      ...projects[index],
      images: mediaService.getProjectImages(id),
      videos: mediaService.getProjectVideos(id)
    }
  }

  static deleteProject(id: string): boolean {
    const index = projects.findIndex(project => project.id === id)
    if (index === -1) return false

    // Supprimer tous les médias associés (suppression en cascade)
    mediaService.deleteAllProjectMedia(id)

    projects.splice(index, 1)
    
    // Réorganiser les IDs après suppression
    reorganizeIds()
    
    saveProjects() // Sauvegarder après suppression
    
    return true
  }

  // Définir l'image de couverture
  static setCoverImage(projectId: string, imageUrl: string): Project | null {
    const project = projects.find(p => p.id === projectId)
    if (!project) return null

    project.coverImage = imageUrl
    project.updatedAt = new Date().toISOString()

    saveProjects() // Sauvegarder après mise à jour image de couverture

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
