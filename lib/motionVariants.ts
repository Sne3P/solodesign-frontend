// Exemple de variants réutilisables pour Framer Motion

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const slideIn = (
  direction = "left",
  type = "spring",
  delay = 0,
  duration = 0.6
) => {
  return {
    hidden: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? -100 : direction === "down" ? 100 : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { type, delay, duration, ease: [0.4, 0, 0.2, 1] },
    },
  };
};

export const zoomIn = (delay = 0, duration = 0.6) => {
  return {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay, duration, ease: [0.4, 0, 0.2, 1] },
    },
  };
};

export const textVariant = (delay = 0) => {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };
};
