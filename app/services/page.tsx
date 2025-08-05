"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useInView,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"
import {
  Code,
  Paintbrush,
  Shield,
  Zap,
  Layers,
  Globe,
  ArrowLeft,
  Users,
  Lightbulb,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import SocialLinks from "../../components/layout/SocialLinks"
import MenuButton from "../../components/layout/MenuButton"
import LogoTitle from "../../components/layout/LogoTitle"
import dynamic from 'next/dynamic';
const Cursor = dynamic(() => import('../../components/layout/Cursor'), { ssr: false });
import Footer from "../../components/sections/Footer"
import React from "react"

// -------------------- Data --------------------

const services = [
  {
    icon: <Paintbrush size={32} />,
    title: "Design UI/UX",
    description:
      "Création d'interfaces utilisateur intuitives et esthétiques qui captivent et engagent vos utilisateurs.",
    tools: ["Figma", "Adobe XD", "Sketch", "InVision"],
  },
  {
    icon: <Code size={32} />,
    title: "Développement Web",
    description:
      "Construction de sites web et d'applications performants, réactifs et évolutifs.",
    tools: ["React", "Next.js", "Vue.js", "Node.js", "TypeScript"],
  },
  {
    icon: <Shield size={32} />,
    title: "Sécurité Web",
    description:
      "Implémentation de mesures de sécurité robustes pour protéger vos données et vos utilisateurs.",
    tools: ["HTTPS", "OAuth", "JWT", "Firewall", "Penetration Testing"],
  },
  {
    icon: <Zap size={32} />,
    title: "Optimisation des Performances",
    description:
      "Amélioration de la vitesse et de l'efficacité de vos applications web pour une expérience utilisateur optimale.",
    tools: ["Webpack", "Lazy Loading", "CDN", "Caching", "Code Splitting"],
  },
  {
    icon: <Layers size={32} />,
    title: "Architecture Logicielle",
    description:
      "Conception de structures logicielles évolutives, maintenables et adaptées à vos besoins spécifiques.",
    tools: ["Microservices", "API RESTful", "GraphQL", "Domain-Driven Design"],
  },
  {
    icon: <Globe size={32} />,
    title: "Déploiement et Hébergement",
    description:
      "Mise en ligne et gestion de vos applications dans le cloud avec une scalabilité optimale.",
    tools: ["AWS", "Google Cloud", "Docker", "Kubernetes", "CI/CD"],
  },
]

// -------------------- Components --------------------

interface ServiceCardProps {
  service: any;
  index: number;
}
const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: false, amount: 0.2, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start("visible")
    else controls.start("hidden")
  }, [isInView, controls])

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 250, damping: 15, delay: index * 0.1 },
    },
  }

  const iconVariants = {
    hidden: { scale: 0.8, rotate: -5 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 250, damping: 15, delay: index * 0.1 + 0.2 },
    },
  }

  const toolVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1 + i * 0.05 + 0.3,
        type: "spring",
        stiffness: 250,
        damping: 15,
      },
    }),
  }

  return (
    <motion.div
      ref={cardRef}
      className="bg-white text-black p-6 rounded-lg shadow-lg transform-gpu"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{
        scale: 1.05,
        rotate: [0, -2, 2, -2, 2, 0],
        transition: { type: "spring", stiffness: 600, damping: 15 },
      }}
    >
      <motion.div className="mb-4 text-3xl" variants={iconVariants}>
        {service.icon}
      </motion.div>
      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <div className="flex flex-wrap gap-2">
        {service.tools.map((tool: string, toolIndex: number) => (
          <motion.span
            key={toolIndex}
            className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm transition-colors duration-200"
            variants={toolVariants}
            custom={toolIndex}
          >
            {tool}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

interface ProcessStepProps {
  step: any;
  index: number;
  totalSteps: number;
}
const ProcessStep = ({ step, index, totalSteps }: ProcessStepProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.5, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start("visible")
    else controls.start("hidden")
  }, [isInView, controls])

  const variants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -20 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 250, damping: 15, delay: index * 0.1 },
    },
  }

  return (
    <motion.div
      ref={ref}
      className="flex items-center mb-8 group cursor-pointer"
      variants={variants}
      initial="hidden"
      animate={controls}
      whileHover="hover"
    >
      <div className="relative">
        <motion.div
          className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl mr-4"
          variants={{
            hover: {
              scale: 1.1,
              boxShadow: "0 0 8px rgba(255,255,255,0.5)",
              transition: { type: "spring", stiffness: 800, damping: 20 },
            },
          }}
        >
          {index + 1}
        </motion.div>
        {index < totalSteps - 1 && (
          <motion.div
            className="absolute left-6 top-12 w-0.5 bg-white h-[calc(100%+2rem)] origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        )}
      </div>
      <motion.div
        variants={{
          hover: {
            x: 5,
            transition: { type: "spring", stiffness: 600, damping: 20 },
          },
        }}
      >
        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
        <p>{step.description}</p>
      </motion.div>
    </motion.div>
  )
}

/*
  GlowingCards : Conteneur captant le mouvement de la souris, même hors des cases.
*/
interface GlowingCardsProps {
  children: React.ReactNode;
}
const GlowingCards = ({ children }: GlowingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [globalPos, setGlobalPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setGlobalPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }

  const handleMouseLeave = () => {
    setGlobalPos({ x: -1000, y: -1000 })
  }

  return (
    <motion.div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ globalPos?: { x: number; y: number }; containerRef?: React.RefObject<HTMLDivElement> }>, { globalPos, containerRef })
        }
        return child
      })}
    </motion.div>
  )
}

/*
  GlowingCard : Case avec effet lumineux dynamique (légèrement atténué)
  Rendu cliquable pour activer le custom cursor (aucun effet de navigation).
*/
interface GlowingCardProps {
  children: React.ReactNode;
  index: number;
  globalPos?: { x: number; y: number };
  containerRef?: React.RefObject<HTMLDivElement>;
}
const GlowingCard = ({ children, index, globalPos, containerRef }: GlowingCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const hoverState = useSpring(0, { stiffness: 300, damping: 30 })
  const localX = useMotionValue(0)
  const localY = useMotionValue(0)

  useEffect(() => {
    if (globalPos && cardRef.current && containerRef?.current) {
      const cardRect = cardRef.current.getBoundingClientRect()
      const containerRect = containerRef.current.getBoundingClientRect()
      const relativeX = globalPos.x - (cardRect.left - containerRect.left)
      const relativeY = globalPos.y - (cardRect.top - containerRect.top)
      localX.set(relativeX)
      localY.set(relativeY)
    }
  }, [globalPos, containerRef, localX, localY])

  const handleHoverStart = () => hoverState.set(1)
  const handleHoverEnd = () => hoverState.set(0)

  const glowOpacity = useTransform([localX, localY], ([x, y]) => {
    if (!cardRef.current) return 0
    const { offsetWidth: width, offsetHeight: height } = cardRef.current
    const centerX = width / 2
    const centerY = height / 2
    const distance = Math.hypot(Number(x) - centerX, Number(y) - centerY)
    return Math.max(0, 1 - distance / (width / 1.5))
  })

  const background = useTransform(
    [localX, localY, glowOpacity, hoverState],
    ([x, y, opacity, h]) =>
      `radial-gradient(circle 150px at ${x}px ${y}px, rgba(255,255,255,${Number(opacity) * 0.2 * Number(h)}), transparent)`
  )

  return (
    <motion.div
      ref={cardRef}
      onClick={() => {}} // Rendre cliquable pour activer le custom cursor
      className="cursor-pointer relative overflow-hidden bg-white bg-opacity-5 p-6 rounded-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 20 },
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background }} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// -------------------- Main Page --------------------

const ServicesPage = () => {
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const router = useRouter()

  const processSteps = [
    {
      title: "Consultation",
      description:
        "Nous discutons en profondeur de vos besoins, objectifs et vision pour comprendre parfaitement votre projet.",
    },
    {
      title: "Analyse et Stratégie",
      description:
        "Nous élaborons une stratégie détaillée et un plan de projet, en identifiant les meilleures solutions techniques.",
    },
    {
      title: "Conception",
      description:
        "Nous créons des maquettes et des prototypes interactifs pour visualiser et affiner le produit final avant le développement.",
    },
    {
      title: "Développement",
      description:
        "Nous construisons votre solution en utilisant les dernières technologies et les meilleures pratiques de l'industrie.",
    },
    {
      title: "Tests et Assurance Qualité",
      description:
        "Nous effectuons des tests rigoureux pour garantir la qualité, la performance et la sécurité de votre produit.",
    },
    {
      title: "Lancement et Support",
      description:
        "Nous déployons votre projet et fournissons un support continu pour assurer son succès à long terme.",
    },
  ]

  useEffect(() => {
    setMounted(true)
    document.body.style.backgroundColor = "black"
    document.body.style.color = "white"
    return () => {
      document.body.style.backgroundColor = ""
      document.body.style.color = ""
    }
  }, [])

  if (!mounted) return null

  const MotionLink = motion(Link)

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50" style={{ scaleX }} />

      <LogoTitle />
      <SocialLinks />
      <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Cursor />

      {/* Bouton Retour */}
      <motion.div
        className="fixed top-24 left-8 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <MotionLink
          href="/"
          className="bg-white text-black p-3 rounded-full flex items-center justify-center"
          whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 600, damping: 15 } }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={28} />
        </MotionLink>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        className="h-screen flex flex-col justify-center items-center relative px-4"
        initial={{ opacity: 0, y: -50, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-10 text-center"
          whileHover={{ rotate: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          Nos Services
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-10 text-center"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          Des solutions innovantes pour propulser votre succès digital
        </motion.p>
      </motion.div>

      {/* Services Section */}
      <motion.div
        className="max-w-6xl mx-auto px-4 py-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: -20, rotate: -5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: -20, rotate: 5 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
        >
          Nos Expertises
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Process Section */}
      <motion.div
        className="max-w-4xl mx-auto px-4 py-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: -20, rotate: -5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: -20, rotate: 5 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
        >
          Notre Processus
        </motion.h2>
        <div className="relative">
          {processSteps.map((step, index) => (
            <ProcessStep key={index} step={step} index={index} totalSteps={processSteps.length} />
          ))}
        </div>
      </motion.div>

      {/* Glowing Cards Section */}
      <motion.div
        className="max-w-6xl mx-auto px-4 py-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: -20, rotate: -5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: -20, rotate: 5 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
        >
          Pourquoi Nous Choisir
        </motion.h2>
        <GlowingCards>
          {[
            {
              icon: <Users size={48} />,
              title: "Expertise",
              description:
                "Une équipe de professionnels passionnés et expérimentés dans tous les aspects du développement web.",
            },
            {
              icon: <Lightbulb size={48} />,
              title: "Innovation",
              description: "Toujours à la pointe de la technologie pour offrir des solutions modernes et efficaces.",
            },
            {
              icon: <TrendingUp size={48} />,
              title: "Résultats",
              description: "Un engagement envers l'excellence et des résultats mesurables pour votre entreprise.",
            },
          ].map((item, index) => (
            <GlowingCard key={index} index={index}>
              <motion.div
                className="mx-auto mb-4 text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 + index * 0.2 }}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-center">{item.title}</h3>
              <p className="text-center">{item.description}</p>
            </GlowingCard>
          ))}
        </GlowingCards>
      </motion.div>

      {/* Call-to-Action Section */}
      <motion.div
        className="text-center mt-16 py-20"
        initial={{ opacity: 0, y: 50, rotate: -5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        exit={{ opacity: 0, y: 50, rotate: 5 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-6"
          whileHover={{ rotate: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          Prêt à Innover ?
        </motion.h2>
        <motion.button
          className="bg-white text-black px-8 py-3 rounded-full text-lg font-bold"
          whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 600, damping: 15 } }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/contact")}
        >
          Contactez-nous
        </motion.button>
      </motion.div>

      <Footer />

      <motion.div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "0px -30px"] }}
        transition={{ repeat: Infinity, repeatType: "loop", duration: 10, ease: "linear" }}
      />
    </div>
  )
}

export default ServicesPage
