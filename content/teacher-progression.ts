import type { SchoolLevel } from "@/content/teacher-programming-curriculum";
import type { PlanningPriority } from "@/content/teacher-programmation-planning";

/**
 * Progression de période — modèle de données partagé.
 *
 * Relié à la programmation annuelle (mêmes matières/domaines/compétences,
 * `content/teacher-programming-curriculum.ts`) mais totalement indépendant
 * du cahier journal et de l'emploi du temps : cet outil ne planifie pas de
 * créneaux horaires, il suit l'avancement de séquences sur un tableau Kanban.
 *
 * Statuts locaux à cet outil uniquement (distincts des statuts publics de
 * visibilité "disponible"/"bientôt"/"en construction" gouvernés par
 * content/public-status.*). Ne jamais router ces statuts via la façade
 * publique ni via PublicStatusBadge : ce sont deux systèmes différents.
 *
 * Aucune donnée nominative ou d'élève : uniquement carte / compétence /
 * matière / durée / statut.
 */

export type TeacherLevel = SchoolLevel;
export type TeacherSubjectId = string;

export type TeacherPeriod =
  | "periode-1"
  | "periode-2"
  | "periode-3"
  | "periode-4"
  | "periode-5";

export const teacherPeriods: { id: TeacherPeriod; label: string }[] = [
  { id: "periode-1", label: "Période 1" },
  { id: "periode-2", label: "Période 2" },
  { id: "periode-3", label: "Période 3" },
  { id: "periode-4", label: "Période 4" },
  { id: "periode-5", label: "Période 5" },
];

export function periodNumberFromId(periode: TeacherPeriod): 1 | 2 | 3 | 4 | 5 {
  return Number(periode.replace("periode-", "")) as 1 | 2 | 3 | 4 | 5;
}

export type SequenceStatus =
  | "a-prevoir"
  | "pret"
  | "en-cours"
  | "termine"
  | "a-reprendre";

export const SEQUENCE_STATUSES: { id: SequenceStatus; label: string }[] = [
  { id: "a-prevoir", label: "À prévoir" },
  { id: "pret", label: "Prêt" },
  { id: "en-cours", label: "En cours" },
  { id: "termine", label: "Terminé" },
  { id: "a-reprendre", label: "À reprendre" },
];

const STATUS_STYLES: Record<SequenceStatus, string> = {
  "a-prevoir": "border-white/20 bg-white/5 text-muted",
  pret: "border-sky-400/50 bg-sky-400/10 text-sky-300",
  "en-cours": "border-gold/50 bg-gold/10 text-gold",
  termine: "border-jade/50 bg-jade/10 text-jade",
  "a-reprendre": "border-ember/50 bg-ember/10 text-ember",
};

export function statusClassName(status: SequenceStatus): string {
  return STATUS_STYLES[status];
}

export interface PeriodCard {
  id: string;
  niveau: TeacherLevel;
  periode: TeacherPeriod;
  matiere: TeacherSubjectId;
  domaine: string;
  /** Identifiant de compétence du catalogue, vide pour une carte libre. */
  competenceId: string;
  competenceLabel: string;
  dureeMinutes: number;
  statut: SequenceStatus;
  /**
   * Référence vers de vrais imprimables disponibles pour cette carte.
   * Toujours vide aujourd'hui : aucune liaison réelle n'existe entre le
   * catalogue de compétences et les PDF de leçon par niveau/sous-domaine.
   */
  imprimablesDisponibles: { label: string; href: string }[];
  priority: PlanningPriority;
  /** Identifiant de la carte d'origine dans la programmation annuelle, si importée. */
  sourceProgrammationId?: string;
  objectif?: string;
  nombreSeances?: number;
  tracesPrevues?: string;
  evaluationPrevue?: string;
  differenciation?: string;
  noteEnseignant?: string;
}

type StoredStateV3 = {
  cards: PeriodCard[];
};

type StoredStateV2 = {
  sequences: Array<{
    id: string;
    niveau: TeacherLevel;
    periode: TeacherPeriod;
    matiere: TeacherSubjectId;
    domaine: string;
    competenceId: string;
    competenceLabel: string;
    titre?: string;
    dureeMinutes: number;
    statut: "a-programmer" | "prevu" | "en-cours" | "termine";
  }>;
};

const STORAGE_KEY_V3 = "progression-periode-kanban-v3";
const STORAGE_KEY_V2 = "progression-periode-v2";

const V2_TO_V3_STATUS: Record<string, SequenceStatus> = {
  "a-programmer": "a-prevoir",
  prevu: "pret",
  "en-cours": "en-cours",
  termine: "termine",
};

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function migrateFromV2(): PeriodCard[] {
  const v2 = readJson<StoredStateV2>(STORAGE_KEY_V2);
  if (!v2 || !Array.isArray(v2.sequences) || v2.sequences.length === 0) {
    return [];
  }
  return v2.sequences.map((sequence) => ({
    id: `migrated-${sequence.id}`,
    niveau: sequence.niveau,
    periode: sequence.periode,
    matiere: sequence.matiere,
    domaine: sequence.domaine,
    competenceId: sequence.competenceId,
    competenceLabel: sequence.competenceLabel,
    dureeMinutes: sequence.dureeMinutes,
    statut: V2_TO_V3_STATUS[sequence.statut] ?? "a-prevoir",
    imprimablesDisponibles: [],
    priority: "important" as PlanningPriority,
  }));
}

export function readStoredCards(): PeriodCard[] {
  const v3 = readJson<StoredStateV3>(STORAGE_KEY_V3);
  if (v3 && Array.isArray(v3.cards)) {
    return v3.cards.map((card) => ({ ...card, priority: card.priority ?? "important" }));
  }
  return migrateFromV2();
}

export function writeStoredCards(cards: PeriodCard[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    STORAGE_KEY_V3,
    JSON.stringify({ cards } satisfies StoredStateV3),
  );
}

let cardCounter = 0;
export function nextCardId(): string {
  cardCounter += 1;
  return `carte-${Date.now()}-${cardCounter}`;
}
