import { useEffect, useState } from 'react'

/**
 * Utilitaires pour la coordination en temps réel entre les composants
 */

interface EventData {
  type: 'project-created' | 'project-updated' | 'project-deleted' | 'media-uploaded'
  data: unknown
  timestamp: number
}

class ProjectSyncManager {
  private listeners: Set<(event: EventData) => void> = new Set()

  // Ajouter un listener
  subscribe(callback: (event: EventData) => void) {
    this.listeners.add(callback)
    return () => {
      this.listeners.delete(callback)
    }
  }

  // Émettre un événement
  emit(type: EventData['type'], data: unknown) {
    const event: EventData = {
      type,
      data,
      timestamp: Date.now()
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 ProjectSync: ${type}`, data)
    }
    
    this.listeners.forEach(callback => {
      try {
        callback(event)
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ ProjectSync: Erreur callback:', error)
        }
      }
    })
  }

  // Nettoyer les listeners
  clear() {
    this.listeners.clear()
  }
}

// Instance globale
export const projectSync = new ProjectSyncManager()

// Helper pour les composants React
export function useProjectSync(callback: (event: EventData) => void) {
  const [lastEvent, setLastEvent] = useState<EventData | null>(null)

  useEffect(() => {
    const unsubscribe = projectSync.subscribe((event) => {
      setLastEvent(event)
      callback(event)
    })

    return unsubscribe
  }, [callback])

  return lastEvent
}
