import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { Award, Users, Zap, Target } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Image from 'next/image';

const values = [
  { icon: Award, title: "Excellence", desc: "Standards de qualité exceptionnels" },
  { icon: Users, title: "Collaboration", desc: "Partenariat étroit avec nos clients" },
  { icon: Zap, title: "Innovation", desc: "Solutions créatives et avant-gardistes" },
  { icon: Target, title: "Précision", desc: "Attention méticuleuse aux détails" }
];

const AboutSection = () => (
  <Parallax speed={-10}>
    <section id="about" className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      {/* Gradient Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full opacity-60"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-1 h-1 bg-gray-400 rounded-full opacity-40"
        animate={{ 
          y: [0, 15, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Parallax y={[-20, 20]}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <SectionTitle className="text-white">À Propos de Nous</SectionTitle>
          </motion.div>
        </Parallax>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <Parallax y={[-30, 30]}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: -60 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <motion.h3 
                className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                Créateurs d&apos;expériences digitales 
                <span className="text-gray-400 italic"> uniques</span>
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 mb-6 text-lg leading-relaxed"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                Nous sommes une équipe passionnée de designers et développeurs qui transforment les idées en expériences digitales exceptionnelles. Notre mission est de créer des solutions qui marquent les esprits et génèrent des résultats.
              </motion.p>
              
              <motion.p 
                className="text-gray-400 mb-8 leading-relaxed"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                Avec une approche centrée sur l&apos;utilisateur et une expertise technique de pointe, nous donnons vie aux projets les plus ambitieux de nos clients.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <motion.span 
                  className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Design Thinking
                </motion.span>
                <motion.span 
                  className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-full border border-gray-600"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Innovation
                </motion.span>
                <motion.span 
                  className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-full border border-gray-600"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Excellence
                </motion.span>
              </motion.div>
            </motion.div>
          </Parallax>

          {/* Right Image */}
          <Parallax y={[30, -30]}>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: 0.2
              }}
              whileHover={{ 
                scale: 1.02,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/placeholder.svg" 
                  alt="À propos" 
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Floating decoration */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full opacity-80"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </Parallax>
        </div>

        {/* Values Grid */}
        <Parallax y={[-15, 15]}>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                className="text-center group"
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.8 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }
                  }
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div
                  className="mx-auto mb-4 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <value.icon size={28} />
                </motion.div>
                <h4 className="font-bold text-lg mb-2 text-white group-hover:text-gray-300 transition-colors">
                  {value.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Parallax>
      </div>
    </section>
  </Parallax>
);

export default AboutSection;
