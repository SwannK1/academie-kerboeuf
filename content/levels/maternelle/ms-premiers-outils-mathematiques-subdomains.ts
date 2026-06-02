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
        slug: "denombrer-une-collection-jusqua-5",
        title: "Dénombrer une collection jusqu’à 5",
        objective: "Dénombrer une collection jusqu'à cinq objets.",
        observableSkills: ["Dénombre une collection jusqu'à cinq objets."],
        status: "upcoming",
        workshops: [
          {
            id: "ms-maths-nombres-quantites-atelier1",
            slug: "petits-paniers",
            title: "Petits paniers",
            type: "manipulation",
            objective:
              "Mettre le nombre demandé d'objets dans un panier.",
            status: "upcoming",
          },
        ],
      },
      {
        id: "ms-maths-nombres-quantites-seq2",
        slug: "comparer-deux-collections",
        title: "Comparer deux collections",
        objective:
          "Comparer deux petites collections manipulables pour dire où il y en a plus, moins ou autant.",
        observableSkills: [
          "Compare deux collections en utilisant un vocabulaire quantitatif simple.",
        ],
        status: "upcoming",
        workshops: [
          {
            id: "ms-maths-nombres-quantites-atelier2",
            slug: "deux-collections-a-comparer",
            title: "Deux collections à comparer",
            type: "manipulation",
            objective:
              "Associer ou déplacer des objets pour comparer deux petites collections.",
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
        slug: "classer-selon-deux-criteres-simples",
        title: "Classer selon deux critères simples",
        objective:
          "Classer des objets selon deux critères simples successifs ou combinés.",
        observableSkills: [
          "Classe des objets selon deux critères simples, par exemple forme et couleur.",
        ],
        status: "upcoming",
        workshops: [
          {
            id: "ms-maths-tris-suites-atelier1",
            slug: "boites-de-tri",
            title: "Boîtes de tri",
            type: "manipulation",
            objective:
              "Trier des objets selon leur couleur puis leur forme.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
];
