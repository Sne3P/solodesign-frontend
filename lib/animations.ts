/**
 * Centralisation des variants d'animation Framer Motion
 * Pour assurer la cohérence et réduire la duplication de code
 */

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  }
};

export const slideInFromLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  }
};

export const slideInFromRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  }
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  }
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

export const staggeredContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
};

export const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const rotateVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const slideUpStaggerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const backgroundPatternVariants = {
  animate: {
    backgroundPosition: ["0% 0%", "100% 100%"],
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: "linear",
    }
  }
};

export const particleVariants = {
  animate: {
    opacity: [0, 0.6, 0],
    scale: [0, 1.5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const glowVariants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const slideBarVariants = {
  animate: {
    x: [-100, 100],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const statusIndicatorVariants = {
  animate: {
    scale: [1, 1.3, 1],
    opacity: [0.3, 0.8, 0.3],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Variants pour les boutons
export const buttonHoverVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

export const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

// Variants pour les titres
export const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const titleGlowVariants = {
  animate: {
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Variants pour les erreurs/loading
export const errorIconVariants = {
  animate: { 
    rotate: [0, 5, -5, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Variants pour les cartes/sections
export const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    }
  },
  hover: { 
    y: -5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    }
  }
};

// Export d'un objet contenant tous les variants pour faciliter l'import
export const animations = {
  fadeIn: fadeInVariants,
  slideUp: slideUpVariants,
  slideInFromLeft: slideInFromLeftVariants,
  slideInFromRight: slideInFromRightVariants,
  scaleIn: scaleInVariants,
  container: containerVariants,
  staggeredContainer: staggeredContainerVariants,
  floating: floatingVariants,
  pulse: pulseVariants,
  rotate: rotateVariants,
  slideUpStagger: slideUpStaggerVariants,
  backgroundPattern: backgroundPatternVariants,
  particle: particleVariants,
  glow: glowVariants,
  slideBar: slideBarVariants,
  statusIndicator: statusIndicatorVariants,
  button: buttonVariants,
  buttonHover: buttonHoverVariants,
  title: titleVariants,
  titleGlow: titleGlowVariants,
  errorIcon: errorIconVariants,
  card: cardVariants,
};

export default animations;
