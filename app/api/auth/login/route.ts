import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '../../../../lib/authService'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Mot de passe requis' },
        { status: 400 }
      )
    }

    const isValid = await AuthService.verifyPassword(password)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      )
    }

    const token = AuthService.generateToken()

    return NextResponse.json({
      success: true,
      token,
      message: 'Connexion réussie'
    })

  } catch (error) {
    console.error('Erreur d\'authentification:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
