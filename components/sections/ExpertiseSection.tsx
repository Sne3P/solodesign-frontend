"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Palette, 
  Smartphone, 
  Globe, 
  Camera, 
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  navButtonVariants,
  mobileSliderVariants
} from '@/lib/animations';
import SecondaryButton from '../ui/SecondaryButton';
import ActionButton from '../ui/ActionButton';

const ExpertiseSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Animations ultra-dynamiques avec effet rebond
  const DYNAMIC_BOUNCE_HOVER = {
    initial: { 
      scale: 1, 
      y: 0,
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)" 
    },
    hover: { 
      scale: 1.08,
      y: -10,
      boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
      transition: { 
        type: "spring", 
        stiffness: 1200, 
        damping: 12,
        mass: 0.5
      }
    },
    tap: { 
      scale: 0.95,
      y: -2,
      transition: { 
        type: "spring", 
        stiffness: 1500, 
        damping: 25,
        mass: 0.3
      }
    }
  };

  const ULTRA_FAST_BOUNCE = {
    initial: { 
      scale: 1, 
      y: 0,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)" 
    },
    hover: { 
      scale: 1.06,
      y: -8,
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      transition: { 
        type: "spring", 
        stiffness: 1400, 
        damping: 10,
        mass: 0.4
      }
    },
    tap: { 
      scale: 0.96,
      y: -1,
      transition: { 
        type: "spring", 
        stiffness: 1600, 
        damping: 20,
        mass: 0.2
      }
    }
  };

  const services = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Développement Web",
      description: "Sites web modernes, responsives et performants avec les dernières technologies",
      features: ["React/Next.js", "Design Responsive", "Performance Optimisée", "SEO Intégré"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Identité Visuelle",
      description: "Création de logos, chartes graphiques et identités visuelles mémorables",
      features: ["Logo Design", "Charte Graphique", "Brand Guidelines", "Déclinaisons"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Interfaces utilisateur intuitives et expériences digitales exceptionnelles",
      features: ["Wireframing", "Prototypage", "User Testing", "Interface Design"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "E-commerce",
      description: "Boutiques en ligne performantes pour booster vos ventes",
      features: ["Shopify/WooCommerce", "Paiement Sécurisé", "Gestion Stock", "Analytics"],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Marketing Digital",
      description: "Stratégies digitales pour développer votre présence en ligne",
      features: ["SEO/SEA", "Social Media", "Content Marketing", "Analytics"],
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Optimisation",
      description: "Amélioration des performances et de la conversion de vos projets",
      features: ["Speed Optimization", "Conversion Rate", "A/B Testing", "Monitoring"],
      color: "from-yellow-500 to-orange-500"
    }
  ];

  // Fonction pour naviguer dans le slider mobile
  const scrollToSlide = (index: number) => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.scrollWidth / services.length;
      sliderRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % services.length;
    scrollToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + services.length) % services.length;
    scrollToSlide(prev);
  };

  return (
    <section className="py-20 sm:py-24 md:py-28 lg:py-32 xl:py-36 relative">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        
        {/* Titre de section */}
        <motion.div
          className="text-center mb-16 sm:mb-20 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">Notre Expertise</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Solutions Complètes
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            De la conception à la réalisation, nous maîtrisons toute la chaîne de création digitale
          </p>
        </motion.div>

        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.4, 
                ease: "easeOut"
              }}
            >
              <motion.div
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 
                           rounded-2xl p-8 h-full overflow-hidden"
                variants={DYNAMIC_BOUNCE_HOVER}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                {/* Gradient background au hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color}`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 600, 
                    damping: 20 
                  }}
                />

                {/* Icône */}
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 
                             bg-gradient-to-br ${service.color} rounded-xl mb-6 text-white shadow-lg`}
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.15 
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 600, 
                    damping: 8,
                    duration: 0.15
                  }}
                >
                  {service.icon}
                </motion.div>

                {/* Titre */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3
                      }}
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`} />
                      <span className="text-sm text-gray-400">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Bouton d'action avec nouveau système */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <SecondaryButton
                    variant="ghost"
                    size="sm"
                    icon={ArrowRight}
                    onClick={() => window.location.href = '/services'}
                  >
                    En savoir plus
                  </SecondaryButton>
                </div>

                {/* Effet de glow */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${service.color} rounded-2xl 
                             opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden relative">
          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mb-6">
            <motion.button
              onClick={prevSlide}
              className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm 
                         border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
              variants={navButtonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            <div className="flex space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-white w-6' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm 
                         border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
              variants={navButtonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>

          {/* Slider Container */}
          <motion.div
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide mobile-slider gap-6 pb-4"
            variants={mobileSliderVariants}
            initial="initial"
            animate="animate"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="flex-none w-[85vw] max-w-sm"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 
                             rounded-2xl p-6 h-full overflow-hidden slider-item"
                  variants={ULTRA_FAST_BOUNCE}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  {/* Gradient background au hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color}`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 800, 
                      damping: 15 
                    }}
                  />

                  {/* Icône */}
                  <motion.div
                    className={`inline-flex items-center justify-center w-14 h-14 
                               bg-gradient-to-br ${service.color} rounded-xl mb-4 text-white shadow-lg`}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.2 
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 800, 
                      damping: 10,
                      duration: 0.12
                    }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Titre */}
                  <h3 className="text-lg font-bold text-white mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                        <span className="text-xs text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bouton d'action */}
                  <SecondaryButton
                    variant="ghost"
                    size="sm"
                    icon={ArrowRight}
                    onClick={() => window.location.href = '/services'}
                  >
                    En savoir plus
                  </SecondaryButton>

                  {/* Effet de glow */}
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-r ${service.color} rounded-2xl 
                               opacity-0 hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white backdrop-blur-sm border border-gray-200 rounded-2xl p-8 sm:p-10 max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">
              Un projet en tête ?
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Discutons de vos besoins et trouvons ensemble la solution parfaite pour votre entreprise
            </p>
            <div className="flex justify-center">
              <ActionButton
                variant="primary"
                size="lg"
                icon={ArrowRight}
                onClick={() => window.location.href = '/contact'}
              >
                Commencer un projet
              </ActionButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
