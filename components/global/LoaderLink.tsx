'use client';

import Link from 'next/link';
import { useLoading } from '@/lib/LoadingContext';
import { ReactNode } from 'react';

interface LoaderLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const LoaderLink = ({ href, children, className, onClick }: LoaderLinkProps) => {
  const { startLoading } = useLoading();

  const handleClick = () => {
    startLoading();
    onClick?.();
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default LoaderLink;
