export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  tags: string[]
  coverImage: string
  images: string[]
  videos: string[]
  duration: string
  teamSize: string
  scope: string
  createdAt: string
  updatedAt: string
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
