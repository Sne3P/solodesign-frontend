import { useState, useEffect } from "react";

/**
 * Calcule un rayon suffisant pour couvrir tout l’écran (utile pour l’animation clipPath).
 */
export function useCircleRadius(multiplier = 1.5) {
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setRadius(Math.hypot(w, h) * multiplier);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [multiplier]);

  return radius;
}
