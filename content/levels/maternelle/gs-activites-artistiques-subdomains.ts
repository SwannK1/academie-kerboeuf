import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const gsActivitesArtistiquesSubdomains: MaternelleSubdomain[] = [
  {
    id: "gs-artistiques-productions-plastiques",
    slug: "productions-plastiques",
    label: "Productions plastiques",
    description:
      "Productions intentionnelles, choix de procédés et enrichissement des gestes.",
    status: "upcoming",
    sequences: [
      {
        id: "gs-artistiques-productions-plastiques-seq1",
        title: "Composer avec plusieurs traces",
        objective: "Organiser plusieurs traces pour obtenir une production intentionnelle.",
        observableSkills: ["Organise plusieurs traces dans une production intentionnelle."],
        status: "upcoming",
        workshops: [
          {
            id: "gs-artistiques-productions-plastiques-atelier1",
            title: "Traces organisées",
            type: "manipulation",
            objective:
              "Combiner deux gestes ou outils pour organiser une production.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
  {
    id: "gs-artistiques-voix-ecoute",
    slug: "voix-ecoute",
    label: "Voix et écoute",
    description:
      "Chants mémorisés, écoute plus précise et ajustement de la voix au groupe.",
    status: "upcoming",
    sequences: [
      {
        id: "gs-artistiques-voix-ecoute-seq1",
        title: "Chanter en respectant un départ",
        objective: "Démarrer un chant avec le groupe au signal donné.",
        observableSkills: ["Démarre un chant avec le groupe au signal donné."],
        status: "upcoming",
        workshops: [
          {
            id: "gs-artistiques-voix-ecoute-atelier1",
            title: "Départ au signal",
            type: "collectif",
            objective:
              "Attendre le signal puis commencer un chant connu avec le groupe.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
  {
    id: "gs-artistiques-regarder-productions",
    slug: "regarder-productions",
    label: "Regarder les productions",
    description:
      "Observation, comparaison et verbalisation d'éléments visibles dans les productions.",
    status: "upcoming",
    sequences: [
      {
        id: "gs-artistiques-regarder-productions-seq1",
        title: "Décrire un choix artistique",
        objective: "Dire un choix réalisé dans sa production.",
        observableSkills: ["Dit un choix réalisé dans sa production."],
        status: "upcoming",
        workshops: [
          {
            id: "gs-artistiques-regarder-productions-atelier1",
            title: "J'ai choisi",
            type: "collectif",
            objective:
              "Présenter un choix de couleur, d'outil ou d'organisation.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
];
