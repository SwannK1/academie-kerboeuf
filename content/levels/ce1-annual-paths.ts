import type { AnnualLearningPath } from "@/content/learning-architecture-types";

export const ce1AnnualLearningPaths = [
  {
    id: "ce1-fr-phrases-annee",
    slug: "phrases-sur-lannee",
    title: "Phrases sur l'année",
    levelSlug: "ce1",
    subject: "Français",
    domainSlug: "francais",
    subdomainSlug: "etude-de-la-langue",
    durationLabel: "Année scolaire",
    weekCount: 30,
    annualObjective:
      "Ritualiser l'observation de phrases correctes et de groupes de mots.",
    guideCharacter: {
      characterSlug: "gaston",
      name: "Gaston",
    },
    status: "in-progress",
    weeks: [
      {
        week: 1,
        period: "P1",
        title: "Repérer une phrase",
        focus: "Vérifier le sens, la majuscule et la ponctuation.",
        competencyIds: ["ce1-fr-edl-reconnaitre-phrase"],
        status: "in-progress",
      },
      {
        week: 2,
        period: "P1",
        title: "Classer phrase ou non-phrase",
        focus: "Justifier avec un critère simple.",
        competencyIds: ["ce1-fr-edl-reconnaitre-phrase"],
        status: "upcoming",
      },
    ],
  },
] as const satisfies AnnualLearningPath[];
