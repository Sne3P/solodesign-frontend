import React, { useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { ArrowUp, Heart, Github, Linkedin, Twitter } from 'lucide-react';
import { backgroundPatternVariants, floatingVariants } from '@/lib/animations';

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "Github" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" }
];

const footerLinks = [
  { label: "Conditions d'utilisation", href: "/terms" },
  { label: "Politique de confidentialité", href: "/privacy" },
  { label: "Mentions légales", href: "/legal" }
];

const navigationLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projets", href: "/projects" },
  { label: "À propos", href: "/about-us" },
  { label: "Contact", href: "/contact" }
];

const Footer = () => {
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterClick = () => {
    setNewsletterMessage("Momentanément indisponible, veuillez réessayer plus tard.");
    setTimeout(() => setNewsletterMessage(""), 3000);
  };

  return (
    <Parallax speed={-3}>
      <footer className="text-white relative overflow-hidden">
        {/* Background Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 50%, #fff 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
          {...backgroundPatternVariants}
        />

        {/* Floating Elements */}
        <motion.div
          className="absolute top-8 right-12 w-2 h-2 bg-gray-600 rounded-full opacity-40"
          {...floatingVariants}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-16 left-20 w-1 h-1 bg-gray-500 rounded-full opacity-30"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Footer Content */}
          <div className="py-16 border-b border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Brand Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <motion.h3 
                  className="text-3xl font-bold mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Solo Design
                </motion.h3>
                <motion.p 
                  className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Nous transformons vos idées en expériences digitales exceptionnelles. 
                  Design moderne, développement performant, résultats mesurables.
                </motion.p>

                {/* Newsletter Signup */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.input
                    type="email"
                    placeholder="Votre email"
                    className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors"
                    whileFocus={{ 
                      scale: 1.02,
                      borderColor: "#ffffff"
                    }}
                  />
                  <motion.button
                    onClick={handleNewsletterClick}
                    className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    S&apos;abonner
                  </motion.button>
                </motion.div>
                {newsletterMessage && (
                  <motion.div
                    className="text-red-500 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {newsletterMessage}
                  </motion.div>
                )}
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4 className="text-lg font-semibold mb-6 text-white">Navigation</h4>
                <ul className="space-y-3">
                  {navigationLinks.map((item, index) => (
                    <motion.li key={item.label}>
                      <motion.a
                        href={item.href}
                        className="text-gray-400 hover:text-white transition-colors block"
                        whileHover={{ x: 5, color: "#ffffff" }}
                        transition={{ duration: 0.2 }}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        custom={index}
                      >
                        {item.label}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
                <div className="space-y-3 text-gray-400">
                  <motion.p
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    hello@solodesign.fr
                  </motion.p>
                  <motion.p
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    +33 06 60 94 98 79
                  </motion.p>
                  <motion.p
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Paris, France
                  </motion.p>
                </div>

                {/* Social Links */}
                <motion.div 
                  className="flex space-x-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 5,
                        y: -2
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.4 + (index * 0.1),
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="py-8 flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.p 
                className="text-gray-500 text-sm flex items-center"
                whileHover={{ scale: 1.02 }}
              >
                &copy; 2024 Solo Design. Créé avec
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="mx-1 text-red-500"
                >
                  <Heart size={14} />
                </motion.span>
                à la Réunion 
              </motion.p>

              <div className="flex space-x-6">
                {footerLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
                    whileHover={{ y: -1 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg"
              whileHover={{ 
                scale: 1.1, 
                y: -3,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3,
                type: "spring",
                stiffness: 200
              }}
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </div>
      </footer>
    </Parallax>
  );
};

export default Footer;
