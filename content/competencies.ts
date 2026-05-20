import type {
  AcademyLevelSlug,
} from "@/content/program-types";
import type { LearningCompetency } from "@/content/learning-architecture-types";
import { cpCompetencies } from "@/content/levels/cp-competencies";
import { ce1Competencies } from "@/content/levels/ce1-competencies";
import { ce2Competencies } from "@/content/levels/ce2-competencies";
import { cm1Competencies } from "@/content/levels/cm1-competencies";

export type CompetencyLevelSlug = Extract<
  AcademyLevelSlug,
  "cp" | "ce1" | "ce2" | "cm1"
>;

const competenciesByLevel = {
  cp: cpCompetencies,
  ce1: ce1Competencies,
  ce2: ce2Competencies,
  cm1: cm1Competencies,
} as const satisfies Record<CompetencyLevelSlug, readonly LearningCompetency[]>;

export const learningCompetencies = Object.values(competenciesByLevel).flat();

export function getCompetenciesForLevel(levelSlug: string): LearningCompetency[] {
  if (!isCompetencyLevelSlug(levelSlug)) {
    return [];
  }

  return [...competenciesByLevel[levelSlug]];
}

export function getCompetencyById(id: string): LearningCompetency | undefined {
  return learningCompetencies.find((competency) => competency.id === id);
}

function isCompetencyLevelSlug(levelSlug: string): levelSlug is CompetencyLevelSlug {
  return levelSlug === "cp" || levelSlug === "ce1" || levelSlug === "ce2" || levelSlug === "cm1";
}
