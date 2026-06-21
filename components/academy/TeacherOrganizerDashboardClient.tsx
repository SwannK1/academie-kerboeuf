"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTeacherClassProfile } from "@/components/academy/TeacherClassProfile";
import {
  TEACHER_ORGANIZER_TASKS_STORAGE_KEY,
  teacherClassPeriods,
  type TeacherOrganizerTask,
} from "@/content/teacher-organizer";

function readStoredTasks(): TeacherOrganizerTask[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(
      TEACHER_ORGANIZER_TASKS_STORAGE_KEY,
    );
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as TeacherOrganizerTask[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function ClassSummaryCard() {
  const { profile } = useTeacherClassProfile();
  const periodLabel = teacherClassPeriods.find(
    (period) => period.id === profile.activePeriod,
  )?.label;

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <p className="rounded-md border border-white/10 bg-background/45 px-4 py-3 text-sm text-foreground">
        <span className="block text-xs font-bold uppercase tracking-wide text-muted">
          Niveau
        </span>
        {profile.level}
        {profile.label ? ` — ${profile.label}` : ""}
      </p>
      <p className="rounded-md border border-white/10 bg-background/45 px-4 py-3 text-sm text-foreground">
        <span className="block text-xs font-bold uppercase tracking-wide text-muted">
          Élèves
        </span>
        {profile.pupilCount}
      </p>
      <p className="rounded-md border border-white/10 bg-background/45 px-4 py-3 text-sm text-foreground sm:col-span-2">
        <span className="block text-xs font-bold uppercase tracking-wide text-muted">
          Période active
        </span>
        {periodLabel}
      </p>
    </div>
  );
}

export function OrganizerTaskList() {
  const [tasks, setTasks] = useState<TeacherOrganizerTask[]>(readStoredTasks);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_ORGANIZER_TASKS_STORAGE_KEY,
      JSON.stringify(tasks),
    );
  }, [tasks]);

  function handleAddTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const label = draft.trim();
    if (!label) {
      return;
    }
    setTasks((previous) => [
      ...previous,
      {
        id: `tache-${Date.now()}`,
        label,
        isDone: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setDraft("");
  }

  function handleToggleTask(id: string) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task,
      ),
    );
  }

  function handleRemoveTask(id: string) {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  return (
    <div className="mt-2">
      <form onSubmit={handleAddTask} className="flex gap-2">
        <label htmlFor="organisateur-nouvelle-tache" className="sr-only">
          Ajouter une tâche
        </label>
        <input
          id="organisateur-nouvelle-tache"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ex : Photocopier la fiche de numération"
          className="min-h-11 flex-1 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
        />
        <button
          type="submit"
          className="min-h-11 rounded-md border border-jade/35 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade hover:text-ink"
        >
          Ajouter
        </button>
      </form>

      {tasks.length > 0 ? (
        <ul className="mt-4 grid gap-2" role="list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 rounded-md border border-white/10 bg-background/45 px-4 py-2"
            >
              <input
                id={`tache-${task.id}`}
                type="checkbox"
                checked={task.isDone}
                onChange={() => handleToggleTask(task.id)}
                className="h-5 w-5"
              />
              <label
                htmlFor={`tache-${task.id}`}
                className={[
                  "flex-1 text-sm",
                  task.isDone
                    ? "text-muted line-through"
                    : "text-foreground",
                ].join(" ")}
              >
                {task.label}
              </label>
              <button
                type="button"
                onClick={() => handleRemoveTask(task.id)}
                aria-label={`Supprimer la tâche : ${task.label}`}
                className="text-sm font-bold text-muted transition hover:text-ember"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm leading-7 text-muted">
          Aucune tâche pour le moment. Ajoutez une tâche courte à faire.
        </p>
      )}
    </div>
  );
}

export function ConfigureClassButton() {
  return (
    <Link
      href="/enseignants/ma-classe"
      className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-4 text-sm font-black text-sky transition hover:bg-sky hover:text-ink"
    >
      Configurer ma classe
    </Link>
  );
}
