/**
 * Composant SecondaryButton - Bouton secondaire réutilisable
 * Version simplifiée et minimaliste pour les actions secondaires
 */

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SecondaryButtonProps {
  onClick?: () => void;
  href?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  variant?: 'outline' | 'ghost' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  onClick,
  href,
  icon: Icon,
  children,
  variant = 'outline',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseClasses = "group flex items-center justify-center gap-3 font-medium rounded-full border focus:outline-none focus:ring-2 focus:ring-white/20 transform-gpu will-change-transform";
  
  const variantClasses = {
    outline: "border-white/30 text-white",
    ghost: "border-transparent text-white/80",
    minimal: "border-transparent text-white/70"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm min-h-[36px]",
    md: "px-6 py-3 text-base min-h-[44px]",
    lg: "px-8 py-4 text-lg min-h-[52px]"
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
    disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  }`;

  // Animations ultra-rapides et subtiles
  const buttonVariants = {
    initial: { 
      scale: 1, 
      y: 0,
      borderColor: variant === 'outline' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)',
      backgroundColor: variant === 'outline' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)'
    },
    hover: { 
      scale: 1.05, 
      y: -3,
      borderColor: variant === 'outline' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.15)',
      backgroundColor: variant === 'outline' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
      transition: { 
        type: "spring", 
        stiffness: 600, 
        damping: 18,
        mass: 0.4,
        duration: 0.12
      }
    },
    tap: { 
      scale: 0.96,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 800, 
        damping: 20,
        mass: 0.3,
        duration: 0.08
      }
    }
  };

  const iconVariants = {
    initial: { x: 0, rotate: 0 },
    hover: { 
      x: 4, 
      rotate: loading ? 360 : 3,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 15,
        duration: 0.1
      }
    }
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {Icon && (
        <motion.div
          variants={iconVariants}
          className="relative z-10"
          animate={loading ? { rotate: 360 } : {}}
          transition={loading ? { duration: 0.8, repeat: Infinity, ease: "linear" } : {}}
        >
          <Icon className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} ${loading ? 'animate-spin' : ''}`} />
        </motion.div>
      )}
      
      {/* Effet de brillance rapide et subtil */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-full"
        initial={{ x: '-100%', opacity: 0 }}
        whileHover={{ 
          x: '100%',
          opacity: 1,
          transition: { 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }
        }}
      />
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${buttonClasses} relative overflow-hidden`}
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
      className={`${buttonClasses} relative overflow-hidden`}
      variants={buttonVariants}
      initial="initial"
      whileHover={disabled || loading ? "initial" : "hover"}
      whileTap={disabled || loading ? "initial" : "tap"}
    >
      {content}
    </motion.button>
  );
};

export default SecondaryButton;
