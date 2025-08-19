/**
 * Card Component - Centralized card system
 * Used for projects, services, testimonials, and content blocks
 */

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cardVariants, scaleAnimations, transitions } from '@/lib/animations';
import Overlay from './Overlay';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated' | 'flat' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  hover?: 'subtle' | 'lift' | 'scale' | 'none';
  onClick?: () => void;
  animated?: boolean;
  showOverlay?: boolean;
  overlayContent?: React.ReactNode;
  icon?: LucideIcon;
  title?: string;
  description?: string;
  image?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  hover = 'subtle',
  onClick,
  animated = true,
  showOverlay = false,
  overlayContent,
  icon: Icon,
  title,
  description,
  image
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const baseClasses = "relative overflow-hidden transition-all";
  
  const variantClasses = {
    default: "bg-white border border-gray-200 rounded-lg shadow-md",
    glass: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl",
    elevated: "bg-white rounded-xl shadow-lg hover:shadow-xl",
    flat: "bg-gray-50 rounded-lg border-0",
    gradient: "bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg"
  };

  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10"
  };

  const hoverAnimations = {
    subtle: scaleAnimations.subtle,
    lift: {
      hover: { y: -5, scale: 1.02, transition: transitions.fast },
      tap: { y: 0, scale: 0.98, transition: transitions.ultraFast }
    },
    scale: scaleAnimations.moderate,
    none: {}
  };

  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {/* Image */}
      {image && (
        <div className="relative mb-4 rounded-lg overflow-hidden">
          <Image 
            src={image} 
            alt={title || "Card image"} 
            width={400}
            height={192}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <Overlay 
            isVisible={isHovered && showOverlay}
            variant="image"
            showActionIcon
          >
            {overlayContent}
          </Overlay>
        </div>
      )}

      {/* Header with icon and title */}
      {(Icon || title) && (
        <div className="flex items-center space-x-3 mb-4">
          {Icon && (
            <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center">
              <Icon size={24} />
            </div>
          )}
          {title && (
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          )}
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
      )}

      {/* Custom content */}
      {children}
    </>
  );

  if (!animated) {
    return (
      <div 
        className={cardClasses}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        {content}
      </div>
    );
  }

  return (
    <motion.div
      className={cardClasses}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={hover !== 'none' ? hoverAnimations[hover].hover : undefined}
      whileTap={hover !== 'none' ? hoverAnimations[hover].tap : undefined}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {content}
    </motion.div>
  );
};

export default Card;
