import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const gsPremiersOutilsMathematiquesSubdomains: MaternelleSubdomain[] = [
  // ── 1. Nombres et quantités ───────────────────────────────────────────────
  {
    id: "gs-maths-nombres-quantites",
    slug: "nombres-quantites",
    label: "Nombres et quantités",
    description:
      "Dénombrement, composition de petites quantités et comparaison de collections.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-maths-nombres-quantites-seq1",
        title: "Composer et décomposer une petite quantité",
        objective:
          "Composer une quantité demandée avec deux collections et proposer plusieurs décompositions.",
        observableSkills: [
          "Dénombre correctement une collection jusqu'à 10.",
          "Propose deux décompositions différentes d'une même quantité.",
        ],
        periodLabel: "Période 1",
        sessionCount: 6,
        status: "in-progress",
        workshops: [
          {
            id: "gs-maths-nombres-quantites-seq1-atelier1",
            title: "Deux paniers pour faire cinq",
            type: "manipulation",
            objective:
              "Réunir deux collections pour atteindre une quantité demandée.",
            duration: "25 min",
            groupSize: "4-6 élèves",
            materials: [
              "Réglettes ou cubes emboîtables",
              "Cartes-chiffres 1 à 10",
              "Feuille de jeu à deux paniers",
            ],
            status: "in-progress",
            observationGrid: {
              id: "gs-maths-nombres-quantites-seq1-atelier1-grille",
              title: "Grille — Composer et décomposer une petite quantité (GS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-maths-nombres-1",
                  label:
                    "Dénombre correctement une collection jusqu'à 10",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-maths-nombres-2",
                  label:
                    "Propose deux décompositions différentes d'une même quantité (ex : 5 = 2+3 ou 4+1)",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-maths-nombres-3",
                  label:
                    "Utilise le chiffre écrit pour noter une quantité",
                  levelDescriptor: "Dépassement GS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
    ],
  },

  // ── 2. Formes et grandeurs ────────────────────────────────────────────────
  {
    id: "gs-maths-formes-grandeurs",
    slug: "formes-grandeurs",
    label: "Formes et grandeurs",
    description:
      "Reconnaissance, description et comparaison de formes ou de grandeurs.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-maths-formes-grandeurs-seq1",
        title: "Décrire et comparer des formes",
        objective:
          "Décrire une forme simple avec un vocabulaire spatial et géométrique.",
        observableSkills: [
          "Nomme les formes planes usuelles (carré, rectangle, triangle, cercle).",
          "Décrit une forme en nommant nombre de côtés ou d'angles.",
        ],
        periodLabel: "Période 2",
        sessionCount: 5,
        status: "in-progress",
        workshops: [
          {
            id: "gs-maths-formes-grandeurs-seq1-atelier1",
            title: "Portrait de forme",
            type: "jeu",
            objective:
              "Faire retrouver une forme en donnant un indice observable.",
            duration: "25 min",
            groupSize: "4-6 élèves",
            materials: [
              "Solides géométriques (cube, sphère, cylindre, pavé)",
              "Cartes descripteurs (nombre de faces, coins, côtés)",
              "Écran de séparation",
            ],
            status: "in-progress",
            observationGrid: {
              id: "gs-maths-formes-grandeurs-seq1-atelier1-grille",
              title: "Grille — Décrire et comparer des formes (GS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-maths-formes-1",
                  label:
                    "Nomme les formes planes usuelles (carré, rectangle, triangle, cercle)",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-maths-formes-2",
                  label:
                    "Décrit une forme en nommant nombre de côtés ou d'angles",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-maths-formes-3",
                  label:
                    "Fait deviner un solide en donnant deux caractéristiques sans le montrer",
                  levelDescriptor: "Dépassement GS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
    ],
  },

  // ── 3. Organisation de l'espace ───────────────────────────────────────────
  {
    id: "gs-maths-organisation-espace",
    slug: "organisation-espace",
    label: "Organisation de l'espace",
    description:
      "Repérage, reproduction et organisation de suites ou de positions.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-maths-organisation-espace-seq1",
        title: "Reproduire et coder une organisation",
        objective:
          "Reproduire une organisation simple d'objets et en produire un codage.",
        observableSkills: [
          "Reproduit fidèlement l'organisation d'un modèle sur le plateau.",
          "Utilise des mots de position (devant, derrière, à gauche, à droite).",
        ],
        periodLabel: "Période 3",
        sessionCount: 5,
        status: "in-progress",
        workshops: [
          {
            id: "gs-maths-organisation-espace-seq1-atelier1",
            title: "Comme le modèle",
            type: "manipulation",
            objective:
              "Replacer des objets pour obtenir la même organisation qu'un modèle.",
            duration: "25 min",
            groupSize: "4-6 élèves",
            materials: [
              "Plateau quadrillé 5×5",
              "Objets colorés à placer",
              "Cartes modèles à reproduire",
              "Fiche de codage vierge",
            ],
            status: "in-progress",
            observationGrid: {
              id: "gs-maths-organisation-espace-seq1-atelier1-grille",
              title: "Grille — Reproduire et coder une organisation (GS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-maths-espace-1",
                  label:
                    "Reproduit fidèlement l'organisation d'un modèle sur le plateau",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-maths-espace-2",
                  label:
                    "Utilise des mots de position (devant, derrière, à gauche, à droite)",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-maths-espace-3",
                  label:
                    "Code une organisation sous forme de plan ou de dessin",
                  levelDescriptor: "Dépassement GS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
    ],
  },
];
