"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  buildTeacherLessonPlannerHref,
  matiereIdFromLabel,
} from "@/content/teacher-lesson-planner";
import {
  buildTeacherPlanningCellKey,
  createEmptyTeacherPlanningState,
  getDurationHours,
  migrateLegacyTeacherTimetable,
  TEACHER_PLANNING_LEGACY_STORAGE_KEY,
  TEACHER_PLANNING_STORAGE_KEY,
  TEACHER_PLANNING_WEEKLY_HOURS_TARGET,
  teacherPlanningDays,
  teacherPlanningDurations,
  teacherPlanningLevels,
  teacherPlanningSlots,
  teacherPlanningSubjectsByLevel,
  teacherPlanningWednesday,
  teacherPlanningWednesdaySlots,
  type TeacherPlanningCellKey,
  type TeacherPlanningDayId,
  type TeacherPlanningDurationId,
  type TeacherPlanningSlotId,
  type TeacherPlanningState,
} from "@/content/teacher-planning";

const DEFAULT_LEVEL_ID = teacherPlanningLevels[0].id;

type PanelMode = "menu" | "subject" | "duration" | "copy";

function readStoredState(): TeacherPlanningState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(TEACHER_PLANNING_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as TeacherPlanningState;
      if (parsed && typeof parsed.levelId === "string" && parsed.assignments) {
        return { ...parsed, showWednesday: Boolean(parsed.showWednesday) };
      }
      return null;
    }

    const legacyRaw = window.localStorage.getItem(
      TEACHER_PLANNING_LEGACY_STORAGE_KEY,
    );
    if (legacyRaw) {
      return migrateLegacyTeacherTimetable(legacyRaw);
    }

    return null;
  } catch {
    return null;
  }
}

export function TeacherWeeklyScheduleClient() {
  const [state, setState] = useState<TeacherPlanningState>(
    () => readStoredState() ?? createEmptyTeacherPlanningState(DEFAULT_LEVEL_ID),
  );
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] =
    useState<TeacherPlanningDurationId | null>(null);
  const [activeCell, setActiveCell] = useState<TeacherPlanningCellKey | null>(
    null,
  );
  const [panelMode, setPanelMode] = useState<PanelMode>("menu");
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_PLANNING_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  const subjects = teacherPlanningSubjectsByLevel[state.levelId];

  const allCellEntries = useMemo(() => {
    const days = state.showWednesday
      ? [...teacherPlanningDays.slice(0, 2), teacherPlanningWednesday, ...teacherPlanningDays.slice(2)]
      : teacherPlanningDays;
    return days;
  }, [state.showWednesday]);

  function slotsForDay(dayId: TeacherPlanningDayId) {
    return dayId === "mercredi" ? teacherPlanningWednesdaySlots : teacherPlanningSlots;
  }

  const hoursBySubject = useMemo(() => {
    const totals = new Map<string, number>();
    for (const [, cell] of Object.entries(state.assignments)) {
      if (!cell) continue;
      const hours = getDurationHours(cell.durationId);
      totals.set(cell.subject, (totals.get(cell.subject) ?? 0) + hours);
    }
    return totals;
  }, [state.assignments]);

  const totalHours = useMemo(
    () =>
      Array.from(hoursBySubject.values()).reduce((sum, hours) => sum + hours, 0),
    [hoursBySubject],
  );

  function closePanel() {
    setActiveCell(null);
    setPanelMode("menu");
  }

  function handleLevelChange(levelId: (typeof teacherPlanningLevels)[number]["id"]) {
    if (levelId === state.levelId) return;
    setState({ levelId, assignments: {}, showWednesday: state.showWednesday });
    setSelectedSubject(null);
    setSelectedDuration(null);
    closePanel();
    setHint(null);
  }

  function handleToggleWednesday() {
    setState((previous) => ({ ...previous, showWednesday: !previous.showWednesday }));
    closePanel();
  }

  function handleSlotClick(dayId: TeacherPlanningDayId, slotId: TeacherPlanningSlotId) {
    const key = buildTeacherPlanningCellKey(dayId, slotId);
    const existing = state.assignments[key];

    if (existing) {
      setActiveCell(key);
      setPanelMode("menu");
      setHint(null);
      return;
    }

    if (!selectedSubject || !selectedDuration) {
      setHint("Choisissez d’abord une matière et une durée dans la réserve.");
      return;
    }

    setState((previous) => ({
      ...previous,
      assignments: {
        ...previous.assignments,
        [key]: { subject: selectedSubject, durationId: selectedDuration },
      },
    }));
    setHint(null);
  }

  function handleClearCell(key: TeacherPlanningCellKey) {
    setState((previous) => {
      const next = { ...previous.assignments };
      delete next[key];
      return { ...previous, assignments: next };
    });
    closePanel();
  }

  function handleChangeSubject(key: TeacherPlanningCellKey, subject: string) {
    setState((previous) => {
      const existing = previous.assignments[key];
      if (!existing) return previous;
      return {
        ...previous,
        assignments: { ...previous.assignments, [key]: { ...existing, subject } },
      };
    });
    closePanel();
  }

  function handleChangeDuration(
    key: TeacherPlanningCellKey,
    durationId: TeacherPlanningDurationId,
  ) {
    setState((previous) => {
      const existing = previous.assignments[key];
      if (!existing) return previous;
      return {
        ...previous,
        assignments: { ...previous.assignments, [key]: { ...existing, durationId } },
      };
    });
    closePanel();
  }

  function handleCopyToDay(
    sourceKey: TeacherPlanningCellKey,
    targetDayId: TeacherPlanningDayId,
  ) {
    setState((previous) => {
      const existing = previous.assignments[sourceKey];
      if (!existing) return previous;
      const slotId = sourceKey.split("__")[1] as TeacherPlanningSlotId;
      const targetKey = buildTeacherPlanningCellKey(targetDayId, slotId);
      return {
        ...previous,
        assignments: { ...previous.assignments, [targetKey]: { ...existing } },
      };
    });
    closePanel();
  }

  function handleReset() {
    setState(createEmptyTeacherPlanningState(state.levelId));
    setSelectedSubject(null);
    setSelectedDuration(null);
    closePanel();
    setHint(null);
  }

  const hoursDelta = totalHours - TEACHER_PLANNING_WEEKLY_HOURS_TARGET;
  const activeCellData = activeCell ? state.assignments[activeCell] : null;
  const [activeDayId, activeSlotId] = activeCell
    ? (activeCell.split("__") as [TeacherPlanningDayId, TeacherPlanningSlotId])
    : [null, null];
  const activeDayLabel =
    activeDayId === "mercredi"
      ? teacherPlanningWednesday.label
      : teacherPlanningDays.find((day) => day.id === activeDayId)?.label;
  const activeSlotLabel = teacherPlanningSlots.find(
    (slot) => slot.id === activeSlotId,
  )?.label;

  return (
    <div className="mt-10 print:mt-4">
      <section aria-label="Choix du niveau">
        <h2 className="text-xl font-black text-foreground">Choisir un niveau</h2>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {teacherPlanningLevels.map((level) => (
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
              {level.id === state.levelId ? (
                <span className="sr-only"> (niveau sélectionné)</span>
              ) : null}
            </button>
          ))}
        </div>
      </section>

      <section aria-label="Réserve de matières" className="mt-8">
        <h2 className="text-xl font-black text-foreground">
          Choisir une matière
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="list">
          {subjects.map((subject) => (
            <button
              key={subject}
              type="button"
              onClick={() => setSelectedSubject(subject)}
              aria-pressed={subject === selectedSubject}
              className={[
                "min-h-11 rounded-md border px-3 text-sm font-bold transition",
                subject === selectedSubject
                  ? "border-sky/60 bg-sky/10 text-sky"
                  : "border-white/10 bg-white/[0.04] text-foreground hover:border-sky/40",
              ].join(" ")}
            >
              {subject}
              {subject === selectedSubject ? (
                <span className="sr-only"> (matière sélectionnée)</span>
              ) : null}
            </button>
          ))}
        </div>
      </section>

      <section aria-label="Durée du créneau" className="mt-8">
        <h2 className="text-xl font-black text-foreground">
          Choisir une durée
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="list">
          {teacherPlanningDurations.map((duration) => (
            <button
              key={duration.id}
              type="button"
              onClick={() => setSelectedDuration(duration.id)}
              aria-pressed={duration.id === selectedDuration}
              className={[
                "min-h-11 rounded-md border px-3 text-sm font-bold transition",
                duration.id === selectedDuration
                  ? "border-gold/60 bg-gold/10 text-gold"
                  : "border-white/10 bg-white/[0.04] text-foreground hover:border-gold/40",
              ].join(" ")}
            >
              {duration.label}
              {duration.id === selectedDuration ? (
                <span className="sr-only"> (durée sélectionnée)</span>
              ) : null}
            </button>
          ))}
        </div>
      </section>

      {hint ? (
        <p
          role="status"
          className="mt-4 rounded-md border border-gold/30 bg-gold/[0.08] px-4 py-2 text-sm font-bold text-gold"
        >
          {hint}
        </p>
      ) : null}

      <section className="mt-6 print:hidden">
        <button
          type="button"
          onClick={handleToggleWednesday}
          aria-pressed={state.showWednesday}
          className="min-h-11 rounded-md border border-white/10 bg-white/[0.04] px-3 text-sm font-bold text-muted transition hover:border-jade/40 hover:text-foreground"
        >
          {state.showWednesday
            ? "Masquer le mercredi"
            : "Afficher le mercredi (matin, optionnel)"}
        </button>
      </section>

      <section
        aria-label="Grille hebdomadaire"
        className="mt-8 rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">
          Grille de la semaine —{" "}
          {teacherPlanningLevels.find((level) => level.id === state.levelId)?.label}
        </h2>

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
                {allCellEntries.map((day) => (
                  <th
                    key={day.id}
                    scope="col"
                    className={[
                      "border-b border-white/10 p-2 text-left text-xs font-bold uppercase tracking-wide text-muted",
                      day.isWednesday ? "opacity-70" : "",
                    ].join(" ")}
                  >
                    {day.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teacherPlanningSlots.map((slot) => (
                <tr key={slot.id}>
                  <th
                    scope="row"
                    className="border-b border-white/5 p-2 text-left font-bold text-foreground"
                  >
                    {slot.label}
                  </th>
                  {allCellEntries.map((day) => {
                    const slotsAvailable = slotsForDay(day.id);
                    const slotAvailable = slotsAvailable.some((s) => s.id === slot.id);
                    if (!slotAvailable) {
                      return (
                        <td
                          key={day.id}
                          className="border-b border-white/5 p-2 text-center text-xs text-muted/50"
                        >
                          —
                        </td>
                      );
                    }
                    const key = buildTeacherPlanningCellKey(day.id, slot.id);
                    const cell = state.assignments[key];
                    return (
                      <td key={day.id} className="border-b border-white/5 p-2">
                        <button
                          type="button"
                          onClick={() => handleSlotClick(day.id, slot.id)}
                          aria-pressed={Boolean(cell)}
                          aria-label={
                            cell
                              ? `${day.label}, ${slot.label} : ${cell.subject}, ${
                                  teacherPlanningDurations.find((d) => d.id === cell.durationId)
                                    ?.label
                                }. Cliquer pour modifier.`
                              : `${day.label}, ${slot.label} : créneau vide. Cliquer pour remplir.`
                          }
                          className={[
                            "flex min-h-11 w-full flex-col items-start justify-center rounded-md border px-2 py-1 text-left text-xs transition",
                            cell
                              ? "border-jade/40 bg-jade/[0.08] text-foreground"
                              : "border-dashed border-white/15 bg-background/40 text-muted hover:border-jade/40",
                          ].join(" ")}
                        >
                          {cell ? (
                            <>
                              <span className="font-bold">{cell.subject}</span>
                              <span className="text-muted">
                                {
                                  teacherPlanningDurations.find(
                                    (d) => d.id === cell.durationId,
                                  )?.label
                                }
                              </span>
                            </>
                          ) : (
                            <span>Vide</span>
                          )}
                        </button>
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
          {allCellEntries.map((day) => (
            <div
              key={day.id}
              className="rounded-md border border-white/10 bg-background/45 p-4"
            >
              <p className="text-sm font-black text-foreground">{day.label}</p>
              <div className="mt-3 grid gap-2">
                {slotsForDay(day.id).map((slot) => {
                  const key = buildTeacherPlanningCellKey(day.id, slot.id);
                  const cell = state.assignments[key];
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => handleSlotClick(day.id, slot.id)}
                      aria-pressed={Boolean(cell)}
                      aria-label={
                        cell
                          ? `${day.label}, ${slot.label} : ${cell.subject}, ${
                              teacherPlanningDurations.find((d) => d.id === cell.durationId)
                                ?.label
                            }. Cliquer pour modifier.`
                          : `${day.label}, ${slot.label} : créneau vide. Cliquer pour remplir.`
                      }
                      className={[
                        "flex min-h-11 w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition",
                        cell
                          ? "border-jade/40 bg-jade/[0.08] text-foreground"
                          : "border-dashed border-white/15 bg-background/40 text-muted",
                      ].join(" ")}
                    >
                      <span className="font-bold">{slot.label}</span>
                      {cell ? (
                        <span>
                          {cell.subject} ·{" "}
                          {
                            teacherPlanningDurations.find((d) => d.id === cell.durationId)
                              ?.label
                          }
                        </span>
                      ) : (
                        <span className="text-muted">Vide</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {activeCell && activeCellData ? (
        <section
          aria-label="Actions sur le créneau sélectionné"
          className="mt-6 rounded-lg border border-jade/30 bg-jade/[0.06] p-5 print:hidden"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-black text-foreground">
              {activeDayLabel}, {activeSlotLabel} — {activeCellData.subject}
            </h2>
            <button
              type="button"
              onClick={closePanel}
              className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-muted hover:text-foreground"
            >
              Fermer
            </button>
          </div>

          {panelMode === "menu" ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={buildTeacherLessonPlannerHref({
                  niveau: state.levelId,
                  matiere: matiereIdFromLabel(activeCellData.subject),
                  creneau: activeSlotId ?? undefined,
                })}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-3 text-sm font-bold text-sky transition hover:bg-sky hover:text-ink"
              >
                Préparer une séance pour ce créneau
              </Link>
              <button
                type="button"
                onClick={() => setPanelMode("subject")}
                className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground hover:border-sky/40"
              >
                Modifier la matière
              </button>
              <button
                type="button"
                onClick={() => setPanelMode("duration")}
                className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground hover:border-gold/40"
              >
                Modifier la durée
              </button>
              <button
                type="button"
                onClick={() => handleClearCell(activeCell)}
                className="min-h-11 rounded-md border border-ember/40 px-3 text-sm font-bold text-ember hover:bg-ember/[0.08]"
              >
                Vider ce créneau
              </button>
              <button
                type="button"
                onClick={() => setPanelMode("copy")}
                className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground hover:border-jade/40"
              >
                Copier vers un autre jour
              </button>
            </div>
          ) : null}

          {panelMode === "subject" ? (
            <div className="mt-4 flex flex-wrap gap-2" role="list">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => handleChangeSubject(activeCell, subject)}
                  aria-pressed={subject === activeCellData.subject}
                  className={[
                    "min-h-11 rounded-md border px-3 text-sm font-bold transition",
                    subject === activeCellData.subject
                      ? "border-sky/60 bg-sky/10 text-sky"
                      : "border-white/10 bg-white/[0.04] text-foreground hover:border-sky/40",
                  ].join(" ")}
                >
                  {subject}
                </button>
              ))}
            </div>
          ) : null}

          {panelMode === "duration" ? (
            <div className="mt-4 flex flex-wrap gap-2" role="list">
              {teacherPlanningDurations.map((duration) => (
                <button
                  key={duration.id}
                  type="button"
                  onClick={() => handleChangeDuration(activeCell, duration.id)}
                  aria-pressed={duration.id === activeCellData.durationId}
                  className={[
                    "min-h-11 rounded-md border px-3 text-sm font-bold transition",
                    duration.id === activeCellData.durationId
                      ? "border-gold/60 bg-gold/10 text-gold"
                      : "border-white/10 bg-white/[0.04] text-foreground hover:border-gold/40",
                  ].join(" ")}
                >
                  {duration.label}
                </button>
              ))}
            </div>
          ) : null}

          {panelMode === "copy" ? (
            <div className="mt-4 flex flex-wrap gap-2" role="list">
              {allCellEntries
                .filter((day) => day.id !== activeDayId)
                .map((day) => (
                  <button
                    key={day.id}
                    type="button"
                    role="listitem"
                    onClick={() => handleCopyToDay(activeCell, day.id)}
                    className="min-h-11 rounded-md border border-white/10 bg-white/[0.04] px-3 text-sm font-bold text-foreground hover:border-jade/40"
                  >
                    {day.label}
                  </button>
                ))}
            </div>
          ) : null}
        </section>
      ) : null}

      <section
        aria-label="Compteurs d'heures"
        className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6 print:break-inside-avoid"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black text-foreground">
            Total : {totalHours} h / {TEACHER_PLANNING_WEEKLY_HOURS_TARGET} h
          </h2>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade print:hidden"
          >
            Réinitialiser l’emploi du temps conseillé
          </button>
        </div>

        <p className="mt-2 text-sm font-bold text-muted">
          Objectif de référence : {TEACHER_PLANNING_WEEKLY_HOURS_TARGET} heures
          hebdomadaires.
        </p>

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
              ? `Le total dépasse de ${hoursDelta} h le repère de ${TEACHER_PLANNING_WEEKLY_HOURS_TARGET} h hebdomadaires.`
              : `Le total n’atteint pas le repère de ${TEACHER_PLANNING_WEEKLY_HOURS_TARGET} h hebdomadaires (manque ${-hoursDelta} h).`}
          </p>
        ) : (
          <p
            role="status"
            className="mt-3 rounded-md border border-jade/30 bg-jade/[0.08] px-4 py-2 text-sm font-bold text-jade"
          >
            Le total correspond au repère de {TEACHER_PLANNING_WEEKLY_HOURS_TARGET} h
            hebdomadaires.
          </p>
        )}

        <div className="mt-5">
          <p className="text-sm font-bold text-foreground">Heures par matière</p>
          <p className="mt-1 text-xs leading-6 text-muted">
            Ces repères sont des aides à l’organisation, pas un contrôle
            réglementaire.
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
                    <span className="text-muted">{hoursBySubject.get(subject)} h</span>
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
