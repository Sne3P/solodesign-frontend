import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Github } from 'lucide-react';

const socialLinks = [
  { Icon: Github, href: 'https://github.com/Sne3P', label: 'GitHub' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const SocialLinks: React.FC = () => {
  return (
    <motion.div
      className="fixed left-6 top-1/2 transform -translate-y-1/2 z-[9999] flex-col space-y-6 mix-blend-difference hidden lg:flex"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.5, type: "spring", stiffness: 100, damping: 10 }}
    >
      {socialLinks.map(({ Icon, href, label }, index) => (
        <motion.a
          key={index}
          href={href}
          className="text-white hover:text-gray-300 transition-colors relative group social-icon"
          whileHover={{ scale: 1.2, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          aria-label={label}
        >
          <Icon size={24} />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;