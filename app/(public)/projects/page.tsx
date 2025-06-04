"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LogoTitle from "@/components/layout/LogoTitle";
import SocialLinks from "@/components/layout/SocialLinks";
import MenuButton from "@/components/layout/MenuButton";
import Cursor from "@/components/layout/Cursor";
import ProgressBar from "@/components/layout/ProgressBar";
import Footer from "@/components/sections/Footer";
import ProjectCard from "@/components/ui/ProjectCard";

const projects = [
  {
    id: 1,
    title: "Monochrome",
    description:
      "Une plateforme e-commerce élégante qui redéfinit l'expérience d'achat en ligne avec une esthétique minimaliste et une interface utilisateur intuitive.",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Minimal",
    description:
      "Identité de marque épurée pour une galerie d'art contemporain, mettant en valeur les œuvres tout en restant discrète et sophistiquée.",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Simplicité",
    description:
      "Application de productivité au design intuitif, permettant aux utilisateurs de se concentrer sur l'essentiel sans distractions superflues.",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Essence",
    description:
      "Design d'emballage innovant pour une ligne de soins de la peau, alliant luxe et durabilité dans une présentation minimaliste et élégante.",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    title: "Pureté",
    description:
      "Site web pour un spa haut de gamme, créant une expérience en ligne aussi relaxante et raffinée que les services offerts sur place.",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    title: "Clarté",
    description:
      "Campagne digitale percutante pour une startup tech, communiquant des concepts complexes de manière claire et visuellement attrayante.",
    image: "/placeholder.svg",
  },
];

export default function ProjectsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const [direction, setDirection] = useState(0);
  const scrollRef = useRef(0);
  const controls = useAnimation();

  const changeProject = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentProject(
      (prev) => (prev + newDirection + projects.length) % projects.length
    );
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      scrollRef.current += e.deltaY;

      if (Math.abs(scrollRef.current) > 100) {
        const newDirection = scrollRef.current > 0 ? 1 : -1;
        changeProject(newDirection);
        scrollRef.current = 0;

        controls
          .start({
            y: newDirection * 20,
            transition: { duration: 0.3 },
          })
          .then(() => controls.set({ y: 0 }));
      }
    },
    [changeProject, controls]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        changeProject(1);
      } else if (e.key === "ArrowLeft") {
        changeProject(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [changeProject]);

  return (
    <div
      className="h-screen bg-black text-white overflow-hidden"
      onWheel={handleWheel}
    >
      <div className="relative h-full">
        <LogoTitle />
        <SocialLinks />
        <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <ProgressBar current={currentProject} total={projects.length} />

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={controls}
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentProject}
              custom={direction}
              className="w-full max-w-4xl px-4"
              initial={(custom) => ({
                x: custom > 0 ? "100%" : "-100%",
                opacity: 0,
              })}
              animate={{ x: 0, opacity: 1 }}
              exit={(custom) => ({
                x: custom < 0 ? "100%" : "-100%",
                opacity: 0,
              })}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <ProjectCard project={projects[currentProject]} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.button
          className="absolute top-1/2 left-8 md:left-16 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 focus:outline-none z-10"
          onClick={() => changeProject(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} />
        </motion.button>

        <motion.button
          className="absolute top-1/2 right-8 md:right-16 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 focus:outline-none z-10"
          onClick={() => changeProject(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} />
        </motion.button>

        <Cursor />

        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "0px -30px"],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 10,
            ease: "linear",
          }}
        />

        <div className="absolute bottom-0 left-0 right-0">
          <Footer />
        </div>
      </div>
    </div>
  );
}
