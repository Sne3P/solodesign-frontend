/**
 * Overlay Component - Centralized overlay system
 * Used for hover effects, modals, and image interactions
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { transitions } from '@/lib/animations';

interface OverlayProps {
  isVisible: boolean;
  variant?: 'hover' | 'modal' | 'image' | 'gradient';
  children?: React.ReactNode;
  onClose?: () => void;
  onClick?: () => void;
  className?: string;
  showCloseButton?: boolean;
  showActionIcon?: boolean;
  actionIcon?: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({
  isVisible,
  variant = 'hover',
  children,
  onClose,
  onClick,
  className = '',
  showCloseButton = false,
  showActionIcon = false,
  actionIcon
}) => {
  const variantClasses = {
    hover: "bg-gradient-to-t from-black/30 via-transparent to-transparent",
    modal: "bg-black/50 backdrop-blur-sm",
    image: "bg-black/40 backdrop-blur-sm",
    gradient: "bg-gradient-to-br from-black/20 via-transparent to-black/20"
  };

  const baseClasses = `absolute inset-0 flex items-center justify-center ${variantClasses[variant]} ${className}`;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: transitions.fast
    },
    exit: { 
      opacity: 0,
      transition: transitions.ultraFast
    }
  };

  const contentVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: transitions.standard
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: transitions.fast
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={baseClasses}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClick}
          style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
          {/* Close button */}
          {showCloseButton && onClose && (
            <motion.button
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm 
                         text-white rounded-full flex items-center justify-center
                         hover:bg-white/30 transition-colors z-10"
              variants={contentVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <X size={20} />
            </motion.button>
          )}

          {/* Action icon */}
          {showActionIcon && (
            <motion.div
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full 
                         flex items-center justify-center text-white"
              variants={contentVariants}
              whileHover={{ scale: 1.1 }}
              transition={transitions.fast}
            >
              {actionIcon || <ArrowRight size={24} />}
            </motion.div>
          )}

          {/* Custom content */}
          {children && (
            <motion.div
              variants={contentVariants}
              className="relative z-10"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Overlay;
