import { motion } from "framer-motion"

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = ((current + 1) / total) * 100

  return (
    <div className="fixed top-0 left-0 right-0 z-30">{/* z-index réduit pour être sous le menu */}
      <div className="h-1 bg-black/30 backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-white via-gray-200 to-white shadow-lg"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: 0.8, 
            ease: [0.4, 0, 0.2, 1],
            type: "tween"
          }}
        />
      </div>
      
      {/* Progress indicator avec positionnement amélioré */}
      <div className="absolute top-2 right-2 sm:right-4 md:right-20 lg:right-24">
        <motion.div
          className="bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1 border border-white/20"
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <span className="text-white text-xs font-medium">
            {current + 1}/{total}
          </span>
        </motion.div>
      </div>
    </div>
  )
}

