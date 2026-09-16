"use client";

import { useActionState } from "react";
import { loginAction, type LoginActionState } from "@/app/admin/login/actions";

const initialState: LoginActionState = {};

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="password" className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="mt-2 w-full rounded border border-white/10 bg-ink/40 px-3 py-2 text-sm text-foreground outline-none focus:border-jade/60"
        />
      </div>
      {state.error ? (
        <p className="text-sm font-bold text-ember" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md border border-jade/35 bg-jade/10 px-4 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-jade transition hover:bg-jade/20 disabled:opacity-50"
      >
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
