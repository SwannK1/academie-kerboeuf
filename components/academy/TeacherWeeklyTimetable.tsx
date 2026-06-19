"use client";

import { useMemo, useState } from "react";
import {
  WEEKLY_HOURS_REFERENCE,
  getRecommendedHoursForLevel,
  getTimetableSubjectsForLevel,
  timetableDays,
  timetableDurationOptions,
  timetableLevels,
  timetableSlots,
  type TimetableDay,
  type TimetableLevel,
  type TimetableSlot,
  type TimetableSubject,
} from "@/content/teacher-timetable";

const STORAGE_KEY = "academie-kerboeuf-emploi-du-temps-v1";

type Cell = {
  subject: TimetableSubject | "";
  durationHours: number;
};

type Schedule = Record<string, Cell>;

type StoredSchedules = Record<TimetableLevel, Schedule>;

function cellKey(day: TimetableDay, slot: TimetableSlot) {
  return `${day}__${slot}`;
}

function readStoredSchedules(): Partial<StoredSchedules> {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return {};
    }
    return parsed as Partial<StoredSchedules>;
  } catch {
    return {};
  }
}

function writeStoredSchedules(schedules: Partial<StoredSchedules>) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
}

function formatHours(hours: number) {
  return hours % 1 === 0 ? `${hours} h` : `${hours.toString().replace(".", ",")} h`;
}

export function TeacherWeeklyTimetable() {
  const [selectedLevel, setSelectedLevel] = useState<TimetableLevel>("cm2");
  const [showWednesday, setShowWednesday] = useState(false);
  const [schedules, setSchedules] = useState<Partial<StoredSchedules>>(() =>
    readStoredSchedules(),
  );

  const subjects = useMemo(
    () => getTimetableSubjectsForLevel(selectedLevel),
    [selectedLevel],
  );

  const recommendedHours = useMemo(
    () => getRecommendedHoursForLevel(selectedLevel),
    [selectedLevel],
  );

  const schedule = useMemo(
    () => schedules[selectedLevel] ?? {},
    [schedules, selectedLevel],
  );

  const visibleDays = useMemo(
    () => timetableDays.filter((day) => !day.optional || showWednesday),
    [showWednesday],
  );

  function updateCell(day: TimetableDay, slot: TimetableSlot, updates: Partial<Cell>) {
    setSchedules((current) => {
      const currentSchedule = current[selectedLevel] ?? {};
      const key = cellKey(day, slot);
      const existing: Cell = currentSchedule[key] ?? { subject: "", durationHours: 1 };
      const nextCell: Cell = { ...existing, ...updates };

      const nextSchedule: Schedule = { ...currentSchedule, [key]: nextCell };
      const next: Partial<StoredSchedules> = { ...current, [selectedLevel]: nextSchedule };
      writeStoredSchedules(next);
      return next;
    });
  }

  function resetTimetable() {
    setSchedules((current) => {
      const next = { ...current };
      delete next[selectedLevel];
      writeStoredSchedules(next);
      return next;
    });
  }

  const totalHours = useMemo(() => {
    return Object.values(schedule).reduce(
      (sum, cell) => (cell.subject ? sum + cell.durationHours : sum),
      0,
    );
  }, [schedule]);

  const subjectHours = useMemo(() => {
    const totals = new Map<TimetableSubject, number>();
    for (const cell of Object.values(schedule)) {
      if (!cell.subject) continue;
      totals.set(cell.subject, (totals.get(cell.subject) ?? 0) + cell.durationHours);
    }
    return totals;
  }, [schedule]);

  let totalStatus: { label: string; className: string };
  if (totalHours < WEEKLY_HOURS_REFERENCE) {
    totalStatus = {
      label: `Total inférieur à ${WEEKLY_HOURS_REFERENCE} h (${formatHours(totalHours)})`,
      className: "border-amber/40 bg-amber/[0.08] text-amber",
    };
  } else if (totalHours === WEEKLY_HOURS_REFERENCE) {
    totalStatus = {
      label: `Total égal à ${WEEKLY_HOURS_REFERENCE} h`,
      className: "border-jade/40 bg-jade/[0.08] text-jade",
    };
  } else {
    totalStatus = {
      label: `Total supérieur à ${WEEKLY_HOURS_REFERENCE} h (${formatHours(totalHours)})`,
      className: "border-rose/40 bg-rose/[0.08] text-rose",
    };
  }

  return (
    <div>
      <section aria-labelledby="choisir-niveau-titre">
        <h2 id="choisir-niveau-titre" className="text-xl font-black text-foreground">
          Choisir un niveau
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Niveaux">
          {timetableLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => setSelectedLevel(level.id)}
              aria-pressed={level.id === selectedLevel}
              className={[
                "min-h-11 rounded-md border px-4 text-sm font-bold transition",
                level.id === selectedLevel
                  ? "border-ember/60 bg-ember/10 text-ember"
                  : "border-white/10 bg-white/[0.04] text-foreground hover:border-ember/40",
              ].join(" ")}
            >
              {level.label}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setShowWednesday((current) => !current)}
          aria-pressed={showWednesday}
          className={[
            "min-h-11 rounded-md border px-4 text-xs font-bold transition",
            showWednesday
              ? "border-sky/60 bg-sky/10 text-sky"
              : "border-white/10 bg-white/[0.04] text-muted hover:border-sky/40",
          ].join(" ")}
        >
          {showWednesday ? "Masquer le mercredi" : "Afficher le mercredi"}
        </button>

        <button
          type="button"
          onClick={resetTimetable}
          className="min-h-11 rounded-md border border-white/15 px-4 text-xs font-bold text-foreground transition hover:border-rose/40 hover:text-rose"
        >
          Réinitialiser l&apos;emploi du temps conseillé
        </button>
      </div>

      <p className="mt-4 text-sm leading-7 text-muted">
        Repère : <strong className="text-foreground">24 heures hebdomadaires</strong> en école élémentaire.
      </p>

      <div
        role="status"
        className={`mt-3 inline-flex rounded-md border px-3 py-2 text-sm font-bold ${totalStatus.className}`}
      >
        {totalStatus.label}
      </div>

      {/* Grille — affichée à partir des écrans larges */}
      <div className="mt-6 hidden overflow-x-auto rounded-lg border border-white/10 lg:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-xs font-bold uppercase tracking-[0.08em] text-muted">
              <th scope="col" className="px-3 py-3">Créneau</th>
              {visibleDays.map((day) => (
                <th key={day.id} scope="col" className="px-3 py-3">
                  {day.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timetableSlots.map((slot) => (
              <tr key={slot.id} className="border-b border-white/5">
                <th scope="row" className="px-3 py-3 font-bold text-foreground">
                  {slot.label}
                </th>
                {visibleDays.map((day) => {
                  const key = cellKey(day.id, slot.id);
                  const cell = schedule[key] ?? { subject: "", durationHours: 1 };
                  return (
                    <td key={day.id} className="px-3 py-3">
                      <div className="flex flex-col gap-2">
                        <label className="sr-only" htmlFor={`${key}-matiere`}>
                          Matière — {day.label} {slot.label}
                        </label>
                        <select
                          id={`${key}-matiere`}
                          value={cell.subject}
                          onChange={(event) =>
                            updateCell(day.id, slot.id, {
                              subject: event.target.value as TimetableSubject | "",
                            })
                          }
                          className="min-h-11 rounded border border-white/15 bg-background/60 px-2 text-xs text-foreground"
                        >
                          <option value="">—</option>
                          {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                              {subject.label}
                            </option>
                          ))}
                        </select>

                        <label className="sr-only" htmlFor={`${key}-duree`}>
                          Durée — {day.label} {slot.label}
                        </label>
                        <select
                          id={`${key}-duree`}
                          value={cell.durationHours}
                          onChange={(event) =>
                            updateCell(day.id, slot.id, {
                              durationHours: Number(event.target.value),
                            })
                          }
                          disabled={!cell.subject}
                          className="min-h-11 rounded border border-white/15 bg-background/60 px-2 text-xs text-foreground disabled:opacity-40"
                        >
                          {timetableDurationOptions.map((duration) => (
                            <option key={duration} value={duration}>
                              {formatHours(duration)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cartes — affichées sur mobile et tablette */}
      <div className="mt-6 flex flex-col gap-4 lg:hidden">
        {visibleDays.map((day) => (
          <section
            key={day.id}
            aria-labelledby={`${day.id}-titre`}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
          >
            <h3 id={`${day.id}-titre`} className="text-sm font-black uppercase tracking-[0.08em] text-foreground">
              {day.label}
            </h3>
            <div className="mt-3 flex flex-col gap-3">
              {timetableSlots.map((slot) => {
                const key = cellKey(day.id, slot.id);
                const cell = schedule[key] ?? { subject: "", durationHours: 1 };
                return (
                  <div key={slot.id} className="rounded-md border border-white/10 bg-background/40 p-3">
                    <p className="text-xs font-bold text-muted">{slot.label}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <label className="sr-only" htmlFor={`${key}-matiere-m`}>
                        Matière — {day.label} {slot.label}
                      </label>
                      <select
                        id={`${key}-matiere-m`}
                        value={cell.subject}
                        onChange={(event) =>
                          updateCell(day.id, slot.id, {
                            subject: event.target.value as TimetableSubject | "",
                          })
                        }
                        className="min-h-11 flex-1 rounded border border-white/15 bg-background/60 px-2 text-xs text-foreground"
                      >
                        <option value="">—</option>
                        {subjects.map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {subject.label}
                          </option>
                        ))}
                      </select>

                      <label className="sr-only" htmlFor={`${key}-duree-m`}>
                        Durée — {day.label} {slot.label}
                      </label>
                      <select
                        id={`${key}-duree-m`}
                        value={cell.durationHours}
                        onChange={(event) =>
                          updateCell(day.id, slot.id, {
                            durationHours: Number(event.target.value),
                          })
                        }
                        disabled={!cell.subject}
                        className="min-h-11 rounded border border-white/15 bg-background/60 px-2 text-xs text-foreground disabled:opacity-40"
                      >
                        {timetableDurationOptions.map((duration) => (
                          <option key={duration} value={duration}>
                            {formatHours(duration)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="compteurs-titre" className="mt-8">
        <h2 id="compteurs-titre" className="text-xl font-black text-foreground">
          Heures par matière
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03] text-xs font-bold uppercase tracking-[0.08em] text-muted">
                <th scope="col" className="px-3 py-3">Matière</th>
                <th scope="col" className="px-3 py-3">Heures planifiées</th>
                <th scope="col" className="px-3 py-3">Objectif conseillé</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => {
                const planned = subjectHours.get(subject.id) ?? 0;
                const target = recommendedHours[subject.id];
                let comparisonLabel = "—";
                if (target !== undefined) {
                  if (planned < target) {
                    comparisonLabel = `En dessous de l'objectif (${formatHours(target)})`;
                  } else if (planned === target) {
                    comparisonLabel = `Conforme à l'objectif (${formatHours(target)})`;
                  } else {
                    comparisonLabel = `Au-dessus de l'objectif (${formatHours(target)})`;
                  }
                }
                return (
                  <tr key={subject.id} className="border-b border-white/5">
                    <td className="px-3 py-3 font-bold text-foreground">{subject.label}</td>
                    <td className="px-3 py-3 text-muted">{formatHours(planned)}</td>
                    <td className="px-3 py-3 text-muted">{comparisonLabel}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
