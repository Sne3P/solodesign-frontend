import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store'
      })

      if (response.ok) {
        setIsAuthenticated(true)
        return true
      } else {
        setIsAuthenticated(false)
        return false
      }
    } catch (error) {
      console.error('Erreur vérification auth:', error)
      setIsAuthenticated(false)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Erreur logout:', error)
    }
    
    localStorage.removeItem('admin_token')
    setIsAuthenticated(false)
    router.push('/admin')
  }, [router])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return {
    isAuthenticated,
    isLoading,
    checkAuth,
    logout
  }
}
