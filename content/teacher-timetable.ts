export type TeacherTimetableLevelId = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export type TeacherTimetableDayId =
  | "lundi"
  | "mardi"
  | "mercredi"
  | "jeudi"
  | "vendredi";

export type TeacherTimetableLevel = {
  id: TeacherTimetableLevelId;
  label: string;
};

export const teacherTimetableLevels: TeacherTimetableLevel[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export type TeacherTimetableDay = {
  id: TeacherTimetableDayId;
  label: string;
};

export const teacherTimetableDays: TeacherTimetableDay[] = [
  { id: "lundi", label: "Lundi" },
  { id: "mardi", label: "Mardi" },
  { id: "mercredi", label: "Mercredi" },
  { id: "jeudi", label: "Jeudi" },
  { id: "vendredi", label: "Vendredi" },
];

export const teacherTimetableSubjectsByLevel: Record<
  TeacherTimetableLevelId,
  string[]
> = {
  cp: [
    "Français",
    "Mathématiques",
    "Questionner le monde",
    "EPS",
    "Arts",
    "Musique",
    "EMC",
  ],
  ce1: [
    "Français",
    "Mathématiques",
    "Questionner le monde",
    "EPS",
    "Arts",
    "Musique",
    "EMC",
  ],
  ce2: [
    "Français",
    "Mathématiques",
    "Questionner le monde",
    "EPS",
    "Arts",
    "Musique",
    "EMC",
  ],
  cm1: [
    "Français",
    "Mathématiques",
    "Histoire-Géographie",
    "Sciences",
    "EPS",
    "Arts",
    "Musique",
    "EMC",
  ],
  cm2: [
    "Français",
    "Mathématiques",
    "Histoire-Géographie",
    "Sciences",
    "EPS",
    "Arts",
    "Musique",
    "EMC",
  ],
};

/**
 * Repères horaires hebdomadaires officiels indicatifs, par matière et par
 * niveau (en heures). Valeurs arrondies à des fins de comparaison dans
 * l'outil — l'enseignant garde la responsabilité de l'organisation réelle.
 */
export const teacherTimetableReferenceHoursByLevel: Record<
  TeacherTimetableLevelId,
  Record<string, number>
> = {
  cp: {
    Français: 10,
    Mathématiques: 5.5,
    "Questionner le monde": 2.5,
    EPS: 3,
    Arts: 1,
    Musique: 1,
    EMC: 1,
  },
  ce1: {
    Français: 9.5,
    Mathématiques: 5,
    "Questionner le monde": 2.5,
    EPS: 3,
    Arts: 1,
    Musique: 1,
    EMC: 1,
  },
  ce2: {
    Français: 9,
    Mathématiques: 5,
    "Questionner le monde": 2.5,
    EPS: 3,
    Arts: 1.5,
    Musique: 1,
    EMC: 1,
  },
  cm1: {
    Français: 8,
    Mathématiques: 5,
    "Histoire-Géographie": 2,
    Sciences: 1.5,
    EPS: 3,
    Arts: 1.5,
    Musique: 1,
    EMC: 1,
  },
  cm2: {
    Français: 8,
    Mathématiques: 5,
    "Histoire-Géographie": 2,
    Sciences: 1.5,
    EPS: 3,
    Arts: 1.5,
    Musique: 1,
    EMC: 1,
  },
};

export const TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET = 24;

export const TEACHER_TIMETABLE_STORAGE_KEY =
  "academie-kerboeuf-emploi-du-temps-v2";

/** Grille de temps : créneaux possibles de 8h00 à 17h00, pas de 30 min. */
export const TEACHER_TIMETABLE_GRID_START_MINUTES = 8 * 60;
export const TEACHER_TIMETABLE_GRID_END_MINUTES = 17 * 60;
export const TEACHER_TIMETABLE_GRID_STEP_MINUTES = 30;

export const TEACHER_TIMETABLE_GRID_ROWS = Math.floor(
  (TEACHER_TIMETABLE_GRID_END_MINUTES - TEACHER_TIMETABLE_GRID_START_MINUTES) /
    TEACHER_TIMETABLE_GRID_STEP_MINUTES,
);

export const TEACHER_TIMETABLE_DURATION_OPTIONS = [30, 45, 60, 90, 120] as const;
export type TeacherTimetableDurationMinutes =
  (typeof TEACHER_TIMETABLE_DURATION_OPTIONS)[number];

export function minutesToTimeLabel(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}h${String(mins).padStart(2, "0")}`;
}

export function timeLabelToMinutes(label: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(label);
  if (!match) return null;
  const hours = Number(match[1]);
  const mins = Number(match[2]);
  if (Number.isNaN(hours) || Number.isNaN(mins)) return null;
  return hours * 60 + mins;
}

export function clampToGrid(minutes: number): number {
  const stepped =
    Math.round(
      (minutes - TEACHER_TIMETABLE_GRID_START_MINUTES) /
        TEACHER_TIMETABLE_GRID_STEP_MINUTES,
    ) * TEACHER_TIMETABLE_GRID_STEP_MINUTES +
    TEACHER_TIMETABLE_GRID_START_MINUTES;
  return Math.min(
    Math.max(stepped, TEACHER_TIMETABLE_GRID_START_MINUTES),
    TEACHER_TIMETABLE_GRID_END_MINUTES - TEACHER_TIMETABLE_GRID_STEP_MINUTES,
  );
}

export function rowIndexToMinutes(rowIndex: number): number {
  return (
    TEACHER_TIMETABLE_GRID_START_MINUTES +
    rowIndex * TEACHER_TIMETABLE_GRID_STEP_MINUTES
  );
}

export function minutesToRowIndex(minutes: number): number {
  return Math.round(
    (minutes - TEACHER_TIMETABLE_GRID_START_MINUTES) /
      TEACHER_TIMETABLE_GRID_STEP_MINUTES,
  );
}

export interface TeacherTimetableSlot {
  id: string;
  day: TeacherTimetableDayId;
  /** Minutes depuis minuit (multiple du pas de grille). */
  startMinutes: number;
  durationMinutes: TeacherTimetableDurationMinutes;
  subject: string;
}

export type TeacherTimetableState = {
  levelId: TeacherTimetableLevelId;
  slots: TeacherTimetableSlot[];
};

export function slotEndMinutes(slot: TeacherTimetableSlot): number {
  return slot.startMinutes + slot.durationMinutes;
}

export function slotsOverlap(
  a: Pick<TeacherTimetableSlot, "startMinutes" | "durationMinutes">,
  b: Pick<TeacherTimetableSlot, "startMinutes" | "durationMinutes">,
): boolean {
  const aEnd = a.startMinutes + a.durationMinutes;
  const bEnd = b.startMinutes + b.durationMinutes;
  return a.startMinutes < bEnd && b.startMinutes < aEnd;
}

export function findOverlappingSlotIds(
  slots: TeacherTimetableSlot[],
): Set<string> {
  const overlapping = new Set<string>();
  for (const day of teacherTimetableDays) {
    const dayslots = slots.filter((slot) => slot.day === day.id);
    for (let i = 0; i < dayslots.length; i += 1) {
      for (let j = i + 1; j < dayslots.length; j += 1) {
        if (slotsOverlap(dayslots[i], dayslots[j])) {
          overlapping.add(dayslots[i].id);
          overlapping.add(dayslots[j].id);
        }
      }
    }
  }
  return overlapping;
}

let slotCounter = 0;
export function nextTeacherTimetableSlotId(): string {
  slotCounter += 1;
  return `creneau-${Date.now()}-${slotCounter}`;
}

const RECOMMENDED_ELEMENTAIRE_SLOTS: Array<
  Omit<TeacherTimetableSlot, "id">
> = [
  { day: "lundi", startMinutes: 8 * 60 + 30, durationMinutes: 90, subject: "Français" },
  { day: "lundi", startMinutes: 10 * 60, durationMinutes: 60, subject: "Mathématiques" },
  { day: "lundi", startMinutes: 13 * 60 + 30, durationMinutes: 90, subject: "Questionner le monde" },
  { day: "lundi", startMinutes: 15 * 60, durationMinutes: 60, subject: "Arts" },

  { day: "mardi", startMinutes: 8 * 60 + 30, durationMinutes: 90, subject: "Français" },
  { day: "mardi", startMinutes: 10 * 60, durationMinutes: 60, subject: "Mathématiques" },
  { day: "mardi", startMinutes: 13 * 60 + 30, durationMinutes: 90, subject: "EMC" },
  { day: "mardi", startMinutes: 15 * 60, durationMinutes: 60, subject: "Musique" },

  { day: "mercredi", startMinutes: 8 * 60 + 30, durationMinutes: 90, subject: "Français" },
  { day: "mercredi", startMinutes: 10 * 60, durationMinutes: 60, subject: "EPS" },

  { day: "jeudi", startMinutes: 8 * 60 + 30, durationMinutes: 90, subject: "Français" },
  { day: "jeudi", startMinutes: 10 * 60, durationMinutes: 60, subject: "Mathématiques" },
  { day: "jeudi", startMinutes: 13 * 60 + 30, durationMinutes: 90, subject: "Questionner le monde" },
  { day: "jeudi", startMinutes: 15 * 60, durationMinutes: 60, subject: "Musique" },

  { day: "vendredi", startMinutes: 8 * 60 + 30, durationMinutes: 90, subject: "Français" },
  { day: "vendredi", startMinutes: 10 * 60, durationMinutes: 60, subject: "Mathématiques" },
  { day: "vendredi", startMinutes: 13 * 60 + 30, durationMinutes: 90, subject: "EPS" },
  { day: "vendredi", startMinutes: 15 * 60, durationMinutes: 60, subject: "Arts" },
];

export function getRecommendedTeacherTimetable(
  levelId: TeacherTimetableLevelId,
): TeacherTimetableState {
  return {
    levelId,
    slots: RECOMMENDED_ELEMENTAIRE_SLOTS.map((slot) => ({
      ...slot,
      id: nextTeacherTimetableSlotId(),
    })),
  };
}
