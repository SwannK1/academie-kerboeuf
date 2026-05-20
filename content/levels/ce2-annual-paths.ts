import type { AnnualLearningPath } from "@/content/learning-architecture-types";

export const ce2AnnualLearningPaths = [
  {
    id: "ce2-ma-calcul-mental-annee",
    slug: "calcul-mental-sur-lannee",
    title: "Calcul mental sur l'année",
    levelSlug: "ce2",
    subject: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "nombres-calcul",
    durationLabel: "Année scolaire",
    weekCount: 30,
    annualObjective:
      "Construire des automatismes de calcul mental courts et explicités.",
    guideCharacter: {
      characterSlug: "esteban",
      name: "Esteban",
    },
    status: "in-progress",
    weeks: [
      {
        week: 1,
        period: "P1",
        title: "Ajouter presque une dizaine",
        focus: "Transformer +9 en +10 puis -1.",
        competencyIds: ["ce2-ma-cm-ajouter-9-19-29"],
        status: "in-progress",
      },
      {
        week: 2,
        period: "P1",
        title: "Étendre la stratégie",
        focus: "Utiliser +19 et +29 avec la même logique.",
        competencyIds: ["ce2-ma-cm-ajouter-9-19-29"],
        status: "upcoming",
      },
    ],
  },
] as const satisfies AnnualLearningPath[];
