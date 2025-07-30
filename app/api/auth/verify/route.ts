import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '../../../../lib/authService'

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token || !AuthService.verifyToken(token)) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Token valide'
    })

  } catch (error) {
    console.error('Erreur de vérification:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token || !AuthService.verifyToken(token)) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Token valide'
    })

  } catch (error) {
    console.error('Erreur de vérification:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
