import { useState, useCallback, useEffect } from 'react'
import { Project } from '../lib/types'
import { useNotifications } from '../contexts/NotificationContext'

interface UseProjectsOptions {
  autoFetch?: boolean
  onProjectChange?: (project: Project) => void
  onProjectDelete?: (projectId: string) => void
}

export const useProjects = (options: UseProjectsOptions = {}) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addNotification } = useNotifications()

  const { autoFetch = true, onProjectChange, onProjectDelete } = options

  // Récupérer tous les projets
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔄 useProjects: Chargement des projets...')
      const response = await fetch('/api/projects', {
        credentials: 'include',
        cache: 'no-cache' // Toujours récupérer les données fraîches
      })
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const data = await response.json()
      setProjects(data)
      console.log(`✅ useProjects: ${data.length} projets chargés`)
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors du chargement des projets'
      console.error('💥 useProjects: Erreur chargement:', error)
      setError(errorMessage)
      
      addNotification({
        type: 'error',
        title: 'Erreur de chargement',
        message: errorMessage
      })
    } finally {
      setLoading(false)
    }
  }, [addNotification])

  // Récupérer un projet par ID
  const fetchProject = useCallback(async (id: string): Promise<Project | null> => {
    try {
      console.log(`🔍 useProjects: Récupération du projet ${id}`)
      const response = await fetch(`/api/projects/${id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const project = await response.json()
      console.log(`✅ useProjects: Projet récupéré - ${project.title}`)
      return project
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la récupération du projet'
      console.error('💥 useProjects: Erreur récupération projet:', error)
      addNotification({
        type: 'error',
        title: 'Erreur',
        message: errorMessage
      })
      return null
    }
  }, [addNotification])

  // Créer un nouveau projet
  const createProject = useCallback(async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project | null> => {
    try {
      console.log('➕ useProjects: Création d\'un nouveau projet')
      const token = localStorage.getItem('admin_token')
      
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(projectData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Erreur HTTP: ${response.status}`)
      }

      const newProject = await response.json()
      console.log(`✅ useProjects: Projet créé - ${newProject.title}`)
      
      // Mettre à jour la liste des projets
      setProjects(prev => [...prev, newProject])
      
      addNotification({
        type: 'success',
        title: 'Projet créé',
        message: `Le projet "${newProject.title}" a été créé avec succès`
      })

      if (onProjectChange) {
        onProjectChange(newProject)
      }

      return newProject
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la création du projet'
      console.error('💥 useProjects: Erreur création:', error)
      addNotification({
        type: 'error',
        title: 'Erreur de création',
        message: errorMessage
      })
      return null
    }
  }, [addNotification, onProjectChange])

  // Mettre à jour un projet
  const updateProject = useCallback(async (id: string, updateData: Partial<Project>): Promise<Project | null> => {
    try {
      console.log(`📝 useProjects: Mise à jour du projet ${id}`)
      const token = localStorage.getItem('admin_token')
      
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(updateData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Erreur HTTP: ${response.status}`)
      }

      const updatedProject = await response.json()
      console.log(`✅ useProjects: Projet mis à jour - ${updatedProject.title}`)
      
      // Mettre à jour la liste des projets
      setProjects(prev => prev.map(p => p.id === id ? updatedProject : p))
      
      addNotification({
        type: 'success',
        title: 'Projet mis à jour',
        message: `Le projet "${updatedProject.title}" a été mis à jour`
      })

      if (onProjectChange) {
        onProjectChange(updatedProject)
      }

      return updatedProject
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la mise à jour du projet'
      console.error('💥 useProjects: Erreur mise à jour:', error)
      addNotification({
        type: 'error',
        title: 'Erreur de mise à jour',
        message: errorMessage
      })
      return null
    }
  }, [addNotification, onProjectChange])

  // Supprimer un projet
  const deleteProject = useCallback(async (id: string): Promise<boolean> => {
    try {
      console.log(`🗑️ useProjects: Suppression du projet ${id}`)
      const token = localStorage.getItem('admin_token')
      
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Erreur HTTP: ${response.status}`)
      }

      console.log(`✅ useProjects: Projet supprimé - ID: ${id}`)
      
      // Mettre à jour la liste des projets
      setProjects(prev => prev.filter(p => p.id !== id))
      
      addNotification({
        type: 'success',
        title: 'Projet supprimé',
        message: 'Le projet et tous ses médias ont été supprimés'
      })

      if (onProjectDelete) {
        onProjectDelete(id)
      }

      return true
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la suppression du projet'
      console.error('💥 useProjects: Erreur suppression:', error)
      addNotification({
        type: 'error',
        title: 'Erreur de suppression',
        message: errorMessage
      })
      return false
    }
  }, [addNotification, onProjectDelete])

  // Charger automatiquement les projets au montage
  useEffect(() => {
    if (autoFetch) {
      fetchProjects()
    }
  }, [autoFetch, fetchProjects])

  return {
    // State
    projects,
    loading,
    error,
    
    // Actions
    fetchProjects,
    fetchProject,
    createProject,
    updateProject,
    deleteProject,
    
    // Utilitaires
    refreshProjects: fetchProjects,
    clearError: () => setError(null)
  }
}
