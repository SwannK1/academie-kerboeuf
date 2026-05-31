import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const msPremiersOutilsMathematiquesSubdomains: MaternelleSubdomain[] = [
  {
    id: "ms-maths-nombres-quantites",
    slug: "nombres-quantites",
    label: "Nombres et quantités",
    description:
      "Dénombrement de petites collections et comparaison concrète de quantités.",
    status: "upcoming",
    sequences: [
      {
        id: "ms-maths-nombres-quantites-seq1",
        title: "Dénombrer une petite collection",
        objective: "Dénombrer une collection jusqu'à trois objets.",
        observableSkills: ["Dénombre une collection jusqu'à trois objets."],
        status: "upcoming",
        workshops: [
          {
            id: "ms-maths-nombres-quantites-atelier1",
            title: "Petits paniers",
            type: "manipulation",
            objective:
              "Mettre le nombre demandé d'objets dans un panier.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
  {
    id: "ms-maths-formes-grandeurs",
    slug: "formes-grandeurs",
    label: "Formes et grandeurs",
    description:
      "Reconnaissance de formes simples et comparaison d'objets manipulables.",
    status: "upcoming",
    sequences: [
      {
        id: "ms-maths-formes-grandeurs-seq1",
        title: "Nommer une forme simple",
        objective: "Nommer une forme simple rencontrée en manipulation.",
        observableSkills: ["Nomme une forme simple en manipulation."],
        status: "upcoming",
        workshops: [
          {
            id: "ms-maths-formes-grandeurs-atelier1",
            title: "La chasse aux formes",
            type: "jeu",
            objective:
              "Retrouver puis nommer une forme simple dans un lot d'objets.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
  {
    id: "ms-maths-tris-suites",
    slug: "tris-suites",
    label: "Tris, classements et suites",
    description:
      "Classements selon une propriété et premières suites répétitives.",
    status: "upcoming",
    sequences: [
      {
        id: "ms-maths-tris-suites-seq1",
        title: "Poursuivre une suite simple",
        objective: "Poursuivre une suite alternée de deux éléments.",
        observableSkills: ["Poursuit une suite alternée de deux éléments."],
        status: "upcoming",
        workshops: [
          {
            id: "ms-maths-tris-suites-atelier1",
            title: "Perles en alternance",
            type: "manipulation",
            objective:
              "Continuer une alternance de deux couleurs avec du matériel.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
];
