"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createEmptyTeacherMeeting,
  getTeacherMeetingPriorityLabel,
  getTeacherMeetingStatusLabel,
  getTeacherMeetingTypeLabel,
  TEACHER_MEETINGS_STORAGE_KEY,
  teacherMeetingPriorities,
  teacherMeetingStatuses,
  teacherMeetingTypes,
  type TeacherMeeting,
  type TeacherMeetingPriority,
  type TeacherMeetingStatus,
  type TeacherMeetingType,
} from "@/content/teacher-professional-meetings";

function readStoredMeetings(): TeacherMeeting[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(TEACHER_MEETINGS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed as TeacherMeeting[];
  } catch {
    return [];
  }
}

const ALL_TYPES = "tous-types";
const ALL_STATUSES = "tous-statuts";

export function TeacherProfessionalMeetingsClient() {
  const [meetings, setMeetings] = useState<TeacherMeeting[]>(() =>
    readStoredMeetings(),
  );
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TeacherMeetingType | typeof ALL_TYPES>(
    ALL_TYPES,
  );
  const [statusFilter, setStatusFilter] = useState<
    TeacherMeetingStatus | typeof ALL_STATUSES
  >(ALL_STATUSES);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_MEETINGS_STORAGE_KEY,
      JSON.stringify(meetings),
    );
  }, [meetings]);

  const filteredMeetings = useMemo(() => {
    const query = search.trim().toLowerCase();
    return meetings
      .filter((meeting) => typeFilter === ALL_TYPES || meeting.type === typeFilter)
      .filter(
        (meeting) =>
          statusFilter === ALL_STATUSES || meeting.status === statusFilter,
      )
      .filter((meeting) => {
        if (!query) {
          return true;
        }
        return [
          meeting.title,
          meeting.objective,
          meeting.location,
          meeting.notes,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }, [meetings, search, typeFilter, statusFilter]);

  function handleCreate() {
    setMeetings((current) => [createEmptyTeacherMeeting(), ...current]);
  }

  function handleUpdate(id: string, patch: Partial<TeacherMeeting>) {
    setMeetings((current) =>
      current.map((meeting) =>
        meeting.id === id ? { ...meeting, ...patch } : meeting,
      ),
    );
  }

  function handleDelete(id: string) {
    setMeetings((current) => current.filter((meeting) => meeting.id !== id));
    setPendingDeleteId(null);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div>
      <section
        aria-label="Actions"
        className="flex flex-wrap items-center justify-between gap-3 print:hidden"
      >
        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-jade/50 bg-jade/10 px-4 text-sm font-black text-jade transition hover:border-jade/70"
        >
          + Créer un rendez-vous
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-sky/40 hover:text-sky"
        >
          Imprimer
        </button>
      </section>

      <section
        aria-label="Recherche et filtres"
        className="mt-6 grid gap-3 sm:grid-cols-3 print:hidden"
      >
        <div>
          <label
            htmlFor="rdv-recherche"
            className="block text-xs font-bold uppercase tracking-wide text-muted"
          >
            Recherche
          </label>
          <input
            id="rdv-recherche"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Titre, objectif, lieu, notes…"
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
        </div>

        <div>
          <label
            htmlFor="rdv-filtre-type"
            className="block text-xs font-bold uppercase tracking-wide text-muted"
          >
            Type
          </label>
          <select
            id="rdv-filtre-type"
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value as TeacherMeetingType | typeof ALL_TYPES)
            }
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          >
            <option value={ALL_TYPES}>Tous les types</option>
            {teacherMeetingTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="rdv-filtre-statut"
            className="block text-xs font-bold uppercase tracking-wide text-muted"
          >
            Statut
          </label>
          <select
            id="rdv-filtre-statut"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as TeacherMeetingStatus | typeof ALL_STATUSES,
              )
            }
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          >
            <option value={ALL_STATUSES}>Tous les statuts</option>
            {teacherMeetingStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section aria-label="Liste des rendez-vous" className="mt-8">
        {filteredMeetings.length === 0 ? (
          <p className="rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
            Aucun rendez-vous ne correspond à la recherche ou aux filtres.
          </p>
        ) : (
          <ul className="grid gap-5" role="list">
            {filteredMeetings.map((meeting) => (
              <li
                key={meeting.id}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-5 sm:p-6 print:break-inside-avoid"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`titre-${meeting.id}`}
                      className="block text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Titre
                    </label>
                    <input
                      id={`titre-${meeting.id}`}
                      type="text"
                      value={meeting.title}
                      onChange={(event) =>
                        handleUpdate(meeting.id, { title: event.target.value })
                      }
                      placeholder="Ex. Point d'étape avec la direction"
                      className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm font-bold text-foreground"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`type-${meeting.id}`}
                      className="block text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Type
                    </label>
                    <select
                      id={`type-${meeting.id}`}
                      value={meeting.type}
                      onChange={(event) =>
                        handleUpdate(meeting.id, {
                          type: event.target.value as TeacherMeetingType,
                        })
                      }
                      className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
                    >
                      {teacherMeetingTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor={`date-${meeting.id}`}
                      className="block text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Date (facultative)
                    </label>
                    <input
                      id={`date-${meeting.id}`}
                      type="date"
                      value={meeting.date}
                      onChange={(event) =>
                        handleUpdate(meeting.id, { date: event.target.value })
                      }
                      className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`lieu-${meeting.id}`}
                      className="block text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Lieu ou modalité (facultatif)
                    </label>
                    <input
                      id={`lieu-${meeting.id}`}
                      type="text"
                      value={meeting.location}
                      onChange={(event) =>
                        handleUpdate(meeting.id, { location: event.target.value })
                      }
                      placeholder="Ex. Bureau de direction, visioconférence…"
                      className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`statut-${meeting.id}`}
                      className="block text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Statut
                    </label>
                    <select
                      id={`statut-${meeting.id}`}
                      value={meeting.status}
                      onChange={(event) =>
                        handleUpdate(meeting.id, {
                          status: event.target.value as TeacherMeetingStatus,
                        })
                      }
                      className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
                    >
                      {teacherMeetingStatuses.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor={`priorite-${meeting.id}`}
                      className="block text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Priorité
                    </label>
                    <select
                      id={`priorite-${meeting.id}`}
                      value={meeting.priority}
                      onChange={(event) =>
                        handleUpdate(meeting.id, {
                          priority: event.target.value as TeacherMeetingPriority,
                        })
                      }
                      className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
                    >
                      {teacherMeetingPriorities.map((priority) => (
                        <option key={priority.id} value={priority.id}>
                          {priority.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 grid gap-4">
                  <div>
                    <label
                      htmlFor={`objectif-${meeting.id}`}
                      className="block text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Objectif
                    </label>
                    <textarea
                      id={`objectif-${meeting.id}`}
                      value={meeting.objective}
                      onChange={(event) =>
                        handleUpdate(meeting.id, { objective: event.target.value })
                      }
                      rows={2}
                      className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm leading-6 text-foreground"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`ordre-du-jour-${meeting.id}`}
                      className="block text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Ordre du jour
                    </label>
                    <textarea
                      id={`ordre-du-jour-${meeting.id}`}
                      value={meeting.agenda}
                      onChange={(event) =>
                        handleUpdate(meeting.id, { agenda: event.target.value })
                      }
                      rows={3}
                      className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm leading-6 text-foreground"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`notes-${meeting.id}`}
                      className="block text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Notes
                    </label>
                    <textarea
                      id={`notes-${meeting.id}`}
                      value={meeting.notes}
                      onChange={(event) =>
                        handleUpdate(meeting.id, { notes: event.target.value })
                      }
                      rows={3}
                      className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm leading-6 text-foreground"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`decisions-${meeting.id}`}
                      className="block text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Décisions
                    </label>
                    <textarea
                      id={`decisions-${meeting.id}`}
                      value={meeting.decisions}
                      onChange={(event) =>
                        handleUpdate(meeting.id, { decisions: event.target.value })
                      }
                      rows={2}
                      className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm leading-6 text-foreground"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`suivi-${meeting.id}`}
                      className="block text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Actions de suivi
                    </label>
                    <textarea
                      id={`suivi-${meeting.id}`}
                      value={meeting.followUpActions}
                      onChange={(event) =>
                        handleUpdate(meeting.id, {
                          followUpActions: event.target.value,
                        })
                      }
                      rows={2}
                      className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm leading-6 text-foreground"
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted">
                    {getTeacherMeetingTypeLabel(meeting.type)} ·{" "}
                    {getTeacherMeetingStatusLabel(meeting.status)} · Priorité{" "}
                    {getTeacherMeetingPriorityLabel(meeting.priority).toLowerCase()}
                  </p>

                  {pendingDeleteId === meeting.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-rose">
                        Confirmer la suppression ?
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDelete(meeting.id)}
                        className="min-h-9 rounded-md border border-rose/50 bg-rose/10 px-3 text-xs font-bold text-rose transition hover:border-rose/70"
                      >
                        Supprimer
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDeleteId(null)}
                        className="min-h-9 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-white/30"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPendingDeleteId(meeting.id)}
                      className="min-h-9 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-rose/40 hover:text-rose"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
