import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '../../../lib/projectService'
import { AuthService } from '../../../lib/authService'

// GET - Récupérer tous les projets
export async function GET() {
  try {
    const projects = ProjectService.getAllProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// POST - Créer un nouveau projet (nécessite authentification)
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token || !AuthService.verifyToken(token)) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const projectData = await request.json()
    
    // Validation basique
    if (!projectData.title || !projectData.description) {
      return NextResponse.json(
        { error: 'Titre et description requis' },
        { status: 400 }
      )
    }

    // Traitement des technologies et tags (conversion string vers array)
    if (typeof projectData.technologies === 'string') {
      projectData.technologies = projectData.technologies
        .split(',')
        .map((tech: string) => tech.trim())
        .filter((tech: string) => tech.length > 0)
    }

    if (typeof projectData.tags === 'string') {
      projectData.tags = projectData.tags
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0)
    }

    // Initialisation des champs manquants avec des valeurs par défaut
    const newProject = {
      ...projectData,
      coverImage: projectData.coverImage || '/placeholder.svg',
      images: projectData.images || [],
      videos: projectData.videos || [],
      technologies: projectData.technologies || [],
      tags: projectData.tags || [],
      duration: projectData.duration || 'Non spécifié',
      teamSize: projectData.teamSize || 'Non spécifié',
      scope: projectData.scope || 'Non spécifié'
    }

    const project = ProjectService.createProject(newProject)
    return NextResponse.json(project, { status: 201 })

  } catch (error) {
    console.error('Erreur lors de la création du projet:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
