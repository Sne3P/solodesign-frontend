"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  X,
  FileText,
  User,
  Briefcase,
  Mail,
  Command,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  title: string;
  type: "page" | "service" | "project" | "contact";
  url: string;
  description?: string;
}

const searchData: SearchResult[] = [
  {
    title: "Accueil",
    type: "page",
    url: "/",
    description: "Page d'accueil de Solo Design",
  },
  {
    title: "À propos",
    type: "page",
    url: "/about-us",
    description: "Découvrez Solo Design et son expertise",
  },
  {
    title: "Services",
    type: "page",
    url: "/services",
    description: "Nos services de développement web",
  },
  {
    title: "Projets",
    type: "page",
    url: "/projects",
    description: "Portfolio de nos réalisations",
  },
  {
    title: "Contact",
    type: "contact",
    url: "/contact",
    description: "Contactez-nous pour votre projet",
  },
  {
    title: "Développement Web",
    type: "service",
    url: "/services#web-development",
    description: "Création de sites web modernes",
  },
  {
    title: "Design UI/UX",
    type: "service",
    url: "/services#ui-ux-design",
    description: "Interface utilisateur et expérience",
  },
  {
    title: "Optimisation SEO",
    type: "service",
    url: "/services#seo-optimization",
    description: "Référencement naturel",
  },
  {
    title: "Mentions légales",
    type: "page",
    url: "/mentions-legales",
    description: "Informations légales",
  },
  {
    title: "Politique de confidentialité",
    type: "page",
    url: "/privacy",
    description: "Protection des données",
  },
  {
    title: "Conditions d'utilisation",
    type: "page",
    url: "/terms",
    description: "Conditions générales",
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "page":
      return <FileText className="w-4 h-4" />;
    case "service":
      return <Briefcase className="w-4 h-4" />;
    case "project":
      return <User className="w-4 h-4" />;
    case "contact":
      return <Mail className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "page":
      return "Page";
    case "service":
      return "Service";
    case "project":
      return "Projet";
    case "contact":
      return "Contact";
    default:
      return "Page";
  }
};

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filtrage des résultats
  const filteredResults = useMemo(() => {
    if (!query.trim()) return searchData.slice(0, 6);

    return searchData
      .filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 8);
  }, [query]);

  // Gestion des raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K ou Cmd+K pour ouvrir/fermer
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Échap pour fermer
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        return;
      }

      // Navigation avec les flèches
      if (isOpen && filteredResults.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex(
            (prev) =>
              (prev - 1 + filteredResults.length) % filteredResults.length
          );
        } else if (e.key === "Enter") {
          e.preventDefault();
          const selectedResult = filteredResults[selectedIndex];
          if (selectedResult) {
            window.location.href = selectedResult.url;
            setIsOpen(false);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex]);

  // Reset de l'index sélectionné quand la recherche change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Reset de la recherche quand on ferme
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl mx-4"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 text-lg bg-transparent border-none outline-none placeholder-gray-400"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Résultats */}
              <div className="max-h-96 overflow-y-auto">
                {filteredResults.length > 0 ? (
                  <div className="p-2">
                    {filteredResults.map((result, index) => (
                      <button
                        key={`${result.url}-${index}`}
                        onClick={() => {
                          window.location.href = result.url;
                          setIsOpen(false);
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          index === selectedIndex
                            ? "bg-blue-50 dark:bg-blue-900/20"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 text-gray-400">
                            {getTypeIcon(result.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-900 dark:text-white truncate">
                                {result.title}
                              </h3>
                              <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                                {getTypeLabel(result.type)}
                              </span>
                            </div>
                            {result.description && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {result.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    {query
                      ? "Aucun résultat trouvé"
                      : "Commencez à taper pour rechercher..."}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                        ↑↓
                      </kbd>
                      naviguer
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                        ↵
                      </kbd>
                      sélectionner
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                        esc
                      </kbd>
                      fermer
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Command className="w-3 h-3" />
                    <span>+K pour ouvrir</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
