"use client";

/**
 * Données de l'espace Enseigner : une seule structure, dans une seule clé.
 *
 *   emploi du temps (slots) ─► semaine (sessions datées) ─► cahier journal
 *                                     │
 *                                     └─► progression (par notion)
 *
 * Aucune donnée élève. L'ancien emploi du temps (clé v3) est lu une seule
 * fois pour préremplir la semaine type ; il n'est jamais modifié.
 */

import { asArray, createId, createLocalStore, isRecord, useLocalStore } from "@/lib/workspace/store";
import {
  findNotion,
  getSubject,
  isMaternelle,
  isTeachLevel,
  type TeachLevel,
} from "@/lib/workspace/curriculum";
import { addDays, getPeriodFor, isHoliday, mondayOf, weekday, type Zone } from "@/lib/workspace/school-year";

export const TEACH_KEY = "ak-enseigner-v1";
const LEGACY_TIMETABLE_KEY = "academie-kerboeuf-emploi-du-temps-v3";

// ── Types ──────────────────────────────────────────────────────────────────

export type Slot = { id: string; day: number; start: number; duration: number; subject: string };

export type SessionKind = "decouverte" | "manipulation" | "entrainement" | "reinvestissement" | "evaluation";
export type Organisation = "collectif" | "individuel" | "binome" | "groupe" | "atelier";

export const SESSION_KINDS: { id: SessionKind; label: string }[] = [
  { id: "decouverte", label: "Découverte" },
  { id: "manipulation", label: "Manipulation" },
  { id: "entrainement", label: "Entraînement" },
  { id: "reinvestissement", label: "Réinvestissement" },
  { id: "evaluation", label: "Évaluation" },
];

export const ORGANISATIONS: { id: Organisation; label: string }[] = [
  { id: "collectif", label: "Collectif" },
  { id: "individuel", label: "Individuel" },
  { id: "binome", label: "Binôme" },
  { id: "groupe", label: "Groupes" },
  { id: "atelier", label: "Ateliers" },
];

export const DURATIONS = [15, 20, 30, 45, 60];

export type Session = {
  id: string;
  date: string;
  start: number;
  duration: number;
  level: TeachLevel;
  subject: string;
  domainId: string | null;
  notionId: string | null;
  notionLabel: string | null;
  kind: SessionKind | null;
  organisation: Organisation | null;
  resources: string[];
  note: string;
  done: boolean;
};

export type Template = Omit<Session, "id" | "date" | "start" | "done"> & { id: string; name: string };

export type ProgressState = "prevue" | "commencee" | "travaillee" | "a-reprendre" | "reportee";

export const PROGRESS_STATES: { id: ProgressState; label: string }[] = [
  { id: "prevue", label: "Prévue" },
  { id: "commencee", label: "Commencée" },
  { id: "travaillee", label: "Travaillée" },
  { id: "a-reprendre", label: "À reprendre" },
  { id: "reportee", label: "Reportée" },
];

/** period 0 = non planifiée */
export type Progress = { period: 0 | 1 | 2 | 3 | 4 | 5; state: ProgressState };

export type TeachState = {
  version: 1;
  schoolDays: number[];
  slots: Slot[];
  sessions: Session[];
  templates: Template[];
  progress: Record<string, Progress>;
  favorites: string[];
  dismissed: string[];
  /** l'emploi du temps a été confirmé ou modifié au moins une fois */
  timetableReady: boolean;
};

// ── Validation ─────────────────────────────────────────────────────────────

const isNum = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
const isStr = (v: unknown): v is string => typeof v === "string";

function isSlot(v: unknown): v is Slot {
  return isRecord(v) && isStr(v.id) && isNum(v.day) && isNum(v.start) && isNum(v.duration) && isStr(v.subject);
}

function toSession(v: unknown): Session | null {
  if (!isRecord(v) || !isStr(v.id) || !isStr(v.date) || !isNum(v.start) || !isNum(v.duration) || !isStr(v.subject)) return null;
  if (!isTeachLevel(v.level)) return null;
  return {
    id: v.id,
    date: v.date,
    start: v.start,
    duration: v.duration,
    level: v.level,
    subject: v.subject,
    domainId: isStr(v.domainId) ? v.domainId : null,
    notionId: isStr(v.notionId) ? v.notionId : null,
    notionLabel: isStr(v.notionLabel) ? v.notionLabel : null,
    kind: SESSION_KINDS.some((k) => k.id === v.kind) ? (v.kind as SessionKind) : null,
    organisation: ORGANISATIONS.some((o) => o.id === v.organisation) ? (v.organisation as Organisation) : null,
    resources: asArray(v.resources, isStr),
    note: isStr(v.note) ? v.note : "",
    done: v.done === true,
  };
}

function parseTeach(value: unknown): TeachState | null {
  if (!isRecord(value) || value.version !== 1) return null;
  const progress: Record<string, Progress> = {};
  if (isRecord(value.progress)) {
    for (const [id, p] of Object.entries(value.progress)) {
      if (isRecord(p) && isNum(p.period) && p.period >= 0 && p.period <= 5 && PROGRESS_STATES.some((s) => s.id === p.state)) {
        progress[id] = { period: p.period as Progress["period"], state: p.state as ProgressState };
      }
    }
  }
  return {
    version: 1,
    schoolDays: asArray(value.schoolDays, isNum).filter((d) => d >= 1 && d <= 5),
    slots: asArray(value.slots, isSlot),
    sessions: (Array.isArray(value.sessions) ? value.sessions : []).map(toSession).filter((s): s is Session => s !== null),
    templates: (Array.isArray(value.templates) ? value.templates : [])
      .map((t) => {
        const s = toSession({ ...(isRecord(t) ? t : {}), date: "", start: 0 });
        return s && isRecord(t) && isStr(t.name) ? ({ ...stripDated(s), id: s.id, name: t.name } as Template) : null;
      })
      .filter((t): t is Template => t !== null),
    progress,
    favorites: asArray(value.favorites, isStr),
    dismissed: asArray(value.dismissed, isStr),
    timetableReady: value.timetableReady === true,
  };
}

/** Champs réutilisables d'une séance ou d'un modèle (sans date ni état). */
export function stripDated(session: Omit<Session, "id" | "date" | "start" | "done">): Omit<Session, "id" | "date" | "start" | "done"> {
  return {
    duration: session.duration,
    level: session.level,
    subject: session.subject,
    domainId: session.domainId,
    notionId: session.notionId,
    notionLabel: session.notionLabel,
    kind: session.kind,
    organisation: session.organisation,
    resources: session.resources,
    note: session.note,
  };
}

// ── Semaine type recommandée ───────────────────────────────────────────────

const DAY_ID: Record<string, number> = { lundi: 1, mardi: 2, mercredi: 3, jeudi: 4, vendredi: 5 };
const LEGACY_SUBJECT: Record<string, string> = {
  "Français": "francais",
  "Mathématiques": "mathematiques",
  "Questionner le monde": "questionner-le-monde",
  "EPS": "eps",
  "Arts": "arts-plastiques",
  "Musique": "education-musicale",
  "EMC": "emc",
  "Histoire-Géographie": "histoire",
  "Sciences": "sciences-technologie",
};

export function recommendedSlots(level: TeachLevel, days: number[]): Slot[] {
  const day = (d: number, start: number, duration: number, subject: string): Slot => ({
    id: createId("creneau"),
    day: d,
    start,
    duration,
    subject,
  });
  const slots: Slot[] = [];
  for (const d of days) {
    if (isMaternelle(level)) {
      slots.push(
        day(d, 510, 30, "rituels"),
        day(d, 540, 45, "langage"),
        day(d, 600, 45, d % 2 ? "activite-physique" : "premiers-outils-mathematiques"),
        day(d, 810, 45, d % 2 ? "explorer-le-monde" : "activites-artistiques"),
      );
      continue;
    }
    const upper = level === "cm1" || level === "cm2";
    const afternoon: Record<number, [string, string]> = upper
      ? { 1: ["sciences-technologie", "arts-plastiques"], 2: ["histoire", "emc"], 3: ["eps", "langue-vivante"], 4: ["geographie", "education-musicale"], 5: ["eps", "langue-vivante"] }
      : { 1: ["questionner-le-monde", "arts-plastiques"], 2: ["eps", "emc"], 3: ["eps", "langue-vivante"], 4: ["questionner-le-monde", "education-musicale"], 5: ["eps", "langue-vivante"] };
    slots.push(
      day(d, 510, 60, "francais"),
      day(d, 570, 30, "francais"),
      day(d, 640, 60, "mathematiques"),
      day(d, 810, 60, afternoon[d][0]),
      day(d, 870, 45, afternoon[d][1]),
    );
  }
  return slots;
}

function readLegacyTimetable(): { slots: Slot[]; mercredi: boolean } | null {
  try {
    const raw = window.localStorage.getItem(LEGACY_TIMETABLE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as {
      config?: { mercrediEnabled?: boolean };
      weeks?: { kind?: string; sessions?: { dayId?: string; startMinutes?: number; durationMinutes?: number; subject?: string }[] }[];
    };
    const reference = data.weeks?.find((w) => w.kind === "reference") ?? data.weeks?.[0];
    if (!reference?.sessions?.length) return null;
    const slots = reference.sessions
      .filter((s) => s.dayId && DAY_ID[s.dayId] && isNum(s.startMinutes) && isNum(s.durationMinutes))
      .map((s) => ({
        id: createId("creneau"),
        day: DAY_ID[s.dayId as string],
        start: s.startMinutes as number,
        duration: s.durationMinutes as number,
        subject: LEGACY_SUBJECT[s.subject ?? ""] ?? "francais",
      }));
    return slots.length ? { slots, mercredi: data.config?.mercrediEnabled === true } : null;
  } catch {
    return null;
  }
}

function createDefaultTeach(): TeachState {
  const legacy = typeof window !== "undefined" ? readLegacyTimetable() : null;
  const schoolDays = legacy?.mercredi ? [1, 2, 3, 4, 5] : [1, 2, 4, 5];
  return {
    version: 1,
    schoolDays,
    slots: legacy?.slots ?? [],
    sessions: [],
    templates: [],
    progress: {},
    favorites: [],
    dismissed: [],
    timetableReady: Boolean(legacy),
  };
}

export const teachStore = createLocalStore<TeachState>(TEACH_KEY, createDefaultTeach, parseTeach);

export function useTeach(): TeachState | null {
  return useLocalStore(teachStore);
}

const update = teachStore.update;

// ── Emploi du temps ────────────────────────────────────────────────────────

export function applyRecommendedTimetable(level: TeachLevel) {
  update((s) => ({ ...s, slots: recommendedSlots(level, s.schoolDays), timetableReady: true }));
}

export function setSchoolDays(days: number[]) {
  update((s) => ({ ...s, schoolDays: [...days].sort(), slots: s.slots.filter((slot) => days.includes(slot.day)) }));
}

export function addSlot(slot: Omit<Slot, "id">): string {
  const id = createId("creneau");
  update((s) => ({ ...s, slots: [...s.slots, { ...slot, id }], timetableReady: true }));
  return id;
}

export function updateSlot(id: string, patch: Partial<Omit<Slot, "id">>) {
  update((s) => ({ ...s, slots: s.slots.map((slot) => (slot.id === id ? { ...slot, ...patch } : slot)), timetableReady: true }));
}

export function removeSlot(id: string) {
  update((s) => ({ ...s, slots: s.slots.filter((slot) => slot.id !== id) }));
}

export function duplicateSlotToDays(id: string, days: number[]) {
  update((s) => {
    const source = s.slots.find((slot) => slot.id === id);
    if (!source) return s;
    const copies = days
      .filter((d) => !s.slots.some((slot) => slot.day === d && slot.start === source.start))
      .map((d) => ({ ...source, id: createId("creneau"), day: d }));
    return { ...s, slots: [...s.slots, ...copies] };
  });
}

export function confirmTimetable() {
  update((s) => ({ ...s, timetableReady: true }));
}

// ── Séances ────────────────────────────────────────────────────────────────

export type SessionDraft = Partial<Omit<Session, "id">> & Pick<Session, "date" | "start" | "level" | "subject">;

export function createSession(draft: SessionDraft): string {
  const id = createId("seance");
  const session: Session = {
    id,
    duration: 30,
    domainId: null,
    notionId: null,
    notionLabel: null,
    kind: null,
    organisation: null,
    resources: [],
    note: "",
    done: false,
    ...draft,
  };
  update((s) => ({ ...s, sessions: [...s.sessions, session] }));
  return id;
}

export function updateSession(id: string, patch: Partial<Omit<Session, "id">>) {
  update((s) => ({ ...s, sessions: s.sessions.map((x) => (x.id === id ? { ...x, ...patch } : x)) }));
}

export function removeSession(id: string) {
  update((s) => ({ ...s, sessions: s.sessions.filter((x) => x.id !== id) }));
}

export function moveSession(id: string, date: string, start?: number) {
  updateSession(id, start === undefined ? { date } : { date, start });
}

export function duplicateSession(id: string, dates: string[]): number {
  let created = 0;
  update((s) => {
    const source = s.sessions.find((x) => x.id === id);
    if (!source) return s;
    const copies = dates.map((date) => ({ ...source, id: createId("seance"), date, done: false }));
    created = copies.length;
    return { ...s, sessions: [...s.sessions, ...copies] };
  });
  return created;
}

/** Terminer / rouvrir une séance ; la progression de la notion suit. */
export function toggleSessionDone(id: string, zone: Zone) {
  update((s) => {
    const session = s.sessions.find((x) => x.id === id);
    if (!session) return s;
    const done = !session.done;
    const sessions = s.sessions.map((x) => (x.id === id ? { ...x, done } : x));
    const progress = { ...s.progress };
    if (done && session.notionId) {
      const current = progress[session.notionId];
      const period = current?.period || getPeriodFor(session.date, zone).id;
      if (!current || current.state === "prevue" || current.state === "reportee") {
        progress[session.notionId] = { period, state: "commencee" };
      }
    }
    return { ...s, sessions, progress };
  });
}

export function toggleResource(sessionId: string, resourceId: string) {
  update((s) => ({
    ...s,
    sessions: s.sessions.map((x) =>
      x.id === sessionId
        ? {
            ...x,
            resources: x.resources.includes(resourceId)
              ? x.resources.filter((r) => r !== resourceId)
              : [...x.resources, resourceId],
          }
        : x,
    ),
  }));
}

// ── Journées et semaines ───────────────────────────────────────────────────

export function sessionsOn(state: TeachState, date: string): Session[] {
  return state.sessions.filter((s) => s.date === date).sort((a, b) => a.start - b.start);
}

/** Créneaux de la semaine type non encore occupés par une séance ce jour-là. */
export function freeSlotsOn(state: TeachState, date: string): Slot[] {
  const taken = sessionsOn(state, date);
  return state.slots
    .filter((slot) => slot.day === weekday(date))
    .filter((slot) => !taken.some((s) => s.start < slot.start + slot.duration && slot.start < s.start + s.duration))
    .sort((a, b) => a.start - b.start);
}

export function duplicateDay(from: string, to: string): number {
  let created = 0;
  update((s) => {
    const copies = sessionsOn(s, from).map((x) => ({ ...x, id: createId("seance"), date: to, done: false }));
    created = copies.length;
    return { ...s, sessions: [...s.sessions, ...copies] };
  });
  return created;
}

export function duplicateWeek(monday: string, weeks = 1): number {
  let created = 0;
  update((s) => {
    const end = addDays(monday, 7);
    const copies = s.sessions
      .filter((x) => x.date >= monday && x.date < end)
      .map((x) => ({ ...x, id: createId("seance"), date: addDays(x.date, 7 * weeks), done: false }));
    created = copies.length;
    return { ...s, sessions: [...s.sessions, ...copies] };
  });
  return created;
}

export function schoolDatesOfWeek(state: TeachState, monday: string): string[] {
  return state.schoolDays.map((d) => addDays(monday, d - 1));
}

export function nextSchoolDay(state: TeachState, date: string, zone: Zone): string {
  let next = addDays(date, 1);
  for (let i = 0; i < 30; i += 1) {
    if (state.schoolDays.includes(weekday(next)) && !isHoliday(next, zone)) return next;
    next = addDays(next, 1);
  }
  return addDays(date, 1);
}

/** Même jour de la semaine, chaque semaine, jusqu'à la fin de la période (hors vacances). */
export function remainingWeeklyDates(date: string, zone: Zone): string[] {
  const period = getPeriodFor(date, zone);
  const dates: string[] = [];
  for (let next = addDays(date, 7); next <= period.end; next = addDays(next, 7)) {
    if (!isHoliday(next, zone)) dates.push(next);
  }
  return dates;
}

// ── Modèles ────────────────────────────────────────────────────────────────

export function saveAsTemplate(sessionId: string): string | null {
  const state = teachStore.get();
  const session = state.sessions.find((s) => s.id === sessionId);
  if (!session) return null;
  const id = createId("modele");
  const name = session.notionLabel ?? getSubject(session.subject).label;
  update((s) => ({ ...s, templates: [...s.templates, { ...stripDated(session), id, name }] }));
  return id;
}

export function removeTemplate(id: string) {
  update((s) => ({ ...s, templates: s.templates.filter((t) => t.id !== id) }));
}

// ── Progression ────────────────────────────────────────────────────────────

export function setProgress(notionId: string, patch: Partial<Progress>) {
  update((s) => {
    const current = s.progress[notionId] ?? { period: 0, state: "prevue" as ProgressState };
    return { ...s, progress: { ...s.progress, [notionId]: { ...current, ...patch } } };
  });
}

// ── Favoris, suggestions ───────────────────────────────────────────────────

export function toggleFavorite(resourceId: string) {
  update((s) => ({
    ...s,
    favorites: s.favorites.includes(resourceId)
      ? s.favorites.filter((f) => f !== resourceId)
      : [...s.favorites, resourceId],
  }));
}

export function dismiss(hintId: string) {
  update((s) => ({ ...s, dismissed: [...s.dismissed, hintId] }));
}

export type HabitHint = { id: string; day: number; start: number; duration: number; subject: string; count: number };

/**
 * Habitude détectée : une même matière placée au même moment du même jour
 * sur au moins trois semaines différentes, sans créneau dans la semaine type.
 */
export function detectHabits(state: TeachState): HabitHint[] {
  const groups = new Map<string, { weeks: Set<string>; sample: Session }>();
  for (const session of state.sessions) {
    const key = `${weekday(session.date)}-${session.start}-${session.subject}`;
    const group = groups.get(key) ?? { weeks: new Set<string>(), sample: session };
    group.weeks.add(mondayOf(session.date));
    groups.set(key, group);
  }
  const hints: HabitHint[] = [];
  for (const [key, { weeks, sample }] of groups) {
    const day = weekday(sample.date);
    const covered = state.slots.some((slot) => slot.day === day && slot.start === sample.start && slot.subject === sample.subject);
    const id = `habitude-${key}`;
    if (weeks.size >= 3 && !covered && !state.dismissed.includes(id)) {
      hints.push({ id, day, start: sample.start, duration: sample.duration, subject: sample.subject, count: weeks.size });
    }
  }
  return hints;
}

/** Libellé court d'une séance : la notion si elle est choisie, sinon la matière. */
export function sessionTitle(session: Pick<Session, "notionLabel" | "subject" | "level" | "notionId">): string {
  if (session.notionLabel) return session.notionLabel;
  if (session.notionId) return findNotion(session.level, session.notionId)?.label ?? getSubject(session.subject).label;
  return getSubject(session.subject).label;
}
