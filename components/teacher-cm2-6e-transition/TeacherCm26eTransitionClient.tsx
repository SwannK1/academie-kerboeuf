"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createTeacherCm26eMeetingId,
  createTeacherCm26eTaskId,
  getDefaultTeacherCm26eTransitionState,
  teacherCm26eTaskCategories,
  teacherCm26eTaskPriorities,
  TEACHER_CM2_6E_TRANSITION_STORAGE_KEY,
  type TeacherCm26eTaskCategoryId,
  type TeacherCm26eTaskPriority,
  type TeacherCm26eTransitionState,
} from "@/content/teacher-cm2-6e-transition";

function readStoredState(): TeacherCm26eTransitionState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(
      TEACHER_CM2_6E_TRANSITION_STORAGE_KEY,
    );
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as TeacherCm26eTransitionState;
    if (!parsed || !Array.isArray(parsed.tasks) || !Array.isArray(parsed.meetings)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function TeacherCm26eTransitionClient() {
  const [state, setState] = useState<TeacherCm26eTransitionState>(
    () => readStoredState() ?? getDefaultTeacherCm26eTransitionState(),
  );
  const [newTaskLabel, setNewTaskLabel] = useState("");
  const [newTaskCategoryId, setNewTaskCategoryId] =
    useState<TeacherCm26eTaskCategoryId>("rencontres");
  const [newTaskPriority, setNewTaskPriority] =
    useState<TeacherCm26eTaskPriority>("normale");

  const [meetingDate, setMeetingDate] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [meetingAgenda, setMeetingAgenda] = useState("");
  const [meetingDecisions, setMeetingDecisions] = useState("");
  const [meetingFollowUpTasks, setMeetingFollowUpTasks] = useState("");

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_CM2_6E_TRANSITION_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  const summary = useMemo(() => {
    const total = state.tasks.length;
    const done = state.tasks.filter((task) => task.done).length;
    const importantPending = state.tasks.filter(
      (task) => !task.done && task.priority === "importante",
    ).length;
    return {
      total,
      done,
      pending: total - done,
      importantPending,
      meetings: state.meetings.length,
    };
  }, [state.tasks, state.meetings]);

  function handleAddTask() {
    const label = newTaskLabel.trim();
    if (!label) {
      return;
    }
    setState((previous) => ({
      ...previous,
      tasks: [
        ...previous.tasks,
        {
          id: createTeacherCm26eTaskId(),
          categoryId: newTaskCategoryId,
          label,
          priority: newTaskPriority,
          done: false,
        },
      ],
    }));
    setNewTaskLabel("");
  }

  function handleToggleTask(taskId: string) {
    setState((previous) => ({
      ...previous,
      tasks: previous.tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    }));
  }

  function handleDeleteTask(taskId: string) {
    setState((previous) => ({
      ...previous,
      tasks: previous.tasks.filter((task) => task.id !== taskId),
    }));
  }

  function handleAddMeeting() {
    const agenda = meetingAgenda.trim();
    if (!agenda) {
      return;
    }
    setState((previous) => ({
      ...previous,
      meetings: [
        ...previous.meetings,
        {
          id: createTeacherCm26eMeetingId(),
          date: meetingDate.trim(),
          location: meetingLocation.trim(),
          agenda,
          decisions: meetingDecisions.trim(),
          followUpTasks: meetingFollowUpTasks.trim(),
        },
      ],
    }));
    setMeetingDate("");
    setMeetingLocation("");
    setMeetingAgenda("");
    setMeetingDecisions("");
    setMeetingFollowUpTasks("");
  }

  function handleDeleteMeeting(meetingId: string) {
    setState((previous) => ({
      ...previous,
      meetings: previous.meetings.filter((meeting) => meeting.id !== meetingId),
    }));
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="mt-10">
      <section
        aria-label="Bilan général"
        className="rounded-lg border border-jade/25 bg-jade/[0.05] p-5 sm:p-6 print:border-black"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black text-foreground">
            Bilan général
          </h2>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade print:hidden"
          >
            Imprimer
          </button>
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="list">
          <li className="rounded-md border border-white/10 bg-background/45 px-4 py-3 text-sm font-bold text-foreground">
            {summary.done} / {summary.total} tâches terminées
          </li>
          <li className="rounded-md border border-white/10 bg-background/45 px-4 py-3 text-sm font-bold text-foreground">
            {summary.pending} tâches restantes
          </li>
          <li className="rounded-md border border-white/10 bg-background/45 px-4 py-3 text-sm font-bold text-foreground">
            {summary.importantPending} tâches importantes en attente
          </li>
          <li className="rounded-md border border-white/10 bg-background/45 px-4 py-3 text-sm font-bold text-foreground">
            {summary.meetings} rencontre(s) enregistrée(s)
          </li>
        </ul>
      </section>

      <section
        aria-label="Ajouter une tâche"
        className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6 print:hidden"
      >
        <h2 className="text-xl font-black text-foreground">Ajouter une tâche</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <label
              htmlFor="new-task-label"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Tâche
            </label>
            <input
              id="new-task-label"
              type="text"
              value={newTaskLabel}
              onChange={(event) => setNewTaskLabel(event.target.value)}
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
              placeholder="Décrire la tâche"
            />
          </div>
          <div>
            <label
              htmlFor="new-task-category"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Catégorie
            </label>
            <select
              id="new-task-category"
              value={newTaskCategoryId}
              onChange={(event) =>
                setNewTaskCategoryId(
                  event.target.value as TeacherCm26eTaskCategoryId,
                )
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            >
              {teacherCm26eTaskCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="new-task-priority"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Priorité
            </label>
            <select
              id="new-task-priority"
              value={newTaskPriority}
              onChange={(event) =>
                setNewTaskPriority(event.target.value as TeacherCm26eTaskPriority)
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            >
              {teacherCm26eTaskPriorities.map((priority) => (
                <option key={priority.id} value={priority.id}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddTask}
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-black text-jade transition hover:border-jade/60"
        >
          Ajouter la tâche
        </button>
      </section>

      <section aria-label="Checklist par catégorie" className="mt-8">
        <h2 className="text-xl font-black text-foreground">
          Checklist par catégorie
        </h2>
        <div className="mt-4 grid gap-6">
          {teacherCm26eTaskCategories.map((category) => {
            const tasks = state.tasks.filter(
              (task) => task.categoryId === category.id,
            );
            return (
              <div
                key={category.id}
                className="rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6 print:border-black"
              >
                <h3 className="text-lg font-black text-foreground">
                  {category.label}
                </h3>
                {tasks.length > 0 ? (
                  <ul className="mt-3 grid gap-2" role="list">
                    {tasks.map((task) => (
                      <li
                        key={task.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-white/10 bg-background/45 px-4 py-3"
                      >
                        <label className="flex min-h-11 flex-1 items-center gap-3 text-sm font-bold text-foreground">
                          <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => handleToggleTask(task.id)}
                            className="h-5 w-5"
                          />
                          <span className={task.done ? "line-through text-muted" : ""}>
                            {task.label}
                          </span>
                        </label>
                        <div className="flex items-center gap-3">
                          <span
                            className={[
                              "rounded-md border px-3 py-1 text-xs font-bold uppercase tracking-wide",
                              task.priority === "importante"
                                ? "border-ember/30 bg-ember/[0.08] text-ember"
                                : task.priority === "normale"
                                  ? "border-sky/30 bg-sky/[0.08] text-sky"
                                  : "border-white/15 bg-white/[0.04] text-muted",
                            ].join(" ")}
                          >
                            {
                              teacherCm26eTaskPriorities.find(
                                (priority) => priority.id === task.priority,
                              )?.label
                            }
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteTask(task.id)}
                            className="min-h-11 rounded-md border border-white/15 px-3 text-xs font-bold text-muted transition hover:border-ember/40 hover:text-ember print:hidden"
                          >
                            Supprimer
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-7 text-muted">
                    Aucune tâche dans cette catégorie.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section
        aria-label="Créer une rencontre"
        className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6 print:hidden"
      >
        <h2 className="text-xl font-black text-foreground">
          Créer une rencontre
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor="meeting-date"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Date (facultatif)
            </label>
            <input
              id="meeting-date"
              type="date"
              value={meetingDate}
              onChange={(event) => setMeetingDate(event.target.value)}
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>
          <div>
            <label
              htmlFor="meeting-location"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Lieu (facultatif)
            </label>
            <input
              id="meeting-location"
              type="text"
              value={meetingLocation}
              onChange={(event) => setMeetingLocation(event.target.value)}
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
              placeholder="École, collège, visioconférence..."
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="meeting-agenda"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Ordre du jour
            </label>
            <textarea
              id="meeting-agenda"
              value={meetingAgenda}
              onChange={(event) => setMeetingAgenda(event.target.value)}
              rows={3}
              className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
              placeholder="Points à aborder"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="meeting-decisions"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Décisions
            </label>
            <textarea
              id="meeting-decisions"
              value={meetingDecisions}
              onChange={(event) => setMeetingDecisions(event.target.value)}
              rows={3}
              className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
              placeholder="Décisions prises lors de la rencontre"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="meeting-followup"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Tâches de suivi
            </label>
            <textarea
              id="meeting-followup"
              value={meetingFollowUpTasks}
              onChange={(event) => setMeetingFollowUpTasks(event.target.value)}
              rows={3}
              className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
              placeholder="Actions à mener après la rencontre"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddMeeting}
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-black text-jade transition hover:border-jade/60"
        >
          Enregistrer la rencontre
        </button>
      </section>

      <section aria-label="Rencontres enregistrées" className="mt-8">
        <h2 className="text-xl font-black text-foreground">
          Rencontres enregistrées
        </h2>
        {state.meetings.length > 0 ? (
          <div className="mt-4 grid gap-4">
            {state.meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="rounded-lg border border-gold/25 bg-gold/[0.05] p-5 sm:p-6 print:border-black"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-black text-foreground">
                    {meeting.date || "Date non précisée"}
                    {meeting.location ? ` — ${meeting.location}` : ""}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleDeleteMeeting(meeting.id)}
                    className="min-h-11 rounded-md border border-white/15 px-3 text-xs font-bold text-muted transition hover:border-ember/40 hover:text-ember print:hidden"
                  >
                    Supprimer
                  </button>
                </div>
                <div className="mt-3 grid gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-muted">
                      Ordre du jour
                    </p>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-foreground">
                      {meeting.agenda}
                    </p>
                  </div>
                  {meeting.decisions ? (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-muted">
                        Décisions
                      </p>
                      <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-foreground">
                        {meeting.decisions}
                      </p>
                    </div>
                  ) : null}
                  {meeting.followUpTasks ? (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-muted">
                        Tâches de suivi
                      </p>
                      <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-foreground">
                        {meeting.followUpTasks}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm leading-7 text-muted">
            Aucune rencontre enregistrée pour le moment.
          </p>
        )}
      </section>
    </div>
  );
}
