"use client";

import { useActionState } from "react";
import { createClassAction } from "./actions";

const LEVELS = ["CP", "CE1", "CE2", "CM1", "CM2"] as const;
const PERIODS = ["P1", "P2", "P3", "P4", "P5"] as const;

export function CreateClassForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error: string } | undefined, formData: FormData) =>
      createClassAction(formData),
    undefined,
  );

  return (
    <form action={formAction} className="mt-3 flex flex-col gap-4 rounded-lg border border-white/10 bg-background/45 p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
          Niveau
          <select
            name="level"
            required
            defaultValue="CP"
            className="min-h-11 rounded-md border border-white/10 bg-background px-3 text-sm text-foreground"
          >
            {LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
          Année scolaire
          <input
            type="text"
            name="schoolYear"
            required
            placeholder="2025-2026"
            className="min-h-11 rounded-md border border-white/10 bg-background px-3 text-sm text-foreground"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
          Nom de la classe (facultatif)
          <input
            type="text"
            name="className"
            className="min-h-11 rounded-md border border-white/10 bg-background px-3 text-sm text-foreground"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
          Effectif (facultatif)
          <input
            type="number"
            name="studentCount"
            min={0}
            className="min-h-11 rounded-md border border-white/10 bg-background px-3 text-sm text-foreground"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
          Période active
          <select
            name="activePeriod"
            required
            defaultValue="P1"
            className="min-h-11 rounded-md border border-white/10 bg-background px-3 text-sm text-foreground"
          >
            {PERIODS.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        </label>
      </div>

      {state?.error ? (
        <p role="alert" className="text-sm font-bold text-red-400">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-h-11 w-fit items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-4 text-sm font-black text-sky transition hover:bg-sky hover:text-ink disabled:opacity-60"
      >
        {isPending ? "Création..." : "Créer la classe"}
      </button>
    </form>
  );
}
