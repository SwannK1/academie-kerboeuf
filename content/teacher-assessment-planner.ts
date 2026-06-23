/**
 * Données de base du planificateur d'évaluations enseignant.
 *
 * Outil d'organisation : titre, niveau, matière, compétence visée,
 * période, date, durée, matériel et consignes de préparation.
 * Aucune donnée d'élève (prénom, note, résultat) n'est manipulée ici.
 */

export type AssessmentLevel = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export type AssessmentSubject =
  | "francais"
  | "mathematiques"
  | "sciences"
  | "histoire-geographie"
  | "emc"
  | "arts"
  | "eps"
  | "autre";

export type AssessmentPeriod =
  | "periode-1"
  | "periode-2"
  | "periode-3"
  | "periode-4"
  | "periode-5";

export type AssessmentStatus =
  | "a-preparer"
  | "prete"
  | "realisee"
  | "a-corriger"
  | "bilan-a-faire";

export const assessmentLevels: { id: AssessmentLevel; label: string }[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export const assessmentSubjects: { id: AssessmentSubject; label: string }[] = [
  { id: "francais", label: "Français" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "sciences", label: "Sciences" },
  { id: "histoire-geographie", label: "Histoire-géographie" },
  { id: "emc", label: "EMC" },
  { id: "arts", label: "Arts" },
  { id: "eps", label: "EPS" },
  { id: "autre", label: "Autre" },
];

export const assessmentPeriods: { id: AssessmentPeriod; label: string }[] = [
  { id: "periode-1", label: "Période 1" },
  { id: "periode-2", label: "Période 2" },
  { id: "periode-3", label: "Période 3" },
  { id: "periode-4", label: "Période 4" },
  { id: "periode-5", label: "Période 5" },
];

export const assessmentStatuses: { id: AssessmentStatus; label: string }[] = [
  { id: "a-preparer", label: "À préparer" },
  { id: "prete", label: "Prête" },
  { id: "realisee", label: "Réalisée" },
  { id: "a-corriger", label: "À corriger" },
  { id: "bilan-a-faire", label: "Bilan à faire" },
];

export interface AssessmentChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface Assessment {
  id: string;
  title: string;
  level?: AssessmentLevel;
  subject: AssessmentSubject;
  skill: string;
  period: AssessmentPeriod;
  date?: string;
  durationLabel: string;
  materials: string;
  preparationNotes: string;
  status: AssessmentStatus;
  checklist: AssessmentChecklistItem[];
  createdAt: string;
  updatedAt: string;
}

export const ASSESSMENT_PLANNER_STORAGE_KEY = "academie-kerboeuf-evaluations-v1";

export const DEFAULT_CHECKLIST_LABELS: string[] = [
  "Objectif et compétence vérifiés",
  "Sujet rédigé",
  "Matériel rassemblé",
  "Consignes relues",
  "Barème ou critères prévus",
];

export function createEmptyChecklist(): AssessmentChecklistItem[] {
  return DEFAULT_CHECKLIST_LABELS.map((label, index) => ({
    id: `checklist-${index}-${label}`,
    label,
    done: false,
  }));
}

export function getAssessmentSubjectLabel(subject: AssessmentSubject): string {
  return (
    assessmentSubjects.find((entry) => entry.id === subject)?.label ?? subject
  );
}

export function getAssessmentPeriodLabel(period: AssessmentPeriod): string {
  return assessmentPeriods.find((entry) => entry.id === period)?.label ?? period;
}

export function getAssessmentStatusLabel(status: AssessmentStatus): string {
  return assessmentStatuses.find((entry) => entry.id === status)?.label ?? status;
}

export function getAssessmentLevelLabel(level?: AssessmentLevel): string | undefined {
  if (!level) {
    return undefined;
  }
  return assessmentLevels.find((entry) => entry.id === level)?.label ?? level;
}
