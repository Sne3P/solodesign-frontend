'use client'

import { motion } from 'framer-motion'

interface InlineLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  className?: string
}

export default function InlineLoader({ 
  size = 'md', 
  message, 
  className = '' 
}: InlineLoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <motion.div
        className={`border-2 border-gray-300 border-t-blue-500 rounded-full ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {message && (
        <span className="text-sm text-gray-600">{message}</span>
      )}
    </div>
  )
}
