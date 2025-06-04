"use client";

export default function ProjectOverview() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Aperçu des Projets
      </h3>

      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h4 className="text-xl font-medium text-gray-900 mb-2">
          Gestion des projets
        </h4>
        <p className="text-gray-600">
          Cette section permettra de gérer tous les projets en cours et
          terminés.
        </p>
      </div>
    </div>
  );
}
