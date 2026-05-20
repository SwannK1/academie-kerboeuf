import type {
  AcademyLevelSlug,
} from "@/content/program-types";
import type { AnnualLearningPath } from "@/content/learning-architecture-types";
import { cpAnnualLearningPaths } from "@/content/levels/cp-annual-paths";
import { ce1AnnualLearningPaths } from "@/content/levels/ce1-annual-paths";
import { ce2AnnualLearningPaths } from "@/content/levels/ce2-annual-paths";
import { cm1AnnualLearningPaths } from "@/content/levels/cm1-annual-paths";

export type AnnualPathLevelSlug = Extract<
  AcademyLevelSlug,
  "cp" | "ce1" | "ce2" | "cm1"
>;

const annualPathsByLevel = {
  cp: cpAnnualLearningPaths,
  ce1: ce1AnnualLearningPaths,
  ce2: ce2AnnualLearningPaths,
  cm1: cm1AnnualLearningPaths,
} as const satisfies Record<AnnualPathLevelSlug, readonly AnnualLearningPath[]>;

export const annualLearningPaths = Object.values(annualPathsByLevel).flat();

export function getAnnualPathsForLevel(levelSlug: string): AnnualLearningPath[] {
  if (!isAnnualPathLevelSlug(levelSlug)) {
    return [];
  }

  return [...annualPathsByLevel[levelSlug]];
}

export function getAnnualPathBySlug(
  levelSlug: string,
  slug: string,
): AnnualLearningPath | undefined {
  return getAnnualPathsForLevel(levelSlug).find((path) => path.slug === slug);
}

function isAnnualPathLevelSlug(levelSlug: string): levelSlug is AnnualPathLevelSlug {
  return levelSlug === "cp" || levelSlug === "ce1" || levelSlug === "ce2" || levelSlug === "cm1";
}
