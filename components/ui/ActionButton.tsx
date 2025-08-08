/**
 * Composant ActionButton réutilisable pour tous les boutons d'action principaux
 * Design moderne avec animations fluides et effets visuels avancés
 */

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  onClick?: () => void;
  href?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  href,
  icon: Icon,
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false
}) => {
  const baseClasses = `group relative flex items-center justify-center gap-3 font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-white/20 overflow-hidden transform-gpu will-change-transform ${fullWidth ? 'w-full' : ''}`;
  
  const variantClasses = {
    primary: "bg-white text-black shadow-lg",
    secondary: "bg-white/10 text-white border border-white/20",
    success: "bg-green-500 text-white shadow-lg",
    danger: "bg-red-500 text-white shadow-lg", 
    warning: "bg-orange-500 text-white shadow-lg"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm min-h-[36px]",
    md: "px-6 py-3 text-base min-h-[44px]",
    lg: "px-8 py-4 text-lg min-h-[52px]",
    xl: "px-10 py-5 text-xl min-h-[60px]"
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
    disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  }`;

  // Animations ultra-rapides et dynamiques
  const buttonVariants = {
    initial: { 
      scale: 1, 
      y: 0,
      boxShadow: variant === 'primary' ? "0 10px 25px -3px rgba(0, 0, 0, 0.1)" : "none"
    },
    hover: { 
      scale: 1.08, 
      y: -6,
      boxShadow: variant === 'primary' ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "0 10px 25px -3px rgba(255, 255, 255, 0.1)",
      transition: { 
        type: "spring", 
        stiffness: 800, 
        damping: 15,
        mass: 0.5,
        duration: 0.15
      }
    },
    tap: { 
      scale: 0.95,
      y: -2,
      transition: { 
        type: "spring", 
        stiffness: 1000, 
        damping: 20,
        mass: 0.3,
        duration: 0.08
      }
    }
  };

  const iconVariants = {
    initial: { x: 0, rotate: 0 },
    hover: { 
      x: 6, 
      rotate: 5,
      transition: { 
        type: "spring", 
        stiffness: 600, 
        damping: 15,
        duration: 0.1
      }
    }
  };

  const content = (
    <>
      {/* Effet de brillance ultra-rapide */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
        initial={{ x: '-100%', opacity: 0 }}
        whileHover={{ 
          x: '100%',
          opacity: 1,
          transition: { 
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
          }
        }}
      />
      
      {/* Effet de pop dynamique */}
      <motion.div 
        className="absolute inset-0 bg-white/5 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ 
          scale: 1.2,
          opacity: 0.6,
          transition: { 
            type: "spring",
            stiffness: 800,
            damping: 10,
            duration: 0.08
          }
        }}
      />
      
      <span className="relative z-10">{children}</span>
      {Icon && (
        <motion.div
          variants={iconVariants}
          className="relative z-10"
          animate={loading ? { rotate: 360 } : {}}
          transition={loading ? { duration: 0.8, repeat: Infinity, ease: "linear" } : {}}
        >
          <Icon className={`${size === 'sm' ? 'w-4 h-4' : size === 'xl' ? 'w-7 h-7' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} ${loading ? 'animate-spin' : ''}`} />
        </motion.div>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        variants={buttonVariants}
        initial="initial"
        whileHover={disabled || loading ? "initial" : "hover"}
        whileTap={disabled || loading ? "initial" : "tap"}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      variants={buttonVariants}
      initial="initial"
      whileHover={disabled || loading ? "initial" : "hover"}
      whileTap={disabled || loading ? "initial" : "tap"}
    >
      {content}
    </motion.button>
  );
};

export default ActionButton;
