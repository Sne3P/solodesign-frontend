"use client"

import React, { useState, useEffect, lazy, Suspense } from "react"
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion"
import { Send, ArrowLeft, Mail, Phone, MapPin, Clock, Zap, Smartphone, Globe, Shield, Database, Palette, Code, Rocket, CheckCircle, Star } from "lucide-react"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"
import Link from "next/link"
import { useRouter } from "next/navigation"

const SocialLinks = lazy(() => import("../../components/layout/SocialLinks"))
const MenuButton = lazy(() => import("../../components/layout/MenuButton"))
const ScrollArrow = lazy(() => import("../../components/layout/ScrollArrow"))
const BackgroundPattern = lazy(() => import("../../components/layout/BackgroundPattern"))
import dynamic from 'next/dynamic';
const Cursor = dynamic(() => import('../../components/layout/Cursor'), { ssr: false });
const LogoTitle = lazy(() => import("../../components/layout/LogoTitle"))
const Footer = lazy(() => import("../../components/sections/Footer"))

// Types pour le quiz de devis
interface QuizStep {
  id: string
  question: string
  options: Array<{
    id: string
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
    description?: string
  }>
  multiSelect?: boolean
}

interface QuizAnswers {
  [key: string]: string | string[]
}

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentQuizStep, setCurrentQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({})
  const [showQuiz, setShowQuiz] = useState(false)
  const [activeTab, setActiveTab] = useState("contact")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
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

  // Quiz steps pour le devis
  const quizSteps: QuizStep[] = [
    {
      id: "projectType",
      question: "Quel type de projet souhaitez-vous réaliser ?",
      options: [
        { 
          id: "website", 
          label: "Site Web Vitrine", 
          value: "website", 
          icon: Globe,
          description: "Site de présentation pour votre entreprise"
        },
        { 
          id: "webapp", 
          label: "Application Web", 
          value: "webapp", 
          icon: Code,
          description: "Plateforme web interactive sur-mesure"
        },
        { 
          id: "mobileapp", 
          label: "Application Mobile", 
          value: "mobileapp", 
          icon: Smartphone,
          description: "App native pour iOS et Android"
        },
        { 
          id: "software", 
          label: "Logiciel Sur Mesure", 
          value: "software", 
          icon: Zap,
          description: "Solution métier personnalisée"
        },
        { 
          id: "ecommerce", 
          label: "Site E-commerce", 
          value: "ecommerce", 
          icon: Database,
          description: "Boutique en ligne complète"
        },
      ]
    },
    {
      id: "features",
      question: "Quelles fonctionnalités souhaitez-vous intégrer ?",
      multiSelect: true,
      options: [
        { 
          id: "design", 
          label: "Design Personnalisé", 
          value: "design", 
          icon: Palette,
          description: "Interface unique et sur-mesure"
        },
        { 
          id: "cms", 
          label: "Système de Gestion", 
          value: "cms", 
          icon: Database,
          description: "Administration facile du contenu"
        },
        { 
          id: "auth", 
          label: "Authentification", 
          value: "auth", 
          icon: Shield,
          description: "Connexion sécurisée des utilisateurs"
        },
        { 
          id: "api", 
          label: "API / Intégrations", 
          value: "api", 
          icon: Code,
          description: "Connexion avec services externes"
        },
        { 
          id: "hosting", 
          label: "Hébergement Premium", 
          value: "hosting", 
          icon: Globe,
          description: "Serveurs haute performance"
        },
        { 
          id: "email", 
          label: "Email Professionnel", 
          value: "email", 
          icon: Mail,
          description: "Adresses @votredomaine.com"
        },
      ]
    },
    {
      id: "timeline",
      question: "Dans quel délai souhaitez-vous votre projet ?",
      options: [
        { 
          id: "urgent", 
          label: "Express", 
          value: "urgent", 
          icon: Rocket,
          description: "Moins d'1 mois - Livraison rapide"
        },
        { 
          id: "normal", 
          label: "Standard", 
          value: "normal", 
          icon: Clock,
          description: "1-3 mois - Délai optimal"
        },
        { 
          id: "flexible", 
          label: "Flexible", 
          value: "flexible", 
          icon: Clock,
          description: "3+ mois - Développement approfondi"
        },
      ]
    },
    {
      id: "budget",
      question: "Quel est votre budget approximatif ?",
      options: [
        { 
          id: "small", 
          label: "Startup", 
          value: "small", 
          icon: Star,
          description: "Budget serré, solutions optimisées"
        },
        { 
          id: "medium", 
          label: "Professionnel", 
          value: "medium", 
          icon: Star,
          description: "Investissement équilibré"
        },
        { 
          id: "large", 
          label: "Premium", 
          value: "large", 
          icon: Star,
          description: "Budget confortable, toutes options"
        },
      ]
    }
  ]

  const services = [
    {
      icon: Globe,
      title: "Sites Web Vitrines",
      description: "Des sites élégants et performants pour présenter votre activité avec un design responsive et optimisé SEO"
    },
    {
      icon: Code,
      title: "Applications Web",
      description: "Solutions web interactives et sur-mesure pour vos besoins spécifiques avec technologies modernes"
    },
    {
      icon: Smartphone,
      title: "Applications Mobiles",
      description: "Apps natives et hybrides pour iOS et Android avec interface intuitive et performances optimales"
    },
    {
      icon: Database,
      title: "Logiciels Métier",
      description: "Outils personnalisés pour optimiser vos processus d'entreprise et améliorer votre productivité"
    },
    {
      icon: Shield,
      title: "Solutions Sécurisées",
      description: "Authentification, chiffrement et protection des données selon les standards de sécurité actuels"
    },
    {
      icon: Mail,
      title: "Email Professionnel",
      description: "Adresses email personnalisées avec votre nom de domaine et outils de collaboration intégrés"
    },
    {
      icon: Palette,
      title: "Design UI/UX",
      description: "Interfaces utilisateur modernes et expérience utilisateur optimisée pour maximiser l'engagement"
    },
    {
      icon: Rocket,
      title: "Hébergement & Maintenance",
      description: "Hébergement haute performance, sauvegardes automatiques et maintenance continue"
    }
  ]

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@solodesign.fr",
      action: "mailto:contact@solodesign.fr"
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+33 1 23 45 67 89",
      action: "tel:+33123456789"
    },
    {
      icon: MapPin,
      title: "Localisation",
      value: "Paris, France",
      action: null
    },
    {
      icon: Clock,
      title: "Disponibilité",
      value: "Lun-Ven 9h-18h",
      action: null
    }
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name, 
          email, 
          phone, 
          message,
          selectedServices: selectedServices.join(", "),
          type: "contact"
        }),
      })

      if (response.ok) {
        alert("Message envoyé avec succès! Nous vous recontacterons rapidement.")
        // Reset form
        e.currentTarget.reset()
        setSelectedServices([])
      } else {
        alert("Erreur lors de l'envoi du message. Veuillez réessayer.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Une erreur s'est produite. Veuillez réessayer.")
    }

    setIsSubmitting(false)
  }

  const handleQuizSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Demande de devis automatique",
          email: "devis@solodesign.fr",
          message: `Nouvelle demande de devis générée automatiquement:\n\n${Object.entries(quizAnswers).map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`).join("\n")}`,
          type: "quote",
          quizData: quizAnswers
        }),
      })

      if (response.ok) {
        alert("Demande de devis envoyée avec succès! Nous vous recontacterons rapidement avec une estimation personnalisée.")
        setShowQuiz(false)
        setCurrentQuizStep(0)
        setQuizAnswers({})
      } else {
        alert("Erreur lors de l'envoi. Veuillez réessayer.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Une erreur s'est produite. Veuillez réessayer.")
    }

    setIsSubmitting(false)
  }

  const handleQuizAnswer = (stepId: string, answer: string | string[]) => {
    setQuizAnswers(prev => ({ ...prev, [stepId]: answer }))
    
    if (currentQuizStep < quizSteps.length - 1) {
      setTimeout(() => setCurrentQuizStep(prev => prev + 1), 300)
    }
  }

  const handleExit = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setTimeout(() => {
      router.push(href)
    }, 500)
  }

  const toggleService = (serviceTitle: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceTitle) 
        ? prev.filter(s => s !== serviceTitle)
        : [...prev, serviceTitle]
    )
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
            <MenuButton />
          </Suspense>

          <motion.div
            className="fixed top-24 left-8 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" onClick={(e) => handleExit(e, "/")}>
              <motion.span
                className="bg-white text-black p-2 rounded-full inline-block cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft size={24} />
              </motion.span>
            </Link>
          </motion.div>

          {/* Navigation des onglets */}
          <motion.div
            className="fixed top-24 right-8 z-50 flex space-x-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {[
              { id: "contact", label: "Contact" },
              { id: "services", label: "Services" },
              { id: "devis", label: "Devis Express" }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-black"
                    : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          <div className="pt-32 pb-20">
            <AnimatePresence mode="wait">
              {activeTab === "contact" && (
                <ContactSection
                  key="contact"
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  contactInfo={contactInfo}
                  services={services}
                  selectedServices={selectedServices}
                  toggleService={toggleService}
                />
              )}
              
              {activeTab === "services" && (
                <ServicesSection key="services" services={services} />
              )}
              
              {activeTab === "devis" && (
                <QuoteSection
                  key="devis"
                  quizSteps={quizSteps}
                  currentStep={currentQuizStep}
                  answers={quizAnswers}
                  onAnswer={handleQuizAnswer}
                  onSubmit={handleQuizSubmit}
                  isSubmitting={isSubmitting}
                  showQuiz={showQuiz}
                  setShowQuiz={setShowQuiz}
                  setCurrentStep={setCurrentQuizStep}
                />
              )}
            </AnimatePresence>
          </div>

          <Suspense fallback={<div className="bg-black">Chargement...</div>}>
            <ScrollArrow />
            <Cursor />
          </Suspense>

          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-white mix-blend-difference origin-left"
            style={{ scaleX }}
          />

          <Suspense fallback={<div className="bg-black">Chargement...</div>}>
            <BackgroundPattern magneticEffect={true} opacity={0.15} />
          </Suspense>

          <Suspense fallback={<div className="bg-black">Chargement...</div>}>
            <Footer />
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </ParallaxProvider>
  )
}

// Types pour les composants
interface InputFieldProps {
  type: string
  name: string
  placeholder: string
  required: boolean
}

interface TextareaFieldProps {
  name: string
  placeholder: string
  required: boolean
}

interface ContactSectionProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  isSubmitting: boolean
  contactInfo: Array<{
    icon: React.ComponentType<{ className?: string }>
    title: string
    value: string
    action: string | null
  }>
  services: Array<{
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
  }>
  selectedServices: string[]
  toggleService: (service: string) => void
}

interface ServicesSectionProps {
  services: Array<{
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
  }>
}

interface QuoteSectionProps {
  quizSteps: QuizStep[]
  currentStep: number
  answers: QuizAnswers
  onAnswer: (stepId: string, answer: string | string[]) => void
  onSubmit: () => Promise<void>
  isSubmitting: boolean
  showQuiz: boolean
  setShowQuiz: (show: boolean) => void
  setCurrentStep: (step: number) => void
}

// Section Contact améliorée
const ContactSection: React.FC<ContactSectionProps> = ({ 
  handleSubmit, 
  isSubmitting, 
  contactInfo, 
  services, 
  selectedServices, 
  toggleService 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="max-w-7xl mx-auto px-4"
  >
    <Parallax speed={-5}>
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tighter text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 10 }}
      >
        Parlons de Votre Projet
      </motion.h1>
      <motion.p
        className="text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-4xl mx-auto mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Transformons ensemble votre vision en réalité digitale. De l&apos;idée au déploiement, 
        nous vous accompagnons avec expertise et créativité pour créer des solutions qui marquent.
      </motion.p>
    </Parallax>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 mb-16">
      {/* Formulaire de contact principal */}
      <motion.div
        className="xl:col-span-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Envoyez-nous un message
        </h2>
        
        {/* Sélection des services */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Services qui vous intéressent :</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {services.slice(0, 6).map((service, index) => (
              <motion.button
                key={index}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  selectedServices.includes(service.title)
                    ? "bg-white text-black border-white"
                    : "bg-white/5 border-white/20 hover:border-white/50 hover:bg-white/10"
                }`}
                onClick={() => toggleService(service.title)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <service.icon className={`w-5 h-5 mx-auto mb-2 ${
                  selectedServices.includes(service.title) ? "text-black" : "text-white"
                }`} />
                {service.title}
              </motion.button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField type="text" name="name" placeholder="Votre nom *" required />
            <InputField type="email" name="email" placeholder="Votre email *" required />
          </div>
          
          <InputField type="tel" name="phone" placeholder="Votre téléphone (optionnel)" required={false} />
          <TextareaField name="message" placeholder="Décrivez votre projet, vos objectifs, vos contraintes..." required />
          
          <motion.button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-white to-gray-200 text-black font-bold rounded-full transition-all flex items-center justify-center overflow-hidden relative group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10 flex items-center group-hover:text-white transition-colors">
              {isSubmitting ? (
                <motion.div
                  className="w-6 h-6 border-t-2 border-current rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Envoyer le message
                </>
              )}
            </span>
          </motion.button>
        </form>
      </motion.div>

      {/* Informations de contact */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold mb-8">Nos coordonnées</h2>
        {contactInfo.map((info, index) => (
          <motion.div
            key={index}
            className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer group"
            whileHover={{ scale: 1.02, x: 10 }}
            onClick={() => info.action && window.open(info.action)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
          >
            <div className="bg-white/10 p-3 rounded-full group-hover:bg-white/20 transition-all">
              <info.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{info.title}</h3>
              <p className="text-gray-300">{info.value}</p>
            </div>
          </motion.div>
        ))}

        {/* Témoignage */}
        <motion.div
          className="mt-8 p-6 rounded-lg bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-sm italic text-gray-300 mb-3">
            &quot;Solo Design a transformé notre vision en une réalité digitale époustouflante. 
            Leur expertise technique et leur sens du design ont dépassé nos attentes.&quot;
          </p>
          <p className="text-sm font-semibold">— Client satisfait</p>
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
)

// Section Services complète
const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="max-w-7xl mx-auto px-4"
  >
    <motion.h1
      className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Nos Services
    </motion.h1>
    <motion.p
      className="text-xl text-center max-w-4xl mx-auto mb-16 text-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      De l&apos;idée à la réalisation, nous couvrons tous vos besoins digitaux avec expertise, 
      créativité et technologies de pointe pour vous démarquer dans l&apos;univers numérique.
    </motion.p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {services.map((service, index) => (
        <motion.div
          key={index}
          className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all group cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -10 }}
        >
          <div className="bg-white/10 p-4 rounded-full w-fit mb-4 group-hover:bg-white/20 transition-all">
            <service.icon className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-4">{service.title}</h3>
          <p className="text-gray-300 leading-relaxed text-sm">{service.description}</p>
        </motion.div>
      ))}
    </div>

    {/* Section pourquoi nous choisir */}
    <motion.div
      className="mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir Solo Design ?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Rocket,
            title: "Rapidité d'exécution",
            description: "Livraison dans les délais avec une méthodologie agile éprouvée"
          },
          {
            icon: Shield,
            title: "Qualité garantie",
            description: "Code propre, sécurisé et optimisé selon les meilleures pratiques"
          },
          {
            icon: CheckCircle,
            title: "Accompagnement complet",
            description: "Support continu de la conception au déploiement et au-delà"
          }
        ].map((advantage, index) => (
          <motion.div
            key={index}
            className="text-center p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
          >
            <div className="bg-white/10 p-4 rounded-full w-fit mx-auto mb-4">
              <advantage.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
            <p className="text-gray-300">{advantage.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </motion.div>
)

// Section Devis avec Quiz interactif
const QuoteSection: React.FC<QuoteSectionProps> = ({
  quizSteps,
  currentStep,
  answers,
  onAnswer,
  onSubmit,
  isSubmitting,
  showQuiz,
  setShowQuiz,
  setCurrentStep
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="max-w-4xl mx-auto px-4"
  >
    {!showQuiz ? (
      <div className="text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Devis Express
        </motion.h1>
        <motion.p
          className="text-xl max-w-3xl mx-auto mb-12 text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Obtenez une estimation personnalisée en 2 minutes ! Notre quiz intelligent analyse vos besoins 
          et génère une proposition adaptée à votre projet et votre budget.
        </motion.p>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { icon: Clock, title: "2 minutes", desc: "Quiz rapide" },
            { icon: Zap, title: "Instantané", desc: "Résultat immédiat" },
            { icon: CheckCircle, title: "Personnalisé", desc: "Adapté à vos besoins" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              <feature.icon className="w-8 h-8 mx-auto mb-3 text-white" />
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.button
          className="bg-gradient-to-r from-white to-gray-200 text-black px-12 py-4 rounded-full font-bold text-lg transition-all group"
          onClick={() => setShowQuiz(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Rocket className="inline-block mr-2 group-hover:rotate-12 transition-transform" />
          Commencer le Quiz
        </motion.button>
      </div>
    ) : (
      <div>
        {/* Progress bar */}
        <motion.div
          className="w-full bg-white/10 rounded-full h-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-gradient-to-r from-white to-gray-300 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / quizSteps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <div className="text-center mb-8">
          <span className="text-sm text-gray-400">
            Question {currentStep + 1} sur {quizSteps.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {currentStep < quizSteps.length ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">
                {quizSteps[currentStep].question}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizSteps[currentStep].options.map((option) => (
                  <motion.button
                    key={option.id}
                    className="p-6 rounded-lg border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 transition-all text-left group"
                    onClick={() => onAnswer(quizSteps[currentStep].id, option.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-white/10 p-3 rounded-full group-hover:bg-white/20 transition-all">
                        {option.icon && <option.icon className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{option.label}</h3>
                        {option.description && (
                          <p className="text-gray-300 text-sm">{option.description}</p>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-8">Récapitulatif de votre projet</h2>
              <div className="bg-white/5 rounded-lg p-8 mb-8 text-left">
                {Object.entries(answers).map(([key, value]) => {
                  const step = quizSteps.find(s => s.id === key)
                  return (
                    <div key={key} className="mb-4 flex justify-between items-center">
                      <span className="font-semibold">{step?.question.replace(" ?", "")} :</span>
                      <span className="text-gray-300 text-right max-w-xs">
                        {Array.isArray(value) ? value.join(", ") : value}
                      </span>
                    </div>
                  )
                })}
              </div>
              
              <p className="text-gray-300 mb-8">
                Nous analyserons vos réponses et vous enverrons une estimation détaillée dans les plus brefs délais.
              </p>
              
              <div className="flex gap-4 justify-center">
                <motion.button
                  className="bg-gray-600 text-white px-8 py-3 rounded-full font-medium"
                  onClick={() => {
                    setShowQuiz(false)
                    setCurrentStep(0)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Recommencer
                </motion.button>
                
                <motion.button
                  className="bg-gradient-to-r from-white to-gray-200 text-black px-12 py-3 rounded-full font-bold"
                  onClick={onSubmit}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? "Envoi en cours..." : "Recevoir mon devis"}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )}
  </motion.div>
)

// Composants de formulaire avec types corrects
const InputField: React.FC<InputFieldProps> = React.memo(({ type, name, placeholder, required }) => (
  <motion.div className="relative overflow-hidden rounded-lg group" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
    <motion.input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full px-6 py-4 bg-white bg-opacity-5 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:bg-opacity-10 transition-all z-10 relative rounded-lg border border-white/10 focus:border-white/30"
      whileFocus={{ scale: 1.01 }}
    />
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100"
      transition={{ duration: 0.3 }}
    />
  </motion.div>
))
InputField.displayName = "InputField"

const TextareaField: React.FC<TextareaFieldProps> = React.memo(({ name, placeholder, required }) => (
  <motion.div className="relative overflow-hidden rounded-lg group" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
    <motion.textarea
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full px-6 py-4 bg-white bg-opacity-5 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:bg-opacity-10 transition-all resize-none h-32 z-10 relative rounded-lg border border-white/10 focus:border-white/30"
      whileFocus={{ scale: 1.01 }}
    />
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100"
      transition={{ duration: 0.3 }}
    />
  </motion.div>
))
TextareaField.displayName = "TextareaField"

export default ContactPage
