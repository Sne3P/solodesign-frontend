'use client';

import { use } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import ProjectDetailClient from './ProjectDetailClient';

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
