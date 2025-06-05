export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string; // chemin vers une icône ou nom d’icône si tu utilises une librairie
  features?: string[]; // liste de fonctionnalités ou points forts
  // Ajoute d'autres champs utiles ici
}

export const services: Service[] = [
  {
    id: "1",
    title: "Création de sites web",
    description:
      "Développement de sites vitrines, blogs, portfolios et plateformes sur-mesure, optimisés pour le SEO et la performance.",
    icon: "/icons/web.svg",
    features: [
      "Responsive design",
      "Optimisation SEO",
      "Performance élevée",
      "Maintenance incluse",
    ],
  },
  {
    id: "2",
    title: "E-commerce",
    description:
      "Conception de boutiques en ligne performantes avec gestion du catalogue, paiement sécurisé et interface d’administration.",
    icon: "/icons/ecommerce.svg",
    features: [
      "Intégration Stripe/PayPal",
      "Gestion des stocks",
      "Tableau de bord admin",
      "Support client",
    ],
  },
  {
    id: "3",
    title: "Applications web sur-mesure",
    description:
      "Développement d’applications web adaptées à vos besoins métiers, avec une interface moderne et intuitive.",
    icon: "/icons/app.svg",
    features: [
      "Développement fullstack",
      "API personnalisées",
      "Sécurité avancée",
      "Scalabilité",
    ],
  },
  {
    id: "4",
    title: "Refonte & optimisation",
    description:
      "Modernisation de sites existants, amélioration de l’UX/UI, optimisation des performances et du référencement.",
    icon: "/icons/refresh.svg",
    features: [
      "Audit technique",
      "Optimisation mobile",
      "Amélioration SEO",
      "Modernisation graphique",
    ],
  },
  // Ajoute ici d'autres services selon tes besoins
];

// Pour préparer la future intégration backend :
export async function fetchServices(): Promise<Service[]> {
  // Plus tard, tu pourras remplacer ceci par un appel API
  return services;
}
