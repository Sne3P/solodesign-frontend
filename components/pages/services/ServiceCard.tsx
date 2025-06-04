import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface ServiceCardProps {
  service: {
    icon: string; // Change to string for image URL
    title: string;
    description: string;
    tools: string[];
  };
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, {
    once: false,
    amount: 0.2,
    margin: "-100px",
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
    else controls.start("hidden");
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 15,
        delay: index * 0.1,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0.8, rotate: -5 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 15,
        delay: index * 0.1 + 0.2,
      },
    },
  };

  const toolVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1 + i * 0.05 + 0.3,
        type: "spring",
        stiffness: 250,
        damping: 15,
      },
    }),
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-white text-black p-6 rounded-lg shadow-lg transform-gpu"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{
        scale: 1.05,
        rotate: [0, -2, 2, -2, 2, 0],
        transition: { type: "spring", stiffness: 600, damping: 15 },
      }}
    >
      <motion.div className="mb-4 text-3xl" variants={iconVariants}>
        <img
          src={service.icon}
          alt={service.title}
          className="w-12 h-12 object-contain mx-auto"
        />
      </motion.div>
      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <div className="flex flex-wrap gap-2">
        {service.tools.map((tool, toolIndex) => (
          <motion.span
            key={toolIndex}
            className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm transition-colors duration-200"
            variants={toolVariants}
            custom={toolIndex}
          >
            {tool}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
