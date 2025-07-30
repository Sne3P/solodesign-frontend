"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useSpring, useScroll, useInView } from "framer-motion"
import { ArrowLeft, Calendar, Users, Code, Globe, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import LogoTitle from "../../../components/layout/LogoTitle"
import SocialLinks from "../../../components/layout/SocialLinks"
import MenuButton from "../../../components/layout/MenuButton"
import Footer from "../../../components/sections/Footer"
import ScrollArrow from "../../../components/layout/ScrollArrow"
import Cursor from "../../../components/layout/Cursor"
import { Project } from "../../../lib/types"

const fadeInVariants = {
  hidden: { opacity: 0, y: 20, rotate: -1 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
}

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

interface ProjectDetailClientProps {
  id: string;
}

const ProjectDetailClient = ({ id }: ProjectDetailClientProps) => {
  const { scrollYProgress } = useScroll()
  const progressionDefilementFluide = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.body.classList.add("cursor-none")
    window.scrollTo(0, 0)
    setIsLoaded(true)
    fetchProject()
    
    return () => {
      document.body.classList.remove("cursor-none")
    }
  }, [id])

  useEffect(() => {
    if (isLoaded) {
      document.body.style.overflow = selectedImage ? "hidden" : "auto"
    }
  }, [isLoaded, selectedImage])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${id}`)
      if (response.ok) {
        const projectData = await response.json()
        setProject(projectData)
      } else if (response.status === 404) {
        setError('Projet non trouvé')
        // Rediriger vers la page 404 après 2 secondes
        setTimeout(() => {
          router.push('/projects')
        }, 2000)
      } else {
        setError('Erreur lors du chargement du projet')
      }
    } catch (error) {
      setError('Erreur lors du chargement du projet')
    } finally {
      setLoading(false)
    }
  }

  const handleBackClick = () => {
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Erreur</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackClick}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Retour à l'accueil
          </motion.button>
        </div>
      </div>
    )
  }

  const projectDetails = [
    { icon: Calendar, title: "Durée du Projet", value: project.duration },
    { icon: Users, title: "Taille de l'Équipe", value: project.teamSize },
    { icon: Code, title: "Technologies", value: project.technologies.join(", ") },
    { icon: Globe, title: "Portée", value: project.scope },
  ]

  return (
    <motion.div
      className="relative min-h-screen bg-white text-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LogoTitle />
      <SocialLinks />
      <MenuButton />

      <motion.button
        className="fixed top-24 left-8 z-50 bg-black text-white p-3 rounded-full cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleBackClick}
      >
        <ArrowLeft className="w-6 h-6" />
      </motion.button>

      <main className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-6xl font-bold mb-16 text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            {project.title}
          </motion.h1>

          <AnimatedSection>
            <div className="mb-16">
              <Image
                src={project.coverImage}
                alt={`Image de couverture - ${project.title}`}
                width={1200}
                height={600}
                className="w-full h-[600px] object-cover rounded-lg"
                priority
              />
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {projectDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-100 p-6 rounded-lg text-center"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <detail.icon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">{detail.title}</h3>
                  <p className="text-gray-600">{detail.value}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8">Description du Projet</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  {project.tags.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies */}
                  {project.technologies.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Technologies Utilisées</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {project.images.length > 0 && (
                    <Image
                      src={project.images[0].url}
                      alt="Détail du projet"
                      width={600}
                      height={320}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Galerie d'Images */}
          {project.images.length > 0 && (
            <AnimatedSection>
              <div className="mb-16">
                <h2 className="text-4xl font-bold mb-8">Galerie d&apos;Images</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.images.map((image, index) => (
                    <motion.div
                      key={image.id}
                      className="relative overflow-hidden rounded-lg cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedImage(image.url)}
                    >
                      <Image
                        src={image.url}
                        alt={`Image ${index + 1} du projet ${project.title}`}
                        width={400}
                        height={256}
                        className="w-full h-64 object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Vidéos */}
          {project.videos.length > 0 && (
            <AnimatedSection>
              <div className="mb-16">
                <h2 className="text-4xl font-bold mb-8">Vidéos du Projet</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {project.videos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      className="relative overflow-hidden rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <video
                        src={video.url}
                        controls
                        className="w-full h-64 object-cover"
                        preload="metadata"
                      >
                        Votre navigateur ne supporte pas la lecture de vidéos.
                      </video>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </main>

      <Footer />
      <ScrollArrow />
      <Cursor />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-50"
        style={{ scaleX: progressionDefilementFluide }}
      />

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-4"
            onClick={() => setSelectedImage(null)}
          >
            <Image
              src={selectedImage}
              alt="Image agrandie"
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
              style={{ maxWidth: '90vw', maxHeight: '90vh' }}
              priority
            />
            <motion.button
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ProjectDetailClient
