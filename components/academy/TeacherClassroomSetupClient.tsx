"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getDefaultTeacherClassroomSetupState,
  teacherClassroomSetupSections,
  TEACHER_CLASSROOM_SETUP_STORAGE_KEY,
  type TeacherClassroomSetupSectionId,
  type TeacherClassroomSetupState,
  type TeacherClassroomSetupTask,
} from "@/content/teacher-classroom-setup";

function readStoredState(): TeacherClassroomSetupState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(
      TEACHER_CLASSROOM_SETUP_STORAGE_KEY,
    );
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as TeacherClassroomSetupState;
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function createTaskId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function TeacherClassroomSetupClient() {
  const [state, setState] = useState<TeacherClassroomSetupState>(
    () => readStoredState() ?? getDefaultTeacherClassroomSetupState(),
  );
  const [draftLabels, setDraftLabels] = useState<
    Partial<Record<TeacherClassroomSetupSectionId, string>>
  >({});

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_CLASSROOM_SETUP_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  function getTasks(sectionId: TeacherClassroomSetupSectionId): TeacherClassroomSetupTask[] {
    return state[sectionId] ?? [];
  }

  function handleToggle(sectionId: TeacherClassroomSetupSectionId, taskId: string) {
    setState((previous) => ({
      ...previous,
      [sectionId]: (previous[sectionId] ?? []).map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    }));
  }

  function handleDelete(sectionId: TeacherClassroomSetupSectionId, taskId: string) {
    setState((previous) => ({
      ...previous,
      [sectionId]: (previous[sectionId] ?? []).filter(
        (task) => task.id !== taskId,
      ),
    }));
  }

  function handleAddTask(sectionId: TeacherClassroomSetupSectionId) {
    const label = (draftLabels[sectionId] ?? "").trim();
    if (!label) {
      return;
    }

    setState((previous) => ({
      ...previous,
      [sectionId]: [
        ...(previous[sectionId] ?? []),
        { id: createTaskId(), label, done: false, custom: true },
      ],
    }));
    setDraftLabels((previous) => ({ ...previous, [sectionId]: "" }));
  }

  return (
    <div className="mt-10">
      <div className="grid gap-8">
        {teacherClassroomSetupSections.map((section) => {
          const tasks = getTasks(section.id);
          const doneCount = tasks.filter((task) => task.done).length;
          const fieldId = `nouvelle-tache-${section.id}`;

          return (
            <section
              key={section.id}
              aria-label={section.title}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-black text-foreground">
                  {section.title}
                </h2>
                <p className="text-sm font-bold text-muted">
                  {doneCount} / {tasks.length} terminé{doneCount > 1 ? "s" : ""}
                </p>
              </div>

              <ul className="mt-4 grid gap-2" role="list">
                {tasks.map((task) => {
                  const checkboxId = `tache-${task.id}`;
                  return (
                    <li
                      key={task.id}
                      className="flex min-h-11 items-center justify-between gap-3 rounded-md border border-white/10 bg-background/45 px-4 py-2"
                    >
                      <label
                        htmlFor={checkboxId}
                        className="flex flex-1 items-center gap-3 text-sm font-bold text-foreground"
                      >
                        <input
                          id={checkboxId}
                          type="checkbox"
                          checked={task.done}
                          onChange={() => handleToggle(section.id, task.id)}
                          className="h-5 w-5 rounded border-white/20 bg-background/60 accent-jade"
                        />
                        <span
                          className={
                            task.done ? "text-muted line-through" : undefined
                          }
                        >
                          {task.label}
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={() => handleDelete(section.id, task.id)}
                        className="min-h-9 rounded-md border border-white/10 px-3 text-xs font-bold text-muted transition hover:border-ember/40 hover:text-ember"
                      >
                        Supprimer
                      </button>
                    </li>
                  );
                })}
              </ul>

              {tasks.length === 0 ? (
                <p className="mt-2 text-sm leading-7 text-muted">
                  Aucune tâche dans cette section.
                </p>
              ) : null}

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleAddTask(section.id);
                }}
                className="mt-4 flex flex-wrap gap-2"
              >
                <label htmlFor={fieldId} className="sr-only">
                  Ajouter une tâche — {section.title}
                </label>
                <input
                  id={fieldId}
                  type="text"
                  value={draftLabels[section.id] ?? ""}
                  onChange={(event) =>
                    setDraftLabels((previous) => ({
                      ...previous,
                      [section.id]: event.target.value,
                    }))
                  }
                  placeholder="Ajouter une tâche personnalisée"
                  className="min-h-11 flex-1 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
                />
                <button
                  type="submit"
                  className="min-h-11 rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-black text-jade transition hover:border-jade/60"
                >
                  Ajouter
                </button>
              </form>
            </section>
          );
        })}
      </div>

      <p className="mt-8 text-sm leading-7 text-muted">
        Vérifiez les consignes spécifiques de votre direction et de votre
        circonscription.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/enseignants/plan-de-classe"
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
        >
          Plan de classe
        </Link>
        <Link
          href="/enseignants/emploi-du-temps"
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
        >
          Emploi du temps
        </Link>
      </div>
    </div>
  );
}
