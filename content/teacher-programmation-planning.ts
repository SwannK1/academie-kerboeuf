import {
  curriculumSubjects,
  getSubjectsForLevel,
  type CurriculumCompetency,
  type SchoolLevel,
} from "@/content/teacher-programming-curriculum";

/**
 * Modèle de données de la programmation annuelle modulable.
 *
 * Deux familles de cartes partagent le même état par niveau :
 * - les cartes issues du catalogue de compétences (`assignments`, indexées
 *   par identifiant de compétence) ;
 * - les cartes libres ajoutées par l'enseignant (`freeItems`).
 *
 * Statuts locaux à l'outil de programmation, distincts des statuts publics
 * de visibilité gouvernés par `content/public-status.*`. Ne jamais router
 * ces statuts via la façade publique ni via PublicStatusBadge.
 */

export type PlanningPeriodNumber = 1 | 2 | 3 | 4 | 5;
export const planningPeriodNumbers: PlanningPeriodNumber[] = [1, 2, 3, 4, 5];

export type PlanningStatus =
  | "a-prevoir"
  | "pret"
  | "en-cours"
  | "termine"
  | "a-reprendre";

export const PLANNING_STATUSES: { id: PlanningStatus; label: string; className: string }[] = [
  { id: "a-prevoir", label: "À prévoir", className: "border-white/15 bg-white/[0.04] text-muted" },
  { id: "pret", label: "Prêt", className: "border-sky/40 bg-sky/10 text-sky" },
  { id: "en-cours", label: "En cours", className: "border-amber/40 bg-amber/10 text-amber" },
  { id: "termine", label: "Terminé", className: "border-jade/40 bg-jade/10 text-jade" },
  { id: "a-reprendre", label: "À reprendre", className: "border-ember/40 bg-ember/10 text-ember" },
];

export type PlanningPriority = "essential" | "important" | "optional";

export const PLANNING_PRIORITIES: { id: PlanningPriority; label: string }[] = [
  { id: "essential", label: "Essentiel" },
  { id: "important", label: "Important" },
  { id: "optional", label: "Optionnel" },
];

export type PlanningResourceStatus = "available" | "in-preparation" | "planned";

export const PLANNING_RESOURCE_STATUSES: { id: PlanningResourceStatus; label: string }[] = [
  { id: "available", label: "Ressource disponible" },
  { id: "in-preparation", label: "En préparation" },
  { id: "planned", label: "À venir" },
];

export interface PlanningAssignment {
  period: PlanningPeriodNumber;
  status: PlanningStatus;
  order: number;
  priority: PlanningPriority;
  dureeMinutes: number;
  teacherNote: string;
  hidden: boolean;
  resourceHref?: string;
  resourceStatus?: PlanningResourceStatus;
}

export type PlanningAssignments = Record<string, PlanningAssignment>;

export interface PlanningFreeItem {
  id: string;
  level: SchoolLevel;
  subject: string;
  subjectLabel: string;
  domain: string;
  title: string;
  period: PlanningPeriodNumber;
  order: number;
  status: PlanningStatus;
  priority: PlanningPriority;
  dureeMinutes: number;
  teacherNote: string;
  hidden: boolean;
  resourceHref?: string;
  resourceStatus?: PlanningResourceStatus;
}

export interface PlanningState {
  assignments: PlanningAssignments;
  freeItems: PlanningFreeItem[];
}

const STORAGE_KEY = "academie-kerboeuf-curriculum-planning-v2";
const STORAGE_KEY_V1 = "academie-kerboeuf-curriculum-planning-v1";

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

const V1_STATUS_MAP: Record<string, PlanningStatus> = {
  "a-programmer": "a-prevoir",
  prevu: "pret",
  "en-cours": "en-cours",
  termine: "termine",
};

type StoredAssignmentV1 = { period: number; status: string; order: number };

function migrateFromV1(): PlanningAssignments {
  const v1 = readJson<Record<string, StoredAssignmentV1>>(STORAGE_KEY_V1);
  if (!v1 || typeof v1 !== "object") {
    return {};
  }
  const result: PlanningAssignments = {};
  for (const [id, value] of Object.entries(v1)) {
    if (!value || typeof value.period !== "number") {
      continue;
    }
    result[id] = {
      period: value.period as PlanningPeriodNumber,
      status: V1_STATUS_MAP[value.status] ?? "a-prevoir",
      order: typeof value.order === "number" ? value.order : 0,
      priority: "important",
      dureeMinutes: 45,
      teacherNote: "",
      hidden: false,
    };
  }
  return result;
}

export function readPlanningState(): PlanningState {
  const v2 = readJson<PlanningState>(STORAGE_KEY);
  if (v2 && typeof v2 === "object") {
    return {
      assignments: v2.assignments ?? {},
      freeItems: Array.isArray(v2.freeItems) ? v2.freeItems : [],
    };
  }
  return { assignments: migrateFromV1(), freeItems: [] };
}

export function writePlanningState(state: PlanningState) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let freeItemCounter = 0;
export function nextFreeItemId(): string {
  freeItemCounter += 1;
  return `libre-${Date.now()}-${freeItemCounter}`;
}

/**
 * Représentation normalisée d'une carte placée (catalogue ou libre),
 * utilisée pour l'export vers la progression de période.
 */
export interface PlanningExportItem {
  sourceId: string;
  level: SchoolLevel;
  subject: string;
  subjectLabel: string;
  domain: string;
  domainLabel: string;
  title: string;
  competenceId: string;
  period: PlanningPeriodNumber;
  dureeMinutes: number;
  priority: PlanningPriority;
  teacherNote: string;
}

export function listPlanningExportItems(
  level: SchoolLevel,
  period: PlanningPeriodNumber,
): PlanningExportItem[] {
  const state = readPlanningState();
  const subjects = getSubjectsForLevel(level);
  const subjectLabelById = new Map(curriculumSubjects.map((s) => [s.id, s.label]));
  const domainLabelById = new Map<string, string>();
  subjects.forEach((subject) =>
    subject.domains.forEach((domain) => domainLabelById.set(domain.id, domain.label)),
  );
  const competencyById = new Map<string, CurriculumCompetency>();
  subjects.forEach((subject) =>
    subject.domains.forEach((domain) =>
      domain.competencies.forEach((competency) => competencyById.set(competency.id, competency)),
    ),
  );

  const items: PlanningExportItem[] = [];

  for (const [competencyId, assignment] of Object.entries(state.assignments)) {
    if (assignment.hidden || assignment.period !== period) {
      continue;
    }
    const competency = competencyById.get(competencyId);
    if (!competency || competency.level !== level) {
      continue;
    }
    items.push({
      sourceId: `competence-${competencyId}`,
      level,
      subject: competency.subjectId,
      subjectLabel: subjectLabelById.get(competency.subjectId) ?? competency.subjectId,
      domain: competency.domainId,
      domainLabel: domainLabelById.get(competency.domainId) ?? competency.domainId,
      title: competency.label,
      competenceId: competency.id,
      period,
      dureeMinutes: assignment.dureeMinutes,
      priority: assignment.priority,
      teacherNote: assignment.teacherNote,
    });
  }

  for (const item of state.freeItems) {
    if (item.hidden || item.period !== period || item.level !== level) {
      continue;
    }
    items.push({
      sourceId: `libre-${item.id}`,
      level,
      subject: item.subject,
      subjectLabel: item.subjectLabel,
      domain: item.domain,
      domainLabel: item.domain,
      title: item.title,
      competenceId: "",
      period,
      dureeMinutes: item.dureeMinutes,
      priority: item.priority,
      teacherNote: item.teacherNote,
    });
  }

  return items;
}
