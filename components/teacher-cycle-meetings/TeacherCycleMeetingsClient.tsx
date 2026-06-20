"use client";

import { useMemo, useState } from "react";
import {
  teacherCycleMeetingTaskStatuses,
  teacherCycleMeetingTypes,
  type TeacherCycleMeeting,
  type TeacherCycleMeetingTask,
  type TeacherCycleMeetingType,
} from "@/content/teacher-cycle-meetings";

const STORAGE_KEY = "academie-kerboeuf-conseils-cycle-v1";

function readStoredMeetings(): TeacherCycleMeeting[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed as TeacherCycleMeeting[];
  } catch {
    return [];
  }
}

function writeStoredMeetings(meetings: TeacherCycleMeeting[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
}

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function TeacherCycleMeetingsClient() {
  const [meetings, setMeetings] = useState<TeacherCycleMeeting[]>(() =>
    readStoredMeetings(),
  );
  const [meetingPendingDeletionId, setMeetingPendingDeletionId] = useState<
    string | null
  >(null);

  const [type, setType] = useState<TeacherCycleMeetingType>(
    teacherCycleMeetingTypes[0].id,
  );
  const [date, setDate] = useState("");
  const [agenda, setAgenda] = useState("");
  const [decisions, setDecisions] = useState("");
  const [taskDraft, setTaskDraft] = useState("");
  const [draftTasks, setDraftTasks] = useState<TeacherCycleMeetingTask[]>([]);

  const sortedMeetings = useMemo(
    () =>
      [...meetings].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      ),
    [meetings],
  );

  function persist(next: TeacherCycleMeeting[]) {
    setMeetings(next);
    writeStoredMeetings(next);
  }

  function addDraftTask() {
    const label = taskDraft.trim();
    if (!label) {
      return;
    }
    setDraftTasks((current) => [
      ...current,
      { id: createId(), label, status: "a-faire" },
    ]);
    setTaskDraft("");
  }

  function removeDraftTask(taskId: string) {
    setDraftTasks((current) => current.filter((task) => task.id !== taskId));
  }

  function createMeeting() {
    if (!agenda.trim()) {
      return;
    }

    const meeting: TeacherCycleMeeting = {
      id: createId(),
      type,
      date: date || null,
      agenda: agenda.trim(),
      decisions: decisions.trim(),
      tasks: draftTasks,
      createdAt: new Date().toISOString(),
    };

    persist([...meetings, meeting]);

    setType(teacherCycleMeetingTypes[0].id);
    setDate("");
    setAgenda("");
    setDecisions("");
    setDraftTasks([]);
    setTaskDraft("");
  }

  function toggleTaskStatus(meetingId: string, taskId: string) {
    persist(
      meetings.map((meeting) => {
        if (meeting.id !== meetingId) {
          return meeting;
        }
        return {
          ...meeting,
          tasks: meeting.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status: task.status === "fait" ? "a-faire" : "fait",
                }
              : task,
          ),
        };
      }),
    );
  }

  function deleteMeeting(meetingId: string) {
    persist(meetings.filter((meeting) => meeting.id !== meetingId));
    setMeetingPendingDeletionId(null);
  }

  function printMeeting() {
    window.print();
  }

  return (
    <div>
      <section
        aria-labelledby="nouvelle-reunion-titre"
        className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
      >
        <h2
          id="nouvelle-reunion-titre"
          className="text-xl font-black text-foreground"
        >
          Créer une réunion
        </h2>

        <div className="mt-4 flex flex-col gap-4">
          <div>
            <label
              htmlFor="meeting-type"
              className="text-sm font-bold text-foreground"
            >
              Type de réunion
            </label>
            <select
              id="meeting-type"
              value={type}
              onChange={(event) =>
                setType(event.target.value as TeacherCycleMeetingType)
              }
              className="mt-2 min-h-11 w-full rounded-md border border-white/15 bg-background px-3 text-sm text-foreground"
            >
              {teacherCycleMeetingTypes.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="meeting-date"
              className="text-sm font-bold text-foreground"
            >
              Date (facultative)
            </label>
            <input
              id="meeting-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="mt-2 min-h-11 w-full rounded-md border border-white/15 bg-background px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="meeting-agenda"
              className="text-sm font-bold text-foreground"
            >
              Ordre du jour
            </label>
            <textarea
              id="meeting-agenda"
              value={agenda}
              onChange={(event) => setAgenda(event.target.value)}
              rows={4}
              className="mt-2 w-full rounded-md border border-white/15 bg-background px-3 py-2 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="meeting-decisions"
              className="text-sm font-bold text-foreground"
            >
              Décisions
            </label>
            <textarea
              id="meeting-decisions"
              value={decisions}
              onChange={(event) => setDecisions(event.target.value)}
              rows={4}
              className="mt-2 w-full rounded-md border border-white/15 bg-background px-3 py-2 text-sm text-foreground"
            />
          </div>

          <div>
            <span className="text-sm font-bold text-foreground">
              Tâches de suivi
            </span>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={taskDraft}
                onChange={(event) => setTaskDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addDraftTask();
                  }
                }}
                placeholder="Ex. : préparer le bilan de période"
                className="min-h-11 flex-1 rounded-md border border-white/15 bg-background px-3 text-sm text-foreground"
              />
              <button
                type="button"
                onClick={addDraftTask}
                className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/40"
              >
                Ajouter
              </button>
            </div>

            {draftTasks.length > 0 && (
              <ul className="mt-3 flex flex-col gap-2">
                {draftTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2"
                  >
                    <span className="text-sm text-foreground">
                      {task.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeDraftTask(task.id)}
                      aria-label={`Retirer la tâche ${task.label}`}
                      className="text-xs font-bold text-muted transition hover:text-rose"
                    >
                      Retirer
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={createMeeting}
              disabled={!agenda.trim()}
              className="min-h-11 rounded-md border border-jade/60 bg-jade/10 px-5 text-sm font-bold text-jade transition hover:bg-jade/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Créer la réunion
            </button>
          </div>
        </div>
      </section>

      <section aria-labelledby="reunions-passees-titre" className="mt-10">
        <h2
          id="reunions-passees-titre"
          className="text-xl font-black text-foreground"
        >
          Réunions enregistrées
        </h2>

        {sortedMeetings.length === 0 ? (
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
            Aucune réunion enregistrée pour le moment.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-5">
            {sortedMeetings.map((meeting) => {
              const meetingTypeLabel = teacherCycleMeetingTypes.find(
                (option) => option.id === meeting.type,
              )?.label;

              return (
                <li
                  key={meeting.id}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-sky">
                        {meetingTypeLabel}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {meeting.date
                          ? `Date : ${meeting.date}`
                          : "Date non renseignée"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={printMeeting}
                        className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-jade/40"
                      >
                        Imprimer
                      </button>

                      {meetingPendingDeletionId === meeting.id ? (
                        <>
                          <button
                            type="button"
                            onClick={() => deleteMeeting(meeting.id)}
                            className="min-h-9 rounded border border-rose/60 bg-rose/10 px-3 text-xs font-bold text-rose"
                          >
                            Confirmer la suppression
                          </button>
                          <button
                            type="button"
                            onClick={() => setMeetingPendingDeletionId(null)}
                            className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-muted"
                          >
                            Annuler
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setMeetingPendingDeletionId(meeting.id)
                          }
                          className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-muted transition hover:border-rose/40 hover:text-rose"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                        Ordre du jour
                      </p>
                      <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-foreground">
                        {meeting.agenda}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                        Décisions
                      </p>
                      <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-foreground">
                        {meeting.decisions || "—"}
                      </p>
                    </div>
                  </div>

                  {meeting.tasks.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                        Tâches de suivi
                      </p>
                      <ul className="mt-2 flex flex-col gap-2">
                        {meeting.tasks.map((task) => (
                          <li
                            key={task.id}
                            className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-background/40 px-3 py-2"
                          >
                            <span className="text-sm text-foreground">
                              {task.label}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                toggleTaskStatus(meeting.id, task.id)
                              }
                              aria-pressed={task.status === "fait"}
                              className={[
                                "min-h-9 rounded border px-3 text-xs font-bold transition",
                                task.status === "fait"
                                  ? "border-jade/60 bg-jade/10 text-jade"
                                  : "border-white/15 text-muted hover:border-jade/40",
                              ].join(" ")}
                            >
                              {
                                teacherCycleMeetingTaskStatuses.find(
                                  (option) => option.id === task.status,
                                )?.label
                              }
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
