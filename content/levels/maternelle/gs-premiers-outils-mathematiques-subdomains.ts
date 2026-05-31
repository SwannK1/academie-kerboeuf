import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const gsPremiersOutilsMathematiquesSubdomains: MaternelleSubdomain[] = [
  {
    id: "gs-maths-nombres-quantites",
    slug: "nombres-quantites",
    label: "Nombres et quantités",
    description:
      "Dénombrement, composition de petites quantités et comparaison de collections.",
    status: "upcoming",
    sequences: [
      {
        id: "gs-maths-nombres-quantites-seq1",
        title: "Composer une petite quantité",
        objective: "Composer une quantité demandée avec deux collections.",
        observableSkills: ["Compose une quantité demandée avec deux collections."],
        status: "upcoming",
        workshops: [
          {
            id: "gs-maths-nombres-quantites-atelier1",
            title: "Deux paniers pour faire cinq",
            type: "manipulation",
            objective:
              "Réunir deux collections pour atteindre une quantité demandée.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
  {
    id: "gs-maths-formes-grandeurs",
    slug: "formes-grandeurs",
    label: "Formes et grandeurs",
    description:
      "Reconnaissance, description et comparaison de formes ou de grandeurs.",
    status: "upcoming",
    sequences: [
      {
        id: "gs-maths-formes-grandeurs-seq1",
        title: "Décrire une forme",
        objective: "Décrire une forme simple avec un vocabulaire spatial.",
        observableSkills: ["Décrit une forme simple avec un vocabulaire spatial."],
        status: "upcoming",
        workshops: [
          {
            id: "gs-maths-formes-grandeurs-atelier1",
            title: "Portrait de forme",
            type: "jeu",
            objective:
              "Faire retrouver une forme en donnant un indice observable.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
  {
    id: "gs-maths-organisation-espace",
    slug: "organisation-espace",
    label: "Organisation de l'espace",
    description:
      "Repérage, reproduction et organisation de suites ou de positions.",
    status: "upcoming",
    sequences: [
      {
        id: "gs-maths-organisation-espace-seq1",
        title: "Reproduire une organisation",
        objective: "Reproduire une organisation simple d'objets.",
        observableSkills: ["Reproduit une organisation simple d'objets."],
        status: "upcoming",
        workshops: [
          {
            id: "gs-maths-organisation-espace-atelier1",
            title: "Comme le modèle",
            type: "manipulation",
            objective:
              "Replacer des objets pour obtenir la même organisation qu'un modèle.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
];
