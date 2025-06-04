// app/dashboard/layout.tsx
"use client";

import { ReactNode } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { PageLoading } from "@/components/ui/Loading";
import LogoutButton from "@/components/dashboard/ui/LogoutButton";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  // Chargement simplifié
  if (loading) {
    return <PageLoading text="Accès à votre espace..." />;
  }

  // Le middleware s'occupe des redirections, pas besoin de vérifier ici
  if (!user) {
    return <PageLoading text="Redirection..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                SoloDesign
              </h1>
              <span className="px-3 py-1 text-xs font-medium bg-black/5 text-black/70 rounded-full border border-black/10">
                {user.profile?.role || "client"}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">{children}</div>
      </main>
    </div>
  );
}
