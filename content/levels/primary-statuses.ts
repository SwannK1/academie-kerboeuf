import type { ProgramStatus } from "@/content/program-types";

export const primaryLevelSlugs = ["cp", "ce1", "ce2", "cm1", "cm2"] as const;

export type PrimaryLevelSlug = (typeof primaryLevelSlugs)[number];

export const primaryLevelStatuses: Record<PrimaryLevelSlug, ProgramStatus> = {
  cp: "partial",
  ce1: "partial",
  ce2: "partial",
  cm1: "in-progress",
  cm2: "available",
};

export const defaultPrimaryLevelStatus: ProgramStatus = "upcoming";

export function isPrimaryLevelSlug(levelSlug: string): levelSlug is PrimaryLevelSlug {
  return (primaryLevelSlugs as readonly string[]).includes(levelSlug);
}

export function getPrimaryLevelStatus(levelSlug: string): ProgramStatus {
  if (!isPrimaryLevelSlug(levelSlug)) return defaultPrimaryLevelStatus;
  return primaryLevelStatuses[levelSlug];
}
