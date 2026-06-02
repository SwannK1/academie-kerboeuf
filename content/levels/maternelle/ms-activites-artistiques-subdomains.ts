import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const msActivitesArtistiquesSubdomains: MaternelleSubdomain[] = [
  {
    id: "ms-artistiques-productions-plastiques",
    slug: "productions-plastiques",
    label: "Productions plastiques",
    description:
      "Choix d'outils, gestes plus intentionnels et exploration de supports variés.",
    status: "upcoming",
    sequences: [
      {
        id: "ms-artistiques-productions-plastiques-seq1",
        slug: "realiser-une-composition-avec-formes-et-couleurs",
        title: "Réaliser une composition avec formes et couleurs",
        objective:
          "Organiser des formes et des couleurs sur un support avec une intention simple.",
        observableSkills: [
          "Choisit et place des formes ou couleurs pour produire une composition.",
        ],
        status: "upcoming",
        workshops: [
          {
            id: "ms-artistiques-productions-plastiques-atelier1",
            slug: "formes-et-couleurs",
            title: "Formes et couleurs",
            type: "manipulation",
            objective:
              "Assembler des formes découpées et des couleurs choisies sur un support.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
  {
    id: "ms-artistiques-graphisme",
    slug: "graphisme-decoratif",
    label: "Graphisme décoratif",
    description:
      "Premiers rythmes graphiques simples, répétitions de signes et alternances visuelles.",
    status: "upcoming",
    sequences: [
      {
        id: "ms-artistiques-graphisme-seq1",
        slug: "reproduire-un-rythme-graphique-simple",
        title: "Reproduire un rythme graphique simple",
        objective:
          "Reproduire une alternance graphique simple à partir d'un modèle visible.",
        observableSkills: [
          "Poursuit un rythme graphique simple avec deux signes alternés.",
        ],
        status: "upcoming",
        workshops: [
          {
            id: "ms-artistiques-graphisme-atelier1",
            slug: "signes-en-alternance",
            title: "Signes en alternance",
            type: "manipulation",
            objective:
              "Continuer une alternance de deux signes graphiques sur une bande.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
  {
    id: "ms-artistiques-voix-ecoute",
    slug: "voix-ecoute",
    label: "Voix et écoute",
    description:
      "Mémorisation de chants courts, jeux vocaux et écoute attentive.",
    status: "upcoming",
    sequences: [
      {
        id: "ms-artistiques-voix-ecoute-seq1",
        title: "Reprendre un chant court",
        objective: "Reprendre une phrase chantée avec le groupe.",
        observableSkills: ["Reprend une phrase chantée avec le groupe."],
        status: "upcoming",
        workshops: [
          {
            id: "ms-artistiques-voix-ecoute-atelier1",
            title: "Écho chanté",
            type: "collectif",
            objective:
              "Écouter une phrase courte puis la reprendre collectivement.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
  {
    id: "ms-artistiques-regarder-productions",
    slug: "regarder-productions",
    label: "Regarder les productions",
    description:
      "Première description de productions personnelles, collectives ou rencontrées.",
    status: "upcoming",
    sequences: [
      {
        id: "ms-artistiques-regarder-productions-seq1",
        title: "Décrire une production",
        objective: "Nommer un élément visible dans une production.",
        observableSkills: ["Nomme un élément visible dans une production."],
        status: "upcoming",
        workshops: [
          {
            id: "ms-artistiques-regarder-productions-atelier1",
            title: "Je vois une couleur",
            type: "collectif",
            objective:
              "Observer une production et nommer une couleur, une forme ou une trace.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
];
