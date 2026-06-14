import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const gsActivitesArtistiquesSubdomains: MaternelleSubdomain[] = [
  // ── 1. Productions plastiques ─────────────────────────────────────────────
  {
    id: "gs-artistiques-productions-plastiques",
    slug: "productions-plastiques",
    label: "Productions plastiques",
    description:
      "Productions intentionnelles, choix de procédés et enrichissement des gestes.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-artistiques-productions-plastiques-seq1",
        title: "Composer avec plusieurs traces",
        objective:
          "Organiser plusieurs traces pour obtenir une production intentionnelle.",
        observableSkills: [
          "Combine deux techniques ou outils dans une même production.",
          "Organise ses traces en occupant l'espace du support.",
        ],
        periodLabel: "Période 1",
        sessionCount: 5,
        status: "in-progress",
        workshops: [
          {
            id: "gs-artistiques-productions-plastiques-seq1-atelier1",
            title: "Traces organisées",
            type: "manipulation",
            objective:
              "Combiner deux gestes ou outils pour organiser une production.",
            duration: "25 min",
            groupSize: "4-6 élèves",
            materials: [
              "Crayons de couleur et feutres fins",
              "Aquarelle",
              "Feuilles A3",
              "Règle et gabarit pour tracer",
            ],
            status: "in-progress",
            observationGrid: {
              id: "gs-artistiques-productions-plastiques-seq1-atelier1-grille",
              title: "Grille — Composer avec plusieurs traces (GS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-artistiques-plastiques-1",
                  label:
                    "Combine deux techniques ou outils dans une même production",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-artistiques-plastiques-2",
                  label:
                    "Organise ses traces en occupant l'espace du support",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-artistiques-plastiques-3",
                  label:
                    "Explique son choix de composition à un pair",
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

  // ── 2. Voix et écoute ─────────────────────────────────────────────────────
  {
    id: "gs-artistiques-voix-ecoute",
    slug: "voix-ecoute",
    label: "Voix et écoute",
    description:
      "Chants mémorisés, écoute plus précise et ajustement de la voix au groupe.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-artistiques-voix-ecoute-seq1",
        title: "Chanter en respectant un départ",
        objective: "Démarrer un chant avec le groupe au signal donné.",
        observableSkills: [
          "Attend le signal avant de commencer à chanter.",
          "Maintient la justesse d'une phrase sur 4 à 6 mesures.",
        ],
        periodLabel: "Période 2",
        sessionCount: 4,
        status: "in-progress",
        workshops: [
          {
            id: "gs-artistiques-voix-ecoute-seq1-atelier1",
            title: "Départ au signal",
            type: "collectif",
            objective:
              "Attendre le signal puis commencer un chant connu avec le groupe.",
            duration: "20 min",
            groupSize: "Classe entière",
            materials: [
              "Partition illustrée",
              "Baguette de chef de chœur",
              "Signal visuel (lever de main)",
            ],
            status: "in-progress",
            observationGrid: {
              id: "gs-artistiques-voix-ecoute-seq1-atelier1-grille",
              title: "Grille — Chanter en respectant un départ (GS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-artistiques-voix-1",
                  label:
                    "Attend le signal avant de commencer à chanter",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-artistiques-voix-2",
                  label:
                    "Maintient la justesse d'une phrase sur 4 à 6 mesures",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-artistiques-voix-3",
                  label:
                    "Chante un couplet solo ou dirige le départ du groupe",
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

  // ── 3. Regarder les productions ───────────────────────────────────────────
  {
    id: "gs-artistiques-regarder-productions",
    slug: "regarder-productions",
    label: "Regarder les productions",
    description:
      "Observation, comparaison et verbalisation d'éléments visibles dans les productions.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-artistiques-regarder-productions-seq1",
        title: "Décrire un choix artistique",
        objective: "Dire un choix réalisé dans sa production.",
        observableSkills: [
          "Présente sa production en nommant un choix réalisé.",
          "Justifie un choix de couleur ou d'organisation.",
        ],
        periodLabel: "Période 3",
        sessionCount: 3,
        status: "in-progress",
        workshops: [
          {
            id: "gs-artistiques-regarder-productions-seq1-atelier1",
            title: "J'ai choisi",
            type: "collectif",
            objective:
              "Présenter un choix de couleur, d'outil ou d'organisation.",
            duration: "20 min",
            groupSize: "8-10 élèves",
            materials: [
              "Productions personnelles affichées",
              "Post-it de couleur",
              "Stylo feutrable pour noter les mots-clés",
            ],
            status: "in-progress",
            observationGrid: {
              id: "gs-artistiques-regarder-productions-seq1-atelier1-grille",
              title: "Grille — Décrire un choix artistique (GS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-artistiques-regarder-1",
                  label:
                    "Présente sa production en nommant un choix réalisé",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-artistiques-regarder-2",
                  label:
                    "Justifie un choix de couleur ou d'organisation",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-artistiques-regarder-3",
                  label:
                    "Compare sa production à celle d'un pair et note une différence de choix",
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
