"use client";

import { useMemo, useState } from "react";
import {
  teacherWorkshopLevels,
  teacherWorkshopStatuses,
  teacherWorkshopSubjects,
  type TeacherWorkshop,
  type TeacherWorkshopDraft,
  type TeacherWorkshopLevel,
  type TeacherWorkshopStatus,
  type TeacherWorkshopSubject,
  type TeacherWorkshopTask,
} from "@/content/teacher-workshops-planner";

const STORAGE_KEY = "academie-kerboeuf-ateliers-v1";

const STATUS_BADGE_CLASSES: Record<TeacherWorkshopStatus, string> = {
  "a-preparer": "border-gold/30 bg-gold/[0.08] text-gold",
  pret: "border-jade/30 bg-jade/[0.08] text-jade",
  realise: "border-sky/30 bg-sky/[0.08] text-sky",
  "a-reprendre": "border-ember/30 bg-ember/[0.08] text-ember",
};

function statusLabel(status: TeacherWorkshopStatus): string {
  return teacherWorkshopStatuses.find((entry) => entry.id === status)?.label ?? status;
}

function subjectLabel(subject: TeacherWorkshopSubject): string {
  return teacherWorkshopSubjects.find((entry) => entry.id === subject)?.label ?? subject;
}

function levelLabel(level: TeacherWorkshopLevel | null): string {
  if (!level) {
    return "Tous niveaux";
  }
  return teacherWorkshopLevels.find((entry) => entry.id === level)?.label ?? level;
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readStoredWorkshops(): TeacherWorkshop[] {
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
    return parsed as TeacherWorkshop[];
  } catch {
    return [];
  }
}

function writeStoredWorkshops(workshops: TeacherWorkshop[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(workshops));
}

const EMPTY_DRAFT: TeacherWorkshopDraft = {
  title: "",
  level: null,
  subject: "francais",
  domain: "",
  objective: "",
  materials: "",
  durationLabel: "",
  week: "",
  status: "a-preparer",
  groupCount: 1,
  instructions: "",
  tasks: [],
};

function draftFromWorkshop(workshop: TeacherWorkshop): TeacherWorkshopDraft {
  return {
    title: workshop.title,
    level: workshop.level,
    subject: workshop.subject,
    domain: workshop.domain,
    objective: workshop.objective,
    materials: workshop.materials,
    durationLabel: workshop.durationLabel,
    week: workshop.week,
    status: workshop.status,
    groupCount: workshop.groupCount,
    instructions: workshop.instructions,
    tasks: workshop.tasks.map((task) => ({ label: task.label, done: task.done })),
  };
}

type FormState = TeacherWorkshopDraft & { newTaskLabel: string };

function formStateFromDraft(draft: TeacherWorkshopDraft): FormState {
  return { ...draft, newTaskLabel: "" };
}

export function TeacherWorkshopsPlannerClient() {
  const [workshops, setWorkshops] = useState<TeacherWorkshop[]>(() => readStoredWorkshops());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() => formStateFromDraft(EMPTY_DRAFT));
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<TeacherWorkshopSubject | "tous">("tous");
  const [statusFilter, setStatusFilter] = useState<TeacherWorkshopStatus | "tous">("tous");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filteredWorkshops = useMemo(() => {
    const query = search.trim().toLowerCase();
    return workshops.filter((workshop) => {
      if (subjectFilter !== "tous" && workshop.subject !== subjectFilter) {
        return false;
      }
      if (statusFilter !== "tous" && workshop.status !== statusFilter) {
        return false;
      }
      if (!query) {
        return true;
      }
      const haystack = [workshop.title, workshop.objective, workshop.domain]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [workshops, subjectFilter, statusFilter, search]);

  function persist(next: TeacherWorkshop[]) {
    setWorkshops(next);
    writeStoredWorkshops(next);
  }

  function openCreateForm() {
    setEditingId(null);
    setForm(formStateFromDraft(EMPTY_DRAFT));
    setIsFormOpen(true);
  }

  function openEditForm(workshop: TeacherWorkshop) {
    setEditingId(workshop.id);
    setForm(formStateFromDraft(draftFromWorkshop(workshop)));
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingId(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title.trim()) {
      return;
    }

    const now = new Date().toISOString();
    const tasks: TeacherWorkshopTask[] = form.tasks.map((task) => ({
      id: createId(),
      label: task.label,
      done: task.done,
    }));

    if (editingId) {
      persist(
        workshops.map((workshop) =>
          workshop.id === editingId
            ? {
                ...workshop,
                title: form.title.trim(),
                level: form.level,
                subject: form.subject,
                domain: form.domain.trim(),
                objective: form.objective.trim(),
                materials: form.materials.trim(),
                durationLabel: form.durationLabel.trim(),
                week: form.week.trim(),
                status: form.status,
                groupCount: form.groupCount,
                instructions: form.instructions.trim(),
                tasks,
                updatedAt: now,
              }
            : workshop,
        ),
      );
    } else {
      const newWorkshop: TeacherWorkshop = {
        id: createId(),
        title: form.title.trim(),
        level: form.level,
        subject: form.subject,
        domain: form.domain.trim(),
        objective: form.objective.trim(),
        materials: form.materials.trim(),
        durationLabel: form.durationLabel.trim(),
        week: form.week.trim(),
        status: form.status,
        groupCount: form.groupCount,
        instructions: form.instructions.trim(),
        tasks,
        createdAt: now,
        updatedAt: now,
      };
      persist([newWorkshop, ...workshops]);
    }

    closeForm();
  }

  function duplicateWorkshop(workshop: TeacherWorkshop) {
    const now = new Date().toISOString();
    const copy: TeacherWorkshop = {
      ...workshop,
      id: createId(),
      title: `${workshop.title} (copie)`,
      tasks: workshop.tasks.map((task) => ({ ...task, id: createId() })),
      createdAt: now,
      updatedAt: now,
    };
    persist([copy, ...workshops]);
  }

  function requestDelete(id: string) {
    setConfirmDeleteId(id);
  }

  function cancelDelete() {
    setConfirmDeleteId(null);
  }

  function confirmDelete() {
    if (!confirmDeleteId) {
      return;
    }
    persist(workshops.filter((workshop) => workshop.id !== confirmDeleteId));
    setConfirmDeleteId(null);
  }

  function addTaskToForm() {
    const label = form.newTaskLabel.trim();
    if (!label) {
      return;
    }
    setForm((current) => ({
      ...current,
      tasks: [...current.tasks, { label, done: false }],
      newTaskLabel: "",
    }));
  }

  function removeTaskFromForm(index: number) {
    setForm((current) => ({
      ...current,
      tasks: current.tasks.filter((_, taskIndex) => taskIndex !== index),
    }));
  }

  function toggleFormTaskDone(index: number) {
    setForm((current) => ({
      ...current,
      tasks: current.tasks.map((task, taskIndex) =>
        taskIndex === index ? { ...task, done: !task.done } : task,
      ),
    }));
  }

  function printWorkshops() {
    if (typeof window !== "undefined") {
      window.print();
    }
  }

  return (
    <div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <h2 className="text-xl font-black text-foreground">Mes ateliers</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={printWorkshops}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-sky/40 hover:text-sky"
          >
            Imprimer
          </button>
          <button
            type="button"
            onClick={openCreateForm}
            className="min-h-11 rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-bold text-jade transition hover:border-jade/60"
          >
            Créer un atelier
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 print:hidden" role="group" aria-label="Recherche et filtres">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Rechercher un atelier…"
          aria-label="Rechercher un atelier"
          className="min-h-11 w-full max-w-xs rounded-md border border-white/15 bg-white/[0.03] px-3 text-sm text-foreground placeholder:text-muted"
        />

        <select
          value={subjectFilter}
          onChange={(event) =>
            setSubjectFilter(event.target.value as TeacherWorkshopSubject | "tous")
          }
          aria-label="Filtrer par matière"
          className="min-h-11 rounded-md border border-white/15 bg-white/[0.03] px-3 text-sm text-foreground"
        >
          <option value="tous">Toutes les matières</option>
          {teacherWorkshopSubjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.label}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as TeacherWorkshopStatus | "tous")
          }
          aria-label="Filtrer par statut"
          className="min-h-11 rounded-md border border-white/15 bg-white/[0.03] px-3 text-sm text-foreground"
        >
          <option value="tous">Tous les statuts</option>
          {teacherWorkshopStatuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {isFormOpen ? (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-5 print:hidden"
        >
          <h3 className="text-lg font-black text-foreground">
            {editingId ? "Modifier l'atelier" : "Nouvel atelier"}
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
              Titre
              <input
                type="text"
                required
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                className="min-h-11 rounded-md border border-white/15 bg-white/[0.03] px-3 text-sm text-foreground"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
              Niveau (facultatif)
              <select
                value={form.level ?? ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    level: event.target.value
                      ? (event.target.value as TeacherWorkshopLevel)
                      : null,
                  }))
                }
                className="min-h-11 rounded-md border border-white/15 bg-white/[0.03] px-3 text-sm text-foreground"
              >
                <option value="">Tous niveaux</option>
                {teacherWorkshopLevels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
              Matière
              <select
                required
                value={form.subject}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    subject: event.target.value as TeacherWorkshopSubject,
                  }))
                }
                className="min-h-11 rounded-md border border-white/15 bg-white/[0.03] px-3 text-sm text-foreground"
              >
                {teacherWorkshopSubjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
              Domaine (facultatif)
              <input
                type="text"
                value={form.domain}
                onChange={(event) => setForm((current) => ({ ...current, domain: event.target.value }))}
                className="min-h-11 rounded-md border border-white/15 bg-white/[0.03] px-3 text-sm text-foreground"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-foreground sm:col-span-2">
              Objectif court
              <input
                type="text"
                value={form.objective}
                onChange={(event) => setForm((current) => ({ ...current, objective: event.target.value }))}
                className="min-h-11 rounded-md border border-white/15 bg-white/[0.03] px-3 text-sm text-foreground"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-foreground sm:col-span-2">
              Matériel
              <textarea
                value={form.materials}
                onChange={(event) => setForm((current) => ({ ...current, materials: event.target.value }))}
                rows={2}
                className="rounded-md border border-white/15 bg-white/[0.03] px-3 py-2 text-sm text-foreground"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
              Durée
              <input
                type="text"
                value={form.durationLabel}
                onChange={(event) =>
                  setForm((current) => ({ ...current, durationLabel: event.target.value }))
                }
                placeholder="ex. 30 min"
                className="min-h-11 rounded-md border border-white/15 bg-white/[0.03] px-3 text-sm text-foreground"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
              Semaine (facultatif)
              <input
                type="text"
                value={form.week}
                onChange={(event) => setForm((current) => ({ ...current, week: event.target.value }))}
                placeholder="ex. Semaine 3"
                className="min-h-11 rounded-md border border-white/15 bg-white/[0.03] px-3 text-sm text-foreground"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
              Statut
              <select
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    status: event.target.value as TeacherWorkshopStatus,
                  }))
                }
                className="min-h-11 rounded-md border border-white/15 bg-white/[0.03] px-3 text-sm text-foreground"
              >
                {teacherWorkshopStatuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
              Nombre de groupes prévu
              <input
                type="number"
                min={1}
                value={form.groupCount}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    groupCount: Number(event.target.value) || 1,
                  }))
                }
                className="min-h-11 rounded-md border border-white/15 bg-white/[0.03] px-3 text-sm text-foreground"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-foreground sm:col-span-2">
              Consigne courte
              <textarea
                value={form.instructions}
                onChange={(event) =>
                  setForm((current) => ({ ...current, instructions: event.target.value }))
                }
                rows={2}
                className="rounded-md border border-white/15 bg-white/[0.03] px-3 py-2 text-sm text-foreground"
              />
            </label>
          </div>

          <div className="mt-5">
            <p className="text-sm font-bold text-foreground">Tâches de préparation</p>
            <ul className="mt-2 flex flex-col gap-2">
              {form.tasks.map((task, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleFormTaskDone(index)}
                  />
                  <span className={task.done ? "line-through text-muted" : ""}>{task.label}</span>
                  <button
                    type="button"
                    onClick={() => removeTaskFromForm(index)}
                    aria-label={`Supprimer la tâche ${task.label}`}
                    className="ml-auto text-xs font-bold text-rose hover:underline"
                  >
                    Retirer
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={form.newTaskLabel}
                onChange={(event) =>
                  setForm((current) => ({ ...current, newTaskLabel: event.target.value }))
                }
                placeholder="Nouvelle tâche de préparation"
                className="min-h-11 flex-1 rounded-md border border-white/15 bg-white/[0.03] px-3 text-sm text-foreground"
              />
              <button
                type="button"
                onClick={addTaskToForm}
                className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground hover:border-jade/40"
              >
                Ajouter
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="min-h-11 rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-bold text-jade hover:border-jade/60"
            >
              {editingId ? "Enregistrer" : "Créer l'atelier"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground hover:border-rose/40"
            >
              Annuler
            </button>
          </div>
        </form>
      ) : null}

      {filteredWorkshops.length === 0 ? (
        <p className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
          Aucun atelier ne correspond à cette recherche ou à ces filtres.
        </p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {filteredWorkshops.map((workshop) => (
            <li
              key={workshop.id}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-5 print:break-inside-avoid"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-base font-black text-foreground">{workshop.title}</p>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${STATUS_BADGE_CLASSES[workshop.status]}`}
                >
                  {statusLabel(workshop.status)}
                </span>
              </div>

              <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-sky">
                {subjectLabel(workshop.subject)} · {levelLabel(workshop.level)}
              </p>

              {workshop.domain ? (
                <p className="mt-1 text-xs text-muted">Domaine : {workshop.domain}</p>
              ) : null}

              {workshop.objective ? (
                <p className="mt-2 text-sm leading-6 text-foreground">{workshop.objective}</p>
              ) : null}

              <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted">
                <div>
                  <dt className="font-bold text-foreground">Durée</dt>
                  <dd>{workshop.durationLabel || "—"}</dd>
                </div>
                <div>
                  <dt className="font-bold text-foreground">Groupes prévus</dt>
                  <dd>{workshop.groupCount}</dd>
                </div>
                {workshop.week ? (
                  <div>
                    <dt className="font-bold text-foreground">Semaine</dt>
                    <dd>{workshop.week}</dd>
                  </div>
                ) : null}
              </dl>

              {workshop.materials ? (
                <p className="mt-3 text-xs leading-5 text-muted">
                  <span className="font-bold text-foreground">Matériel : </span>
                  {workshop.materials}
                </p>
              ) : null}

              {workshop.instructions ? (
                <p className="mt-2 text-xs leading-5 text-muted">
                  <span className="font-bold text-foreground">Consigne : </span>
                  {workshop.instructions}
                </p>
              ) : null}

              {workshop.tasks.length > 0 ? (
                <div className="mt-3">
                  <p className="text-xs font-bold text-foreground">Tâches de préparation</p>
                  <ul className="mt-1 flex flex-col gap-1">
                    {workshop.tasks.map((task) => (
                      <li key={task.id} className="text-xs text-muted">
                        {task.done ? "☑" : "☐"} {task.label}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2 print:hidden">
                <button
                  type="button"
                  onClick={() => openEditForm(workshop)}
                  className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-foreground hover:border-sky/40"
                >
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={() => duplicateWorkshop(workshop)}
                  className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-foreground hover:border-jade/40"
                >
                  Dupliquer
                </button>
                <button
                  type="button"
                  onClick={() => requestDelete(workshop.id)}
                  className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-rose hover:border-rose/40"
                >
                  Supprimer
                </button>
              </div>

              {confirmDeleteId === workshop.id ? (
                <div className="mt-3 rounded-md border border-rose/30 bg-rose/[0.06] p-3 text-xs text-foreground print:hidden">
                  <p>Confirmer la suppression de cet atelier ?</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={confirmDelete}
                      className="min-h-9 rounded border border-rose/40 bg-rose/10 px-3 text-xs font-bold text-rose"
                    >
                      Supprimer définitivement
                    </button>
                    <button
                      type="button"
                      onClick={cancelDelete}
                      className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-foreground"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
