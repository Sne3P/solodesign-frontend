"use client";

import React from 'react';
import Link from 'next/link';
import { useLoading } from '@/contexts/LoadingContext';

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, children, className, onClick }) => {
  const { startNavigation } = useLoading();

  const handleClick = () => {
    // Si c'est un lien externe ou une ancre, ne pas déclencher le loader
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) {
      if (onClick) onClick();
      return;
    }

    // Déclencher le loader pour la navigation interne
    startNavigation();
    if (onClick) onClick();
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default CustomLink;
