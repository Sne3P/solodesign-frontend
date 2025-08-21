import { NextResponse } from 'next/server'

export async function POST() {
  try {
    console.log("🚪 API Logout: Déconnexion en cours...")
    
    // Créer la réponse de succès
    const response = NextResponse.json({
      success: true,
      message: 'Déconnexion réussie'
    })

    // Supprimer le cookie httpOnly côté serveur
    response.cookies.set({
      name: 'admin_token',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immédiatement
      path: '/'
    })

    console.log("✅ API Logout: Cookie supprimé côté serveur")
    return response
  } catch (error) {
    console.error("💥 API Logout: Erreur lors de la déconnexion:", error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return POST()
}
