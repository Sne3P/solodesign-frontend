import bcrypt from 'bcryptjs'

const ADMIN_PASSWORD = 'Solodesign974!'
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_PASSWORD, 10)

export class AuthService {
  static async verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, ADMIN_PASSWORD_HASH)
  }

  static generateToken(): string {
    if (typeof window !== 'undefined') {
        return btoa(`admin_${Date.now()}_${Math.random()}`);
    }
    return btoa('admin_ssr_placeholder');
  }

  static verifyToken(token: string): boolean {
    try {
      const decoded = atob(token)
      return decoded.startsWith('admin_')
    } catch {
      return false
    }
  }
}
