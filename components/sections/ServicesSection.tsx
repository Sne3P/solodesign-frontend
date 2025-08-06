import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Palette, 
  Code, 
  Zap, 
  ArrowRight, 
  Globe,
  Shield,
  Cloud,
  Mail,
  Search,
  Smartphone,
  Camera,
  Megaphone,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import SecondaryButton from '../ui/SecondaryButton';

// Animations locales optimisées pour performance maximale
const ULTRA_FAST_HOVER = {
  initial: { 
    scale: 1, 
    y: 0,
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)" 
  },
  hover: { 
    scale: 1.04,
    y: -4,
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
    transition: {
      type: "spring",
      stiffness: 1000,
      damping: 10,
      mass: 0.3
    }
  },
  tap: { 
    scale: 0.97,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 1400,
      damping: 12,
      mass: 0.2
    }
  }
};

const CARD_DYNAMIC_HOVER = {
  initial: { 
    scale: 1, 
    y: 0,
    borderColor: "rgba(229, 231, 235, 1)", // gray-200
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)" 
  },
  hover: { 
    scale: 1.05,
    y: -8,
    borderColor: "rgba(0, 0, 0, 1)", // black
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    transition: {
      type: "spring",
      stiffness: 800,
      damping: 12,
      mass: 0.4
    }
  },
  tap: { 
    scale: 0.96,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 1200,
      damping: 15,
      mass: 0.3
    }
  }
};

const NAV_BUTTON = {
  initial: { 
    scale: 1, 
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(209, 213, 219, 1)", // gray-300
    color: "rgba(107, 114, 128, 1)" // gray-500
  },
  hover: { 
    scale: 1.1,
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderColor: "rgba(0, 0, 0, 1)",
    color: "rgba(255, 255, 255, 1)",
    transition: { 
      duration: 0.15,
      ease: "easeOut"
    }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

const services = [
  { 
    titre: "Design & Identité Visuelle", 
    desc: "Création d'identités de marque uniques et mémorables", 
    icon: Palette,
    details: ["Logo & Charte graphique", "Print & Digital design", "Packaging & Merchandising"]
  },
  { 
    titre: "Développement Web", 
    desc: "Sites web modernes, performants et sur mesure", 
    icon: Code,
    details: ["Sites vitrine & E-commerce", "Applications web complexes", "Progressive Web Apps"]
  },
  { 
    titre: "Stratégie Digitale", 
    desc: "Optimisation et croissance de votre présence digitale", 
    icon: Zap,
    details: ["Audit & Stratégie", "Analytics & Performance", "Conversion optimization"]
  },
  { 
    titre: "Hébergement & Infrastructure", 
    desc: "Solutions cloud sécurisées et performantes", 
    icon: Cloud,
    details: ["Hébergement web premium", "CDN & Optimisation", "Sauvegarde & Sécurité"]
  },
  { 
    titre: "SEO & Référencement", 
    desc: "Visibilité maximale sur les moteurs de recherche", 
    icon: Search,
    details: ["SEO technique & contenu", "Google Ads & SEM", "Analytics & Reporting"]
  },
  { 
    titre: "Applications Mobile", 
    desc: "Applications natives et cross-platform", 
    icon: Smartphone,
    details: ["iOS & Android natif", "React Native", "Progressive Web Apps"]
  }
];

const additionalServices = [
  { title: "Email Marketing", icon: Mail, desc: "Campagnes automatisées" },
  { title: "Photo & Vidéo", icon: Camera, desc: "Contenu visuel professionnel" },
  { title: "Marketing Digital", icon: Megaphone, desc: "Stratégies multi-canaux" },
  { title: "Cybersécurité", icon: Shield, desc: "Protection & conformité" },
  { title: "Nom de Domaine", icon: Globe, desc: "Gestion & renouvellement" }
];

const ServicesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Mobile slider controls optimisés
  const scrollToSlide = (direction: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const cardWidth = 150 + 16; // width + gap
    const itemsPerView = 2;
    const maxSlide = Math.ceil(additionalServices.length / itemsPerView) - 1;
    
    let newSlide = currentSlide;
    if (direction === 'next' && currentSlide < maxSlide) {
      newSlide = currentSlide + 1;
    } else if (direction === 'prev' && currentSlide > 0) {
      newSlide = currentSlide - 1;
    }
    
    if (newSlide !== currentSlide) {
      setCurrentSlide(newSlide);
      
      // Scroll fluide avec easing
      const targetPosition = newSlide * cardWidth * itemsPerView;
      container.scrollTo({
        left: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={sectionRef} id="services" className="py-16 sm:py-20 lg:py-24 bg-white text-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12 sm:mb-16 lg:mb-20"
      >
        <SectionTitle>Services</SectionTitle>
        <div className="w-16 h-0.5 bg-black mx-auto mb-6 sm:mb-8"></div>
        <motion.p 
          className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Solutions créatives et techniques complètes pour transformer votre vision en réalité digitale performante
        </motion.p>
      </motion.div>

      {/* Main Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16 lg:mb-20">
        {services.map((service, index) => (
          <motion.div
            key={service.titre}
            className="group cursor-pointer"
            initial="initial"
            animate={isInView ? "initial" : "initial"}
            whileHover="hover"
            whileTap="tap"
            variants={CARD_DYNAMIC_HOVER}
            style={{ perspective: 1000 }}
          >
            <div className="bg-white border border-gray-200 p-6 sm:p-8 h-full transition-all duration-200 hover:border-black hover:shadow-xl rounded-lg">
              <div className="flex flex-col space-y-6">
                {/* Icon */}
                <motion.div 
                  className="w-14 h-14 sm:w-16 sm:h-16 border border-gray-200 flex items-center justify-center transition-all duration-200 group-hover:border-black group-hover:bg-black rounded-lg"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 15, 
                    delay: index * 0.1 + 0.4 
                  }}
                  whileHover={{
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <service.icon 
                    size={20} 
                    className="text-gray-600 transition-colors duration-200 group-hover:text-white sm:text-[24px]" 
                  />
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-medium text-black leading-tight">
                    {service.titre}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-sm sm:text-base">
                    {service.desc}
                  </p>
                  
                  {/* Details */}
                  <ul className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-xs sm:text-sm text-gray-500">
                        <div className="w-1 h-1 bg-black rounded-full mr-3 flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-12 sm:mb-16 lg:mb-20"
      >
        <motion.h3 
          className="text-xl sm:text-2xl font-medium text-center text-black mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Services Complémentaires
        </motion.h3>
        
        {/* Desktop Grid - Optimisé */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {additionalServices.map((service, index) => (
            <motion.div
              key={service.title}
              className="group text-center p-6 border border-gray-200 transition-all duration-200 rounded-lg cursor-pointer"
              initial="initial"
              animate={isInView ? "initial" : "initial"}
              whileHover="hover"
              whileTap="tap"
              variants={ULTRA_FAST_HOVER}
              transition={{ delay: index * 0.05 + 0.8 }}
            >
              <motion.div
                whileHover={{ 
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
              >
                <service.icon 
                  size={24} 
                  className="mx-auto mb-3 text-gray-600 group-hover:text-black transition-colors duration-200" 
                />
              </motion.div>
              <h4 className="text-sm font-medium text-black mb-1">
                {service.title}
              </h4>
              <p className="text-xs text-gray-500">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider - Ultra Responsive */}
        <div className="md:hidden relative">
          <motion.div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 mobile-slider px-2"
            style={{ 
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                className="group text-center p-4 border border-gray-200 transition-all duration-200 min-w-[150px] max-w-[150px] flex-shrink-0 rounded-xl slider-item cursor-pointer"
                style={{ scrollSnapAlign: 'center' }}
                initial={{ opacity: 0, x: 30, scale: 0.9 }}
                animate={isInView ? { 
                  opacity: 1, 
                  x: 0, 
                  scale: 1,
                  transition: { delay: index * 0.1 + 0.9, duration: 0.4 }
                } : { opacity: 0, x: 30, scale: 0.9 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -4,
                  borderColor: "#000000",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                  transition: { duration: 0.15 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
              >
                <motion.div
                  whileHover={{ 
                    rotate: [0, -8, 8, 0],
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                >
                  <service.icon 
                    size={20} 
                    className="mx-auto mb-3 text-gray-600 group-hover:text-black transition-colors duration-200" 
                  />
                </motion.div>
                <h4 className="text-sm font-medium text-black mb-1 leading-tight">
                  {service.title}
                </h4>
                <p className="text-xs text-gray-500 leading-tight">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation améliorée */}
          <motion.div 
            className="flex justify-center items-center gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 1.2 }}
          >
            <motion.button
              onClick={() => scrollToSlide('prev')}
              disabled={currentSlide === 0}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              variants={NAV_BUTTON}
              initial="initial"
              whileHover={currentSlide > 0 ? "hover" : "initial"}
              whileTap={currentSlide > 0 ? "tap" : "initial"}
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            {/* Indicateurs de navigation */}
            <div className="flex gap-3">
              {Array.from({ length: Math.ceil(additionalServices.length / 2) }).map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-black scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400 hover:scale-105'
                  }`}
                  whileHover={{ scale: index === currentSlide ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setCurrentSlide(index);
                    if (scrollRef.current) {
                      const cardWidth = 150 + 16; // width + gap
                      scrollRef.current.scrollTo({
                        left: index * cardWidth * 2,
                        behavior: 'smooth'
                      });
                    }
                  }}
                />
              ))}
            </div>

            <motion.button
              onClick={() => scrollToSlide('next')}
              disabled={currentSlide === Math.ceil(additionalServices.length / 2) - 1}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              variants={NAV_BUTTON}
              initial="initial"
              whileHover={currentSlide < Math.ceil(additionalServices.length / 2) - 1 ? "hover" : "initial"}
              whileTap={currentSlide < Math.ceil(additionalServices.length / 2) - 1 ? "tap" : "initial"}
            >
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="max-w-2xl mx-auto mb-8">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-black mb-4">
            Prêt à transformer votre projet ?
          </h3>
          <p className="text-gray-600 font-light text-sm sm:text-base">
            Découvrez notre gamme complète de services et solutions sur mesure
          </p>
        </div>
        
        <SecondaryButton 
          href="/services"
          icon={ArrowRight}
        >
          Découvrir tous nos services
        </SecondaryButton>
      </motion.div>
    </div>
  </section>
  );
};

export default ServicesSection;
