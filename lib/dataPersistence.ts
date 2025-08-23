import fs from 'fs'
import path from 'path'
import { Project } from './types'

export interface MediaData {
  id: string
  filename: string
  path: string
  size: number
  mimeType: string
  uploadedAt: string
}

class DataPersistence {
  private dataDir = path.join(process.cwd(), 'data')
  private projectsFile = path.join(this.dataDir, 'projects.json')
  private mediaFile = path.join(this.dataDir, 'media.json')

  constructor() {
    this.ensureDataDirectory()
    this.initializeFiles()
  }

  private ensureDataDirectory() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true })
    }
  }

  private initializeFiles() {
    // Initialisation du fichier projects.json
    if (!fs.existsSync(this.projectsFile)) {
      const defaultProjects: Project[] = [
        {
          id: '1',
          title: 'E-commerce Moderne',
          description: 'Plateforme e-commerce complète avec React et Node.js optimisée pour les performances',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          tags: ['e-commerce', 'web'],
          status: 'published',
          coverImage: '/uploads/project1-cover.jpg',
          images: [],
          videos: [],
          duration: '3 mois',
          teamSize: '1 développeur',
          scope: 'Full-stack',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Application Mobile Banking',
          description: 'Application mobile bancaire sécurisée avec authentification biométrique',
          technologies: ['React Native', 'Node.js', 'PostgreSQL'],
          tags: ['mobile', 'finance'],
          status: 'published',
          coverImage: '/uploads/project2-cover.jpg',
          images: [],
          videos: [],
          duration: '4 mois',
          teamSize: '1 développeur',
          scope: 'Mobile',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ]
      this.saveProjects(defaultProjects)
    }

    // Initialisation du fichier media.json
    if (!fs.existsSync(this.mediaFile)) {
      this.saveMedia([])
    }
  }

  // Méthodes pour les projets
  getProjects(): Project[] {
    try {
      const data = fs.readFileSync(this.projectsFile, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      console.error('Erreur lors de la lecture des projets:', error)
      return []
    }
  }

  saveProjects(projects: Project[]): void {
    try {
      fs.writeFileSync(this.projectsFile, JSON.stringify(projects, null, 2))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des projets:', error)
      throw new Error('Impossible de sauvegarder les projets')
    }
  }

  addProject(project: Project): void {
    const projects = this.getProjects()
    projects.push(project)
    this.saveProjects(projects)
  }

  updateProject(id: string, updatedProject: Partial<Project>): Project | null {
    const projectsArr = this.getProjects()
    const index = projectsArr.findIndex(p => p.id === id)
    if (index === -1) return null

  const prev = projectsArr[index]!
    const updated: Project = {
      ...prev,
      ...updatedProject,
      id: prev.id,
      title: updatedProject.title ?? prev.title,
      description: updatedProject.description ?? prev.description,
      technologies: updatedProject.technologies ?? prev.technologies,
      tags: updatedProject.tags ?? prev.tags,
      coverImage: updatedProject.coverImage ?? prev.coverImage,
      images: updatedProject.images ?? prev.images,
      videos: updatedProject.videos ?? prev.videos,
      duration: updatedProject.duration ?? prev.duration,
      teamSize: updatedProject.teamSize ?? prev.teamSize,
      scope: updatedProject.scope ?? prev.scope,
      createdAt: prev.createdAt,
      updatedAt: new Date().toISOString(),
    }
    projectsArr[index] = updated
    this.saveProjects(projectsArr)
    return updated
  }

  deleteProject(id: string): boolean {
    const projects = this.getProjects()
    const filteredProjects = projects.filter(p => p.id !== id)
    
    if (filteredProjects.length === projects.length) return false
    
    this.saveProjects(filteredProjects)
    return true
  }

  // Méthodes pour les médias
  getMedia(): MediaData[] {
    try {
      const data = fs.readFileSync(this.mediaFile, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      console.error('Erreur lors de la lecture des médias:', error)
      return []
    }
  }

  saveMedia(media: MediaData[]): void {
    try {
      fs.writeFileSync(this.mediaFile, JSON.stringify(media, null, 2))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des médias:', error)
      throw new Error('Impossible de sauvegarder les médias')
    }
  }

  addMedia(mediaData: MediaData): void {
    const media = this.getMedia()
    media.push(mediaData)
    this.saveMedia(media)
  }

  deleteMedia(id: string): boolean {
    const media = this.getMedia()
    const filteredMedia = media.filter(m => m.id !== id)
    
    if (filteredMedia.length === media.length) return false
    
    this.saveMedia(filteredMedia)
    return true
  }
}

export const dataPersistence = new DataPersistence()
export default dataPersistence
