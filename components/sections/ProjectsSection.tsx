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
      <section id="projects-section" className="py-16 sm:py-24 md:py-32 mb-16 sm:mb-24 md:mb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle>Projets Phares</SectionTitle>
          <div className="flex justify-center items-center py-20">
            <motion.div 
              className="w-12 h-12 border-2 border-white border-t-transparent rounded-full"
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
      <section id="projects-section" className="py-16 sm:py-24 md:py-32 mb-16 sm:mb-24 md:mb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle>Projets Phares</SectionTitle>
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Aucun projet disponible pour le moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects-section" className="py-16 sm:py-24 md:py-32 mb-16 sm:mb-24 md:mb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Projets Phares</SectionTitle>
        <div className="space-y-24 sm:space-y-32 md:space-y-40">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              ref={refsProjets.current[index]}
              className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16"
              initial="masque"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <Parallax speed={index % 2 === 0 ? 20 : -20}>
                <motion.div
                  className="w-full md:w-2/3"
                  variants={{
                    masque: { opacity: 0, x: index % 2 === 0 ? -100 : 100, rotate: index % 2 === 0 ? -10 : 10 },
                    visible: { 
                      opacity: 1, 
                      x: 0, 
                      rotate: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        duration: 1
                      }
                    }
                  }}
                >
                  <motion.img
                    src={project.coverImage || '/placeholder.svg'}
                    alt={project.title}
                    className="w-full h-[300px] sm:h-[400px] md:h-[450px] object-cover rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? -2 : 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  />
                </motion.div>
              </Parallax>
              <motion.div
                className="w-full md:w-1/3 space-y-4 sm:space-y-6"
                variants={{
                  masque: { opacity: 0, x: index % 2 === 0 ? 100 : -100, rotate: index % 2 === 0 ? 10 : -10 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    rotate: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: 0.2,
                      duration: 1
                    }
                  }
                }}
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">{project.title}</h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-300">{project.description}</p>
                
                {/* Technologies tags */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs bg-white/10 text-white rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <motion.button
                  className="bg-white text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold flex items-center space-x-2 group transition-all duration-150 hover:bg-gray-100 transform-gpu"
                  whileHover={{ 
                    scale: 1.1, 
                    x: 3 
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 700, 
                    damping: 25,
                    mass: 0.6
                  }}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <span>Voir le Projet</span>
                  <ArrowRight size={20} className="transition-transform duration-150 group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;