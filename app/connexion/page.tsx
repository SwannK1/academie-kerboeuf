"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signInAction } from "@/app/connexion/actions";

export default function ConnexionPage() {
  const [error, formAction, pending] = useActionState(signInAction, undefined);

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold">Se connecter</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Réservé aux comptes enseignant et membre, gratuits sur inscription.
      </p>

      <form action={formAction} className="mt-8 space-y-4">
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
            autoComplete="current-password"
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
          />
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          Se connecter
        </button>
      </form>

      <p className="mt-6 text-sm text-neutral-600">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="underline">
          Créer gratuitement mon compte
        </Link>
      </p>
    </main>
  );
}
