import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Project } from "../lib/types"

export default function ProjectCard({ project }: { project: Project }) {
  const router = useRouter()

  return (
    <motion.div
      className="flex flex-col lg:flex-row items-center justify-center w-full gap-4 md:gap-6 lg:gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full lg:w-1/2 order-2 lg:order-1"
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.99 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25,
          mass: 0.5
        }}
      >
        <div className="relative group overflow-hidden rounded-xl shadow-2xl">
          <Image
            src={project.coverImage || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={600}
            className="w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[450px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
        </div>
      </motion.div>
      
      <div className="w-full lg:w-1/2 space-y-3 md:space-y-4 order-1 lg:order-2 text-center lg:text-left">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {project.title}
        </motion.h2>
        
        <motion.p
          className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {project.description}
        </motion.p>
        
        {/* Technologies tags */}
        {project.technologies && project.technologies.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm bg-white/10 text-white rounded-full border border-white/20"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm bg-white/10 text-white rounded-full border border-white/20">
                +{project.technologies.length - 4}
              </span>
            )}
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="pt-1 md:pt-2"
        >
          <motion.button
            className="inline-flex items-center justify-center
                       px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5
                       bg-white text-black 
                       rounded-full font-bold 
                       text-sm sm:text-base md:text-lg
                       transition-all duration-200 ease-out
                       hover:bg-gray-100
                       focus:outline-none focus:ring-2 focus:ring-white/50
                       group relative overflow-hidden
                       transform-gpu shadow-lg"
            whileHover={{ 
              scale: 1.08,
              y: -6,
              boxShadow: "0 25px 50px rgba(255, 255, 255, 0.25)"
            }}
            whileTap={{ 
              scale: 0.95,
              y: 0
            }}
            transition={{ 
              type: "spring", 
              stiffness: 250, 
              damping: 8,
              mass: 0.9
            }}
            animate={{
              scale: 1,
              y: 0
            }}
            onClick={() => router.push(`/projet/${project.id}`)}
          >
            {/* Effet de background animé au hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ 
                scale: 1.1,
                opacity: 1
              }}
              transition={{ 
                type: "spring",
                stiffness: 350,
                damping: 15,
                mass: 0.6
              }}
            />
            
            <motion.span 
              className="relative z-10 transition-colors duration-200 group-hover:text-gray-800"
              whileHover={{ x: 3 }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 15
              }}
            >
              Voir le Projet
            </motion.span>
            
            <motion.div
              className="relative z-10 ml-2"
              whileHover={{ 
                x: 6,
                rotate: 15
              }}
              transition={{ 
                type: "spring", 
                stiffness: 350, 
                damping: 12,
                mass: 0.4
              }}
            >
              <ArrowRight size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 
                                               transition-colors duration-200 group-hover:text-gray-800" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

