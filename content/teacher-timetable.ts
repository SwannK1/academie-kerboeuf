export type TeacherTimetableLevelId = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export type TeacherTimetableDay = {
  id: string;
  label: string;
};

export type TeacherTimetableSlot = {
  id: string;
  label: string;
  durationHours: number;
};

export const teacherTimetableLevels: { id: TeacherTimetableLevelId; label: string }[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export const DEFAULT_TEACHER_TIMETABLE_DAYS: TeacherTimetableDay[] = [
  { id: "lundi", label: "Lundi" },
  { id: "mardi", label: "Mardi" },
  { id: "mercredi", label: "Mercredi" },
  { id: "jeudi", label: "Jeudi" },
  { id: "vendredi", label: "Vendredi" },
];

export const DEFAULT_TEACHER_TIMETABLE_SLOTS: TeacherTimetableSlot[] = [
  { id: "matin-1", label: "Matin 1", durationHours: 1.5 },
  { id: "matin-2", label: "Matin 2", durationHours: 1.5 },
  { id: "apres-midi-1", label: "Après-midi 1", durationHours: 1.5 },
  { id: "apres-midi-2", label: "Après-midi 2", durationHours: 1 },
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
};

export const subjectVisuals: Record<string, SubjectVisual> = {
  "Français": { emoji: "📖", colorKey: "jade" },
  "Mathématiques": { emoji: "🔢", colorKey: "sky" },
  "Questionner le monde": { emoji: "🔍", colorKey: "gold" },
  "EPS": { emoji: "🤸", colorKey: "ember" },
  "Arts": { emoji: "🎨", colorKey: "jade" },
  "Musique": { emoji: "🎵", colorKey: "sky" },
  "EMC": { emoji: "🤝", colorKey: "gold" },
  "Histoire-Géographie": { emoji: "🗺️", colorKey: "ember" },
  "Sciences": { emoji: "🔬", colorKey: "jade" },
};

export function getSubjectVisual(subject: string): SubjectVisual {
  return subjectVisuals[subject] ?? { emoji: "📌", colorKey: "sky" };
}

export const TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET = 24;

export const TEACHER_TIMETABLE_STORAGE_KEY = "academie-kerboeuf-emploi-du-temps-v2";

export type TeacherTimetableCellKey = `${string}__${string}`;

export function buildTeacherTimetableCellKey(dayId: string, slotId: string): TeacherTimetableCellKey {
  return `${dayId}__${slotId}`;
}

export type TeacherTimetableSession = {
  subject: string;
  durationHours: number;
};

export type TeacherTimetableAssignments = Partial<Record<TeacherTimetableCellKey, TeacherTimetableSession>>;

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
  assignments: TeacherTimetableAssignments;
};

export type TeacherTimetableState = {
  levelId: TeacherTimetableLevelId;
  days: TeacherTimetableDay[];
  slots: TeacherTimetableSlot[];
  weeks: TeacherTimetableWeek[];
  activeWeekId: string;
};

export function createTeacherTimetableId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function buildRecommendedAssignments(levelId: TeacherTimetableLevelId): TeacherTimetableAssignments {
  const isUpperLevel = levelId === "cm1" || levelId === "cm2";

  const entries: [string, string, string][] = isUpperLevel
    ? [
        ["lundi", "matin-1", "Français"],
        ["lundi", "matin-2", "Mathématiques"],
        ["lundi", "apres-midi-1", "Sciences"],
        ["lundi", "apres-midi-2", "Arts"],
        ["mardi", "matin-1", "Français"],
        ["mardi", "matin-2", "Mathématiques"],
        ["mardi", "apres-midi-1", "Histoire-Géographie"],
        ["mardi", "apres-midi-2", "EMC"],
        ["mercredi", "matin-1", "Français"],
        ["mercredi", "matin-2", "EPS"],
        ["jeudi", "matin-1", "Français"],
        ["jeudi", "matin-2", "Mathématiques"],
        ["jeudi", "apres-midi-1", "Histoire-Géographie"],
        ["jeudi", "apres-midi-2", "Musique"],
        ["vendredi", "matin-1", "Français"],
        ["vendredi", "matin-2", "Mathématiques"],
        ["vendredi", "apres-midi-1", "EPS"],
        ["vendredi", "apres-midi-2", "Arts"],
      ]
    : [
        ["lundi", "matin-1", "Français"],
        ["lundi", "matin-2", "Mathématiques"],
        ["lundi", "apres-midi-1", "Questionner le monde"],
        ["lundi", "apres-midi-2", "Arts"],
        ["mardi", "matin-1", "Français"],
        ["mardi", "matin-2", "Mathématiques"],
        ["mardi", "apres-midi-1", "EMC"],
        ["mardi", "apres-midi-2", "Musique"],
        ["mercredi", "matin-1", "Français"],
        ["mercredi", "matin-2", "EPS"],
        ["jeudi", "matin-1", "Français"],
        ["jeudi", "matin-2", "Mathématiques"],
        ["jeudi", "apres-midi-1", "Questionner le monde"],
        ["jeudi", "apres-midi-2", "Musique"],
        ["vendredi", "matin-1", "Français"],
        ["vendredi", "matin-2", "Mathématiques"],
        ["vendredi", "apres-midi-1", "EPS"],
        ["vendredi", "apres-midi-2", "Arts"],
      ];

  const slotDurations = new Map(
    DEFAULT_TEACHER_TIMETABLE_SLOTS.map((slot) => [slot.id, slot.durationHours]),
  );

  const assignments: TeacherTimetableAssignments = {};
  for (const [dayId, slotId, subject] of entries) {
    assignments[buildTeacherTimetableCellKey(dayId, slotId)] = {
      subject,
      durationHours: slotDurations.get(slotId) ?? 1,
    };
  }
  return assignments;
}

export function createInitialTeacherTimetableState(
  levelId: TeacherTimetableLevelId,
): TeacherTimetableState {
  const recommended = buildRecommendedAssignments(levelId);
  const referenceWeekId = createTeacherTimetableId("semaine");
  const realWeekId = createTeacherTimetableId("semaine");

  return {
    levelId,
    days: DEFAULT_TEACHER_TIMETABLE_DAYS.map((day) => ({ ...day })),
    slots: DEFAULT_TEACHER_TIMETABLE_SLOTS.map((slot) => ({ ...slot })),
    weeks: [
      {
        id: referenceWeekId,
        label: "Emploi du temps de référence",
        kind: "reference",
        assignments: recommended,
      },
      {
        id: realWeekId,
        label: "Semaine du lundi",
        kind: "reelle",
        assignments: { ...recommended },
      },
    ],
    activeWeekId: realWeekId,
  };
}

export function computeHoursBySubject(
  assignments: TeacherTimetableAssignments,
): Map<string, number> {
  const totals = new Map<string, number>();
  for (const session of Object.values(assignments)) {
    if (!session) continue;
    totals.set(session.subject, (totals.get(session.subject) ?? 0) + session.durationHours);
  }
  return totals;
}
