"use client";

import React, { useRef } from "react";
import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { projects } from "@/lib/data/projects"; // <-- import des projets

const MotionImage = motion<any>(Image);

const ProjectsSection = () => {
  const refsProjets = useRef<Array<HTMLDivElement | null>>([]);
  const router = useRouter();

  const handleProjectClick = (projectId: string) => {
    document.body.style.overflow = "hidden";
    const element = document.getElementById("projects-section");
    if (element) {
      element.style.transition = "all 0.5s ease-in-out";
      element.style.transform = "scale(0.95)";
      element.style.opacity = "0";
    }
    setTimeout(() => {
      router.push(`/projet/${projectId}`);
    }, 500);
  };

  return (
    <section
      id="projects-section"
      className="py-16 sm:py-24 md:py-32 mb-16 sm:mb-24 md:mb-32"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Projets Phares</SectionTitle>
        <div className="space-y-24 sm:space-y-32 md:space-y-40">
          {projects.map((projet, index) => (
            <motion.div
              key={projet.id}
              ref={(el) => (refsProjets.current[index] = el)}
              className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16"
              initial="masque"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <Parallax speed={index % 2 === 0 ? 20 : -20}>
                <motion.div
                  className="w-full md:w-2/3"
                  variants={{
                    masque: {
                      opacity: 0,
                      x: index % 2 === 0 ? -100 : 100,
                      rotate: index % 2 === 0 ? -10 : 10,
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      rotate: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        duration: 1,
                      },
                    },
                  }}
                >
                  <MotionImage
                    src={projet.image}
                    alt={projet.title}
                    width={800}
                    height={600}
                    className="w-full h-[300px] sm:h-[400px] md:h-[450px] object-cover rounded-lg shadow-lg"
                    whileHover={{
                      scale: 1.05,
                      rotate: index % 2 === 0 ? -2 : 2,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  />
                </motion.div>
              </Parallax>
              <motion.div
                className="w-full md:w-1/3 space-y-4 sm:space-y-6"
                variants={{
                  masque: {
                    opacity: 0,
                    x: index % 2 === 0 ? 100 : -100,
                    rotate: index % 2 === 0 ? 10 : -10,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    rotate: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: 0.2,
                      duration: 1,
                    },
                  },
                }}
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  {projet.title}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-300">
                  {projet.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {projet.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-800 text-gray-200 px-3 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.button
                  className="bg-white text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold flex items-center space-x-2 group"
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onClick={() => handleProjectClick(projet.id)}
                >
                  <span>Voir le Projet</span>
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-2"
                  />
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
