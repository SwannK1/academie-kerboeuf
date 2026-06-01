// Niveau CE2 - facade legacy.
// La structure canonique CE2 est dans ce2-learning-tree.ts.

import {
  ce2LearningTree,
  getCe2LessonById,
} from "@/content/levels/ce2-learning-tree";
import type { Exercise, Lesson } from "@/content/program-types";

export const ce2Level = ce2LearningTree;

export function getCe2Lesson(lessonSlug: string): Lesson | undefined {
  for (const domain of ce2Level.domains) {
    for (const subdomain of domain.subdomains) {
      const found = subdomain.lessons.find((lesson) => lesson.slug === lessonSlug);
      if (found) return found;
    }
  }
  return undefined;
}

export function getCe2Exercises(lessonSlug: string): Exercise[] {
  return getCe2Lesson(lessonSlug)?.exercises ?? [];
}

export { ce2LearningTree, getCe2LessonById };
