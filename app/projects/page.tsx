"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import LogoTitle from "../../components/layout/LogoTitle"
import SocialLinks from "../../components/layout/SocialLinks"
import MenuButton from "../../components/layout/MenuButton"
import BackgroundPattern from "../../components/layout/BackgroundPattern"
import dynamic from 'next/dynamic';
const Cursor = dynamic(() => import('../../components/layout/Cursor'), { ssr: false });
import ProgressBar from "../../components/layout/ProgressBar"
import Footer from "../../components/sections/Footer"
import ProjectCard from "../../components/ProjectCard"
import { Project } from "../../lib/types"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [currentProject, setCurrentProject] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const scrollRef = useRef(0)
  const controls = useAnimation()
  const lastScrollTime = useRef(Date.now())

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error)
    } finally {
      setLoading(false)
    }
  }

  const changeProject = useCallback((newDirection: number) => {
    if (projects.length === 0 || isTransitioning) return
    
    setIsTransitioning(true)
    setDirection(newDirection)
    setCurrentProject((prev) => (prev + newDirection + projects.length) % projects.length)
    
    // Réinitialiser après la transition
    setTimeout(() => setIsTransitioning(false), 800)
  }, [projects.length, isTransitioning])

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      // Pas de preventDefault ici pour éviter l'erreur passive event listener
      
      const now = Date.now()
      // Limiter la sensibilité du scroll - minimum 300ms entre les changements
      if (now - lastScrollTime.current < 300 || isTransitioning) return
      
      scrollRef.current += e.deltaY

      // Augmenter le seuil pour moins de sensibilité
      if (Math.abs(scrollRef.current) > 200) {
        const newDirection = scrollRef.current > 0 ? 1 : -1
        changeProject(newDirection)
        scrollRef.current = 0
        lastScrollTime.current = now

        controls
          .start({
            y: newDirection * 10,
            transition: { duration: 0.2 },
          })
          .then(() => controls.set({ y: 0 }))
      }
    },
    [changeProject, controls, isTransitioning],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return
      
      if (e.key === "ArrowRight") {
        changeProject(1)
      } else if (e.key === "ArrowLeft") {
        changeProject(-1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [changeProject, isTransitioning])

  return (
    <div className="h-screen bg-black text-white overflow-hidden pb-16 sm:pb-20 md:pb-24" onWheel={handleWheel}>{/* Padding bottom pour éviter le footer */}
      <div className="relative h-full">
        <LogoTitle />
        <SocialLinks />
        <MenuButton />

        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.p 
                className="text-sm sm:text-base md:text-lg text-gray-300"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Chargement des projets...
              </motion.p>
            </motion.div>
          </div>
        ) : projects.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="text-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Aucun projet trouvé</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400">Les projets seront bientôt disponibles.</p>
            </motion.div>
          </div>
        ) : (
          <>
            <ProgressBar current={currentProject} total={projects.length} />

            <motion.div 
              className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16" 
              animate={controls}
              style={{ 
                transformOrigin: "center center",
                paddingTop: "1rem",
                paddingBottom: "12rem" // Plus d'espace pour éviter le chevauchement
              }}
            >
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentProject}
                  custom={direction}
                  className="w-full max-w-6xl mx-auto"
                  initial={{ 
                    x: direction > 0 ? "50%" : "-50%", 
                    opacity: 0,
                    scale: 0.9
                  }}
                  animate={{ 
                    x: 0, 
                    opacity: 1,
                    scale: 1
                  }}
                  exit={{ 
                    x: direction < 0 ? "50%" : "-50%", 
                    opacity: 0,
                    scale: 0.9
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    duration: 0.8
                  }}
                  style={{ 
                    transformOrigin: "center center"
                  }}
                >
                  <ProjectCard project={projects[currentProject]} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Navigation buttons - Petits, responsives et sans décalage au hover */}
            <motion.button
              className="absolute top-1/2 left-3 sm:left-6 md:left-8 lg:left-12 -translate-y-1/2 
                         group z-30"
              onClick={() => changeProject(-1)}
              disabled={projects.length <= 1 || isTransitioning}
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 
                              flex items-center justify-center">
                {/* Cercle de background avec effet de scale au hover - SANS décalage */}
                <motion.div
                  className="absolute inset-0 bg-black/15 backdrop-blur-sm rounded-full 
                             border border-white/25"
                  whileHover={{ 
                    scale: 1.2,
                    backgroundColor: "rgba(0, 0, 0, 0.35)",
                    borderColor: "rgba(255, 255, 255, 0.6)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 600, 
                    damping: 20,
                    mass: 0.3
                  }}
                />
                
                {/* Icône flèche - taille petite et responsive */}
                <motion.div
                  className="relative z-10"
                  whileHover={{ x: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.div>
              </div>
            </motion.button>

            <motion.button
              className="absolute top-1/2 right-3 sm:right-6 md:right-8 lg:right-12 -translate-y-1/2 
                         group z-30"
              onClick={() => changeProject(1)}
              disabled={projects.length <= 1 || isTransitioning}
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 
                              flex items-center justify-center">
                {/* Cercle de background avec effet de scale au hover - SANS décalage */}
                <motion.div
                  className="absolute inset-0 bg-black/15 backdrop-blur-sm rounded-full 
                             border border-white/25"
                  whileHover={{ 
                    scale: 1.2,
                    backgroundColor: "rgba(0, 0, 0, 0.35)",
                    borderColor: "rgba(255, 255, 255, 0.6)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 600, 
                    damping: 20,
                    mass: 0.3
                  }}
                />
                
                {/* Icône flèche - taille petite et responsive */}
                <motion.div
                  className="relative z-10"
                  whileHover={{ x: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.div>
              </div>
            </motion.button>

            {/* Project indicators - Remontés pour éviter le footer */}
            <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-32 left-1/2 transform -translate-x-1/2 
                            flex items-center space-x-2 z-30">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  className={`relative overflow-hidden ${
                    index === currentProject 
                      ? 'w-6 h-2.5 bg-white rounded-full' 
                      : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70 rounded-full'
                  } transition-all duration-200`}
                  onClick={() => {
                    if (!isTransitioning) {
                      setDirection(index > currentProject ? 1 : -1)
                      setCurrentProject(index)
                      setIsTransitioning(true)
                      setTimeout(() => setIsTransitioning(false), 800)
                    }
                  }}
                  whileHover={{ scale: index === currentProject ? 1.05 : 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 600, 
                    damping: 30,
                    mass: 0.4
                  }}
                  disabled={isTransitioning}
                >
                  {/* Animation clean pour l'indicateur actif */}
                  {index === currentProject && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                      animate={{ 
                        x: ["-100%", "100%", "-100%"]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                        repeatDelay: 1
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </>
        )}

        <BackgroundPattern 
          opacity={0.03} 
          spacing={40} 
          duration={20} 
          dotOpacity={0.08}
          zIndex={0}
          magneticEffect={false}
        />

        {/* Footer avec z-index approprié */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Footer />
          </motion.div>
        </div>

        {/* Cursor au-dessus de tout */}
        <Cursor />
      </div>
    </div>
  )
}

