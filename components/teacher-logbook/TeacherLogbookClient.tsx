"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  addDaysToKey,
  createBlankSession,
  createEmptyWeekData,
  createSessionId,
  formatWeekRangeLabel,
  getMondayKey,
  logbookDays,
  logbookGroups,
  logbookLevels,
  logbookSlots,
  logbookSpecialWeekTypes,
  logbookStatuses,
  logbookSubjects,
  nextDay,
  type LogbookDay,
  type LogbookSession,
  type LogbookSlotId,
  type LogbookSpecialWeekType,
  type LogbookStatus,
  type LogbookWeekData,
} from "@/content/teacher-logbook";
import {
  isLocalStorageAvailable,
  isPlainObject,
  sanitizeObjectArray,
  writeLocalStorageJson,
} from "@/content/teacher-local-storage";

const STORAGE_KEY = "academie-kerboeuf-cahier-journal-v1";

type StoredData = Record<string, LogbookWeekData>;

function isLogbookSession(value: unknown): value is LogbookSession {
  if (!isPlainObject(value)) return false;
  return typeof value.id === "string" && typeof value.day === "string" && typeof value.slotId === "string";
}

function isLogbookWeekData(value: unknown): value is LogbookWeekData {
  return isPlainObject(value) && Array.isArray(value.sessions);
}

function readStoredDataChecked(): {
  data: StoredData;
  wasReset: boolean;
  storageAvailable: boolean;
} {
  const storageAvailable = isLocalStorageAvailable();
  if (!storageAvailable) return { data: {}, wasReset: false, storageAvailable };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { data: {}, wasReset: false, storageAvailable };
    const parsed = JSON.parse(raw) as unknown;
    if (!isPlainObject(parsed)) return { data: {}, wasReset: true, storageAvailable };
    const result: StoredData = {};
    let wasReset = false;
    for (const [key, value] of Object.entries(parsed)) {
      if (!isLogbookWeekData(value)) {
        wasReset = true;
        continue;
      }
      const sanitizedSessions = sanitizeObjectArray<LogbookSession>(value.sessions).filter(
        isLogbookSession,
      );
      if (sanitizedSessions.length !== value.sessions.length) wasReset = true;
      result[key] = { ...value, sessions: sanitizedSessions };
    }
    return { data: result, wasReset, storageAvailable };
  } catch {
    return { data: {}, wasReset: true, storageAvailable };
  }
}

function statusLabel(status: LogbookStatus): string {
  return logbookStatuses.find((item) => item.id === status)?.label ?? status;
}

function statusSymbol(status: LogbookStatus): string {
  return logbookStatuses.find((item) => item.id === status)?.symbol ?? "";
}

function subjectLabel(id: LogbookSession["subject"]): string {
  return logbookSubjects.find((item) => item.id === id)?.label ?? id;
}

function levelLabel(id: LogbookSession["level"]): string {
  return logbookLevels.find((item) => item.id === id)?.label ?? id;
}

function groupLabel(id: LogbookSession["group"]): string {
  return logbookGroups.find((item) => item.id === id)?.label ?? id;
}

export function TeacherLogbookClient() {
  const initialData = useMemo(() => readStoredDataChecked(), []);
  const [data, setData] = useState<StoredData>(initialData.data);
  const [storageNotice, setStorageNotice] = useState<string | null>(
    !initialData.storageAvailable
      ? "Le stockage local n'est pas disponible (navigation privée ou bloqué) : vos modifications ne seront pas sauvegardées."
      : initialData.wasReset
        ? "Certaines séances enregistrées étaient illisibles et ont été ignorées."
        : null,
  );
  const [currentWeekKey, setCurrentWeekKey] = useState(() =>
    getMondayKey(new Date()),
  );
  const [editingSession, setEditingSession] = useState<LogbookSession | null>(
    null,
  );
  const dragSourceRef = useRef<string | null>(null);
  const instructionsId = useId();

  useEffect(() => {
    writeLocalStorageJson(STORAGE_KEY, data);
  }, [data]);

  const week = useMemo<LogbookWeekData>(
    () => data[currentWeekKey] ?? createEmptyWeekData(),
    [data, currentWeekKey],
  );

  function updateWeek(
    key: string,
    updater: (current: LogbookWeekData) => LogbookWeekData,
  ) {
    setData((prev) => {
      const current = prev[key] ?? createEmptyWeekData();
      return { ...prev, [key]: updater(current) };
    });
  }

  function updateCurrentWeek(
    updater: (current: LogbookWeekData) => LogbookWeekData,
  ) {
    updateWeek(currentWeekKey, updater);
  }

  function goToWeek(key: string) {
    setCurrentWeekKey(key);
    setEditingSession(null);
  }

  function addSession(day: LogbookDay, slotId: LogbookSlotId) {
    const session = createBlankSession(day, slotId);
    updateCurrentWeek((current) => ({
      ...current,
      sessions: [...current.sessions, session],
    }));
    setEditingSession(session);
  }

  function saveSession(updated: LogbookSession) {
    updateCurrentWeek((current) => ({
      ...current,
      sessions: current.sessions.map((item) =>
        item.id === updated.id ? updated : item,
      ),
    }));
    setEditingSession(null);
  }

  function deleteSession(id: string) {
    updateCurrentWeek((current) => ({
      ...current,
      sessions: current.sessions.filter((item) => item.id !== id),
    }));
    setEditingSession(null);
  }

  function duplicateSession(session: LogbookSession) {
    const copy: LogbookSession = {
      ...session,
      id: createSessionId(),
      status: "a-preparer",
    };
    updateCurrentWeek((current) => ({
      ...current,
      sessions: [...current.sessions, copy],
    }));
  }

  function setSessionStatus(id: string, status: LogbookStatus) {
    updateCurrentWeek((current) => ({
      ...current,
      sessions: current.sessions.map((item) =>
        item.id === id ? { ...item, status } : item,
      ),
    }));
  }

  function postponeToNextDay(session: LogbookSession) {
    const { day, weekOffset } = nextDay(session.day);
    if (weekOffset === 0) {
      updateCurrentWeek((current) => ({
        ...current,
        sessions: current.sessions.map((item) =>
          item.id === session.id
            ? { ...item, day, status: "a-reporter" }
            : item,
        ),
      }));
    } else {
      const targetKey = addDaysToKey(currentWeekKey, 7);
      updateCurrentWeek((current) => ({
        ...current,
        sessions: current.sessions.filter((item) => item.id !== session.id),
      }));
      updateWeek(targetKey, (current) => ({
        ...current,
        sessions: [
          ...current.sessions,
          { ...session, day, status: "a-reporter" },
        ],
      }));
    }
    setEditingSession(null);
  }

  function moveSession(
    id: string,
    targetDay: LogbookDay,
    targetSlotId: LogbookSlotId,
  ) {
    updateCurrentWeek((current) => ({
      ...current,
      sessions: current.sessions.map((item) =>
        item.id === id ? { ...item, day: targetDay, slotId: targetSlotId } : item,
      ),
    }));
  }

  function reorderWithinCell(
    day: LogbookDay,
    slotId: LogbookSlotId,
    index: number,
    direction: -1 | 1,
  ) {
    updateCurrentWeek((current) => {
      const cellIds = current.sessions
        .filter((item) => item.day === day && item.slotId === slotId)
        .map((item) => item.id);
      const target = index + direction;
      if (target < 0 || target >= cellIds.length) return current;
      const reordered = [...cellIds];
      const [moved] = reordered.splice(index, 1);
      reordered.splice(target, 0, moved);

      const others = current.sessions.filter(
        (item) => !(item.day === day && item.slotId === slotId),
      );
      const cellSessions = reordered.map(
        (sessionId) => current.sessions.find((s) => s.id === sessionId)!,
      );
      return { ...current, sessions: [...others, ...cellSessions] };
    });
  }

  function handleDropOnCell(targetDay: LogbookDay, targetSlotId: LogbookSlotId) {
    const sourceId = dragSourceRef.current;
    dragSourceRef.current = null;
    if (!sourceId) return;
    moveSession(sourceId, targetDay, targetSlotId);
  }

  function duplicateDay(sourceDay: LogbookDay, targetDay: LogbookDay) {
    updateCurrentWeek((current) => {
      const sourceSessions = current.sessions.filter(
        (item) => item.day === sourceDay,
      );
      const copies = sourceSessions.map((item) => ({
        ...item,
        id: createSessionId(),
        day: targetDay,
        status: "a-preparer" as LogbookStatus,
      }));
      return { ...current, sessions: [...current.sessions, ...copies] };
    });
  }

  function duplicateWeekToNext() {
    const targetKey = addDaysToKey(currentWeekKey, 7);
    const copies = week.sessions.map((item) => ({
      ...item,
      id: createSessionId(),
      status: "a-preparer" as LogbookStatus,
    }));
    updateWeek(targetKey, (current) => ({
      ...current,
      sessions: [...current.sessions, ...copies],
    }));
    goToWeek(targetKey);
  }

  function setSpecialWeek(type: LogbookSpecialWeekType | null) {
    updateCurrentWeek((current) => ({ ...current, specialWeekType: type }));
  }

  function setSpecialWeekNote(note: string) {
    updateCurrentWeek((current) => ({ ...current, specialWeekNote: note }));
  }

  const printables = useMemo(
    () => week.sessions.filter((item) => item.printableAvailable),
    [week.sessions],
  );

  function setPrintCopies(id: string, copies: number) {
    updateCurrentWeek((current) => ({
      ...current,
      sessions: current.sessions.map((item) =>
        item.id === id
          ? { ...item, printableCopies: Math.max(1, copies) }
          : item,
      ),
    }));
  }

  return (
    <div className="mt-10 space-y-8 print:mt-4 print:space-y-4">
      {storageNotice ? (
        <div
          role="status"
          className="flex items-start justify-between gap-4 rounded-lg border border-amber/40 bg-amber/10 p-4 text-sm text-amber print:hidden"
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
      <p
        role="note"
        className="rounded-lg border border-ember/40 bg-ember/10 p-4 text-sm font-bold text-foreground print:hidden"
      >
        Cahier journal local uniquement. Sauvegarde sur cet appareil
        (localStorage). N’inscrivez aucune information sensible ou
        nominative : pas de nom, prénom, donnée de santé ou de comportement
        d’élève.
      </p>

      <section
        aria-labelledby="navigation-semaine"
        className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/10 bg-background/45 p-4 print:hidden"
      >
        <h2 id="navigation-semaine" className="text-xl font-black text-foreground">
          {formatWeekRangeLabel(currentWeekKey)}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => goToWeek(addDaysToKey(currentWeekKey, -7))}
            className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/40"
          >
            ← Semaine précédente
          </button>
          <button
            type="button"
            onClick={() => goToWeek(getMondayKey(new Date()))}
            className="min-h-11 rounded-md border border-jade/60 bg-jade/15 px-3 text-sm font-bold text-jade transition hover:bg-jade/25"
          >
            Semaine actuelle
          </button>
          <button
            type="button"
            onClick={() => goToWeek(addDaysToKey(currentWeekKey, 7))}
            className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/40"
          >
            Semaine suivante →
          </button>
          <label className="flex items-center gap-2 text-sm font-bold text-foreground">
            Aller à la semaine du
            <input
              type="date"
              onChange={(event) => {
                if (!event.target.value) return;
                const [y, m, d] = event.target.value.split("-").map(Number);
                goToWeek(getMondayKey(new Date(y, m - 1, d)));
              }}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-2 text-sm font-medium text-foreground"
            />
          </label>
        </div>
      </section>

      <section
        aria-labelledby="semaine-speciale"
        className="rounded-lg border border-white/10 bg-background/45 p-4 print:hidden"
      >
        <h2 id="semaine-speciale" className="text-xl font-black text-foreground">
          Semaine spéciale et duplication
        </h2>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Type de semaine
            <select
              value={week.specialWeekType ?? ""}
              onChange={(event) =>
                setSpecialWeek(
                  event.target.value
                    ? (event.target.value as LogbookSpecialWeekType)
                    : null,
                )
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              <option value="">Semaine normale</option>
              {logbookSpecialWeekTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>
          {week.specialWeekType && (
            <label className="flex flex-1 flex-col gap-2 text-sm font-bold text-foreground">
              Note sur la semaine spéciale
              <input
                type="text"
                value={week.specialWeekNote}
                onChange={(event) => setSpecialWeekNote(event.target.value)}
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                placeholder="Sortie au musée, évaluations de période, remplacement..."
              />
            </label>
          )}
          <button
            type="button"
            onClick={duplicateWeekToNext}
            className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/40"
          >
            Dupliquer cette semaine → semaine suivante
          </button>
        </div>
      </section>

      <section aria-labelledby="grille-semaine">
        <h2 id="grille-semaine" className="text-xl font-black text-foreground print:text-base">
          Vue de la semaine
        </h2>
        <p id={instructionsId} className="mt-2 text-sm text-muted print:hidden">
          Faites glisser une carte vers un autre jour ou créneau, ou utilisez
          les boutons « Monter » / « Descendre » et le sélecteur « Déplacer »
          au clavier.
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-sm print:min-w-0 print:text-xs">
            <thead>
              <tr>
                <th scope="col" className="w-32 border border-white/10 p-2 text-left text-xs font-bold uppercase tracking-[0.1em] text-muted">
                  Créneau
                </th>
                {logbookDays.map((day) => (
                  <th
                    key={day.id}
                    scope="col"
                    className="border border-white/10 p-2 text-left text-xs font-bold uppercase tracking-[0.1em] text-muted"
                  >
                    {day.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logbookSlots.map((slot) => (
                <tr key={slot.id}>
                  <th
                    scope="row"
                    className="border border-white/10 p-2 align-top text-left text-xs font-bold text-foreground"
                  >
                    {slot.label}
                  </th>
                  {logbookDays.map((day) => {
                    const cellSessions = week.sessions.filter(
                      (item) => item.day === day.id && item.slotId === slot.id,
                    );
                    return (
                      <td
                        key={day.id}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() => handleDropOnCell(day.id, slot.id)}
                        className="border border-white/10 p-2 align-top"
                      >
                        <ul className="space-y-2" role="list">
                          {cellSessions.map((session, index) => (
                            <li
                              key={session.id}
                              draggable
                              onDragStart={() => {
                                dragSourceRef.current = session.id;
                              }}
                              className="rounded-md border border-white/15 bg-background/40 p-2 print:border-black/40"
                            >
                              <button
                                type="button"
                                onClick={() => setEditingSession(session)}
                                className="w-full min-h-8 text-left"
                              >
                                <span className="block text-xs font-black text-foreground">
                                  {session.title || "(sans titre)"}
                                </span>
                                <span className="mt-1 block text-[11px] text-muted">
                                  {subjectLabel(session.subject)} ·{" "}
                                  {levelLabel(session.level)}
                                  {session.durationLabel
                                    ? ` · ${session.durationLabel}`
                                    : ""}
                                </span>
                                <span className="mt-1 block text-[11px] text-muted">
                                  {groupLabel(session.group)}
                                  {session.location ? ` · ${session.location}` : ""}
                                </span>
                                <span
                                  className="mt-1 inline-flex items-center gap-1 rounded border border-white/20 px-1.5 py-0.5 text-[11px] font-bold text-foreground"
                                  aria-label={`Statut : ${statusLabel(session.status)}`}
                                >
                                  <span aria-hidden="true">
                                    {statusSymbol(session.status)}
                                  </span>
                                  {statusLabel(session.status)}
                                </span>
                              </button>
                              <div className="mt-2 flex flex-wrap items-center gap-1 print:hidden">
                                <button
                                  type="button"
                                  onClick={() =>
                                    reorderWithinCell(day.id, slot.id, index, -1)
                                  }
                                  disabled={index === 0}
                                  aria-label={`Monter ${session.title || "la séance"}`}
                                  className="min-h-8 min-w-8 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/50 disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                  ↑
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    reorderWithinCell(day.id, slot.id, index, 1)
                                  }
                                  disabled={index === cellSessions.length - 1}
                                  aria-label={`Descendre ${session.title || "la séance"}`}
                                  className="min-h-8 min-w-8 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/50 disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                  ↓
                                </button>
                                <label className="sr-only" htmlFor={`move-${session.id}`}>
                                  Déplacer {session.title || "la séance"} vers
                                </label>
                                <select
                                  id={`move-${session.id}`}
                                  value={`${session.day}|${session.slotId}`}
                                  onChange={(event) => {
                                    const [targetDay, targetSlot] =
                                      event.target.value.split("|") as [
                                        LogbookDay,
                                        LogbookSlotId,
                                      ];
                                    moveSession(session.id, targetDay, targetSlot);
                                  }}
                                  className="min-h-8 rounded-md border border-white/15 bg-background/60 px-1 text-[11px] font-medium text-foreground"
                                >
                                  {logbookDays.map((d) =>
                                    logbookSlots.map((s) => (
                                      <option
                                        key={`${d.id}|${s.id}`}
                                        value={`${d.id}|${s.id}`}
                                      >
                                        {d.label} · {s.label}
                                      </option>
                                    )),
                                  )}
                                </select>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={() => addSession(day.id, slot.id)}
                          className="mt-2 min-h-8 w-full rounded-md border border-dashed border-white/20 text-[11px] font-bold text-muted transition hover:border-jade/40 hover:text-jade print:hidden"
                        >
                          + Ajouter une séance
                        </button>
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
        aria-labelledby="duplication-jour"
        className="rounded-lg border border-white/10 bg-background/45 p-4 print:hidden"
      >
        <h2 id="duplication-jour" className="text-xl font-black text-foreground">
          Dupliquer une journée
        </h2>
        <DayDuplicationForm onDuplicate={duplicateDay} />
      </section>

      <section
        aria-labelledby="impression-semaine"
        className="rounded-lg border border-white/10 bg-background/45 p-4 print:border-black/40"
      >
        <h2 id="impression-semaine" className="text-xl font-black text-foreground">
          À imprimer cette semaine
        </h2>
        {printables.length === 0 ? (
          <p className="mt-2 text-sm text-muted">
            Aucune séance avec un support imprimable disponible pour cette
            semaine.
          </p>
        ) : (
          <ul className="mt-4 space-y-2" role="list">
            {printables.map((session) => (
              <li
                key={session.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-white/10 bg-background/30 p-3 print:border-black/30"
              >
                <span className="text-sm font-bold text-foreground">
                  {session.printableLabel || session.title || "(sans titre)"}
                  <span className="ml-2 text-xs font-medium text-muted">
                    {logbookDays.find((d) => d.id === session.day)?.label}
                  </span>
                </span>
                <label className="flex items-center gap-2 text-sm font-bold text-foreground print:hidden">
                  Exemplaires
                  <input
                    type="number"
                    min={1}
                    value={session.printableCopies}
                    onChange={(event) =>
                      setPrintCopies(session.id, Number(event.target.value))
                    }
                    className="min-h-8 w-20 rounded-md border border-white/15 bg-background/60 px-2 text-sm font-medium text-foreground"
                  />
                </label>
                <span className="hidden text-sm font-bold text-foreground print:inline">
                  {session.printableCopies} exemplaire(s)
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {editingSession && (
        <SessionEditorModal
          session={editingSession}
          onClose={() => setEditingSession(null)}
          onSave={saveSession}
          onDelete={deleteSession}
          onDuplicate={duplicateSession}
          onPostpone={postponeToNextDay}
          onSetStatus={setSessionStatus}
        />
      )}
    </div>
  );
}

function DayDuplicationForm({
  onDuplicate,
}: {
  onDuplicate: (source: LogbookDay, target: LogbookDay) => void;
}) {
  const [source, setSource] = useState<LogbookDay>(logbookDays[0].id);
  const [target, setTarget] = useState<LogbookDay>(logbookDays[1].id);

  return (
    <div className="mt-4 flex flex-wrap items-end gap-4">
      <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
        Journée source
        <select
          value={source}
          onChange={(event) => setSource(event.target.value as LogbookDay)}
          className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
        >
          {logbookDays.map((day) => (
            <option key={day.id} value={day.id}>
              {day.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
        Journée cible
        <select
          value={target}
          onChange={(event) => setTarget(event.target.value as LogbookDay)}
          className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
        >
          {logbookDays.map((day) => (
            <option key={day.id} value={day.id}>
              {day.label}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        onClick={() => onDuplicate(source, target)}
        disabled={source === target}
        className="min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Dupliquer la journée
      </button>
    </div>
  );
}

function SessionEditorModal({
  session,
  onClose,
  onSave,
  onDelete,
  onDuplicate,
  onPostpone,
  onSetStatus,
}: {
  session: LogbookSession;
  onClose: () => void;
  onSave: (session: LogbookSession) => void;
  onDelete: (id: string) => void;
  onDuplicate: (session: LogbookSession) => void;
  onPostpone: (session: LogbookSession) => void;
  onSetStatus: (id: string, status: LogbookStatus) => void;
}) {
  const [draft, setDraft] = useState<LogbookSession>(session);
  const titleId = useId();

  function update<K extends keyof LogbookSession>(
    key: K,
    value: LogbookSession[K],
  ) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 print:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-white/15 bg-background p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-black text-foreground">
            Détail de la séance
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="min-h-8 min-w-8 rounded-md border border-white/15 px-2 text-sm font-bold text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Titre court
            <input
              type="text"
              value={draft.title}
              onChange={(event) => update("title", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              placeholder="Lecture suivie chapitre 3"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Matière
            <select
              value={draft.subject}
              onChange={(event) =>
                update("subject", event.target.value as LogbookSession["subject"])
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {logbookSubjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Niveau
            <select
              value={draft.level}
              onChange={(event) =>
                update("level", event.target.value as LogbookSession["level"])
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {logbookLevels.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Durée
            <input
              type="text"
              value={draft.durationLabel}
              onChange={(event) => update("durationLabel", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              placeholder="45 min"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Groupe
            <select
              value={draft.group}
              onChange={(event) =>
                update("group", event.target.value as LogbookSession["group"])
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {logbookGroups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Matériel
            <input
              type="text"
              value={draft.material}
              onChange={(event) => update("material", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              placeholder="Manuel, cahier du jour"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Lieu
            <input
              type="text"
              value={draft.location}
              onChange={(event) => update("location", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              placeholder="Salle de classe, gymnase"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Statut
            <select
              value={draft.status}
              onChange={(event) =>
                update("status", event.target.value as LogbookStatus)
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {logbookStatuses.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Objectif
            <textarea
              value={draft.objective}
              onChange={(event) => update("objective", event.target.value)}
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Déroulé court
            <textarea
              value={draft.outline}
              onChange={(event) => update("outline", event.target.value)}
              rows={3}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Impressions à prévoir (description libre)
            <input
              type="text"
              value={draft.printsToPrepare}
              onChange={(event) => update("printsToPrepare", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              placeholder="Fiche d'exercices à photocopier"
            />
          </label>

          <label className="flex items-center gap-2 text-sm font-bold text-foreground">
            <input
              type="checkbox"
              checked={draft.printableAvailable}
              onChange={(event) =>
                update("printableAvailable", event.target.checked)
              }
              className="h-4 w-4"
            />
            Support imprimable réellement disponible
          </label>

          {draft.printableAvailable && (
            <>
              <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                Nom du support
                <input
                  type="text"
                  value={draft.printableLabel}
                  onChange={(event) =>
                    update("printableLabel", event.target.value)
                  }
                  className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                Exemplaires
                <input
                  type="number"
                  min={1}
                  value={draft.printableCopies}
                  onChange={(event) =>
                    update("printableCopies", Math.max(1, Number(event.target.value)))
                  }
                  className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                />
              </label>
            </>
          )}

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Note personnelle (locale)
            <textarea
              value={draft.personalNote}
              onChange={(event) => update("personalNote", event.target.value)}
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Lien vers une ressource Académie Kerboeuf (optionnel)
            <input
              type="text"
              value={draft.resourceLink}
              onChange={(event) => update("resourceLink", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              placeholder="/primaire/cp/programmes/francais/lecture-comprehension"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => onSave(draft)}
            className="min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25"
          >
            Enregistrer
          </button>
          <button
            type="button"
            onClick={() => onDuplicate(draft)}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/40"
          >
            Dupliquer
          </button>
          <button
            type="button"
            onClick={() => onPostpone(draft)}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/40"
          >
            Reporter au lendemain
          </button>
          <button
            type="button"
            onClick={() => onSetStatus(draft.id, "faite")}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/40"
          >
            Marquer faite
          </button>
          <button
            type="button"
            onClick={() => onSetStatus(draft.id, "a-reporter")}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/40"
          >
            Marquer à reporter
          </button>
          <button
            type="button"
            onClick={() => onSetStatus(draft.id, "a-ajuster")}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/40"
          >
            Marquer à ajuster
          </button>
          <button
            type="button"
            onClick={() => onDelete(draft.id)}
            className="min-h-11 rounded-md border border-ember/50 px-4 text-sm font-bold text-ember transition hover:bg-ember/10"
          >
            Supprimer
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-white/30"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
