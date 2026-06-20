/**
 * Données de base de l'outil de préparation des conseils de cycle.
 *
 * Outil 100% local (navigateur). Aucune donnée sensible ou liée aux élèves
 * ne doit être saisie ici : uniquement de l'organisation de réunion
 * (ordre du jour, décisions, tâches de suivi).
 */

export type TeacherCycleMeetingType =
  | "conseil-de-cycle"
  | "conseil-des-maitres"
  | "reunion-equipe-pedagogique"
  | "liaison-cm2-6e";

export type TeacherCycleMeetingTaskStatus = "a-faire" | "fait";

export type TeacherCycleMeetingTask = {
  id: string;
  label: string;
  status: TeacherCycleMeetingTaskStatus;
};

export type TeacherCycleMeeting = {
  id: string;
  type: TeacherCycleMeetingType;
  date: string | null;
  agenda: string;
  decisions: string;
  tasks: TeacherCycleMeetingTask[];
  createdAt: string;
};

export const teacherCycleMeetingTypes: {
  id: TeacherCycleMeetingType;
  label: string;
}[] = [
  { id: "conseil-de-cycle", label: "Conseil de cycle" },
  { id: "conseil-des-maitres", label: "Conseil des maîtres" },
  { id: "reunion-equipe-pedagogique", label: "Réunion équipe pédagogique" },
  { id: "liaison-cm2-6e", label: "Liaison CM2-6e" },
];

export const teacherCycleMeetingTaskStatuses: {
  id: TeacherCycleMeetingTaskStatus;
  label: string;
}[] = [
  { id: "a-faire", label: "À faire" },
  { id: "fait", label: "Fait" },
];
