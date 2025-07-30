import ProjectDetailClient from "./ProjectDetailClient"

interface PageProps {
  params: { id: string }
}

const ProjectPage = async ({ params }: PageProps) => {
  const { id } = await params
  return <ProjectDetailClient id={id} />
}

export default ProjectPage
