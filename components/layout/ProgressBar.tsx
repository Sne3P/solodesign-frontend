import { motion } from "framer-motion";
import { useMemo } from "react";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export default function ProgressBar({
  current,
  total,
  className = "",
}: ProgressBarProps) {
  const progress = useMemo(() => {
    if (total <= 0) return 0;
    const value = Math.min(Math.max(current + 1, 0), total);
    return (value / total) * 100;
  }, [current, total]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50 ${className}`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progress"
    >
      <motion.div
        className="h-full bg-white"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
}
