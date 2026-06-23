"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getDefaultSubstituteFolderState,
  SUBSTITUTE_FOLDER_STORAGE_KEY,
  substituteFolderSections,
  type SubstituteFolderSectionId,
  type SubstituteFolderState,
} from "@/content/teacher-substitute-folder";

type StoredTaskStatus = { id: string; status: string };

function readStoredStatuses(): Record<string, StoredTaskStatus> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(SUBSTITUTE_FOLDER_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw) as {
      tasksBySection?: Record<string, { id?: string; status?: string }[]>;
    };
    if (!parsed || typeof parsed.tasksBySection !== "object") {
      return {};
    }

    const statuses: Record<string, StoredTaskStatus> = {};
    for (const tasks of Object.values(parsed.tasksBySection)) {
      if (!Array.isArray(tasks)) {
        continue;
      }
      for (const task of tasks) {
        if (
          task &&
          typeof task.id === "string" &&
          (task.status === "termine" || task.status === "a-faire")
        ) {
          statuses[task.id] = { id: task.id, status: task.status };
        }
      }
    }
    return statuses;
  } catch {
    return {};
  }
}

function buildStateFromStatuses(
  statuses: Record<string, StoredTaskStatus>,
): SubstituteFolderState {
  const defaults = getDefaultSubstituteFolderState();
  const tasksBySection = { ...defaults.tasksBySection };

  for (const section of substituteFolderSections) {
    tasksBySection[section.id] = tasksBySection[section.id].map((task) => {
      const stored = statuses[task.id];
      return stored ? { ...task, status: stored.status as typeof task.status } : task;
    });
  }

  return { tasksBySection };
}

export function TeacherSubstituteFolderClient() {
  const [state, setState] = useState<SubstituteFolderState>(() =>
    buildStateFromStatuses(readStoredStatuses()),
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

  function handlePrint() {
    window.print();
  }

  function handleReset() {
    setState(getDefaultSubstituteFolderState());
  }

  return (
    <div className="mt-10">
      <section
        aria-label="Rappel"
        className="rounded-lg border border-ember/35 bg-ember/[0.07] p-5 text-sm font-bold leading-7 text-foreground sm:p-6 print:border-black/20 print:bg-transparent print:text-black"
      >
        Cet outil est réservé aux informations générales de la classe. Ne pas
        y inscrire de donnée sur un élève ou une famille.
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
                    className="flex items-center gap-3 rounded-md border border-white/10 bg-background/45 px-4 py-2 print:border-black/20 print:bg-transparent"
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
