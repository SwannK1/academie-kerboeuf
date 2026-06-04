import type { LyceeSubject } from "@/content/lycee-curriculum";

export const terminaleMethodologieBacSubjects: LyceeSubject[] = [
  {
    id: "histoire-geographie-terminale",
    slug: "histoire-geographie",
    title: "Histoire-Géographie",
    status: "upcoming",
    domains: [
      {
        id: "composition-bac",
        slug: "composition-bac",
        title: "Composition — bac terminal",
        status: "upcoming",
        subdomains: [
          {
            id: "problematique-plan-terminale",
            slug: "problematique-plan",
            title: "Problématique et plan",
            status: "upcoming",
            sequences: [
              {
                id: "elaborer-plan-composition",
                slug: "elaborer-plan-composition",
                title: "Élaborer un plan de composition",
                status: "upcoming",
              },
              {
                id: "rediger-conclusion-composition",
                slug: "rediger-conclusion-composition",
                title: "Rédiger une conclusion de composition",
                status: "upcoming",
              },
            ],
          },
          {
            id: "analyse-critique-documents",
            slug: "analyse-critique-documents",
            title: "Analyse critique de documents",
            status: "upcoming",
            sequences: [
              {
                id: "critiquer-document-historique",
                slug: "critiquer-document-historique",
                title: "Critiquer un document historique",
                status: "upcoming",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "emc-terminale",
    slug: "emc",
    title: "EMC",
    status: "upcoming",
    domains: [
      {
        id: "republique-citoyennete",
        slug: "republique-citoyennete",
        title: "République et citoyenneté",
        status: "upcoming",
        subdomains: [
          {
            id: "deliberation",
            slug: "deliberation",
            title: "Délibération",
            status: "upcoming",
            sequences: [
              {
                id: "argumenter-deliberation-citoyenne",
                slug: "argumenter-deliberation-citoyenne",
                title: "Argumenter dans une délibération citoyenne",
                status: "upcoming",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "langues-vivantes-terminale",
    slug: "langues-vivantes",
    title: "Langues vivantes",
    status: "upcoming",
    domains: [
      {
        id: "expression-avancee",
        slug: "expression-avancee",
        title: "Expression avancée",
        status: "upcoming",
        subdomains: [
          {
            id: "oral-terminale",
            slug: "oral",
            title: "Oral",
            status: "upcoming",
            sequences: [
              {
                id: "presenter-idee-complexe-langue-vivante",
                slug: "presenter-idee-complexe-langue-vivante",
                title: "Présenter une idée complexe en langue vivante",
                status: "upcoming",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "eps-terminale",
    slug: "eps",
    title: "EPS",
    status: "upcoming",
    domains: [
      {
        id: "projet-personnel",
        slug: "projet-personnel",
        title: "Projet personnel",
        status: "upcoming",
        subdomains: [
          {
            id: "performance-terminale",
            slug: "performance",
            title: "Performance",
            status: "upcoming",
            sequences: [
              {
                id: "analyser-performance-progresser",
                slug: "analyser-performance-progresser",
                title: "Analyser sa performance pour progresser",
                status: "upcoming",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "mathematiques-specialite-terminale",
    slug: "mathematiques-specialite",
    title: "Mathématiques (spécialité)",
    status: "upcoming",
    domains: [
      {
        id: "analyse-probabilites",
        slug: "analyse-probabilites",
        title: "Analyse et probabilités",
        status: "upcoming",
        subdomains: [
          {
            id: "limites-lois",
            slug: "limites-lois",
            title: "Limites et lois",
            status: "upcoming",
            sequences: [
              {
                id: "etudier-limite-fonction",
                slug: "etudier-limite-fonction",
                title: "Étudier une limite de fonction",
                status: "upcoming",
              },
              {
                id: "utiliser-loi-probabilite",
                slug: "utiliser-loi-probabilite",
                title: "Utiliser une loi de probabilité",
                status: "upcoming",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "sciences-specialite-terminale",
    slug: "sciences-specialite",
    title: "Sciences (spécialité)",
    status: "upcoming",
    domains: [
      {
        id: "specialites-scientifiques-terminale",
        slug: "specialites-scientifiques",
        title: "Spécialités scientifiques",
        status: "upcoming",
        subdomains: [
          {
            id: "physique-chimie-svt-terminale",
            slug: "physique-chimie-svt",
            title: "Physique-Chimie et SVT",
            status: "upcoming",
            sequences: [
              {
                id: "modeliser-transformation-scientifique",
                slug: "modeliser-transformation-scientifique",
                title: "Modéliser une transformation physique ou chimique",
                status: "upcoming",
              },
              {
                id: "resoudre-probleme-scientifique-argumente",
                slug: "resoudre-probleme-scientifique-argumente",
                title: "Résoudre un problème scientifique argumenté",
                status: "upcoming",
              },
            ],
          },
        ],
      },
    ],
  },
];
