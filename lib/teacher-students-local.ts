/**
 * Liste d'élèves centrale — outil local pour l'espace enseignant.
 *
 * Stockage exclusivement en localStorage (aucun envoi serveur, aucun compte,
 * aucun Supabase). Cette liste est destinée à être réutilisée par d'autres
 * outils enseignants (plan de classe, groupes, etc.).
 */

import {
  isLocalStorageAvailable,
  isPlainObject,
  sanitizeObjectArray,
  writeLocalStorageJson,
} from "@/content/teacher-local-storage";

export const TEACHER_STUDENT_LIST_STORAGE_KEY =
  "academie-kerboeuf-teacher-student-list-v1";

export type TeacherStudentColorTagId =
  | "vert"
  | "orange"
  | "bleu"
  | "rose"
  | "jaune"
  | "gris";

export type TeacherStudentColorTag = {
  id: TeacherStudentColorTagId;
  label: string;
  hex: string;
};

export const teacherStudentColorTags: TeacherStudentColorTag[] = [
  { id: "vert", label: "Vert", hex: "#2f9e7a" },
  { id: "orange", label: "Orange", hex: "#d97742" },
  { id: "bleu", label: "Bleu", hex: "#3f6fb0" },
  { id: "rose", label: "Rose", hex: "#b04f9c" },
  { id: "jaune", label: "Jaune", hex: "#c9a227" },
  { id: "gris", label: "Gris", hex: "#5a7a5a" },
];

export function getTeacherStudentColorTag(
  id: string | undefined,
): TeacherStudentColorTag | undefined {
  return teacherStudentColorTags.find((tag) => tag.id === id);
}

export type TeacherStudent = {
  id: string;
  firstName: string;
  lastName?: string;
  group?: string;
  note?: string;
  colorTagId?: TeacherStudentColorTagId;
};

export function createTeacherStudentId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `eleve-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function teacherStudentDisplayName(student: TeacherStudent): string {
  return student.lastName
    ? `${student.firstName} ${student.lastName}`
    : student.firstName;
}

function isValidTeacherStudent(value: unknown): value is TeacherStudent {
  if (!isPlainObject(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.firstName === "string" &&
    value.firstName.trim().length > 0
  );
}

export function readTeacherStudentsChecked(): {
  students: TeacherStudent[];
  wasReset: boolean;
  storageAvailable: boolean;
} {
  const storageAvailable = isLocalStorageAvailable();
  if (!storageAvailable) {
    return { students: [], wasReset: false, storageAvailable };
  }
  try {
    const raw = window.localStorage.getItem(TEACHER_STUDENT_LIST_STORAGE_KEY);
    if (!raw) return { students: [], wasReset: false, storageAvailable };
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return { students: [], wasReset: true, storageAvailable };
    }
    const sanitized = sanitizeObjectArray<TeacherStudent>(parsed).filter(
      isValidTeacherStudent,
    );
    return {
      students: sanitized,
      wasReset: sanitized.length !== parsed.length,
      storageAvailable,
    };
  } catch {
    return { students: [], wasReset: true, storageAvailable };
  }
}

export function writeTeacherStudents(students: TeacherStudent[]): boolean {
  return writeLocalStorageJson(TEACHER_STUDENT_LIST_STORAGE_KEY, students);
}

export function moveTeacherStudent(
  students: TeacherStudent[],
  index: number,
  direction: -1 | 1,
): TeacherStudent[] {
  const target = index + direction;
  if (target < 0 || target >= students.length) return students;
  const next = [...students];
  const [moved] = next.splice(index, 1);
  next.splice(target, 0, moved);
  return next;
}

export const TEACHER_STUDENT_LIST_EXPORT_FORMAT_VERSION = 1;

export type TeacherStudentListExportFile = {
  formatVersion: number;
  exportedAt: string;
  students: TeacherStudent[];
};

export function buildTeacherStudentListExport(
  students: TeacherStudent[],
): TeacherStudentListExportFile {
  return {
    formatVersion: TEACHER_STUDENT_LIST_EXPORT_FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    students,
  };
}

/** Valide un fichier importé ; retourne `null` si la forme est reconnaissable. */
export function parseTeacherStudentListImport(
  raw: unknown,
): TeacherStudent[] | null {
  if (!isPlainObject(raw) || !Array.isArray(raw.students)) return null;
  return sanitizeObjectArray<TeacherStudent>(raw.students).filter(
    isValidTeacherStudent,
  );
}
