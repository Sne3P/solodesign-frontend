import { NextRequest, NextResponse } from 'next/server'
import { mediaService } from '../../../../../lib/mediaService'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const images = mediaService.getProjectImages(id)
    const videos = mediaService.getProjectVideos(id)
    const totalSize = mediaService.getProjectMediaSize(id)

    return NextResponse.json({
      images,
      videos,
      totalSize: mediaService.formatFileSize(totalSize),
      totalSizeBytes: totalSize
    })

  } catch (error) {
    console.error('Erreur récupération médias:', error)
    return NextResponse.json({ 
      error: 'Erreur lors de la récupération des médias' 
    }, { status: 500 })
  }
}
