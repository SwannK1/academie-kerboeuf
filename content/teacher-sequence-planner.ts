export const TEACHER_SEQUENCE_PLANNER_STORAGE_KEY =
  "academie-kerboeuf-sequences-v1";

export type TeacherSequenceLevelId =
  | "cp"
  | "ce1"
  | "ce2"
  | "cm1"
  | "cm2"
  | "6e"
  | "5e"
  | "4e"
  | "3e";

export const teacherSequenceLevels: { id: TeacherSequenceLevelId; label: string }[] =
  [
    { id: "cp", label: "CP" },
    { id: "ce1", label: "CE1" },
    { id: "ce2", label: "CE2" },
    { id: "cm1", label: "CM1" },
    { id: "cm2", label: "CM2" },
    { id: "6e", label: "6e" },
    { id: "5e", label: "5e" },
    { id: "4e", label: "4e" },
    { id: "3e", label: "3e" },
  ];

export const teacherSequenceSubjects: string[] = [
  "Français",
  "Mathématiques",
  "Histoire-Géographie",
  "Sciences",
  "Questionner le monde",
  "EMC",
  "Langues vivantes",
  "Arts",
  "Musique",
  "EPS",
];

export type TeacherSequenceStatusId =
  | "a-preparer"
  | "en-cours"
  | "prete"
  | "terminee"
  | "a-reprendre";

export const teacherSequenceStatuses: {
  id: TeacherSequenceStatusId;
  label: string;
}[] = [
  { id: "a-preparer", label: "À préparer" },
  { id: "en-cours", label: "En cours" },
  { id: "prete", label: "Prête" },
  { id: "terminee", label: "Terminée" },
  { id: "a-reprendre", label: "À reprendre" },
];

export type TeacherSequenceStepKind =
  | "decouverte"
  | "entrainement"
  | "application"
  | "evaluation";

export const teacherSequenceStepKinds: {
  id: TeacherSequenceStepKind;
  label: string;
}[] = [
  { id: "decouverte", label: "Découverte" },
  { id: "entrainement", label: "Entraînement" },
  { id: "application", label: "Application" },
  { id: "evaluation", label: "Évaluation" },
];

export type TeacherSequenceStep = {
  id: string;
  kind: TeacherSequenceStepKind;
  description: string;
};

export type TeacherSequenceChecklistItem = {
  id: string;
  label: string;
  done: boolean;
};

export type TeacherSequence = {
  id: string;
  title: string;
  levelId: TeacherSequenceLevelId | "";
  subject: string;
  domain: string;
  competency: string;
  objective: string;
  period: string;
  duration: string;
  material: string;
  note: string;
  statusId: TeacherSequenceStatusId;
  steps: TeacherSequenceStep[];
  checklist: TeacherSequenceChecklistItem[];
  createdAt: string;
  updatedAt: string;
};

export function createEmptyTeacherSequence(): TeacherSequence {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: "",
    levelId: "",
    subject: teacherSequenceSubjects[0],
    domain: "",
    competency: "",
    objective: "",
    period: "",
    duration: "",
    material: "",
    note: "",
    statusId: "a-preparer",
    steps: [],
    checklist: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function duplicateTeacherSequence(
  sequence: TeacherSequence,
): TeacherSequence {
  const now = new Date().toISOString();
  return {
    ...sequence,
    id: crypto.randomUUID(),
    title: `${sequence.title} (copie)`,
    steps: sequence.steps.map((step) => ({ ...step, id: crypto.randomUUID() })),
    checklist: sequence.checklist.map((item) => ({
      ...item,
      id: crypto.randomUUID(),
    })),
    createdAt: now,
    updatedAt: now,
  };
}

export function getTeacherSequenceStatusLabel(
  statusId: TeacherSequenceStatusId,
): string {
  return (
    teacherSequenceStatuses.find((status) => status.id === statusId)?.label ??
    statusId
  );
}

export function getTeacherSequenceStepKindLabel(
  kind: TeacherSequenceStepKind,
): string {
  return (
    teacherSequenceStepKinds.find((stepKind) => stepKind.id === kind)?.label ??
    kind
  );
}

export function getTeacherSequenceLevelLabel(
  levelId: TeacherSequenceLevelId | "",
): string {
  if (!levelId) {
    return "";
  }
  return (
    teacherSequenceLevels.find((level) => level.id === levelId)?.label ?? ""
  );
}
