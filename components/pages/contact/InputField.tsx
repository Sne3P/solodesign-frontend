import React from "react"
import { motion } from "framer-motion"

interface InputFieldProps {
  type: string
  name: string
  placeholder?: string
  required?: boolean
}

const InputField: React.FC<InputFieldProps> = ({ type, name, placeholder, required }) => (
  <motion.div className="relative overflow-hidden rounded-lg" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
    <motion.input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full px-6 py-4 bg-white bg-opacity-5 text-white placeholder-white placeholder-opacity-50 focus:outline-none transition-colors z-10 relative"
      whileFocus={{ scale: 1.02 }}
    />
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.5 }}
    />
  </motion.div>
)

InputField.displayName = "InputField"

export default React.memo(InputField)
