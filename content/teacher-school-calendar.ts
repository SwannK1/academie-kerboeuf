export const TEACHER_SCHOOL_CALENDAR_STORAGE_KEY =
  "academie-kerboeuf-calendrier-scolaire-v1";

export type TeacherCalendarEventCategoryId =
  | "periode"
  | "reunion"
  | "sortie"
  | "evaluation"
  | "conseil"
  | "rappel"
  | "autre";

export type TeacherCalendarEventCategory = {
  id: TeacherCalendarEventCategoryId;
  label: string;
};

export const teacherCalendarEventCategories: TeacherCalendarEventCategory[] = [
  { id: "periode", label: "Période" },
  { id: "reunion", label: "Réunion" },
  { id: "sortie", label: "Sortie" },
  { id: "evaluation", label: "Évaluation" },
  { id: "conseil", label: "Conseil" },
  { id: "rappel", label: "Rappel" },
  { id: "autre", label: "Autre" },
];

export type TeacherCalendarEvent = {
  id: string;
  date: string;
  title: string;
  note: string;
  category: TeacherCalendarEventCategoryId;
  done: boolean;
};

export type TeacherCalendarPeriodId = "p1" | "p2" | "p3" | "p4" | "p5";

export type TeacherCalendarPeriod = {
  id: TeacherCalendarPeriodId;
  label: string;
  startDate: string;
  endDate: string;
};

export const teacherCalendarPeriodIds: TeacherCalendarPeriodId[] = [
  "p1",
  "p2",
  "p3",
  "p4",
  "p5",
];

export const defaultTeacherCalendarPeriods: TeacherCalendarPeriod[] = [
  { id: "p1", label: "Période 1", startDate: "", endDate: "" },
  { id: "p2", label: "Période 2", startDate: "", endDate: "" },
  { id: "p3", label: "Période 3", startDate: "", endDate: "" },
  { id: "p4", label: "Période 4", startDate: "", endDate: "" },
  { id: "p5", label: "Période 5", startDate: "", endDate: "" },
];

export type TeacherSchoolCalendarState = {
  events: TeacherCalendarEvent[];
  periods: TeacherCalendarPeriod[];
};

export function getDefaultTeacherSchoolCalendarState(): TeacherSchoolCalendarState {
  return {
    events: [],
    periods: defaultTeacherCalendarPeriods.map((period) => ({ ...period })),
  };
}

export function createTeacherCalendarEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `event-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const teacherCalendarMonthLabels = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
