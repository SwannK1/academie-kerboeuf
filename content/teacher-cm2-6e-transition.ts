export const TEACHER_CM2_6E_TRANSITION_STORAGE_KEY =
  "academie-kerboeuf-liaison-cm2-6e-v1";

export type TeacherCm26eTaskCategoryId =
  | "rencontres"
  | "documents"
  | "projets-communs"
  | "methodes"
  | "visites"
  | "calendrier";

export type TeacherCm26eTaskPriority = "importante" | "normale" | "secondaire";

export interface TeacherCm26eTaskCategory {
  id: TeacherCm26eTaskCategoryId;
  label: string;
}

export const teacherCm26eTaskCategories: TeacherCm26eTaskCategory[] = [
  { id: "rencontres", label: "Rencontres" },
  { id: "documents", label: "Documents" },
  { id: "projets-communs", label: "Projets communs" },
  { id: "methodes", label: "Méthodes" },
  { id: "visites", label: "Visites" },
  { id: "calendrier", label: "Calendrier" },
];

export const teacherCm26eTaskPriorities: {
  id: TeacherCm26eTaskPriority;
  label: string;
}[] = [
  { id: "importante", label: "Importante" },
  { id: "normale", label: "Normale" },
  { id: "secondaire", label: "Secondaire" },
];

export interface TeacherCm26eTask {
  id: string;
  categoryId: TeacherCm26eTaskCategoryId;
  label: string;
  priority: TeacherCm26eTaskPriority;
  done: boolean;
}

export interface TeacherCm26eMeeting {
  id: string;
  date: string;
  location: string;
  agenda: string;
  decisions: string;
  followUpTasks: string;
}

export interface TeacherCm26eTransitionState {
  tasks: TeacherCm26eTask[];
  meetings: TeacherCm26eMeeting[];
}

export function getDefaultTeacherCm26eTransitionState(): TeacherCm26eTransitionState {
  return {
    tasks: [
      {
        id: "task-rencontre-pe-prof-principal",
        categoryId: "rencontres",
        label: "Organiser une rencontre entre le PE de CM2 et le professeur principal de 6e",
        priority: "importante",
        done: false,
      },
      {
        id: "task-dossier-suivi",
        categoryId: "documents",
        label: "Transmettre les documents de suivi des acquis (sans noms d'élèves nominatifs détaillés)",
        priority: "importante",
        done: false,
      },
      {
        id: "task-projet-commun",
        categoryId: "projets-communs",
        label: "Identifier un projet commun CM2-6e (lecture, sciences, sortie...)",
        priority: "normale",
        done: false,
      },
      {
        id: "task-methodes-cahier",
        categoryId: "methodes",
        label: "Comparer les méthodes de tenue de cahier et d'organisation du travail",
        priority: "normale",
        done: false,
      },
      {
        id: "task-visite-college",
        categoryId: "visites",
        label: "Planifier une visite du collège pour les élèves de CM2",
        priority: "importante",
        done: false,
      },
      {
        id: "task-calendrier-annee",
        categoryId: "calendrier",
        label: "Fixer le calendrier annuel des temps de liaison CM2-6e",
        priority: "normale",
        done: false,
      },
    ],
    meetings: [],
  };
}

export function createTeacherCm26eTaskId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createTeacherCm26eMeetingId(): string {
  return `meeting-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
