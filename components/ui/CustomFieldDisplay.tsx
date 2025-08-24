"use client";

import { motion } from "framer-motion";
import { 
  Type, 
  Hash, 
  ToggleRight,
  ToggleLeft,
  Check,
  X,
  Info
} from "lucide-react";

interface CustomFieldDisplayProps {
  customFields: { [key: string]: string | number | boolean };
}

export default function CustomFieldDisplay({ customFields }: CustomFieldDisplayProps) {
  if (!customFields || Object.keys(customFields).length === 0) {
    return null;
  }

  const getFieldIcon = (value: string | number | boolean) => {
    if (typeof value === 'boolean') {
      return value ? <ToggleRight className="w-5 h-5 text-green-600" /> : <ToggleLeft className="w-5 h-5 text-gray-400" />;
    } else if (typeof value === 'number') {
      return <Hash className="w-5 h-5 text-blue-600" />;
    } else {
      return <Type className="w-5 h-5 text-purple-600" />;
    }
  };

  const getFieldValue = (value: string | number | boolean) => {
    if (typeof value === 'boolean') {
      return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
          value 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-gray-100 text-gray-600 border border-gray-200'
        }`}>
          {value ? (
            <>
              <Check className="w-4 h-4" />
              <span>Activé</span>
            </>
          ) : (
            <>
              <X className="w-4 h-4" />
              <span>Désactivé</span>
            </>
          )}
        </div>
      );
    } else if (typeof value === 'number') {
      return (
        <div className="bg-blue-50 text-blue-800 px-3 py-1.5 rounded-lg font-mono text-sm border border-blue-200">
          {value.toLocaleString()}
        </div>
      );
    } else {
      return (
        <div className="bg-purple-50 text-purple-800 px-3 py-1.5 rounded-lg text-sm border border-purple-200">
          {String(value)}
        </div>
      );
    }
  };

  const formatFieldName = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* En-tête avec icône */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Info className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Informations Supplémentaires</h3>
          <p className="text-sm text-gray-600 mt-1">Détails spécifiques du projet</p>
        </div>
      </div>

      {/* Grille des champs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(customFields).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-gray-300"
          >
            {/* En-tête du champ */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-shrink-0">
                {getFieldIcon(value)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">
                  {formatFieldName(key)}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {typeof value === 'boolean' ? 'Booléen' : typeof value === 'number' ? 'Nombre' : 'Texte'}
                </p>
              </div>
            </div>

            {/* Valeur du champ */}
            <div className="flex justify-end">
              {getFieldValue(value)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Statistiques */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Champs personnalisés</span>
          <span className="font-semibold text-gray-900">
            {Object.keys(customFields).length} champ{Object.keys(customFields).length > 1 ? 's' : ''}
          </span>
        </div>
        <div className="mt-2 flex gap-4 text-xs text-gray-500">
          {Object.values(customFields).some(v => typeof v === 'boolean') && (
            <span className="flex items-center gap-1">
              <ToggleRight className="w-3 h-3" />
              {Object.values(customFields).filter(v => typeof v === 'boolean').length} booléen(s)
            </span>
          )}
          {Object.values(customFields).some(v => typeof v === 'number') && (
            <span className="flex items-center gap-1">
              <Hash className="w-3 h-3" />
              {Object.values(customFields).filter(v => typeof v === 'number').length} nombre(s)
            </span>
          )}
          {Object.values(customFields).some(v => typeof v === 'string') && (
            <span className="flex items-center gap-1">
              <Type className="w-3 h-3" />
              {Object.values(customFields).filter(v => typeof v === 'string').length} texte(s)
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
