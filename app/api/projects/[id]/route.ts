import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '../../../../lib/projectService'
import { AuthService } from '../../../../lib/authService'

// GET - Récupérer un projet par ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    const project = ProjectService.getProjectById(id)
    
    if (!project) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour un projet (nécessite authentification)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token || !AuthService.verifyToken(token)) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { id } = await params
    const projectData = await request.json()

    // Traitement des technologies et tags
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

    const updatedProject = ProjectService.updateProject(id, projectData)
    
    if (!updatedProject) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedProject)

  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un projet (nécessite authentification)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token || !AuthService.verifyToken(token)) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { id } = await params
    const deleted = ProjectService.deleteProject(id)
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Projet supprimé avec succès' })

  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
