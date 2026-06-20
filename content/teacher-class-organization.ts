import { teacherLevels, teacherPeriods } from "@/content/teacher-programmation";

/**
 * Outil général de préparation de classe.
 *
 * Règle : cet outil est conçu pour des tâches professionnelles générales
 * d'organisation de classe (préparation, matériel, évaluations, réunions,
 * projets). Il ne doit pas contenir de prénom, de suivi individuel, ni
 * d'information médicale, familiale ou comportementale.
 */

export { teacherLevels, teacherPeriods };

export type ClassOrgGroupId =
  | "preparation"
  | "materiel"
  | "evaluations"
  | "reunions"
  | "projets";

export const classOrgGroups: { id: ClassOrgGroupId; label: string }[] = [
  { id: "preparation", label: "Préparation" },
  { id: "materiel", label: "Matériel" },
  { id: "evaluations", label: "Évaluations" },
  { id: "reunions", label: "Réunions" },
  { id: "projets", label: "Projets" },
];
