import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <motion.h2
    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 md:mb-20 text-center"
    initial={{ opacity: 0, y: 50, rotate: -5 }}
    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    whileHover={{ scale: 1.05, rotate: 2 }}
  >
    {children}
  </motion.h2>
);

export default SectionTitle;
