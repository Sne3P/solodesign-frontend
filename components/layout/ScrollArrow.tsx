import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ScrollArrow = () => (
  <motion.div
    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2.5, duration: 0.5, type: "spring" }}
  >
    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
      <ChevronDown size={32} className="text-white" />
    </motion.div>
  </motion.div>
);

export default ScrollArrow;
