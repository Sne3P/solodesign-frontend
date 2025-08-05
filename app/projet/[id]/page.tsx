"use client";

import ProjectDetailClient from "./ProjectDetailClient";
import { ParallaxProvider } from "react-scroll-parallax";
import { use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProjectPage = ({ params }: PageProps) => {
  const { id } = use(params);
  return (
    <ParallaxProvider>
      <ProjectDetailClient id={id} />
    </ParallaxProvider>
  );
};

export default ProjectPage;
