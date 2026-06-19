export type TeacherTimetableLevelId = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export type TeacherTimetableDayId =
  | "lundi"
  | "mardi"
  | "mercredi"
  | "jeudi"
  | "vendredi";

export type TeacherTimetableSlotId =
  | "matin-1"
  | "matin-2"
  | "apres-midi-1"
  | "apres-midi-2";

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

export type TeacherTimetableSlot = {
  id: TeacherTimetableSlotId;
  label: string;
  durationHours: number;
};

export const teacherTimetableSlots: TeacherTimetableSlot[] = [
  { id: "matin-1", label: "Matin 1", durationHours: 1.5 },
  { id: "matin-2", label: "Matin 2", durationHours: 1.5 },
  { id: "apres-midi-1", label: "Après-midi 1", durationHours: 1.5 },
  { id: "apres-midi-2", label: "Après-midi 2", durationHours: 1 },
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

export const TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET = 24;

export const TEACHER_TIMETABLE_STORAGE_KEY =
  "academie-kerboeuf-emploi-du-temps-v1";

export type TeacherTimetableCellKey =
  `${TeacherTimetableDayId}__${TeacherTimetableSlotId}`;

export function buildTeacherTimetableCellKey(
  day: TeacherTimetableDayId,
  slot: TeacherTimetableSlotId,
): TeacherTimetableCellKey {
  return `${day}__${slot}`;
}

export type TeacherTimetableAssignments = Partial<
  Record<TeacherTimetableCellKey, string>
>;

export type TeacherTimetableState = {
  levelId: TeacherTimetableLevelId;
  assignments: TeacherTimetableAssignments;
};

const RECOMMENDED_CM2_ASSIGNMENTS: TeacherTimetableAssignments = {
  [buildTeacherTimetableCellKey("lundi", "matin-1")]: "Français",
  [buildTeacherTimetableCellKey("lundi", "matin-2")]: "Mathématiques",
  [buildTeacherTimetableCellKey("lundi", "apres-midi-1")]: "Sciences",
  [buildTeacherTimetableCellKey("lundi", "apres-midi-2")]: "Arts",

  [buildTeacherTimetableCellKey("mardi", "matin-1")]: "Français",
  [buildTeacherTimetableCellKey("mardi", "matin-2")]: "Mathématiques",
  [buildTeacherTimetableCellKey("mardi", "apres-midi-1")]: "Histoire-Géographie",
  [buildTeacherTimetableCellKey("mardi", "apres-midi-2")]: "EMC",

  [buildTeacherTimetableCellKey("mercredi", "matin-1")]: "Français",
  [buildTeacherTimetableCellKey("mercredi", "matin-2")]: "EPS",

  [buildTeacherTimetableCellKey("jeudi", "matin-1")]: "Français",
  [buildTeacherTimetableCellKey("jeudi", "matin-2")]: "Mathématiques",
  [buildTeacherTimetableCellKey("jeudi", "apres-midi-1")]: "Histoire-Géographie",
  [buildTeacherTimetableCellKey("jeudi", "apres-midi-2")]: "Musique",

  [buildTeacherTimetableCellKey("vendredi", "matin-1")]: "Français",
  [buildTeacherTimetableCellKey("vendredi", "matin-2")]: "Mathématiques",
  [buildTeacherTimetableCellKey("vendredi", "apres-midi-1")]: "EPS",
  [buildTeacherTimetableCellKey("vendredi", "apres-midi-2")]: "Arts",
};

export function getRecommendedTeacherTimetable(
  levelId: TeacherTimetableLevelId,
): TeacherTimetableState {
  if (levelId === "cm2" || levelId === "cm1") {
    return { levelId, assignments: { ...RECOMMENDED_CM2_ASSIGNMENTS } };
  }

  return {
    levelId,
    assignments: {
      [buildTeacherTimetableCellKey("lundi", "matin-1")]: "Français",
      [buildTeacherTimetableCellKey("lundi", "matin-2")]: "Mathématiques",
      [buildTeacherTimetableCellKey("lundi", "apres-midi-1")]: "Questionner le monde",
      [buildTeacherTimetableCellKey("lundi", "apres-midi-2")]: "Arts",

      [buildTeacherTimetableCellKey("mardi", "matin-1")]: "Français",
      [buildTeacherTimetableCellKey("mardi", "matin-2")]: "Mathématiques",
      [buildTeacherTimetableCellKey("mardi", "apres-midi-1")]: "EMC",
      [buildTeacherTimetableCellKey("mardi", "apres-midi-2")]: "Musique",

      [buildTeacherTimetableCellKey("mercredi", "matin-1")]: "Français",
      [buildTeacherTimetableCellKey("mercredi", "matin-2")]: "EPS",

      [buildTeacherTimetableCellKey("jeudi", "matin-1")]: "Français",
      [buildTeacherTimetableCellKey("jeudi", "matin-2")]: "Mathématiques",
      [buildTeacherTimetableCellKey("jeudi", "apres-midi-1")]: "Questionner le monde",
      [buildTeacherTimetableCellKey("jeudi", "apres-midi-2")]: "Musique",

      [buildTeacherTimetableCellKey("vendredi", "matin-1")]: "Français",
      [buildTeacherTimetableCellKey("vendredi", "matin-2")]: "Mathématiques",
      [buildTeacherTimetableCellKey("vendredi", "apres-midi-1")]: "EPS",
      [buildTeacherTimetableCellKey("vendredi", "apres-midi-2")]: "Arts",
    },
  };
}
