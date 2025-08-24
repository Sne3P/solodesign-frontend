"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingGridProps {
  message?: string;
  itemCount?: number;
  columns?: 'sm' | 'md' | 'lg';
}

/**
 * Composant de chargement spécifique pour la grille de projets
 * Affiche des cartes skeleton pendant le chargement
 */
export default function LoadingGrid({ 
  message = "Chargement des projets...", 
  itemCount = 6,
  columns = 'md'
}: LoadingGridProps) {
  const getGridCols = () => {
    switch (columns) {
      case 'sm':
        return 'grid-cols-1 md:grid-cols-2';
      case 'lg':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div className="space-y-6">
      {/* Message de chargement avec spinner */}
      <div className="flex items-center justify-center gap-3 py-8">
        <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>

      {/* Grille de cartes skeleton */}
      <div className={`grid ${getGridCols()} gap-6`}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            {/* Image skeleton */}
            <div className="aspect-video bg-gray-200 animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
            </div>

            {/* Content skeleton */}
            <div className="p-5 space-y-3">
              {/* Title skeleton */}
              <div className="flex justify-between items-start">
                <div className="h-5 bg-gray-200 rounded animate-pulse flex-1 mr-2" />
                <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Description skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
              </div>

              {/* Technologies skeleton */}
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
              </div>

              {/* Actions skeleton */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                <div className="flex space-x-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
