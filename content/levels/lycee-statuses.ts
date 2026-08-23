import type { PublicStatusKey } from "@/content/public-status";

export const lyceeLevelSlugs = ["seconde", "premiere", "terminale"] as const;

export type LyceeLevelSlug = (typeof lyceeLevelSlugs)[number];

// Critère d'évolution : passer à "available" quand domaines, compétences et
// ressources PDF sont publiés. Passer de "upcoming" à "in-progress" quand la
// route de missions est ouverte au public.
export const lyceeLevelStatuses: Record<LyceeLevelSlug, PublicStatusKey> = {
  seconde: "in-progress", // route ouverte, contenus de classe encore en préparation
  premiere: "upcoming",
  terminale: "upcoming",
};

export const defaultLyceeLevelStatus: PublicStatusKey = "upcoming";

export function isLyceeLevelSlug(levelSlug: string): levelSlug is LyceeLevelSlug {
  return (lyceeLevelSlugs as readonly string[]).includes(levelSlug);
}

export function getLyceeLevelStatus(levelSlug: string): PublicStatusKey {
  if (!isLyceeLevelSlug(levelSlug)) return defaultLyceeLevelStatus;
  return lyceeLevelStatuses[levelSlug];
}
