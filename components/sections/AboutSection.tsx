import React from "react";
import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

const aboutTexts = [
  `Chez Solo Design, nous croyons en la puissance de la simplicité. Notre approche combine une esthétique minimaliste avec un design fonctionnel pour créer des expériences digitales impactantes qui résonnent avec votre audience.`,
  `En mettant l'accent sur des lignes épurées, une typographie réfléchie et une utilisation stratégique de l'espace blanc, nous créons des designs qui sont non seulement beaux, mais qui communiquent efficacement le message de votre marque.`,
];

const AboutSection: React.FC = React.memo(() => (
  <Parallax y={[-50, 50]}>
    <section
      id="a-propos"
      className="py-16 sm:py-24 md:py-32 mb-16 sm:mb-24 md:mb-32"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>À Propos de Nous</SectionTitle>
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16">
          <motion.div
            className="w-full md:w-1/2 md:pr-8 sm:pr-12"
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {aboutTexts.map((text, i) => (
              <p
                key={i}
                className={`text-base sm:text-lg md:text-xl text-gray-300${
                  i === 0 ? " mb-4 sm:mb-6" : ""
                }`}
              >
                {text}
              </p>
            ))}
          </motion.div>
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src="/placeholder.svg"
              alt="À Propos de Solo Design"
              loading="lazy"
              width={600}
              height={400}
              className="w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  </Parallax>
));

AboutSection.displayName = "AboutSection";
export default AboutSection;
