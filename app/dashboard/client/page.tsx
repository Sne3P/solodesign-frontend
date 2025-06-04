"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DataLoading } from "@/components/ui/Loading";
import ClientProjects from "@/components/dashboard/client/ClientProjects";
import ClientOrders from "@/components/dashboard/client/ClientOrders";
import ClientProfile from "@/components/dashboard/client/ClientProfile";

export default function ClientDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && user.profile?.role !== "client") {
      const userRole = user.profile?.role || "client";
      router.replace(`/dashboard/${userRole}`);
    }
  }, [user, loading, router]);

  if (loading) {
    return <DataLoading text="Chargement de votre espace..." />;
  }

  if (!user || user.profile?.role !== "client") {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/40 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mon Espace Client</h2>
            <p className="text-gray-600 mt-1">
              Bienvenue {user.profile?.full_name || user.email}
            </p>
          </div>
          <div className="bg-blue-100/50 backdrop-blur-sm text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200/50">
            Client
          </div>
        </div>
      </div>

      <ClientProjects />
      <ClientOrders />
      <ClientProfile />
    </div>
  );
}
