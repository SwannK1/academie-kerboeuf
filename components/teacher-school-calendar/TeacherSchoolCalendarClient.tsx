"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createTeacherCalendarEventId,
  getDefaultTeacherSchoolCalendarState,
  teacherCalendarEventCategories,
  teacherCalendarMonthLabels,
  TEACHER_SCHOOL_CALENDAR_STORAGE_KEY,
  type TeacherCalendarEvent,
  type TeacherCalendarEventCategoryId,
  type TeacherCalendarPeriodId,
  type TeacherSchoolCalendarState,
} from "@/content/teacher-school-calendar";

const ALL_CATEGORIES_FILTER = "toutes";

function readStoredState(): TeacherSchoolCalendarState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(
      TEACHER_SCHOOL_CALENDAR_STORAGE_KEY,
    );
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as TeacherSchoolCalendarState;
    if (!parsed || !Array.isArray(parsed.events) || !Array.isArray(parsed.periods)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function getMonthKey(date: string): string {
  return date.slice(0, 7);
}

export function TeacherSchoolCalendarClient() {
  const [state, setState] = useState<TeacherSchoolCalendarState>(
    () => readStoredState() ?? getDefaultTeacherSchoolCalendarState(),
  );
  const [categoryFilter, setCategoryFilter] = useState<
    TeacherCalendarEventCategoryId | typeof ALL_CATEGORIES_FILTER
  >(ALL_CATEGORIES_FILTER);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const [formDate, setFormDate] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] =
    useState<TeacherCalendarEventCategoryId>("autre");
  const [formNote, setFormNote] = useState("");

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_SCHOOL_CALENDAR_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  const [year, monthIndex] = currentMonth.split("-").map(Number);
  const monthLabel = `${teacherCalendarMonthLabels[monthIndex - 1]} ${year}`;

  const eventsForMonth = useMemo(() => {
    return state.events
      .filter((event) => getMonthKey(event.date) === currentMonth)
      .filter(
        (event) =>
          categoryFilter === ALL_CATEGORIES_FILTER ||
          event.category === categoryFilter,
      )
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [state.events, currentMonth, categoryFilter]);

  function handlePreviousMonth() {
    const date = new Date(year, monthIndex - 1, 1);
    date.setMonth(date.getMonth() - 1);
    setCurrentMonth(
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
    );
  }

  function handleNextMonth() {
    const date = new Date(year, monthIndex - 1, 1);
    date.setMonth(date.getMonth() + 1);
    setCurrentMonth(
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
    );
  }

  function handleCreateEvent(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (!formDate || !formTitle.trim()) {
      return;
    }

    const newEvent: TeacherCalendarEvent = {
      id: createTeacherCalendarEventId(),
      date: formDate,
      title: formTitle.trim(),
      note: formNote.trim(),
      category: formCategory,
      done: false,
    };

    setState((previous) => ({
      ...previous,
      events: [...previous.events, newEvent],
    }));

    setFormDate("");
    setFormTitle("");
    setFormNote("");
    setFormCategory("autre");
  }

  function handleToggleDone(id: string) {
    setState((previous) => ({
      ...previous,
      events: previous.events.map((event) =>
        event.id === id ? { ...event, done: !event.done } : event,
      ),
    }));
  }

  function handleDeleteEvent(id: string) {
    setState((previous) => ({
      ...previous,
      events: previous.events.filter((event) => event.id !== id),
    }));
  }

  function handlePeriodDateChange(
    periodId: TeacherCalendarPeriodId,
    field: "startDate" | "endDate",
    value: string,
  ) {
    setState((previous) => ({
      ...previous,
      periods: previous.periods.map((period) =>
        period.id === periodId ? { ...period, [field]: value } : period,
      ),
    }));
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="mt-10">
      <section
        aria-label="Périodes P1 à P5"
        className="rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">
          Périodes scolaires
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-5">
          {state.periods.map((period) => (
            <div key={period.id}>
              <p className="text-sm font-bold text-foreground">
                {period.label}
              </p>
              <label
                htmlFor={`${period.id}-debut`}
                className="mt-2 block text-xs font-bold uppercase tracking-wide text-muted"
              >
                Début
              </label>
              <input
                id={`${period.id}-debut`}
                type="date"
                value={period.startDate}
                onChange={(event) =>
                  handlePeriodDateChange(
                    period.id,
                    "startDate",
                    event.target.value,
                  )
                }
                className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
              />
              <label
                htmlFor={`${period.id}-fin`}
                className="mt-2 block text-xs font-bold uppercase tracking-wide text-muted"
              >
                Fin
              </label>
              <input
                id={`${period.id}-fin`}
                type="date"
                value={period.endDate}
                onChange={(event) =>
                  handlePeriodDateChange(
                    period.id,
                    "endDate",
                    event.target.value,
                  )
                }
                className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
              />
            </div>
          ))}
        </div>
      </section>

      <section
        aria-label="Créer un événement"
        className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">
          Ajouter un événement
        </h2>
        <form
          onSubmit={handleCreateEvent}
          className="mt-4 grid gap-4 sm:grid-cols-2"
        >
          <div>
            <label
              htmlFor="event-date"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Date
            </label>
            <input
              id="event-date"
              type="date"
              required
              value={formDate}
              onChange={(event) => setFormDate(event.target.value)}
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="event-category"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Catégorie
            </label>
            <select
              id="event-category"
              value={formCategory}
              onChange={(event) =>
                setFormCategory(
                  event.target.value as TeacherCalendarEventCategoryId,
                )
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
            >
              {teacherCalendarEventCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="event-title"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Titre
            </label>
            <input
              id="event-title"
              type="text"
              required
              value={formTitle}
              onChange={(event) => setFormTitle(event.target.value)}
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="event-note"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Note (facultatif)
            </label>
            <textarea
              id="event-note"
              value={formNote}
              onChange={(event) => setFormNote(event.target.value)}
              rows={2}
              className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-jade/50 bg-jade/10 px-4 text-sm font-black text-jade transition hover:border-jade/70"
            >
              Ajouter l’événement
            </button>
          </div>
        </form>
      </section>

      <section
        aria-label="Calendrier mensuel"
        className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6 print:border-none print:bg-transparent"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePreviousMonth}
              aria-label="Mois précédent"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-white/15 text-foreground transition hover:border-jade/50 hover:text-jade print:hidden"
            >
              ←
            </button>
            <h2 className="text-xl font-black text-foreground">
              {monthLabel}
            </h2>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Mois suivant"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-white/15 text-foreground transition hover:border-jade/50 hover:text-jade print:hidden"
            >
              →
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 print:hidden">
            <label htmlFor="category-filter" className="sr-only">
              Filtrer par catégorie
            </label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(
                  event.target.value as
                    | TeacherCalendarEventCategoryId
                    | typeof ALL_CATEGORIES_FILTER,
                )
              }
              className="min-h-11 rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
            >
              <option value={ALL_CATEGORIES_FILTER}>Toutes catégories</option>
              {teacherCalendarEventCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
            >
              Imprimer
            </button>
          </div>
        </div>

        <div className="mt-5">
          {eventsForMonth.length > 0 ? (
            <ul className="grid gap-3" role="list">
              {eventsForMonth.map((event) => {
                const category = teacherCalendarEventCategories.find(
                  (item) => item.id === event.category,
                );
                return (
                  <li
                    key={event.id}
                    className={[
                      "rounded-md border p-4",
                      event.done
                        ? "border-jade/30 bg-jade/[0.06]"
                        : "border-white/10 bg-background/45",
                    ].join(" ")}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-black text-foreground">
                          {new Date(event.date).toLocaleDateString("fr-FR", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                          })}
                        </p>
                        <p className="mt-1 text-base font-bold text-foreground">
                          {event.title}
                        </p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-wide text-sky">
                          {category?.label}
                        </p>
                        {event.note ? (
                          <p className="mt-2 text-sm leading-6 text-muted">
                            {event.note}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex shrink-0 items-center gap-2 print:hidden">
                        <button
                          type="button"
                          onClick={() => handleToggleDone(event.id)}
                          className={[
                            "min-h-11 rounded-md border px-3 text-sm font-bold transition",
                            event.done
                              ? "border-jade/50 bg-jade/10 text-jade"
                              : "border-white/15 text-foreground hover:border-jade/40",
                          ].join(" ")}
                        >
                          {event.done ? "Fait" : "À faire"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(event.id)}
                          aria-label="Supprimer l’événement"
                          className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm leading-7 text-muted">
              Aucun événement pour ce mois.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
