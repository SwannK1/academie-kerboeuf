import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const msActivitesArtistiquesSubdomains: MaternelleSubdomain[] = [
  // ── 1. Productions plastiques ─────────────────────────────────────────────
  {
    id: "ms-artistiques-productions-plastiques",
    slug: "productions-plastiques",
    label: "Productions plastiques",
    description:
      "Choix d'outils, gestes plus intentionnels et exploration de supports variés.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-artistiques-productions-plastiques-seq1",
        title: "Produire une trace avec une intention",
        objective: "Choisir un outil pour produire une trace attendue.",
        observableSkills: [
          "Choisit un outil parmi plusieurs proposés.",
          "Produit une trace reconnaissable avec l'outil choisi.",
        ],
        periodLabel: "Période 1",
        sessionCount: 4,
        status: "in-progress",
        workshops: [
          {
            id: "ms-artistiques-productions-plastiques-atelier1",
            title: "Outils et chemins",
            type: "manipulation",
            objective:
              "Utiliser un outil choisi pour tracer un chemin visible sur un support.",
            duration: "20 min",
            groupSize: "4-6 élèves",
            materials: [
              "Pinceaux de différentes tailles",
              "Rouleaux",
              "Éponges",
              "Feuilles A2",
              "Peinture liquide",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ms-artistiques-productions-plastiques-atelier1-grille",
              title: "Grille — Produire une trace avec une intention (MS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-artistiques-plastiques-1",
                  label: "Choisit un outil parmi plusieurs proposés",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-artistiques-plastiques-2",
                  label: "Produit une trace reconnaissable avec l'outil choisi",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-artistiques-plastiques-3",
                  label: "Explique son choix d'outil avec un mot",
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

  // ── 2. Voix et écoute ─────────────────────────────────────────────────────
  {
    id: "ms-artistiques-voix-ecoute",
    slug: "voix-ecoute",
    label: "Voix et écoute",
    description:
      "Mémorisation de chants courts, jeux vocaux et écoute attentive.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-artistiques-voix-ecoute-seq1",
        title: "Reprendre un chant court",
        objective: "Reprendre une phrase chantée avec le groupe.",
        observableSkills: [
          "Écoute la phrase chantée sans la recouvrir de sa voix.",
          "Reprend la phrase chantée avec le groupe en écho.",
        ],
        periodLabel: "Période 2",
        sessionCount: 4,
        status: "in-progress",
        workshops: [
          {
            id: "ms-artistiques-voix-ecoute-atelier1",
            title: "Écho chanté",
            type: "collectif",
            objective:
              "Écouter une phrase courte puis la reprendre collectivement.",
            duration: "15 min",
            groupSize: "Classe entière",
            materials: [
              "Partition illustrée du chant",
              "Instrument de référence (xylophone ou tambourin)",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ms-artistiques-voix-ecoute-atelier1-grille",
              title: "Grille — Reprendre un chant court (MS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-artistiques-voix-1",
                  label: "Écoute la phrase chantée sans la recouvrir de sa voix",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-artistiques-voix-2",
                  label: "Reprend la phrase chantée avec le groupe en écho",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-artistiques-voix-3",
                  label: "Reprend la phrase seul ou en duo sur invitation",
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

  // ── 3. Regarder les productions ───────────────────────────────────────────
  {
    id: "ms-artistiques-regarder-productions",
    slug: "regarder-productions",
    label: "Regarder les productions",
    description:
      "Première description de productions personnelles, collectives ou rencontrées.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-artistiques-regarder-productions-seq1",
        title: "Décrire une production",
        objective: "Nommer un élément visible dans une production.",
        observableSkills: [
          "Pointe un élément visible dans une production.",
          "Nomme une couleur, une forme ou une trace observée.",
        ],
        periodLabel: "Période 3",
        sessionCount: 3,
        status: "in-progress",
        workshops: [
          {
            id: "ms-artistiques-regarder-productions-atelier1",
            title: "Je vois une couleur",
            type: "collectif",
            objective:
              "Observer une production et nommer une couleur, une forme ou une trace.",
            duration: "15 min",
            groupSize: "8-10 élèves",
            materials: [
              "Productions plastiques affichées (de la classe et d'un album)",
              "Étiquettes-couleurs",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ms-artistiques-regarder-productions-atelier1-grille",
              title: "Grille — Décrire une production (MS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-artistiques-regarder-1",
                  label: "Pointe un élément visible dans une production",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-artistiques-regarder-2",
                  label: "Nomme une couleur, une forme ou une trace observée",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-artistiques-regarder-3",
                  label: "Compare deux productions en nommant une différence",
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
