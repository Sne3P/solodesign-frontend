import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '../../../lib/projectService'
import { AuthService } from '../../../lib/authService'
import { validateProjectData } from '../../../lib/validation-optimized'

// GET - Récupérer tous les projets (public)
export async function GET() {
  try {
    const projects = ProjectService.getAllProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('💥 API Projects: Erreur lors de la récupération:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// POST - Créer un nouveau projet (nécessite authentification)
export async function POST(request: NextRequest) {
  try {
    // Vérification de l'authentification
    const token = request.cookies.get('admin_token')?.value || 
                 request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Token d\'authentification requis' },
        { status: 401 }
      )
    }

    if (!AuthService.verifyToken(token)) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      )
    }

    const projectData = await request.json()
    // Validation avec zod (preprocessing automatique intégré)
    const validatedData = validateProjectData(projectData)
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validatedData.error },
        { status: 400 }
      )
    }

    // Création du projet avec données validées
    const newProject = await ProjectService.createProject(validatedData.data!)
    return NextResponse.json({
      success: true,
      project: newProject,
      message: 'Projet créé avec succès'
    }, { status: 201 })
  } catch (error) {
    console.error('💥 API Projects: Erreur lors de la création:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la création' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour un projet (nécessite authentification)
export async function PUT(request: NextRequest) {
  try {
    // Vérification de l'authentification
    const token = request.cookies.get('admin_token')?.value || 
                 request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Token d\'authentification requis' },
        { status: 401 }
      )
    }

    if (!AuthService.verifyToken(token)) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      )
    }

    const rawData = await request.json()
    const { id, ...projectData } = rawData
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID du projet requis' },
        { status: 400 }
      )
    }
    // Validation avec zod (preprocessing automatique intégré)
    const validatedData = validateProjectData(projectData)
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validatedData.error },
        { status: 400 }
      )
    }

    const updatedProject = await ProjectService.updateProject(id, validatedData.data!)
    
    if (!updatedProject) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }
    return NextResponse.json({
      success: true,
      project: updatedProject,
      message: 'Projet mis à jour avec succès'
    })
  } catch (error) {
    console.error('💥 API Projects: Erreur lors de la mise à jour:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la mise à jour' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un projet (nécessite authentification)
export async function DELETE(request: NextRequest) {
  try {
    // Vérification de l'authentification
    const token = request.cookies.get('admin_token')?.value || 
                 request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Token d\'authentification requis' },
        { status: 401 }
      )
    }

    if (!AuthService.verifyToken(token)) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('id')
    
    if (!projectId) {
      return NextResponse.json(
        { error: 'ID du projet requis' },
        { status: 400 }
      )
    }
    const deleted = await ProjectService.deleteProject(projectId)
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }
    return NextResponse.json({ message: 'Projet supprimé avec succès' })
  } catch (error) {
    console.error('💥 API Projects: Erreur lors de la suppression:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la suppression' },
      { status: 500 }
    )
  }
}
