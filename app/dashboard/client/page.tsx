"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataLoading } from "@/components/ui/Loading";

export default function ClientDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && user && user.profile?.role !== "client" && !isRedirecting) {
      setIsRedirecting(true);
      const userRole = user.profile?.role || "client";
      router.replace(`/dashboard/${userRole}`);
    }
  }, [user, loading, router, isRedirecting]);

  // Afficher loading pendant vérification
  if (loading || isRedirecting) {
    return <DataLoading text="Chargement de votre espace..." />;
  }

  // Si pas client, ne rien afficher (redirection en cours)
  if (!user || user.profile?.role !== "client") {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/40 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Mon Espace Client
            </h2>
            <p className="text-gray-600 mt-1">
              Bienvenue {user.profile?.full_name || user.email}
            </p>
          </div>
          <div className="bg-blue-100/50 backdrop-blur-sm text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200/50">
            Client
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {/*
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {
          [
            { title: "Nouveau Projet", icon: "➕", color: "bg-green-100/50 text-green-700" },
            { title: "Mes Commandes", icon: "📦", color: "bg-blue-100/50 text-blue-700" },
            { title: "Factures", icon: "🧾", color: "bg-yellow-100/50 text-yellow-700" },
            { title: "Support", icon: "💬", color: "bg-purple-100/50 text-purple-700" },
          ].map((action, index) => (
            <button
              key={index}
              className="bg-white/40 backdrop-blur-md hover:bg-white/60 border border-white/20 rounded-xl p-4 text-left transition-all hover:shadow-lg hover:scale-105"
            >
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${action.color} text-lg mb-2`}>
                {action.icon}
              </div>
              <h3 className="font-medium text-gray-900">{action.title}</h3>
            </button>
          ))
        }
      </div>
      */}

      {/* My Projects */}
      <div className="bg-white/40 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Mes Projets</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
        <div className="space-y-3">
          {/*
            [
              { name: "Logo Restaurant ABC", status: "En cours", progress: 75 },
              { name: "Site Web Portfolio", status: "En attente", progress: 0 },
              { name: "Carte de Visite", status: "Terminé", progress: 100 },
            ].map((project, index) => (
              <div key={index} className="bg-white/30 rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Terminé' ? 'bg-green-100/50 text-green-700' :
                    project.status === 'En cours' ? 'bg-blue-100/50 text-blue-700' :
                    'bg-yellow-100/50 text-yellow-700'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <div className="w-full bg-gray-200/50 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
                  <span>Progression</span>
                  <span>{project.progress}%</span>
                </div>
              </div>
            ))
          */}
        </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
