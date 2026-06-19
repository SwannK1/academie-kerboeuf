"use client";

import { useEffect, useMemo, useState } from "react";
import { teacherLevels, type TeacherLevel } from "@/content/teacher-programmation";

const STORAGE_KEY = "academie-kerboeuf-plan-de-classe-v1";

type ClassroomPlan = {
  studentsText: string;
  rows: number;
  cols: number;
  seatAssignments: Record<string, string>;
};

type StoredPlans = Record<string, ClassroomPlan>;

function emptyPlan(): ClassroomPlan {
  return { studentsText: "", rows: 4, cols: 6, seatAssignments: {} };
}

function readStoredPlans(): StoredPlans {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") {
      return parsed as StoredPlans;
    }
    return {};
  } catch {
    return {};
  }
}

function seatKey(row: number, col: number): string {
  return `${row}__${col}`;
}

export function TeacherClassroomPlanClient({
  initialNiveau,
}: {
  initialNiveau?: string;
}) {
  const [niveau, setNiveau] = useState<TeacherLevel>(
    (teacherLevels.find((l) => l.id === initialNiveau)?.id as TeacherLevel) ??
      "cm2",
  );
  const [plans, setPlans] = useState<StoredPlans>(() => readStoredPlans());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  }, [plans]);

  const plan = plans[niveau] ?? emptyPlan();

  const students = useMemo(
    () =>
      plan.studentsText
        .split("\n")
        .map((name) => name.trim())
        .filter(Boolean),
    [plan.studentsText],
  );

  function updatePlan(update: Partial<ClassroomPlan>) {
    setPlans((prev) => ({
      ...prev,
      [niveau]: { ...(prev[niveau] ?? emptyPlan()), ...update },
    }));
  }

  function assignSeat(row: number, col: number, student: string) {
    const nextAssignments = { ...plan.seatAssignments };
    const key = seatKey(row, col);
    if (student) {
      nextAssignments[key] = student;
    } else {
      delete nextAssignments[key];
    }
    updatePlan({ seatAssignments: nextAssignments });
  }

  function resetPlan() {
    setPlans((prev) => {
      const next = { ...prev };
      delete next[niveau];
      return next;
    });
  }

  const assignedStudents = new Set(Object.values(plan.seatAssignments));
  const unassignedStudents = students.filter(
    (name) => !assignedStudents.has(name),
  );

  return (
    <div className="mt-10 space-y-8">
      <section aria-labelledby="choix-niveau-plan">
        <h2 id="choix-niveau-plan" className="text-xl font-black text-foreground">
          Choisir le niveau
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Niveaux">
          {teacherLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => setNiveau(level.id)}
              aria-pressed={level.id === niveau}
              className={[
                "min-h-11 rounded-md border px-4 text-sm font-bold transition",
                level.id === niveau
                  ? "border-jade/60 bg-jade/10 text-jade"
                  : "border-white/10 bg-white/[0.04] text-foreground hover:border-jade/40",
              ].join(" ")}
            >
              {level.label}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="liste-eleves">
        <h2 id="liste-eleves" className="text-xl font-black text-foreground">
          Liste des élèves
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Un nom par ligne. Cette liste reste uniquement sur cet appareil.
        </p>
        <textarea
          value={plan.studentsText}
          onChange={(event) => updatePlan({ studentsText: event.target.value })}
          rows={6}
          className="mt-3 w-full rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
        />
      </section>

      <section aria-labelledby="dimensions-plan">
        <h2 id="dimensions-plan" className="text-xl font-black text-foreground">
          Dimensions de la salle
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Rangées
            <input
              type="number"
              min={1}
              max={10}
              value={plan.rows}
              onChange={(event) =>
                updatePlan({ rows: Number(event.target.value) || 1 })
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Colonnes
            <input
              type="number"
              min={1}
              max={10}
              value={plan.cols}
              onChange={(event) =>
                updatePlan({ cols: Number(event.target.value) || 1 })
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
        </div>
      </section>

      <section aria-labelledby="grille-plan">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="grille-plan" className="text-xl font-black text-foreground">
            Placer les élèves
          </h2>
          <button
            type="button"
            onClick={resetPlan}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember"
          >
            Réinitialiser le plan
          </button>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted">
          Choisissez l&apos;élève de chaque place avec le menu déroulant.
        </p>

        <div
          className="mt-4 grid gap-2"
          style={{ gridTemplateColumns: `repeat(${plan.cols}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: plan.rows }).map((_, rowIndex) =>
            Array.from({ length: plan.cols }).map((_, colIndex) => {
              const key = seatKey(rowIndex, colIndex);
              const fieldId = `place-${key}`;
              return (
                <div
                  key={key}
                  className="rounded-md border border-white/10 bg-background/45 p-2"
                >
                  <label htmlFor={fieldId} className="sr-only">
                    Place rangée {rowIndex + 1}, colonne {colIndex + 1}
                  </label>
                  <select
                    id={fieldId}
                    value={plan.seatAssignments[key] ?? ""}
                    onChange={(event) =>
                      assignSeat(rowIndex, colIndex, event.target.value)
                    }
                    className="min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-2 text-xs text-foreground"
                  >
                    <option value="">—</option>
                    {students.map((student) => (
                      <option key={student} value={student}>
                        {student}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }),
          )}
        </div>

        {students.length > 0 ? (
          <p className="mt-4 text-sm leading-6 text-muted">
            Élèves non placés : {unassignedStudents.length > 0
              ? unassignedStudents.join(", ")
              : "aucun"}
          </p>
        ) : null}
      </section>
    </div>
  );
}
