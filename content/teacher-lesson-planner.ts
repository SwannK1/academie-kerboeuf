import {
  teacherLevels,
  teacherPeriods,
  teacherPlanningSlots,
  teacherSubjects,
  teacherWeeks,
  type TeacherLevel,
  type TeacherPeriod,
  type TeacherPlanningSlotId,
  type TeacherSubject,
  type TeacherWeek,
} from "@/content/teacher-planning";

/**
 * Domaine de la préparation de séance. Une séance décrit l'organisation
 * d'un temps de classe (objectif, étapes, différenciation) — jamais de
 * contenu pédagogique généré automatiquement, jamais de donnée d'élève.
 */

export type TeacherLessonCreneau = TeacherPlanningSlotId;

export const teacherLessonCreneaux: { id: TeacherLessonCreneau; label: string }[] =
  teacherPlanningSlots;

export type TeacherLessonSteps = {
  lancement: string;
  recherche: string;
  miseEnCommun: string;
  entrainement: string;
  bilan: string;
};

export interface TeacherLesson {
  id: string;
  niveau: TeacherLevel;
  matiere: TeacherSubject;
  periode: TeacherPeriod;
  semaine: TeacherWeek;
  creneau: TeacherLessonCreneau | null;
  date: string;
  duree: string;
  titre: string;
  domaine: string;
  competence: string;
  objectif: string;
  critereReussite: string;
  etapes: TeacherLessonSteps;
  differenciation: string;
  notesApresSeance: string;
  createdAt: string;
  updatedAt: string;
}

export const TEACHER_LESSON_STORAGE_KEY = "academie-kerboeuf-seances-v1";

export function createEmptyTeacherLessonSteps(): TeacherLessonSteps {
  return {
    lancement: "",
    recherche: "",
    miseEnCommun: "",
    entrainement: "",
    bilan: "",
  };
}

export function createEmptyTeacherLesson(
  prefill: TeacherLessonPrefill = {},
): TeacherLesson {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    niveau: prefill.niveau ?? teacherLevels[0].id,
    matiere: prefill.matiere ?? teacherSubjects[0].id,
    periode: prefill.periode ?? teacherPeriods[0].id,
    semaine: prefill.semaine ?? teacherWeeks[0].id,
    creneau: prefill.creneau ?? null,
    date: "",
    duree: "",
    titre: "",
    domaine: "",
    competence: "",
    objectif: "",
    critereReussite: "",
    etapes: createEmptyTeacherLessonSteps(),
    differenciation: "",
    notesApresSeance: "",
    createdAt: now,
    updatedAt: now,
  };
}

export function readTeacherLessons(): TeacherLesson[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(TEACHER_LESSON_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is TeacherLesson =>
        item && typeof item === "object" && typeof item.id === "string",
    );
  } catch {
    return [];
  }
}

export function writeTeacherLessons(lessons: TeacherLesson[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    TEACHER_LESSON_STORAGE_KEY,
    JSON.stringify(lessons),
  );
}

/**
 * Paramètres d'URL autorisés pour préremplir une séance. Aucune donnée
 * d'élève ou personnelle ne doit jamais transiter par l'URL.
 */
export interface TeacherLessonPrefill {
  niveau?: TeacherLevel;
  matiere?: TeacherSubject;
  periode?: TeacherPeriod;
  semaine?: TeacherWeek;
  creneau?: TeacherLessonCreneau;
}

const SUBJECT_LABEL_TO_ID: Record<string, TeacherSubject> = {
  français: "francais",
  mathématiques: "mathematiques",
  sciences: "sciences",
};

export function matiereIdFromLabel(label: string): TeacherSubject | undefined {
  return SUBJECT_LABEL_TO_ID[label.toLowerCase()];
}

export function parseTeacherLessonPrefill(
  params: Record<string, string | string[] | undefined>,
): TeacherLessonPrefill {
  const read = (key: string): string | undefined => {
    const value = params[key];
    return typeof value === "string" ? value.toLowerCase() : undefined;
  };

  const prefill: TeacherLessonPrefill = {};

  const niveau = read("niveau");
  if (niveau && teacherLevels.some((level) => level.id === niveau)) {
    prefill.niveau = niveau as TeacherLevel;
  }

  const matiere = read("matiere");
  if (matiere && teacherSubjects.some((subject) => subject.id === matiere)) {
    prefill.matiere = matiere as TeacherSubject;
  }

  const periode = read("periode");
  if (periode && teacherPeriods.some((p) => p.id === periode)) {
    prefill.periode = periode as TeacherPeriod;
  }

  const semaine = read("semaine");
  if (semaine && teacherWeeks.some((w) => w.id === semaine)) {
    prefill.semaine = semaine as TeacherWeek;
  }

  const creneau = read("creneau");
  if (creneau && teacherLessonCreneaux.some((c) => c.id === creneau)) {
    prefill.creneau = creneau as TeacherLessonCreneau;
  }

  return prefill;
}

export function buildTeacherLessonPlannerHref(
  prefill: TeacherLessonPrefill,
): string {
  const search = new URLSearchParams();
  if (prefill.niveau) search.set("niveau", prefill.niveau);
  if (prefill.matiere) search.set("matiere", prefill.matiere);
  if (prefill.periode) search.set("periode", prefill.periode);
  if (prefill.semaine) search.set("semaine", prefill.semaine);
  if (prefill.creneau) search.set("creneau", prefill.creneau);
  const query = search.toString();
  return query
    ? `/enseignants/preparer-une-seance?${query}`
    : "/enseignants/preparer-une-seance";
}
