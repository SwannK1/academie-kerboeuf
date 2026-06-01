import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const psPremiersOutilsMathematiquesSubdomains: MaternelleSubdomain[] = [
  {
    id: "ps-maths-nombres-quantites",
    slug: "nombres-quantites",
    label: "Nombres et quantités",
    description:
      "Découverte des petites quantités par manipulation et jeux de collection.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-maths-nombres-quantites-seq1",
        title: "Reconnaître une petite quantité",
        objective: "Reconnaître une collection de un ou deux objets.",
        observableSkills: ["Reconnaît une collection de un ou deux objets."],
        status: "in-progress",
        workshops: [
          {
            id: "ps-maths-nombres-quantites-atelier1",
            title: "Boîtes à trésors",
            type: "manipulation",
            objective:
              "Associer une boîte contenant un ou deux objets à une demande orale.",
            status: "in-progress",
          },
        ],
      },
    ],
  },
  {
    id: "ps-maths-formes-grandeurs",
    slug: "formes-grandeurs",
    label: "Formes et grandeurs",
    description:
      "Manipulation guidée de formes et d'objets de tailles contrastées.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-maths-formes-grandeurs-seq1",
        title: "Associer des formes identiques",
        objective: "Associer deux formes identiques par manipulation.",
        observableSkills: ["Associe deux formes identiques."],
        status: "in-progress",
        workshops: [
          {
            id: "ps-maths-formes-grandeurs-atelier1",
            title: "Paires de formes",
            type: "manipulation",
            objective:
              "Retrouver une forme identique parmi plusieurs formes simples.",
            status: "in-progress",
          },
        ],
      },
    ],
  },
  {
    id: "ps-maths-tris-classements",
    slug: "tris-classements",
    label: "Tris et classements",
    description:
      "Premiers tris d'objets selon une propriété visible et stable.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-maths-tris-classements-seq1",
        title: "Trier selon une propriété visible",
        objective: "Regrouper des objets selon une couleur ou une forme.",
        observableSkills: ["Regroupe des objets selon une propriété visible."],
        status: "in-progress",
        workshops: [
          {
            id: "ps-maths-tris-classements-atelier1",
            title: "Bacs de couleurs",
            type: "manipulation",
            objective:
              "Placer des objets dans le bac correspondant à leur couleur.",
            status: "in-progress",
          },
        ],
      },
    ],
  },
];
