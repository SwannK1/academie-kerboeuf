"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * Connexion par lien magique (magic link) : pas de mot de passe à
 * gérer ni à stocker côté Académie Kerboeuf. Supabase envoie un e-mail
 * contenant un lien de connexion à usage unique.
 */
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setStatus("error");
      setErrorMessage("La connexion enseignant n'est pas encore configurée.");
      return;
    }

    setStatus("sending");
    setErrorMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/enseignants/tableau-de-bord`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      return;
    }

    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="mt-8 rounded-lg border border-panel-soft bg-background p-4 text-sm text-muted"
      >
        <p className="font-medium text-foreground">E-mail envoyé</p>
        <p className="mt-1">
          Consultez votre boîte de réception : un lien de connexion vous a été
          envoyé à {email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground"
        >
          Adresse e-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 w-full rounded-lg border border-panel-soft bg-background px-3 py-2 text-foreground focus:border-gold focus:outline-none"
        />
      </div>

      {status === "error" && errorMessage ? (
        <p role="alert" className="text-sm text-ember">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-gold px-4 py-2.5 font-semibold text-ink transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending"
          ? "Envoi en cours…"
          : "Recevoir un lien de connexion"}
      </button>
    </form>
  );
}
