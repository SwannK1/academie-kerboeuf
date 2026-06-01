import type {
  MaternelleResourceRef,
  MaternelleSubdomain,
} from "@/content/levels/maternelle/types";

const gsMathsResourceSlots: MaternelleResourceRef[] = [
  {
    kind: "grille-observation",
    label: "Grille d'observation de la compétence",
    status: "upcoming",
  },
  {
    kind: "fiche-atelier",
    label: "Fiche atelier",
    status: "upcoming",
  },
  {
    kind: "support-projetable",
    label: "Support de manipulation projetable",
    status: "upcoming",
  },
];

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
        slug: "composer-decomposer-cinq",
        title: "Composer et décomposer cinq",
        levelSlug: "gs",
        domainSlug: "premiers-outils-mathematiques",
        subdomainSlug: "nombres-quantites",
        description:
          "Séquence-compétence de préparation au CP autour de la construction du nombre.",
        objective: "Composer et décomposer la quantité cinq avec deux collections.",
        periodLabel: "Période 2",
        estimatedDuration: "4 séances × 20 min",
        sessionCount: 4,
        observableSkills: [
          "Compose cinq avec deux collections",
          "Explique une décomposition simple de cinq",
          "Vérifie la quantité obtenue par dénombrement",
        ],
        observationFocus:
          "Observer si l'élève conserve la quantité totale malgré deux parties séparées.",
        status: "upcoming",
        resources: gsMathsResourceSlots,
        workshops: [
          {
            id: "gs-maths-nombres-quantites-atelier1",
            title: "Deux paniers pour faire cinq",
            type: "manipulation",
            objective:
              "Réunir deux collections pour atteindre une quantité demandée.",
            duration: "20 min",
            groupSize: "4-6 élèves",
            materials: ["Deux paniers", "Jetons ou petits objets à dénombrer"],
            status: "upcoming",
            resources: gsMathsResourceSlots,
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
        slug: "decrire-une-forme",
        title: "Décrire une forme pour la faire retrouver",
        levelSlug: "gs",
        domainSlug: "premiers-outils-mathematiques",
        subdomainSlug: "formes-grandeurs",
        description:
          "Séquence-compétence centrée sur le vocabulaire des formes et des propriétés visibles.",
        objective:
          "Décrire une forme simple avec un vocabulaire géométrique adapté.",
        periodLabel: "Période 3",
        estimatedDuration: "3 séances × 20 min",
        sessionCount: 3,
        observableSkills: [
          "Nomme une forme simple",
          "Décrit une propriété visible",
          "Fait retrouver une forme par un indice pertinent",
        ],
        observationFocus:
          "Observer la précision du vocabulaire sans exiger de définition géométrique formelle.",
        status: "upcoming",
        resources: gsMathsResourceSlots,
        workshops: [
          {
            id: "gs-maths-formes-grandeurs-atelier1",
            title: "Portrait de forme",
            type: "jeu",
            objective:
              "Faire retrouver une forme en donnant un indice observable.",
            duration: "15 min",
            groupSize: "4-6 élèves",
            materials: ["Formes planes manipulables", "Sac opaque"],
            status: "upcoming",
            resources: gsMathsResourceSlots,
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
        slug: "reproduire-une-organisation-spatiale",
        title: "Reproduire une organisation spatiale",
        levelSlug: "gs",
        domainSlug: "premiers-outils-mathematiques",
        subdomainSlug: "organisation-espace",
        description:
          "Séquence-compétence centrée sur le repérage de positions et l'organisation d'objets.",
        objective:
          "Reproduire une organisation simple d'objets en respectant les positions relatives.",
        periodLabel: "Période 4",
        estimatedDuration: "4 séances × 20 min",
        sessionCount: 4,
        observableSkills: [
          "Place un objet par rapport à un autre",
          "Reproduit une organisation simple",
          "Utilise un vocabulaire spatial courant",
        ],
        observationFocus:
          "Observer les repères utilisés par l'élève : devant, derrière, entre, à côté.",
        status: "upcoming",
        resources: gsMathsResourceSlots,
        workshops: [
          {
            id: "gs-maths-organisation-espace-atelier1",
            title: "Comme le modèle",
            type: "manipulation",
            objective:
              "Replacer des objets pour obtenir la même organisation qu'un modèle.",
            duration: "20 min",
            groupSize: "4 élèves",
            materials: ["Objets identiques en double", "Cartes modèles simples"],
            status: "upcoming",
            resources: gsMathsResourceSlots,
          },
        ],
      },
    ],
  },
];
