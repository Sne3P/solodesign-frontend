"use client";

import { useAuth } from "@/lib/hooks/useAuth";

export default function ClientProfile() {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Mon Profil</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom complet
          </label>
          <p className="mt-1 text-sm text-gray-900">
            {user?.profile?.full_name || "Non défini"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rôle
          </label>
          <p className="mt-1 text-sm text-gray-900">{user?.profile?.role}</p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
          Modifier le profil
        </button>
      </div>
    </div>
  );
}
