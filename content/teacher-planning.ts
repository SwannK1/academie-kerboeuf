export type TeacherPlanningLevelId = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export type TeacherPlanningDayId =
  | "lundi"
  | "mardi"
  | "mercredi"
  | "jeudi"
  | "vendredi";

export type TeacherPlanningSlotId =
  | "matin-1"
  | "matin-2"
  | "apres-midi-1"
  | "apres-midi-2";

export type TeacherPlanningLevel = {
  id: TeacherPlanningLevelId;
  label: string;
};

export const teacherPlanningLevels: TeacherPlanningLevel[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export type TeacherPlanningDay = {
  id: TeacherPlanningDayId;
  label: string;
  isWednesday?: boolean;
};

export const teacherPlanningDays: TeacherPlanningDay[] = [
  { id: "lundi", label: "Lundi" },
  { id: "mardi", label: "Mardi" },
  { id: "jeudi", label: "Jeudi" },
  { id: "vendredi", label: "Vendredi" },
];

export const teacherPlanningWednesday: TeacherPlanningDay = {
  id: "mercredi",
  label: "Mercredi",
  isWednesday: true,
};

export type TeacherPlanningSlot = {
  id: TeacherPlanningSlotId;
  label: string;
};

export const teacherPlanningSlots: TeacherPlanningSlot[] = [
  { id: "matin-1", label: "Matin 1" },
  { id: "matin-2", label: "Matin 2" },
  { id: "apres-midi-1", label: "Après-midi 1" },
  { id: "apres-midi-2", label: "Après-midi 2" },
];

export const teacherPlanningWednesdaySlots: TeacherPlanningSlot[] = [
  { id: "matin-1", label: "Matin 1" },
  { id: "matin-2", label: "Matin 2" },
];

export type TeacherPlanningDurationId =
  | "30min"
  | "45min"
  | "1h"
  | "1h15"
  | "1h30";

export type TeacherPlanningDuration = {
  id: TeacherPlanningDurationId;
  label: string;
  hours: number;
};

export const teacherPlanningDurations: TeacherPlanningDuration[] = [
  { id: "30min", label: "30 min", hours: 0.5 },
  { id: "45min", label: "45 min", hours: 0.75 },
  { id: "1h", label: "1 h", hours: 1 },
  { id: "1h15", label: "1 h 15", hours: 1.25 },
  { id: "1h30", label: "1 h 30", hours: 1.5 },
];

export const teacherPlanningSubjectsByLevel: Record<
  TeacherPlanningLevelId,
  string[]
> = {
  cp: [
    "Français",
    "Mathématiques",
    "Questionner le monde",
    "EPS",
    "Arts plastiques",
    "Éducation musicale",
    "EMC",
  ],
  ce1: [
    "Français",
    "Mathématiques",
    "Questionner le monde",
    "EPS",
    "Arts plastiques",
    "Éducation musicale",
    "EMC",
  ],
  ce2: [
    "Français",
    "Mathématiques",
    "Questionner le monde",
    "EPS",
    "Arts plastiques",
    "Éducation musicale",
    "EMC",
  ],
  cm1: [
    "Français",
    "Mathématiques",
    "Sciences",
    "Histoire-Géographie",
    "EPS",
    "Arts plastiques",
    "Éducation musicale",
    "EMC",
  ],
  cm2: [
    "Français",
    "Mathématiques",
    "Sciences",
    "Histoire-Géographie",
    "EPS",
    "Arts plastiques",
    "Éducation musicale",
    "EMC",
  ],
};

export const TEACHER_PLANNING_WEEKLY_HOURS_TARGET = 24;

export const TEACHER_PLANNING_STORAGE_KEY =
  "academie-kerboeuf-emploi-du-temps-v2";

export const TEACHER_PLANNING_LEGACY_STORAGE_KEY =
  "academie-kerboeuf-emploi-du-temps-v1";

export type TeacherPlanningCellKey =
  `${TeacherPlanningDayId}__${TeacherPlanningSlotId}`;

export function buildTeacherPlanningCellKey(
  day: TeacherPlanningDayId,
  slot: TeacherPlanningSlotId,
): TeacherPlanningCellKey {
  return `${day}__${slot}`;
}

export type TeacherPlanningCell = {
  subject: string;
  durationId: TeacherPlanningDurationId;
};

export type TeacherPlanningAssignments = Partial<
  Record<TeacherPlanningCellKey, TeacherPlanningCell>
>;

export type TeacherPlanningState = {
  levelId: TeacherPlanningLevelId;
  assignments: TeacherPlanningAssignments;
  showWednesday: boolean;
};

export function getDurationHours(durationId: TeacherPlanningDurationId): number {
  return (
    teacherPlanningDurations.find((duration) => duration.id === durationId)
      ?.hours ?? 0
  );
}

export function createEmptyTeacherPlanningState(
  levelId: TeacherPlanningLevelId,
): TeacherPlanningState {
  return { levelId, assignments: {}, showWednesday: false };
}

/**
 * Best-effort migration from the v1 timetable (string-per-cell, 4 fixed
 * slot durations). Each v1 slot becomes a v2 cell with the closest
 * supported duration. Returns null if the legacy data is missing or
 * malformed, so the caller can fall back to a clean V2 start.
 */
export function migrateLegacyTeacherTimetable(
  raw: string,
): TeacherPlanningState | null {
  try {
    const parsed = JSON.parse(raw) as {
      levelId?: string;
      assignments?: Record<string, string>;
    };

    if (
      !parsed ||
      typeof parsed.levelId !== "string" ||
      typeof parsed.assignments !== "object" ||
      parsed.assignments === null
    ) {
      return null;
    }

    const levelId = parsed.levelId as TeacherPlanningLevelId;
    if (!teacherPlanningLevels.some((level) => level.id === levelId)) {
      return null;
    }

    const legacySlotDurationId: Record<TeacherPlanningSlotId, TeacherPlanningDurationId> = {
      "matin-1": "1h30",
      "matin-2": "1h30",
      "apres-midi-1": "1h30",
      "apres-midi-2": "1h",
    };

    const assignments: TeacherPlanningAssignments = {};
    for (const [key, subject] of Object.entries(parsed.assignments)) {
      if (typeof subject !== "string" || !subject) {
        continue;
      }
      const [dayId, slotId] = key.split("__") as [
        TeacherPlanningDayId,
        TeacherPlanningSlotId,
      ];
      if (
        !teacherPlanningDays.some((day) => day.id === dayId) &&
        dayId !== "mercredi"
      ) {
        continue;
      }
      if (!legacySlotDurationId[slotId]) {
        continue;
      }
      assignments[buildTeacherPlanningCellKey(dayId, slotId)] = {
        subject,
        durationId: legacySlotDurationId[slotId],
      };
    }

    return { levelId, assignments, showWednesday: false };
  } catch {
    return null;
  }
}
