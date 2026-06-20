"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createEmptyRoutine,
  isTeacherRoutine,
  routineDayOptions,
  routineFrequencyOptions,
  routineLevelOptions,
  routineSubjectOptions,
  TEACHER_ROUTINES_STORAGE_KEY,
  type RoutineFrequency,
  type TeacherRoutine,
} from "@/content/teacher-routines-library";

function readStoredRoutines(): TeacherRoutine[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(TEACHER_ROUTINES_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isTeacherRoutine);
  } catch {
    return [];
  }
}

function createId(): string {
  return `rituel-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function labelFor<T extends string>(
  options: { id: T; label: string }[],
  id: T | null,
): string | null {
  if (!id) return null;
  return options.find((option) => option.id === id)?.label ?? null;
}

export function TeacherRoutinesLibraryClient() {
  const [routines, setRoutines] = useState<TeacherRoutine[]>(() =>
    readStoredRoutines(),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [frequencyFilter, setFrequencyFilter] = useState<
    RoutineFrequency | "all"
  >("all");
  const [formRoutine, setFormRoutine] = useState<TeacherRoutine | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [printMode, setPrintMode] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_ROUTINES_STORAGE_KEY,
      JSON.stringify(routines),
    );
  }, [routines]);

  const filteredRoutines = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return routines.filter((routine) => {
      if (frequencyFilter !== "all" && routine.frequency !== frequencyFilter) {
        return false;
      }
      if (!query) {
        return true;
      }
      const haystack = [
        routine.title,
        routine.instructions,
        routine.materials,
        routine.objective,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [routines, searchQuery, frequencyFilter]);

  function openCreateForm() {
    setFormRoutine(createEmptyRoutine());
    setIsCreating(true);
  }

  function openEditForm(routine: TeacherRoutine) {
    setFormRoutine({ ...routine });
    setIsCreating(false);
  }

  function closeForm() {
    setFormRoutine(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRoutine) return;
    if (!formRoutine.title.trim() || !formRoutine.duration.trim()) {
      return;
    }

    if (isCreating) {
      const newRoutine: TeacherRoutine = {
        ...formRoutine,
        id: createId(),
        createdAt: new Date().toISOString(),
      };
      setRoutines((previous) => [newRoutine, ...previous]);
    } else {
      setRoutines((previous) =>
        previous.map((routine) =>
          routine.id === formRoutine.id ? formRoutine : routine,
        ),
      );
    }
    closeForm();
  }

  function handleDuplicate(routine: TeacherRoutine) {
    const duplicated: TeacherRoutine = {
      ...routine,
      id: createId(),
      title: `${routine.title} (copie)`,
      createdAt: new Date().toISOString(),
    };
    setRoutines((previous) => [duplicated, ...previous]);
  }

  function handleDelete(id: string) {
    const routine = routines.find((item) => item.id === id);
    if (!routine) return;
    const confirmed = window.confirm(
      `Supprimer le rituel « ${routine.title} » ? Cette action est irréversible.`,
    );
    if (!confirmed) return;
    setRoutines((previous) => previous.filter((item) => item.id !== id));
  }

  function handleToggleActive(id: string) {
    setRoutines((previous) =>
      previous.map((routine) =>
        routine.id === id ? { ...routine, active: !routine.active } : routine,
      ),
    );
  }

  return (
    <div className="mt-10 space-y-8">
      <section
        aria-label="Actions"
        className="flex flex-wrap items-center justify-between gap-3 print:hidden"
      >
        <button
          type="button"
          onClick={openCreateForm}
          className="min-h-11 rounded-md border border-jade/50 bg-jade/10 px-4 text-sm font-bold text-jade transition hover:bg-jade/20"
        >
          + Créer un rituel
        </button>
        <button
          type="button"
          onClick={() => setPrintMode((previous) => !previous)}
          className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/40"
        >
          {printMode ? "Quitter la vue imprimable" : "Vue imprimable"}
        </button>
      </section>

      {!printMode && (
        <section
          aria-label="Recherche et filtres"
          className="flex flex-wrap items-end gap-4 print:hidden"
        >
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Rechercher
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Titre, consigne, matériel, objectif…"
              className="min-h-11 w-64 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par fréquence">
            <button
              type="button"
              aria-pressed={frequencyFilter === "all"}
              onClick={() => setFrequencyFilter("all")}
              className={`min-h-11 rounded-md border px-4 text-sm font-bold transition ${
                frequencyFilter === "all"
                  ? "border-jade/60 bg-jade/15 text-jade"
                  : "border-white/15 text-foreground hover:border-jade/40"
              }`}
            >
              Toutes ({routines.length})
            </button>
            {routineFrequencyOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={frequencyFilter === option.id}
                onClick={() => setFrequencyFilter(option.id)}
                className={`min-h-11 rounded-md border px-4 text-sm font-bold transition ${
                  frequencyFilter === option.id
                    ? "border-jade/60 bg-jade/15 text-jade"
                    : "border-white/15 text-foreground hover:border-jade/40"
                }`}
              >
                {option.label} (
                {routines.filter((routine) => routine.frequency === option.id).length}
                )
              </button>
            ))}
          </div>
        </section>
      )}

      {formRoutine && !printMode && (
        <section
          aria-label={isCreating ? "Créer un rituel" : "Modifier le rituel"}
          className="rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6 print:hidden"
        >
          <h2 className="text-xl font-black text-foreground">
            {isCreating ? "Nouveau rituel" : "Modifier le rituel"}
          </h2>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
              Titre
              <input
                type="text"
                required
                value={formRoutine.title}
                onChange={(event) =>
                  setFormRoutine({ ...formRoutine, title: event.target.value })
                }
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
              Fréquence
              <select
                value={formRoutine.frequency}
                onChange={(event) =>
                  setFormRoutine({
                    ...formRoutine,
                    frequency: event.target.value as RoutineFrequency,
                  })
                }
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              >
                {routineFrequencyOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
              Jour (facultatif)
              <select
                value={formRoutine.day ?? ""}
                onChange={(event) =>
                  setFormRoutine({
                    ...formRoutine,
                    day: (event.target.value || null) as TeacherRoutine["day"],
                  })
                }
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              >
                <option value="">—</option>
                {routineDayOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
              Niveau (facultatif)
              <select
                value={formRoutine.level ?? ""}
                onChange={(event) =>
                  setFormRoutine({
                    ...formRoutine,
                    level: (event.target.value ||
                      null) as TeacherRoutine["level"],
                  })
                }
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              >
                <option value="">—</option>
                {routineLevelOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
              Matière (facultative)
              <select
                value={formRoutine.subject ?? ""}
                onChange={(event) =>
                  setFormRoutine({
                    ...formRoutine,
                    subject: (event.target.value ||
                      null) as TeacherRoutine["subject"],
                  })
                }
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              >
                <option value="">—</option>
                {routineSubjectOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
              Durée
              <input
                type="text"
                required
                placeholder="ex. 10 min"
                value={formRoutine.duration}
                onChange={(event) =>
                  setFormRoutine({ ...formRoutine, duration: event.target.value })
                }
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
              Consigne
              <textarea
                value={formRoutine.instructions}
                onChange={(event) =>
                  setFormRoutine({
                    ...formRoutine,
                    instructions: event.target.value,
                  })
                }
                rows={3}
                className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
              Matériel
              <input
                type="text"
                value={formRoutine.materials}
                onChange={(event) =>
                  setFormRoutine({ ...formRoutine, materials: event.target.value })
                }
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
              Objectif
              <input
                type="text"
                value={formRoutine.objective}
                onChange={(event) =>
                  setFormRoutine({ ...formRoutine, objective: event.target.value })
                }
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              />
            </label>

            <div className="flex gap-3 sm:col-span-2">
              <button
                type="submit"
                className="min-h-11 rounded-md border border-jade/50 bg-jade/10 px-4 text-sm font-bold text-jade transition hover:bg-jade/20"
              >
                {isCreating ? "Créer le rituel" : "Enregistrer les modifications"}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-ember/40"
              >
                Annuler
              </button>
            </div>
          </form>
        </section>
      )}

      <section aria-label="Liste des rituels">
        {filteredRoutines.length === 0 ? (
          <p className="text-sm leading-7 text-muted">
            Aucun rituel ne correspond à la recherche ou aux filtres actuels.
          </p>
        ) : (
          <ul className="grid gap-4 print:gap-2" role="list">
            {filteredRoutines.map((routine) => (
              <li
                key={routine.id}
                className={`rounded-lg border p-5 sm:p-6 print:break-inside-avoid print:border-black/20 print:p-3 ${
                  routine.active
                    ? "border-white/10 bg-background/45"
                    : "border-white/5 bg-background/20 opacity-60"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                      {routineFrequencyOptions.find(
                        (option) => option.id === routine.frequency,
                      )?.label}
                      {labelFor(routineDayOptions, routine.day)
                        ? ` · ${labelFor(routineDayOptions, routine.day)}`
                        : ""}
                      {labelFor(routineLevelOptions, routine.level)
                        ? ` · ${labelFor(routineLevelOptions, routine.level)}`
                        : ""}
                      {labelFor(routineSubjectOptions, routine.subject)
                        ? ` · ${labelFor(routineSubjectOptions, routine.subject)}`
                        : ""}
                    </p>
                    <h3 className="mt-1 text-lg font-black text-foreground">
                      {routine.title}
                      {!routine.active && (
                        <span className="ml-2 text-xs font-bold uppercase tracking-wide text-ember">
                          Désactivé
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-muted">
                      Durée : {routine.duration}
                    </p>
                  </div>

                  {!printMode && (
                    <div className="flex flex-wrap gap-2 print:hidden">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(routine.id)}
                        className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/40"
                      >
                        {routine.active ? "Désactiver" : "Activer"}
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditForm(routine)}
                        className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/40"
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDuplicate(routine)}
                        className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/40"
                      >
                        Dupliquer
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(routine.id)}
                        className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember"
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>

                {routine.instructions && (
                  <p className="mt-3 text-sm leading-6 text-foreground">
                    <span className="font-bold">Consigne : </span>
                    {routine.instructions}
                  </p>
                )}
                {routine.materials && (
                  <p className="mt-2 text-sm leading-6 text-muted">
                    <span className="font-bold text-foreground">Matériel : </span>
                    {routine.materials}
                  </p>
                )}
                {routine.objective && (
                  <p className="mt-2 text-sm leading-6 text-muted">
                    <span className="font-bold text-foreground">Objectif : </span>
                    {routine.objective}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
