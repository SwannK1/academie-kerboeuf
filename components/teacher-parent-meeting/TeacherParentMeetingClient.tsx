"use client";

import { useEffect, useRef, useState } from "react";
import {
  PARENT_MEETING_STORAGE_KEY,
  getDefaultParentMeetingState,
  type ParentMeetingInfo,
  type ParentMeetingState,
  type ParentMeetingTask,
} from "@/content/teacher-parent-meeting";

function readStoredState(): ParentMeetingState {
  if (typeof window === "undefined") {
    return getDefaultParentMeetingState();
  }
  try {
    const raw = window.localStorage.getItem(PARENT_MEETING_STORAGE_KEY);
    if (!raw) {
      return getDefaultParentMeetingState();
    }
    const parsed = JSON.parse(raw) as Partial<ParentMeetingState>;
    const defaults = getDefaultParentMeetingState();
    return {
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : defaults.tasks,
      meeting:
        parsed.meeting && typeof parsed.meeting === "object"
          ? { ...defaults.meeting, ...parsed.meeting }
          : defaults.meeting,
    };
  } catch {
    return getDefaultParentMeetingState();
  }
}

export function TeacherParentMeetingClient() {
  // Le premier rendu reste identique côté serveur et côté client : les
  // données stockées dans localStorage ne sont appliquées qu'après
  // l'hydratation, pour éviter un mismatch React (#418).
  const [state, setState] = useState<ParentMeetingState>(() =>
    getDefaultParentMeetingState(),
  );
  const [draft, setDraft] = useState("");
  const isInitialWriteRef = useRef(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- bootstrap hydration-safe depuis localStorage
    setState(readStoredState());
  }, []);

  useEffect(() => {
    if (isInitialWriteRef.current) {
      isInitialWriteRef.current = false;
      return;
    }
    window.localStorage.setItem(
      PARENT_MEETING_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  function updateMeeting(field: keyof ParentMeetingInfo, value: string) {
    setState((current) => ({
      ...current,
      meeting: { ...current.meeting, [field]: value },
    }));
  }

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const label = draft.trim();
    if (!label) {
      return;
    }
    const newTask: ParentMeetingTask = {
      id: `reunion-parents-${Date.now()}`,
      label,
      isDone: false,
    };
    setState((current) => ({ ...current, tasks: [...current.tasks, newTask] }));
    setDraft("");
  }

  function toggleTask(id: string) {
    setState((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task,
      ),
    }));
  }

  function removeTask(id: string) {
    setState((current) => ({
      ...current,
      tasks: current.tasks.filter((task) => task.id !== id),
    }));
  }

  const done = state.tasks.filter((task) => task.isDone).length;

  return (
    <div className="mt-10 grid gap-6">
      <section
        aria-label="Rappel"
        className="rounded-lg border border-ember/35 bg-ember/[0.07] p-5 text-sm font-bold leading-7 text-foreground sm:p-6"
      >
        Ne saisissez ni nom, ni coordonnée, ni donnée personnelle sur un
        élève ou une famille : conservez ces notes générales.
      </section>

      <section
        aria-label="Préparation de la réunion"
        className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">
          Informations de la réunion
        </h2>

        <div className="mt-5 grid gap-5">
          <div>
            <label
              htmlFor="reunion-date"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Date
            </label>
            <input
              id="reunion-date"
              type="date"
              value={state.meeting.date}
              onChange={(event) => updateMeeting("date", event.target.value)}
              className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground sm:max-w-xs"
            />
          </div>

          <div>
            <label
              htmlFor="reunion-ordre-du-jour"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Ordre du jour
            </label>
            <textarea
              id="reunion-ordre-du-jour"
              value={state.meeting.agenda}
              onChange={(event) => updateMeeting("agenda", event.target.value)}
              rows={4}
              placeholder="Points à aborder"
              className="mt-2 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="reunion-documents"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Documents à distribuer
            </label>
            <textarea
              id="reunion-documents"
              value={state.meeting.documents}
              onChange={(event) => updateMeeting("documents", event.target.value)}
              rows={3}
              placeholder="Liste des documents"
              className="mt-2 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="reunion-questions"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Questions à anticiper
            </label>
            <textarea
              id="reunion-questions"
              value={state.meeting.questions}
              onChange={(event) => updateMeeting("questions", event.target.value)}
              rows={3}
              placeholder="Questions probables des familles"
              className="mt-2 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
            />
          </div>
        </div>

        <p role="status" className="mt-5 text-sm text-muted">
          Ces informations sont enregistrées uniquement sur cet appareil.
        </p>
      </section>

      <section
        aria-label="Checklist de préparation"
        className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black text-foreground">
            Checklist de préparation
          </h2>
          <p className="rounded-md border border-jade/30 bg-jade/[0.06] px-3 py-1 text-xs font-bold text-foreground">
            {done} / {state.tasks.length} tâches terminées
          </p>
        </div>

        <form onSubmit={addTask} className="mt-4 flex gap-2">
          <label htmlFor="reunion-nouvelle-tache" className="sr-only">
            Ajouter une tâche
          </label>
          <input
            id="reunion-nouvelle-tache"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ajouter une tâche"
            className="min-h-11 flex-1 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
          <button
            type="submit"
            className="min-h-11 rounded-md border border-jade/35 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade hover:text-ink"
          >
            Ajouter
          </button>
        </form>

        {state.tasks.length > 0 ? (
          <ul className="mt-4 grid gap-2" role="list">
            {state.tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-background/45 px-4 py-2"
              >
                <input
                  id={`tache-${task.id}`}
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 shrink-0 rounded border-white/30"
                />
                <label
                  htmlFor={`tache-${task.id}`}
                  className={
                    task.isDone
                      ? "flex-1 text-sm text-muted line-through"
                      : "flex-1 text-sm text-foreground"
                  }
                >
                  {task.label}
                </label>
                <button
                  type="button"
                  onClick={() => removeTask(task.id)}
                  aria-label={`Supprimer la tâche : ${task.label}`}
                  className="shrink-0 rounded-md border border-white/10 px-2 py-1 text-xs font-bold text-muted transition hover:border-ember/40 hover:text-ember"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm leading-7 text-muted">
            Aucune tâche pour le moment.
          </p>
        )}
      </section>
    </div>
  );
}
