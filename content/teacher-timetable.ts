import {
  isLocalStorageAvailable,
  isPlainObject,
  sanitizeObjectArray,
  writeLocalStorageJson,
} from "@/content/teacher-local-storage";

export type TeacherTimetableLevelId = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export const teacherTimetableLevels: { id: TeacherTimetableLevelId; label: string }[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export const teacherTimetableSubjectsByLevel: Record<TeacherTimetableLevelId, string[]> = {
  cp: ["Français", "Mathématiques", "Questionner le monde", "EPS", "Arts", "Musique", "EMC"],
  ce1: ["Français", "Mathématiques", "Questionner le monde", "EPS", "Arts", "Musique", "EMC"],
  ce2: ["Français", "Mathématiques", "Questionner le monde", "EPS", "Arts", "Musique", "EMC"],
  cm1: ["Français", "Mathématiques", "Histoire-Géographie", "Sciences", "EPS", "Arts", "Musique", "EMC"],
  cm2: ["Français", "Mathématiques", "Histoire-Géographie", "Sciences", "EPS", "Arts", "Musique", "EMC"],
};

export type SubjectVisual = {
  emoji: string;
  colorKey: "jade" | "gold" | "sky" | "ember";
  pattern: "solid" | "dashed" | "dotted" | "double";
};

export const subjectVisuals: Record<string, SubjectVisual> = {
  "Français": { emoji: "📖", colorKey: "jade", pattern: "solid" },
  "Mathématiques": { emoji: "🔢", colorKey: "sky", pattern: "dashed" },
  "Questionner le monde": { emoji: "🔍", colorKey: "gold", pattern: "dotted" },
  "EPS": { emoji: "🤸", colorKey: "ember", pattern: "double" },
  "Arts": { emoji: "🎨", colorKey: "jade", pattern: "dotted" },
  "Musique": { emoji: "🎵", colorKey: "sky", pattern: "solid" },
  "EMC": { emoji: "🤝", colorKey: "gold", pattern: "dashed" },
  "Histoire-Géographie": { emoji: "🗺️", colorKey: "ember", pattern: "solid" },
  "Sciences": { emoji: "🔬", colorKey: "jade", pattern: "double" },
};

export function getSubjectVisual(subject: string): SubjectVisual {
  return subjectVisuals[subject] ?? { emoji: "📌", colorKey: "sky", pattern: "solid" };
}

export const TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET = 24;

/** v2 = ancienne grille à créneaux fixes (table). Conservée pour migration douce. */
export const TEACHER_TIMETABLE_STORAGE_KEY_V2 = "academie-kerboeuf-emploi-du-temps-v2";
/** v3 = calendrier modulable à horaires libres (minutes depuis minuit). */
export const TEACHER_TIMETABLE_STORAGE_KEY = "academie-kerboeuf-emploi-du-temps-v3";

export type TeacherTimetableDayId = "lundi" | "mardi" | "mercredi" | "jeudi" | "vendredi";

export const teacherTimetableDayLabels: Record<TeacherTimetableDayId, string> = {
  lundi: "Lundi",
  mardi: "Mardi",
  mercredi: "Mercredi",
  jeudi: "Jeudi",
  vendredi: "Vendredi",
};

export const teacherTimetableDayOrder: TeacherTimetableDayId[] = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
];

export type TeacherTimetableSessionStatus = "prevue" | "realisee" | "a-reporter" | "a-ajuster";

export const teacherTimetableSessionStatusLabels: Record<TeacherTimetableSessionStatus, string> = {
  prevue: "Prévue",
  realisee: "Réalisée",
  "a-reporter": "À reporter",
  "a-ajuster": "À ajuster",
};

export const teacherTimetableSessionStatuses: TeacherTimetableSessionStatus[] = [
  "prevue",
  "realisee",
  "a-reporter",
  "a-ajuster",
];

export type TeacherTimetableSession = {
  id: string;
  dayId: TeacherTimetableDayId;
  /** minutes depuis minuit, ex: 8h30 = 510 */
  startMinutes: number;
  durationMinutes: number;
  subject: string;
  title: string;
  group: string;
  location: string;
  material: string;
  status: TeacherTimetableSessionStatus;
  note: string;
};

export function createTeacherTimetableId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export type TeacherTimetableWeekKind =
  | "reference"
  | "reelle"
  | "sortie"
  | "evaluation"
  | "projet"
  | "remplacement"
  | "raccourcie";

export const teacherTimetableWeekKindLabels: Record<TeacherTimetableWeekKind, string> = {
  reference: "Référence",
  reelle: "Semaine réelle",
  sortie: "Sortie",
  evaluation: "Évaluation",
  projet: "Projet",
  remplacement: "Remplacement",
  raccourcie: "Semaine raccourcie",
};

export const specialTeacherTimetableWeekKinds: TeacherTimetableWeekKind[] = [
  "sortie",
  "evaluation",
  "projet",
  "remplacement",
  "raccourcie",
];

export type TeacherTimetableWeek = {
  id: string;
  label: string;
  kind: TeacherTimetableWeekKind;
  sessions: TeacherTimetableSession[];
};

export type TeacherTimetableCalendarConfig = {
  /** minutes depuis minuit */
  dayStartMinutes: number;
  dayEndMinutes: number;
  lunchStartMinutes: number;
  lunchEndMinutes: number;
  mercrediEnabled: boolean;
  /** pas de la grille en minutes, pour l'alignement */
  gridStepMinutes: number;
};

export const DEFAULT_TEACHER_TIMETABLE_CONFIG: TeacherTimetableCalendarConfig = {
  dayStartMinutes: 8 * 60 + 30,
  dayEndMinutes: 16 * 60 + 30,
  lunchStartMinutes: 12 * 60,
  lunchEndMinutes: 13 * 60 + 30,
  mercrediEnabled: false,
  gridStepMinutes: 15,
};

export type TeacherTimetableState = {
  levelId: TeacherTimetableLevelId;
  config: TeacherTimetableCalendarConfig;
  weeks: TeacherTimetableWeek[];
  activeWeekId: string;
};

function buildRecommendedSessions(levelId: TeacherTimetableLevelId): TeacherTimetableSession[] {
  const isUpperLevel = levelId === "cm1" || levelId === "cm2";

  const entries: [TeacherTimetableDayId, number, number, string][] = isUpperLevel
    ? [
        ["lundi", 510, 90, "Français"],
        ["lundi", 600, 90, "Mathématiques"],
        ["lundi", 810, 90, "Sciences"],
        ["lundi", 900, 60, "Arts"],
        ["mardi", 510, 90, "Français"],
        ["mardi", 600, 90, "Mathématiques"],
        ["mardi", 810, 90, "Histoire-Géographie"],
        ["mardi", 900, 60, "EMC"],
        ["mercredi", 510, 90, "Français"],
        ["mercredi", 600, 90, "EPS"],
        ["jeudi", 510, 90, "Français"],
        ["jeudi", 600, 90, "Mathématiques"],
        ["jeudi", 810, 90, "Histoire-Géographie"],
        ["jeudi", 900, 60, "Musique"],
        ["vendredi", 510, 90, "Français"],
        ["vendredi", 600, 90, "Mathématiques"],
        ["vendredi", 810, 90, "EPS"],
        ["vendredi", 900, 60, "Arts"],
      ]
    : [
        ["lundi", 510, 90, "Français"],
        ["lundi", 600, 90, "Mathématiques"],
        ["lundi", 810, 90, "Questionner le monde"],
        ["lundi", 900, 60, "Arts"],
        ["mardi", 510, 90, "Français"],
        ["mardi", 600, 90, "Mathématiques"],
        ["mardi", 810, 90, "EMC"],
        ["mardi", 900, 60, "Musique"],
        ["mercredi", 510, 90, "Français"],
        ["mercredi", 600, 90, "EPS"],
        ["jeudi", 510, 90, "Français"],
        ["jeudi", 600, 90, "Mathématiques"],
        ["jeudi", 810, 90, "Questionner le monde"],
        ["jeudi", 900, 60, "Musique"],
        ["vendredi", 510, 90, "Français"],
        ["vendredi", 600, 90, "Mathématiques"],
        ["vendredi", 810, 90, "EPS"],
        ["vendredi", 900, 60, "Arts"],
      ];

  return entries.map(([dayId, startMinutes, durationMinutes, subject]) => ({
    id: createTeacherTimetableId("seance"),
    dayId,
    startMinutes,
    durationMinutes,
    subject,
    title: subject,
    group: "",
    location: "",
    material: "",
    status: "prevue",
    note: "",
  }));
}

export function createInitialTeacherTimetableState(
  levelId: TeacherTimetableLevelId,
): TeacherTimetableState {
  const referenceWeekId = createTeacherTimetableId("semaine");
  const realWeekId = createTeacherTimetableId("semaine");
  const recommended = buildRecommendedSessions(levelId);

  return {
    levelId,
    config: { ...DEFAULT_TEACHER_TIMETABLE_CONFIG },
    weeks: [
      {
        id: referenceWeekId,
        label: "Emploi du temps de référence",
        kind: "reference",
        sessions: recommended,
      },
      {
        id: realWeekId,
        label: "Semaine du lundi",
        kind: "reelle",
        sessions: recommended.map((session) => ({ ...session, id: createTeacherTimetableId("seance") })),
      },
    ],
    activeWeekId: realWeekId,
  };
}

export function computeHoursBySubject(sessions: TeacherTimetableSession[]): Map<string, number> {
  const totals = new Map<string, number>();
  for (const session of sessions) {
    totals.set(
      session.subject,
      (totals.get(session.subject) ?? 0) + session.durationMinutes / 60,
    );
  }
  return totals;
}

export function sessionsOverlap(a: TeacherTimetableSession, b: TeacherTimetableSession): boolean {
  if (a.dayId !== b.dayId) return false;
  const aEnd = a.startMinutes + a.durationMinutes;
  const bEnd = b.startMinutes + b.durationMinutes;
  return a.startMinutes < bEnd && b.startMinutes < aEnd;
}

export function findOverlappingSession(
  sessions: TeacherTimetableSession[],
  candidate: TeacherTimetableSession,
): TeacherTimetableSession | null {
  for (const session of sessions) {
    if (session.id === candidate.id) continue;
    if (sessionsOverlap(session, candidate)) {
      return session;
    }
  }
  return null;
}

export function formatMinutesAsTime(minutes: number): string {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const mins = normalized % 60;
  return `${hours.toString().padStart(2, "0")}h${mins.toString().padStart(2, "0")}`;
}

export function formatDurationLabel(durationMinutes: number): string {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} h`;
  return `${hours} h ${minutes}`;
}

// --- Migration douce depuis la v2 (grille à créneaux fixes) ---

type LegacyTeacherTimetableDay = { id: string; label: string };
type LegacyTeacherTimetableSlot = { id: string; label: string; durationHours: number };
type LegacyTeacherTimetableSession = { subject: string; durationHours: number };
type LegacyTeacherTimetableWeek = {
  id: string;
  label: string;
  kind: TeacherTimetableWeekKind;
  assignments: Record<string, LegacyTeacherTimetableSession | undefined>;
};
type LegacyTeacherTimetableState = {
  levelId: TeacherTimetableLevelId;
  days: LegacyTeacherTimetableDay[];
  slots: LegacyTeacherTimetableSlot[];
  weeks: LegacyTeacherTimetableWeek[];
  activeWeekId: string;
};

const legacyDayIdToCanonical: Record<string, TeacherTimetableDayId> = {
  lundi: "lundi",
  mardi: "mardi",
  mercredi: "mercredi",
  jeudi: "jeudi",
  vendredi: "vendredi",
};

function migrateLegacyState(legacy: LegacyTeacherTimetableState): TeacherTimetableState {
  let cursorStart = DEFAULT_TEACHER_TIMETABLE_CONFIG.dayStartMinutes;
  const slotStartByIndex = new Map<number, number>();
  legacy.slots.forEach((slot, index) => {
    slotStartByIndex.set(index, cursorStart);
    cursorStart += Math.round(slot.durationHours * 60);
  });

  const usesMercredi = legacy.days.some((day) => day.id === "mercredi");

  function convertWeek(week: LegacyTeacherTimetableWeek): TeacherTimetableWeek {
    const sessions: TeacherTimetableSession[] = [];
    legacy.slots.forEach((slot, slotIndex) => {
      legacy.days.forEach((day) => {
        const key = `${day.id}__${slot.id}`;
        const assignment = week.assignments[key];
        if (!assignment) return;
        const dayId = legacyDayIdToCanonical[day.id];
        if (!dayId) return;
        sessions.push({
          id: createTeacherTimetableId("seance"),
          dayId,
          startMinutes: slotStartByIndex.get(slotIndex) ?? DEFAULT_TEACHER_TIMETABLE_CONFIG.dayStartMinutes,
          durationMinutes: Math.round(assignment.durationHours * 60),
          subject: assignment.subject,
          title: assignment.subject,
          group: "",
          location: "",
          material: "",
          status: "prevue",
          note: "",
        });
      });
    });
    return { id: week.id, label: week.label, kind: week.kind, sessions };
  }

  return {
    levelId: legacy.levelId,
    config: { ...DEFAULT_TEACHER_TIMETABLE_CONFIG, mercrediEnabled: usesMercredi },
    weeks: legacy.weeks.map(convertWeek),
    activeWeekId: legacy.activeWeekId,
  };
}

function isValidSession(value: unknown): value is TeacherTimetableSession {
  if (!isPlainObject(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.dayId === "string" &&
    typeof value.startMinutes === "number" &&
    typeof value.durationMinutes === "number" &&
    typeof value.subject === "string"
  );
}

function isValidWeek(value: unknown): value is TeacherTimetableWeek {
  if (!isPlainObject(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.label === "string" &&
    typeof value.kind === "string" &&
    Array.isArray(value.sessions)
  );
}

/** Filtre les semaines/séances corrompues plutôt que de rejeter tout l'état. */
function sanitizeTimetableState(state: TeacherTimetableState): TeacherTimetableState {
  return {
    ...state,
    weeks: sanitizeObjectArray<TeacherTimetableWeek>(state.weeks)
      .filter(isValidWeek)
      .map((week) => ({
        ...week,
        sessions: sanitizeObjectArray<TeacherTimetableSession>(week.sessions).filter(isValidSession),
      })),
  };
}

function isValidState(value: unknown): value is TeacherTimetableState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<TeacherTimetableState>;
  return (
    typeof candidate.levelId === "string" &&
    !!candidate.config &&
    Array.isArray(candidate.weeks) &&
    typeof candidate.activeWeekId === "string"
  );
}

function isLegacyState(value: unknown): value is LegacyTeacherTimetableState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<LegacyTeacherTimetableState>;
  return (
    typeof candidate.levelId === "string" &&
    Array.isArray(candidate.days) &&
    Array.isArray(candidate.slots) &&
    Array.isArray(candidate.weeks) &&
    typeof candidate.activeWeekId === "string"
  );
}

/**
 * Lit l'état du calendrier depuis le stockage local. Si seule l'ancienne
 * grille v2 existe, la convertit sans jamais supprimer les données v2.
 */
export function readTeacherTimetableState(): TeacherTimetableState | null {
  return readTeacherTimetableStateChecked().state;
}

/**
 * Lit l'état du calendrier. `wasReset` signale une sauvegarde v3 présente
 * mais illisible/invalide : l'outil appelant doit alors prévenir
 * l'enseignant plutôt que de remplacer silencieusement la donnée par un
 * état neuf.
 */
export function readTeacherTimetableStateChecked(): {
  state: TeacherTimetableState | null;
  wasReset: boolean;
  storageAvailable: boolean;
} {
  const storageAvailable = isLocalStorageAvailable();
  if (!storageAvailable) {
    return { state: null, wasReset: false, storageAvailable };
  }

  let rawV3: string | null = null;
  try {
    rawV3 = window.localStorage.getItem(TEACHER_TIMETABLE_STORAGE_KEY);
  } catch {
    rawV3 = null;
  }
  if (rawV3) {
    try {
      const parsed = JSON.parse(rawV3);
      if (isValidState(parsed)) {
        return { state: sanitizeTimetableState(parsed), wasReset: false, storageAvailable };
      }
      return { state: null, wasReset: true, storageAvailable };
    } catch {
      return { state: null, wasReset: true, storageAvailable };
    }
  }

  try {
    const rawV2 = window.localStorage.getItem(TEACHER_TIMETABLE_STORAGE_KEY_V2);
    if (rawV2) {
      const parsed = JSON.parse(rawV2);
      if (isLegacyState(parsed)) {
        return { state: migrateLegacyState(parsed), wasReset: false, storageAvailable };
      }
    }
  } catch {
    // ignore
  }

  return { state: null, wasReset: false, storageAvailable };
}

export function writeTeacherTimetableState(state: TeacherTimetableState): boolean {
  return writeLocalStorageJson(TEACHER_TIMETABLE_STORAGE_KEY, state);
}
