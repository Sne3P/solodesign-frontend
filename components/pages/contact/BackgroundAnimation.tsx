import React from "react"
import { motion } from "framer-motion"

const BackgroundAnimation: React.FC = () => (
  <motion.div
    className="fixed inset-0 pointer-events-none z-10"
    style={{
      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
      backgroundSize: "30px 30px",
    }}
    animate={{ backgroundPosition: ["0px 0px", "0px -30px"] }}
    transition={{
      backgroundPosition: {
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        duration: 10,
        ease: "linear",
      },
    }}
  />
)

BackgroundAnimation.displayName = "BackgroundAnimation"

export default React.memo(BackgroundAnimation)
