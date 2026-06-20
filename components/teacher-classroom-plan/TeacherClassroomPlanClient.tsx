"use client";

import { useEffect, useState } from "react";
import {
  CLASSROOM_PLAN_STORAGE_KEY,
  getDefaultClassroomPlanState,
  type ClassroomPlanSlot,
  type ClassroomPlanState,
} from "@/content/teacher-classroom-plan";

function readStoredState(): ClassroomPlanState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(CLASSROOM_PLAN_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as ClassroomPlanState;
    if (!parsed || !Array.isArray(parsed.slots)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function mergeWithDefaults(state: ClassroomPlanState | null): ClassroomPlanState {
  const defaults = getDefaultClassroomPlanState();
  if (!state) {
    return defaults;
  }

  const customLabelById = new Map(
    state.slots
      .filter((slot) => slot && typeof slot.id === "string")
      .map((slot) => [slot.id, typeof slot.customLabel === "string" ? slot.customLabel : ""]),
  );

  return {
    slots: defaults.slots.map((slot) =>
      slot.editable
        ? { ...slot, customLabel: customLabelById.get(slot.id) ?? "" }
        : slot,
    ),
  };
}

function slotLabel(slot: ClassroomPlanSlot): string {
  return slot.editable && slot.customLabel.trim()
    ? slot.customLabel.trim()
    : slot.defaultLabel;
}

export function TeacherClassroomPlanClient() {
  const [state, setState] = useState<ClassroomPlanState>(() =>
    mergeWithDefaults(readStoredState()),
  );

  useEffect(() => {
    window.localStorage.setItem(
      CLASSROOM_PLAN_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  function handleRename(slotId: string, value: string) {
    setState((previous) => ({
      slots: previous.slots.map((slot) =>
        slot.id === slotId && slot.editable
          ? { ...slot, customLabel: value }
          : slot,
      ),
    }));
  }

  function handleReset() {
    setState(getDefaultClassroomPlanState());
  }

  const seats = state.slots.filter((slot) => slot.kind === "seat");
  const tables = state.slots.filter((slot) => slot.kind === "table");
  const groups = state.slots.filter((slot) => slot.kind === "group");

  return (
    <div className="mt-10">
      <section
        role="note"
        className="rounded-lg border border-ember/40 bg-ember/10 p-5 text-sm font-bold text-ember sm:p-6"
      >
        ⚠️ Ne pas saisir de nom ou d&apos;information personnelle. Les étiquettes
        de tables et de groupes sont visuelles uniquement : elles ne doivent
        pas contenir de prénom d&apos;élève.
      </section>

      <section
        aria-label="Tables"
        className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">Tables</h2>
        <p className="mt-2 text-sm leading-7 text-muted">
          Renommez visuellement chaque table (ex. « Table fenêtre »). Aucune
          identité d&apos;élève n&apos;est associée à une table.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2" role="list">
          {tables.map((slot) => (
            <li key={slot.id} className="flex flex-col gap-2">
              <label
                htmlFor={`slot-${slot.id}`}
                className="text-xs font-bold uppercase tracking-wide text-muted"
              >
                {slot.defaultLabel}
              </label>
              <input
                id={`slot-${slot.id}`}
                type="text"
                value={slot.customLabel}
                onChange={(event) => handleRename(slot.id, event.target.value)}
                placeholder={slot.defaultLabel}
                className="min-h-11 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
              />
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-label="Groupes"
        className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">Groupes</h2>
        <p className="mt-2 text-sm leading-7 text-muted">
          Renommez visuellement chaque groupe (ex. « Groupe lecture »).
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2" role="list">
          {groups.map((slot) => (
            <li key={slot.id} className="flex flex-col gap-2">
              <label
                htmlFor={`slot-${slot.id}`}
                className="text-xs font-bold uppercase tracking-wide text-muted"
              >
                {slot.defaultLabel}
              </label>
              <input
                id={`slot-${slot.id}`}
                type="text"
                value={slot.customLabel}
                onChange={(event) => handleRename(slot.id, event.target.value)}
                placeholder={slot.defaultLabel}
                className="min-h-11 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
              />
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-label="Places élèves"
        className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">Places élèves</h2>
        <p className="mt-2 text-sm leading-7 text-muted">
          Repères anonymes et non modifiables : aucun prénom ne peut être
          saisi à la place d&apos;une étiquette élève.
        </p>
        <ul
          className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6"
          role="list"
        >
          {seats.map((slot) => (
            <li
              key={slot.id}
              className="rounded-md border border-white/10 bg-background/45 px-3 py-2 text-center text-sm font-bold text-foreground"
            >
              {slotLabel(slot)}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-ember/50 hover:text-ember"
        >
          Réinitialiser le plan
        </button>
      </div>
    </div>
  );
}
