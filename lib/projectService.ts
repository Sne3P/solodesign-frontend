import { Project } from './types'

// Stockage en mémoire pour la démonstration
// En production, vous devriez utiliser une vraie base de données
let projects: Project[] = [
  {
    id: '1',
    title: 'Projet E-commerce Moderne',
    description: 'Une plateforme e-commerce complète avec paiements intégrés et gestion des stocks en temps réel.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    tags: ['E-commerce', 'Full-stack', 'Responsive'],
    coverImage: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
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
    coverImage: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg'],
    videos: [],
    duration: '8 mois',
    teamSize: '8 personnes',
    scope: 'Internationale',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export class ProjectService {
  static getAllProjects(): Project[] {
    return projects
  }

  static getProjectById(id: string): Project | undefined {
    return projects.find(project => project.id === id)
  }

  static createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    projects.push(newProject)
    return newProject
  }

  static updateProject(id: string, projectData: Partial<Project>): Project | null {
    const index = projects.findIndex(project => project.id === id)
    if (index === -1) return null

    projects[index] = {
      ...projects[index],
      ...projectData,
      updatedAt: new Date().toISOString()
    }
    return projects[index]
  }

  static deleteProject(id: string): boolean {
    const index = projects.findIndex(project => project.id === id)
    if (index === -1) return false

    projects.splice(index, 1)
    return true
  }
}
