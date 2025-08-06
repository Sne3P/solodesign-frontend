"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useInView,
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
  TrendingUp
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import SocialLinks from "../../components/layout/SocialLinks"
import MenuButton from "../../components/layout/MenuButton"
import LogoTitle from "../../components/layout/LogoTitle"
import dynamic from 'next/dynamic';
const Cursor = dynamic(() => import('../../components/layout/Cursor'), { ssr: false });
import Footer from "../../components/sections/Footer"
import ActionButton from "../../components/ui/ActionButton"
import React from "react"
import { ParallaxProvider } from "react-scroll-parallax"

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

const additionalServices = [
  {
    icon: "📧",
    title: "Email Marketing",
    description: "Campagnes automatisées et segmentées pour maximiser l'engagement",
    details: ["Automation comportementale", "Segmentation avancée", "A/B Testing optimisé", "Analytics en temps réel"]
  },
  {
    icon: "📸",
    title: "Photo & Vidéo",
    description: "Contenu visuel professionnel et impactant",
    details: ["Shooting corporate & produits", "Montage vidéo cinématographique", "Motion design animé", "Captation drone & 360°"]
  },
  {
    icon: "📢",
    title: "Marketing Digital",
    description: "Stratégies multi-canaux pour amplifier votre présence",
    details: ["Social Media Management", "Publicité ciblée performante", "Influencer Marketing", "Content Marketing stratégique"]
  },
  {
    icon: "🔒",
    title: "Cybersécurité",
    description: "Protection complète et conformité réglementaire",
    details: ["Audit sécurité approfondi", "Tests d'intrusion", "Mise en conformité RGPD", "Formation sécurité équipes"]
  },
  {
    icon: "🌐",
    title: "Nom de Domaine",
    description: "Gestion complète de votre identité web",
    details: ["Recherche & réservation", "Configuration DNS optimisée", "Certificats SSL sécurisés", "Renouvellement automatique"]
  },
  {
    icon: "⚡",
    title: "Maintenance & Support",
    description: "Accompagnement technique continu et réactif",
    details: ["Mises à jour sécurité", "Sauvegarde automatique", "Support prioritaire 24/7", "Monitoring performance"]
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
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
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
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-6 left-6 w-1 h-1 bg-white/40 rounded-full"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 3 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
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
      className={`relative flex items-center mb-16 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, x: isEven ? -60 : 60, y: 20 }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: index * 0.08
        }
      } : { opacity: 0, x: isEven ? -60 : 60, y: 20 }}
    >
      {/* Timeline Line */}
      {index < totalSteps - 1 && (
        <motion.div
          className="absolute left-1/2 top-20 w-1 h-32 bg-gradient-to-b from-white to-gray-600 transform -translate-x-1/2 z-0"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isInView ? { 
            scaleY: 1, 
            opacity: 1,
            transition: { delay: index * 0.08 + 0.3, duration: 0.6 }
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
              delay: index * 0.08 + 0.15, 
              type: "spring", 
              stiffness: 200, 
              damping: 20 
            }
          } : { scale: 0.9, opacity: 0 }}
          whileHover={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderColor: "rgba(255,255,255,0.4)",
            transition: { duration: 0.2 }
          }}
        >
          <motion.h3 
            className="text-xl font-bold mb-3 text-white"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.08 + 0.25, duration: 0.3 }
            } : { opacity: 0, y: 15 }}
          >
            {step.title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-300 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.08 + 0.3, duration: 0.3 }
            } : { opacity: 0, y: 10 }}
          >
            {step.description}
          </motion.p>

          {step.details && (
            <motion.ul 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { 
                opacity: 1,
                transition: { delay: index * 0.08 + 0.35, duration: 0.3 }
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
                      delay: index * 0.08 + detailIndex * 0.02 + 0.4,
                      type: "spring",
                      stiffness: 300,
                      damping: 20
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
            delay: index * 0.08 + 0.05
          }
        } : { scale: 0, rotate: -180, opacity: 0 }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 30px rgba(255,255,255,0.5)",
          transition: { type: "spring", stiffness: 400, damping: 15 }
        }}
      >
        <motion.span 
          className="text-black font-bold text-xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { 
            opacity: 1,
            transition: { delay: index * 0.08 + 0.2, duration: 0.2 }
          } : { opacity: 0 }}
        >
          {index + 1}
        </motion.span>
      </motion.div>

      {/* Empty space for alignment */}
      <div className={`flex-1 ${isEven ? 'pl-8' : 'pr-8'}`} />
    </motion.div>
  )
}

const ExpertiseCard = ({ expertise, index }: { expertise: ExpertiseArea; index: number }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2, margin: "-20px" })

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: index * 0.08
        }
      } : { opacity: 0, y: 60, rotateX: -15 }}
      whileHover={{
        y: -8,
        rotateX: 2,
        rotateY: 2,
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
      style={{ perspective: 1000 }}
    >
      {/* Main Card */}
      <motion.div
        className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full"
        whileHover={{
          backgroundColor: "rgba(255,255,255,0.25)",
          borderColor: "rgba(255,255,255,0.4)",
          transition: { duration: 0.2 }
        }}
      >
        {/* Category Header with Icon */}
        <motion.div 
          className="flex items-center mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: index * 0.08 + 0.2, duration: 0.3 }}
        >
          <motion.div 
            className="w-12 h-12 bg-gradient-to-br from-white to-gray-200 rounded-xl flex items-center justify-center mr-4 shadow-lg"
            whileHover={{
              scale: 1.1,
              rotate: 5,
              transition: { type: "spring", stiffness: 500, damping: 15 }
            }}
          >
            <span className="text-black font-bold text-xl">
              {expertise.category.split(' ')[0].charAt(0)}
            </span>
          </motion.div>
          <div>
            <motion.h3 
              className="text-xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.08 + 0.3, duration: 0.3 }}
            >
              {expertise.category}
            </motion.h3>
            <motion.p 
              className="text-gray-300 text-sm"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.08 + 0.4, duration: 0.3 }}
            >
              {expertise.skills.length} technologies
            </motion.p>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.08 + 0.5, duration: 0.4 }}
        >
          {expertise.skills.map((skill, skillIndex) => (
            <motion.div
              key={skillIndex}
              className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 text-center group/skill"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ 
                delay: index * 0.08 + skillIndex * 0.03 + 0.6,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.3)",
                transition: { duration: 0.2 }
              }}
            >
              <span className="text-white text-sm font-medium">
                {skill}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Expertise Level Indicator */}
        <motion.div 
          className="mt-6 pt-4 border-t border-white/10"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: index * 0.08 + 0.8, duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">Niveau d&apos;expertise</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <motion.div
                  key={level}
                  className="w-2 h-2 rounded-full bg-white"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ 
                    delay: index * 0.08 + level * 0.05 + 0.9,
                    type: "spring",
                    stiffness: 400,
                    damping: 20
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -top-2 -right-2 w-4 h-4 bg-white/30 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 3 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2, margin: "-20px" })

  return (
    <motion.div
      ref={cardRef}
      className="bg-white text-black p-6 sm:p-8 rounded-lg shadow-lg transform-gpu border border-gray-100 group"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: index * 0.06
        }
      } : { opacity: 0, y: 40, scale: 0.95 }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 15 }
      }}
      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
    >
      <motion.div 
        className="mb-6 text-black" 
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
          className="text-xl sm:text-2xl font-bold mb-3 text-black"
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
          className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base"
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
          className="font-medium text-black mb-3"
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
              className="flex items-start text-sm text-gray-600"
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
                className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"
                whileHover={{ scale: 1.8, transition: { type: "spring", stiffness: 500, damping: 15 } }}
              />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <motion.h4 
          className="font-medium text-black mb-3"
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
              className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium cursor-default"
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
          className="font-medium text-black mb-3"
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
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm border transition-all duration-150 hover:border-black cursor-default"
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
    <ParallaxProvider>
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
          initial={{ opacity: 0, y: -60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 25, 
            delay: 0.2,
            bounce: 0.4 
          }}
        >
          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 sm:mb-10 text-center"
            whileHover={{ 
              rotate: [0, 2, -2, 0],
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 20 }
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Nos Services
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-10 text-center max-w-3xl px-4"
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 20 }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Des solutions innovantes pour propulser votre succès digital
          </motion.p>
        </motion.div>

        {/* Services Section */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.h2
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.05 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          >
            Nos Services Principaux
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {mainServices.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Additional Services Section */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.h2
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          >
            Services Complémentaires
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white text-black p-4 sm:p-6 rounded-lg shadow-lg border border-gray-100 hover:border-black transition-all duration-200"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }
                }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="text-2xl sm:text-3xl mb-4"
                  initial={{ opacity: 0, scale: 0, rotate: -90 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0,
                    transition: {
                      delay: index * 0.05 + 0.15,
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{
                    scale: 1.15,
                    rotate: 8,
                    transition: { type: "spring", stiffness: 400, damping: 15 }
                  }}
                >
                  {service.icon}
                </motion.div>
                <motion.h3 
                  className="text-lg sm:text-xl font-bold mb-3"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.05 + 0.2, duration: 0.4 }
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 mb-4 text-sm sm:text-base"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.05 + 0.25, duration: 0.4 }
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {service.description}
                </motion.p>
                <ul className="space-y-1">
                  {service.details.map((detail, idx) => (
                    <motion.li 
                      key={idx} 
                      className="text-xs sm:text-sm text-gray-600 flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: index * 0.05 + idx * 0.02 + 0.3 }
                      }}
                      viewport={{ once: true, amount: 0.2 }}
                    >
                      <motion.div 
                        className="w-1 h-1 bg-black rounded-full mt-2 mr-2 flex-shrink-0"
                        whileHover={{ scale: 1.8 }}
                      />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Expertise Section - Modern Grid Design */}
        <motion.div
          className="max-w-7xl mx-auto px-4 py-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
              <ExpertiseCard key={index} expertise={area} index={index} />
            ))}
          </div>
          
          {/* Enhanced Stats Section */}
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
                className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 1 }}
              >
                50+
              </motion.div>
              <div className="text-gray-300">Technologies Maîtrisées</div>
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
                className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                initial={{ scale: 0, rotate: 180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 1.1 }}
              >
                100+
              </motion.div>
              <div className="text-gray-300">Projets Réalisés</div>
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
                className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 1.2 }}
              >
                24/7
              </motion.div>
              <div className="text-gray-300">Support Technique</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Process Section - Timeline Design */}
        <motion.div
          className="max-w-6xl mx-auto px-4 py-20"
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
          <ActionButton
            variant="primary"
            size="lg"
            onClick={() => router.push("/contact")}
          >
            Contactez-nous
          </ActionButton>
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
    </ParallaxProvider>
  )
}

export default ServicesPage
