"use client";

import { useEffect, useMemo, useState } from "react";
import {
  END_OF_PERIOD_OPTIONS,
  END_OF_PERIOD_PRIORITY_LABELS,
  endOfPeriodCategories,
  type EndOfPeriodCategoryId,
  type EndOfPeriodId,
  type EndOfPeriodPriority,
} from "@/content/teacher-end-of-period";

const STORAGE_KEY = "academie-kerboeuf-fin-periode-v1";

type TaskState = {
  id: string;
  categoryId: EndOfPeriodCategoryId;
  label: string;
  priority: EndOfPeriodPriority;
  done: boolean;
  custom: boolean;
};

type PeriodData = {
  tasks: TaskState[];
  notes: string;
};

type StoredData = Record<EndOfPeriodId, PeriodData>;

function buildInitialTasks(): TaskState[] {
  const tasks: TaskState[] = [];
  for (const category of endOfPeriodCategories) {
    for (const task of category.tasks) {
      tasks.push({
        id: task.id,
        categoryId: category.id,
        label: task.label,
        priority: task.priority,
        done: false,
        custom: false,
      });
    }
  }
  return tasks;
}

function buildInitialPeriodData(): PeriodData {
  return { tasks: buildInitialTasks(), notes: "" };
}

function readStoredData(): StoredData {
  const fallback = {} as StoredData;
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") {
      return parsed as StoredData;
    }
    return fallback;
  } catch {
    return fallback;
  }
}

const PRIORITY_OPTIONS: EndOfPeriodPriority[] = [
  "importante",
  "normale",
  "secondaire",
];

export function TeacherEndOfPeriodClient() {
  const [period, setPeriod] = useState<EndOfPeriodId>("p1");
  const [data, setData] = useState<StoredData>(() => readStoredData());
  const [newTaskLabel, setNewTaskLabel] = useState("");
  const [newTaskCategory, setNewTaskCategory] =
    useState<EndOfPeriodCategoryId>(endOfPeriodCategories[0].id);
  const [newTaskPriority, setNewTaskPriority] =
    useState<EndOfPeriodPriority>("normale");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const periodData = data[period] ?? buildInitialPeriodData();

  function updatePeriodData(updater: (current: PeriodData) => PeriodData) {
    setData((prev) => {
      const current = prev[period] ?? buildInitialPeriodData();
      return { ...prev, [period]: updater(current) };
    });
  }

  function toggleTask(id: string) {
    updatePeriodData((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    }));
  }

  function addCustomTask() {
    const label = newTaskLabel.trim();
    if (!label) return;
    const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    updatePeriodData((current) => ({
      ...current,
      tasks: [
        ...current.tasks,
        {
          id,
          categoryId: newTaskCategory,
          label,
          priority: newTaskPriority,
          done: false,
          custom: true,
        },
      ],
    }));
    setNewTaskLabel("");
  }

  function removeCustomTask(id: string) {
    updatePeriodData((current) => ({
      ...current,
      tasks: current.tasks.filter((task) => task.id !== id),
    }));
  }

  function setNotes(notes: string) {
    updatePeriodData((current) => ({ ...current, notes }));
  }

  const categoryCounts = useMemo(() => {
    const counts = new Map<
      EndOfPeriodCategoryId,
      { total: number; done: number }
    >();
    for (const task of periodData.tasks) {
      const entry = counts.get(task.categoryId) ?? { total: 0, done: 0 };
      entry.total += 1;
      if (task.done) entry.done += 1;
      counts.set(task.categoryId, entry);
    }
    return counts;
  }, [periodData.tasks]);

  const globalCount = useMemo(() => {
    const total = periodData.tasks.length;
    const done = periodData.tasks.filter((task) => task.done).length;
    return { total, done };
  }, [periodData.tasks]);

  return (
    <div className="mt-10 space-y-8">
      <section
        aria-labelledby="choix-periode"
        className="print:hidden"
      >
        <h2 id="choix-periode" className="text-xl font-black text-foreground">
          Choisir la période
        </h2>
        <div
          className="mt-4 flex flex-wrap gap-2"
          role="group"
          aria-label="Choisir la période"
        >
          {END_OF_PERIOD_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={period === option.id}
              onClick={() => setPeriod(option.id)}
              className={`min-h-11 rounded-md border px-4 text-sm font-bold transition ${
                period === option.id
                  ? "border-jade/60 bg-jade/15 text-jade"
                  : "border-white/15 text-foreground hover:border-jade/40"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="resume-global"
        className="rounded-lg border border-white/10 bg-background/45 p-4"
      >
        <h2 id="resume-global" className="text-xl font-black text-foreground">
          Avancement global —{" "}
          {END_OF_PERIOD_OPTIONS.find((o) => o.id === period)?.label}
        </h2>
        <p className="mt-2 text-sm font-bold text-foreground">
          {globalCount.done} / {globalCount.total} tâches terminées
        </p>
      </section>

      <section aria-labelledby="checklist">
        <h2 id="checklist" className="text-xl font-black text-foreground">
          Checklist par catégorie
        </h2>

        <div className="mt-4 space-y-6">
          {endOfPeriodCategories.map((category) => {
            const tasks = periodData.tasks.filter(
              (task) => task.categoryId === category.id,
            );
            const counts = categoryCounts.get(category.id) ?? {
              total: 0,
              done: 0,
            };

            return (
              <div
                key={category.id}
                className="rounded-lg border border-white/10 bg-background/45 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-black text-foreground">
                    {category.label}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                    {counts.done} / {counts.total}
                  </span>
                </div>

                <ul className="mt-3 space-y-2" role="list">
                  {tasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex items-start justify-between gap-3 rounded-md border border-white/10 bg-background/30 p-3"
                    >
                      <label className="flex flex-1 items-start gap-3 text-sm">
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => toggleTask(task.id)}
                          className="mt-1 h-4 w-4"
                        />
                        <span
                          className={
                            task.done
                              ? "text-muted line-through"
                              : "text-foreground"
                          }
                        >
                          {task.label}
                        </span>
                      </label>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                          {END_OF_PERIOD_PRIORITY_LABELS[task.priority]}
                        </span>
                        {task.custom && (
                          <button
                            type="button"
                            onClick={() => removeCustomTask(task.id)}
                            aria-label={`Supprimer la tâche ${task.label}`}
                            className="print:hidden min-h-8 min-w-8 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-ember/50 hover:text-ember"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="ajout-tache"
        className="print:hidden rounded-lg border border-white/10 bg-background/45 p-4"
      >
        <h2 id="ajout-tache" className="text-xl font-black text-foreground">
          Ajouter une tâche personnalisée
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Intitulé de la tâche
            <input
              type="text"
              value={newTaskLabel}
              onChange={(event) => setNewTaskLabel(event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              placeholder="Ex : Préparer la réunion de fin de période"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Catégorie
            <select
              value={newTaskCategory}
              onChange={(event) =>
                setNewTaskCategory(
                  event.target.value as EndOfPeriodCategoryId,
                )
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {endOfPeriodCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Priorité
            <select
              value={newTaskPriority}
              onChange={(event) =>
                setNewTaskPriority(event.target.value as EndOfPeriodPriority)
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {PRIORITY_OPTIONS.map((priority) => (
                <option key={priority} value={priority}>
                  {END_OF_PERIOD_PRIORITY_LABELS[priority]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="button"
          onClick={addCustomTask}
          disabled={!newTaskLabel.trim()}
          className="mt-4 min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Ajouter la tâche
        </button>
      </section>

      <section aria-labelledby="notes-bilan">
        <h2 id="notes-bilan" className="text-xl font-black text-foreground">
          Notes de bilan de période
        </h2>
        <textarea
          value={periodData.notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={6}
          placeholder="Notez vos observations, points de vigilance et ajustements pour la suite."
          className="mt-4 w-full rounded-md border border-white/15 bg-background/60 p-3 text-sm leading-6 text-foreground"
        />
      </section>

      <section className="print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/50 hover:text-jade"
        >
          Imprimer
        </button>
      </section>
    </div>
  );
}
