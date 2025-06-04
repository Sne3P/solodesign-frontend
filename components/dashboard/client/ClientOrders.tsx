"use client";

export default function ClientOrders() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Mes Commandes</h3>

      <div className="text-center py-12">
        <div className="text-6xl mb-4">📦</div>
        <h4 className="text-xl font-medium text-gray-900 mb-2">
          Aucune commande
        </h4>
        <p className="text-gray-600">
          Vos commandes apparaîtront ici une fois passées.
        </p>
      </div>
    </div>
  );
}
