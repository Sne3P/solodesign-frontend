import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';

const ContactSection = () => (
  <section id="contact" className="py-16 sm:py-24 md:py-32 bg-white text-black">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle>Contactez-nous</SectionTitle>
      <div className="flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-16">
        <div className="w-full md:w-1/2">
          <form className="space-y-4 sm:space-y-6">
            <motion.div
              initial="masque"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                masque: { opacity: 0, y: 20, rotate: -2 },
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
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <motion.input
                type="text"
                id="nom"
                name="nom"
                className="w-full p-3 bg-gray-100 rounded-lg text-black border border-gray-300 focus:border-black focus:outline-none transition-colors"
                placeholder="Votre nom"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              />
            </motion.div>
            <motion.div
              initial="masque"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                masque: { opacity: 0, y: 20, rotate: 2 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1
                  }
                }
              }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <motion.input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 bg-gray-100 rounded-lg text-black border border-gray-300 focus:border-black focus:outline-none transition-colors"
                placeholder="Votre email"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              />
            </motion.div>
            <motion.div
              initial="masque"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                masque: { opacity: 0, y: 20, rotate: -2 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2
                  }
                }
              }}
            >
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <motion.textarea
                id="message"
                name="message"
                rows={6}
                className="w-full p-3 bg-gray-100 rounded-lg text-black border border-gray-300 focus:border-black focus:outline-none transition-colors"
                placeholder="Votre message"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              ></motion.textarea>
            </motion.div>
            <motion.button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial="masque"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                masque: { opacity: 0, y: 20, rotate: 2 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.3
                  }
                }
              }}
            >
              Envoyer le Message
            </motion.button>
          </form>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <motion.div
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center"
            initial="masque"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              masque: { opacity: 0, scale: 0.8, rotate: -5 },
              visible: { 
                opacity: 1, 
                scale: 1,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }
              }
            }}

          >
              Créons ensemble quelque chose d'extraordinaire.

          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
