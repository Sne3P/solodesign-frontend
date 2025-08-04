import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { Paintbrush, Code, Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const services = [
  { 
    titre: "Design UI/UX", 
    desc: "Création d'expériences utilisateur intuitives et engageantes qui inspirent et ravissent votre audience", 
    icon: Paintbrush,
    features: ["Interface Design", "User Research", "Prototypage", "Design System"]
  },
  { 
    titre: "Développement Web", 
    desc: "Construction de sites web réactifs et performants avec les dernières technologies modernes", 
    icon: Code,
    features: ["React/Next.js", "Performance", "SEO", "Responsive Design"]
  },
  { 
    titre: "Stratégie de Marque", 
    desc: "Développement d'identités de marque cohérentes qui résonnent avec votre public cible", 
    icon: Lightbulb,
    features: ["Identité Visuelle", "Positionnement", "Communication", "Brand Guidelines"]
  }
];

const ServicesSection = () => (
  <section id="services" className="py-16 sm:py-24 md:py-32 bg-white text-black relative overflow-hidden">
    {/* Background Pattern */}
    <motion.div 
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, #000 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%']
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />

    {/* Floating Elements */}
    <motion.div
      className="absolute top-32 right-20 w-3 h-3 bg-black rounded-full opacity-20"
      animate={{ 
        y: [0, -30, 0],
        opacity: [0.2, 0.6, 0.2]
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute bottom-40 left-16 w-2 h-2 bg-gray-600 rounded-full opacity-30"
      animate={{ 
        y: [0, 25, 0],
        opacity: [0.3, 0.7, 0.3]
      }}
      transition={{ 
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5
      }}
    />

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <Parallax translateY={[-20, 20]}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <SectionTitle>Nos Services</SectionTitle>
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Des solutions complètes pour transformer votre vision en réalité digitale
          </motion.p>
        </motion.div>
      </Parallax>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
        {services.map((service, index) => (
          <Parallax key={service.titre} translateY={[-20, 20]}>
            <motion.div
              className="bg-gray-100 p-6 sm:p-8 rounded-lg shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ 
                scale: 1.03,
                y: -5,
                transition: { duration: 0.3 }
              }}
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 50, 
                  rotate: -2
                },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: index * 0.2
                  }
                }
              }}
            >
              {/* Background Gradient on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Icon */}
              <motion.div
                className="mb-6 relative"
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15, 
                  delay: index * 0.1 + 0.3 
                }}
              >
                <motion.div
                  className="w-16 h-16 bg-black text-white rounded-xl flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-300"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <service.icon size={32} />
                </motion.div>
                
                {/* Floating sparkle */}
                <motion.div
                  className="absolute -top-2 -right-2 text-yellow-500"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  <Sparkles size={16} />
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.2 + 0.4 }
                  }
                }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-black group-hover:text-gray-800 transition-colors">
                  {service.titre}
                </h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
                  {service.desc}
                </p>

                {/* Features List */}
                <motion.ul 
                  className="space-y-2 mb-6"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delay: index * 0.2 + 0.6
                      }
                    }
                  }}
                >
                  {service.features.map((feature) => (
                    <motion.li
                      key={feature}
                      className="flex items-center text-sm text-gray-500"
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <motion.div
                        className="w-1.5 h-1.5 bg-black rounded-full mr-3"
                        whileHover={{ scale: 1.5 }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </motion.ul>

                {/* CTA */}
                <motion.div
                  className="flex items-center text-black font-medium cursor-pointer group/cta"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="mr-2">En savoir plus</span>
                  <motion.div
                    whileHover={{ x: 3, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={16} />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"
              />
            </motion.div>
          </Parallax>
        ))}
      </div>

      {/* Bottom CTA */}
      <Parallax translateY={[-10, 10]}>
        <motion.div
          className="text-center mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            className="bg-black text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            Démarrer un projet
          </motion.button>
        </motion.div>
      </Parallax>
    </div>
  </section>
);

export default ServicesSection;
