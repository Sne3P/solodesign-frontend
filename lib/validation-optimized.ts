import { z } from 'zod'

/**
 * 🛡️ VALIDATION CONSOLIDÉE ET OPTIMISÉE
 * Toutes les validations du système en un seul endroit
 */

// ===== TYPES DE BASE =====
const stringRequired = (field: string, maxLength = 255) => 
  z.string().min(1, `${field} est requis`).max(maxLength, `${field} trop long (max ${maxLength} caractères)`)

const arrayOrString = () => 
  z.preprocess((val) => {
    if (typeof val === 'string') {
      return val.split(',').map(s => s.trim()).filter(s => s.length > 0)
    }
    return Array.isArray(val) ? val : []
  }, z.array(z.string()).default([]))

// ===== SCHÉMAS PRINCIPAUX =====

export const projectSchema = z.object({
  // Champs obligatoires
  title: stringRequired('Le titre', 100),
  description: stringRequired('La description', 2000),
  
  // Champs avec transformation automatique
  technologies: arrayOrString(),
  tags: arrayOrString(),
  
  // Médias
  coverImage: z.string().optional().default('/placeholder.svg'),
  coverVideo: z.string().optional(),
  images: z.array(z.any()).optional().default([]),
  videos: z.array(z.any()).optional().default([]),
  
  // Métadonnées
  duration: z.string().optional().default('Non spécifié'),
  teamSize: z.string().optional().default('Non spécifié'),
  scope: z.string().optional().default('Non spécifié'),
  
  // Champs hérités (rétrocompatibilité)
  category: z.string().optional(),
  client: z.string().optional(),
  date: z.string().optional(),
  featured: z.boolean().optional().default(false),
  status: z.enum(['draft', 'published', 'archived']).optional().default('published')
})

export const mediaSchema = z.object({
  projectId: stringRequired('L\'ID du projet'),
  type: z.enum(['image', 'video']),
  filename: stringRequired('Le nom de fichier'),
  size: z.number().positive('La taille doit être positive'),
  mimeType: stringRequired('Le type MIME')
})

export const loginSchema = z.object({
  password: stringRequired('Le mot de passe')
})

// ===== FONCTIONS DE VALIDATION =====

type ValidationResult<T> = {
  success: true
  data: T
} | {
  success: false
  error: string
}

export function validateProjectData(data: unknown): ValidationResult<z.infer<typeof projectSchema>> {
  try {
    const validatedData = projectSchema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      }
    }
    return { success: false, error: 'Erreur de validation inconnue' }
  }
}

export function validateMediaData(data: unknown): ValidationResult<z.infer<typeof mediaSchema>> {
  try {
    const validatedData = mediaSchema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      }
    }
    return { success: false, error: 'Erreur de validation inconnue' }
  }
}

export function validateLoginData(data: unknown): ValidationResult<z.infer<typeof loginSchema>> {
  try {
    const validatedData = loginSchema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      }
    }
    return { success: false, error: 'Erreur de validation inconnue' }
  }
}

// ===== VALIDATION DES FICHIERS =====

export const FILE_CONSTRAINTS = {
  allowedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'] as string[],
  allowedVideoTypes: ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'] as string[],
  maxFileSize: 50 * 1024 * 1024, // 50MB
  maxFileSizeDisplay: '50MB'
} as const

export function validateFileType(file: File): boolean {
  const allowedTypes = [...FILE_CONSTRAINTS.allowedImageTypes, ...FILE_CONSTRAINTS.allowedVideoTypes]
  return allowedTypes.includes(file.type)
}

export function validateFileSize(file: File): boolean {
  return file.size <= FILE_CONSTRAINTS.maxFileSize
}

export function getFileCategory(mimeType: string): 'image' | 'video' | null {
  if (FILE_CONSTRAINTS.allowedImageTypes.includes(mimeType)) return 'image'
  if (FILE_CONSTRAINTS.allowedVideoTypes.includes(mimeType)) return 'video'
  return null
}

// ===== VALIDATION MEDIA DE COUVERTURE =====

export function isValidCoverMedia(url: string): boolean {
  if (!url || url === '/placeholder.svg') return true
  
  const extension = url.split('.').pop()?.toLowerCase()
  const validExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4', 'webm', 'ogg', 'avi', 'mov']
  
  return validExtensions.includes(extension || '')
}

export function getCoverMediaType(url: string): 'image' | 'video' | 'unknown' {
  if (!url || url === '/placeholder.svg') return 'image'
  
  const extension = url.split('.').pop()?.toLowerCase()
  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif']
  const videoExtensions = ['mp4', 'webm', 'ogg', 'avi', 'mov']
  
  if (imageExtensions.includes(extension || '')) return 'image'
  if (videoExtensions.includes(extension || '')) return 'video'
  return 'unknown'
}

export function validateCoverMedia(url: string): { 
  valid: boolean
  type: 'image' | 'video' | 'unknown'
  message?: string 
} {
  if (!url || url === '/placeholder.svg') {
    return { valid: true, type: 'image' }
  }
  
  const type = getCoverMediaType(url)
  if (type === 'unknown') {
    return { 
      valid: false, 
      type: 'unknown', 
      message: 'Type de média de couverture non supporté. Formats acceptés: JPG, PNG, WebP, GIF, MP4, WebM' 
    }
  }
  
  return { valid: true, type }
}

// ===== HELPERS POUR PREPROCESSING =====

export function preprocessProjectData(rawData: unknown) {
  const data = rawData as Record<string, unknown>
  return {
    ...data,
    technologies: preprocessArrayField(data.technologies),
    tags: preprocessArrayField(data.tags)
  }
}

function preprocessArrayField(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter(v => typeof v === 'string')
  if (typeof value === 'string') {
    return value.split(',').map(s => s.trim()).filter(s => s.length > 0)
  }
  return []
}
