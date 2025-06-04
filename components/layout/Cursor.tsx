import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const CURSOR_SIZE = 24;

const Cursor: React.FC = () => {
  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  // Mouse move handler optimisé avec requestAnimationFrame
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  // Hover handler
  const handleHover = useCallback((e: MouseEvent) => {
    const clickable = (e.target as HTMLElement)?.closest(
      "a, button, .social-icon, .menu-item, .service-card"
    );
    setHover(!!clickable);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleHover);
    document.addEventListener("mouseout", () => setHover(false));
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleHover);
      document.removeEventListener("mouseout", () => setHover(false));
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleHover]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10001] mix-blend-difference"
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        borderRadius: "50%",
        x: position.x - CURSOR_SIZE / 2,
        y: position.y - CURSOR_SIZE / 2,
        backgroundColor: hover ? "white" : "transparent",
        border: "2px solid white",
      }}
      animate={{ scale: hover ? 1.5 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    />
  );
};

export default Cursor;
