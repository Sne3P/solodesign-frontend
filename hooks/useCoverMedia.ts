"use client";

import { useState, useEffect } from "react";
import { Project } from "../lib/types";
import {
  getProjectCoverMediaWithFallback,
  getCoverMediaType,
} from "../lib/coverUtils";

/**
 * Hook pour gérer les images de couverture des projets de manière réactive
 */
export function useCoverMedia(
  project: Project | undefined,
  fallback: string = "/placeholder.svg"
) {
  const [coverUrl, setCoverUrl] = useState<string>(fallback);
  const [mediaType, setMediaType] = useState<"image" | "video" | "none">(
    "none"
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!project) {
      setCoverUrl(fallback);
      setMediaType("none");
      setIsLoading(false);
      return;
    }

    const updateCoverMedia = () => {
      const url = getProjectCoverMediaWithFallback(project, fallback);
      const type = getCoverMediaType(project);

      setCoverUrl(url);
      setMediaType(type);
      setIsLoading(false);
    };

    // Mise à jour initiale
    updateCoverMedia();

    // Écouter les événements de mise à jour de médias
    const handleMediaUpdate = (event: CustomEvent) => {
      const { projectId } = event.detail;
      if (projectId === project.id) {
        if (process.env.NODE_ENV === 'development') {
        }
        updateCoverMedia();
      }
    };

    window.addEventListener("mediaUpdated", handleMediaUpdate as EventListener);
    window.addEventListener(
      "projectUpdated",
      handleMediaUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        "mediaUpdated",
        handleMediaUpdate as EventListener
      );
      window.removeEventListener(
        "projectUpdated",
        handleMediaUpdate as EventListener
      );
    };
  }, [project, fallback]);

  return {
    coverUrl,
    mediaType,
    isLoading,
    hasCover: mediaType !== "none",
  };
}

/**
 * Hook pour gérer la liste des projets avec leurs couvertures
 */
export function useProjectsWithCovers(projects: Project[]) {
  const [projectsWithCovers, setProjectsWithCovers] = useState<Project[]>([]);

  useEffect(() => {
    const updateProjectsWithCovers = () => {
      const enrichedProjects = projects.map((project) => ({
        ...project,
        // S'assurer que chaque projet a une coverImage définie
        coverImage: getProjectCoverMediaWithFallback(project, "/placeholder.svg"),
      }));

      setProjectsWithCovers(enrichedProjects);
    };

    // Mise à jour initiale
    updateProjectsWithCovers();

    // Écouter les événements de mise à jour de médias
    const handleUpdate = () => {
      if (process.env.NODE_ENV === 'development') {
      }
      updateProjectsWithCovers();
    };

    window.addEventListener("mediaUpdated", handleUpdate);
    window.addEventListener("projectUpdated", handleUpdate);

    return () => {
      window.removeEventListener("mediaUpdated", handleUpdate);
      window.removeEventListener("projectUpdated", handleUpdate);
    };
  }, [projects]);

  return projectsWithCovers;
}
