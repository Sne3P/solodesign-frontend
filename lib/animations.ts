/**
 * Animation utilities and configurations
 * Centralized animation system for consistent and performant animations
 */

import { Transition, Variants } from 'framer-motion';

// Transition presets for common animations
export const transitions = {
  // Ultra-fast and responsive transitions
  ultraFast: {
    type: "spring",
    stiffness: 800,
    damping: 10,
    duration: 0.08
  } as Transition,

  // Fast transitions for buttons and interactive elements
  fast: {
    type: "spring", 
    stiffness: 600,
    damping: 15,
    duration: 0.12
  } as Transition,

  // Standard transitions for cards and containers
  standard: {
    type: "spring",
    stiffness: 400,
    damping: 20,
    duration: 0.2
  } as Transition,

  // Smooth transitions for large elements
  smooth: {
    type: "spring",
    stiffness: 200,
    damping: 25,
    duration: 0.3
  } as Transition,

  // Ease transitions for simple animations
  easeOut: {
    type: "tween",
    ease: "easeOut",
    duration: 0.2
  } as Transition,

  easeInOut: {
    type: "tween", 
    ease: "easeInOut",
    duration: 0.3
  } as Transition
};

// Scale animations for hover effects
export const scaleAnimations = {
  subtle: {
    hover: { scale: 1.02, transition: transitions.fast },
    tap: { scale: 0.98, transition: transitions.ultraFast }
  },
  
  moderate: {
    hover: { scale: 1.05, transition: transitions.fast },
    tap: { scale: 0.95, transition: transitions.ultraFast }
  },

  strong: {
    hover: { scale: 1.08, transition: transitions.fast },
    tap: { scale: 0.92, transition: transitions.ultraFast }
  },

  dynamic: {
    hover: { scale: 1.12, y: -8, transition: transitions.fast },
    tap: { scale: 0.95, y: 0, transition: transitions.ultraFast }
  }
};

// Common animation variants
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: transitions.standard
  }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.standard
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.standard
  }
};

export const slideInFromLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: transitions.standard
  }
};

export const slideInFromRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: transitions.standard
  }
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: transitions.standard
  }
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: transitions.smooth
  }
};

// Button animation variants
export const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    y: -2,
    transition: transitions.fast
  },
  tap: { 
    scale: 0.95,
    y: 0,
    transition: transitions.ultraFast
  }
};

// Icon animation variants
export const iconVariants: Variants = {
  initial: { x: 0, rotate: 0 },
  hover: { 
    x: 3, 
    rotate: 5,
    transition: transitions.fast
  }
};

// Card hover animations
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.standard
  },
  hover: { 
    scale: 1.03,
    y: -5,
    transition: transitions.fast
  }
};

// Stagger animations for lists
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggeredContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

// Common stagger variants with different timing
export const fastStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.1
    }
  }
};

export const mediumStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15
    }
  }
};

export const slowStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const slideUpStaggerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.easeOut
  }
};

// Floating animations
export const floatingVariants = {
  animate: {
    y: [-2, 2, -2],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const floatingParticles = {
  animate: {
    y: [0, -10, 0],
    opacity: [0.2, 0.5, 0.2],
    scale: [1, 1.2, 1],
  }
};

export const floatingDots = {
  animate: {
    y: [0, -15, 0],
    opacity: [0.1, 0.3, 0.1],
    scale: [1, 1.3, 1]
  }
};

export const mouseTrackingGradient = (mouseX: number, mouseY: number) => ({
  background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.03) 0%, transparent 50%)`
});

export const rotateVariants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
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

// Scroll indicator animation
export const scrollIndicatorVariants = {
  container: {
    animate: { y: [0, 12, 0] },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  border: {
    hover: { 
      borderColor: 'rgba(255,255,255,0.8)',
      transition: { duration: 0.12 }
    }
  }
};

// Text animation variants
export const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20, rotate: -1 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: transitions.smooth
  }
};

export const letterVariants = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  hover: {
    y: -8,
    scale: 1.12,
    transition: transitions.ultraFast
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

// Page transition animations
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: transitions.smooth
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: transitions.fast
  }
};

export const pageExitTransition = {
  style: {
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'scale(0.96) translateY(20px)',
    opacity: '0',
    filter: 'blur(4px)'
  }
};

// Background and special effects
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

// Status and error animations
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

// Utility functions
export const createStaggerDelay = (index: number, baseDelay = 0.1) => ({
  ...transitions.standard,
  delay: baseDelay + index * 0.1
});

export const createHoverScale = (scale = 1.05, y = -2) => ({
  scale,
  y,
  transition: transitions.fast
});

export const createScrollProgress = (scrollYProgress: import('framer-motion').MotionValue<number>) => {
  return {
    scaleX: scrollYProgress
  };
};

// Export d'un objet contenant tous les variants pour faciliter l'import
export const animations = {
  fadeIn: fadeInVariants,
  fadeInUp: fadeInUp,
  fadeInDown: fadeInDown,
  slideUp: slideUpVariants,
  slideInFromLeft: slideInFromLeftVariants,
  slideInFromRight: slideInFromRightVariants,
  scaleIn: scaleInVariants,
  container: containerVariants,
  staggeredContainer: staggeredContainerVariants,
  fastStagger: fastStaggerVariants,
  mediumStagger: mediumStaggerVariants,
  slowStagger: slowStaggerVariants,
  floating: floatingVariants,
  floatingParticles: floatingParticles,
  floatingDots: floatingDots,
  pulse: pulseVariants,
  rotate: rotateVariants,
  slideUpStagger: slideUpStaggerVariants,
  backgroundPattern: backgroundPatternVariants,
  particle: particleVariants,
  glow: glowVariants,
  statusIndicator: statusIndicatorVariants,
  button: buttonVariants,
  icon: iconVariants,
  title: titleVariants,
  titleGlow: titleGlowVariants,
  letter: letterVariants,
  scrollIndicator: scrollIndicatorVariants,
  errorIcon: errorIconVariants,
  card: cardVariants,
  pageTransition: pageTransition,
  pageExit: pageExitTransition
};

export default animations;
