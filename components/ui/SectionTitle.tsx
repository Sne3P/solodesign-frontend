import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = "" }) => (
  <motion.h2
    className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 md:mb-20 text-center ${className}`}
    initial={{ opacity: 0, y: 50, rotateX: -15 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ 
      type: "spring", 
      stiffness: 100, 
      damping: 20,
      duration: 0.8
    }}
    whileHover={{ 
      scale: 1.02, 
      y: -5,
      transition: { duration: 0.2 }
    }}
  >
    {children}
  </motion.h2>
);

export default SectionTitle;
