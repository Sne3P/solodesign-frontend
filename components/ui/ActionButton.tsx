/**
 * Composant ActionButton réutilisable pour tous les boutons d'action
 * Centralise les patterns de boutons avec icônes, loading, etc.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { animations } from '@/lib/animations';

interface ActionButtonProps {
  onClick?: () => void;
  href?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  iconAnimation?: 'none' | 'rotate' | 'pulse';
  type?: 'button' | 'submit' | 'reset';
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
  iconAnimation = 'none',
  type = 'button'
}) => {
  const baseClasses = "group flex items-center space-x-3 font-light transition-all duration-300 rounded-full";
  
  const variantClasses = {
    primary: "bg-white/10 text-white hover:bg-white/20",
    secondary: "bg-black/20 text-white hover:bg-black/30", 
    outline: "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
    ghost: "text-white hover:bg-white/10",
    danger: "bg-red-500/20 text-white hover:bg-red-500/30"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const iconAnimationProps = {
    none: {},
    rotate: animations.rotate.animate,
    pulse: animations.pulse.animate
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
    disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  }`;

  const content = (
    <>
      {Icon && (
        <motion.div
          animate={loading ? animations.rotate.animate : iconAnimationProps[iconAnimation]}
        >
          <Icon className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`} />
        </motion.div>
      )}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        variants={animations.button}
        whileHover={disabled || loading ? {} : animations.buttonHover.hover}
        whileTap={disabled || loading ? {} : animations.buttonHover.tap}
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
      variants={animations.button}
      whileHover={disabled || loading ? {} : animations.buttonHover.hover}
      whileTap={disabled || loading ? {} : animations.buttonHover.tap}
    >
      {content}
    </motion.button>
  );
};

export default ActionButton;
