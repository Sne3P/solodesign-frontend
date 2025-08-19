import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '../../../../lib/authService'
import { rateLimits, logRateLimit } from '../../../../lib/rateLimit'

export async function POST(request: NextRequest) {
  try {
    const rl = rateLimits.api.check(request as unknown as Request)
    logRateLimit(rl.ip || 'unknown', '/api/auth/verify', rl.allowed, rl.remaining)
    if (!rl.allowed) return NextResponse.json({ error: rl.message }, { status: 429 })

    const cookieToken = request.cookies.get('admin_token')?.value
    const headerToken = request.headers.get('authorization')?.replace('Bearer ', '')
    const token = cookieToken || headerToken

    if (!token || !AuthService.verifyToken(token)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    return NextResponse.json({ success: true, message: 'Token valide' })
  } catch (error) {
    console.error('Erreur de vérification:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return POST(request)
}
