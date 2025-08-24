"use client";

import React, { useRef, createRef, useState, useEffect } from "react";
import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import CoverMedia from "../ui/CoverMedia";
import { useRouter } from "next/navigation";
import { Project } from "../../lib/types";
import ActionButton from "../ui/ActionButton";
import { useProjectsWithCovers } from "../../hooks/useCoverMedia";

const ProjectsSection = () => {
  const [rawProjects, setRawProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const refsProjets = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const router = useRouter();

  // Utiliser le hook pour enrichir les projets avec les images de couverture
  const projects = useProjectsWithCovers(rawProjects);

  useEffect(() => {
    fetchProjects();

    // Écouter les événements de mise à jour de projets et médias
    const handleProjectUpdate = () => {
      if (process.env.NODE_ENV === 'development') {
        console.log("🔄 ProjectsSection: Rechargement des projets");
      }
      fetchProjects();
    };

    const handleMediaUpdate = () => {
      if (process.env.NODE_ENV === 'development') {
        console.log("🔄 ProjectsSection: Rechargement des projets après changement de média");
      }
      fetchProjects();
    };

    window.addEventListener("projectUpdated", handleProjectUpdate);
    window.addEventListener("mediaUpdated", handleMediaUpdate);

    return () => {
      window.removeEventListener("projectUpdated", handleProjectUpdate);
      window.removeEventListener("mediaUpdated", handleMediaUpdate);
    };
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        // Filtrer uniquement les projets publiés et mis en avant pour la page d'accueil
        const featuredProjects = data.filter((project: Project) => 
          project.featured === true && project.status === 'published'
        );
        // Limiter à 6 projets mis en avant maximum
        const limitedProjects = featuredProjects.slice(0, 6);
        setRawProjects(limitedProjects);
        // Créer les refs pour chaque projet
        refsProjets.current = limitedProjects.map(() =>
          createRef<HTMLDivElement>()
        );
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Erreur lors du chargement des projets:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (projectId: string) => {
    // Animation de sortie ultra fluide
    document.body.style.overflow = "hidden";
    const element = document.getElementById("projects-section");
    if (element) {
      element.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      element.style.transform = "scale(0.96) translateY(20px)";
      element.style.opacity = "0";
      element.style.filter = "blur(4px)";
    }

    // Redirection avec un délai optimisé
    setTimeout(() => {
      router.push(`/projet/${projectId}`);
    }, 400);
  };

  if (loading) {
    return (
      <section
        id="projects-section"
        className="py-20 sm:py-24 md:py-28 lg:py-32 xl:py-36 mb-20 sm:mb-24 md:mb-28 lg:mb-32 xl:mb-36"
      >
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="text-center mb-16 sm:mb-20 md:mb-24 lg:mb-28 xl:mb-32">
            <SectionTitle>Projets Phares</SectionTitle>
          </div>
          <div className="flex justify-center items-center py-24">
            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section
        id="projects-section"
        className="py-20 sm:py-24 md:py-28 lg:py-32 xl:py-36 mb-20 sm:mb-24 md:mb-28 lg:mb-32 xl:mb-36"
      >
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="text-center mb-16 sm:mb-20 md:mb-24 lg:mb-28 xl:mb-32">
            <SectionTitle>Projets Mis en Avant</SectionTitle>
          </div>
          <div className="text-center py-24">
            <motion.div
              className="text-gray-400 text-xl sm:text-2xl max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              <div className="mb-4">
                <Star className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              </div>
              <p className="mb-4">Aucun projet mis en avant pour le moment.</p>
              <p className="text-sm text-gray-500">
                Les projets sélectionnés apparaîtront ici pour mettre en valeur le meilleur travail.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects-section"
      className="project-section py-20 sm:py-24 md:py-28 lg:py-32 xl:py-36 mb-20 sm:mb-24 md:mb-28 lg:mb-32 xl:mb-36"
    >
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="text-center mb-16 sm:mb-20 md:mb-24 lg:mb-28 xl:mb-32">
          <SectionTitle>Projets Mis en Avant</SectionTitle>
        </div>

        <div className="space-y-24 sm:space-y-28 md:space-y-32 lg:space-y-36 xl:space-y-40">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                ref={refsProjets.current[index]}
                className={`project-card flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center justify-center gap-12 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-28`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1, margin: "-100px" }}
              >
                {/* Image du projet avec parallax optimisé */}
                <motion.div
                  className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 
                             mx-auto lg:mx-0 lg:flex-1"
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: isEven ? -100 : 100,
                      y: 50,
                      rotate: isEven ? -6 : 6,
                      scale: 0.8,
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotate: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 80,
                        damping: 20,
                        mass: 1,
                        duration: 0.8,
                      },
                    },
                  }}
                >
                  <Parallax
                    speed={isEven ? 8 : -8}
                    className="project-parallax will-change-transform"
                  >
                    <motion.div
                      className="project-image relative group cursor-pointer"
                      whileHover={{
                        scale: 1.05,
                        rotate: isEven ? -1 : 1,
                        y: -8,
                        transition: {
                          type: "spring",
                          stiffness: 800,
                          damping: 10,
                          duration: 0.12,
                        },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        mass: 0.5,
                      }}
                      onClick={() => handleProjectClick(project.id)}
                    >
                      {(() => {
                        // Utiliser directement coverImage du projet enrichi
                        return (
                          <CoverMedia
                            src={project.coverImage || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-72 sm:h-80 md:h-96 lg:h-[400px] xl:h-[480px] 
                                   object-cover rounded-3xl shadow-2xl"
                            onClick={() => handleProjectClick(project.id)}
                            autoPlay={true}
                            muted={true}
                            loop={true}
                            controls={false}
                            fallbackSrc="/placeholder.svg"
                          />
                        );
                      })()}

                      {/* Overlay d'interaction */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent 
                                   rounded-3xl opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />

                      {/* Indicateur de clic */}
                      <motion.div
                        className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm 
                                   rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.15 }}
                      >
                        <ArrowRight className="w-6 h-6 text-white" />
                      </motion.div>
                    </motion.div>
                  </Parallax>
                </motion.div>

                {/* Contenu du projet avec animations fluides */}
                <motion.div
                  className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 
                             mx-auto lg:mx-0 lg:flex-1 text-center lg:text-left 
                             space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-9"
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: isEven ? 100 : -100,
                      y: 50,
                      scale: 0.9,
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 80,
                        damping: 20,
                        mass: 1,
                        duration: 0.8,
                      },
                    },
                  }}
                >
                  {/* Titre avec animation de gradient fluide */}
                  <motion.h3
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 
                               font-bold leading-tight"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        },
                      },
                    }}
                    style={{
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)",
                      backgroundSize: "200% 200%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                    whileInView={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {project.title}
                  </motion.h3>

                  {/* Description avec fade-in fluide */}
                  <motion.p
                    className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 
                               text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                        },
                      },
                    }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Technologies avec animation en cascade ultra-réactive */}
                  {project.technologies && project.technologies.length > 0 && (
                    <motion.div
                      className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.02,
                          },
                        },
                      }}
                    >
                      {project.technologies
                        .slice(0, 4)
                        .map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base 
                                     bg-white/10 backdrop-blur-sm text-white rounded-full 
                                     border border-white/20 font-medium cursor-pointer"
                            variants={{
                              hidden: { opacity: 0, scale: 0.8, y: 15 },
                              visible: {
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                transition: {
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 20,
                                  mass: 0.4,
                                },
                              },
                            }}
                            whileHover={{
                              scale: 1.08,
                              y: -2,
                              backgroundColor: "rgba(255, 255, 255, 0.2)",
                              borderColor: "rgba(255, 255, 255, 0.5)",
                              boxShadow: "0 4px 20px rgba(255, 255, 255, 0.1)",
                            }}
                            whileTap={{
                              scale: 0.95,
                              y: 0,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 600,
                              damping: 20,
                              mass: 0.3,
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                    </motion.div>
                  )}

                  {/* Bouton avec nouveau système centralisé */}
                  <motion.div
                    className="pt-4 sm:pt-6"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 120,
                          damping: 15,
                        },
                      },
                    }}
                  >
                    <ActionButton
                      variant="primary"
                      size="lg"
                      icon={ArrowRight}
                      onClick={() => handleProjectClick(project.id)}
                      className="mx-auto lg:mx-0"
                    >
                      Voir le Projet
                    </ActionButton>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
