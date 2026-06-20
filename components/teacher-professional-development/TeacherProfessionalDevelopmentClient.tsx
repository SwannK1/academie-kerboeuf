"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createEmptyProfessionalDevelopmentEntry,
  professionalDevelopmentStatuses,
  professionalDevelopmentTypes,
  TEACHER_PROFESSIONAL_DEVELOPMENT_STORAGE_KEY,
  type ProfessionalDevelopmentEntry,
  type ProfessionalDevelopmentStatusId,
  type ProfessionalDevelopmentTypeId,
} from "@/content/teacher-professional-development";

function readStoredEntries(): ProfessionalDevelopmentEntry[] | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(
      TEACHER_PROFESSIONAL_DEVELOPMENT_STORAGE_KEY,
    );
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return null;
    }
    return parsed as ProfessionalDevelopmentEntry[];
  } catch {
    return null;
  }
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `entry-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

type TypeFilter = "tous" | ProfessionalDevelopmentTypeId;
type StatusFilter = "tous" | ProfessionalDevelopmentStatusId;

export function TeacherProfessionalDevelopmentClient() {
  const [entries, setEntries] = useState<ProfessionalDevelopmentEntry[]>(
    () => readStoredEntries() ?? [],
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("tous");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("tous");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_PROFESSIONAL_DEVELOPMENT_STORAGE_KEY,
      JSON.stringify(entries),
    );
  }, [entries]);

  const filteredEntries = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return entries
      .filter((entry) => (typeFilter === "tous" ? true : entry.typeId === typeFilter))
      .filter((entry) =>
        statusFilter === "tous" ? true : entry.statusId === statusFilter,
      )
      .filter((entry) => (favoritesOnly ? entry.isFavorite : true))
      .filter((entry) => {
        if (!term) {
          return true;
        }
        return (
          entry.title.toLowerCase().includes(term) ||
          entry.organizationOrAuthor.toLowerCase().includes(term) ||
          entry.goal.toLowerCase().includes(term) ||
          entry.notes.toLowerCase().includes(term)
        );
      })
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
  }, [entries, searchTerm, typeFilter, statusFilter, favoritesOnly]);

  function handleCreateEntry() {
    const entry = createEmptyProfessionalDevelopmentEntry(createId());
    setEntries((previous) => [entry, ...previous]);
    setEditingId(entry.id);
  }

  function handleDuplicateEntry(entryId: string) {
    const source = entries.find((entry) => entry.id === entryId);
    if (!source) {
      return;
    }
    const now = new Date().toISOString();
    const duplicate: ProfessionalDevelopmentEntry = {
      ...source,
      id: createId(),
      title: `${source.title} (copie)`,
      isFavorite: false,
      createdAt: now,
      updatedAt: now,
    };
    setEntries((previous) => [duplicate, ...previous]);
  }

  function handleToggleFavorite(entryId: string) {
    setEntries((previous) =>
      previous.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              isFavorite: !entry.isFavorite,
              updatedAt: new Date().toISOString(),
            }
          : entry,
      ),
    );
  }

  function handleUpdateEntry(
    entryId: string,
    patch: Partial<ProfessionalDevelopmentEntry>,
  ) {
    setEntries((previous) =>
      previous.map((entry) =>
        entry.id === entryId
          ? { ...entry, ...patch, updatedAt: new Date().toISOString() }
          : entry,
      ),
    );
  }

  function handleConfirmDelete(entryId: string) {
    setEntries((previous) => previous.filter((entry) => entry.id !== entryId));
    setPendingDeleteId(null);
    if (editingId === entryId) {
      setEditingId(null);
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="mt-10">
      <section
        aria-label="Actions"
        className="flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleCreateEntry}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-jade/50 bg-jade/10 px-4 text-sm font-black text-jade transition hover:border-jade/70"
          >
            Créer une entrée
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade print:hidden"
          >
            Imprimer
          </button>
        </div>
      </section>

      <section
        aria-label="Recherche et filtres"
        className="mt-6 grid gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4 print:hidden"
      >
        <div className="lg:col-span-2">
          <label
            htmlFor="formations-search"
            className="block text-xs font-bold uppercase tracking-wide text-muted"
          >
            Rechercher
          </label>
          <input
            id="formations-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Titre, organisme, objectif, notes…"
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
        </div>

        <div>
          <label
            htmlFor="formations-filter-type"
            className="block text-xs font-bold uppercase tracking-wide text-muted"
          >
            Type
          </label>
          <select
            id="formations-filter-type"
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value as TypeFilter)
            }
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          >
            <option value="tous">Tous les types</option>
            {professionalDevelopmentTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="formations-filter-statut"
            className="block text-xs font-bold uppercase tracking-wide text-muted"
          >
            Statut
          </label>
          <select
            id="formations-filter-statut"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as StatusFilter)
            }
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          >
            <option value="tous">Tous les statuts</option>
            {professionalDevelopmentStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end lg:col-span-4">
          <label className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-foreground">
            <input
              type="checkbox"
              checked={favoritesOnly}
              onChange={(event) => setFavoritesOnly(event.target.checked)}
              className="h-4 w-4"
            />
            Favoris uniquement
          </label>
        </div>
      </section>

      <section aria-label="Liste des entrées" className="mt-8">
        {filteredEntries.length === 0 ? (
          <p className="text-sm leading-7 text-muted">
            {entries.length === 0
              ? "Aucune entrée pour le moment. Créez votre première entrée."
              : "Aucune entrée ne correspond à la recherche ou aux filtres."}
          </p>
        ) : (
          <ul className="grid gap-4" role="list">
            {filteredEntries.map((entry) => (
              <li
                key={entry.id}
                className="rounded-lg border border-white/10 bg-background/45 p-5"
              >
                {editingId === entry.id ? (
                  <EntryEditor
                    entry={entry}
                    onChange={(patch) => handleUpdateEntry(entry.id, patch)}
                    onClose={() => setEditingId(null)}
                  />
                ) : (
                  <EntryCard
                    entry={entry}
                    onEdit={() => setEditingId(entry.id)}
                    onDuplicate={() => handleDuplicateEntry(entry.id)}
                    onToggleFavorite={() => handleToggleFavorite(entry.id)}
                    onRequestDelete={() => setPendingDeleteId(entry.id)}
                  />
                )}

                {pendingDeleteId === entry.id ? (
                  <div
                    role="alertdialog"
                    aria-label="Confirmer la suppression"
                    className="mt-4 rounded-md border border-ember/30 bg-ember/[0.08] p-4"
                  >
                    <p className="text-sm font-bold text-foreground">
                      Supprimer définitivement « {entry.title || "Sans titre"} » ?
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleConfirmDelete(entry.id)}
                        className="inline-flex min-h-11 items-center justify-center rounded-md border border-ember/50 bg-ember/10 px-4 text-sm font-black text-ember"
                      >
                        Confirmer la suppression
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDeleteId(null)}
                        className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground"
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
      </section>
    </div>
  );
}

type EntryCardProps = {
  entry: ProfessionalDevelopmentEntry;
  onEdit: () => void;
  onDuplicate: () => void;
  onToggleFavorite: () => void;
  onRequestDelete: () => void;
};

function EntryCard({
  entry,
  onEdit,
  onDuplicate,
  onToggleFavorite,
  onRequestDelete,
}: EntryCardProps) {
  const typeLabel =
    professionalDevelopmentTypes.find((type) => type.id === entry.typeId)
      ?.label ?? entry.typeId;
  const statusLabel =
    professionalDevelopmentStatuses.find(
      (status) => status.id === entry.statusId,
    )?.label ?? entry.statusId;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted">
            {typeLabel} · {statusLabel}
          </p>
          <h3 className="mt-1 text-lg font-black text-foreground">
            {entry.title || "Sans titre"}
          </h3>
          {entry.organizationOrAuthor ? (
            <p className="mt-1 text-sm text-muted">
              {entry.organizationOrAuthor}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onToggleFavorite}
          aria-pressed={entry.isFavorite}
          aria-label={
            entry.isFavorite
              ? "Retirer des favoris"
              : "Ajouter aux favoris"
          }
          className={[
            "inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border text-lg",
            entry.isFavorite
              ? "border-gold/50 bg-gold/10 text-gold"
              : "border-white/15 text-muted hover:text-gold",
          ].join(" ")}
        >
          {entry.isFavorite ? "★" : "☆"}
        </button>
      </div>

      <dl className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
        {entry.date ? (
          <div>
            <dt className="font-bold text-foreground">Date</dt>
            <dd>{entry.date}</dd>
          </div>
        ) : null}
        {entry.duration ? (
          <div>
            <dt className="font-bold text-foreground">Durée</dt>
            <dd>{entry.duration}</dd>
          </div>
        ) : null}
      </dl>

      {entry.goal ? (
        <p className="mt-3 text-sm leading-6 text-foreground">
          <span className="font-bold">Objectif :</span> {entry.goal}
        </p>
      ) : null}

      {entry.notes ? (
        <p className="mt-2 text-sm leading-6 text-muted">{entry.notes}</p>
      ) : null}

      {entry.link ? (
        <a
          href={entry.link}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-sm font-bold text-sky underline"
        >
          Ouvrir le lien
        </a>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2 print:hidden">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
        >
          Modifier
        </button>
        <button
          type="button"
          onClick={onDuplicate}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-sky/50 hover:text-sky"
        >
          Dupliquer
        </button>
        <button
          type="button"
          onClick={onRequestDelete}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-ember/50 hover:text-ember"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

type EntryEditorProps = {
  entry: ProfessionalDevelopmentEntry;
  onChange: (patch: Partial<ProfessionalDevelopmentEntry>) => void;
  onClose: () => void;
};

function EntryEditor({ entry, onChange, onClose }: EntryEditorProps) {
  const titleId = `entry-title-${entry.id}`;
  const typeId = `entry-type-${entry.id}`;
  const statusId = `entry-status-${entry.id}`;
  const orgId = `entry-org-${entry.id}`;
  const dateId = `entry-date-${entry.id}`;
  const durationId = `entry-duration-${entry.id}`;
  const goalId = `entry-goal-${entry.id}`;
  const notesId = `entry-notes-${entry.id}`;
  const linkId = `entry-link-${entry.id}`;

  return (
    <div className="grid gap-3">
      <div>
        <label
          htmlFor={titleId}
          className="block text-xs font-bold uppercase tracking-wide text-muted"
        >
          Titre
        </label>
        <input
          id={titleId}
          type="text"
          value={entry.title}
          onChange={(event) => onChange({ title: event.target.value })}
          className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor={typeId}
            className="block text-xs font-bold uppercase tracking-wide text-muted"
          >
            Type
          </label>
          <select
            id={typeId}
            value={entry.typeId}
            onChange={(event) =>
              onChange({
                typeId: event.target.value as ProfessionalDevelopmentTypeId,
              })
            }
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          >
            {professionalDevelopmentTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={statusId}
            className="block text-xs font-bold uppercase tracking-wide text-muted"
          >
            Statut
          </label>
          <select
            id={statusId}
            value={entry.statusId}
            onChange={(event) =>
              onChange({
                statusId: event.target
                  .value as ProfessionalDevelopmentStatusId,
              })
            }
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          >
            {professionalDevelopmentStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor={orgId}
          className="block text-xs font-bold uppercase tracking-wide text-muted"
        >
          Organisme ou auteur (facultatif)
        </label>
        <input
          id={orgId}
          type="text"
          value={entry.organizationOrAuthor}
          onChange={(event) =>
            onChange({ organizationOrAuthor: event.target.value })
          }
          className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor={dateId}
            className="block text-xs font-bold uppercase tracking-wide text-muted"
          >
            Date (facultatif)
          </label>
          <input
            id={dateId}
            type="date"
            value={entry.date}
            onChange={(event) => onChange({ date: event.target.value })}
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
        </div>

        <div>
          <label
            htmlFor={durationId}
            className="block text-xs font-bold uppercase tracking-wide text-muted"
          >
            Durée (facultatif)
          </label>
          <input
            id={durationId}
            type="text"
            placeholder="Ex. 3 h, 2 jours…"
            value={entry.duration}
            onChange={(event) => onChange({ duration: event.target.value })}
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={goalId}
          className="block text-xs font-bold uppercase tracking-wide text-muted"
        >
          Objectif professionnel
        </label>
        <textarea
          id={goalId}
          value={entry.goal}
          onChange={(event) => onChange({ goal: event.target.value })}
          rows={2}
          className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
        />
      </div>

      <div>
        <label
          htmlFor={notesId}
          className="block text-xs font-bold uppercase tracking-wide text-muted"
        >
          Notes
        </label>
        <textarea
          id={notesId}
          value={entry.notes}
          onChange={(event) => onChange({ notes: event.target.value })}
          rows={3}
          className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
        />
      </div>

      <div>
        <label
          htmlFor={linkId}
          className="block text-xs font-bold uppercase tracking-wide text-muted"
        >
          Lien (facultatif)
        </label>
        <input
          id={linkId}
          type="url"
          placeholder="https://…"
          value={entry.link}
          onChange={(event) => onChange({ link: event.target.value })}
          className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
        />
      </div>

      <div className="flex gap-2 print:hidden">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-jade/50 bg-jade/10 px-4 text-sm font-black text-jade"
        >
          Terminer
        </button>
      </div>
    </div>
  );
}
