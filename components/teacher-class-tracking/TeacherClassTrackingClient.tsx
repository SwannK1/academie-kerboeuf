"use client";

import { useEffect, useState } from "react";
import {
  CLASS_TRACKING_STORAGE_KEY,
  classTrackingFields,
  createEmptyClassTrackingEntry,
  getDefaultClassTrackingState,
  type ClassTrackingEntry,
  type ClassTrackingFieldId,
  type ClassTrackingState,
} from "@/content/teacher-class-tracking";

function readStoredState(): ClassTrackingState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(CLASS_TRACKING_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as ClassTrackingState;
    if (!parsed || !Array.isArray(parsed.entries)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function TeacherClassTrackingClient() {
  const [state, setState] = useState<ClassTrackingState>(
    () => readStoredState() ?? getDefaultClassTrackingState(),
  );
  const [weekDraft, setWeekDraft] = useState("");
  const [confirmingEntryId, setConfirmingEntryId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    window.localStorage.setItem(
      CLASS_TRACKING_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  function handleAddEntry() {
    const weekLabel = weekDraft.trim() || "Nouvelle semaine";
    const entry = createEmptyClassTrackingEntry(weekLabel);
    setState((previous) => ({ entries: [entry, ...previous.entries] }));
    setWeekDraft("");
  }

  function handleFieldChange(
    entryId: string,
    fieldId: ClassTrackingFieldId,
    value: string,
  ) {
    setState((previous) => ({
      entries: previous.entries.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              notesByField: { ...entry.notesByField, [fieldId]: value },
            }
          : entry,
      ),
    }));
  }

  function handleRemoveEntry(entryId: string) {
    setState((previous) => ({
      entries: previous.entries.filter((entry) => entry.id !== entryId),
    }));
    setConfirmingEntryId(null);
  }

  return (
    <div className="mt-10">
      <section
        role="note"
        className="rounded-lg border border-ember/40 bg-ember/10 p-5 text-sm font-bold text-ember sm:p-6"
      >
        ⚠️ Cet outil est strictement collectif : aucun prénom, aucune
        observation individuelle, aucune information médicale, familiale,
        disciplinaire ou comportementale ne doit être saisie ici.
      </section>

      <section
        aria-label="Ajouter une semaine"
        className="mt-8 flex flex-wrap items-end gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <div className="flex flex-1 flex-col gap-2">
          <label
            htmlFor="week-label"
            className="text-xs font-bold uppercase tracking-wide text-muted"
          >
            Semaine
          </label>
          <input
            id="week-label"
            type="text"
            value={weekDraft}
            onChange={(event) => setWeekDraft(event.target.value)}
            placeholder="Ex. Semaine du 6 octobre"
            className="min-h-11 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
        </div>
        <button
          type="button"
          onClick={handleAddEntry}
          className="min-h-11 rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade hover:text-ink"
        >
          Ajouter une semaine
        </button>
      </section>

      <div className="mt-8 grid gap-6">
        {state.entries.map((entry) => (
          <ClassTrackingEntryCard
            key={entry.id}
            entry={entry}
            isConfirmingDelete={confirmingEntryId === entry.id}
            onFieldChange={(fieldId, value) =>
              handleFieldChange(entry.id, fieldId, value)
            }
            onRequestDelete={() => setConfirmingEntryId(entry.id)}
            onCancelDelete={() => setConfirmingEntryId(null)}
            onConfirmDelete={() => handleRemoveEntry(entry.id)}
          />
        ))}

        {state.entries.length === 0 ? (
          <p className="rounded-md border border-dashed border-white/15 px-4 py-6 text-center text-sm text-muted">
            Aucun constat de classe pour le moment.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function ClassTrackingEntryCard({
  entry,
  isConfirmingDelete,
  onFieldChange,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
}: {
  entry: ClassTrackingEntry;
  isConfirmingDelete: boolean;
  onFieldChange: (fieldId: ClassTrackingFieldId, value: string) => void;
  onRequestDelete: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}) {
  return (
    <section
      aria-label={entry.weekLabel}
      className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-xl font-black text-foreground">
          {entry.weekLabel}
        </h2>

        {isConfirmingDelete ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted">Supprimer ?</span>
            <button
              type="button"
              onClick={onConfirmDelete}
              className="min-h-8 rounded-md border border-ember/40 px-2 text-xs font-black text-ember hover:bg-ember/10"
            >
              Confirmer
            </button>
            <button
              type="button"
              onClick={onCancelDelete}
              className="min-h-8 rounded-md border border-white/15 px-2 text-xs font-black text-foreground hover:border-white/30"
            >
              Annuler
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onRequestDelete}
            aria-label={`Supprimer le constat : ${entry.weekLabel}`}
            className="shrink-0 rounded-md border border-white/10 px-2 py-1 text-xs font-bold text-muted transition hover:border-ember/40 hover:text-ember"
          >
            Supprimer
          </button>
        )}
      </div>

      <div className="mt-5 grid gap-5">
        {classTrackingFields.map((field) => (
          <div key={field.id} className="flex flex-col gap-2">
            <label
              htmlFor={`${entry.id}-${field.id}`}
              className="text-sm font-black text-foreground"
            >
              {field.title}
            </label>
            <p className="text-xs leading-6 text-muted">
              {field.description}
            </p>
            <textarea
              id={`${entry.id}-${field.id}`}
              value={entry.notesByField[field.id] ?? ""}
              onChange={(event) => onFieldChange(field.id, event.target.value)}
              rows={3}
              className="w-full rounded-md border border-white/10 bg-background/45 p-3 text-sm leading-7 text-foreground"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
