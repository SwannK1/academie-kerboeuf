"use client";

/**
 * Données de l'espace Direction : tâches, réunions itemisées, démarches.
 * Une seule clé locale. Aucune donnée nominative d'élève ou de famille.
 */

import { asArray, createId, createLocalStore, isRecord, useLocalStore } from "@/lib/workspace/store";
import { getMeetingKind, type MeetingKind } from "@/content/direction/catalog";

export const DIRECTION_KEY = "ak-direction-v1";

export type Task = {
  id: string;
  label: string;
  due: string | null;
  done: boolean;
  /** d'où vient la tâche : réunion, démarche, repère de l'année, ajout manuel */
  origin: { kind: "reunion" | "demarche" | "repere" | "manuel"; id?: string; label?: string };
};

export type ItemOutcome = "traite" | "decision" | "a-suivre";

export const ITEM_OUTCOMES: { id: ItemOutcome; label: string }[] = [
  { id: "traite", label: "Information" },
  { id: "decision", label: "Décidé" },
  { id: "a-suivre", label: "À suivre" },
];

export type MeetingItem = {
  id: string;
  label: string;
  minutes: number | null;
  included: boolean;
  outcome: ItemOutcome | null;
  decision: string;
  taskId: string | null;
};

export type Meeting = {
  id: string;
  kind: MeetingKind;
  number: number;
  date: string | null;
  items: MeetingItem[];
  createdAt: string;
};

export type ProcedureRun = { id: string; procedureId: string; choices: string[]; checked: string[]; createdAt: string };

export type DirectionState = {
  version: 1;
  tasks: Task[];
  meetings: Meeting[];
  runs: ProcedureRun[];
  /** repères de l'année déjà traités ou masqués */
  milestonesDone: string[];
};

const isStr = (v: unknown): v is string => typeof v === "string";

function parse(value: unknown): DirectionState | null {
  if (!isRecord(value) || value.version !== 1) return null;
  const tasks = (Array.isArray(value.tasks) ? value.tasks : []).filter(
    (t): t is Task => isRecord(t) && isStr(t.id) && isStr(t.label) && isRecord(t.origin),
  );
  const meetings = (Array.isArray(value.meetings) ? value.meetings : []).filter(
    (m): m is Meeting => isRecord(m) && isStr(m.id) && isStr(m.kind) && Array.isArray(m.items),
  );
  const runs = (Array.isArray(value.runs) ? value.runs : []).filter(
    (r): r is ProcedureRun => isRecord(r) && isStr(r.id) && isStr(r.procedureId) && Array.isArray(r.checked),
  );
  return { version: 1, tasks, meetings, runs, milestonesDone: asArray(value.milestonesDone, isStr) };
}

export const directionStore = createLocalStore<DirectionState>(
  DIRECTION_KEY,
  () => ({ version: 1, tasks: [], meetings: [], runs: [], milestonesDone: [] }),
  parse,
);

export function useDirection(): DirectionState | null {
  return useLocalStore(directionStore);
}

const update = directionStore.update;

// ── Tâches ────────────────────────────────────────────────────────────────

export function addTask(label: string, due: string | null, origin: Task["origin"] = { kind: "manuel" }): string {
  const id = createId("tache");
  update((s) => ({ ...s, tasks: [...s.tasks, { id, label, due, done: false, origin }] }));
  return id;
}

export function updateTask(id: string, patch: Partial<Omit<Task, "id">>) {
  update((s) => ({ ...s, tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)) }));
}

export function removeTask(id: string) {
  update((s) => ({ ...s, tasks: s.tasks.filter((t) => t.id !== id) }));
}

export function toggleMilestone(id: string) {
  update((s) => ({
    ...s,
    milestonesDone: s.milestonesDone.includes(id) ? s.milestonesDone.filter((m) => m !== id) : [...s.milestonesDone, id],
  }));
}

// ── Réunions ──────────────────────────────────────────────────────────────

function itemsFrom(labels: string[], included = true): MeetingItem[] {
  return labels.map((label) => ({
    id: createId("point"),
    label,
    minutes: 10,
    included,
    outcome: null,
    decision: "",
    taskId: null,
  }));
}

/**
 * Nouvelle réunion. Si une réunion du même type existe, sa structure est
 * reprise (points retenus et ordre) : « reprendre la réunion précédente ».
 */
export function createMeeting(kind: MeetingKind, fromPrevious = true): string {
  const id = createId("reunion");
  update((s) => {
    const same = s.meetings.filter((m) => m.kind === kind);
    const previous = same[same.length - 1];
    const items = fromPrevious && previous
      ? previous.items.map((item) => ({ ...item, id: createId("point"), outcome: null, decision: "", taskId: null }))
      : itemsFrom(getMeetingKind(kind).items);
    const meeting: Meeting = {
      id,
      kind,
      number: same.length + 1,
      date: null,
      items,
      createdAt: new Date().toISOString(),
    };
    return { ...s, meetings: [...s.meetings, meeting] };
  });
  return id;
}

export function updateMeeting(id: string, patch: Partial<Omit<Meeting, "id">>) {
  update((s) => ({ ...s, meetings: s.meetings.map((m) => (m.id === id ? { ...m, ...patch } : m)) }));
}

export function removeMeeting(id: string) {
  update((s) => ({ ...s, meetings: s.meetings.filter((m) => m.id !== id) }));
}

export function updateItem(meetingId: string, itemId: string, patch: Partial<Omit<MeetingItem, "id">>) {
  update((s) => ({
    ...s,
    meetings: s.meetings.map((m) =>
      m.id === meetingId ? { ...m, items: m.items.map((i) => (i.id === itemId ? { ...i, ...patch } : i)) } : m,
    ),
  }));
}

export function addItem(meetingId: string, label: string) {
  update((s) => ({
    ...s,
    meetings: s.meetings.map((m) => (m.id === meetingId ? { ...m, items: [...m.items, ...itemsFrom([label])] } : m)),
  }));
}

export function reorderItems(meetingId: string, orderedIds: string[]) {
  update((s) => ({
    ...s,
    meetings: s.meetings.map((m) => {
      if (m.id !== meetingId) return m;
      const byId = new Map(m.items.map((i) => [i.id, i]));
      const ordered = orderedIds.map((id) => byId.get(id)).filter((i): i is MeetingItem => Boolean(i));
      return { ...m, items: [...ordered, ...m.items.filter((i) => !orderedIds.includes(i.id))] };
    }),
  }));
}

/** Transforme un point de réunion en action de suivi du tableau de bord. */
export function itemToTask(meeting: Meeting, item: MeetingItem, due: string | null): string {
  const label = item.decision.trim() ? item.decision.trim() : `Suivi : ${item.label}`;
  const taskId = addTask(label, due, {
    kind: "reunion",
    id: meeting.id,
    label: `${getMeetingKind(meeting.kind).short} n°${meeting.number}`,
  });
  updateItem(meeting.id, item.id, { taskId, outcome: item.outcome ?? "a-suivre" });
  return taskId;
}

// ── Démarches ─────────────────────────────────────────────────────────────

export function startRun(procedureId: string, choices: string[] = []): string {
  const id = createId("demarche");
  update((s) => ({
    ...s,
    runs: [...s.runs, { id, procedureId, choices, checked: [], createdAt: new Date().toISOString() }],
  }));
  return id;
}

export function updateRun(id: string, patch: Partial<Omit<ProcedureRun, "id">>) {
  update((s) => ({ ...s, runs: s.runs.map((r) => (r.id === id ? { ...r, ...patch } : r)) }));
}

export function removeRun(id: string) {
  update((s) => ({ ...s, runs: s.runs.filter((r) => r.id !== id) }));
}
