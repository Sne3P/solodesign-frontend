"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Stats {
  totalUsers: number;
  totalProjects: number;
  activeProjects: number;
  totalRevenue: number;
}

export default function AdminStats() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalProjects: 0,
    activeProjects: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      try {
        // Récupération du nombre total d'utilisateurs
        const { count: usersCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        setStats((prev) => ({
          ...prev,
          totalUsers: usersCount || 0,
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statsCards = [
    {
      title: "Utilisateurs Total",
      value: stats.totalUsers,
      icon: "👥",
      color: "bg-blue-500",
    },
    {
      title: "Projets Total",
      value: stats.totalProjects,
      icon: "📁",
      color: "bg-green-500",
    },
    {
      title: "Projets Actifs",
      value: stats.activeProjects,
      icon: "🚀",
      color: "bg-yellow-500",
    },
    {
      title: "Chiffre d'affaires",
      value: `${stats.totalRevenue}€`,
      icon: "💰",
      color: "bg-purple-500",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div
              className={`${stat.color} rounded-lg p-3 text-white text-2xl mr-4`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
