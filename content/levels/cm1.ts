// Niveau CM1 — Cycle 3.
// La structure pédagogique active vit dans cm1-curriculum.ts et
// cm1-competencies.ts : matières → domaines → sous-domaines →
// séquences-compétences → séances → slots PDF planned.

import type { AcademyLevelProgram } from "@/content/program-types";

export const cm1Level: AcademyLevelProgram = {
  levelSlug: "cm1",
  label: "CM1",
  cycle: "cycle-3",
  stage: "primaire",
  characterLink: {
    characterSlug: "noisette",
    name: "Noisette",
  },
  domains: [],
};

export function getCm1LessonBySlug(): undefined {
  return undefined;
}
