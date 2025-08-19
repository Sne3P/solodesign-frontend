"use client";

import ProjectDetailClient from "./ProjectDetailClient";
import { ParallaxProvider } from "react-scroll-parallax";

interface PageProps {
  params: { id: string };
}

const ProjectPage = ({ params }: PageProps) => {
  const { id } = params;
  return (
    <ParallaxProvider>
      <ProjectDetailClient id={id} />
    </ParallaxProvider>
  );
};

export default ProjectPage;
