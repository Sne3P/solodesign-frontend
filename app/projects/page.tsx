"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import LogoTitle from "../../components/layout/LogoTitle"
import SocialLinks from "../../components/layout/SocialLinks"
import MenuButton from "../../components/layout/MenuButton"
import Cursor from "../../components/layout/Cursor"
import ProgressBar from "../../components/layout/ProgressBar"
import Footer from "../../components/sections/Footer"
import ProjectCard from "../../components/ProjectCard"
import { Project } from "../../lib/types"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(0)
  const [direction, setDirection] = useState(0)
  const scrollRef = useRef(0)
  const controls = useAnimation()

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
    if (projects.length === 0) return
    setDirection(newDirection)
    setCurrentProject((prev) => (prev + newDirection + projects.length) % projects.length)
  }, [projects.length])

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      scrollRef.current += e.deltaY

      if (Math.abs(scrollRef.current) > 100) {
        const newDirection = scrollRef.current > 0 ? 1 : -1
        changeProject(newDirection)
        scrollRef.current = 0

        controls
          .start({
            y: newDirection * 20,
            transition: { duration: 0.3 },
          })
          .then(() => controls.set({ y: 0 }))
      }
    },
    [changeProject, controls],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [changeProject])

  return (
    <div className="h-screen bg-black text-white overflow-hidden" onWheel={handleWheel}>
      <div className="relative h-full">
        <LogoTitle />
        <SocialLinks />
        <MenuButton />

        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
              <p className="text-xl">Chargement des projets...</p>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Aucun projet trouvé</h2>
              <p className="text-xl text-gray-400">Les projets seront bientôt disponibles.</p>
            </div>
          </div>
        ) : (
          <>
            <ProgressBar current={currentProject} total={projects.length} />

            <motion.div className="absolute inset-0 flex items-center justify-center" animate={controls}>
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentProject}
                  custom={direction}
                  className="w-full max-w-4xl px-4"
                  initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction < 0 ? "100%" : "-100%", opacity: 0 }}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                >
                  <ProjectCard project={projects[currentProject]} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Navigation buttons */}
            <motion.button
              className="absolute top-1/2 left-8 md:left-16 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 focus:outline-none z-10"
              onClick={() => changeProject(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={projects.length <= 1}
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.button
              className="absolute top-1/2 right-8 md:right-16 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 focus:outline-none z-10"
              onClick={() => changeProject(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={projects.length <= 1}
            >
              <ChevronRight size={24} />
            </motion.button>
          </>
        )}

        <Cursor />

        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "0px -30px"],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 10,
            ease: "linear",
          }}
        />

        <div className="absolute bottom-0 left-0 right-0">
          <Footer />
        </div>
      </div>
    </div>
  )
}

