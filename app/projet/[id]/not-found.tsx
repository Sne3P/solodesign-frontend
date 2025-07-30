"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, AlertCircle } from "lucide-react"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6"
        >
          <AlertCircle className="w-8 h-8 text-red-600" />
        </motion.div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Projet non trouvé
        </h1>
        
        <p className="text-gray-600 mb-8">
          Le projet que vous recherchez n'existe pas ou a été supprimé.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/projects')}
          className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto hover:bg-gray-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux projets</span>
        </motion.button>
      </motion.div>
    </div>
  )
}
