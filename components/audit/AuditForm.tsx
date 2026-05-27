"use client";

import { useMemo, useState } from "react";
import type {
  AuditRequestPayload,
  AuditRequestSubmissionResult,
} from "@/lib/audit/types";

const INITIAL_FORM: AuditRequestPayload = {
  business_name: "",
  city: "",
  activity_type: "",
  has_website: "unknown",
  current_website_url: "",
  google_business_url: "",
  social_url: "",
  other_url: "",
  timeline: "",
  goals: "",
  project_type: "",
  budget_range: "",
  notes: "",
  contact_name: "",
  phone: "",
  whatsapp: "",
  email: "",
  message: "",
};

const FIELD_CLASS =
  "mt-2 w-full rounded-md border border-white/12 bg-white/[0.06] px-3 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-gold/70 focus:bg-white/[0.08]";

const LABEL_CLASS = "text-sm font-bold text-foreground";

type SubmitState =
  | { status: "idle"; message: "" }
  | { status: "loading"; message: string }
  | { status: "success"; message: string; whatsappUrl?: string }
  | { status: "error"; message: string };

function normalizeErrors(errors: unknown) {
  if (!errors || typeof errors !== "object") {
    return "";
  }

  return Object.values(errors as Record<string, unknown>)
    .filter((value): value is string => typeof value === "string")
    .join(" ");
}

export function AuditForm() {
  const [form, setForm] = useState<AuditRequestPayload>(INITIAL_FORM);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });

  const canSubmit = useMemo(() => {
    return (
      form.business_name.trim() &&
      form.city.trim() &&
      form.project_type.trim() &&
      form.contact_name.trim() &&
      (form.phone.trim() || form.whatsapp.trim() || form.email.trim())
    );
  }, [form]);

  function updateField<K extends keyof AuditRequestPayload>(
    key: K,
    value: AuditRequestPayload[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({
      status: "loading",
      message: "Envoi de la demande en cours...",
    });

    try {
      const response = await fetch("/api/audit-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as AuditRequestSubmissionResult & {
        errors?: Record<string, string>;
      };

      if (!response.ok || !result.ok) {
        const detail = normalizeErrors(result.errors);

        throw new Error(
          detail ? `${result.message} ${detail}` : result.message,
        );
      }

      setSubmitState({
        status: "success",
        message: result.message,
        whatsappUrl: result.whatsappUrl,
      });
      setForm(INITIAL_FORM);
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Impossible d'envoyer la demande pour le moment.",
      });
    }
  }

  return (
    <form
      className="grid gap-6 rounded-md border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className={LABEL_CLASS}>
          Commerce ou projet *
          <input
            required
            className={FIELD_CLASS}
            name="business_name"
            value={form.business_name}
            onChange={(event) => updateField("business_name", event.target.value)}
            placeholder="Ex. Chez Juju & Fifi"
          />
        </label>

        <label className={LABEL_CLASS}>
          Ville *
          <input
            required
            className={FIELD_CLASS}
            name="city"
            value={form.city}
            onChange={(event) => updateField("city", event.target.value)}
            placeholder="Ex. Chelles"
          />
        </label>

        <label className={LABEL_CLASS}>
          Activite
          <input
            className={FIELD_CLASS}
            name="activity_type"
            value={form.activity_type}
            onChange={(event) => updateField("activity_type", event.target.value)}
            placeholder="Restaurant, artisan, commerce..."
          />
        </label>

        <label className={LABEL_CLASS}>
          Type de projet *
          <select
            required
            className={FIELD_CLASS}
            name="project_type"
            value={form.project_type}
            onChange={(event) => updateField("project_type", event.target.value)}
          >
            <option value="">Choisir</option>
            <option value="site-vitrine">Site vitrine</option>
            <option value="refonte">Refonte de site</option>
            <option value="seo-local">SEO local</option>
            <option value="audit-seul">Audit seul</option>
            <option value="autre">Autre</option>
          </select>
        </label>

        <label className={LABEL_CLASS}>
          Avez-vous deja un site ?
          <select
            className={FIELD_CLASS}
            name="has_website"
            value={form.has_website}
            onChange={(event) =>
              updateField(
                "has_website",
                event.target.value as AuditRequestPayload["has_website"],
              )
            }
          >
            <option value="unknown">Je ne sais pas</option>
            <option value="yes">Oui</option>
            <option value="no">Non</option>
          </select>
        </label>

        <label className={LABEL_CLASS}>
          Budget envisage
          <select
            className={FIELD_CLASS}
            name="budget_range"
            value={form.budget_range}
            onChange={(event) => updateField("budget_range", event.target.value)}
          >
            <option value="">Choisir</option>
            <option value="moins-500">Moins de 500 euros</option>
            <option value="500-1000">500 a 1 000 euros</option>
            <option value="1000-2000">1 000 a 2 000 euros</option>
            <option value="plus-2000">Plus de 2 000 euros</option>
            <option value="a-definir">A definir</option>
          </select>
        </label>

        <label className={LABEL_CLASS}>
          Site actuel
          <input
            className={FIELD_CLASS}
            name="current_website_url"
            type="url"
            value={form.current_website_url}
            onChange={(event) =>
              updateField("current_website_url", event.target.value)
            }
            placeholder="https://..."
          />
        </label>

        <label className={LABEL_CLASS}>
          Fiche Google Business
          <input
            className={FIELD_CLASS}
            name="google_business_url"
            type="url"
            value={form.google_business_url}
            onChange={(event) =>
              updateField("google_business_url", event.target.value)
            }
            placeholder="https://..."
          />
        </label>

        <label className={LABEL_CLASS}>
          Reseau social
          <input
            className={FIELD_CLASS}
            name="social_url"
            type="url"
            value={form.social_url}
            onChange={(event) => updateField("social_url", event.target.value)}
            placeholder="Instagram, Facebook, LinkedIn..."
          />
        </label>

        <label className={LABEL_CLASS}>
          Nom du contact *
          <input
            required
            className={FIELD_CLASS}
            name="contact_name"
            value={form.contact_name}
            onChange={(event) => updateField("contact_name", event.target.value)}
            placeholder="Votre nom"
          />
        </label>

        <label className={LABEL_CLASS}>
          Telephone
          <input
            className={FIELD_CLASS}
            name="phone"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="06..."
          />
        </label>

        <label className={LABEL_CLASS}>
          WhatsApp
          <input
            className={FIELD_CLASS}
            name="whatsapp"
            value={form.whatsapp}
            onChange={(event) => updateField("whatsapp", event.target.value)}
            placeholder="06..."
          />
        </label>

        <label className={LABEL_CLASS}>
          Email
          <input
            className={FIELD_CLASS}
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="vous@exemple.fr"
          />
        </label>
      </div>

      <label className={LABEL_CLASS}>
        Objectif principal
        <textarea
          className={`${FIELD_CLASS} min-h-28 resize-y`}
          name="goals"
          value={form.goals}
          onChange={(event) => updateField("goals", event.target.value)}
          placeholder="Ex. avoir plus de reservations, etre trouve sur Google, moderniser le site..."
        />
      </label>

      <label className={LABEL_CLASS}>
        Message
        <textarea
          className={`${FIELD_CLASS} min-h-28 resize-y`}
          name="message"
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Ajoutez ce qui peut aider l'audit."
        />
      </label>

      <label className={LABEL_CLASS}>
        Notes complementaires
        <textarea
          className={`${FIELD_CLASS} min-h-24 resize-y`}
          name="notes"
          value={form.notes}
          onChange={(event) => updateField("notes", event.target.value)}
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-muted">
          Les champs marques d&apos;un astérisque sont obligatoires. Ajoutez au
          moins un moyen de contact.
        </p>
        <button
          type="submit"
          disabled={!canSubmit || submitState.status === "loading"}
          className="inline-flex h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-extrabold text-ink transition hover:bg-[#ffd778] disabled:cursor-not-allowed disabled:opacity-55"
        >
          {submitState.status === "loading"
            ? "Envoi..."
            : "Demander l'audit gratuit"}
        </button>
      </div>

      {submitState.status !== "idle" ? (
        <div
          className={`rounded-md border px-4 py-3 text-sm font-bold ${
            submitState.status === "success"
              ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
              : submitState.status === "error"
                ? "border-red-400/40 bg-red-400/10 text-red-100"
                : "border-white/10 bg-white/[0.04] text-muted"
          }`}
          role="status"
        >
          {submitState.message}
        </div>
      ) : null}
    </form>
  );
}
