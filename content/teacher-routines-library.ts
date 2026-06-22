export const TEACHER_ROUTINES_STORAGE_KEY = "academie-kerboeuf-rituels-v1";

export type RoutineFrequency =
  | "quotidien"
  | "hebdomadaire"
  | "mensuel"
  | "ponctuel";

export type RoutineLevel =
  | "ps"
  | "ms"
  | "gs"
  | "cp"
  | "ce1"
  | "ce2"
  | "cm1"
  | "cm2";

export type RoutineDay =
  | "lundi"
  | "mardi"
  | "mercredi"
  | "jeudi"
  | "vendredi"
  | "samedi";

export type RoutineSubject =
  | "francais"
  | "mathematiques"
  | "questionner-le-monde"
  | "histoire-geographie"
  | "sciences"
  | "enseignement-moral-et-civique"
  | "arts"
  | "eps"
  | "langue-vivante"
  | "vie-de-classe";

export interface TeacherRoutine {
  id: string;
  title: string;
  frequency: RoutineFrequency;
  day: RoutineDay | null;
  level: RoutineLevel | null;
  subject: RoutineSubject | null;
  duration: string;
  instructions: string;
  materials: string;
  objective: string;
  active: boolean;
  createdAt: string;
}

export const routineFrequencyOptions: { id: RoutineFrequency; label: string }[] = [
  { id: "quotidien", label: "Quotidien" },
  { id: "hebdomadaire", label: "Hebdomadaire" },
  { id: "mensuel", label: "Mensuel" },
  { id: "ponctuel", label: "Ponctuel" },
];

export const routineDayOptions: { id: RoutineDay; label: string }[] = [
  { id: "lundi", label: "Lundi" },
  { id: "mardi", label: "Mardi" },
  { id: "mercredi", label: "Mercredi" },
  { id: "jeudi", label: "Jeudi" },
  { id: "vendredi", label: "Vendredi" },
  { id: "samedi", label: "Samedi" },
];

export const routineLevelOptions: { id: RoutineLevel; label: string }[] = [
  { id: "ps", label: "PS" },
  { id: "ms", label: "MS" },
  { id: "gs", label: "GS" },
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export const routineSubjectOptions: { id: RoutineSubject; label: string }[] = [
  { id: "francais", label: "Français" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "questionner-le-monde", label: "Questionner le monde" },
  { id: "histoire-geographie", label: "Histoire-géographie" },
  { id: "sciences", label: "Sciences" },
  { id: "enseignement-moral-et-civique", label: "Enseignement moral et civique" },
  { id: "arts", label: "Arts" },
  { id: "eps", label: "EPS" },
  { id: "langue-vivante", label: "Langue vivante" },
  { id: "vie-de-classe", label: "Vie de classe" },
];

export function createEmptyRoutine(): TeacherRoutine {
  return {
    id: "",
    title: "",
    frequency: "quotidien",
    day: null,
    level: null,
    subject: null,
    duration: "",
    instructions: "",
    materials: "",
    objective: "",
    active: true,
    createdAt: new Date().toISOString(),
  };
}

export function isTeacherRoutine(value: unknown): value is TeacherRoutine {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.frequency === "string" &&
    typeof candidate.duration === "string" &&
    typeof candidate.instructions === "string" &&
    typeof candidate.materials === "string" &&
    typeof candidate.objective === "string" &&
    typeof candidate.active === "boolean"
  );
}
