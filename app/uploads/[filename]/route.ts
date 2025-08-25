import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename
    
    // Chemin vers le fichier uploadé
    const filePath = path.join(process.cwd(), 'public', 'uploads', filename)
    
    // Vérifier si le fichier existe
    if (!fs.existsSync(filePath)) {
      return new NextResponse('Fichier non trouvé', { status: 404 })
    }
    
    // Lire le fichier
    const fileBuffer = fs.readFileSync(filePath)
    
    // Déterminer le type MIME basé sur l'extension
    const ext = path.extname(filename).toLowerCase()
    let contentType = 'application/octet-stream'
    
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg'
        break
      case '.png':
        contentType = 'image/png'
        break
      case '.gif':
        contentType = 'image/gif'
        break
      case '.webp':
        contentType = 'image/webp'
        break
      case '.mp4':
        contentType = 'video/mp4'
        break
      case '.webm':
        contentType = 'video/webm'
        break
    }
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
    
  } catch (error) {
    console.error('Erreur lecture fichier upload:', error)
    return new NextResponse('Erreur serveur', { status: 500 })
  }
}
