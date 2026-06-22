"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUpAction } from "@/app/inscription/actions";

export default function InscriptionPage() {
  const [error, formAction, pending] = useActionState(signUpAction, undefined);

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold">Créer gratuitement mon compte</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Gratuit, sans paiement ni abonnement. Aucune donnée élève n&apos;est
        collectée.
      </p>

      <form action={formAction} className="mt-8 space-y-4">
        <div>
          <span className="block text-sm font-medium">Je suis</span>
          <div className="mt-1 flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="member" defaultChecked />
              Membre
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="teacher" />
              Enseignant
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
          />
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          Créer mon compte
        </button>
      </form>

      <p className="mt-6 text-sm text-neutral-600">
        Déjà inscrit ?{" "}
        <Link href="/connexion" className="underline">
          Se connecter
        </Link>
      </p>
    </main>
  );
}
