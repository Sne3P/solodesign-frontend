// Gestion simple des images de projets
export const getProjectImageSrc = (project: { id: string; coverImage?: string }): string => {
  // Si une image est définie, l'utiliser
  if (project.coverImage && project.coverImage !== '') {
    return project.coverImage
  }
  
  // Sinon, utiliser le placeholder par défaut
  return '/placeholder.svg'
}

// Sizes responsives pour images de projets
export const getProjectImageSizes = (context: 'card' | 'hero' | 'grid' = 'card'): string => {
  const sizeMap = {
    card: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px',
    hero: '100vw',
    grid: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
  }
  
  return sizeMap[context]
}

// Validation de l'existence d'une image
export const validateImageSrc = (src: string): boolean => {
  if (!src || src === '') return false
  if (src === '/placeholder.svg') return true // Placeholder toujours valide
  
  // Vérifier si l'URL est valide
  try {
    new URL(src, window.location.origin)
    return true
  } catch {
    return false
  }
}
