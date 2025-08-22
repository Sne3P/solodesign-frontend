import { motion } from "framer-motion";
import { Project } from "../../lib/types";
import { Eye, Edit, Trash2 } from "lucide-react";
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
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          {/* Image Container - Aspect Video pour cohérence */}
          <div className="aspect-video bg-gray-200 relative overflow-hidden group">
            <CoverMedia
              src={project.coverImage || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              fallbackSrc="/placeholder.svg"
            />

            {/* Overlay subtil sur hover pour indiquer l'interactivité */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Informations du projet */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 truncate mb-2">
              {project.title}
            </h3>

            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {project.description}
            </p>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-gray-500 text-xs self-center">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Actions en bas */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-mono">
                ID: {project.id}
              </span>

              <div className="flex space-x-1">
                {onView && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onView(project.id)}
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all"
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
                    className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-all"
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
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all"
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
