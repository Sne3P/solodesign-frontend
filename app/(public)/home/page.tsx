"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { useScroll, useSpring, motion } from "framer-motion";
import SocialLinks from "@/components/layout/SocialLinks";
import MenuButton from "@/components/layout/MenuButton";
import ScrollArrow from "@/components/layout/ScrollArrow";
import Cursor from "@/components/layout/Cursor";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import LogoTitle from "@/components/layout/LogoTitle";

// Scroll progress bar
const ScrollProgressBar = ({ progress }: { progress: any }) => (
  <motion.div
    className="fixed top-0 left-0 right-0 h-1 bg-white mix-blend-difference origin-left z-50"
    style={{ scaleX: progress }}
  />
);

// Animated background
const AnimatedBackground = () => (
  <motion.div
    className="fixed inset-0 pointer-events-none z-10"
    style={{
      backgroundImage:
        "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
      backgroundSize: "30px 30px",
    }}
    animate={{ backgroundPosition: ["0px 0px", "0px -30px"] }}
    transition={{
      backgroundPosition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 10,
        ease: "linear",
      },
    }}
  />
);

// Layout wrapper
const MainLayout = ({
  children,
  menuOpen,
  onMenuToggle,
}: {
  children: React.ReactNode;
  menuOpen: boolean;
  onMenuToggle: () => void;
}) => (
  <div className="relative min-h-screen bg-black text-white overflow-hidden">
    <LogoTitle />
    <MenuButton isOpen={menuOpen} onToggle={onMenuToggle} />
    <SocialLinks />
    {children}
    <ScrollArrow />
    <Cursor />
  </div>
);

const sections = [
  HeroSection,
  ProjectsSection,
  ServicesSection,
  AboutSection,
  ContactSection,
  Footer,
];

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    document.body.classList.add("cursor-none");
    return () => document.body.classList.remove("cursor-none");
  }, []);

  const handleMenuToggle = useCallback(() => setMenuOpen((open) => !open), []);

  if (!mounted) return null;

  return (
    <ParallaxProvider>
      <MainLayout menuOpen={menuOpen} onMenuToggle={handleMenuToggle}>
        <Suspense fallback={null}>
          {sections.map((Section, idx) => (
            <Section key={idx} />
          ))}
        </Suspense>
        <ScrollProgressBar progress={scrollProgress} />
        <AnimatedBackground />
      </MainLayout>
    </ParallaxProvider>
  );
}
