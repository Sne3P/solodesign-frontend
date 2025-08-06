import React from 'react';
import { motion } from 'framer-motion';
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
  Megaphone
} from 'lucide-react';
import { slideUpStaggerVariants } from '@/lib/animations';
import SectionTitle from '../ui/SectionTitle';

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

const ServicesSection = () => (
  <section id="services" className="py-16 sm:py-20 lg:py-24 bg-white text-black relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            variants={slideUpStaggerVariants}
          >
            <div className="bg-white border border-gray-100 p-6 sm:p-8 h-full transition-all duration-300 hover:border-black hover:shadow-xl">
              <div className="flex flex-col space-y-6">
                {/* Icon */}
                <motion.div 
                  className="w-14 h-14 sm:w-16 sm:h-16 border border-gray-200 flex items-center justify-center transition-all duration-300 group-hover:border-black group-hover:bg-black"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15, 
                    delay: index * 0.1 + 0.3 
                  }}
                >
                  <service.icon 
                    size={20} 
                    className="text-gray-600 transition-colors duration-300 group-hover:text-white sm:text-[24px]" 
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
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-12 sm:mb-16 lg:mb-20"
      >
        <h3 className="text-xl sm:text-2xl font-medium text-center text-black mb-8 sm:mb-12">
          Services Complémentaires
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {additionalServices.map((service, index) => (
            <motion.div
              key={service.title}
              className="group text-center p-4 sm:p-6 border border-gray-100 transition-all duration-300 hover:border-black hover:shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.4 }}
              whileHover={{ y: -4 }}
            >
              <service.icon 
                size={20} 
                className="mx-auto mb-3 text-gray-600 group-hover:text-black transition-colors duration-300 sm:text-[24px]" 
              />
              <h4 className="text-xs sm:text-sm font-medium text-black mb-1">
                {service.title}
              </h4>
              <p className="text-xs text-gray-500">
                {service.desc}
              </p>
            </motion.div>
          ))}
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
        
        <motion.a
          href="/services"
          className="group inline-flex items-center space-x-3 px-6 sm:px-8 py-3 sm:py-4 border border-black text-black hover:bg-black hover:text-white transition-all duration-300 font-light text-base sm:text-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Découvrir tous nos services</span>
          <ArrowRight 
            size={18} 
            className="transition-transform duration-300 group-hover:translate-x-1 sm:text-[20px]" 
          />
        </motion.a>
      </motion.div>
    </div>
  </section>
);

export default ServicesSection;
