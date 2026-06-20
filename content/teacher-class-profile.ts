export type TeacherClassLevel = "CP" | "CE1" | "CE2" | "CM1" | "CM2";

export type TeacherClassPeriod = "P1" | "P2" | "P3" | "P4" | "P5";

export type TeacherClassProfile = {
  id: string;
  level: TeacherClassLevel;
  label: string;
  pupilCount: number;
  activePeriod: TeacherClassPeriod;
};

export const TEACHER_CLASS_PROFILE_STORAGE_KEY =
  "academie-kerboeuf-ma-classe-v1";

export const teacherClassLevels: TeacherClassLevel[] = [
  "CP",
  "CE1",
  "CE2",
  "CM1",
  "CM2",
];

export const teacherClassPeriods: { id: TeacherClassPeriod; label: string }[] = [
  { id: "P1", label: "Période 1" },
  { id: "P2", label: "Période 2" },
  { id: "P3", label: "Période 3" },
  { id: "P4", label: "Période 4" },
  { id: "P5", label: "Période 5" },
];

export function getDefaultTeacherClassProfile(): TeacherClassProfile {
  return {
    id: "ma-classe",
    level: "CM2",
    label: "",
    pupilCount: 24,
    activePeriod: "P1",
  };
}
