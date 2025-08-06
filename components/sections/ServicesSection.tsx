import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Code, Zap, ArrowRight } from 'lucide-react';
import { slideUpStaggerVariants } from '@/lib/animations';
import SectionTitle from '../ui/SectionTitle';

const services = [
  { 
    titre: "Design Graphique", 
    desc: "Identité visuelle, logos et supports print", 
    icon: Palette
  },
  { 
    titre: "Développement Web", 
    desc: "Sites web modernes et applications sur mesure", 
    icon: Code
  },
  { 
    titre: "Stratégie Digitale", 
    desc: "Optimisation et performance de votre présence en ligne", 
    icon: Zap
  }
];

const ServicesSection = () => (
  <section id="services" className="py-24 bg-white text-black relative overflow-hidden">
    <div className="max-w-6xl mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <SectionTitle>Services</SectionTitle>
        <div className="w-16 h-0.5 bg-black mx-auto mb-8"></div>
        <motion.p 
          className="text-lg text-gray-600 max-w-2xl mx-auto font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Solutions créatives et techniques pour donner vie à vos projets digitaux
        </motion.p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {services.map((service, index) => (
          <motion.div
            key={service.titre}
            className="group cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            variants={slideUpStaggerVariants}
          >
            <div className="bg-white border border-gray-100 p-8 h-full transition-all duration-300 hover:border-black hover:shadow-lg">
              <div className="flex flex-col items-center text-center space-y-6">
                <motion.div 
                  className="w-16 h-16 border border-gray-200 flex items-center justify-center transition-all duration-300 group-hover:border-black group-hover:bg-black"
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
                    size={24} 
                    className="text-gray-600 transition-colors duration-300 group-hover:text-white" 
                  />
                </motion.div>
                <div>
                  <h3 className="text-xl font-medium text-black mb-3">
                    {service.titre}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.button
          className="group inline-flex items-center space-x-3 px-8 py-4 border border-black text-black hover:bg-black hover:text-white transition-all duration-300 font-light text-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.location.href = '/services'}
        >
          <span>Découvrir tous nos services</span>
          <ArrowRight 
            size={20} 
            className="transition-transform duration-300 group-hover:translate-x-1" 
          />
        </motion.button>
      </motion.div>
    </div>
  </section>
);

export default ServicesSection;
