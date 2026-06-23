export const TEACHER_PRINT_QUEUE_STORAGE_KEY = "academie-kerboeuf-photocopies-v1";

export type TeacherPrintQueueStatus =
  | "a-preparer"
  | "a-imprimer"
  | "imprime"
  | "distribue";

export type TeacherPrintQueueSides = "recto" | "recto-verso";

export type TeacherPrintQueueColor = "couleur" | "noir-et-blanc";

export type TeacherPrintQueueItem = {
  id: string;
  title: string;
  subject?: string;
  level?: string;
  pageCount: number;
  copyCount: number;
  sides: TeacherPrintQueueSides;
  color: TeacherPrintQueueColor;
  desiredDate?: string;
  note?: string;
  status: TeacherPrintQueueStatus;
  createdAt: string;
};

export type TeacherPrintQueueStatusFilter = "tous" | TeacherPrintQueueStatus;

export const teacherPrintQueueStatuses: {
  id: TeacherPrintQueueStatus;
  label: string;
}[] = [
  { id: "a-preparer", label: "À préparer" },
  { id: "a-imprimer", label: "À imprimer" },
  { id: "imprime", label: "Imprimé" },
  { id: "distribue", label: "Distribué" },
];

export function getTeacherPrintQueueStatusLabel(
  status: TeacherPrintQueueStatus,
): string {
  return (
    teacherPrintQueueStatuses.find((entry) => entry.id === status)?.label ??
    status
  );
}

export function computeTeacherPrintQueueSheetCount(
  pageCount: number,
  copyCount: number,
  sides: TeacherPrintQueueSides,
): number {
  const sheetsPerCopy =
    sides === "recto-verso" ? Math.ceil(pageCount / 2) : pageCount;
  return sheetsPerCopy * copyCount;
}

export function createTeacherPrintQueueId(): string {
  return `photocopie-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
