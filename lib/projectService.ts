import { Project } from './types'
import { mediaService } from './mediaService'
import fs from 'fs'
import path from 'path'

// Fichier de sauvegarde
const DATA_DIR = path.join(process.cwd(), 'data')
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json')

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
      
      console.log(`📂 ProjectService: ${projects.length} projets chargés depuis le fichier`)
    } else {
      console.log('� ProjectService: Aucun fichier trouvé, démarrage avec 0 projets')
    }
  } catch (error) {
    console.error('❌ Erreur lors du chargement des projets:', error)
  } finally {
    globalThis.__isLoading = false
  }
}

// Sauvegarder les projets dans le fichier
function saveProjects(): void {
  try {
    // Créer le dossier si nécessaire
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    
    // Sauvegarder de manière atomique
    const tempFile = PROJECTS_FILE + '.tmp'
    fs.writeFileSync(tempFile, JSON.stringify(projects, null, 2))
    fs.renameSync(tempFile, PROJECTS_FILE)
    
    console.log(`💾 ProjectService: ${projects.length} projets sauvegardés`)
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde:', error)
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
    
    console.log(`📋 ProjectService: Récupération de ${projects.length} projets`);
    
    // Ajouter les médias en temps réel pour chaque projet
    const enrichedProjects = projects.map(project => {
      const images = mediaService.getProjectImages(project.id)
      const videos = mediaService.getProjectVideos(project.id)
      
      // Auto-définir l'image de couverture si aucune n'est définie
      let coverImage = project.coverImage
      if (!coverImage && images.length > 0) {
        coverImage = images[0].url
        // Mettre à jour le projet avec la nouvelle coverImage
        project.coverImage = coverImage
      } else if (!coverImage && videos.length > 0) {
        coverImage = videos[0].url
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
      console.log(`❌ ProjectService: Projet ${id} non trouvé`) // Debug
      return undefined
    }
    
    console.log(`📋 ProjectService: Récupération projet ${id}`) // Debug
    
    // Ajouter les médias en temps réel
    const images = mediaService.getProjectImages(project.id)
    const videos = mediaService.getProjectVideos(project.id)
    
    // Auto-définir l'image de couverture si aucune n'est définie
    let coverImage = project.coverImage
    if (!coverImage && images.length > 0) {
      coverImage = images[0].url
    } else if (!coverImage && videos.length > 0) {
      coverImage = videos[0].url
    }
    
    const fullProject = {
      ...project,
      images,
      videos,
      coverImage
    }
    
    console.log(`✅ ProjectService: Projet ${id} avec ${images.length} images et ${videos.length} vidéos`) // Debug
    return fullProject
  }

  static createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
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
    
    // Sauvegarder immédiatement
    saveProjects()
    
    console.log(`✅ ProjectService: Projet créé avec ID ${newProject.id}. Total: ${projects.length} projets`);
    console.log(`📝 ProjectService: Projets actuels:`, projects.map(p => ({ id: p.id, title: p.title })));
    
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
    
    globalThis.__projectsStore = projects // Synchroniser avec le store global
    saveProjects() // Sauvegarder après mise à jour
    
    // Retourner avec les médias actuels
    return {
      ...projects[index],
      images: mediaService.getProjectImages(id),
      videos: mediaService.getProjectVideos(id)
    }
  }

  static deleteProject(id: string): boolean {
    this.initialize()
    
    const index = projects.findIndex(project => project.id === id)
    if (index === -1) {
      console.log(`❌ ProjectService: Projet ${id} non trouvé pour suppression`)
      return false
    }

    const projectTitle = projects[index].title
    
    // Supprimer tous les médias associés (suppression en cascade)
    mediaService.deleteAllProjectMedia(id)

    // Supprimer le projet
    projects.splice(index, 1)
    globalThis.__projectsStore = projects // Synchroniser avec le store global
    
    // Sauvegarder immédiatement
    saveProjects()
    
    console.log(`🗑️ ProjectService: Projet "${projectTitle}" (ID: ${id}) supprimé. Reste ${projects.length} projets`)
    
    return true
  }

  // Définir l'image de couverture
  static setCoverImage(projectId: string, imageUrl: string): Project | null {
    const project = projects.find(p => p.id === projectId)
    if (!project) return null

    project.coverImage = imageUrl
    project.updatedAt = new Date().toISOString()
    globalThis.__projectsStore = projects // Synchroniser avec le store global

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
