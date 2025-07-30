import ProjectDetailClient from "./ProjectDetailClient"

interface PageProps {
  params: { id: string }
}

const ProjectPage = ({ params }: PageProps) => {
  return <ProjectDetailClient id={params.id} />
}

export default ProjectPage
