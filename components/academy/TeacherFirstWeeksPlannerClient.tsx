"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import {
  FIRST_WEEKS_STORAGE_KEY,
  firstWeeksCategoryLabels,
  firstWeeksPriorityLabels,
  firstWeeksPriorityOrder,
  firstWeeksWeeks,
  getDefaultFirstWeeksTasks,
  type FirstWeeksCategory,
  type FirstWeeksPriority,
  type FirstWeeksState,
  type FirstWeeksTask,
  type FirstWeeksWeek,
} from "@/content/teacher-first-weeks";

const ORGANIZER_LINKS = [
  { label: "Programmation annuelle", href: "/enseignants/programmation/annuelle" },
  { label: "Progression de période", href: "/enseignants/programmation/periode" },
  { label: "Emploi du temps", href: "/enseignants/emploi-du-temps" },
  { label: "Préparation de séance", href: "/enseignants" },
] as const;

const SEANCE_LEVELS = ["cp", "ce1", "ce2", "cm1", "cm2"] as const;
type SeanceLevel = (typeof SEANCE_LEVELS)[number];

const SEANCE_SUBJECTS = [
  { id: "", label: "— (facultatif)" },
  { id: "francais", label: "Français" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "questionner-le-monde", label: "Questionner le monde" },
] as const;

function readStoredState(): FirstWeeksState | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(FIRST_WEEKS_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as FirstWeeksState;
    if (!parsed || !Array.isArray(parsed.tasks)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function TeacherFirstWeeksPlannerClient() {
  const [state, setState] = useState<FirstWeeksState>(
    () => readStoredState() ?? { tasks: getDefaultFirstWeeksTasks() },
  );
  const [activeWeek, setActiveWeek] = useState<FirstWeeksWeek>(1);
  const [newTaskLabel, setNewTaskLabel] = useState("");
  const [newTaskCategory, setNewTaskCategory] =
    useState<FirstWeeksCategory>("organisation");
  const [newTaskPriority, setNewTaskPriority] =
    useState<FirstWeeksPriority>("normale");

  const [seanceLevel, setSeanceLevel] = useState<SeanceLevel>("cp");
  const [seanceWeek, setSeanceWeek] = useState<FirstWeeksWeek>(1);
  const [seanceSubject, setSeanceSubject] = useState<string>("");

  const formId = useId();

  useEffect(() => {
    window.localStorage.setItem(FIRST_WEEKS_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const tasksForWeek = useMemo(
    () =>
      state.tasks
        .filter((task) => task.week === activeWeek)
        .sort(
          (a, b) =>
            firstWeeksPriorityOrder.indexOf(a.priority) -
            firstWeeksPriorityOrder.indexOf(b.priority),
        ),
    [state.tasks, activeWeek],
  );

  function toggleTask(id: string) {
    setState((previous) => ({
      tasks: previous.tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task,
      ),
    }));
  }

  function setTaskPriority(id: string, priority: FirstWeeksPriority) {
    setState((previous) => ({
      tasks: previous.tasks.map((task) =>
        task.id === id ? { ...task, priority } : task,
      ),
    }));
  }

  function removeTask(id: string) {
    setState((previous) => ({
      tasks: previous.tasks.filter((task) => task.id !== id),
    }));
  }

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const label = newTaskLabel.trim();
    if (!label) {
      return;
    }
    const task: FirstWeeksTask = {
      id: `custom-${Date.now()}`,
      week: activeWeek,
      category: newTaskCategory,
      label,
      priority: newTaskPriority,
      isDone: false,
    };
    setState((previous) => ({ tasks: [...previous.tasks, task] }));
    setNewTaskLabel("");
  }

  function addSeanceTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subjectLabel = SEANCE_SUBJECTS.find(
      (subject) => subject.id === seanceSubject,
    )?.label;
    const label = `Préparer une séance — ${seanceLevel.toUpperCase()}, P1, semaine ${seanceWeek}${
      seanceSubject ? `, ${subjectLabel}` : ""
    }`;
    const task: FirstWeeksTask = {
      id: `seance-${Date.now()}`,
      week: seanceWeek,
      category: "pedagogie",
      label,
      priority: "normale",
      isDone: false,
    };
    setState((previous) => ({ tasks: [...previous.tasks, task] }));
  }

  function resetToDefaults() {
    setState({ tasks: getDefaultFirstWeeksTasks() });
  }

  const doneCount = tasksForWeek.filter((task) => task.isDone).length;

  return (
    <div className="mt-10 space-y-8 print:space-y-6">
      <section aria-labelledby="organisateurs" className="print:hidden">
        <h2 id="organisateurs" className="text-xl font-black text-foreground">
          Outils liés
        </h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {ORGANIZER_LINKS.map((link) => (
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

      <section aria-labelledby="choix-semaine">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="choix-semaine" className="text-xl font-black text-foreground">
            Choisir la semaine
          </h2>
          <button
            type="button"
            onClick={resetToDefaults}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember print:hidden"
          >
            Réinitialiser la liste
          </button>
        </div>
        <div
          className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 print:hidden"
          role="group"
          aria-label="Choisir la semaine"
        >
          {firstWeeksWeeks.map((week) => (
            <button
              key={week.id}
              type="button"
              aria-pressed={activeWeek === week.id}
              onClick={() => setActiveWeek(week.id)}
              className={`min-h-11 rounded-md border px-3 text-sm font-bold transition ${
                activeWeek === week.id
                  ? "border-jade/60 bg-jade/15 text-jade"
                  : "border-white/15 text-foreground hover:border-jade/40"
              }`}
            >
              Semaine {week.id}
              <span className="block text-xs font-normal text-muted">
                {week.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="liste-taches">
        <h2 id="liste-taches" className="text-xl font-black text-foreground">
          Semaine {activeWeek} — {doneCount}/{tasksForWeek.length} terminées
        </h2>

        {tasksForWeek.length === 0 ? (
          <p className="mt-4 text-sm leading-7 text-muted">
            Aucune tâche pour cette semaine.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3" role="list">
            {tasksForWeek.map((task) => (
              <li
                key={task.id}
                className="flex flex-col gap-3 rounded-lg border border-white/10 bg-background/45 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <label className="flex flex-1 items-start gap-3">
                  <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 h-5 w-5 shrink-0 rounded border-white/30 bg-background/60"
                  />
                  <span>
                    <span
                      className={`block text-sm font-bold ${
                        task.isDone ? "text-muted line-through" : "text-foreground"
                      }`}
                    >
                      {task.label}
                    </span>
                    <span className="mt-1 block text-xs font-medium uppercase tracking-wide text-muted">
                      {firstWeeksCategoryLabels[task.category]}
                    </span>
                  </span>
                </label>

                <div className="flex shrink-0 items-center gap-2">
                  <label className="sr-only" htmlFor={`${formId}-priority-${task.id}`}>
                    Priorité — {task.label}
                  </label>
                  <select
                    id={`${formId}-priority-${task.id}`}
                    value={task.priority}
                    onChange={(event) =>
                      setTaskPriority(
                        task.id,
                        event.target.value as FirstWeeksPriority,
                      )
                    }
                    className="min-h-11 rounded-md border border-white/15 bg-background/60 px-2 text-sm font-bold text-foreground print:hidden"
                  >
                    {firstWeeksPriorityOrder.map((priority) => (
                      <option key={priority} value={priority}>
                        {firstWeeksPriorityLabels[priority]}
                      </option>
                    ))}
                  </select>
                  <span
                    className={`hidden rounded-md border px-3 py-1 text-xs font-bold print:inline-block ${
                      task.priority === "importante"
                        ? "border-ember/40 text-ember"
                        : task.priority === "normale"
                          ? "border-sky/40 text-sky"
                          : "border-white/20 text-muted"
                    }`}
                  >
                    {firstWeeksPriorityLabels[task.priority]}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeTask(task.id)}
                    aria-label={`Supprimer ${task.label}`}
                    className="min-h-11 min-w-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember print:hidden"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section
        aria-labelledby="ajouter-tache"
        className="rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6 print:hidden"
      >
        <h2 id="ajouter-tache" className="text-xl font-black text-foreground">
          Ajouter une tâche — semaine {activeWeek}
        </h2>
        <form onSubmit={addTask} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Tâche
            <input
              type="text"
              value={newTaskLabel}
              onChange={(event) => setNewTaskLabel(event.target.value)}
              placeholder="Décrire la tâche"
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Catégorie
            <select
              value={newTaskCategory}
              onChange={(event) =>
                setNewTaskCategory(event.target.value as FirstWeeksCategory)
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {Object.entries(firstWeeksCategoryLabels).map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Priorité
            <select
              value={newTaskPriority}
              onChange={(event) =>
                setNewTaskPriority(event.target.value as FirstWeeksPriority)
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {firstWeeksPriorityOrder.map((priority) => (
                <option key={priority} value={priority}>
                  {firstWeeksPriorityLabels[priority]}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="min-h-11 self-end rounded-md border border-jade/40 bg-jade/15 px-4 text-sm font-black text-jade transition hover:bg-jade hover:text-ink"
          >
            Ajouter
          </button>
        </form>
      </section>

      <section
        aria-labelledby="creer-seance"
        className="rounded-lg border border-gold/25 bg-gold/[0.05] p-5 sm:p-6 print:hidden"
      >
        <h2 id="creer-seance" className="text-xl font-black text-foreground">
          Créer une séance à préparer
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Ajoute une tâche pré-remplie avec le niveau, la période et la
          semaine choisis, pour garder une trace de la séance à préparer.
        </p>
        <form
          onSubmit={addSeanceTask}
          className="mt-4 grid gap-3 sm:grid-cols-[auto_auto_auto_1fr_auto]"
        >
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Niveau
            <select
              value={seanceLevel}
              onChange={(event) =>
                setSeanceLevel(event.target.value as SeanceLevel)
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {SEANCE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Période
            <input
              type="text"
              value="P1"
              disabled
              className="min-h-11 rounded-md border border-white/15 bg-background/30 px-3 text-sm font-medium text-muted"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Semaine
            <select
              value={seanceWeek}
              onChange={(event) =>
                setSeanceWeek(Number(event.target.value) as FirstWeeksWeek)
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {firstWeeksWeeks.map((week) => (
                <option key={week.id} value={week.id}>
                  Semaine {week.id}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Matière (facultatif)
            <select
              value={seanceSubject}
              onChange={(event) => setSeanceSubject(event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {SEANCE_SUBJECTS.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="min-h-11 self-end rounded-md border border-gold/40 bg-gold/15 px-4 text-sm font-black text-gold transition hover:bg-gold hover:text-ink"
          >
            Créer
          </button>
        </form>
      </section>
    </div>
  );
}
