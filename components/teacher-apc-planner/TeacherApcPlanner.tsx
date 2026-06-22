"use client";

import { useEffect, useMemo, useState } from "react";
import {
  apcAxes,
  apcPeriods,
  apcStatuses,
  createEmptyApcSession,
  duplicateApcSession,
  type ApcAxis,
  type ApcSession,
  type ApcStatus,
} from "@/content/teacher-apc-planner";

const STORAGE_KEY = "academie-kerboeuf-apc-v1";

function readStoredSessions(): ApcSession[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed as ApcSession[];
  } catch {
    return [];
  }
}

function writeStoredSessions(sessions: ApcSession[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

const statusLabel: Record<ApcStatus, string> = Object.fromEntries(
  apcStatuses.map((status) => [status.id, status.label]),
) as Record<ApcStatus, string>;

const axisLabel: Record<ApcAxis, string> = Object.fromEntries(
  apcAxes.map((axis) => [axis.id, axis.label]),
) as Record<ApcAxis, string>;

export function TeacherApcPlanner() {
  const [sessions, setSessions] = useState<ApcSession[]>(() =>
    readStoredSessions(),
  );
  const [search, setSearch] = useState("");
  const [axisFilter, setAxisFilter] = useState<ApcAxis | "all">("all");
  const [periodFilter, setPeriodFilter] = useState<string | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ApcStatus | "all">("all");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    writeStoredSessions(sessions);
  }, [sessions]);

  const visibleSessions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return sessions
      .filter((session) =>
        axisFilter === "all" ? true : session.axis === axisFilter,
      )
      .filter((session) =>
        periodFilter === "all" ? true : session.period === periodFilter,
      )
      .filter((session) =>
        statusFilter === "all" ? true : session.status === statusFilter,
      )
      .filter((session) =>
        query === ""
          ? true
          : [session.title, session.objective, session.level]
              .join(" ")
              .toLowerCase()
              .includes(query),
      )
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [sessions, axisFilter, periodFilter, statusFilter, search]);

  const editingSession = useMemo(
    () => sessions.find((session) => session.id === editingId) ?? null,
    [sessions, editingId],
  );

  function createSession() {
    const session = createEmptyApcSession();
    setSessions((current) => [session, ...current]);
    setEditingId(session.id);
  }

  function updateSession(id: string, patch: Partial<ApcSession>) {
    setSessions((current) =>
      current.map((session) =>
        session.id === id
          ? { ...session, ...patch, updatedAt: new Date().toISOString() }
          : session,
      ),
    );
  }

  function toggleChecklistItem(sessionId: string, itemId: string) {
    setSessions((current) =>
      current.map((session) => {
        if (session.id !== sessionId) {
          return session;
        }
        return {
          ...session,
          updatedAt: new Date().toISOString(),
          checklist: session.checklist.map((item) =>
            item.id === itemId ? { ...item, done: !item.done } : item,
          ),
        };
      }),
    );
  }

  function deleteSession(id: string) {
    setSessions((current) => current.filter((session) => session.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  }

  function duplicateSession(id: string) {
    const session = sessions.find((entry) => entry.id === id);
    if (!session) {
      return;
    }
    const copy = duplicateApcSession(session);
    setSessions((current) => [copy, ...current]);
  }

  return (
    <div className="print:text-black">
      <section
        aria-labelledby="apc-actions-titre"
        className="flex flex-wrap items-center justify-between gap-3 print:hidden"
      >
        <h2 id="apc-actions-titre" className="text-xl font-black text-foreground">
          Mes séances et cycles d&apos;APC
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={createSession}
            className="min-h-11 rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-bold text-jade transition hover:bg-jade/20"
          >
            + Nouvelle séance ou cycle
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-sky/40"
          >
            Imprimer
          </button>
        </div>
      </section>

      <section
        aria-labelledby="apc-filtres-titre"
        className="mt-6 grid gap-3 print:hidden sm:grid-cols-2 lg:grid-cols-4"
      >
        <h2 id="apc-filtres-titre" className="sr-only">
          Rechercher et filtrer
        </h2>
        <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
          Recherche
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Titre, objectif, niveau…"
            className="min-h-11 rounded-md border border-white/15 bg-background/40 px-3 text-sm text-foreground"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
          Axe
          <select
            value={axisFilter}
            onChange={(event) =>
              setAxisFilter(event.target.value as ApcAxis | "all")
            }
            className="min-h-11 rounded-md border border-white/15 bg-background/40 px-3 text-sm text-foreground"
          >
            <option value="all">Tous les axes</option>
            {apcAxes.map((axis) => (
              <option key={axis.id} value={axis.id}>
                {axis.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
          Période
          <select
            value={periodFilter}
            onChange={(event) => setPeriodFilter(event.target.value)}
            className="min-h-11 rounded-md border border-white/15 bg-background/40 px-3 text-sm text-foreground"
          >
            <option value="all">Toutes les périodes</option>
            {apcPeriods.map((period) => (
              <option key={period.id} value={period.id}>
                {period.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
          Statut
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as ApcStatus | "all")
            }
            className="min-h-11 rounded-md border border-white/15 bg-background/40 px-3 text-sm text-foreground"
          >
            <option value="all">Tous les statuts</option>
            {apcStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      {visibleSessions.length === 0 ? (
        <p className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
          Aucune séance ou cycle d&apos;APC pour ces filtres. Créez-en un avec le
          bouton ci-dessus.
        </p>
      ) : (
        <ul className="mt-8 grid gap-4" role="list">
          {visibleSessions.map((session) => (
            <li
              key={session.id}
              className="rounded-lg border border-white/10 bg-background/40 p-4 print:break-inside-avoid print:border-black"
            >
              {editingSession?.id === session.id ? (
                <ApcSessionForm
                  session={session}
                  onChange={(patch) => updateSession(session.id, patch)}
                  onToggleChecklistItem={(itemId) =>
                    toggleChecklistItem(session.id, itemId)
                  }
                  onClose={() => setEditingId(null)}
                />
              ) : (
                <ApcSessionSummary
                  session={session}
                  onEdit={() => setEditingId(session.id)}
                  onDuplicate={() => duplicateSession(session.id)}
                  onDelete={() => deleteSession(session.id)}
                  onToggleChecklistItem={(itemId) =>
                    toggleChecklistItem(session.id, itemId)
                  }
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ApcSessionSummary({
  session,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleChecklistItem,
}: {
  session: ApcSession;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onToggleChecklistItem: (itemId: string) => void;
}) {
  const periodLabel = apcPeriods.find((p) => p.id === session.period)?.label;
  const doneCount = session.checklist.filter((item) => item.done).length;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-sky">
            {axisLabel[session.axis]}
          </p>
          <h3 className="mt-1 text-lg font-black text-foreground">
            {session.title || "Sans titre"}
          </h3>
          <p className="mt-1 text-xs text-muted">
            {[session.level, periodLabel, session.duration]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-foreground">
          {statusLabel[session.status]}
        </span>
      </div>

      {session.objective ? (
        <p className="mt-3 text-sm leading-6 text-muted">{session.objective}</p>
      ) : null}

      {session.checklist.length > 0 ? (
        <ul className="mt-3 flex flex-col gap-1.5 print:hidden" role="list">
          {session.checklist.map((item) => (
            <li key={item.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => onToggleChecklistItem(item.id)}
                className="h-4 w-4 rounded border-white/30"
                id={`${session.id}-${item.id}`}
              />
              <label
                htmlFor={`${session.id}-${item.id}`}
                className={item.done ? "text-muted line-through" : "text-foreground"}
              >
                {item.label}
              </label>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-1 text-xs text-muted print:hidden">
        {doneCount}/{session.checklist.length} vérifié(s)
      </p>

      <div className="mt-3 flex flex-wrap gap-2 print:hidden">
        <button
          type="button"
          onClick={onEdit}
          className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-jade/40"
        >
          Modifier
        </button>
        <button
          type="button"
          onClick={onDuplicate}
          className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-sky/40"
        >
          Dupliquer
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-muted transition hover:border-rose/40 hover:text-rose"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

function ApcSessionForm({
  session,
  onChange,
  onToggleChecklistItem,
  onClose,
}: {
  session: ApcSession;
  onChange: (patch: Partial<ApcSession>) => void;
  onToggleChecklistItem: (itemId: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="grid gap-3">
      <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
        Titre
        <input
          type="text"
          value={session.title}
          onChange={(event) => onChange({ title: event.target.value })}
          className="min-h-11 rounded-md border border-white/15 bg-background/40 px-3 text-sm text-foreground"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
          Niveau (facultatif)
          <input
            type="text"
            value={session.level}
            onChange={(event) => onChange({ level: event.target.value })}
            placeholder="Ex. CE1"
            className="min-h-11 rounded-md border border-white/15 bg-background/40 px-3 text-sm text-foreground"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
          Axe
          <select
            value={session.axis}
            onChange={(event) =>
              onChange({ axis: event.target.value as ApcAxis })
            }
            className="min-h-11 rounded-md border border-white/15 bg-background/40 px-3 text-sm text-foreground"
          >
            {apcAxes.map((axis) => (
              <option key={axis.id} value={axis.id}>
                {axis.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
        Objectif
        <textarea
          value={session.objective}
          onChange={(event) => onChange({ objective: event.target.value })}
          rows={2}
          className="rounded-md border border-white/15 bg-background/40 px-3 py-2 text-sm text-foreground"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
          Période
          <select
            value={session.period}
            onChange={(event) => onChange({ period: event.target.value })}
            className="min-h-11 rounded-md border border-white/15 bg-background/40 px-3 text-sm text-foreground"
          >
            {apcPeriods.map((period) => (
              <option key={period.id} value={period.id}>
                {period.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
          Durée
          <input
            type="text"
            value={session.duration}
            onChange={(event) => onChange({ duration: event.target.value })}
            placeholder="Ex. 30 min"
            className="min-h-11 rounded-md border border-white/15 bg-background/40 px-3 text-sm text-foreground"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
        Matériel
        <textarea
          value={session.material}
          onChange={(event) => onChange({ material: event.target.value })}
          rows={2}
          className="rounded-md border border-white/15 bg-background/40 px-3 py-2 text-sm text-foreground"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
        Déroulé
        <textarea
          value={session.outline}
          onChange={(event) => onChange({ outline: event.target.value })}
          rows={4}
          className="rounded-md border border-white/15 bg-background/40 px-3 py-2 text-sm text-foreground"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
        Trace ou bilan collectif
        <textarea
          value={session.collectiveSummary}
          onChange={(event) =>
            onChange({ collectiveSummary: event.target.value })
          }
          rows={2}
          className="rounded-md border border-white/15 bg-background/40 px-3 py-2 text-sm text-foreground"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
        Statut
        <select
          value={session.status}
          onChange={(event) =>
            onChange({ status: event.target.value as ApcStatus })
          }
          className="min-h-11 rounded-md border border-white/15 bg-background/40 px-3 text-sm text-foreground"
        >
          {apcStatuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.label}
            </option>
          ))}
        </select>
      </label>

      <div>
        <p className="text-sm font-bold text-foreground">Checklist</p>
        <ul className="mt-2 flex flex-col gap-1.5" role="list">
          {session.checklist.map((item) => (
            <li key={item.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => onToggleChecklistItem(item.id)}
                className="h-4 w-4 rounded border-white/30"
                id={`edit-${session.id}-${item.id}`}
              />
              <label htmlFor={`edit-${session.id}-${item.id}`} className="text-foreground">
                {item.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-bold text-jade transition hover:bg-jade/20"
        >
          Terminer
        </button>
      </div>
    </div>
  );
}
