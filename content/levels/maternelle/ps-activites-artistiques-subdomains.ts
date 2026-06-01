import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const psActivitesArtistiquesSubdomains: MaternelleSubdomain[] = [
  {
    id: "ps-artistiques-productions-plastiques",
    slug: "productions-plastiques",
    label: "Productions plastiques",
    description:
      "Découverte des traces, des outils et des matières par manipulation.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-artistiques-productions-plastiques-seq1",
        title: "Explorer une trace avec un outil",
        objective: "Laisser volontairement une trace avec un outil simple sur un support.",
        observableSkills: ["Laisse volontairement une trace avec un outil simple."],
        status: "in-progress",
        workshops: [
          {
            id: "ps-artistiques-productions-plastiques-atelier1",
            title: "Tampons et grandes feuilles",
            type: "manipulation",
            objective:
              "Appuyer un tampon ou un outil large pour produire une trace visible.",
            status: "in-progress",
          },
        ],
      },
    ],
  },
  {
    id: "ps-artistiques-voix-ecoute",
    slug: "voix-ecoute",
    label: "Voix et écoute",
    description:
      "Participation aux comptines, aux jeux vocaux et aux écoutes très courtes.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-artistiques-voix-ecoute-seq1",
        title: "Participer à une comptine collective",
        objective: "Dire ou chanter un fragment de comptine avec le groupe.",
        observableSkills: ["Participe à une comptine avec le groupe."],
        status: "in-progress",
        workshops: [
          {
            id: "ps-artistiques-voix-ecoute-atelier1",
            title: "La comptine des gestes",
            type: "collectif",
            objective:
              "Associer sa voix ou un geste à une comptine courte reprise en groupe.",
            status: "in-progress",
          },
        ],
      },
    ],
  },
  {
    id: "ps-artistiques-regarder-productions",
    slug: "regarder-productions",
    label: "Regarder les productions",
    description:
      "Premiers regards sur les productions de la classe et verbalisation simple.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-artistiques-regarder-productions-seq1",
        title: "Montrer une production",
        objective: "Montrer une production personnelle ou collective lors d'un court échange.",
        observableSkills: ["Montre une production lors d'un échange court."],
        status: "in-progress",
        workshops: [
          {
            id: "ps-artistiques-regarder-productions-atelier1",
            title: "La galerie de la classe",
            type: "collectif",
            objective:
              "Choisir une production affichée et la montrer au groupe.",
            status: "in-progress",
          },
        ],
      },
    ],
  },
];
