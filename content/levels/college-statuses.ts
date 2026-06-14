import type { ProgramStatus } from "@/content/program-types";

export const collegeLevelSlugs = ["6e", "5e", "4e", "3e"] as const;

export type CollegeLevelSlug = (typeof collegeLevelSlugs)[number];

export const collegeLevelStatuses: Record<CollegeLevelSlug, ProgramStatus> = {
  "6e": "in-progress",
  "5e": "upcoming",
  "4e": "upcoming",
  "3e": "upcoming",
};

export const defaultCollegeLevelStatus: ProgramStatus = "upcoming";

export function isCollegeLevelSlug(levelSlug: string): levelSlug is CollegeLevelSlug {
  return (collegeLevelSlugs as readonly string[]).includes(levelSlug);
}

export function getCollegeLevelStatus(levelSlug: string): ProgramStatus {
  if (!isCollegeLevelSlug(levelSlug)) return defaultCollegeLevelStatus;
  return collegeLevelStatuses[levelSlug];
}
