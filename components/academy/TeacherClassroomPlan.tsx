"use client";

import { useEffect, useMemo, useState } from "react";
import {
  defaultClassroomPlanState,
  generateSeatsForLayout,
  seatLayoutOptions,
  teacherPlanLevels,
  type ClassroomPlanState,
  type Seat,
  type SeatLayoutId,
  type Student,
} from "@/content/teacher-classroom-plan";

const STORAGE_KEY = "academie-kerboeuf-plan-de-classe-v1";

function readStoredState(): ClassroomPlanState {
  if (typeof window === "undefined") {
    return defaultClassroomPlanState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultClassroomPlanState;
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return defaultClassroomPlanState;
    }
    return { ...defaultClassroomPlanState, ...(parsed as ClassroomPlanState) };
  } catch {
    return defaultClassroomPlanState;
  }
}

function writeStoredState(state: ClassroomPlanState) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createStudentId() {
  return `eleve-${Math.random().toString(36).slice(2, 10)}`;
}

export function TeacherClassroomPlan() {
  const [state, setState] = useState<ClassroomPlanState>(() =>
    readStoredState(),
  );
  const [newStudentName, setNewStudentName] = useState("");
  const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null);
  const [swapFirstSeatId, setSwapFirstSeatId] = useState<string | null>(null);

  useEffect(() => {
    writeStoredState(state);
  }, [state]);

  const placedStudentIds = useMemo(
    () => new Set(Object.values(state.assignments)),
    [state.assignments],
  );

  const unplacedStudents = useMemo(
    () => state.students.filter((student) => !placedStudentIds.has(student.id)),
    [state.students, placedStudentIds],
  );

  function setLevel(level: ClassroomPlanState["level"]) {
    setState((current) => ({ ...current, level }));
  }

  function addStudent() {
    const firstName = newStudentName.trim();
    if (!firstName) {
      return;
    }
    const student: Student = { id: createStudentId(), firstName };
    setState((current) => ({
      ...current,
      students: [...current.students, student],
    }));
    setNewStudentName("");
  }

  function removeStudent(studentId: string) {
    setState((current) => {
      const assignments = { ...current.assignments };
      for (const [seatId, assignedId] of Object.entries(assignments)) {
        if (assignedId === studentId) {
          delete assignments[seatId];
        }
      }
      return {
        ...current,
        students: current.students.filter((s) => s.id !== studentId),
        assignments,
      };
    });
    setSelectedSeatId(null);
    setSwapFirstSeatId(null);
  }

  function applyLayout(layout: SeatLayoutId) {
    const seats = generateSeatsForLayout(layout, state.students.length);
    setState((current) => ({
      ...current,
      layout,
      seats,
      assignments: {},
    }));
    setSelectedSeatId(null);
    setSwapFirstSeatId(null);
  }

  function clearSeats() {
    setState((current) => ({ ...current, assignments: {} }));
    setSelectedSeatId(null);
    setSwapFirstSeatId(null);
  }

  function resetPlan() {
    setState(defaultClassroomPlanState);
    setSelectedSeatId(null);
    setSwapFirstSeatId(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  function assignStudentToSeat(seatId: string, studentId: string) {
    setState((current) => {
      const assignments = { ...current.assignments };
      for (const [existingSeatId, assignedId] of Object.entries(assignments)) {
        if (assignedId === studentId) {
          delete assignments[existingSeatId];
        }
      }
      delete assignments[seatId];
      assignments[seatId] = studentId;
      return { ...current, assignments };
    });
  }

  function unassignSeat(seatId: string) {
    setState((current) => {
      const assignments = { ...current.assignments };
      delete assignments[seatId];
      return { ...current, assignments };
    });
  }

  function swapSeats(seatIdA: string, seatIdB: string) {
    setState((current) => {
      const assignments = { ...current.assignments };
      const studentA = assignments[seatIdA];
      const studentB = assignments[seatIdB];

      if (studentB) {
        assignments[seatIdA] = studentB;
      } else {
        delete assignments[seatIdA];
      }

      if (studentA) {
        assignments[seatIdB] = studentA;
      } else {
        delete assignments[seatIdB];
      }

      return { ...current, assignments };
    });
  }

  function moveStudentToAdjacentSeat(seatId: string, direction: "left" | "right" | "up" | "down") {
    const seat = state.seats.find((s) => s.id === seatId);
    if (!seat) {
      return;
    }
    const targetRow = seat.row + (direction === "down" ? 1 : direction === "up" ? -1 : 0);
    const targetCol = seat.col + (direction === "right" ? 1 : direction === "left" ? -1 : 0);
    const targetSeat = state.seats.find(
      (s) => s.row === targetRow && s.col === targetCol,
    );
    if (!targetSeat) {
      return;
    }
    swapSeats(seatId, targetSeat.id);
    setSelectedSeatId(targetSeat.id);
  }

  function handleSeatClick(seat: Seat) {
    if (swapFirstSeatId) {
      if (swapFirstSeatId !== seat.id) {
        swapSeats(swapFirstSeatId, seat.id);
      }
      setSwapFirstSeatId(null);
      return;
    }
    setSelectedSeatId(seat.id);
  }

  const maxRow = state.seats.reduce((max, s) => Math.max(max, s.row), 0);
  const maxCol = state.seats.reduce((max, s) => Math.max(max, s.col), 0);

  return (
    <div>
      <section aria-labelledby="plan-niveau-titre">
        <h2 id="plan-niveau-titre" className="text-xl font-black text-foreground">
          Niveau
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Niveaux">
          {teacherPlanLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => setLevel(level.id)}
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

      <section aria-labelledby="plan-eleves-titre" className="mt-8">
        <h2 id="plan-eleves-titre" className="text-xl font-black text-foreground">
          Élèves de la classe
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Nombre d&apos;élèves : {state.students.length}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addStudent();
          }}
          className="mt-4 flex flex-wrap gap-2"
        >
          <label htmlFor="nouveau-prenom" className="sr-only">
            Prénom de l&apos;élève
          </label>
          <input
            id="nouveau-prenom"
            type="text"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            placeholder="Prénom"
            className="min-h-11 flex-1 rounded-md border border-white/15 bg-white/[0.04] px-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-jade/40"
          />
          <button
            type="submit"
            className="min-h-11 rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-bold text-jade transition hover:bg-jade/20"
          >
            Ajouter un élève
          </button>
        </form>

        {state.students.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2" role="list">
            {state.students.map((student) => (
              <li
                key={student.id}
                className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-foreground"
              >
                {student.firstName}
                <button
                  type="button"
                  onClick={() => removeStudent(student.id)}
                  aria-label={`Retirer ${student.firstName}`}
                  className="min-h-6 rounded border border-white/15 px-1.5 text-xs font-bold text-muted transition hover:border-rose/40 hover:text-rose"
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm leading-6 text-muted">
            Aucun élève ajouté pour le moment.
          </p>
        )}
      </section>

      <section aria-labelledby="plan-disposition-titre" className="mt-8">
        <h2 id="plan-disposition-titre" className="text-xl font-black text-foreground">
          Disposition de départ
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Dispositions">
          {seatLayoutOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setState((current) => ({ ...current, layout: option.id }))}
              aria-pressed={option.id === state.layout}
              className={[
                "min-h-11 rounded-md border px-4 text-sm font-bold transition",
                option.id === state.layout
                  ? "border-sky/60 bg-sky/10 text-sky"
                  : "border-white/10 bg-white/[0.04] text-foreground hover:border-sky/40",
              ].join(" ")}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyLayout(state.layout)}
            disabled={state.students.length === 0}
            className="min-h-11 rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-bold text-jade transition hover:bg-jade/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Appliquer une disposition
          </button>
          <button
            type="button"
            onClick={clearSeats}
            disabled={state.seats.length === 0}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-sky/40 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Effacer les places
          </button>
          <button
            type="button"
            onClick={resetPlan}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-rose/40 hover:text-rose"
          >
            Réinitialiser le plan
          </button>
        </div>
      </section>

      <section aria-labelledby="plan-grille-titre" className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="plan-grille-titre" className="text-xl font-black text-foreground">
            Plan de la classe
          </h2>
          <p className="text-sm font-bold text-foreground" aria-live="polite">
            {placedStudentIds.size} élèves placés sur {state.students.length}
          </p>
        </div>

        {state.seats.length === 0 ? (
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
            Aucune place disponible. Choisissez une disposition puis cliquez sur
            « Appliquer une disposition ».
          </p>
        ) : (
          <div
            className="mt-4 grid gap-2 overflow-x-auto sm:gap-3"
            style={{
              gridTemplateColumns: `repeat(${maxCol + 1}, minmax(3.5rem, 1fr))`,
              gridTemplateRows: `repeat(${maxRow + 1}, auto)`,
            }}
            role="grid"
            aria-label="Places de la classe"
          >
            {state.seats.map((seat) => {
              const studentId = state.assignments[seat.id];
              const student = state.students.find((s) => s.id === studentId);
              const isSelected = selectedSeatId === seat.id;
              const isSwapPending = swapFirstSeatId === seat.id;

              return (
                <div
                  key={seat.id}
                  style={{ gridRow: seat.row + 1, gridColumn: seat.col + 1 }}
                  className={[
                    "flex min-h-16 flex-col items-center justify-center rounded-md border p-1 text-center text-xs",
                    isSwapPending
                      ? "border-amber/60 bg-amber/10"
                      : isSelected
                        ? "border-sky/60 bg-sky/10"
                        : student
                          ? "border-jade/40 bg-jade/[0.06]"
                          : "border-white/15 bg-white/[0.03]",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={() => handleSeatClick(seat)}
                    aria-pressed={isSelected || isSwapPending}
                    aria-label={
                      student
                        ? `Place occupée par ${student.firstName}`
                        : "Place libre"
                    }
                    className="min-h-11 w-full rounded text-xs font-bold text-foreground"
                  >
                    {student ? student.firstName : "Libre"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {selectedSeatId ? (
          <SeatActions
            seatId={selectedSeatId}
            assignedStudentId={state.assignments[selectedSeatId] ?? null}
            unplacedStudents={unplacedStudents}
            students={state.students}
            onAssign={(studentId) => assignStudentToSeat(selectedSeatId, studentId)}
            onUnassign={() => unassignSeat(selectedSeatId)}
            onMove={(direction) => moveStudentToAdjacentSeat(selectedSeatId, direction)}
            onStartSwap={() => {
              setSwapFirstSeatId(selectedSeatId);
              setSelectedSeatId(null);
            }}
          />
        ) : null}

        {swapFirstSeatId ? (
          <p className="mt-4 rounded-md border border-amber/40 bg-amber/10 p-3 text-sm font-bold text-amber">
            Sélectionnez la place avec laquelle échanger.
          </p>
        ) : null}
      </section>

      <section aria-labelledby="plan-non-places-titre" className="mt-8">
        <h2 id="plan-non-places-titre" className="text-xl font-black text-foreground">
          Élèves non placés
        </h2>
        {unplacedStudents.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-muted">
            Tous les élèves sont placés.
          </p>
        ) : (
          <ul className="mt-3 flex flex-wrap gap-2" role="list">
            {unplacedStudents.map((student) => (
              <li
                key={student.id}
                className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-foreground"
              >
                {student.firstName}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function SeatActions({
  seatId,
  assignedStudentId,
  unplacedStudents,
  students,
  onAssign,
  onUnassign,
  onMove,
  onStartSwap,
}: {
  seatId: string;
  assignedStudentId: string | null;
  unplacedStudents: Student[];
  students: Student[];
  onAssign: (studentId: string) => void;
  onUnassign: () => void;
  onMove: (direction: "left" | "right" | "up" | "down") => void;
  onStartSwap: () => void;
}) {
  const assignedStudent = students.find((s) => s.id === assignedStudentId);

  return (
    <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <p className="text-sm font-bold text-foreground">
        Place sélectionnée : {seatId}
      </p>
      <p className="mt-1 text-sm text-muted">
        {assignedStudent
          ? `Occupée par ${assignedStudent.firstName}`
          : "Place libre"}
      </p>

      {unplacedStudents.length > 0 ? (
        <div className="mt-3">
          <label htmlFor="assigner-eleve" className="text-xs font-bold text-muted">
            Assigner un élève
          </label>
          <select
            id="assigner-eleve"
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) {
                onAssign(e.target.value);
              }
            }}
            className="mt-1 min-h-11 w-full rounded-md border border-white/15 bg-white/[0.04] px-3 text-sm text-foreground"
          >
            <option value="" disabled>
              Choisir un élève
            </option>
            {unplacedStudents.map((student) => (
              <option key={student.id} value={student.id}>
                {student.firstName}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onMove("left")}
          className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-sky/40"
        >
          ← Déplacer à gauche
        </button>
        <button
          type="button"
          onClick={() => onMove("right")}
          className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-sky/40"
        >
          Déplacer à droite →
        </button>
        <button
          type="button"
          onClick={() => onMove("up")}
          className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-sky/40"
        >
          ↑ Avancer
        </button>
        <button
          type="button"
          onClick={() => onMove("down")}
          className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-sky/40"
        >
          ↓ Reculer
        </button>
        <button
          type="button"
          onClick={onStartSwap}
          disabled={!assignedStudent}
          className="min-h-11 rounded-md border border-amber/40 bg-amber/10 px-3 text-sm font-bold text-amber transition hover:bg-amber/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Échanger avec une autre place
        </button>
        {assignedStudent ? (
          <button
            type="button"
            onClick={onUnassign}
            className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-rose/40 hover:text-rose"
          >
            Libérer la place
          </button>
        ) : null}
      </div>
    </div>
  );
}
