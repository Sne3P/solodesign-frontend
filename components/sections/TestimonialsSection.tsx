"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      position: "Directrice Marketing",
      company: "Startup Tech",
      rating: 5,
      text: "Une approche créative exceptionnelle qui a transformé notre présence en ligne. Le résultat dépasse nos attentes et reflète parfaitement notre vision !",
      project: "Site Web E-commerce"
    },
    {
      position: "CEO",
      company: "Entreprise Innovante",
      rating: 5,
      text: "Une équipe qui sait comprendre nos besoins et les traduire en solutions visuelles percutantes. Nos résultats commerciaux s'en ressentent positivement.",
      project: "Identité Visuelle Complète"
    },
    {
      position: "Fondatrice",
      company: "Marque Éthique",
      rating: 5,
      text: "Réactivité, créativité et expertise technique remarquables. Un accompagnement sur le long terme qui porte ses fruits à chaque projet.",
      project: "Accompagnement Long Terme"
    },
    {
      position: "Product Manager",
      company: "Solution Digitale",
      rating: 5,
      text: "Une application mobile qui répond parfaitement à nos exigences. Interface intuitive, performances excellentes et respect des délais.",
      project: "Application Mobile"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 sm:py-24 md:py-28 lg:py-32 xl:py-36 relative">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        
        {/* Titre de section */}
        <motion.div
          className="text-center mb-16 sm:mb-20 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">Témoignages Clients</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Ils Nous Font Confiance
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez les retours de nos clients satisfaits
          </p>
        </motion.div>

        {/* Testimonial principal */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-12 text-center"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Quote icon */}
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Quote className="w-8 h-8 text-white" />
              </motion.div>

              {/* Témoignage */}
              <motion.blockquote
                className="text-xl sm:text-2xl md:text-3xl text-white leading-relaxed mb-8 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </motion.blockquote>

              {/* Rating */}
              <motion.div
                className="flex justify-center space-x-1 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Client info */}
              <motion.div
                className="flex flex-col items-center justify-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <p className="text-gray-400 text-lg">
                    {testimonials[currentTestimonial].position}
                  </p>
                  <p className="text-gray-500">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
                
                <div className="bg-white/10 px-4 py-2 rounded-full">
                  <span className="text-sm text-white font-medium">
                    {testimonials[currentTestimonial].project}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial 
                      ? 'bg-white w-8' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Stats testimonials */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-gray-400">Note moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">Portfolio</div>
            <div className="text-gray-400">Projets variés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">Excellence</div>
            <div className="text-gray-400">Satisfaction garantie</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
