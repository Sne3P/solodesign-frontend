"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Palette, 
  Smartphone, 
  Globe, 
  Camera, 
  Zap,
  ArrowRight
} from 'lucide-react';

const ExpertiseSection = () => {
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

        {/* Grille de services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
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
                           rounded-2xl p-8 h-full transition-all duration-300
                           group-hover:bg-white/10 group-hover:border-white/20
                           overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  y: -8
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
              >
                {/* Gradient background au hover */}
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-10 
                             bg-gradient-to-br ${service.color} transition-opacity duration-500`}
                />

                {/* Icône */}
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 
                             bg-gradient-to-br ${service.color} rounded-xl mb-6 text-white shadow-lg`}
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1 
                  }}
                  transition={{ duration: 0.3 }}
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

                {/* Bouton d'action */}
                <motion.button
                  className="inline-flex items-center space-x-2 text-white font-medium 
                             group-hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>En savoir plus</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                {/* Effet de glow */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${service.color} rounded-2xl 
                             opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-10 max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Un projet en tête ?
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Discutons de vos besoins et trouvons ensemble la solution parfaite pour votre entreprise
            </p>
            <motion.button
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-200 group"
              whileHover={{ 
                scale: 1.05,
                y: -3
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
            >
              <span>Commencer un projet</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
