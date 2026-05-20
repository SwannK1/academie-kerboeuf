import type { ProgramStatus } from "@/content/program-types";

export const lyceeLevelSlugs = ["seconde", "premiere", "terminale"] as const;

export type LyceeLevelSlug = (typeof lyceeLevelSlugs)[number];

export const lyceeLevelStatuses: Record<LyceeLevelSlug, ProgramStatus> = {
  seconde: "upcoming",
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
