"use client"

import React, { useRef, createRef } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { useRouter } from 'next/navigation';

const projets = [
  { id: 1, titre: "Monochrome", desc: "Une plateforme e-commerce élégante pour une marque de mode minimaliste", image: "/placeholder.svg?height=600&width=800" },
  { id: 2, titre: "Minimal", desc: "Identité de marque pour une galerie d'art contemporain mettant en valeur des œuvres avant-gardistes", image: "/placeholder.svg?height=600&width=800" },
  { id: 3, titre: "Simplicité", desc: "Design UI/UX pour une application de productivité axée sur la concentration et l'efficacité", image: "/placeholder.svg?height=600&width=800" },
  { id: 4, titre: "Essence", desc: "Design d'emballage pour une ligne de soins de la peau de luxe mettant l'accent sur des ingrédients naturels", image: "/placeholder.svg?height=600&width=800" },
  { id: 5, titre: "Pureté", desc: "Conception web pour un spa haut de gamme offrant des expériences de détente et de rajeunissement", image: "/placeholder.svg?height=600&width=800" },
  { id: 6, titre: "Clarté", desc: "Campagne digitale pour une startup technologique révolutionnant le cloud computing", image: "/placeholder.svg?height=600&width=800" }
];

const ProjectsSection = () => {
  const refsProjets = useRef(
    Array.from({ length: 6 }, () => createRef<HTMLDivElement>())
  );
  const router = useRouter();

  const handleProjectClick = (projectId: number) => {
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

  return (
    <section id="projects-section" className="py-16 sm:py-24 md:py-32 mb-16 sm:mb-24 md:mb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Projets Phares</SectionTitle>
        <div className="space-y-24 sm:space-y-32 md:space-y-40">
          {projets.map((projet, index) => (
            <motion.div
              key={projet.id}
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
                    src={projet.image}
                    alt={projet.titre}
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
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">{projet.titre}</h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-300">{projet.desc}</p>
                <motion.button
                  className="bg-white text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold flex items-center space-x-2 group"
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onClick={() => handleProjectClick(projet.id)}
                >
                  <span>Voir le Projet</span>
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
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