"use client";

import { useState } from "react";
import {
  actionPriorities,
  actionStatuses,
  councilPointCategories,
  type ActionPriority,
  type ActionStatus,
  type CouncilAction,
  type CouncilPoint,
  type CouncilPointCategory,
  type SchoolCouncil,
} from "@/content/teacher-school-council";

const STORAGE_KEY = "academie-kerboeuf-conseil-ecole-v1";

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readStoredCouncils(): SchoolCouncil[] {
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
    return parsed as SchoolCouncil[];
  } catch {
    return [];
  }
}

function writeStoredCouncils(councils: SchoolCouncil[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(councils));
}

type DraftPoint = {
  id: string;
  category: CouncilPointCategory;
  title: string;
  details: string;
};

function emptyDraftPoint(): DraftPoint {
  return { id: createId(), category: "vie-ecole", title: "", details: "" };
}

export function SchoolCouncilPlanner() {
  const [councils, setCouncils] = useState<SchoolCouncil[]>(() =>
    readStoredCouncils(),
  );
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [date, setDate] = useState("");
  const [agenda, setAgenda] = useState("");
  const [points, setPoints] = useState<DraftPoint[]>([emptyDraftPoint()]);
  const [decisions, setDecisions] = useState("");
  const [questions, setQuestions] = useState("");
  const [notes, setNotes] = useState("");

  function persist(next: SchoolCouncil[]) {
    setCouncils(next);
    writeStoredCouncils(next);
  }

  function resetForm() {
    setDate("");
    setAgenda("");
    setPoints([emptyDraftPoint()]);
    setDecisions("");
    setQuestions("");
    setNotes("");
  }

  function addDraftPoint() {
    setPoints((current) => [...current, emptyDraftPoint()]);
  }

  function removeDraftPoint(id: string) {
    setPoints((current) => current.filter((point) => point.id !== id));
  }

  function updateDraftPoint(id: string, patch: Partial<DraftPoint>) {
    setPoints((current) =>
      current.map((point) => (point.id === id ? { ...point, ...patch } : point)),
    );
  }

  function createCouncil() {
    const validPoints: CouncilPoint[] = points
      .filter((point) => point.title.trim().length > 0)
      .map((point) => ({
        id: point.id,
        category: point.category,
        title: point.title.trim(),
        details: point.details.trim(),
      }));

    const newCouncil: SchoolCouncil = {
      id: createId(),
      date,
      agenda: agenda.trim(),
      points: validPoints,
      decisions: decisions.trim(),
      questions: questions.trim(),
      notes: notes.trim(),
      actions: [],
      createdAt: new Date().toISOString(),
    };

    persist([newCouncil, ...councils]);
    resetForm();
  }

  function requestDelete(id: string) {
    setPendingDeleteId(id);
  }

  function cancelDelete() {
    setPendingDeleteId(null);
  }

  function confirmDelete(id: string) {
    persist(councils.filter((council) => council.id !== id));
    setPendingDeleteId(null);
  }

  function addAction(councilId: string, label: string) {
    if (label.trim().length === 0) {
      return;
    }
    const action: CouncilAction = {
      id: createId(),
      label: label.trim(),
      status: "a-faire",
      priority: "normale",
    };
    persist(
      councils.map((council) =>
        council.id === councilId
          ? { ...council, actions: [...council.actions, action] }
          : council,
      ),
    );
  }

  function updateAction(
    councilId: string,
    actionId: string,
    patch: Partial<Pick<CouncilAction, "status" | "priority">>,
  ) {
    persist(
      councils.map((council) =>
        council.id === councilId
          ? {
              ...council,
              actions: council.actions.map((action) =>
                action.id === actionId ? { ...action, ...patch } : action,
              ),
            }
          : council,
      ),
    );
  }

  function removeAction(councilId: string, actionId: string) {
    persist(
      councils.map((council) =>
        council.id === councilId
          ? {
              ...council,
              actions: council.actions.filter((action) => action.id !== actionId),
            }
          : council,
      ),
    );
  }

  return (
    <div>
      <section
        aria-labelledby="creer-conseil-titre"
        className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
      >
        <h2 id="creer-conseil-titre" className="text-xl font-black text-foreground">
          Créer un conseil
        </h2>

        <div className="mt-4 grid gap-4">
          <label className="block">
            <span className="text-sm font-bold text-foreground">
              Date (facultative)
            </span>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="mt-1 min-h-11 w-full rounded-md border border-white/15 bg-background/40 px-3 text-sm text-foreground"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-foreground">Ordre du jour</span>
            <textarea
              value={agenda}
              onChange={(event) => setAgenda(event.target.value)}
              rows={3}
              className="mt-1 w-full rounded-md border border-white/15 bg-background/40 p-3 text-sm text-foreground"
            />
          </label>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">
                Points à présenter
              </span>
              <button
                type="button"
                onClick={addDraftPoint}
                className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-jade/40"
              >
                + Ajouter un point
              </button>
            </div>

            <div className="mt-3 flex flex-col gap-3">
              {points.map((point) => (
                <div
                  key={point.id}
                  className="rounded-md border border-white/10 bg-background/40 p-3"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={point.category}
                      onChange={(event) =>
                        updateDraftPoint(point.id, {
                          category: event.target.value as CouncilPointCategory,
                        })
                      }
                      className="min-h-9 rounded border border-white/15 bg-background/60 px-2 text-xs font-bold text-foreground"
                    >
                      {councilPointCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeDraftPoint(point.id)}
                      disabled={points.length === 1}
                      className="ml-auto min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-muted transition hover:border-rose/40 hover:text-rose disabled:opacity-30"
                    >
                      Retirer
                    </button>
                  </div>
                  <input
                    type="text"
                    value={point.title}
                    onChange={(event) =>
                      updateDraftPoint(point.id, { title: event.target.value })
                    }
                    placeholder="Titre du point"
                    className="mt-2 min-h-10 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
                  />
                  <textarea
                    value={point.details}
                    onChange={(event) =>
                      updateDraftPoint(point.id, { details: event.target.value })
                    }
                    placeholder="Détails (facultatif)"
                    rows={2}
                    className="mt-2 w-full rounded-md border border-white/15 bg-background/60 p-2 text-sm text-foreground"
                  />
                </div>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="text-sm font-bold text-foreground">Décisions</span>
            <textarea
              value={decisions}
              onChange={(event) => setDecisions(event.target.value)}
              rows={3}
              className="mt-1 w-full rounded-md border border-white/15 bg-background/40 p-3 text-sm text-foreground"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-foreground">
              Questions à transmettre
            </span>
            <textarea
              value={questions}
              onChange={(event) => setQuestions(event.target.value)}
              rows={3}
              className="mt-1 w-full rounded-md border border-white/15 bg-background/40 p-3 text-sm text-foreground"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-foreground">Notes générales</span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              className="mt-1 w-full rounded-md border border-white/15 bg-background/40 p-3 text-sm text-foreground"
            />
          </label>

          <div>
            <button
              type="button"
              onClick={createCouncil}
              className="min-h-11 rounded-md border border-jade/60 bg-jade/10 px-5 text-sm font-bold text-jade transition hover:bg-jade/20"
            >
              Créer le conseil
            </button>
          </div>
        </div>
      </section>

      <section aria-labelledby="historique-titre" className="mt-10">
        <div className="flex items-center justify-between gap-3">
          <h2 id="historique-titre" className="text-xl font-black text-foreground">
            Historique des conseils
          </h2>
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-sky/40 hover:text-sky"
          >
            Imprimer
          </button>
        </div>

        {councils.length === 0 ? (
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
            Aucun conseil enregistré pour le moment.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-5">
            {councils.map((council) => (
              <li
                key={council.id}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {council.date
                        ? new Date(council.date).toLocaleDateString("fr-FR")
                        : "Date non précisée"}
                    </p>
                    {council.agenda ? (
                      <p className="mt-1 text-sm leading-6 text-muted">
                        {council.agenda}
                      </p>
                    ) : null}
                  </div>

                  {pendingDeleteId === council.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted">Confirmer ?</span>
                      <button
                        type="button"
                        onClick={() => confirmDelete(council.id)}
                        className="min-h-9 rounded border border-rose/60 bg-rose/10 px-3 text-xs font-bold text-rose"
                      >
                        Supprimer
                      </button>
                      <button
                        type="button"
                        onClick={cancelDelete}
                        className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-foreground"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => requestDelete(council.id)}
                      className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-muted transition hover:border-rose/40 hover:text-rose"
                    >
                      Supprimer
                    </button>
                  )}
                </div>

                {council.points.length > 0 ? (
                  <ul className="mt-4 flex flex-col gap-2">
                    {council.points.map((point) => (
                      <li
                        key={point.id}
                        className="rounded-md border border-white/10 bg-background/40 p-3"
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.08em] text-sky">
                          {
                            councilPointCategories.find(
                              (category) => category.id === point.category,
                            )?.label
                          }
                        </p>
                        <p className="mt-1 text-sm font-bold text-foreground">
                          {point.title}
                        </p>
                        {point.details ? (
                          <p className="mt-1 text-xs leading-5 text-muted">
                            {point.details}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {council.decisions ? (
                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-foreground">
                      Décisions
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {council.decisions}
                    </p>
                  </div>
                ) : null}

                {council.questions ? (
                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-foreground">
                      Questions à transmettre
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {council.questions}
                    </p>
                  </div>
                ) : null}

                {council.notes ? (
                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-foreground">
                      Notes générales
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {council.notes}
                    </p>
                  </div>
                ) : null}

                <CouncilActions
                  council={council}
                  onAddAction={(label) => addAction(council.id, label)}
                  onUpdateAction={(actionId, patch) =>
                    updateAction(council.id, actionId, patch)
                  }
                  onRemoveAction={(actionId) => removeAction(council.id, actionId)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function CouncilActions({
  council,
  onAddAction,
  onUpdateAction,
  onRemoveAction,
}: {
  council: SchoolCouncil;
  onAddAction: (label: string) => void;
  onUpdateAction: (
    actionId: string,
    patch: Partial<Pick<CouncilAction, "status" | "priority">>,
  ) => void;
  onRemoveAction: (actionId: string) => void;
}) {
  const [draftLabel, setDraftLabel] = useState("");

  function handleAdd() {
    onAddAction(draftLabel);
    setDraftLabel("");
  }

  return (
    <div className="mt-5 border-t border-white/10 pt-4">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-foreground">
        Actions de suivi
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        <input
          type="text"
          value={draftLabel}
          onChange={(event) => setDraftLabel(event.target.value)}
          placeholder="Nouvelle action"
          className="min-h-9 flex-1 rounded-md border border-white/15 bg-background/40 px-3 text-sm text-foreground"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-jade/40"
        >
          Ajouter
        </button>
      </div>

      {council.actions.length > 0 ? (
        <ul className="mt-3 flex flex-col gap-2">
          {council.actions.map((action) => (
            <li
              key={action.id}
              className="flex flex-wrap items-center gap-2 rounded-md border border-white/10 bg-background/40 p-2"
            >
              <span className="flex-1 text-sm text-foreground">{action.label}</span>

              <select
                value={action.status}
                onChange={(event) =>
                  onUpdateAction(action.id, {
                    status: event.target.value as ActionStatus,
                  })
                }
                className="min-h-9 rounded border border-white/15 bg-background/60 px-2 text-xs font-bold text-foreground"
              >
                {actionStatuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.label}
                  </option>
                ))}
              </select>

              <select
                value={action.priority}
                onChange={(event) =>
                  onUpdateAction(action.id, {
                    priority: event.target.value as ActionPriority,
                  })
                }
                className="min-h-9 rounded border border-white/15 bg-background/60 px-2 text-xs font-bold text-foreground"
              >
                {actionPriorities.map((priority) => (
                  <option key={priority.id} value={priority.id}>
                    {priority.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => onRemoveAction(action.id)}
                className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-muted transition hover:border-rose/40 hover:text-rose"
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-xs leading-5 text-muted">
          Aucune action de suivi pour ce conseil.
        </p>
      )}
    </div>
  );
}
