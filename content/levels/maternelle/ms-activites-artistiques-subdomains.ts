import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";
import { maternelleCommonResourceSlots as commonResourceSlots } from "@/content/levels/maternelle/common-resource-slots";

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
        title: "Produire une trace avec une intention",
        objective: "Choisir un outil pour produire une trace attendue.",
        observableSkills: ["Choisit un outil pour produire une trace attendue."],
        sessionCount: 3,
        status: "upcoming",
        resources: commonResourceSlots,
        workshops: [
          {
            id: "ms-artistiques-productions-plastiques-atelier1",
            title: "Outils et chemins",
            type: "manipulation",
            objective:
              "Utiliser un outil choisi pour tracer un chemin visible sur un support.",
            status: "upcoming",
            resources: commonResourceSlots,
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
        sessionCount: 3,
        status: "upcoming",
        resources: commonResourceSlots,
        workshops: [
          {
            id: "ms-artistiques-voix-ecoute-atelier1",
            title: "Écho chanté",
            type: "collectif",
            objective:
              "Écouter une phrase courte puis la reprendre collectivement.",
            status: "upcoming",
            resources: commonResourceSlots,
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
        sessionCount: 3,
        status: "upcoming",
        resources: commonResourceSlots,
        workshops: [
          {
            id: "ms-artistiques-regarder-productions-atelier1",
            title: "Je vois une couleur",
            type: "collectif",
            objective:
              "Observer une production et nommer une couleur, une forme ou une trace.",
            status: "upcoming",
            resources: commonResourceSlots,
          },
        ],
      },
    ],
  },
];
