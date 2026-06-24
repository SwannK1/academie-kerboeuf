"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  computeHoursBySubject,
  createInitialTeacherTimetableState,
  createTeacherTimetableId,
  findOverlappingSession,
  formatDurationLabel,
  formatMinutesAsTime,
  getSubjectVisual,
  readTeacherTimetableStateChecked,
  specialTeacherTimetableWeekKinds,
  TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET,
  writeTeacherTimetableState,
  teacherTimetableDayLabels,
  teacherTimetableDayOrder,
  teacherTimetableLevels,
  teacherTimetableSessionStatusLabels,
  teacherTimetableSessionStatuses,
  teacherTimetableSubjectsByLevel,
  teacherTimetableWeekKindLabels,
  type TeacherTimetableCalendarConfig,
  type TeacherTimetableDayId,
  type TeacherTimetableLevelId,
  type TeacherTimetableSession,
  type TeacherTimetableSessionStatus,
  type TeacherTimetableState,
  type TeacherTimetableWeek,
  type TeacherTimetableWeekKind,
} from "@/content/teacher-timetable";

const DEFAULT_LEVEL_ID: TeacherTimetableLevelId = "cm2";
const PX_PER_MINUTE = 1.15;
const DEFAULT_NEW_SESSION_DURATION = 60;
const DRAG_THRESHOLD_PX = 6;

const colorClasses: Record<string, { border: string; surface: string; text: string }> = {
  jade: { border: "border-jade/40", surface: "bg-jade/10", text: "text-jade" },
  gold: { border: "border-gold/40", surface: "bg-gold/10", text: "text-gold" },
  sky: { border: "border-sky/40", surface: "bg-sky/10", text: "text-sky" },
  ember: { border: "border-ember/40", surface: "bg-ember/10", text: "text-ember" },
};

const patternBorderClasses: Record<string, string> = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted",
  double: "border-double",
};

function timeToMinutes(value: string): number {
  const [h, m] = value.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

function minutesToTimeInput(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

function snapToStep(value: number, step: number): number {
  return Math.round(value / step) * step;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

type DragPreview = { sessionId: string; dayId: TeacherTimetableDayId; startMinutes: number };
type ResizePreview = { sessionId: string; durationMinutes: number };

export function TeacherWeeklyTimetableClient() {
  const initialTimetable = useMemo(() => readTeacherTimetableStateChecked(), []);
  const [state, setState] = useState<TeacherTimetableState>(
    () => initialTimetable.state ?? createInitialTeacherTimetableState(DEFAULT_LEVEL_ID),
  );
  const [storageNotice, setStorageNotice] = useState<string | null>(
    !initialTimetable.storageAvailable
      ? "Le stockage local n'est pas disponible (navigation privée ou bloqué) : vos modifications ne seront pas sauvegardées."
      : initialTimetable.wasReset
        ? "L'emploi du temps enregistré était illisible et a été réinitialisé."
        : null,
  );
  const [view, setView] = useState<"reference" | "reelle">("reelle");
  const [newWeekLabel, setNewWeekLabel] = useState("");
  const [newWeekKind, setNewWeekKind] = useState<TeacherTimetableWeekKind>("sortie");
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [dragPreview, setDragPreview] = useState<DragPreview | null>(null);
  const [resizePreview, setResizePreview] = useState<ResizePreview | null>(null);

  const dragStateRef = useRef<{
    sessionId: string;
    pointerStartX: number;
    pointerStartY: number;
    originDayId: TeacherTimetableDayId;
    originStart: number;
    moved: boolean;
  } | null>(null);

  const resizeStateRef = useRef<{
    sessionId: string;
    pointerStartY: number;
    originDuration: number;
  } | null>(null);

  const columnRefs = useRef<Partial<Record<TeacherTimetableDayId, HTMLDivElement | null>>>({});

  useEffect(() => {
    writeTeacherTimetableState(state);
  }, [state]);

  const subjects = teacherTimetableSubjectsByLevel[state.levelId];
  const config = state.config;
  const enabledDays = useMemo(
    () => teacherTimetableDayOrder.filter((day) => day !== "mercredi" || config.mercrediEnabled),
    [config.mercrediEnabled],
  );

  const referenceWeek = state.weeks.find((week) => week.kind === "reference");
  const realWeeks = state.weeks.filter((week) => week.kind !== "reference");
  const activeWeek =
    state.weeks.find((week) => week.id === state.activeWeekId) ?? referenceWeek ?? state.weeks[0];
  const displayedWeek = view === "reference" ? referenceWeek : activeWeek;

  const totalHeight = (config.dayEndMinutes - config.dayStartMinutes) * PX_PER_MINUTE;
  const hourMarks = useMemo(() => {
    const marks: number[] = [];
    const firstHour = Math.ceil(config.dayStartMinutes / 60) * 60;
    for (let m = firstHour; m <= config.dayEndMinutes; m += 60) {
      marks.push(m);
    }
    return marks;
  }, [config.dayStartMinutes, config.dayEndMinutes]);

  function updateConfig(patch: Partial<TeacherTimetableCalendarConfig>) {
    setState((previous) => ({ ...previous, config: { ...previous.config, ...patch } }));
  }

  function updateWeekSessions(
    weekId: string,
    updater: (sessions: TeacherTimetableSession[]) => TeacherTimetableSession[],
  ) {
    setState((previous) => ({
      ...previous,
      weeks: previous.weeks.map((week) =>
        week.id === weekId ? { ...week, sessions: updater(week.sessions) } : week,
      ),
    }));
  }

  function findWeekAndSession(weekId: string, sessionId: string) {
    const week = state.weeks.find((w) => w.id === weekId);
    const session = week?.sessions.find((s) => s.id === sessionId);
    return { week, session };
  }

  function tryCommitSessionChange(
    weekId: string,
    sessionId: string,
    patch: Partial<TeacherTimetableSession>,
  ): boolean {
    const { week, session } = findWeekAndSession(weekId, sessionId);
    if (!week || !session) return false;
    const candidate: TeacherTimetableSession = { ...session, ...patch };
    const overlap = findOverlappingSession(week.sessions, candidate);
    if (overlap) {
      const proceed = window.confirm(
        `Cette séance chevauche « ${overlap.title || overlap.subject} » (${formatMinutesAsTime(
          overlap.startMinutes,
        )}–${formatMinutesAsTime(overlap.startMinutes + overlap.durationMinutes)}). Continuer malgré le conflit ?`,
      );
      if (!proceed) return false;
    }
    updateWeekSessions(weekId, (sessions) =>
      sessions.map((s) => (s.id === sessionId ? candidate : s)),
    );
    return true;
  }

  function tryAddSession(weekId: string, candidate: TeacherTimetableSession): boolean {
    const week = state.weeks.find((w) => w.id === weekId);
    if (!week) return false;
    const overlap = findOverlappingSession(week.sessions, candidate);
    if (overlap) {
      const proceed = window.confirm(
        `Cette séance chevauche « ${overlap.title || overlap.subject} » (${formatMinutesAsTime(
          overlap.startMinutes,
        )}–${formatMinutesAsTime(overlap.startMinutes + overlap.durationMinutes)}). Créer quand même ?`,
      );
      if (!proceed) return false;
    }
    updateWeekSessions(weekId, (sessions) => [...sessions, candidate]);
    return true;
  }

  function handleDeleteSession(weekId: string, session: TeacherTimetableSession) {
    const ok = window.confirm(`Supprimer la séance « ${session.title || session.subject} » ?`);
    if (!ok) return;
    updateWeekSessions(weekId, (sessions) => sessions.filter((s) => s.id !== session.id));
    setSelectedSessionId(null);
  }

  function handleDuplicateSession(weekId: string, session: TeacherTimetableSession) {
    const candidate: TeacherTimetableSession = {
      ...session,
      id: createTeacherTimetableId("seance"),
      startMinutes: clamp(
        session.startMinutes + session.durationMinutes,
        config.dayStartMinutes,
        Math.max(config.dayStartMinutes, config.dayEndMinutes - session.durationMinutes),
      ),
    };
    if (tryAddSession(weekId, candidate)) {
      setSelectedSessionId(candidate.id);
    }
  }

  function resolveDayFromClientX(clientX: number): TeacherTimetableDayId | null {
    let best: { dayId: TeacherTimetableDayId; distance: number } | null = null;
    for (const dayId of enabledDays) {
      const el = columnRefs.current[dayId];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right) {
        return dayId;
      }
      const center = (rect.left + rect.right) / 2;
      const distance = Math.abs(clientX - center);
      if (!best || distance < best.distance) {
        best = { dayId, distance };
      }
    }
    return best?.dayId ?? null;
  }

  function handleBubblePointerDown(
    event: React.PointerEvent<HTMLDivElement>,
    session: TeacherTimetableSession,
  ) {
    if (!displayedWeek || view === "reference") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      sessionId: session.id,
      pointerStartX: event.clientX,
      pointerStartY: event.clientY,
      originDayId: session.dayId,
      originStart: session.startMinutes,
      moved: false,
    };
  }

  function handleBubblePointerMove(
    event: React.PointerEvent<HTMLDivElement>,
    session: TeacherTimetableSession,
  ) {
    const drag = dragStateRef.current;
    if (!drag || drag.sessionId !== session.id) return;
    const dx = event.clientX - drag.pointerStartX;
    const dy = event.clientY - drag.pointerStartY;
    if (!drag.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return;
    drag.moved = true;
    const newDayId = resolveDayFromClientX(event.clientX) ?? drag.originDayId;
    const deltaMinutes = dy / PX_PER_MINUTE;
    const rawStart = snapToStep(drag.originStart + deltaMinutes, config.gridStepMinutes);
    const newStart = clamp(
      rawStart,
      config.dayStartMinutes,
      Math.max(config.dayStartMinutes, config.dayEndMinutes - session.durationMinutes),
    );
    setDragPreview({ sessionId: session.id, dayId: newDayId, startMinutes: newStart });
  }

  function handleBubblePointerUp(
    event: React.PointerEvent<HTMLDivElement>,
    session: TeacherTimetableSession,
  ) {
    const drag = dragStateRef.current;
    dragStateRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!drag || drag.sessionId !== session.id) return;
    if (!drag.moved) {
      setDragPreview(null);
      setSelectedSessionId(session.id);
      return;
    }
    const preview = dragPreview;
    setDragPreview(null);
    if (!displayedWeek || !preview || preview.sessionId !== session.id) return;
    tryCommitSessionChange(displayedWeek.id, session.id, {
      dayId: preview.dayId,
      startMinutes: preview.startMinutes,
    });
    setSelectedSessionId(session.id);
  }

  function handleResizePointerDown(
    event: React.PointerEvent<HTMLButtonElement>,
    session: TeacherTimetableSession,
  ) {
    if (!displayedWeek || view === "reference") return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    resizeStateRef.current = {
      sessionId: session.id,
      pointerStartY: event.clientY,
      originDuration: session.durationMinutes,
    };
  }

  function handleResizePointerMove(
    event: React.PointerEvent<HTMLButtonElement>,
    session: TeacherTimetableSession,
  ) {
    const resize = resizeStateRef.current;
    if (!resize || resize.sessionId !== session.id) return;
    event.stopPropagation();
    const dy = event.clientY - resize.pointerStartY;
    const rawDuration = snapToStep(resize.originDuration + dy / PX_PER_MINUTE, config.gridStepMinutes);
    const maxDuration = config.dayEndMinutes - session.startMinutes;
    const newDuration = clamp(rawDuration, config.gridStepMinutes, Math.max(config.gridStepMinutes, maxDuration));
    setResizePreview({ sessionId: session.id, durationMinutes: newDuration });
  }

  function handleResizePointerUp(
    event: React.PointerEvent<HTMLButtonElement>,
    session: TeacherTimetableSession,
  ) {
    event.stopPropagation();
    const resize = resizeStateRef.current;
    resizeStateRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!resize || resize.sessionId !== session.id) return;
    const preview = resizePreview;
    setResizePreview(null);
    if (!displayedWeek || !preview || preview.sessionId !== session.id) return;
    tryCommitSessionChange(displayedWeek.id, session.id, {
      durationMinutes: preview.durationMinutes,
    });
  }

  function handleColumnClick(
    event: React.MouseEvent<HTMLDivElement>,
    dayId: TeacherTimetableDayId,
  ) {
    if (!displayedWeek || view === "reference") return;
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetY = event.clientY - rect.top;
    const rawStart = config.dayStartMinutes + offsetY / PX_PER_MINUTE;
    const startMinutes = clamp(
      snapToStep(rawStart, config.gridStepMinutes),
      config.dayStartMinutes,
      Math.max(config.dayStartMinutes, config.dayEndMinutes - DEFAULT_NEW_SESSION_DURATION),
    );
    const defaultSubject = subjects[0] ?? "Français";
    const candidate: TeacherTimetableSession = {
      id: createTeacherTimetableId("seance"),
      dayId,
      startMinutes,
      durationMinutes: DEFAULT_NEW_SESSION_DURATION,
      subject: defaultSubject,
      title: defaultSubject,
      group: "",
      location: "",
      material: "",
      status: "prevue",
      note: "",
    };
    if (tryAddSession(displayedWeek.id, candidate)) {
      setSelectedSessionId(candidate.id);
    }
  }

  function handleLevelChange(levelId: TeacherTimetableLevelId) {
    if (levelId === state.levelId) return;
    setState((previous) => {
      const fresh = createInitialTeacherTimetableState(levelId);
      return { ...fresh, config: previous.config };
    });
    setSelectedSessionId(null);
  }

  function handleResetReference() {
    if (!referenceWeek) return;
    const ok = window.confirm(
      "Réinitialiser l'emploi du temps de référence avec la répartition conseillée ? Cette action remplace les séances de référence actuelles.",
    );
    if (!ok) return;
    const fresh = createInitialTeacherTimetableState(state.levelId);
    const freshReference = fresh.weeks.find((week) => week.kind === "reference");
    if (!freshReference) return;
    updateWeekSessions(referenceWeek.id, () => freshReference.sessions);
  }

  function handleDuplicateWeek(week: TeacherTimetableWeek) {
    const copy: TeacherTimetableWeek = {
      id: createTeacherTimetableId("semaine"),
      label: `${week.label} (copie)`,
      kind: week.kind === "reference" ? "reelle" : week.kind,
      sessions: week.sessions.map((session) => ({ ...session, id: createTeacherTimetableId("seance") })),
    };
    setState((previous) => ({
      ...previous,
      weeks: [...previous.weeks, copy],
      activeWeekId: copy.id,
    }));
    setView("reelle");
  }

  function handleResetRealWeekFromReference(week: TeacherTimetableWeek) {
    if (!referenceWeek) return;
    const ok = window.confirm(
      `Réinitialiser « ${week.label} » à partir de l'emploi du temps de référence ? Les modifications de cette semaine réelle seront perdues.`,
    );
    if (!ok) return;
    updateWeekSessions(week.id, () =>
      referenceWeek.sessions.map((session) => ({ ...session, id: createTeacherTimetableId("seance") })),
    );
  }

  function handleCreateSpecialWeek() {
    const label = newWeekLabel.trim() || teacherTimetableWeekKindLabels[newWeekKind];
    const baseSessions =
      newWeekKind === "raccourcie" || newWeekKind === "remplacement"
        ? []
        : referenceWeek?.sessions.map((session) => ({ ...session, id: createTeacherTimetableId("seance") })) ?? [];
    const week: TeacherTimetableWeek = {
      id: createTeacherTimetableId("semaine"),
      label,
      kind: newWeekKind,
      sessions: baseSessions,
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
    const ok = window.confirm("Supprimer cette semaine réelle ?");
    if (!ok) return;
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

  const effectiveSessions: TeacherTimetableSession[] = useMemo(() => {
    if (!displayedWeek) return [];
    return displayedWeek.sessions.map((session) => {
      if (dragPreview && dragPreview.sessionId === session.id) {
        return { ...session, dayId: dragPreview.dayId, startMinutes: dragPreview.startMinutes };
      }
      if (resizePreview && resizePreview.sessionId === session.id) {
        return { ...session, durationMinutes: resizePreview.durationMinutes };
      }
      return session;
    });
  }, [displayedWeek, dragPreview, resizePreview]);

  const sessionsByDay = useMemo(() => {
    const map = new Map<TeacherTimetableDayId, TeacherTimetableSession[]>();
    for (const dayId of enabledDays) map.set(dayId, []);
    for (const session of effectiveSessions) {
      if (!map.has(session.dayId)) continue;
      map.get(session.dayId)!.push(session);
    }
    return map;
  }, [effectiveSessions, enabledDays]);

  const hoursBySubject = useMemo(
    () => computeHoursBySubject(displayedWeek?.sessions ?? []),
    [displayedWeek],
  );
  const referenceHoursBySubject = useMemo(
    () => computeHoursBySubject(referenceWeek?.sessions ?? []),
    [referenceWeek],
  );
  const totalHours = useMemo(
    () => Array.from(hoursBySubject.values()).reduce((sum, hours) => sum + hours, 0),
    [hoursBySubject],
  );
  const hoursDelta = totalHours - TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET;

  const selectedSession = displayedWeek?.sessions.find((s) => s.id === selectedSessionId) ?? null;

  function patchSelectedSession(patch: Partial<TeacherTimetableSession>) {
    if (!displayedWeek || !selectedSession) return;
    tryCommitSessionChange(displayedWeek.id, selectedSession.id, patch);
  }

  function moveSelectedDayBy(delta: number) {
    if (!selectedSession) return;
    const index = enabledDays.indexOf(selectedSession.dayId);
    const nextIndex = clamp(index + delta, 0, enabledDays.length - 1);
    const nextDay = enabledDays[nextIndex];
    if (nextDay && nextDay !== selectedSession.dayId) {
      patchSelectedSession({ dayId: nextDay });
    }
  }

  function moveSelectedTimeBy(deltaMinutes: number) {
    if (!selectedSession) return;
    const newStart = clamp(
      selectedSession.startMinutes + deltaMinutes,
      config.dayStartMinutes,
      Math.max(config.dayStartMinutes, config.dayEndMinutes - selectedSession.durationMinutes),
    );
    patchSelectedSession({ startMinutes: newStart });
  }

  function changeSelectedDurationBy(deltaMinutes: number) {
    if (!selectedSession) return;
    const newDuration = clamp(
      selectedSession.durationMinutes + deltaMinutes,
      config.gridStepMinutes,
      config.dayEndMinutes - selectedSession.startMinutes,
    );
    patchSelectedSession({ durationMinutes: newDuration });
  }

  if (!displayedWeek) {
    return null;
  }

  const isReadOnlyView = view === "reference";

  return (
    <div className="mt-10">
      {storageNotice ? (
        <div
          role="status"
          className="mb-6 flex items-start justify-between gap-4 rounded-lg border border-amber/40 bg-amber/10 p-4 text-sm text-amber print:hidden"
        >
          <p>{storageNotice}</p>
          <button
            type="button"
            onClick={() => setStorageNotice(null)}
            className="shrink-0 text-xs font-semibold uppercase tracking-wide text-amber underline"
          >
            Fermer
          </button>
        </div>
      ) : null}
      <section aria-label="Choix du niveau" className="print:hidden">
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

      <section
        aria-label="Configuration de la grille horaire"
        className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 print:hidden"
      >
        <h2 className="text-lg font-black text-foreground">Grille horaire</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-xs font-bold uppercase tracking-wide text-muted">
            Début de journée
            <input
              type="time"
              value={minutesToTimeInput(config.dayStartMinutes)}
              onChange={(event) => updateConfig({ dayStartMinutes: timeToMinutes(event.target.value) })}
              className="mt-1 block min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-2 text-sm font-normal text-foreground"
            />
          </label>
          <label className="text-xs font-bold uppercase tracking-wide text-muted">
            Fin de journée
            <input
              type="time"
              value={minutesToTimeInput(config.dayEndMinutes)}
              onChange={(event) => updateConfig({ dayEndMinutes: timeToMinutes(event.target.value) })}
              className="mt-1 block min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-2 text-sm font-normal text-foreground"
            />
          </label>
          <label className="text-xs font-bold uppercase tracking-wide text-muted">
            Début pause méridienne
            <input
              type="time"
              value={minutesToTimeInput(config.lunchStartMinutes)}
              onChange={(event) => updateConfig({ lunchStartMinutes: timeToMinutes(event.target.value) })}
              className="mt-1 block min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-2 text-sm font-normal text-foreground"
            />
          </label>
          <label className="text-xs font-bold uppercase tracking-wide text-muted">
            Fin pause méridienne
            <input
              type="time"
              value={minutesToTimeInput(config.lunchEndMinutes)}
              onChange={(event) => updateConfig({ lunchEndMinutes: timeToMinutes(event.target.value) })}
              className="mt-1 block min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-2 text-sm font-normal text-foreground"
            />
          </label>
        </div>
        <label className="mt-4 flex min-h-11 items-center gap-2 text-sm font-bold text-foreground">
          <input
            type="checkbox"
            checked={config.mercrediEnabled}
            onChange={(event) => updateConfig({ mercrediEnabled: event.target.checked })}
            className="h-4 w-4"
          />
          Activer le mercredi
        </label>
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
              {activeWeek ? (
                <button
                  type="button"
                  onClick={() => handleResetRealWeekFromReference(activeWeek)}
                  className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/50 hover:text-jade"
                >
                  Réinitialiser depuis la référence
                </button>
              ) : null}
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
        aria-label="Calendrier hebdomadaire"
        className="mt-8 rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6 print:hidden"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black text-foreground">
            {displayedWeek.label} —{" "}
            {teacherTimetableLevels.find((level) => level.id === state.levelId)?.label}
          </h2>
          <p className="text-sm text-muted">
            {isReadOnlyView
              ? "Lecture seule. Passez sur « Semaines réelles » pour modifier."
              : "Cliquez sur une case vide pour créer une séance. Glissez une bulle pour la déplacer."}
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-6 lg:flex-row">
          <div className="overflow-x-auto">
            <div
              className="grid"
              style={{ gridTemplateColumns: `4.5rem repeat(${enabledDays.length}, minmax(8.5rem, 1fr))` }}
            >
              <div aria-hidden="true" />
              {enabledDays.map((dayId) => (
                <div
                  key={dayId}
                  className="border-b border-white/10 px-2 pb-2 text-center text-xs font-bold uppercase tracking-wide text-muted"
                >
                  {teacherTimetableDayLabels[dayId]}
                </div>
              ))}

              <div className="relative" style={{ height: totalHeight }}>
                {hourMarks.map((minute) => (
                  <div
                    key={minute}
                    className="absolute right-1 -translate-y-1/2 text-[11px] font-bold text-muted"
                    style={{ top: (minute - config.dayStartMinutes) * PX_PER_MINUTE }}
                  >
                    {formatMinutesAsTime(minute)}
                  </div>
                ))}
              </div>

              {enabledDays.map((dayId) => (
                <div
                  key={dayId}
                  ref={(el) => {
                    columnRefs.current[dayId] = el;
                  }}
                  role={isReadOnlyView ? undefined : "button"}
                  tabIndex={-1}
                  onClick={(event) => handleColumnClick(event, dayId)}
                  className="relative border-l border-white/5 bg-background/20"
                  style={{ height: totalHeight, cursor: isReadOnlyView ? "default" : "copy" }}
                >
                  {hourMarks.map((minute) => (
                    <div
                      key={minute}
                      aria-hidden="true"
                      className="absolute left-0 right-0 border-t border-white/5"
                      style={{ top: (minute - config.dayStartMinutes) * PX_PER_MINUTE }}
                    />
                  ))}

                  {config.lunchEndMinutes > config.lunchStartMinutes ? (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 right-0 border-y border-dashed border-white/15 bg-white/[0.04]"
                      style={{
                        top: (config.lunchStartMinutes - config.dayStartMinutes) * PX_PER_MINUTE,
                        height: (config.lunchEndMinutes - config.lunchStartMinutes) * PX_PER_MINUTE,
                      }}
                    >
                      <span className="absolute left-1 top-1 text-[10px] font-bold uppercase tracking-wide text-muted">
                        Pause
                      </span>
                    </div>
                  ) : null}

                  {(sessionsByDay.get(dayId) ?? []).map((session) => {
                    const visual = getSubjectVisual(session.subject);
                    const colors = colorClasses[visual.colorKey];
                    const isSelected = session.id === selectedSessionId;
                    const isDragging = dragPreview?.sessionId === session.id;
                    const top = (session.startMinutes - config.dayStartMinutes) * PX_PER_MINUTE;
                    const height = session.durationMinutes * PX_PER_MINUTE;
                    return (
                      <div
                        key={session.id}
                        role="button"
                        tabIndex={0}
                        onPointerDown={(event) => handleBubblePointerDown(event, session)}
                        onPointerMove={(event) => handleBubblePointerMove(event, session)}
                        onPointerUp={(event) => handleBubblePointerUp(event, session)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setSelectedSessionId(session.id);
                          }
                        }}
                        aria-pressed={isSelected}
                        aria-label={`${session.title || session.subject}, ${formatMinutesAsTime(
                          session.startMinutes,
                        )}, durée ${formatDurationLabel(session.durationMinutes)}, statut ${
                          teacherTimetableSessionStatusLabels[session.status]
                        }`}
                        className={[
                          "absolute left-1 right-1 overflow-hidden rounded-md border-2 p-1.5 text-left shadow-sm transition",
                          patternBorderClasses[visual.pattern],
                          colors.border,
                          colors.surface,
                          isSelected ? "ring-2 ring-jade/70" : "",
                          isDragging ? "opacity-80" : "",
                        ].join(" ")}
                        style={{ top, height: Math.max(height, 18), touchAction: "none" }}
                      >
                        <p className={["truncate text-xs font-black", colors.text].join(" ")}>
                          <span aria-hidden="true">{visual.emoji}</span> {session.title || session.subject}
                        </p>
                        <p className="truncate text-[11px] font-bold text-muted">
                          {formatMinutesAsTime(session.startMinutes)} ·{" "}
                          {formatDurationLabel(session.durationMinutes)}
                        </p>
                        {session.status !== "prevue" ? (
                          <p className="truncate text-[10px] font-bold uppercase tracking-wide text-muted">
                            {teacherTimetableSessionStatusLabels[session.status]}
                          </p>
                        ) : null}
                        {!isReadOnlyView ? (
                          <button
                            type="button"
                            tabIndex={-1}
                            aria-label="Redimensionner la séance"
                            onPointerDown={(event) => handleResizePointerDown(event, session)}
                            onPointerMove={(event) => handleResizePointerMove(event, session)}
                            onPointerUp={(event) => handleResizePointerUp(event, session)}
                            className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize"
                            style={{ touchAction: "none" }}
                          >
                            <span className="mx-auto mt-0.5 block h-0.5 w-6 rounded-full bg-white/40" />
                          </button>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <aside
            aria-label="Édition de la séance sélectionnée"
            className="w-full shrink-0 rounded-lg border border-white/10 bg-background/40 p-4 lg:w-80"
          >
            {selectedSession ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-black uppercase tracking-wide text-foreground">
                    Modifier la séance
                  </h3>
                  <button
                    type="button"
                    onClick={() => setSelectedSessionId(null)}
                    aria-label="Fermer le panneau d'édition"
                    className="text-muted hover:text-foreground"
                  >
                    ×
                  </button>
                </div>

                <label className="block text-xs font-bold uppercase tracking-wide text-muted">
                  Titre
                  <input
                    type="text"
                    value={selectedSession.title}
                    onChange={(event) => patchSelectedSession({ title: event.target.value })}
                    disabled={isReadOnlyView}
                    className="mt-1 block min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-2 text-sm font-normal text-foreground disabled:opacity-60"
                  />
                </label>

                <label className="block text-xs font-bold uppercase tracking-wide text-muted">
                  Matière
                  <select
                    value={selectedSession.subject}
                    onChange={(event) => patchSelectedSession({ subject: event.target.value })}
                    disabled={isReadOnlyView}
                    className="mt-1 block min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-2 text-sm font-normal text-foreground disabled:opacity-60"
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-muted">
                    Heure de début
                    <input
                      type="time"
                      value={minutesToTimeInput(selectedSession.startMinutes)}
                      disabled={isReadOnlyView}
                      onChange={(event) =>
                        patchSelectedSession({ startMinutes: timeToMinutes(event.target.value) })
                      }
                      className="mt-1 block min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-2 text-sm font-normal text-foreground disabled:opacity-60"
                    />
                  </label>
                  <label className="block text-xs font-bold uppercase tracking-wide text-muted">
                    Durée (min)
                    <input
                      type="number"
                      min={config.gridStepMinutes}
                      step={config.gridStepMinutes}
                      value={selectedSession.durationMinutes}
                      disabled={isReadOnlyView}
                      onChange={(event) =>
                        patchSelectedSession({ durationMinutes: Number(event.target.value) || selectedSession.durationMinutes })
                      }
                      className="mt-1 block min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-2 text-sm font-normal text-foreground disabled:opacity-60"
                    />
                  </label>
                </div>

                <label className="block text-xs font-bold uppercase tracking-wide text-muted">
                  Groupe
                  <input
                    type="text"
                    value={selectedSession.group}
                    disabled={isReadOnlyView}
                    onChange={(event) => patchSelectedSession({ group: event.target.value })}
                    className="mt-1 block min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-2 text-sm font-normal text-foreground disabled:opacity-60"
                  />
                </label>

                <label className="block text-xs font-bold uppercase tracking-wide text-muted">
                  Lieu
                  <input
                    type="text"
                    value={selectedSession.location}
                    disabled={isReadOnlyView}
                    onChange={(event) => patchSelectedSession({ location: event.target.value })}
                    className="mt-1 block min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-2 text-sm font-normal text-foreground disabled:opacity-60"
                  />
                </label>

                <label className="block text-xs font-bold uppercase tracking-wide text-muted">
                  Matériel
                  <input
                    type="text"
                    value={selectedSession.material}
                    disabled={isReadOnlyView}
                    onChange={(event) => patchSelectedSession({ material: event.target.value })}
                    className="mt-1 block min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-2 text-sm font-normal text-foreground disabled:opacity-60"
                  />
                </label>

                <label className="block text-xs font-bold uppercase tracking-wide text-muted">
                  Statut
                  <select
                    value={selectedSession.status}
                    disabled={isReadOnlyView}
                    onChange={(event) =>
                      patchSelectedSession({ status: event.target.value as TeacherTimetableSessionStatus })
                    }
                    className="mt-1 block min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-2 text-sm font-normal text-foreground disabled:opacity-60"
                  >
                    {teacherTimetableSessionStatuses.map((status) => (
                      <option key={status} value={status}>
                        {teacherTimetableSessionStatusLabels[status]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-xs font-bold uppercase tracking-wide text-muted">
                  Note courte
                  <textarea
                    value={selectedSession.note}
                    disabled={isReadOnlyView}
                    onChange={(event) => patchSelectedSession({ note: event.target.value })}
                    rows={2}
                    className="mt-1 block w-full rounded-md border border-white/10 bg-background/60 px-2 py-1 text-sm font-normal text-foreground disabled:opacity-60"
                  />
                </label>

                {!isReadOnlyView ? (
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted">
                      Actions clavier (sans glisser-déposer)
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => moveSelectedDayBy(-1)}
                        className="min-h-11 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground hover:border-jade/50 hover:text-jade"
                      >
                        ← Jour précédent
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSelectedDayBy(1)}
                        className="min-h-11 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground hover:border-jade/50 hover:text-jade"
                      >
                        Jour suivant →
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSelectedTimeBy(-config.gridStepMinutes)}
                        className="min-h-11 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground hover:border-jade/50 hover:text-jade"
                      >
                        ↑ Créneau précédent
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSelectedTimeBy(config.gridStepMinutes)}
                        className="min-h-11 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground hover:border-jade/50 hover:text-jade"
                      >
                        ↓ Créneau suivant
                      </button>
                      <button
                        type="button"
                        onClick={() => changeSelectedDurationBy(-config.gridStepMinutes)}
                        className="min-h-11 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground hover:border-jade/50 hover:text-jade"
                      >
                        − Durée
                      </button>
                      <button
                        type="button"
                        onClick={() => changeSelectedDurationBy(config.gridStepMinutes)}
                        className="min-h-11 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground hover:border-jade/50 hover:text-jade"
                      >
                        + Durée
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDuplicateSession(displayedWeek.id, selectedSession)}
                        className="min-h-11 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground hover:border-jade/50 hover:text-jade"
                      >
                        Dupliquer
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSession(displayedWeek.id, selectedSession)}
                        className="min-h-11 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground hover:border-ember/50 hover:text-ember"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="text-sm leading-7 text-muted">
                Sélectionnez une séance pour la modifier, ou cliquez dans une case vide du
                calendrier pour en créer une.
              </p>
            )}
          </aside>
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
              ? `Le total dépasse de ${hoursDelta.toFixed(2)} h le repère de ${TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET} h hebdomadaires.`
              : `Le total n’atteint pas le repère de ${TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET} h hebdomadaires (manque ${(-hoursDelta).toFixed(2)} h).`}
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
                        <span className="text-muted">{hours.toFixed(2)} h</span>
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
              Aucune séance n’est encore planifiée.
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
              <th className="border border-black p-2 text-left">Horaire</th>
              {enabledDays.map((dayId) => (
                <th key={dayId} className="border border-black p-2 text-left">
                  {teacherTimetableDayLabels[dayId]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from(
              new Set(
                displayedWeek.sessions
                  .map((session) => session.startMinutes)
                  .sort((a, b) => a - b),
              ),
            ).map((startMinutes) => (
              <tr key={startMinutes}>
                <th className="border border-black p-2 text-left">
                  {formatMinutesAsTime(startMinutes)}
                </th>
                {enabledDays.map((dayId) => {
                  const session = displayedWeek.sessions.find(
                    (s) => s.dayId === dayId && s.startMinutes === startMinutes,
                  );
                  return (
                    <td key={dayId} className="border border-black p-2">
                      {session
                        ? `${session.title || session.subject} (${formatDurationLabel(session.durationMinutes)})`
                        : ""}
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
