import React, { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface GlowingCardProps {
  children: React.ReactNode
  index: number
  globalPos?: { x: number; y: number }
  containerRef?: React.RefObject<HTMLDivElement>
}

const GlowingCard: React.FC<GlowingCardProps> = ({ children, index, globalPos, containerRef }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const hoverState = useSpring(0, { stiffness: 300, damping: 30 })
  const localX = useMotionValue(0)
  const localY = useMotionValue(0)

  useEffect(() => {
    if (globalPos && cardRef.current && containerRef?.current) {
      const cardRect = cardRef.current.getBoundingClientRect()
      const containerRect = containerRef.current.getBoundingClientRect()
      const relativeX = globalPos.x - (cardRect.left - containerRect.left)
      const relativeY = globalPos.y - (cardRect.top - containerRect.top)
      localX.set(relativeX)
      localY.set(relativeY)
    }
  }, [globalPos, containerRef, localX, localY])

  const handleHoverStart = () => hoverState.set(1)
  const handleHoverEnd = () => hoverState.set(0)

  const glowOpacity = useTransform([localX, localY], ([x, y]) => {
    if (!cardRef.current) return 0
    const { offsetWidth: width, offsetHeight: height } = cardRef.current
    const centerX = width / 2
    const centerY = height / 2
    const distance = Math.hypot(x - centerX, y - centerY)
    return Math.max(0, 1 - distance / (width / 1.5))
  })

  const background = useTransform(
    [localX, localY, glowOpacity, hoverState],
    ([x, y, opacity, h]) =>
      `radial-gradient(circle 150px at ${x}px ${y}px, rgba(255,255,255,${opacity * 0.2 * h}), transparent)`
  )

  return (
    <motion.div
      ref={cardRef}
      onClick={() => {}}
      className="cursor-pointer relative overflow-hidden bg-white bg-opacity-5 p-6 rounded-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 20 },
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background }} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

GlowingCard.displayName = "GlowingCard"

export default GlowingCard
