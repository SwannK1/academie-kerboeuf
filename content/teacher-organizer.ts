import {
  teacherLevels,
  teacherPeriods,
  type TeacherLevel,
  type TeacherPeriod,
} from "@/content/teacher-planning";

export { teacherLevels, teacherPeriods };
export type { TeacherLevel, TeacherPeriod };

// ---------------------------------------------------------------------------
// Profil de classe — "Ma classe"
// ---------------------------------------------------------------------------

export const CLASS_PROFILE_STORAGE_KEY = "academie-kerboeuf-ma-classe-v1";

export interface TeacherClassProfile {
  level: TeacherLevel;
  className: string;
  studentCount: number | null;
  activePeriod: TeacherPeriod;
}

export const defaultClassProfile: TeacherClassProfile = {
  level: "cp",
  className: "",
  studentCount: null,
  activePeriod: "periode-1",
};

function isTeacherLevel(value: unknown): value is TeacherLevel {
  return teacherLevels.some((level) => level.id === value);
}

function isTeacherPeriod(value: unknown): value is TeacherPeriod {
  return teacherPeriods.some((period) => period.id === value);
}

export function readClassProfile(): TeacherClassProfile {
  if (typeof window === "undefined") return defaultClassProfile;
  try {
    const raw = window.localStorage.getItem(CLASS_PROFILE_STORAGE_KEY);
    if (!raw) return defaultClassProfile;

    const parsed = JSON.parse(raw) as Partial<TeacherClassProfile>;

    return {
      level: isTeacherLevel(parsed.level) ? parsed.level : defaultClassProfile.level,
      className:
        typeof parsed.className === "string"
          ? parsed.className.slice(0, 60)
          : defaultClassProfile.className,
      studentCount:
        typeof parsed.studentCount === "number" &&
        Number.isFinite(parsed.studentCount) &&
        parsed.studentCount >= 0
          ? Math.floor(parsed.studentCount)
          : defaultClassProfile.studentCount,
      activePeriod: isTeacherPeriod(parsed.activePeriod)
        ? parsed.activePeriod
        : defaultClassProfile.activePeriod,
    };
  } catch {
    return defaultClassProfile;
  }
}

export function writeClassProfile(profile: TeacherClassProfile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CLASS_PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

export function clearClassProfile() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CLASS_PROFILE_STORAGE_KEY);
}

// ---------------------------------------------------------------------------
// Tâches locales — bloc "À faire" du tableau de bord
// ---------------------------------------------------------------------------

export const ORGANIZER_TASKS_STORAGE_KEY = "academie-kerboeuf-organisateur-taches-v1";

export interface TeacherOrganizerTask {
  id: string;
  label: string;
  done: boolean;
  createdAt: number;
}

function isOrganizerTask(value: unknown): value is TeacherOrganizerTask {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.label === "string" &&
    typeof candidate.done === "boolean" &&
    typeof candidate.createdAt === "number"
  );
}

export function readOrganizerTasks(): TeacherOrganizerTask[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ORGANIZER_TASKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isOrganizerTask);
  } catch {
    return [];
  }
}

export function writeOrganizerTasks(tasks: TeacherOrganizerTask[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ORGANIZER_TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

// ---------------------------------------------------------------------------
// Liens — propagation du niveau / de la période active vers les outils
// ---------------------------------------------------------------------------

export function buildToolHref(
  path: string,
  profile: Pick<TeacherClassProfile, "level" | "activePeriod">,
): string {
  const params = new URLSearchParams();
  params.set("niveau", profile.level);
  params.set("periode", profile.activePeriod);
  return `${path}?${params.toString()}`;
}
