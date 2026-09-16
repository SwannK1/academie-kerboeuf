"use client";

import { useActionState } from "react";
import type { AdminResourceRow } from "@/lib/admin/catalog";
import { updateResourceAction, type ResourceActionState } from "@/app/admin/resources/actions";

const initialState: ResourceActionState = {};

export function ResourceEditForm({ row }: { row: AdminResourceRow }) {
  const boundAction = updateResourceAction.bind(null, row.id, row.href);
  const [state, formAction, pending] = useActionState(boundAction, initialState);

  return (
    <form action={formAction} className="mt-6 grid gap-5">
      <div className="grid gap-2">
        <label htmlFor="status" className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
          Statut
        </label>
        <select
          id="status"
          name="status"
          defaultValue={row.effectiveStatus}
          className="rounded border border-white/10 bg-ink/40 px-3 py-2 text-sm text-foreground outline-none focus:border-jade/60"
        >
          <option value="available">Disponible</option>
          <option value="in-preparation">En préparation</option>
          <option value="planned">À venir</option>
        </select>
      </div>

      <div className="grid gap-2">
        <label htmlFor="href" className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
          Lien de la ressource réelle (PDF)
        </label>
        <input
          id="href"
          name="href"
          type="text"
          defaultValue={row.href ?? ""}
          placeholder="/ressources/cp/..."
          className="rounded border border-white/10 bg-ink/40 px-3 py-2 text-sm text-foreground outline-none focus:border-jade/60"
        />
        <p className="text-xs text-muted">
          Laisser vide si la ressource n’existe pas encore. Aucun lien fictif ne doit être saisi.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="label" className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Titre affiché (optionnel)
          </label>
          <input
            id="label"
            name="label"
            type="text"
            defaultValue={row.label ?? ""}
            className="rounded border border-white/10 bg-ink/40 px-3 py-2 text-sm text-foreground outline-none focus:border-jade/60"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="durationLabel" className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Durée (optionnel)
          </label>
          <input
            id="durationLabel"
            name="durationLabel"
            type="text"
            placeholder="20 min"
            defaultValue={row.durationLabel ?? ""}
            className="rounded border border-white/10 bg-ink/40 px-3 py-2 text-sm text-foreground outline-none focus:border-jade/60"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" name="verified" defaultChecked={row.verified} />
          Ressource vérifiée (même sans lien réel)
        </label>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" name="published" defaultChecked={row.published} />
          Publier cette ressource
        </label>
      </div>

      {state.error ? (
        <p className="text-sm font-bold text-ember" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="text-sm font-bold text-jade" role="status">
          {state.success}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-md border border-jade/35 bg-jade/10 px-4 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-jade transition hover:bg-jade/20 disabled:opacity-50"
      >
        {pending ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}
