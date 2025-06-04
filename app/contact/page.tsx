"use client"

import React, { useState, useEffect, lazy, Suspense } from "react"
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion"
import { Send, ArrowLeft } from "lucide-react"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"
import Link from "next/link"
import { useRouter } from "next/navigation"

const SocialLinks = lazy(() => import("../../components/layout/SocialLinks"))
const MenuButton = lazy(() => import("../../components/layout/MenuButton"))
const ScrollArrow = lazy(() => import("../../components/layout/ScrollArrow"))
const Cursor = lazy(() => import("../../components/layout/Cursor"))
const LogoTitle = lazy(() => import("../../components/layout/LogoTitle"))
const Footer = lazy(() => import("../../components/sections/Footer"))

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const router = useRouter()

  useEffect(() => {
    document.body.style.backgroundColor = "black"
    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (response.ok) {
        alert("Message envoyé avec succès!")
      } else {
        alert("Erreur lors de l'envoi du message. Veuillez réessayer.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Une erreur s'est produite. Veuillez réessayer.")
    }

    setIsSubmitting(false)
  }

  const handleExit = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setTimeout(() => {
      router.push(href)
    }, 500) // Correspond à la durée de l'animation de sortie
  }

  return (
    <ParallaxProvider>
      <AnimatePresence mode="wait">
        <motion.div
          key="contact-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-black text-white overflow-x-hidden relative"
        >
          <Suspense fallback={<div className="bg-black">Chargement...</div>}>
            <LogoTitle />
            <SocialLinks />
            <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </Suspense>

          <motion.div
            className="fixed top-24 left-8 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" passHref>
              <motion.span
                className="bg-white text-black p-2 rounded-full inline-block cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleExit(e, "/")}
              >
                <ArrowLeft size={24} />
              </motion.span>
            </Link>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-start p-4 pt-32 min-h-screen text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            <Parallax speed={-5}>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tighter"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 10 }}
              >
                Contact
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-2xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 100, damping: 10 }}
              >
                Prêt à donner vie à votre projet ? Contactez-nous dès aujourd'hui pour une consultation gratuite et
                découvrez comment nous pouvons transformer votre vision en réalité.
              </motion.p>
            </Parallax>

            <motion.form
              onSubmit={handleSubmit}
              className="w-full max-w-md space-y-6 sm:space-y-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 100, damping: 10 }}
            >
              <InputField type="text" name="name" placeholder="Votre nom" required />
              <InputField type="email" name="email" placeholder="Votre email" required />
              <TextareaField name="message" placeholder="Votre message" required />
              <motion.button
                type="submit"
                className="w-full px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-opacity-90 transition-all flex items-center justify-center overflow-hidden relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center">
                  {isSubmitting ? (
                    <motion.div
                      className="w-6 h-6 border-t-2 border-black rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Envoyer
                    </>
                  )}
                </span>
              </motion.button>
            </motion.form>
          </motion.div>

          <Suspense fallback={<div className="bg-black">Chargement...</div>}>
            <ScrollArrow />
            <Cursor />
          </Suspense>

          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-white mix-blend-difference origin-left"
            style={{ scaleX }}
          />

          <BackgroundAnimation />

          <Suspense fallback={<div className="bg-black">Chargement...</div>}>
            <Footer />
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </ParallaxProvider>
  )
}

const InputField = React.memo(({ type, name, placeholder, required }) => (
  <motion.div className="relative overflow-hidden rounded-lg" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
    <motion.input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full px-6 py-4 bg-white bg-opacity-5 text-white placeholder-white placeholder-opacity-50 focus:outline-none transition-colors z-10 relative"
      whileFocus={{ scale: 1.02 }}
    />
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.5 }}
    />
  </motion.div>
))

const TextareaField = React.memo(({ name, placeholder, required }) => (
  <motion.div className="relative overflow-hidden rounded-lg" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
    <motion.textarea
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full px-6 py-4 bg-white bg-opacity-5 text-white placeholder-white placeholder-opacity-50 focus:outline-none transition-colors resize-none h-40 z-10 relative"
      whileFocus={{ scale: 1.02 }}
    />
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.5 }}
    />
  </motion.div>
))

const BackgroundAnimation = React.memo(() => (
  <motion.div
    className="fixed inset-0 pointer-events-none z-10"
    style={{
      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
      backgroundSize: "30px 30px",
    }}
    animate={{
      backgroundPosition: ["0px 0px", "0px -30px"],
    }}
    transition={{
      backgroundPosition: {
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        duration: 10,
        ease: "linear",
      },
    }}
  />
))

export default ContactPage

