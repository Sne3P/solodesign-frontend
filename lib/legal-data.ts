/**
 * Données légales centralisées pour SoloDesign
 * À compléter avec les vraies informations légales
 */

export const legalData = {
  company: {
    name: "MR BASTIEN ROBERT",
    legalForm: "Micro-entreprise", // À ajuster selon votre statut
    address: "LILLE, France", // Adresse complète requise
    postalCode: "59800", // Code postal requis
    city: "Lille",
    country: "France",
    phone: "+33 06 60 94 98 79",
    email: "contact@solodesign.fr",

    // OBLIGATOIRE pour les entreprises françaises
    siret: "920 734 787", // À compléter OBLIGATOIREMENT
    rcs: "Non applicable", // Si société
    vat: "FR72920734787", // Si TVA applicable
    codeAPE: "6201Z", // Code APE pour développement web

    // Assurance professionnelle
    insurance: {
      company: "",
      policy: "",
      coverage: "",
    },
  },

  legal: {
    // Directeur de publication (OBLIGATOIRE)
    director: "Bastien ROBERT", // À compléter

    // Hébergement (OBLIGATOIRE)
    hosting: {
      provider: "Hostinger", // ou votre hébergeur
      address: "",
      phone: "",
    },

    // Médiation (OBLIGATOIRE pour les entreprises)
    mediation: {
      name: "Médiateur de la consommation",
      website: "https://www.mediation-consommation.fr",
      conditions:
        "En cas de litige, le consommateur peut recourir à la médiation",
    },
  },

  privacy: {
    dataController: "SoloDesign",
    dpo: "contact@solodesign.fr", // Data Protection Officer
    dataRetention: {
      contacts: "3 ans après le dernier contact",
      analytics: "26 mois maximum",
      cookies: "13 mois maximum",
    },
    rights: [
      "Droit d'accès à vos données",
      "Droit de rectification",
      "Droit à l'effacement",
      "Droit à la portabilité",
      "Droit d'opposition",
      "Droit à la limitation du traitement",
    ],
  },

  terms: {
    lastUpdate: "2025-08-09",
    governingLaw: "Droit français",
    jurisdiction: "Tribunaux de Paris",
    limitationOfLiability: true,
    intellectualProperty: {
      owner: "SoloDesign",
      copyright: "© 2025 SoloDesign. Tous droits réservés.",
      trademarks: ["SoloDesign"],
    },
  },

  cookies: {
    essential: [
      {
        name: "session_token",
        purpose: "Authentification utilisateur",
        duration: "Session",
        type: "Fonctionnel",
      },
    ],
    analytics: [
      {
        name: "_ga",
        purpose: "Google Analytics - Identification visiteur",
        duration: "2 ans",
        type: "Analytique",
      },
      {
        name: "_gid",
        purpose: "Google Analytics - Identification session",
        duration: "24 heures",
        type: "Analytique",
      },
    ],
    marketing: [
      {
        name: "clarity_session",
        purpose: "Microsoft Clarity - Analyse comportement",
        duration: "1 an",
        type: "Marketing",
      },
    ],
    preferences: [
      {
        name: "theme_preference",
        purpose: "Mémoriser votre thème préféré",
        duration: "6 mois",
        type: "Préférences",
      },
      {
        name: "language_preference",
        purpose: "Mémoriser votre langue préférée",
        duration: "12 mois",
        type: "Préférences",
      },
    ],
  },
};

export default legalData;
