"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FIRST_WEEKS_STORAGE_KEY,
  firstWeeksCategories,
  firstWeeksPriorities,
  firstWeeksSuggestedTasks,
  firstWeeksWeeks,
  type FirstWeeksCategory,
  type FirstWeeksPriority,
  type FirstWeeksTask,
  type FirstWeeksWeek,
} from "@/content/teacher-first-weeks";
import {
  teacherTimetableLevels,
  teacherTimetableSubjectsByLevel,
  type TeacherTimetableLevelId,
} from "@/content/teacher-timetable";

const DEFAULT_LEVEL_ID: TeacherTimetableLevelId = "cm2";

function createTaskId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function seedTasks(): FirstWeeksTask[] {
  const now = new Date().toISOString();
  return firstWeeksSuggestedTasks.map((task) => ({
    ...task,
    id: createTaskId(),
    isDone: false,
    createdAt: now,
  }));
}

function readStoredTasks(): FirstWeeksTask[] | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(FIRST_WEEKS_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as FirstWeeksTask[];
    if (!Array.isArray(parsed)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

const TEACHER_LINKS = [
  { label: "Programmation", href: "/enseignants/programmation" },
  { label: "Progression", href: "/enseignants/programmation/periode" },
  { label: "Emploi du temps", href: "/enseignants/emploi-du-temps" },
  { label: "Préparer une séance", href: "/enseignants/seance" },
  { label: "Plan de classe", href: "/enseignants/plan-de-classe" },
] as const;

export function TeacherFirstWeeksPlannerClient() {
  const [tasks, setTasks] = useState<FirstWeeksTask[]>(
    () => readStoredTasks() ?? seedTasks(),
  );
  const [activeWeek, setActiveWeek] = useState<FirstWeeksWeek>(1);
  const [levelId, setLevelId] =
    useState<TeacherTimetableLevelId>(DEFAULT_LEVEL_ID);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(
    null,
  );
  const [newLabel, setNewLabel] = useState("");
  const [newCategory, setNewCategory] = useState<FirstWeeksCategory>(
    "organisation",
  );
  const [newPriority, setNewPriority] = useState<FirstWeeksPriority>("normale");
  const [seanceSubjectByTask, setSeanceSubjectByTask] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    window.localStorage.setItem(FIRST_WEEKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const tasksByWeek = useMemo(() => {
    const counts = new Map<FirstWeeksWeek, { total: number; done: number }>();
    for (const week of firstWeeksWeeks) {
      counts.set(week.id, { total: 0, done: 0 });
    }
    for (const task of tasks) {
      const entry = counts.get(task.week);
      if (!entry) {
        continue;
      }
      entry.total += 1;
      if (task.isDone) {
        entry.done += 1;
      }
    }
    return counts;
  }, [tasks]);

  const globalCount = useMemo(
    () => ({
      total: tasks.length,
      done: tasks.filter((task) => task.isDone).length,
    }),
    [tasks],
  );

  const visibleTasks = useMemo(
    () => tasks.filter((task) => task.week === activeWeek),
    [tasks, activeWeek],
  );

  const subjects = teacherTimetableSubjectsByLevel[levelId];

  function handleAddTask() {
    const label = newLabel.trim();
    if (!label) {
      return;
    }
    setTasks((previous) => [
      ...previous,
      {
        id: createTaskId(),
        week: activeWeek,
        category: newCategory,
        label,
        priority: newPriority,
        isDone: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setNewLabel("");
  }

  function handleToggleDone(taskId: string) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task,
      ),
    );
  }

  function handleDeleteRequest(taskId: string) {
    setConfirmingDeleteId(taskId);
  }

  function handleDeleteConfirm(taskId: string) {
    setTasks((previous) => previous.filter((task) => task.id !== taskId));
    setConfirmingDeleteId(null);
  }

  function handleDeleteCancel() {
    setConfirmingDeleteId(null);
  }

  function buildSeanceHref(task: FirstWeeksTask): string {
    const params = new URLSearchParams({
      niveau: levelId,
      periode: "p1",
      semaine: String(task.week),
    });
    const subject = seanceSubjectByTask[task.id];
    if (subject) {
      params.set("matiere", subject);
    }
    return `/enseignants/seance/nouvelle?${params.toString()}`;
  }

  return (
    <div className="mt-10">
      <section aria-label="Choix du niveau">
        <h2 className="text-xl font-black text-foreground">
          Niveau de la classe
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {teacherTimetableLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => setLevelId(level.id)}
              aria-pressed={level.id === levelId}
              className={[
                "min-h-11 rounded-md border px-3 text-sm font-bold transition",
                level.id === levelId
                  ? "border-jade/60 bg-jade/10 text-jade"
                  : "border-white/10 bg-white/[0.04] text-foreground hover:border-jade/40",
              ].join(" ")}
            >
              {level.label}
            </button>
          ))}
        </div>
      </section>

      <section
        aria-label="Compteurs"
        className="mt-8 flex flex-wrap items-center gap-3 rounded-lg border border-sky/25 bg-sky/[0.05] p-5"
      >
        <p className="text-sm font-bold text-foreground">
          Global : {globalCount.done} / {globalCount.total} tâches terminées
        </p>
        <div className="flex flex-wrap gap-2">
          {firstWeeksWeeks.map((week) => {
            const entry = tasksByWeek.get(week.id) ?? { total: 0, done: 0 };
            return (
              <span
                key={week.id}
                className="rounded-md border border-white/10 bg-background/45 px-3 py-1 text-xs font-bold text-muted"
              >
                {week.label} : {entry.done} / {entry.total}
              </span>
            );
          })}
        </div>
      </section>

      <section aria-label="Choix de la semaine" className="mt-8">
        <h2 className="text-xl font-black text-foreground">
          Vue par semaine
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {firstWeeksWeeks.map((week) => (
            <button
              key={week.id}
              type="button"
              onClick={() => setActiveWeek(week.id)}
              aria-pressed={week.id === activeWeek}
              className={[
                "min-h-11 rounded-md border px-3 text-sm font-bold transition",
                week.id === activeWeek
                  ? "border-jade/60 bg-jade/10 text-jade"
                  : "border-white/10 bg-white/[0.04] text-foreground hover:border-jade/40",
              ].join(" ")}
            >
              {week.label}
            </button>
          ))}
        </div>
      </section>

      <section
        aria-label="Ajouter une tâche"
        className="mt-8 rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">
          Ajouter une tâche —{" "}
          {firstWeeksWeeks.find((week) => week.id === activeWeek)?.label}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
          <div>
            <label htmlFor="new-task-label" className="sr-only">
              Libellé de la tâche
            </label>
            <input
              id="new-task-label"
              type="text"
              value={newLabel}
              onChange={(event) => setNewLabel(event.target.value)}
              placeholder="Nouvelle tâche"
              className="min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>
          <div>
            <label htmlFor="new-task-category" className="sr-only">
              Catégorie
            </label>
            <select
              id="new-task-category"
              value={newCategory}
              onChange={(event) =>
                setNewCategory(event.target.value as FirstWeeksCategory)
              }
              className="min-h-11 rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
            >
              {firstWeeksCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="new-task-priority" className="sr-only">
              Priorité
            </label>
            <select
              id="new-task-priority"
              value={newPriority}
              onChange={(event) =>
                setNewPriority(event.target.value as FirstWeeksPriority)
              }
              className="min-h-11 rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
            >
              {firstWeeksPriorities.map((priority) => (
                <option key={priority.id} value={priority.id}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleAddTask}
            className="min-h-11 rounded-md border border-jade/35 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade hover:text-ink"
          >
            Ajouter
          </button>
        </div>
      </section>

      <section
        aria-label="Liste des tâches"
        className="mt-8 rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">
          Tâches —{" "}
          {firstWeeksWeeks.find((week) => week.id === activeWeek)?.label}
        </h2>
        {visibleTasks.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            Aucune tâche pour cette semaine.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3" role="list">
            {visibleTasks.map((task) => (
              <li
                key={task.id}
                className="rounded-md border border-white/10 bg-background/45 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.isDone}
                      onChange={() => handleToggleDone(task.id)}
                      aria-label={`Marquer « ${task.label} » comme terminé`}
                      className="mt-1 h-5 w-5"
                    />
                    <div>
                      <p
                        className={[
                          "text-sm font-bold text-foreground",
                          task.isDone ? "line-through opacity-60" : "",
                        ].join(" ")}
                      >
                        {task.label}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {
                          firstWeeksCategories.find(
                            (category) => category.id === task.category,
                          )?.label
                        }{" "}
                        ·{" "}
                        {
                          firstWeeksPriorities.find(
                            (priority) => priority.id === task.priority,
                          )?.label
                        }
                      </p>
                    </div>
                  </div>

                  {confirmingDeleteId === task.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-muted">
                        Supprimer ?
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteConfirm(task.id)}
                        className="min-h-11 rounded-md border border-rose-400/40 bg-rose-400/10 px-3 text-xs font-black text-rose-300"
                      >
                        Confirmer
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteCancel}
                        className="min-h-11 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-bold text-foreground"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleDeleteRequest(task.id)}
                      className="min-h-11 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-bold text-foreground hover:border-rose-400/40 hover:text-rose-300"
                    >
                      Supprimer
                    </button>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/5 pt-3">
                  <label
                    htmlFor={`seance-matiere-${task.id}`}
                    className="text-xs font-bold uppercase tracking-wide text-muted"
                  >
                    Matière (facultatif)
                  </label>
                  <select
                    id={`seance-matiere-${task.id}`}
                    value={seanceSubjectByTask[task.id] ?? ""}
                    onChange={(event) =>
                      setSeanceSubjectByTask((previous) => ({
                        ...previous,
                        [task.id]: event.target.value,
                      }))
                    }
                    className="min-h-11 rounded-md border border-white/10 bg-background/45 px-2 text-xs text-foreground"
                  >
                    <option value="">Aucune</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  <Link
                    href={buildSeanceHref(task)}
                    className="ml-auto min-h-11 rounded-md border border-sky/35 bg-sky/10 px-3 text-xs font-black text-sky transition hover:bg-sky hover:text-ink"
                  >
                    Créer une séance préremplie
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section
        aria-label="Outils enseignants"
        className="mt-8 rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">
          Outils enseignants liés
        </h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {TEACHER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center justify-between rounded-md border border-white/10 bg-background/45 px-4 text-sm font-bold text-foreground transition hover:border-sky/40 hover:bg-sky/[0.08]"
            >
              {link.label}
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
