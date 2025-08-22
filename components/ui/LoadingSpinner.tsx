"use client";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

/**
 * Composant de chargement unifié pour éviter les problèmes d'hydratation
 * Utilise toujours le même message côté serveur et client
 */
export default function LoadingSpinner({ 
  message = "Chargement...", 
  size = "md",
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-16 w-16", 
    lg: "h-32 w-32"
  };

  const containerClasses = fullScreen 
    ? "min-h-screen bg-gray-50 flex items-center justify-center"
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className={`animate-spin rounded-full border-b-2 border-black mx-auto ${sizeClasses[size]}`}></div>
        <p className="mt-4 text-gray-600">
          {message}
        </p>
      </div>
    </div>
  );
}
