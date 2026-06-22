"use client";

import { useEffect, useMemo, useState } from "react";
import {
  buildTeacherTimetableCellKey,
  computeHoursBySubject,
  createInitialTeacherTimetableState,
  createTeacherTimetableId,
  getSubjectVisual,
  specialTeacherTimetableWeekKinds,
  TEACHER_TIMETABLE_STORAGE_KEY,
  TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET,
  teacherTimetableLevels,
  teacherTimetableSubjectsByLevel,
  teacherTimetableWeekKindLabels,
  type TeacherTimetableAssignments,
  type TeacherTimetableCellKey,
  type TeacherTimetableLevelId,
  type TeacherTimetableSession,
  type TeacherTimetableState,
  type TeacherTimetableWeek,
  type TeacherTimetableWeekKind,
} from "@/content/teacher-timetable";

const DEFAULT_LEVEL_ID: TeacherTimetableLevelId = "cm2";

const colorClasses: Record<string, { border: string; surface: string; text: string }> = {
  jade: { border: "border-jade/40", surface: "bg-jade/10", text: "text-jade" },
  gold: { border: "border-gold/40", surface: "bg-gold/10", text: "text-gold" },
  sky: { border: "border-sky/40", surface: "bg-sky/10", text: "text-sky" },
  ember: { border: "border-ember/40", surface: "bg-ember/10", text: "text-ember" },
};

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
    if (
      !parsed ||
      typeof parsed.levelId !== "string" ||
      !Array.isArray(parsed.days) ||
      !Array.isArray(parsed.slots) ||
      !Array.isArray(parsed.weeks) ||
      !parsed.activeWeekId
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

type ClipboardSession = TeacherTimetableSession | null;

export function TeacherWeeklyTimetableClient() {
  const [state, setState] = useState<TeacherTimetableState>(
    () => readStoredState() ?? createInitialTeacherTimetableState(DEFAULT_LEVEL_ID),
  );
  const [view, setView] = useState<"reference" | "reelle">("reelle");
  const [clipboard, setClipboard] = useState<ClipboardSession>(null);
  const [newWeekLabel, setNewWeekLabel] = useState("");
  const [newWeekKind, setNewWeekKind] = useState<TeacherTimetableWeekKind>("sortie");
  const [newDayLabel, setNewDayLabel] = useState("");
  const [newSlotLabel, setNewSlotLabel] = useState("");
  const [newSlotDuration, setNewSlotDuration] = useState("1");

  useEffect(() => {
    window.localStorage.setItem(TEACHER_TIMETABLE_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const subjects = teacherTimetableSubjectsByLevel[state.levelId];

  const referenceWeek = state.weeks.find((week) => week.kind === "reference");
  const realWeeks = state.weeks.filter((week) => week.kind !== "reference");
  const activeWeek =
    state.weeks.find((week) => week.id === state.activeWeekId) ?? referenceWeek ?? state.weeks[0];

  const displayedWeek = view === "reference" ? referenceWeek : activeWeek;

  function updateWeekAssignments(
    weekId: string,
    updater: (assignments: TeacherTimetableAssignments) => TeacherTimetableAssignments,
  ) {
    setState((previous) => ({
      ...previous,
      weeks: previous.weeks.map((week) =>
        week.id === weekId ? { ...week, assignments: updater(week.assignments) } : week,
      ),
    }));
  }

  function handleLevelChange(levelId: TeacherTimetableLevelId) {
    if (levelId === state.levelId) return;
    setState((previous) => {
      const fresh = createInitialTeacherTimetableState(levelId);
      return { ...fresh, days: previous.days, slots: previous.slots };
    });
  }

  function assignSubject(weekId: string, cellKey: TeacherTimetableCellKey, subject: string, durationHours: number) {
    updateWeekAssignments(weekId, (assignments) => {
      const next = { ...assignments };
      if (subject) {
        next[cellKey] = { subject, durationHours };
      } else {
        delete next[cellKey];
      }
      return next;
    });
  }

  function updateSessionDuration(weekId: string, cellKey: TeacherTimetableCellKey, durationHours: number) {
    updateWeekAssignments(weekId, (assignments) => {
      const existing = assignments[cellKey];
      if (!existing) return assignments;
      return { ...assignments, [cellKey]: { ...existing, durationHours } };
    });
  }

  function clearCell(weekId: string, cellKey: TeacherTimetableCellKey) {
    updateWeekAssignments(weekId, (assignments) => {
      const next = { ...assignments };
      delete next[cellKey];
      return next;
    });
  }

  function moveSession(weekId: string, fromKey: TeacherTimetableCellKey, toKey: TeacherTimetableCellKey) {
    if (fromKey === toKey) return;
    updateWeekAssignments(weekId, (assignments) => {
      const session = assignments[fromKey];
      if (!session) return assignments;
      const next = { ...assignments };
      delete next[fromKey];
      next[toKey] = session;
      return next;
    });
  }

  function pasteClipboard(weekId: string, cellKey: TeacherTimetableCellKey) {
    if (!clipboard) return;
    updateWeekAssignments(weekId, (assignments) => ({
      ...assignments,
      [cellKey]: { ...clipboard },
    }));
  }

  function handleResetReference() {
    if (!referenceWeek) return;
    const fresh = createInitialTeacherTimetableState(state.levelId);
    const freshReference = fresh.weeks.find((week) => week.kind === "reference");
    if (!freshReference) return;
    updateWeekAssignments(referenceWeek.id, () => ({ ...freshReference.assignments }));
  }

  function handleDuplicateWeek(week: TeacherTimetableWeek) {
    const copy: TeacherTimetableWeek = {
      id: createTeacherTimetableId("semaine"),
      label: `${week.label} (copie)`,
      kind: week.kind === "reference" ? "reelle" : week.kind,
      assignments: { ...week.assignments },
    };
    setState((previous) => ({
      ...previous,
      weeks: [...previous.weeks, copy],
      activeWeekId: copy.id,
    }));
    setView("reelle");
  }

  function handleCreateSpecialWeek() {
    const label = newWeekLabel.trim() || teacherTimetableWeekKindLabels[newWeekKind];
    const baseAssignments = referenceWeek ? { ...referenceWeek.assignments } : {};
    const week: TeacherTimetableWeek = {
      id: createTeacherTimetableId("semaine"),
      label,
      kind: newWeekKind,
      assignments: newWeekKind === "raccourcie" || newWeekKind === "remplacement" ? {} : baseAssignments,
    };
    setState((previous) => ({
      ...previous,
      weeks: [...previous.weeks, week],
      activeWeekId: week.id,
    }));
    setNewWeekLabel("");
    setView("reelle");
  }

  function handleDeleteWeek(weekId: string) {
    if (realWeeks.length <= 1) return;
    setState((previous) => {
      const remaining = previous.weeks.filter((week) => week.id !== weekId);
      const fallback = remaining.find((week) => week.kind !== "reference") ?? remaining[0];
      return {
        ...previous,
        weeks: remaining,
        activeWeekId: previous.activeWeekId === weekId ? fallback.id : previous.activeWeekId,
      };
    });
  }

  function handleAddDay() {
    const label = newDayLabel.trim();
    if (!label) return;
    const id = createTeacherTimetableId("jour");
    setState((previous) => ({ ...previous, days: [...previous.days, { id, label }] }));
    setNewDayLabel("");
  }

  function handleRemoveDay(dayId: string) {
    setState((previous) => ({
      ...previous,
      days: previous.days.filter((day) => day.id !== dayId),
      weeks: previous.weeks.map((week) => ({
        ...week,
        assignments: Object.fromEntries(
          Object.entries(week.assignments).filter(([key]) => !key.startsWith(`${dayId}__`)),
        ),
      })),
    }));
  }

  function handleAddSlot() {
    const label = newSlotLabel.trim();
    const duration = Number(newSlotDuration);
    if (!label || !Number.isFinite(duration) || duration <= 0) return;
    const id = createTeacherTimetableId("creneau");
    setState((previous) => ({
      ...previous,
      slots: [...previous.slots, { id, label, durationHours: duration }],
    }));
    setNewSlotLabel("");
    setNewSlotDuration("1");
  }

  function handleRemoveSlot(slotId: string) {
    setState((previous) => ({
      ...previous,
      slots: previous.slots.filter((slot) => slot.id !== slotId),
      weeks: previous.weeks.map((week) => ({
        ...week,
        assignments: Object.fromEntries(
          Object.entries(week.assignments).filter(([key]) => !key.endsWith(`__${slotId}`)),
        ),
      })),
    }));
  }

  const hoursBySubject = useMemo(
    () => computeHoursBySubject(displayedWeek?.assignments ?? {}),
    [displayedWeek],
  );

  const referenceHoursBySubject = useMemo(
    () => computeHoursBySubject(referenceWeek?.assignments ?? {}),
    [referenceWeek],
  );

  const totalHours = useMemo(
    () => Array.from(hoursBySubject.values()).reduce((sum, hours) => sum + hours, 0),
    [hoursBySubject],
  );

  const hoursDelta = totalHours - TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET;

  if (!displayedWeek) {
    return null;
  }

  return (
    <div className="mt-10">
      <section aria-label="Choix du niveau">
        <h2 className="text-xl font-black text-foreground">Choisir un niveau</h2>
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

      <section aria-label="Vue de l'emploi du temps" className="mt-8 print:hidden">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setView("reference")}
            aria-pressed={view === "reference"}
            className={[
              "min-h-11 rounded-md border px-4 text-sm font-bold transition",
              view === "reference"
                ? "border-jade/60 bg-jade/10 text-jade"
                : "border-white/10 bg-white/[0.04] text-foreground hover:border-jade/40",
            ].join(" ")}
          >
            Emploi du temps de référence
          </button>
          <button
            type="button"
            onClick={() => setView("reelle")}
            aria-pressed={view === "reelle"}
            className={[
              "min-h-11 rounded-md border px-4 text-sm font-bold transition",
              view === "reelle"
                ? "border-jade/60 bg-jade/10 text-jade"
                : "border-white/10 bg-white/[0.04] text-foreground hover:border-jade/40",
            ].join(" ")}
          >
            Semaines réelles
          </button>
        </div>

        {view === "reelle" ? (
          <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <label htmlFor="week-select" className="block text-xs font-bold uppercase tracking-wide text-muted">
              Semaine affichée
            </label>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <select
                id="week-select"
                value={activeWeek?.id ?? ""}
                onChange={(event) =>
                  setState((previous) => ({ ...previous, activeWeekId: event.target.value }))
                }
                className="min-h-11 rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
              >
                {realWeeks.map((week) => (
                  <option key={week.id} value={week.id}>
                    {week.label} — {teacherTimetableWeekKindLabels[week.kind]}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => activeWeek && handleDuplicateWeek(activeWeek)}
                className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/50 hover:text-jade"
              >
                Dupliquer cette semaine
              </button>
              {realWeeks.length > 1 && activeWeek ? (
                <button
                  type="button"
                  onClick={() => handleDeleteWeek(activeWeek.id)}
                  className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember"
                >
                  Supprimer cette semaine
                </button>
              ) : null}
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-xs font-bold uppercase tracking-wide text-muted">
                Créer une semaine spéciale
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  value={newWeekLabel}
                  onChange={(event) => setNewWeekLabel(event.target.value)}
                  placeholder="Nom de la semaine"
                  className="min-h-11 rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
                />
                <select
                  value={newWeekKind}
                  onChange={(event) => setNewWeekKind(event.target.value as TeacherTimetableWeekKind)}
                  className="min-h-11 rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
                >
                  {specialTeacherTimetableWeekKinds.map((kind) => (
                    <option key={kind} value={kind}>
                      {teacherTimetableWeekKindLabels[kind]}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleCreateSpecialWeek}
                  className="min-h-11 rounded-md border border-jade/40 bg-jade/10 px-3 text-sm font-bold text-jade transition hover:border-jade/60"
                >
                  Créer la semaine
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleResetReference}
              className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/50 hover:text-jade"
            >
              Réinitialiser la référence conseillée
            </button>
          </div>
        )}
      </section>

      <section
        aria-label="Configuration de la grille"
        className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 print:hidden"
      >
        <h2 className="text-lg font-black text-foreground">Jours et créneaux</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {state.days.map((day) => (
            <span
              key={day.id}
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-background/45 px-3 py-1 text-sm font-bold text-foreground"
            >
              {day.label}
              <button
                type="button"
                onClick={() => handleRemoveDay(day.id)}
                aria-label={`Retirer ${day.label}`}
                className="text-muted hover:text-ember"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={newDayLabel}
            onChange={(event) => setNewDayLabel(event.target.value)}
            placeholder="Nouveau jour"
            className="min-h-11 rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
          />
          <button
            type="button"
            onClick={handleAddDay}
            className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/50 hover:text-jade"
          >
            Ajouter le jour
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {state.slots.map((slot) => (
            <span
              key={slot.id}
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-background/45 px-3 py-1 text-sm font-bold text-foreground"
            >
              {slot.label} ({slot.durationHours} h)
              <button
                type="button"
                onClick={() => handleRemoveSlot(slot.id)}
                aria-label={`Retirer ${slot.label}`}
                className="text-muted hover:text-ember"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={newSlotLabel}
            onChange={(event) => setNewSlotLabel(event.target.value)}
            placeholder="Nouveau créneau"
            className="min-h-11 rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
          />
          <input
            type="number"
            min="0.25"
            step="0.25"
            value={newSlotDuration}
            onChange={(event) => setNewSlotDuration(event.target.value)}
            className="min-h-11 w-24 rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
          />
          <button
            type="button"
            onClick={handleAddSlot}
            className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/50 hover:text-jade"
          >
            Ajouter le créneau
          </button>
        </div>
      </section>

      <section
        aria-label="Grille hebdomadaire"
        className="mt-8 rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6 print:hidden"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black text-foreground">
            {displayedWeek.label} —{" "}
            {teacherTimetableLevels.find((level) => level.id === state.levelId)?.label}
          </h2>
          {clipboard ? (
            <p className="text-sm font-bold text-jade">
              Séance copiée : {clipboard.subject} — cliquez « Coller » sur une case vide.
            </p>
          ) : null}
        </div>

        <div className="mt-5 overflow-x-auto">
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
                {state.days.map((day) => (
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
              {state.slots.map((slot) => (
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
                  {state.days.map((day) => {
                    const cellKey = buildTeacherTimetableCellKey(day.id, slot.id);
                    const session = displayedWeek.assignments[cellKey];
                    const visual = session ? getSubjectVisual(session.subject) : null;
                    const colors = visual ? colorClasses[visual.colorKey] : null;
                    return (
                      <td
                        key={day.id}
                        className="min-w-[9rem] border-b border-white/5 p-2 align-top"
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={(event) => {
                          event.preventDefault();
                          const fromKey = event.dataTransfer.getData(
                            "text/plain",
                          ) as TeacherTimetableCellKey;
                          if (fromKey) {
                            moveSession(displayedWeek.id, fromKey, cellKey);
                          }
                        }}
                      >
                        {session && visual && colors ? (
                          <div
                            draggable
                            onDragStart={(event) =>
                              event.dataTransfer.setData("text/plain", cellKey)
                            }
                            className={[
                              "rounded-md border p-2",
                              colors.border,
                              colors.surface,
                            ].join(" ")}
                          >
                            <p className={["text-sm font-bold", colors.text].join(" ")}>
                              <span aria-hidden="true">{visual.emoji}</span> {session.subject}
                            </p>
                            <label className="mt-1 block text-xs text-muted">
                              Durée (h)
                              <input
                                type="number"
                                min="0.25"
                                step="0.25"
                                value={session.durationHours}
                                onChange={(event) =>
                                  updateSessionDuration(
                                    displayedWeek.id,
                                    cellKey,
                                    Number(event.target.value) || session.durationHours,
                                  )
                                }
                                className="ml-2 w-16 rounded border border-white/10 bg-background/60 px-1 text-foreground"
                              />
                            </label>
                            <label className="mt-1 block text-xs text-muted">
                              Déplacer vers
                              <select
                                value=""
                                onChange={(event) => {
                                  const target = event.target.value as TeacherTimetableCellKey;
                                  if (target) {
                                    moveSession(displayedWeek.id, cellKey, target);
                                  }
                                }}
                                className="mt-1 w-full rounded border border-white/10 bg-background/60 px-1 text-foreground"
                              >
                                <option value="">—</option>
                                {state.days.map((targetDay) =>
                                  state.slots.map((targetSlot) => {
                                    const targetKey = buildTeacherTimetableCellKey(
                                      targetDay.id,
                                      targetSlot.id,
                                    );
                                    if (targetKey === cellKey) return null;
                                    return (
                                      <option key={targetKey} value={targetKey}>
                                        {targetDay.label} — {targetSlot.label}
                                      </option>
                                    );
                                  }),
                                )}
                              </select>
                            </label>
                            <div className="mt-2 flex gap-2">
                              <button
                                type="button"
                                onClick={() => setClipboard(session)}
                                className="text-xs font-bold text-foreground hover:text-jade"
                              >
                                Dupliquer
                              </button>
                              <button
                                type="button"
                                onClick={() => clearCell(displayedWeek.id, cellKey)}
                                className="text-xs font-bold text-foreground hover:text-ember"
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <select
                              value=""
                              onChange={(event) =>
                                assignSubject(
                                  displayedWeek.id,
                                  cellKey,
                                  event.target.value,
                                  slot.durationHours,
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
                            {clipboard ? (
                              <button
                                type="button"
                                onClick={() => pasteClipboard(displayedWeek.id, cellKey)}
                                className="mt-1 text-xs font-bold text-jade hover:underline"
                              >
                                Coller
                              </button>
                            ) : null}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-label="Compteurs d'heures"
        className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6 print:hidden"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black text-foreground">
            Total : {totalHours} h / {TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET} h
          </h2>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
          >
            Imprimer (noir et blanc)
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
          <p className="text-sm font-bold text-foreground">Heures par matière</p>
          {hoursBySubject.size > 0 ? (
            <ul className="mt-2 grid gap-2 sm:grid-cols-2" role="list">
              {subjects
                .filter((subject) => hoursBySubject.has(subject))
                .map((subject) => {
                  const hours = hoursBySubject.get(subject) ?? 0;
                  const refHours = referenceHoursBySubject.get(subject) ?? 0;
                  const ratio = refHours > 0 ? hours / refHours : null;
                  const visual = getSubjectVisual(subject);
                  return (
                    <li
                      key={subject}
                      className="flex min-h-11 flex-wrap items-center justify-between gap-2 rounded-md border border-white/10 bg-background/45 px-4 text-sm font-bold text-foreground"
                    >
                      <span>
                        <span aria-hidden="true">{visual.emoji}</span> {subject}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="text-muted">{hours} h</span>
                        {ratio !== null && ratio < 0.5 ? (
                          <span
                            role="status"
                            className="rounded-full border border-gold/30 bg-gold/[0.08] px-2 py-0.5 text-xs text-gold"
                          >
                            Repère : sous-représentée
                          </span>
                        ) : null}
                        {ratio !== null && ratio > 1.5 ? (
                          <span
                            role="status"
                            className="rounded-full border border-ember/30 bg-ember/[0.08] px-2 py-0.5 text-xs text-ember"
                          >
                            Repère : semaine chargée
                          </span>
                        ) : null}
                      </span>
                    </li>
                  );
                })}
            </ul>
          ) : (
            <p className="mt-2 text-sm leading-7 text-muted">
              Aucun créneau n’est encore associé à une matière.
            </p>
          )}
        </div>
      </section>

      <div className="hidden print:block">
        <h2 className="text-xl font-black text-black">
          {displayedWeek.label} —{" "}
          {teacherTimetableLevels.find((level) => level.id === state.levelId)?.label}
        </h2>
        <table className="mt-4 w-full border-collapse border border-black text-sm text-black">
          <thead>
            <tr>
              <th className="border border-black p-2 text-left">Créneau</th>
              {state.days.map((day) => (
                <th key={day.id} className="border border-black p-2 text-left">
                  {day.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.slots.map((slot) => (
              <tr key={slot.id}>
                <th className="border border-black p-2 text-left">
                  {slot.label} ({slot.durationHours} h)
                </th>
                {state.days.map((day) => {
                  const cellKey = buildTeacherTimetableCellKey(day.id, slot.id);
                  const session = displayedWeek.assignments[cellKey];
                  return (
                    <td key={day.id} className="border border-black p-2">
                      {session ? `${session.subject} (${session.durationHours} h)` : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
