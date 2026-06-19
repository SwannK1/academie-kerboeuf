"use client";

import { useMemo, useState } from "react";
import {
  teacherLevels,
  teacherSubjects,
  type TeacherLevel,
  type TeacherSubject,
} from "@/content/teacher-programmation";
import {
  DEFAULT_SLOT_DURATION_HOURS,
  WEEKLY_HOURS_TARGET,
  scheduleDays,
  scheduleSlots,
  subjectHourObjectives,
  type ScheduleDay,
  type ScheduleSlot,
} from "@/content/teacher-schedule";

const STORAGE_KEY = "academie-kerboeuf-emploi-du-temps-v1";

type CellKey = `${ScheduleDay}__${ScheduleSlot}`;

type ScheduleGrid = Partial<Record<CellKey, TeacherSubject>>;

type StoredSchedule = {
  level: TeacherLevel;
  grid: ScheduleGrid;
};

function cellKey(day: ScheduleDay, slot: ScheduleSlot): CellKey {
  return `${day}__${slot}`;
}

function readStoredSchedule(): StoredSchedule | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as StoredSchedule;
  } catch {
    return null;
  }
}

function writeStoredSchedule(data: StoredSchedule) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function TeacherWeeklySchedule() {
  const [level, setLevel] = useState<TeacherLevel>(
    () => readStoredSchedule()?.level ?? "cm2",
  );
  const [grid, setGrid] = useState<ScheduleGrid>(
    () => readStoredSchedule()?.grid ?? {},
  );

  function persist(nextLevel: TeacherLevel, nextGrid: ScheduleGrid) {
    writeStoredSchedule({ level: nextLevel, grid: nextGrid });
  }

  function setCell(day: ScheduleDay, slot: ScheduleSlot, subject: TeacherSubject | "") {
    setGrid((current) => {
      const next: ScheduleGrid = { ...current };
      const key = cellKey(day, slot);
      if (subject === "") {
        delete next[key];
      } else {
        next[key] = subject;
      }
      persist(level, next);
      return next;
    });
  }

  function changeLevel(nextLevel: TeacherLevel) {
    setLevel(nextLevel);
    persist(nextLevel, grid);
  }

  function resetSchedule() {
    setGrid({});
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  const totalHours = useMemo(() => {
    return Object.values(grid).reduce(
      (sum, subject) => (subject ? sum + DEFAULT_SLOT_DURATION_HOURS : sum),
      0,
    );
  }, [grid]);

  const hoursBySubject = useMemo(() => {
    const result: Partial<Record<TeacherSubject, number>> = {};
    for (const subject of Object.values(grid)) {
      if (!subject) continue;
      result[subject] = (result[subject] ?? 0) + DEFAULT_SLOT_DURATION_HOURS;
    }
    return result;
  }, [grid]);

  const objectives = subjectHourObjectives[level];

  const alertState: "ok" | "under" | "over" =
    totalHours === WEEKLY_HOURS_TARGET
      ? "ok"
      : totalHours < WEEKLY_HOURS_TARGET
        ? "under"
        : "over";

  const alertCopy: Record<typeof alertState, { label: string; className: string }> = {
    ok: {
      label: `✓ Total conforme : ${totalHours} h sur ${WEEKLY_HOURS_TARGET} h`,
      className: "border-jade/40 bg-jade/[0.08] text-jade",
    },
    under: {
      label: `⚠ Total insuffisant : ${totalHours} h sur ${WEEKLY_HOURS_TARGET} h`,
      className: "border-gold/40 bg-gold/[0.08] text-gold",
    },
    over: {
      label: `✕ Total dépassé : ${totalHours} h sur ${WEEKLY_HOURS_TARGET} h`,
      className: "border-ember/40 bg-ember/[0.08] text-ember",
    },
  };

  return (
    <div>
      <section aria-labelledby="choisir-niveau-titre">
        <h2 id="choisir-niveau-titre" className="text-xl font-black text-foreground">
          Choisir un niveau
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Niveaux">
          {teacherLevels.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => changeLevel(l.id)}
              aria-pressed={l.id === level}
              className={[
                "min-h-11 rounded-md border px-4 text-sm font-bold transition",
                l.id === level
                  ? "border-jade/60 bg-jade/10 text-jade"
                  : "border-white/10 bg-white/[0.04] text-foreground hover:border-jade/40",
              ].join(" ")}
            >
              {l.label}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-black text-foreground">Grille hebdomadaire</h2>
        <button
          type="button"
          onClick={resetSchedule}
          className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-rose/40 hover:text-rose"
        >
          Réinitialiser l&apos;emploi du temps conseillé
        </button>
      </div>

      <p className="mt-3 text-sm leading-7 text-muted">
        Repère : 24 heures hebdomadaires à l&apos;école élémentaire. Chaque
        créneau dure {DEFAULT_SLOT_DURATION_HOURS} h.
      </p>

      {/* Tableau — ordinateur */}
      <div className="mt-6 hidden overflow-x-auto rounded-lg border border-white/10 md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-xs font-black uppercase tracking-[0.08em] text-muted">
              <th scope="col" className="px-4 py-3">Créneau</th>
              {scheduleDays.map((day) => (
                <th
                  key={day.id}
                  scope="col"
                  className={`px-4 py-3 ${day.optional ? "text-muted/70" : ""}`}
                >
                  {day.label}
                  {day.optional ? " (optionnel)" : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scheduleSlots.map((slot) => (
              <tr key={slot.id} className="border-b border-white/5">
                <th scope="row" className="px-4 py-3 font-bold text-foreground">
                  {slot.label}
                </th>
                {scheduleDays.map((day) => {
                  const isWednesdayAfternoon =
                    day.id === "mercredi" &&
                    (slot.id === "apres-midi-1" || slot.id === "apres-midi-2");

                  if (isWednesdayAfternoon) {
                    return (
                      <td key={day.id} className="px-4 py-3 text-xs text-muted/60">
                        —
                      </td>
                    );
                  }

                  const value = grid[cellKey(day.id, slot.id)] ?? "";

                  return (
                    <td key={day.id} className={`px-2 py-2 ${day.optional ? "opacity-80" : ""}`}>
                      <label className="sr-only" htmlFor={`${day.id}-${slot.id}`}>
                        {day.label} — {slot.label}
                      </label>
                      <select
                        id={`${day.id}-${slot.id}`}
                        value={value}
                        onChange={(event) =>
                          setCell(
                            day.id,
                            slot.id,
                            event.target.value as TeacherSubject | "",
                          )
                        }
                        className="min-h-11 w-full rounded-md border border-white/15 bg-background/45 px-2 text-xs font-bold text-foreground"
                      >
                        <option value="">Libre</option>
                        {teacherSubjects.map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {subject.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cartes — mobile */}
      <div className="mt-6 flex flex-col gap-4 md:hidden">
        {scheduleDays.map((day) => (
          <section
            key={day.id}
            className={`rounded-md border border-white/10 bg-white/[0.03] p-4 ${
              day.optional ? "opacity-90" : ""
            }`}
          >
            <h3 className="text-sm font-black uppercase tracking-[0.08em] text-foreground">
              {day.label}
              {day.optional ? " (optionnel)" : ""}
            </h3>
            <div className="mt-3 flex flex-col gap-2">
              {scheduleSlots.map((slot) => {
                const isWednesdayAfternoon =
                  day.id === "mercredi" &&
                  (slot.id === "apres-midi-1" || slot.id === "apres-midi-2");

                if (isWednesdayAfternoon) {
                  return null;
                }

                const value = grid[cellKey(day.id, slot.id)] ?? "";

                return (
                  <div key={slot.id} className="flex items-center justify-between gap-3">
                    <label
                      htmlFor={`mobile-${day.id}-${slot.id}`}
                      className="text-xs font-bold text-muted"
                    >
                      {slot.label}
                    </label>
                    <select
                      id={`mobile-${day.id}-${slot.id}`}
                      value={value}
                      onChange={(event) =>
                        setCell(
                          day.id,
                          slot.id,
                          event.target.value as TeacherSubject | "",
                        )
                      }
                      className="min-h-11 flex-1 rounded-md border border-white/15 bg-background/45 px-2 text-xs font-bold text-foreground"
                    >
                      <option value="">Libre</option>
                      {teacherSubjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div
        role="status"
        className={`mt-8 rounded-md border px-4 py-3 text-sm font-black ${alertCopy[alertState].className}`}
      >
        {alertCopy[alertState].label}
      </div>

      <section className="mt-8" aria-labelledby="repartition-titre">
        <h2 id="repartition-titre" className="text-xl font-black text-foreground">
          Heures par matière
        </h2>

        <div className="mt-4 hidden overflow-x-auto rounded-lg border border-white/10 md:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03] text-xs font-black uppercase tracking-[0.08em] text-muted">
                <th scope="col" className="px-4 py-3">Matière</th>
                <th scope="col" className="px-4 py-3">Heures prévues</th>
                <th scope="col" className="px-4 py-3">Objectif conseillé</th>
                <th scope="col" className="px-4 py-3">Écart</th>
              </tr>
            </thead>
            <tbody>
              {teacherSubjects.map((subject) => {
                const planned = hoursBySubject[subject.id] ?? 0;
                const objective = objectives[subject.id];
                const diff = planned - objective;
                return (
                  <tr key={subject.id} className="border-b border-white/5">
                    <td className="px-4 py-3 font-bold text-foreground">{subject.label}</td>
                    <td className="px-4 py-3 text-muted">{planned} h</td>
                    <td className="px-4 py-3 text-muted">{objective} h</td>
                    <td className="px-4 py-3 text-muted">
                      {diff === 0 ? "Conforme" : diff > 0 ? `+${diff} h` : `${diff} h`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <ul className="mt-4 flex flex-col gap-2 md:hidden">
          {teacherSubjects.map((subject) => {
            const planned = hoursBySubject[subject.id] ?? 0;
            const objective = objectives[subject.id];
            const diff = planned - objective;
            return (
              <li
                key={subject.id}
                className="rounded-md border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="text-sm font-bold text-foreground">{subject.label}</p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  Prévu : {planned} h · Objectif : {objective} h ·{" "}
                  {diff === 0 ? "Conforme" : diff > 0 ? `+${diff} h` : `${diff} h`}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
