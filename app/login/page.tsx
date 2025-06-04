// app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/hooks/useAuth";
import { useToast } from "@/lib/hooks/useToast";
import { useRouter } from "next/navigation";
import { ButtonLoading } from "@/components/ui/Loading";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const supabase = createClient();

  // Redirige vers le dashboard si déjà connecté
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      showToast({
        type: "error",
        title: "Email requis",
        description: "Veuillez entrer une adresse email valide",
      });
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      showToast({
        type: "error",
        title: "Erreur d'envoi",
        description: error.message || "Erreur lors de l'envoi du lien",
      });
    } else {
      showToast({
        type: "success",
        title: "Lien envoyé !",
        description: `Un lien de connexion a été envoyé à ${email}`,
        duration: 7000,
      });
      setEmail("");
    }
    setIsLoading(false);
  };

  if (user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg mb-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              S
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">SoloDesign</h2>
          <p className="text-gray-600">Accès instantané à votre espace</p>
        </div>

        {/* Formulaire */}
        <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all placeholder-gray-400"
                placeholder="votre@email.com"
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <ButtonLoading text="Envoi..." />
              ) : (
                "Connexion instantanée"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Connexion sécurisée par magic link</p>
          </div>
        </div>
      </div>
    </div>
  );
}
