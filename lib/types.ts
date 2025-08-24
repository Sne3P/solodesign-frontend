export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  tags: string[]
  status?: 'draft' | 'published' | 'archived'
  featured?: boolean
  coverImage: string
  images: ProjectImage[]
  videos: ProjectVideo[]
  duration: string
  teamSize: string
  scope: string
  createdAt: string
  updatedAt: string
}

export interface ProjectImage {
  id: string
  filename: string
  originalName: string
  url: string
  size: number
  mimeType: string
  uploadedAt: string
}

export interface ProjectVideo {
  id: string
  filename: string
  originalName: string
  url: string
  size: number
  mimeType: string
  duration?: number
  uploadedAt: string
}

export interface AdminAuth {
  isAuthenticated: boolean
  token?: string
}

export interface ProjectFormData {
  title: string
  description: string
  technologies: string
  tags: string
  duration: string
  teamSize: string
  scope: string
}
