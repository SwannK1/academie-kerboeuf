"use client";

import { useEffect, useState } from "react";
import {
  getEmptySubstituteFolderState,
  substituteFolderFields,
  SUBSTITUTE_FOLDER_STORAGE_KEY,
  type SubstituteFolderFieldId,
  type SubstituteFolderState,
} from "@/content/teacher-substitute-folder";

function readStoredState(): SubstituteFolderState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(SUBSTITUTE_FOLDER_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<SubstituteFolderState>;
    const empty = getEmptySubstituteFolderState();
    for (const field of substituteFolderFields) {
      if (typeof parsed[field.id] === "string") {
        empty[field.id] = parsed[field.id] as string;
      }
    }
    return empty;
  } catch {
    return null;
  }
}

export function TeacherSubstituteFolderClient() {
  const [state, setState] = useState<SubstituteFolderState>(
    () => readStoredState() ?? getEmptySubstituteFolderState(),
  );

  useEffect(() => {
    window.localStorage.setItem(
      SUBSTITUTE_FOLDER_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  function handleChange(fieldId: SubstituteFolderFieldId, value: string) {
    setState((previous) => ({ ...previous, [fieldId]: value }));
  }

  function handleReset() {
    setState(getEmptySubstituteFolderState());
  }

  return (
    <div className="mt-10">
      <div
        role="alert"
        className="rounded-md border border-ember/40 bg-ember/[0.08] px-4 py-3 text-sm font-bold text-ember"
      >
        Ne pas saisir de données personnelles, médicales ou familiales (noms
        d’élèves, diagnostics, situations familiales...).
      </div>

      <div className="mt-8 grid gap-6">
        {substituteFolderFields.map((field) => {
          const fieldId = `dossier-remplacant-${field.id}`;
          return (
            <section
              key={field.id}
              className="rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6"
            >
              <label
                htmlFor={fieldId}
                className="text-lg font-black text-foreground"
              >
                {field.label}
              </label>
              <p className="mt-1 text-sm leading-6 text-muted">
                {field.helper}
              </p>
              <textarea
                id={fieldId}
                value={state[field.id]}
                onChange={(event) => handleChange(field.id, event.target.value)}
                placeholder={field.placeholder}
                rows={4}
                className="mt-4 w-full rounded-md border border-white/10 bg-background/45 p-3 text-sm text-foreground"
              />
            </section>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleReset}
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
      >
        Réinitialiser le dossier
      </button>
    </div>
  );
}
