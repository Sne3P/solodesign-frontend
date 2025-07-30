import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '../../../../../lib/projectService'
import { AuthService } from '../../../../../lib/authService'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    const { coverImage } = await request.json()

    if (!coverImage) {
      return NextResponse.json(
        { error: 'URL de l\'image de couverture requise' },
        { status: 400 }
      )
    }

    const updatedProject = ProjectService.setCoverImage(id, coverImage)
    
    if (!updatedProject) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      project: updatedProject,
      message: 'Image de couverture mise à jour'
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'image de couverture:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
