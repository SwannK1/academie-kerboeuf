"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  buildTeacherTimetableCellKey,
  getRecommendedTeacherTimetable,
  TEACHER_TIMETABLE_STORAGE_KEY,
  TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET,
  teacherTimetableDays,
  teacherTimetableLevels,
  teacherTimetableSlots,
  teacherTimetableSubjectsByLevel,
  type TeacherTimetableLevelId,
  type TeacherTimetableState,
} from "@/content/teacher-timetable";

const DEFAULT_LEVEL_ID: TeacherTimetableLevelId = "cm2";

function readStoredState(): TeacherTimetableState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(TEACHER_TIMETABLE_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as TeacherTimetableState;
    if (!parsed || typeof parsed.levelId !== "string" || !parsed.assignments) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function TeacherWeeklyTimetableClient({
  initialNiveau,
}: {
  initialNiveau?: string;
} = {}) {
  const startingLevel =
    (teacherTimetableLevels.find((l) => l.id === initialNiveau)
      ?.id as TeacherTimetableLevelId) ?? DEFAULT_LEVEL_ID;

  const [state, setState] = useState<TeacherTimetableState>(
    () =>
      readStoredState() ?? getRecommendedTeacherTimetable(startingLevel),
  );

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_TIMETABLE_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  const subjects = teacherTimetableSubjectsByLevel[state.levelId];

  const hoursBySubject = useMemo(() => {
    const totals = new Map<string, number>();
    for (const day of teacherTimetableDays) {
      for (const slot of teacherTimetableSlots) {
        const key = buildTeacherTimetableCellKey(day.id, slot.id);
        const subject = state.assignments[key];
        if (!subject) {
          continue;
        }
        totals.set(subject, (totals.get(subject) ?? 0) + slot.durationHours);
      }
    }
    return totals;
  }, [state.assignments]);

  const totalHours = useMemo(
    () =>
      Array.from(hoursBySubject.values()).reduce(
        (sum, hours) => sum + hours,
        0,
      ),
    [hoursBySubject],
  );

  function handleLevelChange(levelId: TeacherTimetableLevelId) {
    setState((previous) => ({
      levelId,
      assignments: levelId === previous.levelId ? previous.assignments : {},
    }));
  }

  function handleAssignmentChange(
    dayId: (typeof teacherTimetableDays)[number]["id"],
    slotId: (typeof teacherTimetableSlots)[number]["id"],
    subject: string,
  ) {
    setState((previous) => {
      const key = buildTeacherTimetableCellKey(dayId, slotId);
      const nextAssignments = { ...previous.assignments };
      if (subject) {
        nextAssignments[key] = subject;
      } else {
        delete nextAssignments[key];
      }
      return { ...previous, assignments: nextAssignments };
    });
  }

  function handleReset() {
    setState(getRecommendedTeacherTimetable(state.levelId));
  }

  const hoursDelta = totalHours - TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET;

  return (
    <div className="mt-10">
      <section aria-label="Choix du niveau">
        <h2 className="text-xl font-black text-foreground">
          Choisir un niveau
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {teacherTimetableLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => handleLevelChange(level.id)}
              aria-pressed={level.id === state.levelId}
              className={[
                "min-h-11 rounded-md border px-3 text-sm font-bold transition",
                level.id === state.levelId
                  ? "border-jade/60 bg-jade/10 text-jade"
                  : "border-white/10 bg-white/[0.04] text-foreground hover:border-jade/40",
              ].join(" ")}
            >
              {level.label}
            </button>
          ))}
        </div>
      </section>

      <section
        aria-label="Grille hebdomadaire"
        className="mt-8 rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black text-foreground">
            Grille de la semaine — {
              teacherTimetableLevels.find((level) => level.id === state.levelId)
                ?.label
            }
          </h2>
        </div>

        {/* Tableau classique sur grand écran */}
        <div className="mt-5 hidden overflow-x-auto sm:block">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              Emploi du temps hebdomadaire par jour et par créneau
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="border-b border-white/10 p-2 text-left text-xs font-bold uppercase tracking-wide text-muted"
                >
                  Créneau
                </th>
                {teacherTimetableDays.map((day) => (
                  <th
                    key={day.id}
                    scope="col"
                    className="border-b border-white/10 p-2 text-left text-xs font-bold uppercase tracking-wide text-muted"
                  >
                    {day.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teacherTimetableSlots.map((slot) => (
                <tr key={slot.id}>
                  <th
                    scope="row"
                    className="border-b border-white/5 p-2 text-left font-bold text-foreground"
                  >
                    {slot.label}
                    <span className="block text-xs font-normal text-muted">
                      {slot.durationHours} h
                    </span>
                  </th>
                  {teacherTimetableDays.map((day) => {
                    const key = buildTeacherTimetableCellKey(day.id, slot.id);
                    const fieldId = `creneau-${key}`;
                    return (
                      <td key={day.id} className="border-b border-white/5 p-2">
                        <label htmlFor={fieldId} className="sr-only">
                          Matière — {day.label}, {slot.label}
                        </label>
                        <select
                          id={fieldId}
                          value={state.assignments[key] ?? ""}
                          onChange={(event) =>
                            handleAssignmentChange(
                              day.id,
                              slot.id,
                              event.target.value,
                            )
                          }
                          className="min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
                        >
                          <option value="">—</option>
                          {subjects.map((subject) => (
                            <option key={subject} value={subject}>
                              {subject}
                            </option>
                          ))}
                        </select>
                        {state.assignments[key] ? (
                          <Link
                            href={`/enseignants/preparer-une-seance?niveau=${state.levelId}&matiere=${encodeURIComponent(state.assignments[key] ?? "")}&jour=${day.id}&creneau=${slot.id}`}
                            className="mt-1 inline-flex text-xs font-bold text-sky transition hover:text-sky/80"
                          >
                            Préparer une séance →
                          </Link>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Version cartes sur mobile */}
        <div className="mt-5 grid gap-4 sm:hidden">
          {teacherTimetableDays.map((day) => (
            <div
              key={day.id}
              className="rounded-md border border-white/10 bg-background/45 p-4"
            >
              <p className="text-sm font-black text-foreground">{day.label}</p>
              <div className="mt-3 grid gap-3">
                {teacherTimetableSlots.map((slot) => {
                  const key = buildTeacherTimetableCellKey(day.id, slot.id);
                  const fieldId = `creneau-mobile-${key}`;
                  return (
                    <div key={slot.id}>
                      <label
                        htmlFor={fieldId}
                        className="block text-xs font-bold uppercase tracking-wide text-muted"
                      >
                        {slot.label} ({slot.durationHours} h)
                      </label>
                      <select
                        id={fieldId}
                        value={state.assignments[key] ?? ""}
                        onChange={(event) =>
                          handleAssignmentChange(
                            day.id,
                            slot.id,
                            event.target.value,
                          )
                        }
                        className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-2 text-sm text-foreground"
                      >
                        <option value="">—</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                      {state.assignments[key] ? (
                        <Link
                          href={`/enseignants/preparer-une-seance?niveau=${state.levelId}&matiere=${encodeURIComponent(state.assignments[key] ?? "")}&jour=${day.id}&creneau=${slot.id}`}
                          className="mt-1 inline-flex text-xs font-bold text-sky transition hover:text-sky/80"
                        >
                          Préparer une séance →
                        </Link>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-label="Compteurs d'heures"
        className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black text-foreground">
            Total : {totalHours} h / {TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET} h
          </h2>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
          >
            Réinitialiser l’emploi du temps conseillé
          </button>
        </div>

        {hoursDelta !== 0 ? (
          <p
            role="status"
            className={[
              "mt-3 rounded-md border px-4 py-2 text-sm font-bold",
              hoursDelta > 0
                ? "border-ember/30 bg-ember/[0.08] text-ember"
                : "border-gold/30 bg-gold/[0.08] text-gold",
            ].join(" ")}
          >
            {hoursDelta > 0
              ? `Le total dépasse de ${hoursDelta} h le repère de ${TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET} h hebdomadaires.`
              : `Le total n’atteint pas le repère de ${TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET} h hebdomadaires (manque ${-hoursDelta} h).`}
          </p>
        ) : (
          <p
            role="status"
            className="mt-3 rounded-md border border-jade/30 bg-jade/[0.08] px-4 py-2 text-sm font-bold text-jade"
          >
            Le total correspond au repère de {TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET} h
            hebdomadaires.
          </p>
        )}

        <div className="mt-5">
          <p className="text-sm font-bold text-foreground">
            Heures par matière
          </p>
          {hoursBySubject.size > 0 ? (
            <ul className="mt-2 grid gap-2 sm:grid-cols-2" role="list">
              {subjects
                .filter((subject) => hoursBySubject.has(subject))
                .map((subject) => (
                  <li
                    key={subject}
                    className="flex min-h-11 items-center justify-between rounded-md border border-white/10 bg-background/45 px-4 text-sm font-bold text-foreground"
                  >
                    {subject}
                    <span className="text-muted">
                      {hoursBySubject.get(subject)} h
                    </span>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm leading-7 text-muted">
              Aucun créneau n’est encore associé à une matière.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
