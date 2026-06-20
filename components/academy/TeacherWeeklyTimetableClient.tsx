"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
} from "react";
import {
  clampToGrid,
  findOverlappingSlotIds,
  getRecommendedTeacherTimetable,
  minutesToRowIndex,
  minutesToTimeLabel,
  nextTeacherTimetableSlotId,
  rowIndexToMinutes,
  slotEndMinutes,
  teacherTimetableDays,
  teacherTimetableLevels,
  teacherTimetableReferenceHoursByLevel,
  teacherTimetableSubjectsByLevel,
  timeLabelToMinutes,
  TEACHER_TIMETABLE_DURATION_OPTIONS,
  TEACHER_TIMETABLE_GRID_ROWS,
  TEACHER_TIMETABLE_STORAGE_KEY,
  TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET,
  type TeacherTimetableDayId,
  type TeacherTimetableDurationMinutes,
  type TeacherTimetableLevelId,
  type TeacherTimetableSlot,
  type TeacherTimetableState,
} from "@/content/teacher-timetable";

const DEFAULT_LEVEL_ID: TeacherTimetableLevelId = "cm2";
const ROW_HEIGHT_PX = 32;

function readStoredState(): TeacherTimetableState | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(TEACHER_TIMETABLE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as TeacherTimetableState;
    if (!parsed || typeof parsed.levelId !== "string" || !Array.isArray(parsed.slots)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function TeacherWeeklyTimetableClient() {
  const [state, setState] = useState<TeacherTimetableState>(
    () => readStoredState() ?? getRecommendedTeacherTimetable(DEFAULT_LEVEL_ID),
  );
  const [mobileDayIndex, setMobileDayIndex] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formDay, setFormDay] = useState<TeacherTimetableDayId>("lundi");
  const [formTime, setFormTime] = useState("08:30");
  const [formDuration, setFormDuration] =
    useState<TeacherTimetableDurationMinutes>(60);
  const [formSubject, setFormSubject] = useState<string>("");

  const dragIdRef = useRef<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    day: TeacherTimetableDayId;
    rowIndex: number;
  } | null>(null);
  const columnRefs = useRef<Map<TeacherTimetableDayId, HTMLDivElement | null>>(
    new Map(),
  );

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_TIMETABLE_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  const subjects = teacherTimetableSubjectsByLevel[state.levelId];
  const referenceHours = teacherTimetableReferenceHoursByLevel[state.levelId];
  const selectedSubject =
    formSubject && subjects.includes(formSubject) ? formSubject : subjects[0];

  const overlappingIds = useMemo(
    () => findOverlappingSlotIds(state.slots),
    [state.slots],
  );

  const hoursBySubject = useMemo(() => {
    const totals = new Map<string, number>();
    for (const slot of state.slots) {
      totals.set(
        slot.subject,
        (totals.get(slot.subject) ?? 0) + slot.durationMinutes / 60,
      );
    }
    return totals;
  }, [state.slots]);

  const totalHours = useMemo(
    () =>
      Array.from(hoursBySubject.values()).reduce((sum, hours) => sum + hours, 0),
    [hoursBySubject],
  );

  function handleLevelChange(levelId: TeacherTimetableLevelId) {
    setState((previous) => ({
      levelId,
      slots: levelId === previous.levelId ? previous.slots : [],
    }));
    setEditingId(null);
  }

  function handleReset() {
    setState(getRecommendedTeacherTimetable(state.levelId));
    setEditingId(null);
  }

  const updateSlot = useCallback(
    (id: string, changes: Partial<Omit<TeacherTimetableSlot, "id">>) => {
      setState((previous) => ({
        ...previous,
        slots: previous.slots.map((slot) =>
          slot.id === id ? { ...slot, ...changes } : slot,
        ),
      }));
    },
    [],
  );

  function deleteSlot(id: string) {
    setState((previous) => ({
      ...previous,
      slots: previous.slots.filter((slot) => slot.id !== id),
    }));
    if (editingId === id) setEditingId(null);
  }

  function addSlot() {
    const startMinutes = timeLabelToMinutes(formTime);
    if (startMinutes === null || !selectedSubject) return;
    const newSlot: TeacherTimetableSlot = {
      id: nextTeacherTimetableSlotId(),
      day: formDay,
      startMinutes: clampToGrid(startMinutes),
      durationMinutes: formDuration,
      subject: selectedSubject,
    };
    setState((previous) => ({ ...previous, slots: [...previous.slots, newSlot] }));
  }

  function moveStep(id: string, direction: -1 | 1) {
    const slot = state.slots.find((entry) => entry.id === id);
    if (!slot) return;
    const daySlots = state.slots
      .filter((entry) => entry.day === slot.day)
      .sort((a, b) => a.startMinutes - b.startMinutes);
    const index = daySlots.findIndex((entry) => entry.id === id);
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= daySlots.length) return;
    const neighbor = daySlots[targetIndex];
    updateSlot(slot.id, { startMinutes: neighbor.startMinutes });
    updateSlot(neighbor.id, { startMinutes: slot.startMinutes });
  }

  function moveDay(id: string, direction: -1 | 1) {
    const slot = state.slots.find((entry) => entry.id === id);
    if (!slot) return;
    const dayIndex = teacherTimetableDays.findIndex((d) => d.id === slot.day);
    const targetIndex = dayIndex + direction;
    if (targetIndex < 0 || targetIndex >= teacherTimetableDays.length) return;
    updateSlot(id, { day: teacherTimetableDays[targetIndex].id });
  }

  function handleDragStart(event: DragEvent<HTMLDivElement>, id: string) {
    dragIdRef.current = id;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", id);
  }

  function handleDragOverColumn(
    event: DragEvent<HTMLDivElement>,
    day: TeacherTimetableDayId,
  ) {
    event.preventDefault();
    const column = columnRefs.current.get(day);
    if (!column) return;
    const rect = column.getBoundingClientRect();
    const offsetY = event.clientY - rect.top;
    const rowIndex = Math.min(
      Math.max(Math.floor(offsetY / ROW_HEIGHT_PX), 0),
      TEACHER_TIMETABLE_GRID_ROWS - 1,
    );
    setDropTarget({ day, rowIndex });
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const id = dragIdRef.current ?? event.dataTransfer.getData("text/plain");
    if (id && dropTarget) {
      updateSlot(id, {
        day: dropTarget.day,
        startMinutes: rowIndexToMinutes(dropTarget.rowIndex),
      });
    }
    dragIdRef.current = null;
    setDropTarget(null);
  }

  function handleDragEnd() {
    dragIdRef.current = null;
    setDropTarget(null);
  }

  const hoursDelta = totalHours - TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET;
  const mobileDay = teacherTimetableDays[mobileDayIndex];

  const printRows = useMemo(
    () =>
      teacherTimetableDays.flatMap((day) =>
        state.slots
          .filter((slot) => slot.day === day.id)
          .sort((a, b) => a.startMinutes - b.startMinutes)
          .map((slot) => ({ day, slot })),
      ),
    [state.slots],
  );

  return (
    <div className="mt-10 teacher-timetable-print-root">
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
        aria-labelledby="creer-creneau"
        className="mt-8 rounded-lg border border-white/10 bg-background/45 p-5 print:hidden"
      >
        <h2 id="creer-creneau" className="text-xl font-black text-foreground">
          Créer un créneau
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Jour
            <select
              value={formDay}
              onChange={(event) =>
                setFormDay(event.target.value as TeacherTimetableDayId)
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {teacherTimetableDays.map((day) => (
                <option key={day.id} value={day.id}>
                  {day.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Horaire de début
            <input
              type="time"
              value={formTime}
              onChange={(event) => setFormTime(event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Durée
            <select
              value={formDuration}
              onChange={(event) =>
                setFormDuration(
                  Number(event.target.value) as TeacherTimetableDurationMinutes,
                )
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {TEACHER_TIMETABLE_DURATION_OPTIONS.map((duration) => (
                <option key={duration} value={duration}>
                  {duration} min
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Matière
            <select
              value={selectedSubject}
              onChange={(event) => setFormSubject(event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="button"
          onClick={addSlot}
          className="mt-4 min-h-11 rounded-md border border-jade/50 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25"
        >
          Ajouter le créneau
        </button>
      </section>

      {overlappingIds.size > 0 ? (
        <p
          role="status"
          className="mt-6 flex items-center gap-2 rounded-md border border-ember/40 bg-ember/[0.08] px-4 py-2 text-sm font-bold text-ember print:hidden"
        >
          <span aria-hidden="true">⚠</span>
          {overlappingIds.size} créneau(x) en chevauchement horaire — vérifiez
          les créneaux signalés ci-dessous.
        </p>
      ) : null}

      <section
        aria-label="Grille hebdomadaire"
        className="mt-8 rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6 print:hidden"
      >
        <h2 className="text-xl font-black text-foreground">
          Grille de la semaine —{" "}
          {teacherTimetableLevels.find((level) => level.id === state.levelId)?.label}
        </h2>

        {/* Navigation mobile : un jour à la fois. */}
        <div className="mt-4 flex items-center justify-between gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => setMobileDayIndex((index) => Math.max(index - 1, 0))}
            disabled={mobileDayIndex === 0}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Jour précédent
          </button>
          <span className="text-sm font-black text-foreground">
            {mobileDay.label}
          </span>
          <button
            type="button"
            onClick={() =>
              setMobileDayIndex((index) =>
                Math.min(index + 1, teacherTimetableDays.length - 1),
              )
            }
            disabled={mobileDayIndex === teacherTimetableDays.length - 1}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            Jour suivant →
          </button>
        </div>

        <div className="mt-5 sm:hidden">
          <DayColumn
            day={mobileDay}
            slots={state.slots.filter((slot) => slot.day === mobileDay.id)}
            overlappingIds={overlappingIds}
            dropTarget={dropTarget}
            columnRefs={columnRefs}
            onDragStart={handleDragStart}
            onDragOverColumn={handleDragOverColumn}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            editingId={editingId}
            setEditingId={setEditingId}
            updateSlot={updateSlot}
            deleteSlot={deleteSlot}
            moveStep={moveStep}
            moveDay={moveDay}
            subjects={subjects}
          />
        </div>

        <div className="mt-5 hidden gap-2 sm:grid sm:grid-cols-5">
          {teacherTimetableDays.map((day) => (
            <DayColumn
              key={day.id}
              day={day}
              slots={state.slots.filter((slot) => slot.day === day.id)}
              overlappingIds={overlappingIds}
              dropTarget={dropTarget}
              columnRefs={columnRefs}
              onDragStart={handleDragStart}
              onDragOverColumn={handleDragOverColumn}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              editingId={editingId}
              setEditingId={setEditingId}
              updateSlot={updateSlot}
              deleteSlot={deleteSlot}
              moveStep={moveStep}
              moveDay={moveDay}
              subjects={subjects}
            />
          ))}
        </div>
      </section>

      <section
        aria-label="Compteurs d'heures"
        className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6 print:border-black print:bg-transparent"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
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
              "mt-3 rounded-md border px-4 py-2 text-sm font-bold print:hidden",
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
            className="mt-3 rounded-md border border-jade/30 bg-jade/[0.08] px-4 py-2 text-sm font-bold text-jade print:hidden"
          >
            Le total correspond au repère de {TEACHER_TIMETABLE_WEEKLY_HOURS_TARGET} h
            hebdomadaires.
          </p>
        )}

        <div className="mt-5">
          <p className="text-sm font-bold text-foreground print:text-black">
            Heures par matière (comparées au repère configuré)
          </p>
          {hoursBySubject.size > 0 ? (
            <ul className="mt-2 grid gap-2 sm:grid-cols-2" role="list">
              {subjects
                .filter((subject) => hoursBySubject.has(subject))
                .map((subject) => {
                  const actual = hoursBySubject.get(subject) ?? 0;
                  const reference = referenceHours[subject];
                  const delta = reference !== undefined ? actual - reference : null;
                  return (
                    <li
                      key={subject}
                      className="flex min-h-11 flex-col justify-center rounded-md border border-white/10 bg-background/45 px-4 py-2 text-sm font-bold text-foreground print:border-black"
                    >
                      <span className="flex items-center justify-between">
                        {subject}
                        <span className="text-muted">{actual} h</span>
                      </span>
                      {reference !== undefined ? (
                        <span className="text-xs font-medium text-muted">
                          Repère : {reference} h
                          {delta !== null && delta !== 0
                            ? ` (${delta > 0 ? "+" : ""}${delta} h)`
                            : " (conforme)"}
                        </span>
                      ) : null}
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

      {/* Vue impression : liste tabulaire, lisible en A4 paysage. */}
      <section aria-label="Emploi du temps imprimable" className="hidden print:block">
        <h2 className="text-xl font-black text-black">
          Emploi du temps —{" "}
          {teacherTimetableLevels.find((level) => level.id === state.levelId)?.label}
        </h2>
        <table className="mt-4 w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-black text-xs font-bold uppercase tracking-wide text-black">
              <th className="py-2 pr-4">Jour</th>
              <th className="py-2 pr-4">Horaire</th>
              <th className="py-2 pr-4">Durée</th>
              <th className="py-2 pr-4">Matière</th>
            </tr>
          </thead>
          <tbody>
            {printRows.map(({ day, slot }) => (
              <tr key={slot.id} className="border-b border-black/30 text-black">
                <td className="py-1.5 pr-4">{day.label}</td>
                <td className="py-1.5 pr-4">
                  {minutesToTimeLabel(slot.startMinutes)} –{" "}
                  {minutesToTimeLabel(slotEndMinutes(slot))}
                </td>
                <td className="py-1.5 pr-4">{slot.durationMinutes} min</td>
                <td className="py-1.5 pr-4">{slot.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

interface DayColumnProps {
  day: { id: TeacherTimetableDayId; label: string };
  slots: TeacherTimetableSlot[];
  overlappingIds: Set<string>;
  dropTarget: { day: TeacherTimetableDayId; rowIndex: number } | null;
  columnRefs: React.MutableRefObject<
    Map<TeacherTimetableDayId, HTMLDivElement | null>
  >;
  onDragStart: (event: DragEvent<HTMLDivElement>, id: string) => void;
  onDragOverColumn: (
    event: DragEvent<HTMLDivElement>,
    day: TeacherTimetableDayId,
  ) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  updateSlot: (
    id: string,
    changes: Partial<Omit<TeacherTimetableSlot, "id">>,
  ) => void;
  deleteSlot: (id: string) => void;
  moveStep: (id: string, direction: -1 | 1) => void;
  moveDay: (id: string, direction: -1 | 1) => void;
  subjects: string[];
}

function DayColumn({
  day,
  slots,
  overlappingIds,
  dropTarget,
  columnRefs,
  onDragStart,
  onDragOverColumn,
  onDrop,
  onDragEnd,
  editingId,
  setEditingId,
  updateSlot,
  deleteSlot,
  moveStep,
  moveDay,
  subjects,
}: DayColumnProps) {
  const sortedSlots = [...slots].sort((a, b) => a.startMinutes - b.startMinutes);
  const isDropDay = dropTarget?.day === day.id;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-black uppercase tracking-wide text-foreground">
        {day.label}
      </h3>
      <div
        ref={(node) => {
          columnRefs.current.set(day.id, node);
        }}
        onDragOver={(event) => onDragOverColumn(event, day.id)}
        onDrop={onDrop}
        className="relative rounded-md border border-white/10 bg-background/30"
        style={{ height: TEACHER_TIMETABLE_GRID_ROWS * ROW_HEIGHT_PX }}
      >
        {Array.from({ length: TEACHER_TIMETABLE_GRID_ROWS }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            aria-hidden="true"
            className={[
              "absolute left-0 right-0 border-t border-white/5",
              isDropDay && dropTarget?.rowIndex === rowIndex
                ? "border-t-2 border-jade bg-jade/10"
                : "",
            ].join(" ")}
            style={{ top: rowIndex * ROW_HEIGHT_PX, height: ROW_HEIGHT_PX }}
          />
        ))}

        {sortedSlots.map((slot) => {
          const top =
            minutesToRowIndex(slot.startMinutes) * ROW_HEIGHT_PX;
          const height = (slot.durationMinutes / 30) * ROW_HEIGHT_PX;
          const hasOverlap = overlappingIds.has(slot.id);
          const isEditing = editingId === slot.id;

          return (
            <div
              key={slot.id}
              draggable={!isEditing}
              onDragStart={(event) => onDragStart(event, slot.id)}
              onDragEnd={onDragEnd}
              tabIndex={0}
              role="group"
              aria-label={`Créneau ${slot.subject}, ${day.label} ${minutesToTimeLabel(
                slot.startMinutes,
              )}${hasOverlap ? ", chevauchement détecté" : ""}`}
              className={[
                "absolute left-1 right-1 overflow-y-auto rounded-md border p-1.5 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-jade/60",
                hasOverlap
                  ? "border-ember bg-ember/15"
                  : "border-jade/40 bg-jade/10",
              ].join(" ")}
              style={{ top, height: Math.max(height, ROW_HEIGHT_PX) }}
            >
              {isEditing ? (
                <SlotEditForm
                  slot={slot}
                  subjects={subjects}
                  onSave={(changes) => {
                    updateSlot(slot.id, changes);
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <>
                  <p className="flex items-center gap-1 font-black text-foreground">
                    <span aria-hidden="true" className="select-none">
                      ⠿
                    </span>
                    {slot.subject}
                    {hasOverlap ? (
                      <span aria-hidden="true" title="Chevauchement">
                        ⚠
                      </span>
                    ) : null}
                  </p>
                  <p className="text-muted">
                    {minutesToTimeLabel(slot.startMinutes)} (
                    {slot.durationMinutes} min)
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() => moveStep(slot.id, -1)}
                      aria-label={`Avancer ${slot.subject} d'un créneau`}
                      className="min-h-7 min-w-7 rounded border border-white/15 px-1 text-[0.65rem] font-bold text-foreground hover:border-jade/50 hover:text-jade"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveStep(slot.id, 1)}
                      aria-label={`Reculer ${slot.subject} d'un créneau`}
                      className="min-h-7 min-w-7 rounded border border-white/15 px-1 text-[0.65rem] font-bold text-foreground hover:border-jade/50 hover:text-jade"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => moveDay(slot.id, -1)}
                      aria-label={`Déplacer ${slot.subject} au jour précédent`}
                      className="min-h-7 rounded border border-white/15 px-1 text-[0.65rem] font-bold text-foreground hover:border-jade/50 hover:text-jade"
                    >
                      ← Jour
                    </button>
                    <button
                      type="button"
                      onClick={() => moveDay(slot.id, 1)}
                      aria-label={`Déplacer ${slot.subject} au jour suivant`}
                      className="min-h-7 rounded border border-white/15 px-1 text-[0.65rem] font-bold text-foreground hover:border-jade/50 hover:text-jade"
                    >
                      Jour →
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(slot.id)}
                      aria-label={`Modifier ${slot.subject}`}
                      className="min-h-7 rounded border border-white/15 px-1 text-[0.65rem] font-bold text-foreground hover:border-sky-400/50 hover:text-sky-300"
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteSlot(slot.id)}
                      aria-label={`Supprimer ${slot.subject}`}
                      className="min-h-7 rounded border border-white/15 px-1 text-[0.65rem] font-bold text-foreground hover:border-ember/50 hover:text-ember"
                    >
                      Supprimer
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface SlotEditFormProps {
  slot: TeacherTimetableSlot;
  subjects: string[];
  onSave: (changes: Partial<Omit<TeacherTimetableSlot, "id">>) => void;
  onCancel: () => void;
}

function SlotEditForm({ slot, subjects, onSave, onCancel }: SlotEditFormProps) {
  const [day, setDay] = useState(slot.day);
  const [time, setTime] = useState(minutesToTimeLabel(slot.startMinutes).replace("h", ":"));
  const [duration, setDuration] = useState(slot.durationMinutes);
  const [subject, setSubject] = useState(slot.subject);

  function handleSave() {
    const startMinutes = timeLabelToMinutes(time);
    onSave({
      day,
      startMinutes:
        startMinutes !== null ? clampToGrid(startMinutes) : slot.startMinutes,
      durationMinutes: duration as TeacherTimetableDurationMinutes,
      subject,
    });
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="flex flex-col text-[0.65rem] font-bold text-foreground">
        Jour
        <select
          value={day}
          onChange={(event) => setDay(event.target.value as TeacherTimetableDayId)}
          className="min-h-7 rounded border border-white/15 bg-background/70 px-1 text-[0.65rem] text-foreground"
        >
          {teacherTimetableDays.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col text-[0.65rem] font-bold text-foreground">
        Horaire
        <input
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          className="min-h-7 rounded border border-white/15 bg-background/70 px-1 text-[0.65rem] text-foreground"
        />
      </label>
      <label className="flex flex-col text-[0.65rem] font-bold text-foreground">
        Durée
        <select
          value={duration}
          onChange={(event) =>
            setDuration(Number(event.target.value) as TeacherTimetableDurationMinutes)
          }
          className="min-h-7 rounded border border-white/15 bg-background/70 px-1 text-[0.65rem] text-foreground"
        >
          {TEACHER_TIMETABLE_DURATION_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option} min
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col text-[0.65rem] font-bold text-foreground">
        Matière
        <select
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className="min-h-7 rounded border border-white/15 bg-background/70 px-1 text-[0.65rem] text-foreground"
        >
          {subjects.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-1 flex gap-1">
        <button
          type="button"
          onClick={handleSave}
          className="min-h-7 rounded border border-jade/50 bg-jade/15 px-1.5 text-[0.65rem] font-bold text-jade"
        >
          Enregistrer
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="min-h-7 rounded border border-white/15 px-1.5 text-[0.65rem] font-bold text-foreground"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
