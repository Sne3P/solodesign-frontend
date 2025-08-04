import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface MenuButtonProps {
  initialMenuOpen?: boolean
}

const MenuButton: React.FC<MenuButtonProps> = ({ initialMenuOpen = false }) => {
  const [menuOpen, setMenuOpen] = useState(initialMenuOpen)
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const [isRedirecting, setIsRedirecting] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  useEffect(() => {
    const updateButtonPosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setButtonPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        })
      }
    }

    updateButtonPosition()
    window.addEventListener("resize", updateButtonPosition)

    return () => window.removeEventListener("resize", updateButtonPosition)
  }, [])

  const menuItems = [
    { text: "Accueil", path: "/" },
    { text: "Projets", path: "/projects" },
    { text: "Services", path: "/services" },
    { text: "À Propos", path: "/about-us" },
    { text: "Contact", path: "/contact" },
  ]

  const handleNavigation = (path: string) => {
    if (isRedirecting) return // Empêcher les clicks multiples
    
    setIsRedirecting(true)
    
    // Fermer le menu avec une animation fluide
    setMenuOpen(false)
    
    // Délai pour laisser l'animation de fermeture se jouer
    setTimeout(() => {
      if (path.startsWith("/#")) {
        // Pour les liens d'ancrage internes
        const sectionId = path.substring(2)
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: "smooth" })
        } else {
          router.push("/")
          setTimeout(() => {
            const sectionElement = document.getElementById(sectionId)
            if (sectionElement) {
              sectionElement.scrollIntoView({ behavior: "smooth" })
            }
          }, 100)
        }
      } else {
        // Navigation SPA avec Next.js router
        router.push(path)
      }
      
      // Reset du state après un petit délai
      setTimeout(() => {
        setIsRedirecting(false)
      }, 100)
    }, 300) // Temps de l'animation de fermeture
  }

  const menuItemVariants = {
    hover: {
      scale: 1.1,
      x: 20,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  return (
    <>
      <motion.div
        className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50"
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.button
          ref={buttonRef}
          className="bg-white text-black w-12 h-24 sm:w-16 sm:h-32 rounded-l-full flex items-center justify-start pl-2 sm:pl-4 group z-[10000] overflow-visible"
          onClick={() => !isRedirecting && setMenuOpen(!menuOpen)}
          whileHover={{
            scale: 1.1,
            transition: { type: "spring", stiffness: 400, damping: 12 },
          }}
          whileTap={{ scale: 0.95 }}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: menuOpen ? -5 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div whileHover={{ rotate: 90 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
              {menuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </motion.div>
          </motion.div>
        </motion.button>

        <div
          className="absolute top-0 right-0 w-12 h-24 sm:w-16 sm:h-32 bg-white rounded-l-full"
          style={{ transform: "translateX(70%)" }}
        />
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-white text-black z-40 flex items-center justify-center overflow-hidden"
            initial={{ clipPath: `circle(0px at ${buttonPosition.x}px ${buttonPosition.y}px)` }}
            animate={{
              clipPath: `circle(${Math.hypot(window.innerWidth, window.innerHeight) * 1.5}px at ${buttonPosition.x}px ${buttonPosition.y}px)`,
            }}
            exit={{ clipPath: `circle(0px at ${buttonPosition.x}px ${buttonPosition.y}px)` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="text-center">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.text}
                  className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold my-4 sm:my-6 text-black transition-colors relative group menu-item"
                  initial={{ opacity: 0, y: 50, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.1 * index, type: "spring", stiffness: 200, damping: 15 }}
                >
                  <motion.div variants={menuItemVariants} whileHover="hover" whileTap="tap">
                    <motion.span
                      onClick={() => {
                        if (!isRedirecting) {
                          handleNavigation(item.path)
                        }
                      }}
                      className="inline-block relative cursor-pointer"
                    >
                      {item.text}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-black"
                        initial={{ width: "0%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.span>
                  </motion.div>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default MenuButton

