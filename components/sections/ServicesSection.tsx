import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { Paintbrush, Code, Lightbulb } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const services = [
  { titre: "Design UI/UX", desc: "Création d'expériences utilisateur intuitives et engageantes qui inspirent et ravissent", icon: <Paintbrush size={40} /> },
  { titre: "Développement Web", desc: "Construction de sites web réactifs et performants avec les dernières technologies", icon: <Code size={40} /> },
  { titre: "Stratégie de Marque", desc: "Développement d'identités de marque cohérentes qui résonnent avec votre public cible", icon: <Lightbulb size={40} /> }
];

const ServicesSection = () => (
  <section id="services" className="py-16 sm:py-24 md:py-32 bg-white text-black mb-16 sm:mb-24 md:mb-32">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle>Nos Services</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
        {services.map((service, index) => (
          <Parallax key={service.titre} y={[-20, 20]} tagOuter="div">
            <motion.div
              className="bg-gray-100 p-6 sm:p-8 rounded-lg shadow-lg relative overflow-hidden service-card z-[100]"
              initial="masque"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ scale: 1.05, y: -10, rotate: 2 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              variants={{
                masque: { opacity: 0, y: 50, rotate: -5 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: index * 0.1
                  }
                }
              }}
            >
              <motion.div
                className="mb-4 sm:mb-6 text-gray-800"
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{service.titre}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{service.desc}</p>
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Parallax>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
