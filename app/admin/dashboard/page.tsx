"use client";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Plus,
  LogOut,
  X,
  Save,
  Image as ImageIcon,
} from "lucide-react";
import { Project, ProjectFormData } from "../../../lib/types";
import { useToast } from "../../../hooks/use-toast";
import { useAuth } from "../../../hooks/useAuth";
import { useProjects } from "../../../hooks/useProjects";
import MediaManager from "../../../components/admin/MediaManager";
import ProjectGrid from "../../../components/admin/ProjectGrid";

const AdminDashboard = () => {
  // Hook optimisé pour la gestion des projets
  const {
    projects,
    loading: projectsLoading,
    createProject: createProjectAPI,
    updateProject: updateProjectAPI,
    deleteProject: deleteProjectAPI
  } = useProjects({ autoFetch: true });

  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "media">("details");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    technologies: "",
    tags: "",
    duration: "",
    teamSize: "",
    scope: "",
  });
  const router = useRouter();
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading, logout } = useAuth();

  // Rediriger si non authentifié
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, authLoading, router]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
  };

  const handleMediaUpdate = async () => {
    if (editingProject) {
      await handleRefreshProject();
    }
  };

  const handleRefreshProject = async () => {
    if (!editingProject) return;

    try {
      const response = await fetch(`/api/projects/${editingProject.id}`, {
        credentials: "include",
        cache: "no-cache",
      });

      if (response.ok) {
        const updatedProject = await response.json();
        setEditingProject(updatedProject);
      }
    } catch (error) {
      console.error("Erreur refresh projet:", error);
    }
  };

  const handleCoverImageChange = (imageUrl: string) => {
    setEditingProject((prev) =>
      prev ? { ...prev, coverImage: imageUrl } : null
    );
  };

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        technologies: Array.isArray(project.technologies)
          ? project.technologies.join(", ")
          : project.technologies,
        tags: Array.isArray(project.tags)
          ? project.tags.join(", ")
          : project.tags,
        duration: project.duration,
        teamSize: project.teamSize,
        scope: project.scope,
      });
      setActiveTab("details");
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        technologies: "",
        tags: "",
        duration: "",
        teamSize: "",
        scope: "",
      });
      setActiveTab("details");
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Formatage des données pour l'API
      const projectData = {
        title: formData.title,
        description: formData.description,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        duration: formData.duration,
        teamSize: formData.teamSize,
        scope: formData.scope,
        coverImage: '',
        images: [],
        videos: [],
        status: 'draft' as const,
      };
      
      if (editingProject) {
        // Mise à jour d'un projet existant
        const updatedProject = await updateProjectAPI(editingProject.id, projectData);
        
        if (updatedProject) {
          setEditingProject(updatedProject);
          setShowModal(false);
          
          toast({
            title: "Succès",
            description: "Projet mis à jour avec succès",
          });
        }
      } else {
        // Création d'un nouveau projet
        const newProject = await createProjectAPI(projectData);
        
        if (newProject) {
          // Passer automatiquement en mode édition avec onglet médias
          setEditingProject(newProject);
          setActiveTab("media");
          setFormData({
            title: newProject.title,
            description: newProject.description,
            technologies: Array.isArray(newProject.technologies)
              ? newProject.technologies.join(", ")
              : newProject.technologies,
            tags: Array.isArray(newProject.tags)
              ? newProject.tags.join(", ")
              : newProject.tags,
            duration: newProject.duration,
            teamSize: newProject.teamSize,
            scope: newProject.scope,
          });
          
          toast({
            title: "Succès",
            description: "Projet créé avec succès",
          });
        }
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      return;
    }

    try {
      const success = await deleteProjectAPI(id);
      
      if (success) {
        toast({
          title: "Succès",
          description: "Projet supprimé avec succès",
        });
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  // Afficher le loader pendant la vérification d'authentification
  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Chargement du dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (projectsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Admin
            </h1>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal()}
                className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau Projet</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Projets ({projects.length})
          </h2>
        </div>

        {/* Projects Grid */}
        <ProjectGrid 
          projects={projects}
          onEdit={openModal}
          onDelete={handleDelete}
          onView={(projectId) => window.open(`/projet/${projectId}`, "_blank")}
          columns="lg"
        />

        {projects.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun projet
            </h3>
            <p className="text-gray-600 mb-4">
              Créez votre premier projet pour commencer.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal()}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              Créer un projet
            </motion.button>
          </div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingProject
                      ? `Modifier: ${editingProject.title}`
                      : "Nouveau Projet"}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${
                      activeTab === "details"
                        ? "bg-white text-black shadow-sm"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    Détails
                  </button>
                  {editingProject && (
                    <button
                      onClick={() => setActiveTab("media")}
                      className={`px-3 py-2 text-sm font-medium rounded-lg ${
                        activeTab === "media"
                          ? "bg-white text-black shadow-sm"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      Médias (
                      {(editingProject.images?.length || 0) +
                        (editingProject.videos?.length || 0)}
                      )
                    </button>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {activeTab === "details" && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Titre du projet
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Nom du projet"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        rows={4}
                        placeholder="Description du projet"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Technologies (séparées par des virgules)
                      </label>
                      <input
                        type="text"
                        value={formData.technologies}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            technologies: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="React, Node.js, MongoDB"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags (séparés par des virgules)
                      </label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) =>
                          setFormData({ ...formData, tags: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="web, mobile, api"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Durée
                        </label>
                        <input
                          type="text"
                          value={formData.duration}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              duration: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="6 mois"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Équipe
                        </label>
                        <input
                          type="text"
                          value={formData.teamSize}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              teamSize: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="5 personnes"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Portée
                        </label>
                        <input
                          type="text"
                          value={formData.scope}
                          onChange={(e) =>
                            setFormData({ ...formData, scope: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Internationale"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowModal(false)}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Annuler
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>
                          {editingProject ? "Mettre à jour" : "Créer"}
                        </span>
                      </motion.button>
                    </div>
                  </form>
                )}

                {activeTab === "media" && editingProject && editingProject.id && (
                  <MediaManager
                    projectId={editingProject.id}
                    images={editingProject.images || []}
                    videos={editingProject.videos || []}
                    coverImage={editingProject.coverImage}
                    onMediaUpdate={handleMediaUpdate}
                    onCoverImageChange={handleCoverImageChange}
                    onRefreshProject={handleRefreshProject}
                  />
                )}
                
                {activeTab === "media" && editingProject && !editingProject.id && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Veuillez d&apos;abord sauvegarder le projet pour accéder aux médias.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
