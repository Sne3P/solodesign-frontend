"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock } from "lucide-react"
import LogoTitle from "../../components/layout/LogoTitle"
import { useToast } from "../../hooks/use-toast"

const AdminLogin = () => {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Vérifier si déjà connecté
  useEffect(() => {
    const checkAuth = () => {
      console.log("🔍 AdminLogin: Vérification du token...")
      const token = localStorage.getItem('admin_token')
      
      if (token) {
        console.log("✅ AdminLogin: Token trouvé, vérification avec le serveur...")
        
        fetch('/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          if (response.ok) {
            console.log("✅ AdminLogin: Token valide, redirection vers dashboard")
            router.push('/admin/dashboard')
          } else {
            console.log("❌ AdminLogin: Token invalide, suppression")
            localStorage.removeItem('admin_token')
          }
        })
        .catch(error => {
          console.error("💥 AdminLogin: Erreur vérification token:", error)
          localStorage.removeItem('admin_token')
        })
      } else {
        console.log("❌ AdminLogin: Aucun token trouvé")
      }
    }
    
    checkAuth()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    console.log("🔐 AdminLogin: Tentative de connexion...")

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()
      console.log("🔐 AdminLogin: Réponse serveur:", { ok: response.ok, status: response.status })

      if (response.ok) {
        console.log("✅ AdminLogin: Connexion réussie!")
        
        // Stocker seulement dans localStorage pour le côté client
        // Le cookie est défini automatiquement par le serveur
        localStorage.setItem('admin_token', data.token)
        
        console.log("🍪 AdminLogin: Vérification des cookies après connexion:", document.cookie)
        
        toast({
          title: "Connexion réussie",
          description: "Redirection vers le dashboard...",
        })
        
        // Attendre un peu pour que le cookie soit bien défini
        setTimeout(() => {
          console.log("🔄 AdminLogin: Redirection vers dashboard...")
          router.push('/admin/dashboard')
        }, 100)
      } else {
        console.log("❌ AdminLogin: Échec de connexion:", data.error)
        toast({
          title: "Erreur de connexion",
          description: data.error || "Mot de passe incorrect",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("💥 AdminLogin: Erreur lors de la connexion:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6"
          >
            <Lock className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900">
            Administration
          </h2>
          <p className="mt-2 text-gray-600">
            Connectez-vous pour accéder au dashboard
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 space-y-6"
          onSubmit={handleLogin}
        >
          <div>
            <label htmlFor="password" className="sr-only">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Mot de passe administrateur"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-gray-500"
        >
          Accès réservé aux administrateurs
        </motion.p>
      </motion.div>
    </div>
  )
}

export default AdminLogin
