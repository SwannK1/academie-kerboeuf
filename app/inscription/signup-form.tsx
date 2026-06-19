"use client";

import { useActionState } from "react";
import { signUp } from "./actions";

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error: string } | undefined, formData: FormData) =>
      signUp(formData),
    undefined,
  );

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
        Nom affiché (facultatif)
        <input
          type="text"
          name="displayName"
          autoComplete="name"
          className="min-h-11 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
        Email
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="min-h-11 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
        Mot de passe
        <input
          type="password"
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="min-h-11 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
        />
      </label>

      {state?.error ? (
        <p role="alert" className="text-sm font-bold text-red-400">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 inline-flex min-h-11 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-4 text-sm font-black text-sky transition hover:bg-sky hover:text-ink disabled:opacity-60"
      >
        {isPending ? "Création..." : "Créer mon compte"}
      </button>
    </form>
  );
}
