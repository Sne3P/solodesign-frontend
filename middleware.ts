import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isDev = process.env.NODE_ENV === 'development'

// Fonction simple pour vérifier le JWT sans crypto
function isValidJWTFormat(token: string): boolean {
  const parts = token.split('.')
  if (parts.length !== 3) return false
  
  try {
    // Vérifier que c'est un JWT valide en décodant le payload
    const payloadPart = parts[1]
    if (!payloadPart) return false
    
    const payload = JSON.parse(atob(payloadPart))
    const now = Math.floor(Date.now() / 1000)
    
    // Vérifier l'expiration
    if (payload.exp && payload.exp < now) {
      if (isDev) console.log("❌ Middleware: Token expiré")
      return false
    }
    
    // Vérifier que c'est bien un token admin
    if (payload.user !== 'admin' || payload.role !== 'admin') {
      if (isDev) console.log("❌ Middleware: Token non-admin")
      return false
    }
    
    if (isDev) console.log("✅ Middleware: Token valide (format et expiration OK)")
    return true
  } catch (error) {
    if (isDev) console.log("❌ Middleware: Erreur décodage token:", error)
    return false
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  console.log("🛡️ Middleware: Requête sur:", pathname)

  // Protection des routes dashboard admin
  if (pathname.startsWith('/admin/dashboard')) {
    console.log("🛡️ Middleware: Vérification de l'accès au dashboard")
    console.log("🛡️ Middleware: Tous les cookies:", request.cookies.toString())
    
    const cookieToken = request.cookies.get('admin_token')?.value
    const headerToken = request.headers.get('authorization')?.replace('Bearer ', '')
    const token = cookieToken || headerToken

    console.log("🛡️ Middleware: Cookie admin_token:", cookieToken ? `${cookieToken.substring(0, 20)}...` : 'non trouvé')
    console.log("🛡️ Middleware: Header token:", !!headerToken)
    console.log("🛡️ Middleware: Token final trouvé:", !!token)

    if (!token) {
      console.log("❌ Middleware: Pas de token, redirection vers /admin")
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    // Vérifier le format JWT et l'expiration (compatible Edge Runtime)
    if (!isValidJWTFormat(token)) {
      console.log("❌ Middleware: Token invalide, redirection vers /admin")
      const response = NextResponse.redirect(new URL('/admin', request.url))
      response.cookies.delete('admin_token')
      return response
    }
  }

  console.log("🛡️ Middleware: Accès autorisé")
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*']
}
