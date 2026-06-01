// Façade de compatibilité CE2.
// La source canonique est ce2-learning-tree : statuts upcoming, slots PDF planned,
// aucun href de ressource et aucun contenu pédagogique détaillé.

import {
  ce2LearningTree,
  getCe2Lesson as getCe2CatalogLesson,
} from "@/content/levels/ce2-learning-tree";
import type { Exercise, Lesson } from "@/content/program-types";

export const ce2Level = ce2LearningTree;

export function getCe2Lesson(lessonSlug: string): Lesson | undefined {
  for (const domain of ce2Level.domains) {
    for (const subdomain of domain.subdomains) {
      const found = getCe2CatalogLesson(
        domain.slug,
        subdomain.slug,
        lessonSlug,
      );
      if (found) return found;
    }
  }
  return undefined;
}

export function getCe2Exercises(lessonSlug: string): Exercise[] {
  return getCe2Lesson(lessonSlug)?.exercises ?? [];
}
