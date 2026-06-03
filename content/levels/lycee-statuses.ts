import type { ProgramStatus } from "@/content/program-types";

export const lyceeLevelSlugs = ["seconde", "premiere", "terminale"] as const;

export type LyceeLevelSlug = (typeof lyceeLevelSlugs)[number];

// Critère d'évolution : passer à "available" quand domaines, compétences et
// ressources PDF sont publiés. Passer de "upcoming" à "in-progress" quand la
// route de missions est ouverte au public.
export const lyceeLevelStatuses: Record<LyceeLevelSlug, ProgramStatus> = {
  seconde: "in-progress", // missions live — route /lycee/seconde/missions accessible
  premiere: "upcoming",
  terminale: "upcoming",
};

export const defaultLyceeLevelStatus: ProgramStatus = "upcoming";

export function isLyceeLevelSlug(levelSlug: string): levelSlug is LyceeLevelSlug {
  return (lyceeLevelSlugs as readonly string[]).includes(levelSlug);
}

export function getLyceeLevelStatus(levelSlug: string): ProgramStatus {
  if (!isLyceeLevelSlug(levelSlug)) return defaultLyceeLevelStatus;
  return lyceeLevelStatuses[levelSlug];
}
