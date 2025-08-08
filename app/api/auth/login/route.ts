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
    
    console.log("🔐 API Login: Token généré, définition du cookie...")

    const response = NextResponse.json({
      success: true,
      token,
      message: 'Connexion réussie'
    })

    // Définir le cookie côté serveur
    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: false, // Permet l'accès côté client
      secure: process.env.NODE_ENV === 'production', // HTTPS en production seulement
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 heures
      path: '/'
    })

    console.log("✅ API Login: Cookie défini côté serveur")
    return response

  } catch (error) {
    console.error('Erreur d\'authentification:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
