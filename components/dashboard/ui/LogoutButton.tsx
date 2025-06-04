"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useToast } from "@/lib/hooks/useToast";
import { useRouter } from "next/navigation";
import { ButtonLoading } from "@/components/ui/Loading";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { signOut } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await signOut();
      showToast({
        type: "success",
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès",
      });
      router.replace("/login");
    } catch {
      showToast({
        type: "error",
        title: "Erreur de déconnexion",
        description: "Une erreur est survenue lors de la déconnexion",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="group relative overflow-hidden px-4 py-2 bg-black/5 hover:bg-black/10 border border-black/10 hover:border-black/20 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
    >
      {isLoading ? (
        <ButtonLoading text="Déconnexion..." />
      ) : (
        <span className="flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Déconnexion
        </span>
      )}

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
    </button>
  );
}
