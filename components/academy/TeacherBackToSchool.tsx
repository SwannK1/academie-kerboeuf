"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTeacherClassProfile } from "@/components/academy/TeacherClassProfile";
import { teacherClassPeriods } from "@/content/teacher-organizer";
import {
  BACK_TO_SCHOOL_STORAGE_KEY,
  PARENT_MEETING_STORAGE_KEY,
  backToSchoolCategories,
  getDefaultBackToSchoolState,
  getDefaultParentMeetingInfo,
  getDefaultParentMeetingState,
  type BackToSchoolCategory,
  type BackToSchoolState,
  type BackToSchoolTask,
  type ParentMeetingState,
} from "@/content/teacher-back-to-school";

function readStoredState(): BackToSchoolState {
  if (typeof window === "undefined") {
    return getDefaultBackToSchoolState();
  }
  try {
    const raw = window.localStorage.getItem(BACK_TO_SCHOOL_STORAGE_KEY);
    if (!raw) {
      return getDefaultBackToSchoolState();
    }
    const parsed = JSON.parse(raw) as Partial<BackToSchoolState>;
    if (!parsed || !Array.isArray(parsed.tasks)) {
      return getDefaultBackToSchoolState();
    }
    return {
      tasks: parsed.tasks.filter((task) => task.category !== "reunion-parents"),
    };
  } catch {
    return getDefaultBackToSchoolState();
  }
}

export function useBackToSchoolState() {
  const [state, setState] = useState<BackToSchoolState>(() =>
    readStoredState(),
  );

  useEffect(() => {
    window.localStorage.setItem(
      BACK_TO_SCHOOL_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  return { state, setState };
}

// Migration douce : les anciennes données de la réunion parents
// (tâches + informations de réunion) vivaient dans BACK_TO_SCHOOL_STORAGE_KEY.
// On les lit une seule fois et on les recopie dans la clé dédiée, sans
// supprimer les anciennes données.
function readLegacyParentMeetingState(): Partial<ParentMeetingState> | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(BACK_TO_SCHOOL_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as {
      tasks?: BackToSchoolTask[];
      parentMeeting?: Partial<ReturnType<typeof getDefaultParentMeetingInfo>>;
    };
    const legacyTasks = Array.isArray(parsed?.tasks)
      ? parsed.tasks.filter((task) => task.category === "reunion-parents")
      : [];
    const legacyMeeting = parsed?.parentMeeting;
    if (legacyTasks.length === 0 && !legacyMeeting) {
      return null;
    }
    return {
      tasks: legacyTasks.length > 0 ? legacyTasks : undefined,
      meeting: legacyMeeting
        ? { ...getDefaultParentMeetingInfo(), ...legacyMeeting }
        : undefined,
    };
  } catch {
    return null;
  }
}

function readStoredParentMeetingState(): ParentMeetingState {
  if (typeof window === "undefined") {
    return getDefaultParentMeetingState();
  }
  try {
    const raw = window.localStorage.getItem(PARENT_MEETING_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ParentMeetingState>;
      if (parsed && Array.isArray(parsed.tasks)) {
        return {
          tasks: parsed.tasks,
          meeting: {
            ...getDefaultParentMeetingInfo(),
            ...(parsed.meeting ?? {}),
          },
        };
      }
    }
  } catch {
    return getDefaultParentMeetingState();
  }

  const legacy = readLegacyParentMeetingState();
  if (!legacy) {
    return getDefaultParentMeetingState();
  }
  return {
    tasks: legacy.tasks ?? getDefaultParentMeetingState().tasks,
    meeting: legacy.meeting ?? getDefaultParentMeetingInfo(),
  };
}

export function useParentMeetingState() {
  const [state, setState] = useState<ParentMeetingState>(() =>
    readStoredParentMeetingState(),
  );

  useEffect(() => {
    window.localStorage.setItem(
      PARENT_MEETING_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  return { state, setState };
}

export function BackToSchoolClassSummary() {
  const { profile } = useTeacherClassProfile();
  const periodLabel = teacherClassPeriods.find(
    (period) => period.id === profile.activePeriod,
  )?.label;

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <p className="rounded-md border border-white/10 bg-background/45 px-4 py-3 text-sm text-foreground">
        <span className="block text-xs font-bold uppercase tracking-wide text-muted">
          Niveau
        </span>
        {profile.level}
        {profile.label ? ` — ${profile.label}` : ""}
      </p>
      <p className="rounded-md border border-white/10 bg-background/45 px-4 py-3 text-sm text-foreground">
        <span className="block text-xs font-bold uppercase tracking-wide text-muted">
          Élèves
        </span>
        {profile.pupilCount}
      </p>
      <p className="rounded-md border border-white/10 bg-background/45 px-4 py-3 text-sm text-foreground sm:col-span-2">
        <span className="block text-xs font-bold uppercase tracking-wide text-muted">
          Période active
        </span>
        {periodLabel}
      </p>
    </div>
  );
}

export function BackToSchoolOverview() {
  const { state } = useBackToSchoolState();
  const { state: parentMeetingState } = useParentMeetingState();

  const allTasks = useMemo(
    () => [...state.tasks, ...parentMeetingState.tasks],
    [state.tasks, parentMeetingState.tasks],
  );

  const totalDone = allTasks.filter((task) => task.isDone).length;
  const total = allTasks.length;

  const byCategory = useMemo(() => {
    return backToSchoolCategories.map((category) => {
      const tasks = allTasks.filter((task) => task.category === category.id);
      const done = tasks.filter((task) => task.isDone).length;
      return { ...category, done, total: tasks.length };
    });
  }, [allTasks]);

  return (
    <div>
      <p className="rounded-md border border-jade/30 bg-jade/[0.06] p-4 text-sm font-bold text-foreground">
        Avancement global : {totalDone} / {total} tâches terminées
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {byCategory.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="flex min-h-11 items-center justify-between rounded-md border border-white/10 bg-background/45 px-4 text-sm font-bold text-foreground transition hover:border-jade/40 hover:bg-jade/[0.08]"
          >
            <span>{category.label}</span>
            <span className="text-xs font-bold text-muted">
              {category.done} / {category.total}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function BackToSchoolChecklist({
  category,
}: {
  category: BackToSchoolCategory;
}) {
  const backToSchool = useBackToSchoolState();
  const parentMeeting = useParentMeetingState();
  const [draft, setDraft] = useState("");

  const isParentMeeting = category === "reunion-parents";
  const tasks = isParentMeeting
    ? parentMeeting.state.tasks
    : backToSchool.state.tasks;
  const done = tasks.filter((task) => task.isDone).length;

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const label = draft.trim();
    if (!label) {
      return;
    }
    const newTask: BackToSchoolTask = {
      id: `${category}-${Date.now()}`,
      category,
      label,
      isDone: false,
      createdAt: new Date().toISOString(),
    };
    if (isParentMeeting) {
      parentMeeting.setState((current) => ({
        ...current,
        tasks: [...current.tasks, newTask],
      }));
    } else {
      backToSchool.setState((current) => ({
        ...current,
        tasks: [...current.tasks, newTask],
      }));
    }
    setDraft("");
  }

  function toggleTask(id: string) {
    if (isParentMeeting) {
      parentMeeting.setState((current) => ({
        ...current,
        tasks: current.tasks.map((task) =>
          task.id === id ? { ...task, isDone: !task.isDone } : task,
        ),
      }));
    } else {
      backToSchool.setState((current) => ({
        ...current,
        tasks: current.tasks.map((task) =>
          task.id === id ? { ...task, isDone: !task.isDone } : task,
        ),
      }));
    }
  }

  function removeTask(id: string) {
    if (isParentMeeting) {
      parentMeeting.setState((current) => ({
        ...current,
        tasks: current.tasks.filter((task) => task.id !== id),
      }));
    } else {
      backToSchool.setState((current) => ({
        ...current,
        tasks: current.tasks.filter((task) => task.id !== id),
      }));
    }
  }

  return (
    <div>
      <p className="text-sm font-bold text-muted">
        {done} / {tasks.length} tâches terminées
      </p>

      <form onSubmit={addTask} className="mt-4 flex gap-2">
        <label htmlFor={`rentree-nouvelle-tache-${category}`} className="sr-only">
          Ajouter une tâche
        </label>
        <input
          id={`rentree-nouvelle-tache-${category}`}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ajouter une tâche"
          className="min-h-11 flex-1 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
        />
        <button
          type="submit"
          className="min-h-11 rounded-md border border-jade/35 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade hover:text-ink"
        >
          Ajouter
        </button>
      </form>

      {tasks.length > 0 ? (
        <ul className="mt-4 grid gap-2" role="list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 rounded-md border border-white/10 bg-background/45 px-4 py-2"
            >
              <input
                id={`tache-${task.id}`}
                type="checkbox"
                checked={task.isDone}
                onChange={() => toggleTask(task.id)}
                className="h-5 w-5"
              />
              <label
                htmlFor={`tache-${task.id}`}
                className={[
                  "flex-1 text-sm",
                  task.isDone ? "text-muted line-through" : "text-foreground",
                ].join(" ")}
              >
                {task.label}
              </label>
              <button
                type="button"
                onClick={() => removeTask(task.id)}
                aria-label={`Supprimer la tâche : ${task.label}`}
                className="text-sm font-bold text-muted transition hover:text-ember"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm leading-7 text-muted">
          Aucune tâche pour le moment.
        </p>
      )}
    </div>
  );
}

export function ParentMeetingForm() {
  const { state, setState } = useParentMeetingState();
  const meeting = state.meeting;

  function update(field: keyof typeof meeting, value: string) {
    setState((current) => ({
      ...current,
      meeting: { ...current.meeting, [field]: value },
    }));
  }

  return (
    <div className="grid gap-5">
      <div>
        <label
          htmlFor="reunion-date"
          className="block text-xs font-bold uppercase tracking-wide text-muted"
        >
          Date
        </label>
        <input
          id="reunion-date"
          type="date"
          value={meeting.date}
          onChange={(event) => update("date", event.target.value)}
          className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground sm:max-w-xs"
        />
      </div>

      <div>
        <label
          htmlFor="reunion-ordre-du-jour"
          className="block text-xs font-bold uppercase tracking-wide text-muted"
        >
          Ordre du jour
        </label>
        <textarea
          id="reunion-ordre-du-jour"
          value={meeting.agenda}
          onChange={(event) => update("agenda", event.target.value)}
          rows={4}
          placeholder="Points à aborder"
          className="mt-2 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
        />
      </div>

      <div>
        <label
          htmlFor="reunion-documents"
          className="block text-xs font-bold uppercase tracking-wide text-muted"
        >
          Documents à distribuer
        </label>
        <textarea
          id="reunion-documents"
          value={meeting.documents}
          onChange={(event) => update("documents", event.target.value)}
          rows={3}
          placeholder="Liste des documents"
          className="mt-2 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
        />
      </div>

      <div>
        <label
          htmlFor="reunion-questions"
          className="block text-xs font-bold uppercase tracking-wide text-muted"
        >
          Questions à anticiper
        </label>
        <textarea
          id="reunion-questions"
          value={meeting.questions}
          onChange={(event) => update("questions", event.target.value)}
          rows={3}
          placeholder="Questions probables des familles"
          className="mt-2 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
        />
      </div>

      <p role="status" className="text-sm text-muted">
        Ces informations sont enregistrées uniquement sur cet appareil.
      </p>
    </div>
  );
}
