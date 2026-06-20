/**
 * Domaine de la préparation de séance. Une séance décrit l'organisation
 * d'un temps de classe (objectif, étapes, différenciation) — jamais de
 * contenu pédagogique généré automatiquement, jamais de donnée d'élève.
 */

export type TeacherLevel = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export type TeacherSubject = "francais" | "mathematiques" | "sciences";

export type TeacherPeriod =
  | "periode-1"
  | "periode-2"
  | "periode-3"
  | "periode-4"
  | "periode-5";

export type TeacherWeek =
  | "semaine-1"
  | "semaine-2"
  | "semaine-3"
  | "semaine-4"
  | "semaine-5"
  | "semaine-6"
  | "semaine-7";

export const teacherLevels: { id: TeacherLevel; label: string }[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export const teacherSubjects: { id: TeacherSubject; label: string }[] = [
  { id: "francais", label: "Français" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "sciences", label: "Sciences" },
];

export const teacherPeriods: { id: TeacherPeriod; label: string }[] = [
  { id: "periode-1", label: "Période 1" },
  { id: "periode-2", label: "Période 2" },
  { id: "periode-3", label: "Période 3" },
  { id: "periode-4", label: "Période 4" },
  { id: "periode-5", label: "Période 5" },
];

export const teacherWeeks: { id: TeacherWeek; label: string }[] = [
  { id: "semaine-1", label: "Semaine 1" },
  { id: "semaine-2", label: "Semaine 2" },
  { id: "semaine-3", label: "Semaine 3" },
  { id: "semaine-4", label: "Semaine 4" },
  { id: "semaine-5", label: "Semaine 5" },
  { id: "semaine-6", label: "Semaine 6" },
  { id: "semaine-7", label: "Semaine 7" },
];

export type TeacherLessonCreneau =
  | "matin-1"
  | "matin-2"
  | "apres-midi-1"
  | "apres-midi-2";

export const teacherLessonCreneaux: { id: TeacherLessonCreneau; label: string }[] = [
  { id: "matin-1", label: "Matin 1" },
  { id: "matin-2", label: "Matin 2" },
  { id: "apres-midi-1", label: "Après-midi 1" },
  { id: "apres-midi-2", label: "Après-midi 2" },
];

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
