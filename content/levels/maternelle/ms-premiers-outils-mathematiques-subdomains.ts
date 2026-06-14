import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const msPremiersOutilsMathematiquesSubdomains: MaternelleSubdomain[] = [
  // ── 1. Nombres et quantités ───────────────────────────────────────────────
  {
    id: "ms-maths-nombres-quantites",
    slug: "nombres-quantites",
    label: "Nombres et quantités",
    description:
      "Dénombrement de petites collections et comparaison concrète de quantités.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-maths-nombres-quantites-seq1",
        title: "Dénombrer une petite quantité",
        objective: "Dénombrer une collection jusqu'à cinq objets.",
        observableSkills: [
          "Dénombre correctement une collection de 1 à 3 objets.",
          "Constitue une collection de 1 à 5 objets sur demande.",
        ],
        periodLabel: "Période 1",
        sessionCount: 5,
        status: "in-progress",
        workshops: [
          {
            id: "ms-maths-nombres-quantites-atelier1",
            title: "Compter et placer",
            type: "manipulation",
            objective:
              "Mettre le nombre demandé d'objets dans un panier et associer la quantité au chiffre.",
            duration: "20 min",
            groupSize: "4-6 élèves",
            materials: [
              "Jetons ou cubes (20 pièces)",
              "Cartes-quantités 1 à 5",
              "Assiettes de tri numérotées",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ms-maths-nombres-quantites-atelier1-grille",
              title: "Grille — Dénombrer une petite quantité (MS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-maths-nombres-1",
                  label: "Dénombre correctement une collection de 1 à 3 objets",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-maths-nombres-2",
                  label: "Constitue une collection de 1 à 5 objets sur demande",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-maths-nombres-3",
                  label:
                    "Associe la quantité au chiffre écrit pour les nombres de 1 à 5",
                  levelDescriptor: "Dépassement MS",
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
    id: "ms-maths-formes-grandeurs",
    slug: "formes-grandeurs",
    label: "Formes et grandeurs",
    description:
      "Reconnaissance de formes simples et comparaison d'objets manipulables.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-maths-formes-grandeurs-seq1",
        title: "Reconnaître et nommer des formes",
        objective:
          "Nommer et distinguer des formes géométriques simples en manipulation.",
        observableSkills: [
          "Reconnaît et nomme cercle, carré et triangle.",
          "Trie des formes selon leur nombre de côtés.",
        ],
        periodLabel: "Période 2",
        sessionCount: 4,
        status: "in-progress",
        workshops: [
          {
            id: "ms-maths-formes-grandeurs-atelier1",
            title: "Le jeu du portrait de formes",
            type: "jeu",
            objective:
              "Retrouver puis nommer une forme simple en la décrivant ou en la désignant.",
            duration: "20 min",
            groupSize: "4-6 élèves",
            materials: [
              "Cartes formes (carré, rectangle, triangle, cercle, losange)",
              "Écran de séparation",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ms-maths-formes-grandeurs-atelier1-grille",
              title: "Grille — Reconnaître et nommer des formes (MS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-maths-formes-1",
                  label: "Reconnaît et nomme cercle, carré et triangle",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-maths-formes-2",
                  label: "Trie des formes selon leur nombre de côtés",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-maths-formes-3",
                  label: "Décrit une forme sans la montrer pour faire deviner",
                  levelDescriptor: "Dépassement MS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
    ],
  },

  // ── 3. Tris et classements ────────────────────────────────────────────────
  {
    id: "ms-maths-tris-suites",
    slug: "tris-classements",
    label: "Tris, classements et suites",
    description:
      "Classements selon deux propriétés simultanées et premières suites répétitives.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-maths-tris-suites-seq1",
        title: "Trier selon deux propriétés",
        objective:
          "Classer des objets selon deux propriétés simultanées dans un tableau.",
        observableSkills: [
          "Trie une collection selon une propriété au choix.",
          "Classe des objets selon deux propriétés simultanées dans un tableau.",
        ],
        periodLabel: "Période 3",
        sessionCount: 4,
        status: "in-progress",
        workshops: [
          {
            id: "ms-maths-tris-suites-atelier1",
            title: "Tableau à double entrée",
            type: "manipulation",
            objective:
              "Placer des objets dans un tableau à double entrée selon deux propriétés.",
            duration: "20 min",
            groupSize: "4-6 élèves",
            materials: [
              "Tableau à double entrée vierge (couleur × taille)",
              "Objets à classer (petits/grands, rouges/bleus)",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ms-maths-tris-suites-atelier1-grille",
              title: "Grille — Trier selon deux propriétés (MS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-maths-tris-1",
                  label: "Trie une collection selon une propriété au choix",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-maths-tris-2",
                  label:
                    "Classe des objets selon deux propriétés simultanées dans un tableau",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-maths-tris-3",
                  label: "Explique la règle de tri utilisée",
                  levelDescriptor: "Dépassement MS",
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
