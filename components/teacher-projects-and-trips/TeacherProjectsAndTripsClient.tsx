"use client";

import { useEffect, useState } from "react";
import {
  createEmptyTeacherProject,
  TEACHER_PROJECTS_AND_TRIPS_STORAGE_KEY,
  teacherProjectStates,
  teacherProjectTypes,
  type TeacherProject,
  type TeacherProjectState,
  type TeacherProjectType,
} from "@/content/teacher-projects-and-trips";

function readStoredProjects(): TeacherProject[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(
      TEACHER_PROJECTS_AND_TRIPS_STORAGE_KEY,
    );
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed as TeacherProject[];
  } catch {
    return [];
  }
}

function typeLabel(type: TeacherProjectType): string {
  return teacherProjectTypes.find((option) => option.id === type)?.label ?? type;
}

function stateLabel(state: TeacherProjectState): string {
  return (
    teacherProjectStates.find((option) => option.id === state)?.label ?? state
  );
}

export function TeacherProjectsAndTripsClient() {
  const [projects, setProjects] = useState<TeacherProject[]>(() =>
    readStoredProjects(),
  );

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_PROJECTS_AND_TRIPS_STORAGE_KEY,
      JSON.stringify(projects),
    );
  }, [projects]);

  function handleAddProject() {
    setProjects((previous) => [...previous, createEmptyTeacherProject()]);
  }

  function handleRemoveProject(id: string) {
    setProjects((previous) => previous.filter((project) => project.id !== id));
  }

  function updateProject(id: string, patch: Partial<TeacherProject>) {
    setProjects((previous) =>
      previous.map((project) =>
        project.id === id ? { ...project, ...patch } : project,
      ),
    );
  }

  function updateTaskAt(id: string, index: number, value: string) {
    setProjects((previous) =>
      previous.map((project) => {
        if (project.id !== id) return project;
        const tasks = [...project.preparationTasks];
        tasks[index] = value;
        return { ...project, preparationTasks: tasks };
      }),
    );
  }

  function addTask(id: string) {
    setProjects((previous) =>
      previous.map((project) =>
        project.id === id
          ? { ...project, preparationTasks: [...project.preparationTasks, ""] }
          : project,
      ),
    );
  }

  function removeTask(id: string, index: number) {
    setProjects((previous) =>
      previous.map((project) => {
        if (project.id !== id) return project;
        const tasks = project.preparationTasks.filter((_, i) => i !== index);
        return { ...project, preparationTasks: tasks };
      }),
    );
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="mt-10 space-y-8 print:mt-4 print:space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <button
          type="button"
          onClick={handleAddProject}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-jade/50 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade/20"
        >
          + Créer un projet
        </button>
        <button
          type="button"
          onClick={handlePrint}
          disabled={projects.length === 0}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/50 hover:text-jade disabled:cursor-not-allowed disabled:opacity-40"
        >
          Imprimer
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-sm leading-7 text-muted">
          Aucun projet ou sortie pour l’instant. Cliquez sur « Créer un projet »
          pour commencer.
        </p>
      ) : (
        <ol className="space-y-6" role="list">
          {projects.map((project) => (
            <li
              key={project.id}
              className="rounded-lg border border-white/10 bg-background/45 p-5 sm:p-6 print:break-inside-avoid print:border-black/30"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <label className="flex-1 min-w-[14rem]">
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted">
                    Titre du projet
                  </span>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(event) =>
                      updateProject(project.id, { title: event.target.value })
                    }
                    placeholder="Ex. Sortie au musée"
                    className="mt-1 min-h-11 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => handleRemoveProject(project.id)}
                  className="min-h-11 shrink-0 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember print:hidden"
                  aria-label={`Supprimer ${project.title || "ce projet"}`}
                >
                  Supprimer
                </button>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted">
                    Type
                  </span>
                  <select
                    value={project.type}
                    onChange={(event) =>
                      updateProject(project.id, {
                        type: event.target.value as TeacherProjectType,
                      })
                    }
                    className="mt-1 min-h-11 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
                  >
                    {teacherProjectTypes.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted">
                    État
                  </span>
                  <select
                    value={project.state}
                    onChange={(event) =>
                      updateProject(project.id, {
                        state: event.target.value as TeacherProjectState,
                      })
                    }
                    className="mt-1 min-h-11 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
                  >
                    {teacherProjectStates.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted">
                    Date (facultatif)
                  </span>
                  <input
                    type="date"
                    value={project.date}
                    onChange={(event) =>
                      updateProject(project.id, { date: event.target.value })
                    }
                    className="mt-1 min-h-11 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
                  />
                </label>

                <label>
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted">
                    Lieu (facultatif)
                  </span>
                  <input
                    type="text"
                    value={project.location}
                    onChange={(event) =>
                      updateProject(project.id, { location: event.target.value })
                    }
                    className="mt-1 min-h-11 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
                  />
                </label>

                <label className="sm:col-span-2">
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted">
                    Objectif pédagogique
                  </span>
                  <textarea
                    value={project.pedagogicalGoal}
                    onChange={(event) =>
                      updateProject(project.id, {
                        pedagogicalGoal: event.target.value,
                      })
                    }
                    rows={2}
                    className="mt-1 w-full rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm text-foreground"
                  />
                </label>

                <label className="sm:col-span-2">
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted">
                    Matériel
                  </span>
                  <textarea
                    value={project.materials}
                    onChange={(event) =>
                      updateProject(project.id, { materials: event.target.value })
                    }
                    rows={2}
                    className="mt-1 w-full rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm text-foreground"
                  />
                </label>

                <label>
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted">
                    Budget estimé
                  </span>
                  <input
                    type="text"
                    value={project.estimatedBudget}
                    onChange={(event) =>
                      updateProject(project.id, {
                        estimatedBudget: event.target.value,
                      })
                    }
                    placeholder="Ex. 150 €"
                    className="mt-1 min-h-11 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
                  />
                </label>

                <label>
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted">
                    Accompagnateurs à prévoir (nombre)
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={project.chaperoneCount}
                    onChange={(event) =>
                      updateProject(project.id, {
                        chaperoneCount: Math.max(
                          0,
                          Number(event.target.value) || 0,
                        ),
                      })
                    }
                    className="mt-1 min-h-11 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
                  />
                </label>

                <label className="sm:col-span-2">
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted">
                    Autorisations à préparer
                  </span>
                  <textarea
                    value={project.permissionsToPrepare}
                    onChange={(event) =>
                      updateProject(project.id, {
                        permissionsToPrepare: event.target.value,
                      })
                    }
                    rows={2}
                    placeholder="Ex. Autorisation de sortie scolaire"
                    className="mt-1 w-full rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm text-foreground"
                  />
                </label>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wide text-muted">
                    Tâches de préparation
                  </span>
                  <button
                    type="button"
                    onClick={() => addTask(project.id)}
                    className="min-h-11 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-jade/50 hover:text-jade print:hidden"
                  >
                    + Ajouter une tâche
                  </button>
                </div>

                {project.preparationTasks.length === 0 ? (
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Aucune tâche pour l’instant.
                  </p>
                ) : (
                  <ul className="mt-2 space-y-2" role="list">
                    {project.preparationTasks.map((task, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="text"
                          value={task}
                          onChange={(event) =>
                            updateTaskAt(project.id, index, event.target.value)
                          }
                          placeholder={`Tâche ${index + 1}`}
                          className="min-h-11 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
                        />
                        <button
                          type="button"
                          onClick={() => removeTask(project.id, index)}
                          aria-label={`Supprimer la tâche ${index + 1}`}
                          className="min-h-11 shrink-0 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember print:hidden"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted print:hidden">
                {typeLabel(project.type)} · {stateLabel(project.state)}
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
