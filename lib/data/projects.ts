export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  date?: string;
  // Ajoute d'autres champs utiles ici
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Monochrome",
    description:
      "Site e-commerce moderne pour une marque de vêtements minimalistes. Intégration Stripe, gestion du panier et interface admin.",
    image: "/images/monochrome.png",
    tags: ["Next.js", "Tailwind CSS", "Stripe", "TypeScript"],
    link: "https://monochrome.example.com",
    github: "https://github.com/tonprofil/monochrome",
    date: "2024-02-15",
  },
  {
    id: "2",
    title: "Portfolio Photographe",
    description:
      "Portfolio responsive pour photographe professionnel avec galerie dynamique et animations fluides.",
    image: "/images/photographe.png",
    tags: ["React", "Framer Motion", "Vercel"],
    link: "https://photo.example.com",
    github: "https://github.com/tonprofil/portfolio-photo",
    date: "2023-11-10",
  },
  {
    id: "3",
    title: "Blog Tech",
    description:
      "Blog technique avec gestion des articles, commentaires et recherche en temps réel.",
    image: "/images/blog-tech.png",
    tags: ["Next.js", "MongoDB", "Tailwind CSS"],
    link: "https://blogtech.example.com",
    github: "https://github.com/tonprofil/blog-tech",
    date: "2023-08-05",
  },
  {
    id: "4",
    title: "Dashboard Analytics",
    description:
      "Dashboard interactif pour visualiser des données en temps réel avec graphiques personnalisés.",
    image: "/images/dashboard.png",
    tags: ["React", "Recharts", "TypeScript"],
    link: "https://dashboard.example.com",
    github: "https://github.com/tonprofil/dashboard-analytics",
    date: "2024-01-20",
  },
  {
    id: "5",
    title: "Application ToDo",
    description:
      "Application de gestion de tâches avec authentification et synchronisation cloud.",
    image: "/images/todo.png",
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
    link: "https://todo.example.com",
    github: "https://github.com/tonprofil/todo-app",
    date: "2023-09-12",
  },
  // Ajoute ici d'autres projets selon tes besoins
];

// Pour préparer la future intégration backend :
export async function fetchProjects(): Promise<Project[]> {
  // Plus tard, tu pourras remplacer ceci par un appel API
  return projects;
}
