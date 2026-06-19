import type { PublicStatusKey } from "@/content/public-status";

/**
 * Domaine partagé des planificateurs enseignant (programmation annuelle +
 * progression de période). Le site organise les compétences ; les PDF
 * enseignent. Aucun contenu pédagogique détaillé n'est stocké ici.
 */

export type TeacherLevel = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export type TeacherSubject = "francais" | "mathematiques" | "sciences";

export type TeacherPeriod =
  | "periode-1"
  | "periode-2"
  | "periode-3"
  | "periode-4"
  | "periode-5";

export type TeacherWeek =
  | "semaine-1"
  | "semaine-2"
  | "semaine-3"
  | "semaine-4"
  | "semaine-5"
  | "semaine-6"
  | "semaine-7";

export const teacherLevels: { id: TeacherLevel; label: string }[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export const teacherSubjects: { id: TeacherSubject; label: string }[] = [
  { id: "francais", label: "Français" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "sciences", label: "Sciences" },
];

export const teacherPeriods: { id: TeacherPeriod; label: string; shortLabel: string }[] = [
  { id: "periode-1", label: "Période 1", shortLabel: "P1" },
  { id: "periode-2", label: "Période 2", shortLabel: "P2" },
  { id: "periode-3", label: "Période 3", shortLabel: "P3" },
  { id: "periode-4", label: "Période 4", shortLabel: "P4" },
  { id: "periode-5", label: "Période 5", shortLabel: "P5" },
];

export const teacherWeeks: { id: TeacherWeek; label: string; optional?: boolean }[] = [
  { id: "semaine-1", label: "Semaine 1" },
  { id: "semaine-2", label: "Semaine 2" },
  { id: "semaine-3", label: "Semaine 3" },
  { id: "semaine-4", label: "Semaine 4" },
  { id: "semaine-5", label: "Semaine 5" },
  { id: "semaine-6", label: "Semaine 6" },
  { id: "semaine-7", label: "Semaine 7", optional: true },
];

/** Statut pédagogique de la compétence (pas l'existence d'un PDF). */
export type TeacherCompetencyStatus = PublicStatusKey;

export interface TeacherCompetency {
  id: string;
  level: TeacherLevel;
  subject: TeacherSubject;
  domain: string;
  title: string;
  skill: string;
  durationLabel: string;
  status: TeacherCompetencyStatus;
}

/**
 * Catalogue des compétences disponibles, indépendamment de leur placement.
 * Le placement (période, semaine, ordre) appartient uniquement aux outils
 * de planification et vit dans le localStorage de l'enseignant.
 */
export const teacherCompetencies: TeacherCompetency[] = [
  // --- CM2 — Français ---
  {
    id: "cm2-francais-lecture-1",
    level: "cm2",
    subject: "francais",
    domain: "Lecture et compréhension",
    title: "Comprendre un texte narratif long",
    skill: "Repérer les informations explicites et implicites d'un récit",
    durationLabel: "3 semaines",
    status: "available",
  },
  {
    id: "cm2-francais-grammaire-1",
    level: "cm2",
    subject: "francais",
    domain: "Grammaire",
    title: "Identifier les classes de mots",
    skill: "Distinguer nom, verbe, adjectif et déterminant dans une phrase",
    durationLabel: "2 semaines",
    status: "in-progress",
  },
  {
    id: "cm2-francais-conjugaison-imparfait",
    level: "cm2",
    subject: "francais",
    domain: "Conjugaison",
    title: "L'imparfait",
    skill: "Conjuguer à l'imparfait les verbes des trois groupes",
    durationLabel: "2 semaines",
    status: "available",
  },
  {
    id: "cm2-francais-conjugaison-futur-simple",
    level: "cm2",
    subject: "francais",
    domain: "Conjugaison",
    title: "Le futur simple",
    skill: "Conjuguer au futur simple les verbes des trois groupes",
    durationLabel: "2 semaines",
    status: "available",
  },
  {
    id: "cm2-francais-orthographe-accords",
    level: "cm2",
    subject: "francais",
    domain: "Orthographe",
    title: "Les accords dans le groupe nominal",
    skill: "Accorder en genre et en nombre dans un groupe nominal",
    durationLabel: "2 semaines",
    status: "in-progress",
  },
  {
    id: "cm2-francais-redaction-recit",
    level: "cm2",
    subject: "francais",
    domain: "Rédaction",
    title: "Écrire un récit structuré",
    skill: "Produire un récit cohérent avec une situation initiale, des péripéties et une fin",
    durationLabel: "3 semaines",
    status: "upcoming",
  },

  // --- CM2 — Mathématiques ---
  {
    id: "cm2-mathematiques-nombres-decimaux",
    level: "cm2",
    subject: "mathematiques",
    domain: "Nombres et calculs",
    title: "Les nombres décimaux",
    skill: "Comprendre et utiliser les nombres décimaux",
    durationLabel: "3 semaines",
    status: "upcoming",
  },
  {
    id: "cm2-mathematiques-geometrie-outils",
    level: "cm2",
    subject: "mathematiques",
    domain: "Géométrie",
    title: "Choisir le bon outil géométrique",
    skill: "Choisir l'instrument adapté à une construction géométrique",
    durationLabel: "2 semaines",
    status: "available",
  },
  {
    id: "cm2-mathematiques-operations-decimaux",
    level: "cm2",
    subject: "mathematiques",
    domain: "Nombres et calculs",
    title: "Additionner et soustraire des nombres décimaux",
    skill: "Poser et effectuer une addition ou une soustraction de nombres décimaux",
    durationLabel: "2 semaines",
    status: "in-progress",
  },
  {
    id: "cm2-mathematiques-mesures-aires",
    level: "cm2",
    subject: "mathematiques",
    domain: "Grandeurs et mesures",
    title: "Calculer l'aire d'une figure",
    skill: "Calculer l'aire d'un rectangle et d'un carré",
    durationLabel: "2 semaines",
    status: "upcoming",
  },
  {
    id: "cm2-mathematiques-proportionnalite",
    level: "cm2",
    subject: "mathematiques",
    domain: "Problèmes",
    title: "Résoudre des problèmes de proportionnalité",
    skill: "Identifier et résoudre une situation de proportionnalité",
    durationLabel: "2 semaines",
    status: "upcoming",
  },

  // --- CM2 — Sciences ---
  {
    id: "cm2-sciences-vivant",
    level: "cm2",
    subject: "sciences",
    domain: "Le vivant",
    title: "Les besoins des êtres vivants",
    skill: "Identifier les besoins nutritifs des êtres vivants",
    durationLabel: "2 semaines",
    status: "in-progress",
  },
  {
    id: "cm2-sciences-matiere",
    level: "cm2",
    subject: "sciences",
    domain: "La matière",
    title: "Les états de la matière",
    skill: "Distinguer les états solide, liquide et gazeux de la matière",
    durationLabel: "2 semaines",
    status: "upcoming",
  },
  {
    id: "cm2-sciences-energie",
    level: "cm2",
    subject: "sciences",
    domain: "L'énergie",
    title: "Identifier des sources d'énergie",
    skill: "Reconnaître quelques sources d'énergie et leurs usages",
    durationLabel: "2 semaines",
    status: "upcoming",
  },
  {
    id: "cm2-sciences-objets-techniques",
    level: "cm2",
    subject: "sciences",
    domain: "Les objets techniques",
    title: "Décrire le fonctionnement d'un objet technique",
    skill: "Identifier les principales fonctions d'un objet technique simple",
    durationLabel: "2 semaines",
    status: "upcoming",
  },

  // --- CE1 ---
  {
    id: "ce1-francais-lecture-1",
    level: "ce1",
    subject: "francais",
    domain: "Lecture et compréhension",
    title: "Comprendre un texte court",
    skill: "Répondre à des questions explicites sur un texte court",
    durationLabel: "2 semaines",
    status: "upcoming",
  },
  {
    id: "ce1-francais-conjugaison-1",
    level: "ce1",
    subject: "francais",
    domain: "Conjugaison",
    title: "Le présent des verbes en -er",
    skill: "Conjuguer au présent les verbes du 1er groupe",
    durationLabel: "2 semaines",
    status: "upcoming",
  },
  {
    id: "ce1-mathematiques-numeration-1",
    level: "ce1",
    subject: "mathematiques",
    domain: "Numération",
    title: "Les nombres jusqu'à 100",
    skill: "Comprendre la numération décimale jusqu'à 100",
    durationLabel: "2 semaines",
    status: "upcoming",
  },
  {
    id: "ce1-mathematiques-calcul-1",
    level: "ce1",
    subject: "mathematiques",
    domain: "Calcul",
    title: "Addition posée sans retenue",
    skill: "Poser et effectuer une addition sans retenue",
    durationLabel: "2 semaines",
    status: "upcoming",
  },
  {
    id: "ce1-sciences-vivant-1",
    level: "ce1",
    subject: "sciences",
    domain: "Le vivant",
    title: "Reconnaître les caractéristiques du vivant",
    skill: "Distinguer le vivant du non-vivant",
    durationLabel: "1 semaine",
    status: "upcoming",
  },
];

export function getCompetenciesByLevelAndSubject(
  level: TeacherLevel,
  subject: TeacherSubject,
): TeacherCompetency[] {
  return teacherCompetencies.filter(
    (item) => item.level === level && item.subject === subject,
  );
}

export function getCompetencyById(id: string): TeacherCompetency | undefined {
  return teacherCompetencies.find((item) => item.id === id);
}

// ---------------------------------------------------------------------------
// Programmation annuelle — placement par compétence dans une période.
// ---------------------------------------------------------------------------

export const PROGRAMMATION_STORAGE_KEY = "academie-kerboeuf-programmation-v2";
const PROGRAMMATION_STORAGE_KEY_V1 = "academie-kerboeuf-programmation-v1";

export interface ProgrammationPlacement {
  period: TeacherPeriod;
  order: number;
}

/** Placements isolés par niveau : niveau -> compétence -> placement. */
export type ProgrammationStore = Record<
  string,
  Record<string, ProgrammationPlacement>
>;

function isProgrammationPlacement(value: unknown): value is ProgrammationPlacement {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.period === "string" && typeof candidate.order === "number";
}

export function readProgrammationStore(): ProgrammationStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PROGRAMMATION_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object") {
        return parsed as ProgrammationStore;
      }
    }
  } catch {
    // ignore corrupted storage, fall through to migration/empty store
  }

  return migrateProgrammationV1();
}

/**
 * Migration douce v1 -> v2 : l'ancien format n'isolait pas par niveau.
 * Le niveau est déduit du préfixe de l'identifiant de compétence
 * (ex. "cm2-francais-..." -> "cm2"), qui n'a pas changé entre les versions.
 */
function migrateProgrammationV1(): ProgrammationStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PROGRAMMATION_STORAGE_KEY_V1);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};

    const migrated: ProgrammationStore = {};
    for (const [itemId, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (!isProgrammationPlacement(value)) continue;
      const competency = getCompetencyById(itemId);
      if (!competency) continue;
      migrated[competency.level] ??= {};
      migrated[competency.level][itemId] = value;
    }

    if (Object.keys(migrated).length > 0) {
      writeProgrammationStore(migrated);
    }
    return migrated;
  } catch {
    return {};
  }
}

export function writeProgrammationStore(store: ProgrammationStore) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROGRAMMATION_STORAGE_KEY, JSON.stringify(store));
}

// ---------------------------------------------------------------------------
// Progression de période — placement par compétence dans une semaine.
// ---------------------------------------------------------------------------

export const PROGRESSION_STORAGE_KEY = "academie-kerboeuf-progression-periode-v2";

export interface ProgressionPlacement {
  week: TeacherWeek;
  order: number;
}

/** Placements groupés par niveau + matière + période. */
export type ProgressionStore = Record<string, Record<string, ProgressionPlacement>>;

export function progressionGroupKey(
  level: TeacherLevel,
  subject: TeacherSubject,
  period: TeacherPeriod,
): string {
  return `${level}__${subject}__${period}`;
}

export function readProgressionStore(): ProgressionStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PROGRESSION_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") {
      return parsed as ProgressionStore;
    }
    return {};
  } catch {
    return {};
  }
}

export function writeProgressionStore(store: ProgressionStore) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROGRESSION_STORAGE_KEY, JSON.stringify(store));
}

// ---------------------------------------------------------------------------
// Emploi du temps hebdomadaire — domaine indépendant des planificateurs ci-dessus.
// ---------------------------------------------------------------------------

export type TeacherPlanningLevelId = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export type TeacherPlanningDayId =
  | "lundi"
  | "mardi"
  | "mercredi"
  | "jeudi"
  | "vendredi";

export type TeacherPlanningSlotId =
  | "matin-1"
  | "matin-2"
  | "apres-midi-1"
  | "apres-midi-2";

export type TeacherPlanningLevel = {
  id: TeacherPlanningLevelId;
  label: string;
};

export const teacherPlanningLevels: TeacherPlanningLevel[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export type TeacherPlanningDay = {
  id: TeacherPlanningDayId;
  label: string;
  isWednesday?: boolean;
};

export const teacherPlanningDays: TeacherPlanningDay[] = [
  { id: "lundi", label: "Lundi" },
  { id: "mardi", label: "Mardi" },
  { id: "jeudi", label: "Jeudi" },
  { id: "vendredi", label: "Vendredi" },
];

export const teacherPlanningWednesday: TeacherPlanningDay = {
  id: "mercredi",
  label: "Mercredi",
  isWednesday: true,
};

export type TeacherPlanningSlot = {
  id: TeacherPlanningSlotId;
  label: string;
};

export const teacherPlanningSlots: TeacherPlanningSlot[] = [
  { id: "matin-1", label: "Matin 1" },
  { id: "matin-2", label: "Matin 2" },
  { id: "apres-midi-1", label: "Après-midi 1" },
  { id: "apres-midi-2", label: "Après-midi 2" },
];

export const teacherPlanningWednesdaySlots: TeacherPlanningSlot[] = [
  { id: "matin-1", label: "Matin 1" },
  { id: "matin-2", label: "Matin 2" },
];

export type TeacherPlanningDurationId =
  | "30min"
  | "45min"
  | "1h"
  | "1h15"
  | "1h30";

export type TeacherPlanningDuration = {
  id: TeacherPlanningDurationId;
  label: string;
  hours: number;
};

export const teacherPlanningDurations: TeacherPlanningDuration[] = [
  { id: "30min", label: "30 min", hours: 0.5 },
  { id: "45min", label: "45 min", hours: 0.75 },
  { id: "1h", label: "1 h", hours: 1 },
  { id: "1h15", label: "1 h 15", hours: 1.25 },
  { id: "1h30", label: "1 h 30", hours: 1.5 },
];

export const teacherPlanningSubjectsByLevel: Record<
  TeacherPlanningLevelId,
  string[]
> = {
  cp: [
    "Français",
    "Mathématiques",
    "Questionner le monde",
    "EPS",
    "Arts plastiques",
    "Éducation musicale",
    "EMC",
  ],
  ce1: [
    "Français",
    "Mathématiques",
    "Questionner le monde",
    "EPS",
    "Arts plastiques",
    "Éducation musicale",
    "EMC",
  ],
  ce2: [
    "Français",
    "Mathématiques",
    "Questionner le monde",
    "EPS",
    "Arts plastiques",
    "Éducation musicale",
    "EMC",
  ],
  cm1: [
    "Français",
    "Mathématiques",
    "Sciences",
    "Histoire-Géographie",
    "EPS",
    "Arts plastiques",
    "Éducation musicale",
    "EMC",
  ],
  cm2: [
    "Français",
    "Mathématiques",
    "Sciences",
    "Histoire-Géographie",
    "EPS",
    "Arts plastiques",
    "Éducation musicale",
    "EMC",
  ],
};

export const TEACHER_PLANNING_WEEKLY_HOURS_TARGET = 24;

export const TEACHER_PLANNING_STORAGE_KEY =
  "academie-kerboeuf-emploi-du-temps-v2";

export const TEACHER_PLANNING_LEGACY_STORAGE_KEY =
  "academie-kerboeuf-emploi-du-temps-v1";

export type TeacherPlanningCellKey =
  `${TeacherPlanningDayId}__${TeacherPlanningSlotId}`;

export function buildTeacherPlanningCellKey(
  day: TeacherPlanningDayId,
  slot: TeacherPlanningSlotId,
): TeacherPlanningCellKey {
  return `${day}__${slot}`;
}

export type TeacherPlanningCell = {
  subject: string;
  durationId: TeacherPlanningDurationId;
};

export type TeacherPlanningAssignments = Partial<
  Record<TeacherPlanningCellKey, TeacherPlanningCell>
>;

export type TeacherPlanningState = {
  levelId: TeacherPlanningLevelId;
  assignments: TeacherPlanningAssignments;
  showWednesday: boolean;
};

export function getDurationHours(durationId: TeacherPlanningDurationId): number {
  return (
    teacherPlanningDurations.find((duration) => duration.id === durationId)
      ?.hours ?? 0
  );
}

export function createEmptyTeacherPlanningState(
  levelId: TeacherPlanningLevelId,
): TeacherPlanningState {
  return { levelId, assignments: {}, showWednesday: false };
}

/**
 * Best-effort migration from the v1 timetable (string-per-cell, 4 fixed
 * slot durations). Each v1 slot becomes a v2 cell with the closest
 * supported duration. Returns null if the legacy data is missing or
 * malformed, so the caller can fall back to a clean V2 start.
 */
export function migrateLegacyTeacherTimetable(
  raw: string,
): TeacherPlanningState | null {
  try {
    const parsed = JSON.parse(raw) as {
      levelId?: string;
      assignments?: Record<string, string>;
    };

    if (
      !parsed ||
      typeof parsed.levelId !== "string" ||
      typeof parsed.assignments !== "object" ||
      parsed.assignments === null
    ) {
      return null;
    }

    const levelId = parsed.levelId as TeacherPlanningLevelId;
    if (!teacherPlanningLevels.some((level) => level.id === levelId)) {
      return null;
    }

    const legacySlotDurationId: Record<TeacherPlanningSlotId, TeacherPlanningDurationId> = {
      "matin-1": "1h30",
      "matin-2": "1h30",
      "apres-midi-1": "1h30",
      "apres-midi-2": "1h",
    };

    const assignments: TeacherPlanningAssignments = {};
    for (const [key, subject] of Object.entries(parsed.assignments)) {
      if (typeof subject !== "string" || !subject) {
        continue;
      }
      const [dayId, slotId] = key.split("__") as [
        TeacherPlanningDayId,
        TeacherPlanningSlotId,
      ];
      if (
        !teacherPlanningDays.some((day) => day.id === dayId) &&
        dayId !== "mercredi"
      ) {
        continue;
      }
      if (!legacySlotDurationId[slotId]) {
        continue;
      }
      assignments[buildTeacherPlanningCellKey(dayId, slotId)] = {
        subject,
        durationId: legacySlotDurationId[slotId],
      };
    }

    return { levelId, assignments, showWednesday: false };
  } catch {
    return null;
  }
}
