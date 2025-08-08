import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "$2a$12$RQqhyCpnRi6PrNfdHpvnyeTKkYcezJ2gEGtiHPoHDdqqlGQnFdifO"
const JWT_SECRET = process.env.JWT_SECRET || '132bcedb70912a0b99adb35084327ab96b2dfbbbc5b123a7e47714fa776a73af994bfc3edb0aaa2ba6379e038aab993889bba829ab6a6b26e1f3d43424d35b15'

export class AuthService {
  static async verifyPassword(password: string): Promise<boolean> {
    console.log("🔐 AuthService: Vérification du mot de passe...")
    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
    console.log("🔐 AuthService: Mot de passe valide:", isValid)
    return isValid
  }

  static generateToken(): string {
    console.log("🔐 AuthService: Génération du JWT...")
    const payload = {
      user: 'admin',
      role: 'admin',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 heures
    }
    
    const token = jwt.sign(payload, JWT_SECRET)
    console.log("✅ AuthService: JWT généré:", token.substring(0, 50) + '...')
    return token
  }

  static verifyToken(token: string): boolean {
    try {
      console.log("🔐 AuthService: Vérification du JWT...")
      const decoded = jwt.verify(token, JWT_SECRET)
      console.log("✅ AuthService: JWT valide:", decoded)
      return true
    } catch (error) {
      console.log("❌ AuthService: JWT invalide:", error instanceof Error ? error.message : 'Erreur inconnue')
      return false
    }
  }
}
