export type TeacherTrackerLevel = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export const teacherTrackerLevels: { id: TeacherTrackerLevel; label: string }[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export type WorkStatus = "regulier" | "a-accompagner";

export const workStatusOptions: { id: WorkStatus; label: string }[] = [
  { id: "regulier", label: "Régulier" },
  { id: "a-accompagner", label: "À accompagner" },
];

export type AutonomyStatus = "acquise" | "en-cours";

export const autonomyStatusOptions: { id: AutonomyStatus; label: string }[] = [
  { id: "acquise", label: "Acquise" },
  { id: "en-cours", label: "En cours" },
];

export type BehaviorStatus = "serein" | "a-surveiller";

export const behaviorStatusOptions: { id: BehaviorStatus; label: string }[] = [
  { id: "serein", label: "Serein" },
  { id: "a-surveiller", label: "À surveiller" },
];

export type PriorityNeed = "lecture" | "ecriture" | "mathematiques" | "comportement" | "autre";

export const priorityNeedOptions: { id: PriorityNeed; label: string }[] = [
  { id: "lecture", label: "Lecture" },
  { id: "ecriture", label: "Écriture" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "comportement", label: "Comportement" },
  { id: "autre", label: "Autre" },
];

export type Observation = {
  id: string;
  date: string;
  text: string;
};

export type TrackedStudent = {
  id: string;
  name: string;
  work: WorkStatus;
  autonomy: AutonomyStatus;
  behavior: BehaviorStatus;
  priorityNeed: PriorityNeed;
  observations: Observation[];
};

export type ClassTrackerState = {
  level: TeacherTrackerLevel;
  students: TrackedStudent[];
};

export const defaultClassTrackerState: ClassTrackerState = {
  level: "cp",
  students: [],
};

export function createTrackedStudent(name: string): TrackedStudent {
  return {
    id: `eleve-${Math.random().toString(36).slice(2, 10)}`,
    name,
    work: "regulier",
    autonomy: "en-cours",
    behavior: "serein",
    priorityNeed: "autre",
    observations: [],
  };
}

export function createObservation(text: string): Observation {
  return {
    id: `obs-${Math.random().toString(36).slice(2, 10)}`,
    date: new Date().toISOString().slice(0, 10),
    text,
  };
}
