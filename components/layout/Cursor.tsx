import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) =>
      setPosition({ x: e.clientX, y: e.clientY });
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const clickable = target?.closest(
        'a, button, .social-icon, .menu-item, .service-card'
      );
      setHover(!!clickable);
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleHover);
    document.addEventListener('mouseout', () => setHover(false));

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseout', () => setHover(false));
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[10001] mix-blend-difference"
      style={{
        x: position.x - 12,
        y: position.y - 12,
        backgroundColor: hover ? 'white' : 'transparent',
        border: '2px solid white',
      }}
      animate={{ scale: hover ? 1.5 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    />
  );
};

export default Cursor;
