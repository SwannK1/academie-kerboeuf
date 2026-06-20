"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getDefaultSubstituteFolderState,
  LEGACY_SUBSTITUTE_FOLDER_STORAGE_KEYS,
  SUBSTITUTE_FOLDER_STORAGE_KEY,
  substituteFolderSections,
  type SubstituteFolderSectionId,
  type SubstituteFolderState,
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

function clearLegacyStoredState() {
  if (typeof window === "undefined") {
    return;
  }
  for (const legacyKey of LEGACY_SUBSTITUTE_FOLDER_STORAGE_KEYS) {
    window.localStorage.removeItem(legacyKey);
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
    if (!Array.isArray(stored)) {
      continue;
    }

    tasksBySection[section.id] = tasksBySection[section.id].map((task) => {
      const storedTask = stored.find((candidate) => candidate.id === task.id);
      return storedTask?.status === "termine"
        ? { ...task, status: "termine" }
        : task;
    });
  }

  return { tasksBySection };
}

export function TeacherSubstituteFolderClient() {
  const [state, setState] = useState<SubstituteFolderState>(() =>
    mergeWithDefaults(readStoredState()),
  );

  useEffect(() => {
    clearLegacyStoredState();
  }, []);

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

  function handlePrint() {
    window.print();
  }

  function handleReset() {
    setState(getDefaultSubstituteFolderState());
  }

  return (
    <div className="mt-10">
      <section
        aria-label="Rappel de confidentialité"
        className="rounded-lg border border-ember/40 bg-ember/[0.08] p-4 text-sm font-bold leading-7 text-ember print:border-black/20 print:bg-transparent print:text-black"
      >
        Ne pas inscrire de donnée sur un élève ou une famille.
      </section>

      <section
        aria-label="Avancement global"
        className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-jade/30 bg-jade/[0.06] p-5 sm:p-6 print:hidden"
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
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
