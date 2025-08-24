"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useInView,
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
  Database,
  ArrowLeft,
  Users,
  Lightbulb,
  TrendingUp
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import SocialLinks from "../../components/layout/SocialLinks"
import MenuButton from "../../components/layout/MenuButton"
import LogoTitle from "../../components/layout/LogoTitle"
import dynamic from 'next/dynamic';

// ===== CONSTANTES D'ANIMATION GLOBALES OPTIMISÉES =====
const SPRING_CONFIG = {
  fast: { type: "spring" as const, stiffness: 400, damping: 25 },
  smooth: { type: "spring" as const, stiffness: 200, damping: 20 },
  soft: { type: "spring" as const, stiffness: 100, damping: 15 }
}

const TRANSITIONS = {
  instant: { duration: 0.1 },
  quick: { duration: 0.2 },
  normal: { duration: 0.3 },
  slow: { duration: 0.5 }
}

const ENTRANCE_VARIANTS = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  hover: { y: -8 }
}

const HOVER_EFFECTS = {
  lift: { y: -8, transition: SPRING_CONFIG.fast },
  scale: { scale: 1.05, transition: SPRING_CONFIG.fast },
  glow: { filter: "brightness(1.1)", transition: TRANSITIONS.quick }
}

// Configuration optimisée pour les animations continues
const FLOATING_CONFIG = {
  repeat: Infinity,
  ease: "easeInOut" as const
}

const ROTATING_CONFIG = {
  repeat: Infinity,
  ease: "linear" as const
}

// Délais optimisés pour les animations séquentielles
const STAGGER_DELAYS = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15
}

// Variantes pour les textes et contenus
const TEXT_VARIANTS = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
}

const CONTENT_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}

// Animations optimisées avec will-change pour de meilleures performances
const PERFORMANCE_PROPS = {
  style: { willChange: 'transform, opacity' },
  layout: false as const,
  layoutId: undefined
}
const Cursor = dynamic(() => import('../../components/layout/Cursor'), { ssr: false });
import Footer from "../../components/sections/Footer"
import ActionButton from "../../components/ui/ActionButton"
import React from "react"

// -------------------- Types --------------------

interface BentoItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TimelineStepType {
  title: string;
  description: string;
  details?: string[];
}

interface ExpertiseArea {
  category: string;
  skills: string[];
}

// -------------------- Data --------------------

const mainServices = [
  {
    icon: <Paintbrush size={32} />,
    title: "Design & Identité Visuelle",
    description: "Création d'identités de marque uniques et mémorables qui marquent les esprits et créent une connexion émotionnelle avec votre audience.",
    features: ["Logo & Charte graphique complète", "Design print & supports communication", "Packaging & Merchandising", "Identité digitale & Guidelines"],
    tools: ["Figma", "Adobe Creative Suite", "Sketch", "InVision", "Principle"],
    benefits: ["Reconnaissance de marque maximale", "Cohérence visuelle totale", "Impact émotionnel fort"]
  },
  {
    icon: <Code size={32} />,
    title: "Développement Web",
    description: "Sites web et applications modernes, performants et optimisés pour la conversion, utilisant les dernières technologies.",
    features: ["Sites vitrine & E-commerce", "Applications web complexes & SaaS", "Progressive Web Apps (PWA)", "API & Intégrations"],
    tools: ["React", "Next.js", "TypeScript", "Node.js", "Prisma", "Tailwind CSS"],
    benefits: ["Performance optimale", "SEO intégré", "Évolutivité garantie"]
  },
  {
    icon: <Zap size={32} />,
    title: "Stratégie Digitale",
    description: "Optimisation et croissance de votre présence digitale avec des stratégies sur mesure basées sur l'analyse de données.",
    features: ["Audit complet & Stratégie", "Analytics avancés & Reporting", "Optimisation conversion (CRO)", "Consulting & Accompagnement"],
    tools: ["Google Analytics", "Hotjar", "SEMrush", "Google Tag Manager", "Mixpanel"],
    benefits: ["ROI maximisé", "Trafic qualifié ciblé", "Conversion optimisée"]
  },
  {
    icon: <Shield size={32} />,
    title: "Hébergement & Infrastructure",
    description: "Solutions cloud sécurisées, performantes et scalables pour héberger vos projets avec une disponibilité maximale.",
    features: ["Hébergement web premium", "CDN & Optimisation globale", "Sauvegarde & Sécurité", "Monitoring 24/7"],
    tools: ["AWS", "Google Cloud", "Cloudflare", "Docker", "Kubernetes", "Terraform"],
    benefits: ["Disponibilité maximale", "Performances ultra-rapides", "Sécurité renforcée"]
  },
  {
    icon: <Globe size={32} />,
    title: "SEO & Référencement",
    description: "Visibilité maximale sur les moteurs de recherche avec des stratégies SEO techniques et de contenu personnalisées.",
    features: ["SEO technique & audit complet", "Stratégie de contenu SEO", "Google Ads & SEM", "Analytics & Reporting détaillé"],
    tools: ["SEMrush", "Ahrefs", "Google Search Console", "Screaming Frog", "Google Ads"],
    benefits: ["Visibilité Google maximale", "Trafic organique qualifié", "Leads qualifiés ciblés"]
  },
  {
    icon: <Layers size={32} />,
    title: "Applications Mobile",
    description: "Applications natives et cross-platform performantes pour iOS et Android, offrant une expérience utilisateur exceptionnelle.",
    features: ["iOS & Android natif", "React Native & Flutter", "Progressive Web Apps", "App Store Optimization"],
    tools: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "Firebase"],
    benefits: ["Performance native", "Déploiement multi-plateforme", "Maintenance simplifiée"]
  }
];

const expertiseAreas = [
  {
    category: "Technologies Frontend",
    skills: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS", "SASS/SCSS", "Webpack", "Vite"]
  },
  {
    category: "Technologies Backend",
    skills: ["Node.js", "Python", "PHP", "Java", "Express", "NestJS", "Django", "Laravel", "Spring Boot"]
  },
  {
    category: "Bases de Données",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "Supabase", "Prisma ORM", "Elasticsearch"]
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD", "GitHub Actions"]
  },
  {
    category: "Design & UX",
    skills: ["Figma", "Adobe XD", "Sketch", "Adobe Creative Suite", "Framer", "Principle", "InVision", "Miro"]
  },
  {
    category: "Marketing Digital",
    skills: ["Google Analytics", "Google Ads", "Facebook Ads", "SEO/SEM", "Email Marketing", "Content Strategy"]
  }
];



// -------------------- Components --------------------

const ServiceSlider = ({ services }: { services: typeof mainServices }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scrollToSlide = (index: number) => {
    if (containerRef.current) {
      const slideWidth = containerRef.current.offsetWidth
      containerRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const handleScroll = () => {
    if (containerRef.current) {
      const slideWidth = containerRef.current.offsetWidth
      const newIndex = Math.round(containerRef.current.scrollLeft / slideWidth)
      setCurrentIndex(newIndex)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container && isMobile) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      return () => container.removeEventListener('scroll', handleScroll)
    }
    return () => {} // Return empty cleanup function for consistency
  }, [isMobile])

  if (!isMobile) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="relative w-full">
      {/* Native Scroll Container */}
      <motion.div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="w-full flex-shrink-0 px-2 snap-center"
            style={{ 
              minWidth: "100%",
              scrollSnapAlign: 'center',
              scrollSnapStop: 'always'
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ServiceCard service={service} index={index} />
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {services.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
            onClick={() => scrollToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Hint Text */}
      <div className="flex justify-center mt-2 opacity-60">
        <p className="text-xs text-white/70">← Glissez pour naviguer →</p>
      </div>
    </div>
  )
}

interface ServiceCardProps {
  service: {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    tools: string[];
    benefits: string[];
  };
  index: number;
}

const BentoCard = ({ item, index, className = "" }: { item: BentoItem; index: number; className?: string }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      className={`relative group overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 p-8 ${className}`}
      initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1, 
        rotateX: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: index * 0.15
        }
      } : { opacity: 0, scale: 0.8, rotateX: -20 }}
      whileHover={{
        scale: 1.02,
        rotateY: 2,
        rotateX: 2,
        backgroundColor: "rgba(255,255,255,0.15)",
        borderColor: "rgba(255,255,255,0.4)",
        transition: SPRING_CONFIG.fast
      }}
      whileTap={{ scale: 0.98, transition: TRANSITIONS.instant }}
      style={{ perspective: 1000 }}
    >
      {/* Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at ${50 + index * 20}% ${30 + index * 15}%, rgba(255,255,255,0.3) 0%, transparent 50%)`
        }}
        animate={{
          background: [
            `radial-gradient(circle at ${50 + index * 20}% ${30 + index * 15}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
            `radial-gradient(circle at ${30 + index * 20}% ${50 + index * 15}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
            `radial-gradient(circle at ${50 + index * 20}% ${30 + index * 15}%, rgba(255,255,255,0.3) 0%, transparent 50%)`
          ]
        }}
        transition={{
          duration: 4 + index,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Icon */}
      <motion.div
        className="relative z-10 mb-6 text-white"
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 20,
          delay: index * 0.15 + 0.3
        }}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { type: "spring", stiffness: 600, damping: 15 }
        }}
      >
        {item.icon}
      </motion.div>

      {/* Title */}
      <motion.h3
        className="relative z-10 text-2xl font-bold mb-4 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: index * 0.15 + 0.4, duration: 0.4 }}
      >
        {item.title}
      </motion.h3>

      {/* Description */}
      <motion.p
        className="relative z-10 text-gray-300 leading-relaxed"
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ delay: index * 0.15 + 0.5, duration: 0.4 }}
      >
        {item.description}
      </motion.p>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 2 + index * 0.5,
          ...FLOATING_CONFIG
        }}
      />
      
      <motion.div
        className="absolute bottom-6 left-6 w-1 h-1 bg-white/40 rounded-full"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          ...FLOATING_CONFIG,
          duration: 3 + index * 0.3,
          delay: 1
        }}
      />
    </motion.div>
  )
}

const TimelineStep = ({ step, index, totalSteps }: { step: TimelineStepType; index: number; totalSteps: number }) => {
  const stepRef = useRef(null)
  const isInView = useInView(stepRef, { once: true, amount: 0.2, margin: "-20px" })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={stepRef}
      className="relative flex items-center mb-8 sm:mb-16"
      initial={{ opacity: 0, x: isEven ? -60 : 60, y: 20 }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: {
          ...SPRING_CONFIG.smooth,
          delay: index * STAGGER_DELAYS.normal
        }
      } : { opacity: 0, x: isEven ? -60 : 60, y: 20 }}
    >
      {/* Mobile Layout - Vertical */}
      <div className="block sm:hidden w-full">
        {/* Timeline Line for Mobile */}
        {index < totalSteps - 1 && (
          <motion.div
            className="absolute left-8 top-16 w-0.5 h-24 bg-gradient-to-b from-white to-gray-600 z-0"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { 
              scaleY: 1, 
              opacity: 1,
              transition: { delay: index * 0.1 + 0.3, duration: 0.6 }
            } : { scaleY: 0, opacity: 0 }}
            style={{ originY: 0 }}
          />
        )}

        {/* Mobile Content */}
        <div className="flex items-start">
          {/* Circle for Mobile */}
          <motion.div
            className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl flex-shrink-0"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={isInView ? { 
              scale: 1, 
              rotate: 0, 
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: index * 0.1 + 0.05
              }
            } : { scale: 0, rotate: -180, opacity: 0 }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 30px rgba(255,255,255,0.5)",
              transition: SPRING_CONFIG.fast
            }}
          >
            <motion.span 
              className="text-black font-bold text-xl"
              initial={{ opacity: 0 }}
              animate={isInView ? { 
                opacity: 1,
                transition: { delay: index * 0.1 + 0.2, duration: 0.2 }
              } : { opacity: 0 }}
            >
              {index + 1}
            </motion.span>
          </motion.div>

          {/* Content for Mobile */}
          <motion.div
            className="ml-4 flex-1"
            whileHover={{ 
              scale: 1.02, 
              y: -2,
              transition: SPRING_CONFIG.smooth
            }}
          >
            <motion.div
              className="bg-white bg-opacity-10 backdrop-blur-lg p-4 sm:p-6 rounded-2xl border border-white border-opacity-20 shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { 
                scale: 1, 
                opacity: 1,
                transition: { 
                  delay: index * STAGGER_DELAYS.normal + 0.15, 
                  ...SPRING_CONFIG.smooth
                }
              } : { scale: 0.9, opacity: 0 }}
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.15)",
                borderColor: "rgba(255,255,255,0.4)",
                transition: { duration: 0.2 }
              }}
            >
              <motion.h3 
                className="text-lg sm:text-xl font-bold mb-3 text-white"
                variants={TEXT_VARIANTS}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * STAGGER_DELAYS.normal + 0.25, ...TRANSITIONS.normal }}
                {...PERFORMANCE_PROPS}
              >
                {step.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 mb-4 text-sm sm:text-base"
                variants={CONTENT_VARIANTS}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * STAGGER_DELAYS.normal + 0.3, ...TRANSITIONS.normal }}
                {...PERFORMANCE_PROPS}
              >
                {step.description}
              </motion.p>

              {step.details && (
                <motion.ul 
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { 
                    opacity: 1,
                    transition: { delay: index * 0.1 + 0.35, duration: 0.3 }
                  } : { opacity: 0 }}
                >
                  {step.details.map((detail: string, detailIndex: number) => (
                    <motion.li
                      key={detailIndex}
                      className="flex items-start text-sm text-gray-400"
                      initial={{ opacity: 0, x: -15 }}
                      animate={isInView ? { 
                        opacity: 1, 
                        x: 0,
                        transition: {
                          delay: index * STAGGER_DELAYS.normal + detailIndex * STAGGER_DELAYS.fast + 0.4,
                          ...SPRING_CONFIG.smooth
                        }
                      } : { opacity: 0, x: -15 }}
                    >
                      <motion.div 
                        className="w-1.5 h-1.5 bg-white rounded-full mt-2 mr-3 flex-shrink-0"
                        whileHover={{ scale: 1.8, transition: SPRING_CONFIG.fast }}
                      />
                      {detail}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className={`hidden sm:flex items-center w-full ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Timeline Line for Desktop */}
        {index < totalSteps - 1 && (
          <motion.div
            className="absolute left-1/2 top-20 w-1 h-32 bg-gradient-to-b from-white to-gray-600 transform -translate-x-1/2 z-0"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { 
              scaleY: 1, 
              opacity: 1,
              transition: { delay: index * 0.1 + 0.3, duration: 0.6 }
            } : { scaleY: 0, opacity: 0 }}
            style={{ originY: 0 }}
          />
        )}

        {/* Step Content */}
        <motion.div
          className={`flex-1 ${isEven ? 'pr-8' : 'pl-8'}`}
          whileHover={{ 
            scale: 1.02, 
            y: -4,
            transition: { type: "spring", stiffness: 300, damping: 15 } 
          }}
        >
          <motion.div
            className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl border border-white border-opacity-20 shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { 
              scale: 1, 
              opacity: 1,
              transition: { 
                delay: index * STAGGER_DELAYS.normal + 0.15, 
                ...SPRING_CONFIG.smooth
              }
            } : { scale: 0.9, opacity: 0 }}
            whileHover={{
              backgroundColor: "rgba(255,255,255,0.15)",
              borderColor: "rgba(255,255,255,0.4)",
              transition: TRANSITIONS.quick
            }}
          >
            <motion.h3 
              className="text-xl font-bold mb-3 text-white"
              variants={TEXT_VARIANTS}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: index * STAGGER_DELAYS.normal + 0.25, ...TRANSITIONS.normal }}
              {...PERFORMANCE_PROPS}
            >
              {step.title}
            </motion.h3>
            
            <motion.p 
              className="text-gray-300 mb-4"
              variants={CONTENT_VARIANTS}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: index * STAGGER_DELAYS.normal + 0.3, ...TRANSITIONS.normal }}
              {...PERFORMANCE_PROPS}
            >
              {step.description}
            </motion.p>

            {step.details && (
              <motion.ul 
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { 
                  opacity: 1,
                  transition: { delay: index * 0.1 + 0.35, duration: 0.3 }
                } : { opacity: 0 }}
              >
                {step.details.map((detail: string, detailIndex: number) => (
                  <motion.li
                    key={detailIndex}
                    className="flex items-start text-sm text-gray-400"
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        delay: index * STAGGER_DELAYS.normal + detailIndex * STAGGER_DELAYS.fast + 0.4,
                        ...SPRING_CONFIG.smooth
                      }
                    } : { opacity: 0, x: -15 }}
                  >
                    <motion.div 
                      className="w-1.5 h-1.5 bg-white rounded-full mt-2 mr-3 flex-shrink-0"
                      whileHover={{ scale: 1.8, transition: { type: "spring", stiffness: 500, damping: 15 } }}
                    />
                    {detail}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        </motion.div>

        {/* Central Circle */}
        <motion.div
          className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl"
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={isInView ? { 
            scale: 1, 
            rotate: 0, 
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: index * 0.1 + 0.05
            }
          } : { scale: 0, rotate: -180, opacity: 0 }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px rgba(255,255,255,0.5)",
            transition: SPRING_CONFIG.fast
          }}
        >
          <motion.span 
            className="text-black font-bold text-xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { 
              opacity: 1,
              transition: { delay: index * 0.1 + 0.2, duration: 0.2 }
            } : { opacity: 0 }}
          >
            {index + 1}
          </motion.span>
        </motion.div>

        {/* Empty space for alignment */}
        <div className={`flex-1 ${isEven ? 'pl-8' : 'pr-8'}`} />
      </div>
    </motion.div>
  )
}

const ExpertiseModal = ({ expertise, isOpen, onClose }: { 
  expertise: ExpertiseArea | null; 
  isOpen: boolean; 
  onClose: () => void 
}) => {
  if (!isOpen || !expertise) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-200 rounded-xl flex items-center justify-center mr-6 shadow-lg">
            <span className="text-black font-bold text-2xl">
              {expertise?.category?.split(' ')[0]?.charAt(0) ?? ''}
            </span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{expertise.category}</h2>
            <p className="text-white/70">Maîtrise complète de {expertise.skills.length} technologies</p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {expertise.skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-center hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-white font-medium">{skill}</span>
            </motion.div>
          ))}
        </div>

        {/* Experience Level */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-white/90 font-medium">Niveau d&apos;expertise</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <motion.div
                  key={level}
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: level * 0.1, type: "spring", stiffness: 400, damping: 20 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const ExpertiseCard = ({ expertise, index, onClick }: { 
  expertise: ExpertiseArea; 
  index: number; 
  onClick: () => void 
}) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2, margin: "-20px" })

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      variants={CARD_VARIANTS}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ ...HOVER_EFFECTS.lift, ...HOVER_EFFECTS.scale }}
      whileTap={{ scale: 0.95, transition: TRANSITIONS.instant }}
      transition={{ ...SPRING_CONFIG.smooth, delay: index * STAGGER_DELAYS.normal }}
      onClick={onClick}
    >
      {/* Click indicator */}
      <motion.div
        className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg"
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </motion.div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 2, -2, 0] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* Main Card - Simplified */}
      <motion.div
        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-full relative overflow-hidden min-h-[200px] flex flex-col items-center justify-center text-center"
        whileHover={{
          backgroundColor: "rgba(255,255,255,0.15)",
          borderColor: "rgba(255,255,255,0.4)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
          transition: { duration: 0.3 }
        }}
      >
        {/* Gradient background shapes */}
        <motion.div 
          className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-l from-purple-500/20 to-transparent rounded-full blur-xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, ...ROTATING_CONFIG }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-r from-pink-500/20 to-transparent rounded-full blur-xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, ...ROTATING_CONFIG }}
        />

        {/* Icon - Sans background, juste l'icône */}
        <motion.div
          className="w-16 h-16 mb-4 text-white flex items-center justify-center"
          whileHover={{ 
            scale: 1.2, 
            rotate: [0, -10, 10, 0],
            transition: { duration: 0.5 }
          }}
        >
          {getExpertiseIcon(expertise.category)}
        </motion.div>

        {/* Title */}
        <motion.h3 
          className="text-xl font-bold text-white mb-3 leading-tight"
          initial={{ opacity: 0 }}
          animate={isInView ? { 
            opacity: 1,
            transition: { delay: index * 0.1 + 0.2, duration: 0.3 }
          } : { opacity: 0 }}
        >
          {expertise.category}
        </motion.h3>

        {/* Hint text */}
        <motion.p 
          className="text-sm text-purple-300 opacity-75 font-medium"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.02, 1] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          Cliquez pour plus d&apos;infos
        </motion.p>

        {/* Skills count indicator */}
        <motion.div
          className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white font-semibold"
          initial={{ scale: 0 }}
          animate={isInView ? { 
            scale: 1,
            transition: { delay: index * 0.1 + 0.4, type: "spring", stiffness: 400, damping: 20 }
          } : { scale: 0 }}
        >
          {expertise.skills.length} compétences
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Helper function pour les icônes d'expertise
const getExpertiseIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'technologies frontend':
      return <Globe className="w-full h-full" />
    case 'technologies backend':
      return <Code className="w-full h-full" />
    case 'bases de données':
      return <Database className="w-full h-full" />
    case 'cloud & devops':
      return <Shield className="w-full h-full" />
    case 'design & ux':
      return <Paintbrush className="w-full h-full" />
    case 'marketing digital':
      return <Zap className="w-full h-full" />
    default:
      return <Code className="w-full h-full" />
  }
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2, margin: "-20px" })
  const [isMobile, setIsMobile] = useState(false)
  
  // Cursor light effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const lightX = useTransform(mouseX, (value) => `${value}px`)
  const lightY = useTransform(mouseY, (value) => `${value}px`)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - rect.left)
    mouseY.set(event.clientY - rect.top)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl text-white p-6 sm:p-8 rounded-3xl border border-white/10 group"
      variants={CARD_VARIANTS}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={HOVER_EFFECTS.lift}
      whileTap={{ scale: 0.98, transition: TRANSITIONS.instant }}
      transition={{ ...SPRING_CONFIG.smooth, delay: index * STAGGER_DELAYS.fast }}
      onMouseMove={handleMouseMove}
    >
      {/* Glassmorphic Cursor Light Effect */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
          style={{
            background: `radial-gradient(circle 120px at ${lightX} ${lightY}, rgba(255,255,255,0.15), transparent 70%)`
          }}
        />
      )}

      {/* Enhanced glassmorphic background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      
      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-3xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <motion.div 
          className="mb-6 text-white" 
          initial={{ opacity: 0, scale: 0, rotate: -45 }}
          animate={isInView ? { 
            opacity: 1, 
            scale: 1, 
            rotate: 0,
            transition: {
              type: "spring", 
              stiffness: 400, 
              damping: 20, 
              delay: index * 0.06 + 0.15
            }
          } : { opacity: 0, scale: 0, rotate: -45 }}
          whileHover={{
            scale: 1.1,
            rotate: 5,
          transition: { type: "spring", stiffness: 500, damping: 15 }
        }}
      >
        {service.icon}
      </motion.div>
      
      <div className="mb-6">
        <motion.h3 
          className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { delay: index * 0.06 + 0.2, duration: 0.4 }
          } : { opacity: 0, y: 20 }}
        >
          {service.title}
        </motion.h3>
        <motion.p 
          className="text-white/70 mb-4 leading-relaxed text-sm sm:text-base group-hover:text-white/90 transition-colors duration-300"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { delay: index * 0.06 + 0.25, duration: 0.4 }
          } : { opacity: 0, y: 15 }}
        >
          {service.description}
        </motion.p>
      </div>

      <div className="mb-6">
        <motion.h4 
          className="font-medium text-white/90 mb-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { 
            opacity: 1,
            transition: { delay: index * 0.06 + 0.3, duration: 0.3 }
          } : { opacity: 0 }}
        >
          Prestations incluses:
        </motion.h4>
        <ul className="space-y-2">
          {service.features.map((feature: string, idx: number) => (
            <motion.li
              key={idx}
              className="flex items-start text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300"
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { 
                opacity: 1, 
                x: 0,
                transition: {
                  delay: index * 0.06 + idx * 0.03 + 0.35,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              } : { opacity: 0, x: -15 }}
            >
              <motion.div 
                className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"
                whileHover={{ scale: 1.8, transition: { type: "spring", stiffness: 500, damping: 15 } }}
              />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <motion.h4 
          className="font-medium text-white/90 mb-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { 
            opacity: 1,
            transition: { delay: index * 0.06 + 0.45, duration: 0.3 }
          } : { opacity: 0 }}
        >
          Bénéfices clés:
        </motion.h4>
        <div className="flex flex-wrap gap-2">
          {service.benefits.map((benefit: string, idx: number) => (
            <motion.span
              key={idx}
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-3 py-1 rounded-full text-xs font-medium cursor-default group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1,
                transition: {
                  delay: index * 0.06 + idx * 0.04 + 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              } : { opacity: 0, scale: 0.7 }}
              whileHover={{
                scale: 1.05,
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 15 }
              }}
            >
              {benefit}
            </motion.span>
          ))}
        </div>
      </div>

      <div>
        <motion.h4 
          className="font-medium text-white/90 mb-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { 
            opacity: 1,
            transition: { delay: index * 0.06 + 0.6, duration: 0.3 }
          } : { opacity: 0 }}
        >
          Technologies utilisées:
        </motion.h4>
        <div className="flex flex-wrap gap-2">
          {service.tools.map((tool: string, toolIndex: number) => (
            <motion.span
              key={toolIndex}
              className="bg-white/5 backdrop-blur-sm text-white/80 border border-white/20 px-3 py-1 rounded text-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 cursor-default"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: index * 0.06 + toolIndex * 0.02 + 0.65,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              } : { opacity: 0, y: 10 }}
              whileHover={{
                scale: 1.05,
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 15 }
              }}
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
      </div>
    </motion.div>
  )
}

const AdditionalServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Gestion scroll mobile
  const handleScroll = () => {
    if (scrollRef.current && isMobile) {
      const slideWidth = scrollRef.current.offsetWidth
      const newIndex = Math.round(scrollRef.current.scrollLeft / slideWidth)
      setCurrentIndex(newIndex)
    }
  }

  const scrollToSlide = (index: number) => {
    if (scrollRef.current && isMobile) {
      const slideWidth = scrollRef.current.offsetWidth
      scrollRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      })
    } else {
      setCurrentIndex(index)
    }
  }

  useEffect(() => {
    const container = scrollRef.current
    if (container && isMobile) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      return () => container.removeEventListener('scroll', handleScroll)
    }
    return () => {}
  }, [isMobile])

  const additionalServices = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Email Marketing",
      description: "Campagnes automatisées et segmentées pour maximiser l'engagement",
      features: ["Automation comportementale", "Segmentation avancée", "A/B Testing optimisé", "Analytics en temps réel"]
    },
    {
      icon: <Paintbrush className="w-8 h-8" />,
      title: "Photo & Vidéo",
      description: "Contenu visuel professionnel et impactant",
      features: ["Shooting corporate & produits", "Montage vidéo cinématographique", "Motion design animé", "Captation drone & 360°"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Marketing Digital",
      description: "Stratégies multi-canaux pour amplifier votre présence",
      features: ["Social Media Management", "Publicité ciblée performante", "Influencer Marketing", "Content Marketing stratégique"]
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Consultation Stratégique",
      description: "Analyse approfondie de votre projet et conseils personnalisés pour optimiser votre présence digitale.",
      features: ["Audit complet", "Stratégie sur mesure", "Roadmap détaillée"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Maintenance & Support",
      description: "Surveillance continue, mises à jour de sécurité et support technique pour garantir la performance.",
      features: ["Monitoring 24/7", "Sauvegardes automatiques", "Support prioritaire"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Optimisation Performance",
      description: "Amélioration des temps de chargement, optimisation SEO et enhancement de l'expérience utilisateur.",
      features: ["Optimisation vitesse", "SEO technique", "Analytics avancés"]
    }
  ]

  // Auto-scroll effect
  useEffect(() => {
    if (!isPaused && isInView && !isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % additionalServices.length)
      }, 4000)
      return () => clearInterval(interval)
    }
    return () => {}
  }, [isPaused, isInView, additionalServices.length, isMobile])

  const nextSlide = () => {
    if (isMobile) {
      const nextIndex = (currentIndex + 1) % additionalServices.length
      scrollToSlide(nextIndex)
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % additionalServices.length)
    }
  }

  const prevSlide = () => {
    if (isMobile) {
      const prevIndex = currentIndex === 0 ? additionalServices.length - 1 : currentIndex - 1
      scrollToSlide(prevIndex)
    } else {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? additionalServices.length - 1 : prevIndex - 1
      )
    }
  }

  return (
    <section ref={ref} className="relative py-16 sm:py-20 overflow-hidden">
      {/* Soft animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-slate-900/50">
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.15),_transparent_60%)]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,119,198,0.15),_transparent_60%)]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_rgba(120,219,226,0.1),_transparent_50%)]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.25, 0, 1] }}
          >
            Services Complémentaires
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.25, 0, 1] }}
          >
            Solutions expertes pour accompagner votre croissance digitale
          </motion.p>
        </motion.div>

        {/* Carousel - Desktop et Mobile */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Version Desktop */}
          {!isMobile && (
            <div className="overflow-hidden rounded-3xl">
              <motion.div
                className="flex"
                animate={{
                  x: `${-currentIndex * (100 / 3)}%`
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                  mass: 0.8
                }}
                style={{
                  width: `${(additionalServices.length * 100) / 3}%`
                }}
              >
                {additionalServices.map((service, index) => (
                  <motion.div
                    key={index}
                    className="w-1/3 px-4 flex-shrink-0"
                    style={{ minWidth: "calc(100% / 3)" }}
                  >
                    <motion.div
                      className="group relative h-full"
                      initial={{ opacity: 0, y: 50, rotateY: -15 }}
                      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.6 + (index % 3) * 0.2,
                        type: "spring",
                        stiffness: 150,
                        damping: 20
                      }}
                      whileHover={{ 
                        y: -10,
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                      }}
                    >
                      {/* Card Container */}
                      <div className="relative h-full min-h-[350px]">
                        {/* Glassmorphic Background */}
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 group-hover:border-white/20 transition-all duration-500" />
                        
                        {/* Content */}
                        <div className="relative p-6 sm:p-8 h-full flex flex-col">
                          {/* Icon */}
                          <motion.div 
                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <div className="text-white text-2xl">
                              {service.icon}
                            </div>
                          </motion.div>

                          {/* Title */}
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all duration-300">
                            {service.title}
                          </h3>

                          {/* Description */}
                          <p className="text-white/70 mb-6 leading-relaxed flex-grow text-sm sm:text-base">
                            {service.description}
                          </p>

                          {/* Features List */}
                          <div className="space-y-2">
                            {service.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                              <motion.div
                                key={featureIndex}
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ 
                                  duration: 0.5, 
                                  delay: 0.8 + (index % 3) * 0.2 + featureIndex * 0.1,
                                  ease: [0.25, 0.25, 0, 1]
                                }}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 group-hover:scale-125 transition-transform duration-300" />
                                <span className="text-white/80 text-xs sm:text-sm group-hover:text-white transition-colors duration-300">
                                  {feature}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Version Mobile - Scroll Natif */}
          {isMobile && (
            <motion.div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory rounded-3xl"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {additionalServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="w-full px-4 flex-shrink-0 snap-center"
                  style={{ 
                    minWidth: "100%",
                    scrollSnapAlign: 'center',
                    scrollSnapStop: 'always'
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="group relative h-full"
                    whileHover={{ 
                      y: -5,
                      scale: 1.01,
                      transition: { type: "spring", stiffness: 400, damping: 25 }
                    }}
                  >
                    {/* Card Container */}
                    <div className="relative h-full min-h-[350px]">
                      {/* Glassmorphic Background */}
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 group-hover:border-white/20 transition-all duration-500" />
                      
                      {/* Content */}
                      <div className="relative p-6 h-full flex flex-col">
                        {/* Icon */}
                        <motion.div 
                          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-6"
                        >
                          <div className="text-white text-2xl">
                            {service.icon}
                          </div>
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-white mb-4">
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/70 mb-6 leading-relaxed flex-grow text-sm">
                          {service.description}
                        </p>

                        {/* Features List */}
                        <div className="space-y-2">
                          {service.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                            <div
                              key={featureIndex}
                              className="flex items-center gap-3"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                              <span className="text-white/60 text-xs">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Navigation Arrows - Masqués sur mobile car scroll natif */}
          {!isMobile && (
            <>
              <motion.button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20 z-10"
                onClick={prevSlide}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft size={20} className="text-white" />
              </motion.button>

              <motion.button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20 z-10"
                onClick={nextSlide}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft size={20} className="text-white rotate-180" />
              </motion.button>
            </>
          )}

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {additionalServices.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
                onClick={() => scrollToSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Hint Text pour mobile */}
          {isMobile && (
            <div className="flex justify-center mt-4 opacity-60">
              <p className="text-xs text-white/70">← Glissez pour naviguer →</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// -------------------- Main Page --------------------

const ServicesPage = () => {
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedExpertise, setSelectedExpertise] = useState<ExpertiseArea | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Pas d'effets de fade avec le scroll - animations d'entrée seulement
  const router = useRouter()

  const handleExpertiseClick = (expertise: ExpertiseArea) => {
    setSelectedExpertise(expertise)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedExpertise(null)
  }

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

  const MotionLink = motion.create(Link)

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <LogoTitle />
      <SocialLinks />
      <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Cursor />

        {/* Bouton Retour optimisé pour mobile */}
        <motion.div
          className="fixed top-20 sm:top-24 left-4 sm:left-8 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <MotionLink
            href="/"
            className="bg-white text-black p-2 sm:p-3 rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 600, damping: 15 } }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft size={20} className="sm:w-7 sm:h-7" />
          </MotionLink>
        </motion.div>

        {/* Hero Section - Sans background coloré, avec particules */}
        <div className="h-screen flex flex-col justify-center items-center relative px-4 z-10 overflow-hidden">
          {/* Floating Particles - fixes dans cette section */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 6 + 4, // Durée plus courte pour de meilleures performances
                  ...FLOATING_CONFIG,
                  delay: Math.random() * 3 // Délai plus court
                }}
              />
            ))}
          </div>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 sm:mb-10 text-center bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent relative z-10"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 25, 
              delay: 0.2,
              bounce: 0.4 
            }}
            whileHover={{ 
              rotate: [0, 2, -2, 0],
              scale: 1.02,
              transition: SPRING_CONFIG.fast
            }}
          >
            Services Premium
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-10 text-center max-w-3xl px-4 text-gray-300 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, ...TRANSITIONS.slow }}
            whileHover={{ 
              scale: 1.02,
              transition: SPRING_CONFIG.smooth
            }}
          >
            Excellence digitale et innovation créative pour votre succès
          </motion.p>
        </div>

        {/* Services Section - Animation d'entrée seulement */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            variants={ENTRANCE_VARIANTS}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...SPRING_CONFIG.smooth, delay: 0.2 }}
            {...PERFORMANCE_PROPS}
          >
            Nos Services Principaux
          </motion.h2>
          <ServiceSlider services={mainServices} />
        </motion.div>

        {/* Additional Services Section - Animation d'entrée seulement */}
        <AdditionalServicesSection />

        {/* Expertise Section - Animation d'entrée seulement */}
        <motion.div
          className="max-w-7xl mx-auto px-4 py-20 relative z-10"
          variants={ENTRANCE_VARIANTS}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ ...TRANSITIONS.slow, ease: "easeOut" }}
          {...PERFORMANCE_PROPS}
        >
          <motion.div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            >
              Notre Expertise Technique
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Maîtrise complète des technologies modernes pour créer des solutions innovantes et performantes
            </motion.p>
          </motion.div>
          
          {/* Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseAreas.map((area, index) => (
              <ExpertiseCard 
                key={index} 
                expertise={area} 
                index={index} 
                onClick={() => handleExpertiseClick(area)}
              />
            ))}
          </div>
          
          {/* Enhanced Expertise Highlights */}
          <motion.div 
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.div 
              className="text-center bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(255,255,255,0.1)",
                transition: { type: "spring", stiffness: 300, damping: 15 } 
              }}
            >
              <motion.div 
                className="text-4xl mb-4"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 1 }}
              >
                🚀
              </motion.div>
              <div className="text-xl font-bold text-white mb-2">Technologies Modernes</div>
              <div className="text-gray-300 text-sm">Stack technique de pointe pour des performances optimales</div>
            </motion.div>
            
            <motion.div 
              className="text-center bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(255,255,255,0.1)",
                transition: { type: "spring", stiffness: 300, damping: 15 } 
              }}
            >
              <motion.div 
                className="text-4xl mb-4"
                initial={{ scale: 0, rotate: 180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 1.1 }}
              >
                ⚡
              </motion.div>
              <div className="text-xl font-bold text-white mb-2">Performance Optimisée</div>
              <div className="text-gray-300 text-sm">Solutions rapides et efficaces adaptées à vos besoins</div>
            </motion.div>
            
            <motion.div 
              className="text-center bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(255,255,255,0.1)",
                transition: { type: "spring", stiffness: 300, damping: 15 } 
              }}
            >
              <motion.div 
                className="text-4xl mb-4"
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 1.2 }}
              >
                🛡️
              </motion.div>
              <div className="text-xl font-bold text-white mb-2">Support Continu</div>
              <div className="text-gray-300 text-sm">Accompagnement technique et maintenance de qualité</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Process Section - Timeline Design with Parallax */}
        <motion.div
          className="max-w-6xl mx-auto px-4 py-20 relative z-10"
          variants={ENTRANCE_VARIANTS}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ ...TRANSITIONS.normal, ease: "easeOut" }}
          {...PERFORMANCE_PROPS}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.05 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          >
            Notre Processus
          </motion.h2>
          <div className="relative">
            {processSteps.map((step, index) => (
              <TimelineStep key={index} step={step} index={index} totalSteps={processSteps.length} />
            ))}
          </div>
        </motion.div>

        {/* Bento Grid Section - Pourquoi Nous Choisir */}
        <motion.div
          className="max-w-7xl mx-auto px-4 py-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-16 text-center"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.05 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          >
            Pourquoi Nous Choisir
          </motion.h2>
          
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {/* Large Card - Expertise */}
            <BentoCard 
              item={{
                icon: <Users size={48} />,
                title: "Expertise Technique",
                description: "Une équipe de développeurs passionnés maîtrisant les dernières technologies. Nous combinons créativité et expertise technique pour créer des solutions web exceptionnelles qui dépassent vos attentes."
              }}
              index={0}
              className="md:col-span-2 lg:col-span-1 lg:row-span-2"
            />
            
            {/* Medium Card - Innovation */}
            <BentoCard 
              item={{
                icon: <Lightbulb size={48} />,
                title: "Innovation Continue",
                description: "Toujours à la pointe de la technologie pour offrir des solutions modernes, performantes et évolutives."
              }}
              index={1}
              className="md:col-span-1"
            />
            
            {/* Medium Card - Résultats */}
            <BentoCard 
              item={{
                icon: <TrendingUp size={48} />,
                title: "Résultats Mesurables",
                description: "Un engagement envers l&apos;excellence et des résultats concrets qui font croître votre entreprise."
              }}
              index={2}
              className="md:col-span-1"
            />
            
            {/* Wide Card - Process */}
            <BentoCard 
              item={{
                icon: <Zap size={48} />,
                title: "Processus Agile & Transparent",
                description: "Méthodologie éprouvée, communication constante, et livraisons rapides pour un développement efficace et sans surprise."
              }}
              index={3}
              className="md:col-span-2"
            />
          </div>
        </motion.div>

        {/* Call-to-Action Section - Animation d'entrée seulement */}
        <motion.div
          className="max-w-4xl mx-auto text-center py-20 px-4 relative z-10"
          variants={CARD_VARIANTS}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
          transition={SPRING_CONFIG.smooth}
          {...PERFORMANCE_PROPS}
        >
          <motion.div
            className="bg-gradient-to-r from-purple-900 to-pink-900 p-8 sm:p-12 rounded-3xl border border-white border-opacity-20 backdrop-blur-lg shadow-2xl"
            whileHover={{ 
              scale: 1.02,
              transition: SPRING_CONFIG.smooth
            }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              whileHover={{ 
                rotate: [0, 1, -1, 0],
                transition: { type: "spring", stiffness: 300, damping: 15 }
              }}
            >
              Prêt à Transformer Votre Vision ?
            </motion.h2>
            <motion.p 
              className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Collaborons ensemble pour créer quelque chose d&apos;extraordinaire qui marquera votre industrie
            </motion.p>
            
            <div className="flex justify-center">
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ActionButton
                  variant="primary"
                  size="lg"
                  onClick={() => router.push("/contact")}
                >
                  Commencer Votre Projet
                </ActionButton>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <Footer />

        {/* Expertise Modal */}
        <ExpertiseModal 
          expertise={selectedExpertise} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />

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
