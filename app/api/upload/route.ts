import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { AuthService } from '../../../lib/authService'

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token || !AuthService.verifyToken(token)) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    // Vérifier que c'est une image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Le fichier doit être une image' },
        { status: 400 }
      )
    }

    // Vérifier la taille du fichier (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Le fichier ne doit pas dépasser 5MB' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Générer un nom de fichier unique
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}_${originalName}`

    // Chemin vers le dossier public
    const path = join(process.cwd(), 'public', 'uploads', filename)

    // Créer le dossier uploads s'il n'existe pas
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    try {
      await writeFile(path, buffer)
    } catch (error) {
      // Si le dossier n'existe pas, le créer
      const fs = require('fs')
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true })
        await writeFile(path, buffer)
      } else {
        throw error
      }
    }

    // Retourner l'URL de l'image
    const imageUrl = `/uploads/${filename}`

    return NextResponse.json({
      url: imageUrl,
      filename: filename,
      size: file.size,
      type: file.type
    })

  } catch (error) {
    console.error('Erreur lors de l\'upload:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload du fichier' },
      { status: 500 }
    )
  }
}
