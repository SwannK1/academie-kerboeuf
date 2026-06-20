"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  autonomyStatusOptions,
  behaviorStatusOptions,
  createObservation,
  createTrackedStudent,
  defaultClassTrackerState,
  priorityNeedOptions,
  teacherTrackerLevels,
  workStatusOptions,
  type AutonomyStatus,
  type BehaviorStatus,
  type ClassTrackerState,
  type PriorityNeed,
  type TrackedStudent,
  type WorkStatus,
} from "@/content/teacher-class-tracker";

const STORAGE_KEY = "academie-kerboeuf-suivi-classe-v1";

function readStoredState(): ClassTrackerState {
  if (typeof window === "undefined") {
    return defaultClassTrackerState;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultClassTrackerState;
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return defaultClassTrackerState;
    }
    return { ...defaultClassTrackerState, ...(parsed as ClassTrackerState) };
  } catch {
    return defaultClassTrackerState;
  }
}

function writeStoredState(state: ClassTrackerState) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function labelFor<T extends string>(
  options: { id: T; label: string }[],
  id: T,
): string {
  return options.find((option) => option.id === id)?.label ?? id;
}

export function TeacherClassTracker() {
  const [state, setState] = useState<ClassTrackerState>(() =>
    readStoredState(),
  );
  const [newStudentName, setNewStudentName] = useState("");
  const [search, setSearch] = useState("");
  const [needFilter, setNeedFilter] = useState<PriorityNeed | "all">("all");
  const [accompagnerOnly, setAccompagnerOnly] = useState(false);
  const [behaviorFilter, setBehaviorFilter] = useState<BehaviorStatus | "all">(
    "all",
  );
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [newObservationText, setNewObservationText] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    writeStoredState(state);
  }, [state]);

  function addStudent() {
    const name = newStudentName.trim();
    if (!name) {
      return;
    }
    setState((current) => ({
      ...current,
      students: [...current.students, createTrackedStudent(name)],
    }));
    setNewStudentName("");
  }

  function updateStudent(
    studentId: string,
    update: Partial<TrackedStudent>,
  ) {
    setState((current) => ({
      ...current,
      students: current.students.map((student) =>
        student.id === studentId ? { ...student, ...update } : student,
      ),
    }));
  }

  function deleteStudent(studentId: string) {
    setState((current) => ({
      ...current,
      students: current.students.filter((s) => s.id !== studentId),
    }));
    setConfirmDeleteId(null);
  }

  function addObservation(studentId: string) {
    const text = (newObservationText[studentId] ?? "").trim();
    if (!text) {
      return;
    }
    setState((current) => ({
      ...current,
      students: current.students.map((student) =>
        student.id === studentId
          ? {
              ...student,
              observations: [createObservation(text), ...student.observations],
            }
          : student,
      ),
    }));
    setNewObservationText((current) => ({ ...current, [studentId]: "" }));
  }

  function deleteObservation(studentId: string, observationId: string) {
    setState((current) => ({
      ...current,
      students: current.students.map((student) =>
        student.id === studentId
          ? {
              ...student,
              observations: student.observations.filter(
                (o) => o.id !== observationId,
              ),
            }
          : student,
      ),
    }));
  }

  const filteredStudents = useMemo(() => {
    return state.students.filter((student) => {
      if (search.trim() && !student.name.toLowerCase().includes(search.trim().toLowerCase())) {
        return false;
      }
      if (accompagnerOnly && student.work !== "a-accompagner") {
        return false;
      }
      if (needFilter !== "all" && student.priorityNeed !== needFilter) {
        return false;
      }
      if (behaviorFilter !== "all" && student.behavior !== behaviorFilter) {
        return false;
      }
      return true;
    });
  }, [state.students, search, accompagnerOnly, needFilter, behaviorFilter]);

  const counters = useMemo(() => {
    return {
      accompagner: state.students.filter((s) => s.work === "a-accompagner").length,
      lecture: state.students.filter((s) => s.priorityNeed === "lecture").length,
      mathematiques: state.students.filter((s) => s.priorityNeed === "mathematiques").length,
      comportement: state.students.filter((s) => s.priorityNeed === "comportement").length,
    };
  }, [state.students]);

  return (
    <div>
      <p className="rounded-md border border-sky/30 bg-sky/[0.06] p-4 text-sm font-bold text-foreground">
        Les données sont enregistrées uniquement sur cet appareil.
      </p>

      <section aria-labelledby="suivi-niveau-titre" className="mt-8">
        <h2 id="suivi-niveau-titre" className="text-xl font-black text-foreground">
          Niveau
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Niveaux">
          {teacherTrackerLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => setState((current) => ({ ...current, level: level.id }))}
              aria-pressed={level.id === state.level}
              className={[
                "min-h-11 rounded-md border px-4 text-sm font-bold transition",
                level.id === state.level
                  ? "border-jade/60 bg-jade/10 text-jade"
                  : "border-white/10 bg-white/[0.04] text-foreground hover:border-jade/40",
              ].join(" ")}
            >
              {level.label}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="suivi-ajout-titre" className="mt-8">
        <h2 id="suivi-ajout-titre" className="text-xl font-black text-foreground">
          Ajouter un élève
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addStudent();
          }}
          className="mt-4 flex flex-wrap gap-2"
        >
          <label htmlFor="nouvel-eleve" className="sr-only">
            Prénom ou initiale
          </label>
          <input
            id="nouvel-eleve"
            type="text"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            placeholder="Prénom ou initiale"
            className="min-h-11 flex-1 rounded-md border border-white/15 bg-white/[0.04] px-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-jade/40"
          />
          <button
            type="submit"
            className="min-h-11 rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-bold text-jade transition hover:bg-jade/20"
          >
            Ajouter
          </button>
        </form>
      </section>

      <section aria-labelledby="suivi-filtres-titre" className="mt-8">
        <h2 id="suivi-filtres-titre" className="text-xl font-black text-foreground">
          Recherche et filtres
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <label htmlFor="suivi-recherche" className="sr-only">
            Rechercher un élève
          </label>
          <input
            id="suivi-recherche"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un élève"
            className="min-h-11 rounded-md border border-white/15 bg-white/[0.04] px-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-jade/40"
          />

          <button
            type="button"
            onClick={() => setAccompagnerOnly((current) => !current)}
            aria-pressed={accompagnerOnly}
            className={[
              "min-h-11 rounded-md border px-4 text-sm font-bold transition",
              accompagnerOnly
                ? "border-amber/60 bg-amber/10 text-amber"
                : "border-white/10 bg-white/[0.04] text-foreground hover:border-amber/40",
            ].join(" ")}
          >
            À accompagner uniquement
          </button>

          <label htmlFor="filtre-besoin" className="sr-only">
            Filtrer par besoin
          </label>
          <select
            id="filtre-besoin"
            value={needFilter}
            onChange={(e) => setNeedFilter(e.target.value as PriorityNeed | "all")}
            className="min-h-11 rounded-md border border-white/15 bg-white/[0.04] px-3 text-sm text-foreground"
          >
            <option value="all">Tous les besoins</option>
            {priorityNeedOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>

          <label htmlFor="filtre-comportement" className="sr-only">
            Filtrer par comportement
          </label>
          <select
            id="filtre-comportement"
            value={behaviorFilter}
            onChange={(e) =>
              setBehaviorFilter(e.target.value as BehaviorStatus | "all")
            }
            className="min-h-11 rounded-md border border-white/15 bg-white/[0.04] px-3 text-sm text-foreground"
          >
            <option value="all">Tous les comportements</option>
            {behaviorStatusOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section aria-labelledby="suivi-reperes-titre" className="mt-8">
        <h2 id="suivi-reperes-titre" className="text-xl font-black text-foreground">
          Repères pédagogiques internes
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Ces compteurs sont des repères internes pour organiser les
          remédiations, pas des diagnostics.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <Counter label="À accompagner" value={counters.accompagner} />
          <Counter label="Besoins lecture" value={counters.lecture} />
          <Counter label="Besoins mathématiques" value={counters.mathematiques} />
          <Counter label="Besoins comportement" value={counters.comportement} />
        </div>
      </section>

      <section aria-labelledby="suivi-liste-titre" className="mt-8">
        <h2 id="suivi-liste-titre" className="text-xl font-black text-foreground">
          Élèves ({filteredStudents.length})
        </h2>

        {filteredStudents.length === 0 ? (
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
            Aucun élève ne correspond à la recherche ou aux filtres.
          </p>
        ) : (
          <ul className="mt-4 grid gap-4" role="list">
            {filteredStudents.map((student) => (
              <li
                key={student.id}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-lg font-black text-foreground">
                    {student.name}
                  </p>
                  {confirmDeleteId === student.id ? (
                    <div className="flex gap-2">
                      <span className="text-sm text-muted">
                        Supprimer {student.name} ?
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteStudent(student.id)}
                        className="min-h-9 rounded border border-rose/40 bg-rose/10 px-3 text-xs font-bold text-rose"
                      >
                        Confirmer
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-foreground"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(student.id)}
                      className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-muted transition hover:border-rose/40 hover:text-rose"
                    >
                      Supprimer
                    </button>
                  )}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-4">
                  <FieldGroup
                    label="Travail"
                    htmlFor={`travail-${student.id}`}
                  >
                    <select
                      id={`travail-${student.id}`}
                      value={student.work}
                      onChange={(e) =>
                        updateStudent(student.id, {
                          work: e.target.value as WorkStatus,
                        })
                      }
                      className="min-h-11 w-full rounded-md border border-white/15 bg-white/[0.04] px-2 text-sm text-foreground"
                    >
                      {workStatusOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FieldGroup>

                  <FieldGroup
                    label="Autonomie"
                    htmlFor={`autonomie-${student.id}`}
                  >
                    <select
                      id={`autonomie-${student.id}`}
                      value={student.autonomy}
                      onChange={(e) =>
                        updateStudent(student.id, {
                          autonomy: e.target.value as AutonomyStatus,
                        })
                      }
                      className="min-h-11 w-full rounded-md border border-white/15 bg-white/[0.04] px-2 text-sm text-foreground"
                    >
                      {autonomyStatusOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FieldGroup>

                  <FieldGroup
                    label="Comportement"
                    htmlFor={`comportement-${student.id}`}
                  >
                    <select
                      id={`comportement-${student.id}`}
                      value={student.behavior}
                      onChange={(e) =>
                        updateStudent(student.id, {
                          behavior: e.target.value as BehaviorStatus,
                        })
                      }
                      className="min-h-11 w-full rounded-md border border-white/15 bg-white/[0.04] px-2 text-sm text-foreground"
                    >
                      {behaviorStatusOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FieldGroup>

                  <FieldGroup
                    label="Besoin prioritaire"
                    htmlFor={`besoin-${student.id}`}
                  >
                    <select
                      id={`besoin-${student.id}`}
                      value={student.priorityNeed}
                      onChange={(e) =>
                        updateStudent(student.id, {
                          priorityNeed: e.target.value as PriorityNeed,
                        })
                      }
                      className="min-h-11 w-full rounded-md border border-white/15 bg-white/[0.04] px-2 text-sm text-foreground"
                    >
                      {priorityNeedOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FieldGroup>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-muted">
                  <span>{labelFor(workStatusOptions, student.work)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{labelFor(autonomyStatusOptions, student.autonomy)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{labelFor(behaviorStatusOptions, student.behavior)}</span>
                </div>

                <div className="mt-5">
                  <h3 className="text-sm font-black text-foreground">
                    Observations
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addObservation(student.id);
                    }}
                    className="mt-2 flex flex-wrap gap-2"
                  >
                    <label
                      htmlFor={`observation-${student.id}`}
                      className="sr-only"
                    >
                      Nouvelle observation pour {student.name}
                    </label>
                    <input
                      id={`observation-${student.id}`}
                      type="text"
                      value={newObservationText[student.id] ?? ""}
                      onChange={(e) =>
                        setNewObservationText((current) => ({
                          ...current,
                          [student.id]: e.target.value,
                        }))
                      }
                      placeholder="Observation courte"
                      className="min-h-11 flex-1 rounded-md border border-white/15 bg-white/[0.04] px-3 text-sm text-foreground placeholder:text-muted"
                    />
                    <button
                      type="submit"
                      className="min-h-11 rounded-md border border-sky/40 bg-sky/10 px-4 text-sm font-bold text-sky transition hover:bg-sky/20"
                    >
                      Ajouter
                    </button>
                  </form>

                  {student.observations.length > 0 ? (
                    <ul className="mt-3 space-y-2" role="list">
                      {student.observations.map((observation) => (
                        <li
                          key={observation.id}
                          className="flex items-start justify-between gap-3 rounded-md border border-white/10 bg-background/40 p-2 text-sm"
                        >
                          <span className="text-muted">
                            <span className="font-bold text-foreground">
                              {observation.date}
                            </span>{" "}
                            — {observation.text}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              deleteObservation(student.id, observation.id)
                            }
                            aria-label={`Supprimer l'observation du ${observation.date}`}
                            className="min-h-9 shrink-0 rounded border border-white/15 px-2 text-xs font-bold text-muted transition hover:border-rose/40 hover:text-rose"
                          >
                            Supprimer
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-muted">
                      Aucune observation enregistrée.
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Counter({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
      <p className="text-2xl font-black text-foreground">{value}</p>
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
        {label}
      </p>
    </div>
  );
}

function FieldGroup({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-xs font-bold text-muted">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
