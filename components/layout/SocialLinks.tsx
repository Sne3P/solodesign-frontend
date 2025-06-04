import React from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin, Dribbble } from "lucide-react";

const socialLinks = [
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Dribbble, href: "#", label: "Dribbble" },
];

const SocialLinks: React.FC = () => {
  return (
    <motion.div
      className="fixed left-6 top-1/2 transform -translate-y-1/2 z-[9999] flex flex-col space-y-6 mix-blend-difference"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 1.5,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
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
