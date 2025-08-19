import fs from 'fs'
import path from 'path'
import { Project } from './types'

class DataPersistence {
  private dataDir = path.join(process.cwd(), 'data')
  private projectsFile = path.join(this.dataDir, 'projects.json')
  private mediaFile = path.join(this.dataDir, 'media.json')

  constructor() {
    // Créer le dossier data s'il n'existe pas
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true })
    }
  }

  // Sauvegarder les projets
  saveProjects(projects: Project[]): void {
    try {
      fs.writeFileSync(this.projectsFile, JSON.stringify(projects, null, 2))
    } catch (error) {
      console.error('Erreur sauvegarde projets:', error)
    }
  }

  // Charger les projets
  loadProjects(): Project[] {
    try {
      if (fs.existsSync(this.projectsFile)) {
        const data = fs.readFileSync(this.projectsFile, 'utf8')
        return JSON.parse(data)
      }
    } catch (error) {
      console.error('Erreur chargement projets:', error)
    }
    
    // Projets par défaut si le fichier n'existe pas
    return [
      {
        id: '1',
        title: 'Projet E-commerce Moderne',
        description: 'Une plateforme e-commerce complète avec paiements intégrés et gestion des stocks en temps réel.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
        tags: ['E-commerce', 'Full-stack', 'Responsive'],
  coverImage: '/placeholder.png',
        images: [],
        videos: [],
        duration: '6 mois',
        teamSize: '5 personnes',
        scope: 'Nationale',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Application Mobile Banking',
        description: 'Application bancaire sécurisée avec authentification biométrique et transactions en temps réel.',
        technologies: ['React Native', 'TypeScript', 'Firebase', 'Plaid API'],
        tags: ['Mobile', 'Fintech', 'Sécurité'],
  coverImage: '/placeholder.png',
        images: [],
        videos: [],
        duration: '8 mois',
        teamSize: '8 personnes',
        scope: 'Internationale',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  }

  // Sauvegarder les médias
  saveMedia(mediaData: any): void {
    try {
      fs.writeFileSync(this.mediaFile, JSON.stringify(mediaData, null, 2))
    } catch (error) {
      console.error('Erreur sauvegarde médias:', error)
    }
  }

  // Charger les médias
  loadMedia(): any {
    try {
      if (fs.existsSync(this.mediaFile)) {
        const data = fs.readFileSync(this.mediaFile, 'utf8')
        return JSON.parse(data)
      }
    } catch (error) {
      console.error('Erreur chargement médias:', error)
    }
    
    return { images: {}, videos: {} }
  }
}

export const dataPersistence = new DataPersistence()
