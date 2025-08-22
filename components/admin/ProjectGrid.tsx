import { motion } from "framer-motion"
import { Project } from "../../lib/types"
import { Eye, Edit, Trash2 } from "lucide-react"
import CoverMedia from "../ui/CoverMedia"

interface ProjectGridProps {
  projects: Project[]
  onEdit?: (project: Project) => void
  onDelete?: (projectId: string) => void
  onView?: (projectId: string) => void
  columns?: 'sm' | 'md' | 'lg'
}

/**
 * Grille de projets optimisée pour tous les formats d'image
 * Utilise aspect-video pour garder une cohérence visuelle
 */
export default function ProjectGrid({ 
  projects, 
  onEdit, 
  onDelete, 
  onView,
  columns = 'md'
}: ProjectGridProps) {
  
  const getGridCols = () => {
    switch (columns) {
      case 'sm': return 'grid-cols-1 md:grid-cols-2'
      case 'lg': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }
  }

  return (
    <div className={`grid ${getGridCols()} gap-6`}>
      {projects.map((project) => (
        <motion.div
          key={project.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group"
        >
          {/* Image Container - Dimensions fixes et contrôlées */}
          <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
            <CoverMedia
              src={project.coverImage || "/placeholder.svg"}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              fallbackSrc="/placeholder.svg"
            />
            
            {/* Overlay gradient et actions */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Boutons d'action - Toujours accessibles */}
              <div className="absolute top-3 right-3 flex space-x-2">
                {onView && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onView(project.id);
                    }}
                    className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                    title="Voir le projet"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                )}
                
                {onEdit && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(project);
                    }}
                    className="w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                    title="Modifier le projet"
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                )}
                
                {onDelete && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(project.id);
                    }}
                    className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                    title="Supprimer le projet"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Informations du projet - Design moderne et compact */}
          <div className="p-5">
            {/* Titre et description */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 truncate mb-1">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            </div>
            
            {/* Technologies - Plus moderne */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-200"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                    +{project.technologies.length - 3} autres
                  </span>
                )}
              </div>
            )}
            
            {/* Footer avec stats et ID */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                {project.images && project.images.length > 0 && (
                  <span className="flex items-center text-xs text-gray-500">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    {project.images.length}
                  </span>
                )}
                {project.videos && project.videos.length > 0 && (
                  <span className="flex items-center text-xs text-gray-500">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    {project.videos.length}
                  </span>
                )}
              </div>
              
              <span className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded">
                #{project.id}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
