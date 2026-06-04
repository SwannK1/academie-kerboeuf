import type { LyceeSubject } from "@/content/lycee-curriculum";

export const premiereMethodologieSubjects: LyceeSubject[] = [
  {
    id: "histoire-geographie-premiere",
    slug: "histoire-geographie",
    title: "Histoire-Géographie",
    status: "upcoming",
    domains: [
      {
        id: "documents-composition",
        slug: "documents-composition",
        title: "Documents et composition",
        status: "upcoming",
        subdomains: [
          {
            id: "methode-documents",
            slug: "methode-documents",
            title: "Méthode — Étude de documents",
            status: "upcoming",
            sequences: [
              {
                id: "contextualiser-document",
                slug: "contextualiser-document",
                title: "Contextualiser un document",
                status: "upcoming",
              },
              {
                id: "confronter-deux-documents",
                slug: "confronter-deux-documents",
                title: "Confronter deux documents",
                status: "upcoming",
              },
              {
                id: "construire-reponse-organisee",
                slug: "construire-reponse-organisee",
                title: "Construire une réponse organisée à partir de documents",
                status: "upcoming",
              },
            ],
          },
          {
            id: "composition-hg",
            slug: "composition-hg",
            title: "Méthode — Composition",
            status: "upcoming",
            sequences: [
              {
                id: "elaborer-plan-composition-hg",
                slug: "elaborer-plan-composition-hg",
                title: "Élaborer un plan de composition en HG",
                status: "upcoming",
              },
              {
                id: "rediger-introduction-hg",
                slug: "rediger-introduction-hg",
                title: "Rédiger une introduction en HG",
                status: "upcoming",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "emc-premiere",
    slug: "emc",
    title: "EMC",
    status: "upcoming",
    domains: [
      {
        id: "societe-democratique",
        slug: "societe-democratique",
        title: "Société démocratique",
        status: "upcoming",
        subdomains: [
          {
            id: "engagement",
            slug: "engagement",
            title: "Engagement",
            status: "upcoming",
            sequences: [
              {
                id: "analyser-forme-engagement",
                slug: "analyser-forme-engagement",
                title: "Analyser une forme d'engagement",
                status: "upcoming",
              },
              {
                id: "distinguer-droits-devoirs-citoyens",
                slug: "distinguer-droits-devoirs-citoyens",
                title: "Distinguer droits et devoirs des citoyens",
                status: "upcoming",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "langues-vivantes-premiere",
    slug: "langues-vivantes",
    title: "Langues vivantes",
    status: "upcoming",
    domains: [
      {
        id: "communication",
        slug: "communication",
        title: "Communication",
        status: "upcoming",
        subdomains: [
          {
            id: "argumentation-lv",
            slug: "argumentation-lv",
            title: "Argumentation",
            status: "upcoming",
            sequences: [
              {
                id: "defendre-point-de-vue-langue-vivante",
                slug: "defendre-point-de-vue-langue-vivante",
                title: "Défendre un point de vue en langue vivante",
                status: "upcoming",
              },
              {
                id: "comprendre-document-authentique-complexe",
                slug: "comprendre-document-authentique-complexe",
                title: "Comprendre un document authentique complexe",
                status: "upcoming",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "eps-premiere",
    slug: "eps",
    title: "EPS",
    status: "upcoming",
    domains: [
      {
        id: "autonomie",
        slug: "autonomie",
        title: "Autonomie et projet",
        status: "upcoming",
        subdomains: [
          {
            id: "entrainement",
            slug: "entrainement",
            title: "Entraînement",
            status: "upcoming",
            sequences: [
              {
                id: "construire-projet-entrainement",
                slug: "construire-projet-entrainement",
                title: "Construire un projet d'entraînement",
                status: "upcoming",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "mathematiques-specialite-premiere",
    slug: "mathematiques-specialite",
    title: "Mathématiques (spécialité)",
    status: "upcoming",
    domains: [
      {
        id: "algebre-analyse",
        slug: "algebre-analyse",
        title: "Algèbre et analyse",
        status: "upcoming",
        subdomains: [
          {
            id: "fonctions-suites",
            slug: "fonctions-suites",
            title: "Fonctions et suites",
            status: "upcoming",
            sequences: [
              {
                id: "etudier-variations-fonction",
                slug: "etudier-variations-fonction",
                title: "Étudier les variations d'une fonction",
                status: "upcoming",
              },
              {
                id: "modeliser-situation-suite",
                slug: "modeliser-situation-suite",
                title: "Modéliser une situation par une suite",
                status: "upcoming",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "sciences-specialite-premiere",
    slug: "sciences-specialite",
    title: "Sciences (spécialité)",
    status: "upcoming",
    domains: [
      {
        id: "specialites-scientifiques-premiere",
        slug: "specialites-scientifiques",
        title: "Spécialités scientifiques",
        status: "upcoming",
        subdomains: [
          {
            id: "physique-chimie-svt-premiere",
            slug: "physique-chimie-svt",
            title: "Physique-Chimie et SVT",
            status: "upcoming",
            sequences: [
              {
                id: "exploiter-protocole-experimental",
                slug: "exploiter-protocole-experimental",
                title: "Exploiter un protocole expérimental",
                status: "upcoming",
              },
              {
                id: "argumenter-donnees-scientifiques",
                slug: "argumenter-donnees-scientifiques",
                title: "Argumenter à partir de données scientifiques",
                status: "upcoming",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "humanites-sciences-sociales-premiere",
    slug: "humanites-sciences-sociales",
    title: "Humanités et sciences sociales (spécialité)",
    status: "upcoming",
    domains: [
      {
        id: "specialites-humanites",
        slug: "specialites-humanites",
        title: "Spécialités humanités",
        status: "upcoming",
        subdomains: [
          {
            id: "ses-hggsp",
            slug: "ses-hggsp",
            title: "SES et HGGSP",
            status: "upcoming",
            sequences: [
              {
                id: "expliquer-mecanisme-economique-social",
                slug: "expliquer-mecanisme-economique-social",
                title: "Expliquer un mécanisme économique ou social",
                status: "upcoming",
              },
              {
                id: "analyser-enjeu-geopolitique",
                slug: "analyser-enjeu-geopolitique",
                title: "Analyser un enjeu géopolitique",
                status: "upcoming",
              },
            ],
          },
        ],
      },
    ],
  },
];
