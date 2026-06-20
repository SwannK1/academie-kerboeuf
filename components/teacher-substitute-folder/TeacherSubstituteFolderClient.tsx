"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getDefaultSubstituteFolderState,
  SUBSTITUTE_FOLDER_STORAGE_KEY,
  substituteFolderSections,
  type SubstituteFolderSectionId,
  type SubstituteFolderState,
  type SubstituteFolderTask,
} from "@/content/teacher-substitute-folder";

function readStoredState(): SubstituteFolderState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(SUBSTITUTE_FOLDER_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as SubstituteFolderState;
    if (!parsed || typeof parsed.tasksBySection !== "object") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function mergeWithDefaults(
  state: SubstituteFolderState | null,
): SubstituteFolderState {
  const defaults = getDefaultSubstituteFolderState();
  if (!state) {
    return defaults;
  }

  const tasksBySection = { ...defaults.tasksBySection };
  for (const section of substituteFolderSections) {
    const stored = state.tasksBySection?.[section.id];
    if (Array.isArray(stored)) {
      tasksBySection[section.id] = stored;
    }
  }

  return {
    tasksBySection,
    notes: typeof state.notes === "string" ? state.notes : "",
  };
}

function createTaskId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function TeacherSubstituteFolderClient() {
  const [state, setState] = useState<SubstituteFolderState>(() =>
    mergeWithDefaults(readStoredState()),
  );
  const [draftBySection, setDraftBySection] = useState<
    Record<string, string>
  >({});
  const [confirmingTaskId, setConfirmingTaskId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    window.localStorage.setItem(
      SUBSTITUTE_FOLDER_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  const totalCounters = useMemo(() => {
    let done = 0;
    let total = 0;
    for (const tasks of Object.values(state.tasksBySection)) {
      total += tasks.length;
      done += tasks.filter((task) => task.status === "termine").length;
    }
    return { done, total };
  }, [state.tasksBySection]);

  function handleToggleStatus(
    sectionId: SubstituteFolderSectionId,
    taskId: string,
  ) {
    setState((previous) => ({
      ...previous,
      tasksBySection: {
        ...previous.tasksBySection,
        [sectionId]: previous.tasksBySection[sectionId].map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: task.status === "termine" ? "a-faire" : "termine",
              }
            : task,
        ),
      },
    }));
  }

  function handleAddTask(sectionId: SubstituteFolderSectionId) {
    // "Élèves à accompagner" est volontairement limité aux repères
    // collectifs prédéfinis : aucune saisie libre n'y est autorisée afin
    // d'éviter toute donnée nominative ou sensible.
    if (sectionId === "eleves-a-accompagner") {
      return;
    }

    const label = (draftBySection[sectionId] ?? "").trim();
    if (!label) {
      return;
    }

    const newTask: SubstituteFolderTask = {
      id: createTaskId(),
      label,
      status: "a-faire",
      custom: true,
    };

    setState((previous) => ({
      ...previous,
      tasksBySection: {
        ...previous.tasksBySection,
        [sectionId]: [...previous.tasksBySection[sectionId], newTask],
      },
    }));
    setDraftBySection((previous) => ({ ...previous, [sectionId]: "" }));
  }

  function handleRemoveTask(
    sectionId: SubstituteFolderSectionId,
    taskId: string,
  ) {
    setState((previous) => ({
      ...previous,
      tasksBySection: {
        ...previous.tasksBySection,
        [sectionId]: previous.tasksBySection[sectionId].filter(
          (task) => task.id !== taskId,
        ),
      },
    }));
    setConfirmingTaskId(null);
  }

  function handleNotesChange(notes: string) {
    setState((previous) => ({ ...previous, notes }));
  }

  function handlePrint() {
    window.print();
  }

  function handleReset() {
    setState(getDefaultSubstituteFolderState());
    setConfirmingTaskId(null);
  }

  return (
    <div className="mt-10">
      <section
        aria-label="Avancement global"
        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-jade/30 bg-jade/[0.06] p-5 sm:p-6 print:hidden"
      >
        <p className="text-sm font-bold text-foreground">
          Avancement global : {totalCounters.done} / {totalCounters.total}{" "}
          tâches terminées
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-4 text-sm font-black text-sky transition hover:bg-sky hover:text-ink"
          >
            Imprimer le dossier
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-ember/50 hover:text-ember"
          >
            Réinitialiser
          </button>
        </div>
      </section>

      <div className="mt-8 grid gap-6">
        {substituteFolderSections.map((section) => {
          const tasks = state.tasksBySection[section.id] ?? [];
          const done = tasks.filter((task) => task.status === "termine").length;

          return (
            <section
              key={section.id}
              aria-label={section.title}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6 print:break-inside-avoid print:border-black/20 print:bg-transparent"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-foreground print:text-black">
                    {section.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-muted print:text-black">
                    {section.description}
                  </p>
                </div>
                <p className="shrink-0 rounded-md border border-white/10 bg-background/45 px-3 py-1 text-xs font-bold text-muted print:hidden">
                  {done} / {tasks.length}
                </p>
              </div>

              <ul className="mt-5 grid gap-2" role="list">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-background/45 px-4 py-2 print:border-black/20 print:bg-transparent"
                  >
                    <label className="flex min-h-11 flex-1 items-center gap-3 text-sm font-bold text-foreground print:text-black">
                      <input
                        type="checkbox"
                        checked={task.status === "termine"}
                        onChange={() =>
                          handleToggleStatus(section.id, task.id)
                        }
                        className="h-5 w-5 shrink-0 rounded border-white/30 print:border-black"
                      />
                      <span
                        className={
                          task.status === "termine"
                            ? "text-muted line-through print:text-black"
                            : undefined
                        }
                      >
                        {task.label}
                      </span>
                    </label>

                    {confirmingTaskId === task.id ? (
                      <div className="flex shrink-0 items-center gap-2 print:hidden">
                        <span className="text-xs font-bold text-muted">
                          Supprimer ?
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTask(section.id, task.id)}
                          className="min-h-8 rounded-md border border-ember/40 px-2 text-xs font-black text-ember hover:bg-ember/10"
                        >
                          Confirmer
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmingTaskId(null)}
                          className="min-h-8 rounded-md border border-white/15 px-2 text-xs font-black text-foreground hover:border-white/30"
                        >
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmingTaskId(task.id)}
                        aria-label={`Supprimer la tâche : ${task.label}`}
                        className="shrink-0 rounded-md border border-white/10 px-2 py-1 text-xs font-bold text-muted transition hover:border-ember/40 hover:text-ember print:hidden"
                      >
                        Supprimer
                      </button>
                    )}
                  </li>
                ))}

                {tasks.length === 0 ? (
                  <li className="rounded-md border border-dashed border-white/15 px-4 py-3 text-sm text-muted print:border-black/20 print:text-black">
                    Aucune tâche pour le moment.
                  </li>
                ) : null}
              </ul>

              {section.id === "eleves-a-accompagner" ? (
                <p className="mt-4 rounded-md border border-dashed border-ember/30 bg-ember/[0.05] px-4 py-3 text-xs font-bold text-ember print:hidden">
                  Aucun ajout libre dans cette section : pour protéger les
                  élèves, seuls des repères collectifs prédéfinis sont
                  proposés ici. Ne saisissez aucun nom d&apos;élève ni
                  information médicale, familiale ou disciplinaire
                  individuelle, y compris dans les notes générales
                  ci-dessous.
                </p>
              ) : (
                <div className="mt-4 flex flex-wrap gap-2 print:hidden">
                  <label
                    htmlFor={`add-task-${section.id}`}
                    className="sr-only"
                  >
                    Ajouter une tâche — {section.title}
                  </label>
                  <input
                    id={`add-task-${section.id}`}
                    type="text"
                    value={draftBySection[section.id] ?? ""}
                    onChange={(event) =>
                      setDraftBySection((previous) => ({
                        ...previous,
                        [section.id]: event.target.value,
                      }))
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleAddTask(section.id);
                      }
                    }}
                    placeholder="Ajouter une tâche personnalisée"
                    className="min-h-11 flex-1 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddTask(section.id)}
                    className="min-h-11 rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade hover:text-ink"
                  >
                    Ajouter
                  </button>
                </div>
              )}
            </section>
          );
        })}
      </div>

      <section
        aria-label="Notes générales"
        className="mt-8 rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6 print:border-black/20 print:bg-transparent"
      >
        <h2 className="text-xl font-black text-foreground print:text-black">
          Notes générales
        </h2>
        <p className="mt-2 text-xs font-bold text-muted print:hidden">
          N&apos;indiquez aucune information personnelle ou sensible sur un
          élève (nom, comportement, santé, situation familiale) : ces notes
          doivent rester générales et collectives.
        </p>
        <label htmlFor="dossier-notes" className="sr-only">
          Notes générales
        </label>
        <textarea
          id="dossier-notes"
          value={state.notes}
          onChange={(event) => handleNotesChange(event.target.value)}
          rows={6}
          placeholder="Indications complémentaires utiles au remplaçant (informations générales uniquement)…"
          className="mt-4 w-full rounded-md border border-white/10 bg-background/45 p-3 text-sm leading-7 text-foreground print:border-black/20 print:bg-transparent print:text-black"
        />
      </section>
    </div>
  );
}
