import type { AnnualLearningPath } from "@/content/learning-architecture-types";

export const cm1AnnualLearningPaths = [
  {
    id: "cm1-fr-inferences-annee",
    slug: "inferences-sur-lannee",
    title: "Inférences sur l'année",
    levelSlug: "cm1",
    subject: "Français",
    domainSlug: "francais",
    subdomainSlug: "lecture-comprehension",
    durationLabel: "Année scolaire",
    weekCount: 30,
    annualObjective:
      "Installer une lecture des indices pour comprendre l'implicite progressivement.",
    guideCharacter: {
      characterSlug: "noisette",
      name: "Noisette",
    },
    status: "in-progress",
    weeks: [
      {
        week: 1,
        period: "P1",
        title: "Observer les paroles et actions",
        focus: "Relever les indices visibles avant d'interpréter.",
        competencyIds: ["cm1-fr-lc-intentions-personnage"],
        status: "in-progress",
      },
      {
        week: 2,
        period: "P1",
        title: "Formuler une intention",
        focus: "Dire ce que le personnage cherche probablement à faire.",
        competencyIds: ["cm1-fr-lc-intentions-personnage"],
        status: "upcoming",
      },
    ],
  },
] as const satisfies AnnualLearningPath[];
