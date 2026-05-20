// Registre des cartographies de programme par niveau — type CurriculumMap (ancien).
// ⚠️  PORTÉE LIMITÉE : seul le CP dispose d'un fichier cp-curriculum-map.ts.
//     CE1, CE2 et CM1 utilisent le type enrichi CurriculumLevelMap via curriculum-map.ts.
// ⚠️  NE PAS ÉTENDRE pour le collège ou le lycée.
//     Utiliser getCurriculumLevelMap() de content/curriculum-map.ts à la place.
// Ce fichier est conservé car utilisé par app/primaire/[level]/programme-complet/page.tsx.
// Ajouter une entrée ici uniquement si un niveau dispose d'un fichier [level]-curriculum-map.ts
// et que ce fichier exporte un CurriculumMap (learning-architecture-types.ts), pas CurriculumLevelMap.

import { cpCurriculumMap } from "@/content/levels/cp-curriculum-map";
import type { CurriculumMap } from "@/content/learning-architecture-types";
import type { AcademyLevelSlug } from "@/content/program-types";

const curriculumMapsByLevel: Partial<Record<AcademyLevelSlug, CurriculumMap>> = {
  cp: cpCurriculumMap,
  // ce1: ce1CurriculumMap,  — à ajouter quand ce1-curriculum-map.ts existera
  // ce2: ce2CurriculumMap,  — à ajouter quand ce2-curriculum-map.ts existera
  // cm1: cm1CurriculumMap,  — à ajouter quand cm1-curriculum-map.ts existera
};

export function getCurriculumMap(levelSlug: string): CurriculumMap | undefined {
  return curriculumMapsByLevel[levelSlug as AcademyLevelSlug];
}

export function getCurriculumMapLevels(): string[] {
  return Object.keys(curriculumMapsByLevel);
}
