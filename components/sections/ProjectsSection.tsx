"use client"

import React, { useRef, createRef, useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { useRouter } from 'next/navigation';
import { Project } from '../../lib/types';

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const refsProjets = useRef<React.RefObject<HTMLDivElement>[]>([])
  const router = useRouter();

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        // Limiter à 6 projets pour la section
        const limitedProjects = data.slice(0, 6)
        setProjects(limitedProjects)
        // Créer les refs pour chaque projet
        refsProjets.current = limitedProjects.map(() => createRef<HTMLDivElement>())
      }
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProjectClick = (projectId: string) => {
    // Animation de sortie
    document.body.style.overflow = 'hidden';
    const element = document.getElementById('projects-section');
    if (element) {
      element.style.transition = 'all 0.5s ease-in-out';
      element.style.transform = 'scale(0.95)';
      element.style.opacity = '0';
    }

    // Redirection après un court délai
    setTimeout(() => {
      router.push(`/projet/${projectId}`);
    }, 500);
  };

  if (loading) {
    return (
      <section id="projects-section" className="py-16 sm:py-20 md:py-24 lg:py-32 mb-16 sm:mb-20 md:mb-24 lg:mb-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <SectionTitle>Projets Phares</SectionTitle>
          </div>
          <div className="flex justify-center items-center py-20">
            <motion.div 
              className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return (
      <section id="projects-section" className="py-16 sm:py-20 md:py-24 lg:py-32 mb-16 sm:mb-20 md:mb-24 lg:mb-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <SectionTitle>Projets Phares</SectionTitle>
          </div>
          <div className="text-center py-20">
            <motion.p 
              className="text-gray-400 text-lg sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Aucun projet disponible pour le moment.
            </motion.p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects-section" className="py-16 sm:py-20 md:py-24 lg:py-32 mb-16 sm:mb-20 md:mb-24 lg:mb-32">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <SectionTitle>Projets Phares</SectionTitle>
        </div>
        
        <div className="space-y-20 sm:space-y-24 md:space-y-28 lg:space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              ref={refsProjets.current[index]}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20`}
              initial="masque"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              {/* Image du projet - responsive et centrée */}
              <Parallax speed={index % 2 === 0 ? 15 : -15}>
                <motion.div
                  className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto lg:mx-0 lg:flex-1"
                  variants={{
                    masque: { 
                      opacity: 0, 
                      x: index % 2 === 0 ? -80 : 80, 
                      y: 30,
                      rotate: index % 2 === 0 ? -8 : 8,
                      scale: 0.9
                    },
                    visible: { 
                      opacity: 1, 
                      x: 0, 
                      y: 0,
                      rotate: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                        mass: 0.8,
                        duration: 1.2
                      }
                    }
                  }}
                >
                  <motion.img
                    src={project.coverImage || '/placeholder.svg'}
                    alt={project.title}
                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[450px] 
                               object-cover rounded-2xl shadow-2xl"
                    whileHover={{ 
                      scale: 1.03, 
                      rotate: index % 2 === 0 ? -1 : 1,
                      y: -8
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25,
                      mass: 0.5
                    }}
                  />
                </motion.div>
              </Parallax>

              {/* Contenu du projet - responsive et centré */}
              <motion.div
                className="w-full max-w-lg lg:max-w-md xl:max-w-lg mx-auto lg:mx-0 lg:flex-1 
                           text-center lg:text-left space-y-4 sm:space-y-5 md:space-y-6"
                variants={{
                  masque: { 
                    opacity: 0, 
                    x: index % 2 === 0 ? 80 : -80, 
                    y: 30,
                    scale: 0.95
                  },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 120,
                      damping: 20,
                      delay: 0.15,
                      mass: 0.8,
                      duration: 1.2
                    }
                  }
                }}
              >
                <motion.h3 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold 
                             leading-tight text-white"
                  whileInView={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    background: "linear-gradient(90deg, #ffffff, #f0f0f0, #ffffff)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  {project.title}
                </motion.h3>
                
                <motion.p 
                  className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl 
                             text-gray-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {project.description}
                </motion.p>
                
                {/* Technologies tags - responsive */}
                {project.technologies && project.technologies.length > 0 && (
                  <motion.div 
                    className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm 
                                   bg-white/10 backdrop-blur-sm text-white rounded-full 
                                   border border-white/20 font-medium"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: "rgba(255, 255, 255, 0.15)",
                          borderColor: "rgba(255, 255, 255, 0.4)"
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                )}

                {/* Bouton avec animation de rebounce fluide et dynamique */}
                <motion.div
                  className="pt-2 sm:pt-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <motion.button
                    className="relative overflow-hidden bg-white text-black 
                               px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5
                               rounded-full font-bold text-sm sm:text-base md:text-lg
                               flex items-center justify-center space-x-2 sm:space-x-3 
                               mx-auto lg:mx-0 group"
                    onClick={() => handleProjectClick(project.id)}
                    whileHover={{ 
                      scale: 1.08,
                      y: -2,
                      boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)"
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      y: 0
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 15,
                      mass: 0.4
                    }}
                  >
                    {/* Effet de background animé au hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <span className="relative z-10">Voir le Projet</span>
                    <motion.div
                      className="relative z-10"
                      whileHover={{ x: 4, rotate: 10 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 600, 
                        damping: 20 
                      }}
                    >
                      <ArrowRight size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;