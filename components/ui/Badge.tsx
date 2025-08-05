/**
 * Badge Component - Centralized badge system
 * Used for status indicators, premium badges, and feature highlights
 */

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { transitions, scaleAnimations } from '@/lib/animations';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'premium' | 'status' | 'feature' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  className?: string;
  animated?: boolean;
  onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  className = '',
  animated = true,
  onClick
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-full font-medium transition-all";
  
  const variantClasses = {
    default: "bg-gray-100 text-gray-800 border border-gray-200",
    premium: "bg-white/5 backdrop-blur-sm border border-white/10 text-white",
    status: "bg-green-100 text-green-800 border border-green-200",
    feature: "bg-blue-100 text-blue-800 border border-blue-200",
    success: "bg-green-500 text-white shadow-lg",
    warning: "bg-yellow-500 text-white shadow-lg",
    error: "bg-red-500 text-white shadow-lg"
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-xs space-x-1",
    md: "px-4 py-2 text-sm space-x-2",
    lg: "px-6 py-3 text-base space-x-2"
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18
  };

  const badgeClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {Icon && <Icon size={iconSizes[size]} />}
      <span>{children}</span>
    </>
  );

  if (!animated) {
    return (
      <div className={badgeClasses} onClick={onClick}>
        {content}
      </div>
    );
  }

  return (
    <motion.div
      className={badgeClasses}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={transitions.standard}
      whileHover={onClick ? scaleAnimations.moderate.hover : scaleAnimations.subtle.hover}
      whileTap={onClick ? scaleAnimations.moderate.tap : undefined}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {content}
    </motion.div>
  );
};

export default Badge;
