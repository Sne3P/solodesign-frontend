"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useSpring, useScroll, useInView } from "framer-motion"
import { ParallaxProvider, useParallax } from "react-scroll-parallax"
import { ArrowLeft, ArrowRight, Calendar, Users, Code, Globe, X } from "lucide-react"
import LogoTitle from "../../../components/layout/LogoTitle"
import SocialLinks from "../../../components/layout/SocialLinks"
import MenuButton from "../../../components/layout/MenuButton"
import Footer from "../../../components/sections/Footer"
import ScrollArrow from "../../../components/layout/ScrollArrow"
import Cursor from "../../../components/layout/Cursor"
import { useRouter } from "next/navigation"

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

const ParallaxTitle = ({ children }: { children: React.ReactNode }) => {
  const titleParallax = useParallax<HTMLHeadingElement>({ speed: -5 })
  return (
    <motion.h1
      ref={titleParallax.ref}
      className="text-6xl font-bold mb-16 text-center"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      {children}
    </motion.h1>
  )
}

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3, margin: "-100px" })

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

const ProjectDetail = ({ params }: { params: { id: string } }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progressionDefilementFluide = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    document.body.classList.add("cursor-none")
    window.scrollTo(0, 0)
    setIsLoaded(true)
    return () => {
      document.body.classList.remove("cursor-none")
    }
  }, [])

  useEffect(() => {
    if (isLoaded) {
      document.body.style.overflow = selectedImage ? "hidden" : "auto"
    }
  }, [isLoaded, selectedImage])

  const handleBackClick = () => {
    document.body.classList.add("page-transition")
    const mainContent = document.querySelector("main")
    if (mainContent) {
      mainContent.style.opacity = "0"
      mainContent.style.transition = "opacity 0.5s ease"
    }
    setTimeout(() => router.push("/"), 500)
  }

  const projectDetails = [
    { icon: Calendar, title: "Durée du Projet", value: "6 mois" },
    { icon: Users, title: "Taille de l'Équipe", value: "8 personnes" },
    { icon: Code, title: "Technologies Utilisées", value: "React, Node.js, MongoDB" },
    { icon: Globe, title: "Portée du Projet", value: "Internationale" },
  ]

  return (
    <ParallaxProvider>
      <motion.div
        className="relative min-h-screen bg-white text-black overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LogoTitle className="text-black" />
        <SocialLinks className="text-black" />
        <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} className="text-black" />

        <motion.div
          className="fixed top-24 left-8 z-50 bg-black text-white p-3 rounded-full cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          onClick={handleBackClick}
        >
          <ArrowLeft size={24} />
        </motion.div>

        <main className="container mx-auto px-4 py-24">
          <ParallaxTitle>Projet {params.id}</ParallaxTitle>

          <AnimatedSection>
            <motion.div
              className="relative overflow-hidden rounded-lg shadow-2xl mb-24"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/placeholder.svg?height=600&width=1200"
                alt="Image du projet"
                className="w-full h-[600px] object-cover"
              />
            </motion.div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            <AnimatedSection>
              <motion.h2
                className="text-4xl font-semibold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Description du Projet
              </motion.h2>
              <motion.p
                className="text-xl text-gray-700 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu
                sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
              </motion.p>
              <motion.p
                className="text-xl text-gray-700 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur.
              </motion.p>
            </AnimatedSection>
            <AnimatedSection>
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {projectDetails.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "#f8f8f8",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.3 }}>
                      <item.icon size={24} className="text-gray-600" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-semibold">{item.title}</h3>
                      <p className="text-xl text-gray-700">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <h2 className="text-4xl font-semibold mb-8 text-center">Galerie du Projet</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  className="relative overflow-hidden rounded-lg shadow-xl cursor-pointer"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  onClick={() => setSelectedImage(`/placeholder.svg?height=600&width=800&text=Image ${item}`)}
                >
                  <img
                    src={`/placeholder.svg?height=300&width=400&text=Image ${item}`}
                    alt={`Image ${item} du projet`}
                    className="w-full h-[300px] object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white text-lg font-bold">Voir l’image</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="text-center mt-24">
              <h2 className="text-4xl font-semibold mb-6">Prêt à commencer votre projet ?</h2>
              <motion.button
                className="bg-black text-white px-8 py-4 rounded-full text-xl font-bold inline-flex items-center space-x-2 overflow-hidden relative"
                whileHover={{ scale: 1.05, rotate: 0.5 }}
                whileTap={{ scale: 0.95, rotate: -0.5 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <span>Contactez-nous</span>
                <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <ArrowRight size={24} />
                </motion.div>
              </motion.button>
            </div>
          </AnimatedSection>
        </main>

        <Footer className="bg-gray-100 text-black" />
        <ScrollArrow className="text-black" />
        <Cursor />

        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-black origin-left"
          style={{ scaleX: progressionDefilementFluide }}
        />

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
              onClick={() => setSelectedImage(null)}
            >
              <motion.img
                src={selectedImage}
                alt="Image agrandie"
                className="max-w-full max-h-full object-contain"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <motion.button
                className="absolute top-4 right-4 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
              >
                <X size={32} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ParallaxProvider>
  )
}

export default ProjectDetail

