import { motion } from "framer-motion";
import { Project } from "../../lib/types";
import { Eye, Edit, Trash2, Image as ImageIcon, Play } from "lucide-react";
import CoverMedia from "../ui/CoverMedia";

interface ProjectGridProps {
  projects: Project[];
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
  onView?: (projectId: string) => void;
  columns?: "sm" | "md" | "lg";
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
  columns = "md",
}: ProjectGridProps) {
  const getGridCols = () => {
    switch (columns) {
      case "sm":
        return "grid-cols-1 md:grid-cols-2";
      case "lg":
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

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
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          {/* Image Container - Aspect Video pour cohérence */}
          <div className="aspect-video bg-gray-200 relative overflow-hidden group rounded-lg">
            <CoverMedia
              src={project.coverImage || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              fallbackSrc="/placeholder.svg"
            />

            {/* Badge avec nombre d'images et vidéos */}
            {(project.images?.length > 0 || project.videos?.length > 0) && (
              <div className="absolute top-2 right-2 flex gap-1">
                {project.images?.length > 0 && (
                  <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" />
                    {project.images.length}
                  </span>
                )}
                {project.videos?.length > 0 && (
                  <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    {project.videos.length}
                  </span>
                )}
              </div>
            )}

            {/* Overlay subtil sur hover pour indiquer l'interactivité */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </div>

          {/* Informations du projet */}
          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900 truncate flex-1 mr-2">
                {project.title}
              </h3>
              <span className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded">
                #{project.id.slice(-4)}
              </span>
            </div>

            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {project.description}
            </p>

            {/* Technologies avec style amélioré */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.slice(0, 2).map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs px-3 py-1.5 rounded-full font-medium border border-blue-100"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 2 && (
                  <span className="text-gray-500 text-xs self-center font-medium">
                    +{project.technologies.length - 2} autres
                  </span>
                )}
              </div>
            )}

            {/* Actions en bas avec style modernisé */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
              <div className="flex items-center text-xs text-gray-500">
                <span className="capitalize bg-green-50 text-green-600 px-2 py-1 rounded-full">
                  {project.status || 'draft'}
                </span>
              </div>

              <div className="flex space-x-1.5">
                {onView && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onView(project.id)}
                    className="p-2.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-xl transition-all shadow-sm hover:shadow-md"
                    title="Voir le projet"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                )}

                {onEdit && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onEdit(project)}
                    className="p-2.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-xl transition-all shadow-sm hover:shadow-md"
                    title="Modifier le projet"
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                )}

                {onDelete && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(project.id)}
                    className="p-2.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-all shadow-sm hover:shadow-md"
                    title="Supprimer le projet"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
