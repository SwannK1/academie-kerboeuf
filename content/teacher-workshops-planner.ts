/**
 * Données de base de l'outil de planification d'ateliers enseignant.
 *
 * Cet outil ne stocke jamais de données d'élèves (prénoms, groupes,
 * informations médicales ou comportementales). Il décrit uniquement
 * l'organisation matérielle et pédagogique d'un atelier de classe.
 */

export type TeacherWorkshopLevel = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export type TeacherWorkshopSubject = "francais" | "mathematiques" | "sciences";

export type TeacherWorkshopStatus =
  | "a-preparer"
  | "pret"
  | "realise"
  | "a-reprendre";

export const teacherWorkshopLevels: { id: TeacherWorkshopLevel; label: string }[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export const teacherWorkshopSubjects: { id: TeacherWorkshopSubject; label: string }[] = [
  { id: "francais", label: "Français" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "sciences", label: "Sciences" },
];

export const teacherWorkshopStatuses: { id: TeacherWorkshopStatus; label: string }[] = [
  { id: "a-preparer", label: "À préparer" },
  { id: "pret", label: "Prêt" },
  { id: "realise", label: "Réalisé" },
  { id: "a-reprendre", label: "À reprendre" },
];

export interface TeacherWorkshopTask {
  id: string;
  label: string;
  done: boolean;
}

export interface TeacherWorkshop {
  id: string;
  title: string;
  level: TeacherWorkshopLevel | null;
  subject: TeacherWorkshopSubject;
  domain: string;
  objective: string;
  materials: string;
  durationLabel: string;
  week: string;
  status: TeacherWorkshopStatus;
  groupCount: number;
  instructions: string;
  tasks: TeacherWorkshopTask[];
  createdAt: string;
  updatedAt: string;
}

export type TeacherWorkshopDraft = Omit<
  TeacherWorkshop,
  "id" | "createdAt" | "updatedAt" | "tasks"
> & {
  tasks: Omit<TeacherWorkshopTask, "id">[];
};
