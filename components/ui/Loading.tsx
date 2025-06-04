"use client";

import { useEffect, useState } from "react";

interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots" | "pulse" | "glassmorphism";
  fullScreen?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const textSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

function SpinnerLoader({ size }: { size: keyof typeof sizeClasses }) {
  return (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 rounded-full border-2 border-gray-200/30"></div>
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-black animate-spin"></div>
    </div>
  );
}

function DotsLoader({ size }: { size: keyof typeof sizeClasses }) {
  const dotSize =
    size === "sm"
      ? "w-1 h-1"
      : size === "md"
      ? "w-1.5 h-1.5"
      : size === "lg"
      ? "w-2 h-2"
      : "w-3 h-3";

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${dotSize} bg-black rounded-full animate-pulse`}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "0.8s",
          }}
        ></div>
      ))}
    </div>
  );
}

function PulseLoader({ size }: { size: keyof typeof sizeClasses }) {
  return (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 rounded-full bg-black/20 animate-ping"></div>
      <div className="absolute inset-0 rounded-full bg-black/40"></div>
    </div>
  );
}

function GlassmorphismLoader({ size }: { size: keyof typeof sizeClasses }) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <div
        className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-black/40 via-transparent to-black/40 backdrop-blur-sm"
        style={{ transform: `rotate(${rotation}deg)` }}
      ></div>
      <div className="absolute inset-1 rounded-full bg-white/10 backdrop-blur-md"></div>
    </div>
  );
}

export default function Loading({
  text = "Chargement...",
  size = "md",
  variant = "glassmorphism",
  fullScreen = false,
  className = "",
}: LoadingProps) {
  const LoaderComponent = {
    spinner: SpinnerLoader,
    dots: DotsLoader,
    pulse: PulseLoader,
    glassmorphism: GlassmorphismLoader,
  }[variant];

  const content = (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <LoaderComponent size={size} />
      {text && (
        <p
          className={`${textSizes[size]} text-gray-600 font-medium animate-pulse`}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
          {content}
        </div>
      </div>
    );
  }

  return <div className="flex items-center justify-center py-8">{content}</div>;
}

// Variations spécialisées
export function PageLoading({
  text = "Chargement de la page...",
}: {
  text?: string;
}) {
  return <Loading text={text} size="lg" variant="glassmorphism" fullScreen />;
}

export function ButtonLoading({ text = "Traitement..." }: { text?: string }) {
  return <Loading text={text} size="sm" variant="spinner" className="py-0" />;
}

export function DataLoading({
  text = "Récupération des données...",
}: {
  text?: string;
}) {
  return <Loading text={text} size="md" variant="dots" />;
}
