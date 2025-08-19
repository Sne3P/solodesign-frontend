import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '../../../lib/projectService'
import { AuthService } from '../../../lib/authService'
import { validateProjectData } from '../../../lib/validation-optimized'

// GET - Récupérer tous les projets (public)
export async function GET() {
  try {
    console.log("📋 API Projects: Récupération des projets...")
    const projects = ProjectService.getAllProjects()
    console.log(`✅ API Projects: ${projects.length} projets récupérés`)
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
    console.log("🔐 API Projects: Tentative de création de projet...")
    
    // Vérification de l'authentification
    const token = request.cookies.get('admin_token')?.value || 
                 request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      console.log("❌ API Projects: Pas de token d'authentification")
      return NextResponse.json(
        { error: 'Token d\'authentification requis' },
        { status: 401 }
      )
    }

    if (!AuthService.verifyToken(token)) {
      console.log("❌ API Projects: Token invalide")
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      )
    }

    const projectData = await request.json()
    console.log("📝 API Projects: Données reçues:", projectData.title)
    console.log("🔍 API Projects: Technologies brutes:", projectData.technologies, typeof projectData.technologies)
    console.log("🔍 API Projects: Tags bruts:", projectData.tags, typeof projectData.tags)
    
    // Validation avec zod (preprocessing automatique intégré)
    const validatedData = validateProjectData(projectData)
    if (!validatedData.success) {
      console.log("❌ API Projects: Données invalides:", validatedData.error)
      return NextResponse.json(
        { error: 'Données invalides', details: validatedData.error },
        { status: 400 }
      )
    }

    
    // Création du projet avec données validées
    const newProject = ProjectService.createProject(validatedData.data!)
    console.log(`✅ API Projects: Projet créé avec succès - ID: ${newProject.id}`)
    
    return NextResponse.json(newProject, { status: 201 })
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
    console.log("🔐 API Projects: Tentative de mise à jour de projet...")
    
    // Vérification de l'authentification
    const token = request.cookies.get('admin_token')?.value || 
                 request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      console.log("❌ API Projects: Pas de token d'authentification")
      return NextResponse.json(
        { error: 'Token d\'authentification requis' },
        { status: 401 }
      )
    }

    if (!AuthService.verifyToken(token)) {
      console.log("❌ API Projects: Token invalide")
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

    console.log(`📝 API Projects: Mise à jour du projet ${id}`)
    
    // Validation avec zod (preprocessing automatique intégré)
    const validatedData = validateProjectData(projectData)
    if (!validatedData.success) {
      console.log("❌ API Projects: Données invalides:", validatedData.error)
      return NextResponse.json(
        { error: 'Données invalides', details: validatedData.error },
        { status: 400 }
      )
    }

    const updatedProject = ProjectService.updateProject(id, validatedData.data!)
    
    if (!updatedProject) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }

    console.log(`✅ API Projects: Projet ${id} mis à jour avec succès`)
    return NextResponse.json(updatedProject)
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
    console.log("🔐 API Projects: Tentative de suppression de projet...")
    
    // Vérification de l'authentification
    const token = request.cookies.get('admin_token')?.value || 
                 request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      console.log("❌ API Projects: Pas de token d'authentification")
      return NextResponse.json(
        { error: 'Token d\'authentification requis' },
        { status: 401 }
      )
    }

    if (!AuthService.verifyToken(token)) {
      console.log("❌ API Projects: Token invalide")
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

    console.log(`🗑️ API Projects: Suppression du projet ${projectId}`)
    
    const deleted = ProjectService.deleteProject(projectId)
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }

    console.log(`✅ API Projects: Projet ${projectId} supprimé avec succès`)
    return NextResponse.json({ message: 'Projet supprimé avec succès' })
  } catch (error) {
    console.error('💥 API Projects: Erreur lors de la suppression:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la suppression' },
      { status: 500 }
    )
  }
}
