import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '../../../lib/authService'
import { mediaService } from '../../../lib/mediaService'

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '') ||
                 request.cookies.get('admin_token')?.value

    if (!token || !AuthService.verifyToken(token)) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const projectId = formData.get('projectId') as string

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    if (!projectId) {
      return NextResponse.json(
        { error: 'ID de projet requis' },
        { status: 400 }
      )
    }

    // Vérifier la taille du fichier (max 50MB)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: `Fichier trop volumineux. Taille maximale: ${mediaService.formatFileSize(maxSize)}` 
      }, { status: 400 })
    }

    // Sauvegarder le fichier
    const mediaInfo = await mediaService.saveFile(file, projectId)

    return NextResponse.json({
      success: true,
      media: mediaInfo,
      message: 'Fichier uploadé avec succès'
    })

  } catch (error: unknown) {
    console.error('Erreur upload:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erreur lors de l\'upload'
    return NextResponse.json({ 
      error: errorMessage 
    }, { status: 500 })
  }
}

// Supprimer un fichier média
export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '') ||
                 request.cookies.get('admin_token')?.value

    if (!token || !AuthService.verifyToken(token)) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const mediaId = searchParams.get('mediaId')
    const projectId = searchParams.get('projectId')

    if (!mediaId || !projectId) {
      return NextResponse.json({ 
        error: 'ID de média et ID de projet requis' 
      }, { status: 400 })
    }

    const deleted = mediaService.deleteMedia(mediaId, projectId)

    if (deleted) {
      return NextResponse.json({
        success: true,
        message: 'Média supprimé avec succès'
      })
    } else {
      return NextResponse.json({ 
        error: 'Média non trouvé' 
      }, { status: 404 })
    }

  } catch (error: unknown) {
    console.error('Erreur suppression média:', error)
    return NextResponse.json({ 
      error: 'Erreur lors de la suppression' 
    }, { status: 500 })
  }
}
