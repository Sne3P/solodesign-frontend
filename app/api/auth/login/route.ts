import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '../../../../lib/authService'
import { rateLimits, logRateLimit } from '../../../../lib/rateLimit'

// Petite protection basique bruteforce via rate limiter en mémoire

export async function POST(request: NextRequest) {
  try {
    const rl = rateLimits.auth.check(request as unknown as Request)
    logRateLimit(rl.ip || 'unknown', '/api/auth/login', rl.allowed, rl.remaining)
    if (!rl.allowed) {
      return NextResponse.json({ error: rl.message }, { status: 429 })
    }
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
    
    const response = NextResponse.json({
      success: true,
      token,
      message: 'Connexion réussie'
    })

    // Définir le cookie côté serveur (httpOnly + secure production)
    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 heures
      path: '/'
    })
    return response

  } catch (error) {
    console.error('Erreur d\'authentification:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
