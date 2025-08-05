import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Clock, Star } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import ActionButton from '../ui/ActionButton';

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@solodesign.fr", href: "mailto:hello@solodesign.fr" },
  { icon: Phone, label: "Téléphone", value: "+33 1 23 45 67 89", href: "tel:+33123456789" },
  { icon: MapPin, label: "Adresse", value: "Paris, France", href: "#" }
];

const ContactSection = () => (
  <section id="contact" className="py-16 sm:py-24 md:py-32 bg-white text-black relative overflow-hidden">
    {/* Background Pattern */}
    <motion.div 
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `linear-gradient(45deg, #000 1px, transparent 1px), linear-gradient(-45deg, #000 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }}
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%']
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "linear"
      }}
    />

    {/* Floating Elements */}
    <motion.div
      className="absolute top-24 left-12 w-3 h-3 bg-black rounded-full opacity-20"
      animate={{ 
        y: [0, -25, 0],
        opacity: [0.2, 0.5, 0.2],
        scale: [1, 1.2, 1]
      }}
      transition={{ 
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute bottom-32 right-20 w-2 h-2 bg-gray-600 rounded-full opacity-30"
      animate={{ 
        y: [0, 20, 0],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{ 
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.2
      }}
    />

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <Parallax translateY={[-20, 20]}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <SectionTitle>Contactez-nous</SectionTitle>
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Prêt à transformer votre vision en réalité ? Parlons-en ensemble.
          </motion.p>
        </motion.div>
      </Parallax>

      <div className="flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-16">
        {/* Contact Form */}
        <div className="w-full md:w-1/2">
          <Parallax translateY={[-30, 30]}>
            <motion.form
              className="space-y-4 sm:space-y-6 bg-gray-50 p-6 sm:p-8 rounded-lg shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20, rotate: -2 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    rotate: 0,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }
                  }
                }}
              >
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <motion.input
                  type="text"
                  id="nom"
                  name="nom"
                  className="w-full p-3 bg-white rounded-lg text-black border border-gray-300 focus:border-black focus:outline-none transition-colors"
                  placeholder="Votre nom"
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                />
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20, rotate: 2 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    rotate: 0,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }
                  }
                }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 bg-white rounded-lg text-black border border-gray-300 focus:border-black focus:outline-none transition-colors"
                  placeholder="votre.email@exemple.com"
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                />
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20, rotate: -2 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    rotate: 0,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }
                  }
                }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full p-3 bg-white rounded-lg text-black border border-gray-300 focus:border-black focus:outline-none transition-colors resize-none"
                  placeholder="Décrivez votre projet..."
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                />
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.9 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.3
                    }
                  }
                }}
              >
                <ActionButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={Send}
                  fullWidth
                >
                  Envoyer le message
                </ActionButton>
              </motion.div>
            </motion.form>
          </Parallax>
        </div>

        {/* Contact Info & CTA */}
        <div className="w-full md:w-1/2">
          <Parallax translateY={[30, -30]}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.2,
                    staggerChildren: 0.1
                  }
                }
              }}
              className="space-y-8"
            >
              {/* Inspirational Text */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                className="text-center md:text-left"
              >
                <motion.h3 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Créons ensemble quelque chose 
                  <span className="text-gray-600 italic"> d&apos;extraordinaire</span>
                </motion.h3>
                <motion.p 
                  className="text-gray-600 text-base sm:text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Chaque grand projet commence par une conversation. 
                  Partagez votre vision avec nous et découvrons ensemble comment la concrétiser.
                </motion.p>
              </motion.div>

              {/* Contact Information */}
              <motion.div 
                className="space-y-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delay: 0.3
                    }
                  }
                }}
              >
                {contactInfo.map((info) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    whileHover={{ 
                      x: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors"
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 5,
                        transition: { 
                          type: "spring", 
                          stiffness: 800, 
                          damping: 10,
                          duration: 0.12
                        }
                      }}
                    >
                      <info.icon size={20} />
                    </motion.div>
                    <div>
                      <p className="text-gray-500 text-sm">{info.label}</p>
                      <p className="text-black font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Response Time */}
              <motion.div
                className="bg-gray-100 p-6 rounded-lg border border-gray-200"
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { delay: 0.5 }
                  }
                }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Clock size={20} className="text-gray-600" />
                  <p className="text-gray-600 text-sm font-medium">Délai de réponse moyen</p>
                </div>
                <p className="text-black text-2xl font-bold">&lt; 24h</p>
                <p className="text-gray-500 text-sm mt-2">
                  Nous nous engageons à répondre rapidement à votre demande
                </p>
              </motion.div>
            </motion.div>
          </Parallax>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
