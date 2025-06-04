import React, { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface ProcessStepProps {
  step: {
    title: string
    description: string
  }
  index: number
  totalSteps: number
}

const ProcessStep: React.FC<ProcessStepProps> = ({ step, index, totalSteps }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.5, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start("visible")
    else controls.start("hidden")
  }, [isInView, controls])

  const variants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -20 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 250, damping: 15, delay: index * 0.1 },
    },
  }

  return (
    <motion.div
      ref={ref}
      className="flex items-center mb-8 group cursor-pointer"
      variants={variants}
      initial="hidden"
      animate={controls}
      whileHover="hover"
    >
      <div className="relative">
        <motion.div
          className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl mr-4"
          variants={{
            hover: {
              scale: 1.1,
              boxShadow: "0 0 8px rgba(255,255,255,0.5)",
              transition: { type: "spring", stiffness: 800, damping: 20 },
            },
          }}
        >
          {index + 1}
        </motion.div>
        {index < totalSteps - 1 && (
          <motion.div
            className="absolute left-6 top-12 w-0.5 bg-white h-[calc(100%+2rem)] origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        )}
      </div>
      <motion.div
        variants={{
          hover: {
            x: 5,
            transition: { type: "spring", stiffness: 600, damping: 20 },
          },
        }}
      >
        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
        <p>{step.description}</p>
      </motion.div>
    </motion.div>
  )
}

ProcessStep.displayName = "ProcessStep"

export default ProcessStep
