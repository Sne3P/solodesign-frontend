// Rate limiting pour les API
interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map()
  
  // Nettoyage automatique des entrées expirées
  private cleanup() {
    const now = Date.now()
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(key)
      }
    }
  }

  // Vérifier si une IP/utilisateur peut faire une requête
  checkLimit(
    identifier: string, 
    maxRequests: number = 10, 
    windowMs: number = 60000 // 1 minute
  ): { allowed: boolean; remaining: number; resetTime: number } {
    this.cleanup()
    
    const now = Date.now()
    const entry = this.limits.get(identifier)
    
    if (!entry || now > entry.resetTime) {
      // Nouvelle fenêtre ou première requête
      this.limits.set(identifier, {
        count: 1,
        resetTime: now + windowMs
      })
      
      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetTime: now + windowMs
      }
    }
    
    if (entry.count >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime
      }
    }
    
    entry.count++
    
    return {
      allowed: true,
      remaining: maxRequests - entry.count,
      resetTime: entry.resetTime
    }
  }

  // Obtenir le statut actuel pour un identifier
  getStatus(identifier: string): { count: number; resetTime: number } | null {
    this.cleanup()
    return this.limits.get(identifier) || null
  }

  // Réinitialiser les limites pour un identifier
  reset(identifier: string): void {
    this.limits.delete(identifier)
  }

  // Réinitialiser toutes les limites
  resetAll(): void {
    this.limits.clear()
  }
}

export const rateLimiter = new RateLimiter()

// Fonction helper pour créer un middleware de rate limiting
export function createRateLimit(options: {
  maxRequests?: number
  windowMs?: number
  message?: string
}) {
  const {
    maxRequests = 10,
    windowMs = 60000,
    message = 'Trop de requêtes, veuillez réessayer plus tard'
  } = options

  return {
    check: (request: Request) => {
      // Obtenir l'IP du client
      const forwarded = request.headers.get('x-forwarded-for')
      const ip = forwarded ? forwarded.split(',')[0] : 
                request.headers.get('x-real-ip') || 
                'unknown'
      
      const identifier = `rate_limit:${ip}`
      const result = rateLimiter.checkLimit(identifier, maxRequests, windowMs)
      
      return {
        ...result,
        ip,
        message: result.allowed ? null : message
      }
    },
    
    // Headers à ajouter à la réponse
    getHeaders: (result: ReturnType<typeof rateLimiter.checkLimit>) => ({
      'X-RateLimit-Limit': maxRequests.toString(),
      'X-RateLimit-Remaining': result.remaining.toString(),
      'X-RateLimit-Reset': new Date(result.resetTime).toISOString()
    })
  }
}

// Rate limits prédéfinis pour différents types d'endpoints
export const rateLimits = {
  // Pour les endpoints d'authentification
  auth: createRateLimit({
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    message: 'Trop de tentatives de connexion, veuillez réessayer dans 15 minutes'
  }),
  
  // Pour les uploads
  upload: createRateLimit({
    maxRequests: 20,
    windowMs: 60 * 1000, // 1 minute
    message: 'Trop d\'uploads, veuillez patienter'
  }),
  
  // Pour les API générales
  api: createRateLimit({
    maxRequests: 60,
    windowMs: 60 * 1000, // 1 minute
    message: 'Trop de requêtes API, veuillez patienter'
  }),
  
  // Pour les actions administratives
  admin: createRateLimit({
    maxRequests: 30,
    windowMs: 60 * 1000, // 1 minute
    message: 'Trop d\'actions administratives, veuillez patienter'
  })
}

// Fonction utilitaire pour loguer les tentatives de rate limiting
export function logRateLimit(
  identifier: string, 
  endpoint: string, 
  allowed: boolean, 
  remaining: number
) {
  const status = allowed ? '✅' : '❌'
  const action = allowed ? 'Autorisée' : 'BLOQUÉE'
  
  console.log(
    `${status} Rate Limit ${action}: ${identifier} -> ${endpoint} (${remaining} restantes)`
  )
  
  if (!allowed) {
    console.warn(`🚨 Rate limit dépassé pour ${identifier} sur ${endpoint}`)
  }
}
