"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Edit3, 
  Check, 
  Trash2, 
  Type, 
  Hash, 
  ToggleLeft,
  ToggleRight 
} from "lucide-react";

interface CustomField {
  key: string;
  value: string | number | boolean;
  type: 'string' | 'number' | 'boolean';
}

interface CustomFieldsManagerProps {
  customFields: { [key: string]: string | number | boolean };
  onUpdateFields: (fields: { [key: string]: string | number | boolean }) => void;
}

export default function CustomFieldsManager({ 
  customFields, 
  onUpdateFields 
}: CustomFieldsManagerProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [newField, setNewField] = useState<CustomField>({
    key: '',
    value: '',
    type: 'string'
  });

  const addField = () => {
    if (!newField.key.trim() || customFields[newField.key]) return;

    let processedValue: string | number | boolean = newField.value;
    
    if (newField.type === 'number') {
      processedValue = parseFloat(String(newField.value)) || 0;
    } else if (newField.type === 'boolean') {
      processedValue = Boolean(newField.value);
    }

    onUpdateFields({
      ...customFields,
      [newField.key]: processedValue
    });

    setNewField({ key: '', value: '', type: 'string' });
  };

  const updateField = (key: string, value: string | number | boolean) => {
    onUpdateFields({
      ...customFields,
      [key]: value
    });
  };

  const removeField = (key: string) => {
    const updated = { ...customFields };
    delete updated[key];
    onUpdateFields(updated);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'number':
        return <Hash className="w-4 h-4" />;
      case 'boolean':
        return <ToggleLeft className="w-4 h-4" />;
      default:
        return <Type className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Champs personnalisés
      </label>

      {/* Champs existants */}
      {Object.entries(customFields).length > 0 && (
        <div className="space-y-3">
          {Object.entries(customFields).map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-2 text-gray-500">
                {getTypeIcon(typeof value)}
              </div>

              {editingField === key ? (
                <>
                  <div className="flex-1 space-y-2">
                    <div className="font-medium text-sm text-gray-700">{key}</div>
                    {typeof value === 'boolean' ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateField(key, !value)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                            value 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : 'bg-gray-100 text-gray-600 border border-gray-200'
                          }`}
                        >
                          {value ? (
                            <>
                              <ToggleRight className="w-4 h-4" />
                              <span>Activé</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-4 h-4" />
                              <span>Désactivé</span>
                            </>
                          )}
                        </button>
                      </div>
                    ) : (
                      <input
                        type={typeof value === 'number' ? 'number' : 'text'}
                        value={String(value)}
                        onChange={(e) => {
                          let newValue: string | number = e.target.value;
                          if (typeof value === 'number') {
                            newValue = parseFloat(e.target.value) || 0;
                          }
                          updateField(key, newValue);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingField(null)}
                    className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-700">{key}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      {typeof value === 'boolean' ? (
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          value 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {value ? (
                            <>
                              <ToggleRight className="w-3 h-3" />
                              Activé
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-3 h-3" />
                              Désactivé
                            </>
                          )}
                        </span>
                      ) : (
                        <span>{String(value)}</span>
                      )}
                      <span className="text-xs text-gray-400 ml-auto">({typeof value})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setEditingField(key)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeField(key)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Ajouter un nouveau champ */}
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Ajouter un champ personnalisé
        </h4>
        
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Nom du champ"
              value={newField.key}
              onChange={(e) => setNewField({ ...newField, key: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            
            <select
              value={newField.type}
              onChange={(e) => setNewField({ 
                ...newField, 
                type: e.target.value as 'string' | 'number' | 'boolean',
                value: e.target.value === 'boolean' ? false : ''
              })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="string">Texte</option>
              <option value="number">Nombre</option>
              <option value="boolean">Booléen</option>
            </select>

            {newField.type === 'boolean' ? (
              <button
                type="button"
                onClick={() => setNewField({ ...newField, value: !newField.value })}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
                  newField.value 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
              >
                {newField.value ? (
                  <>
                    <ToggleRight className="w-4 h-4" />
                    <span>Activé</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-4 h-4" />
                    <span>Désactivé</span>
                  </>
                )}
              </button>
            ) : (
              <input
                type={newField.type === 'number' ? 'number' : 'text'}
                placeholder={newField.type === 'number' ? '0' : 'Valeur'}
                value={String(newField.value)}
                onChange={(e) => setNewField({ ...newField, value: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            )}
          </div>

          <button
            type="button"
            onClick={addField}
            disabled={!newField.key.trim() || Boolean(customFields[newField.key])}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {Boolean(customFields[newField.key]) ? 'Ce nom existe déjà' : 'Ajouter le champ'}
          </button>
        </div>
      </div>
    </div>
  );
}
