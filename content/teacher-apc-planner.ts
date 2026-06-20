/**
 * Données de base de l'outil de préparation des APC.
 *
 * Règle : aucun nom d'élève, aucune difficulté individuelle, aucun
 * diagnostic. Ce fichier décrit uniquement les axes, statuts et la
 * checklist générique d'une séance ou d'un cycle d'APC.
 */

export type ApcAxis =
  | "lecture"
  | "ecriture"
  | "mathematiques"
  | "methodologie"
  | "langage-oral"
  | "cooperation"
  | "autre";

export type ApcStatus = "a-preparer" | "pret" | "realise" | "a-reprendre";

export const apcAxes: { id: ApcAxis; label: string }[] = [
  { id: "lecture", label: "Lecture" },
  { id: "ecriture", label: "Écriture" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "methodologie", label: "Méthodologie" },
  { id: "langage-oral", label: "Langage oral" },
  { id: "cooperation", label: "Coopération" },
  { id: "autre", label: "Autre" },
];

export const apcStatuses: { id: ApcStatus; label: string }[] = [
  { id: "a-preparer", label: "À préparer" },
  { id: "pret", label: "Prêt" },
  { id: "realise", label: "Réalisé" },
  { id: "a-reprendre", label: "À reprendre" },
];

export const apcPeriods: { id: string; label: string }[] = [
  { id: "periode-1", label: "Période 1" },
  { id: "periode-2", label: "Période 2" },
  { id: "periode-3", label: "Période 3" },
  { id: "periode-4", label: "Période 4" },
  { id: "periode-5", label: "Période 5" },
];

export const apcChecklistTemplate: string[] = [
  "Objectif clair et limité",
  "Matériel prêt",
  "Déroulé minuté",
  "Trace ou bilan collectif prévu",
];

export interface ApcChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface ApcSession {
  id: string;
  title: string;
  level: string;
  axis: ApcAxis;
  objective: string;
  period: string;
  duration: string;
  material: string;
  outline: string;
  collectiveSummary: string;
  status: ApcStatus;
  checklist: ApcChecklistItem[];
  createdAt: string;
  updatedAt: string;
}

export function createEmptyApcSession(): ApcSession {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: "",
    level: "",
    axis: "lecture",
    objective: "",
    period: apcPeriods[0].id,
    duration: "",
    material: "",
    outline: "",
    collectiveSummary: "",
    status: "a-preparer",
    checklist: apcChecklistTemplate.map((label, index) => ({
      id: `checklist-${index}`,
      label,
      done: false,
    })),
    createdAt: now,
    updatedAt: now,
  };
}

export function duplicateApcSession(session: ApcSession): ApcSession {
  const now = new Date().toISOString();
  return {
    ...session,
    id: crypto.randomUUID(),
    title: `${session.title} (copie)`,
    status: "a-preparer",
    checklist: session.checklist.map((item) => ({ ...item, done: false })),
    createdAt: now,
    updatedAt: now,
  };
}
