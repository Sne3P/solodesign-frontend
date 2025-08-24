"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence, useSpring, useScroll, useInView } from "framer-motion"
import { ArrowLeft, Calendar, Users, Code, Globe, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import LogoTitle from "../../../components/layout/LogoTitle"
import SocialLinks from "../../../components/layout/SocialLinks"
import MenuButton from "../../../components/layout/MenuButton"
import Footer from "../../../components/sections/Footer"
import ScrollArrow from "../../../components/layout/ScrollArrow"
import ActionButton from "../../../components/ui/ActionButton"
import CoverMedia from "../../../components/ui/CoverMedia"
import dynamic from 'next/dynamic';
const Cursor = dynamic(() => import('../../../components/layout/Cursor'), { ssr: false });
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
  const [isAdmin, setIsAdmin] = useState(false)

  // Vérifier si l'utilisateur est admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          credentials: 'include',
          cache: 'no-store'
        })
        setIsAdmin(response.ok)
      } catch {
        setIsAdmin(false)
      }
    }
    checkAdminStatus()
  }, [])

  const fetchProject = useCallback(async () => {
    try {
      const response = await fetch(`/api/projects/${id}`)
      if (response.ok) {
        const projectData = await response.json()
        
        // Vérifier si le projet est accessible
        if (projectData.status === 'draft' && !isAdmin) {
          setError('Ce projet n\'est pas encore disponible publiquement')
          setTimeout(() => {
            router.push('/projects')
          }, 2000)
          return
        }
        
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
    } catch (fetchError) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Erreur lors du fetch du projet:", fetchError)
      }
      setError('Erreur lors du chargement du projet')
    } finally {
      setLoading(false)
    }
  }, [id, router, isAdmin])

  useEffect(() => {
    document.body.classList.add("cursor-none")
    window.scrollTo(0, 0)
    setIsLoaded(true)
    
    return () => {
      document.body.classList.remove("cursor-none")
    }
  }, [])

  // Charger le projet quand on connaît le statut admin
  useEffect(() => {
    if (isAdmin !== undefined) {
      fetchProject()
    }
  }, [fetchProject, isAdmin])

  useEffect(() => {
    if (isLoaded) {
      document.body.style.overflow = selectedImage ? "hidden" : "auto"
    }
  }, [isLoaded, selectedImage])

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
          <ActionButton
            variant="primary"
            size="md"
            onClick={handleBackClick}
          >
            Retour à l&apos;accueil
          </ActionButton>
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
          <motion.div
            className="text-center mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            <h1 className="text-6xl font-bold mb-4">
              {project.title}
            </h1>
            
            {/* Badge mis en avant */}
            {project.featured && (
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg mr-2"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <span className="text-lg">⭐</span>
                Projet mis en avant
              </motion.div>
            )}
            
            {/* Badge brouillon pour les admins */}
            {project.status === 'draft' && isAdmin && (
              <motion.div
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                initial={{ scale: 0, rotate: 10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                <span className="text-lg">📝</span>
                Brouillon (Admin)
              </motion.div>
            )}
          </motion.div>

          <AnimatedSection>
            <div className="mb-16">
              <CoverMedia
                src={project.coverImage || '/placeholder.svg'}
                alt={`Image de couverture - ${project.title}`}
                className="w-full h-[600px] object-cover rounded-lg"
                priority
                autoPlay={true}
                muted={true}
                loop={true}
                controls={false}
                fallbackSrc="/placeholder.svg"
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
                    <div className="mb-6">
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

                  {/* Champs personnalisés */}
                  {project.customFields && Object.keys(project.customFields).length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Informations Supplémentaires</h3>
                      <div className="space-y-3">
                        {Object.entries(project.customFields).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-800 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </span>
                            <span className="text-gray-600 text-sm">
                              {typeof value === 'boolean' ? (value ? '✅ Oui' : '❌ Non') : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {project.images && project.images.length > 0 && (
                    <CoverMedia
                      src={(project.images[0] && project.images[0].url) || '/placeholder.svg'}
                      alt="Détail du projet"
                      className="w-full h-80 object-cover rounded-lg"
                      fallbackSrc="/placeholder.svg"
                    />
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Galerie d'Images */}
          {project.images && project.images.length > 0 && (
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
                      <CoverMedia
                        src={image.url || '/placeholder.svg'}
                        alt={`Image ${index + 1} du projet ${project.title}`}
                        className="w-full h-64 object-cover"
                        fallbackSrc="/placeholder.svg"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Vidéos */}
          {project.videos && project.videos.length > 0 && (
            <AnimatedSection>
              <div className="mb-16">
                <h2 className="text-4xl font-bold mb-8">Vidéos du Projet</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {project.videos.map((video) => (
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
