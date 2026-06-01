import type {
  MaternelleResourceRef,
  MaternelleSubdomain,
} from "@/content/levels/maternelle/types";

const gsArtsResourceSlots: MaternelleResourceRef[] = [
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
    label: "Support de présentation projetable",
    status: "upcoming",
  },
];

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
        slug: "composer-avec-plusieurs-traces",
        title: "Composer avec plusieurs traces",
        levelSlug: "gs",
        domainSlug: "activites-artistiques",
        subdomainSlug: "productions-plastiques",
        description:
          "Séquence-compétence centrée sur l'organisation intentionnelle d'une production.",
        objective: "Organiser plusieurs traces pour obtenir une production intentionnelle.",
        periodLabel: "Période 2",
        estimatedDuration: "3 ateliers × 25 min",
        sessionCount: 3,
        observableSkills: [
          "Choisit deux gestes ou outils",
          "Organise plusieurs traces dans l'espace",
          "Dit une intention simple liée à sa production",
        ],
        observationFocus:
          "Observer l'intention et l'organisation sans détailler le procédé plastique.",
        status: "upcoming",
        resources: gsArtsResourceSlots,
        workshops: [
          {
            id: "gs-artistiques-productions-plastiques-atelier1",
            title: "Traces organisées",
            type: "manipulation",
            objective:
              "Combiner deux gestes ou outils pour organiser une production.",
            duration: "25 min",
            groupSize: "6 élèves",
            materials: ["Outils traceurs variés", "Supports papier"],
            status: "upcoming",
            resources: gsArtsResourceSlots,
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
        slug: "chanter-en-respectant-un-depart",
        title: "Chanter en respectant un départ",
        levelSlug: "gs",
        domainSlug: "activites-artistiques",
        subdomainSlug: "voix-ecoute",
        description:
          "Séquence-compétence centrée sur l'écoute du signal et l'ajustement au groupe.",
        objective: "Démarrer un chant avec le groupe au signal donné.",
        periodLabel: "Période 1",
        estimatedDuration: "3 séances × 15 min",
        sessionCount: 3,
        observableSkills: [
          "Attend le signal de départ",
          "Démarre avec le groupe",
          "Maintient sa voix dans le chant collectif",
        ],
        observationFocus:
          "Observer l'écoute du signal et l'ajustement au groupe, pas la performance vocale.",
        status: "upcoming",
        resources: gsArtsResourceSlots,
        workshops: [
          {
            id: "gs-artistiques-voix-ecoute-atelier1",
            title: "Départ au signal",
            type: "collectif",
            objective:
              "Attendre le signal puis commencer un chant connu avec le groupe.",
            duration: "15 min",
            groupSize: "Groupe classe",
            materials: ["Chant connu", "Signal visuel ou sonore"],
            status: "upcoming",
            resources: gsArtsResourceSlots,
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
        slug: "decrire-un-choix-artistique",
        title: "Décrire un choix artistique",
        levelSlug: "gs",
        domainSlug: "activites-artistiques",
        subdomainSlug: "regarder-productions",
        description:
          "Séquence-compétence centrée sur la verbalisation d'un choix visible.",
        objective: "Dire un choix réalisé dans sa production.",
        periodLabel: "Période 4",
        estimatedDuration: "2 ateliers × 20 min",
        sessionCount: 2,
        observableSkills: [
          "Montre un élément de sa production",
          "Nomme un choix de couleur, d'outil ou d'organisation",
          "Écoute un choix formulé par un camarade",
        ],
        observationFocus:
          "Observer la capacité à nommer un choix personnel en phrase courte.",
        status: "upcoming",
        resources: gsArtsResourceSlots,
        workshops: [
          {
            id: "gs-artistiques-regarder-productions-atelier1",
            title: "J'ai choisi",
            type: "collectif",
            objective:
              "Présenter un choix de couleur, d'outil ou d'organisation.",
            duration: "20 min",
            groupSize: "6-8 élèves",
            materials: ["Productions des élèves"],
            status: "upcoming",
            resources: gsArtsResourceSlots,
          },
        ],
      },
    ],
  },
];
