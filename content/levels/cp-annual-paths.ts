import type { AnnualLearningPath } from "@/content/learning-architecture-types";

export const cpAnnualLearningPaths = [
  {
    id: "cp-fr-lecture-phrases-annee",
    slug: "lecture-de-phrases-sur-lannee",
    title: "Lecture de phrases sur l'année",
    levelSlug: "cp",
    subject: "Français",
    domainSlug: "francais",
    subdomainSlug: "lecture-comprehension",
    durationLabel: "Année scolaire",
    weekCount: 30,
    annualObjective:
      "Installer progressivement les premiers réflexes de compréhension de phrase.",
    guideCharacter: {
      characterSlug: "kiwi",
      name: "Kiwi",
    },
    status: "in-progress",
    weeks: [
      {
        week: 1,
        period: "P1",
        title: "Lire une phrase courte",
        focus: "Repérer le personnage ou l'objet important.",
        competencyIds: ["cp-fr-lc-comprendre-phrase-simple"],
        status: "in-progress",
      },
      {
        week: 2,
        period: "P1",
        title: "Dire qui fait quoi",
        focus: "Associer le personnage et l'action.",
        competencyIds: ["cp-fr-lc-comprendre-phrase-simple"],
        status: "upcoming",
      },
    ],
  },
] as const satisfies AnnualLearningPath[];
