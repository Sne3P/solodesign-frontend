"use client";

export default function ClientProjects() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Mes Projets</h3>

      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎨</div>
        <h4 className="text-xl font-medium text-gray-900 mb-2">
          Aucun projet en cours
        </h4>
        <p className="text-gray-600 mb-4">
          Commencez votre premier projet de design avec nous !
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Nouveau Projet
        </button>
      </div>
    </div>
  );
}
