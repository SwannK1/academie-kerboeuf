/**
 * Outil local de préparation de séance.
 *
 * Le site organise une séance (contexte, lien pédagogique, déroulé,
 * différenciation, bilan) ; il ne produit jamais de contenu pédagogique
 * détaillé ni de PDF. Données stockées uniquement dans le navigateur.
 */

export type TeacherLessonLevel = "CP" | "CE1" | "CE2" | "CM1" | "CM2";

export type TeacherLessonPeriod = "P1" | "P2" | "P3" | "P4" | "P5";

export type TeacherLessonGrouping =
  | "collectif"
  | "individuel"
  | "binome"
  | "groupe";

export const TEACHER_LESSON_LEVELS: { id: TeacherLessonLevel; label: string }[] = [
  { id: "CP", label: "CP" },
  { id: "CE1", label: "CE1" },
  { id: "CE2", label: "CE2" },
  { id: "CM1", label: "CM1" },
  { id: "CM2", label: "CM2" },
];

export const TEACHER_LESSON_PERIODS: { id: TeacherLessonPeriod; label: string }[] = [
  { id: "P1", label: "Période 1" },
  { id: "P2", label: "Période 2" },
  { id: "P3", label: "Période 3" },
  { id: "P4", label: "Période 4" },
  { id: "P5", label: "Période 5" },
];

export const TEACHER_LESSON_SUBJECTS: { id: string; label: string }[] = [
  { id: "francais", label: "Français" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "questionner-le-monde", label: "Questionner le monde" },
  { id: "histoire-geographie", label: "Histoire-géographie" },
  { id: "sciences", label: "Sciences" },
  { id: "enseignement-moral-et-civique", label: "Enseignement moral et civique" },
  { id: "arts", label: "Arts" },
  { id: "eps", label: "EPS" },
  { id: "langue-vivante", label: "Langue vivante" },
];

export const TEACHER_LESSON_GROUPINGS: { id: TeacherLessonGrouping; label: string }[] = [
  { id: "collectif", label: "Collectif" },
  { id: "individuel", label: "Individuel" },
  { id: "binome", label: "Binôme" },
  { id: "groupe", label: "Groupe" },
];

export type TeacherLessonPhaseLabel =
  | "Lancement"
  | "Recherche ou découverte"
  | "Mise en commun"
  | "Entraînement ou production"
  | "Bilan";

export const TEACHER_LESSON_PHASE_LABELS: TeacherLessonPhaseLabel[] = [
  "Lancement",
  "Recherche ou découverte",
  "Mise en commun",
  "Entraînement ou production",
  "Bilan",
];

export type TeacherLessonPhase = {
  id: string;
  label: string;
  durationMinutes: number;
  instruction: string;
  materials: string;
  grouping: TeacherLessonGrouping;
};

export type TeacherLessonPlan = {
  id: string;
  classLevel: TeacherLessonLevel;
  subjectId: string;
  period: TeacherLessonPeriod;
  week: number | null;
  date: string | null;
  title: string;
  domain: string;
  competency: string;
  objective: string;
  successCriteria: string;
  linkedProgrammationId: string | null;
  durationMinutes: number;
  phases: TeacherLessonPhase[];
  differentiation: {
    strongGuidance: string;
    intermediateGuidance: string;
    autonomy: string;
    freeField: string;
  };
  reviewNotes: {
    whatWorked: string;
    toResume: string;
    studentsToSupport: string;
    nextStep: string;
  };
  createdAt: string;
  updatedAt: string;
};

export const TEACHER_LESSON_PLANNER_STORAGE_KEY = "academie-kerboeuf-seances-v1";

export function createEmptyPhase(label: string): TeacherLessonPhase {
  return {
    id: `phase-${label}-${Math.random().toString(36).slice(2, 9)}`,
    label,
    durationMinutes: 0,
    instruction: "",
    materials: "",
    grouping: "collectif",
  };
}

export function createEmptyLessonPlan(): TeacherLessonPlan {
  const now = new Date().toISOString();
  return {
    id: `seance-${Math.random().toString(36).slice(2, 10)}`,
    classLevel: "CP",
    subjectId: TEACHER_LESSON_SUBJECTS[0].id,
    period: "P1",
    week: null,
    date: null,
    title: "",
    domain: "",
    competency: "",
    objective: "",
    successCriteria: "",
    linkedProgrammationId: null,
    durationMinutes: 0,
    phases: TEACHER_LESSON_PHASE_LABELS.map((label) => createEmptyPhase(label)),
    differentiation: {
      strongGuidance: "",
      intermediateGuidance: "",
      autonomy: "",
      freeField: "",
    },
    reviewNotes: {
      whatWorked: "",
      toResume: "",
      studentsToSupport: "",
      nextStep: "",
    },
    createdAt: now,
    updatedAt: now,
  };
}
