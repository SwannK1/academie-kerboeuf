"use client";

import { useMemo, useState } from "react";

// ── Constants ──────────────────────────────────────────────────────────────

const TOTAL_STEPS = 7;

const ACTIVITY_OPTIONS = [
  "Indépendant / freelance",
  "Artisan",
  "Restaurant / commerce",
  "Association",
  "Église / structure éducative",
  "Petite entreprise / PME",
  "Autre",
];

const OBJECTIVE_OPTIONS = [
  "Présenter mon activité",
  "Donner une image plus professionnelle",
  "Recevoir des demandes de contact",
  "Obtenir plus d'appels",
  "Prendre des réservations",
  "Mettre en avant mes services",
  "Être mieux trouvé sur Google",
  "Remplacer un site ancien",
  "Autre",
];

const NEED_OPTIONS = [
  "Page d'accueil",
  "Page services",
  "Page tarifs",
  "Page réalisations",
  "Formulaire de contact",
  "Bouton appel / email / WhatsApp",
  "Réservation en ligne",
  "Avis clients",
  "SEO local",
  "Statistiques de visite",
  "Accompagnement après mise en ligne",
  "Autre",
];

const BUDGET_OPTIONS = [
  { label: "Site Essentiel — 690 €", value: "essentiel-690" },
  { label: "Site Pro — 1 190 €", value: "pro-1190" },
  { label: "Site Avancé — 1 790 €", value: "avance-1790" },
  { label: "Je ne sais pas encore, je veux être conseillé", value: "a-definir" },
];

const TIMELINE_OPTIONS = [
  { label: "Dès que possible", value: "des-que-possible" },
  { label: "Dans le mois", value: "dans-le-mois" },
  { label: "Dans les 2 à 3 mois", value: "2-3-mois" },
  { label: "Je me renseigne seulement", value: "renseignement" },
];

const BUDGET_LABELS: Record<string, string> = {
  "essentiel-690": "Site Essentiel — 690 €",
  "pro-1190": "Site Pro — 1 190 €",
  "avance-1790": "Site Avancé — 1 790 €",
  "a-definir": "À définir après échange",
};

const TIMELINE_LABELS: Record<string, string> = {
  "des-que-possible": "Dès que possible",
  "dans-le-mois": "Dans le mois",
  "2-3-mois": "Dans les 2 à 3 mois",
  renseignement: "Je me renseigne seulement",
};

// ── Types ──────────────────────────────────────────────────────────────────

type WizardData = {
  project: "create" | "improve" | "";
  activity: string;
  activityOther: string;
  objectives: string[];
  objectivesOther: string;
  needs: string[];
  budget: string;
  timeline: string;
  contactName: string;
  email: string;
  phone: string;
  businessName: string;
  city: string;
  currentSite: string;
  message: string;
};

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const INITIAL_DATA: WizardData = {
  project: "",
  activity: "",
  activityOther: "",
  objectives: [],
  objectivesOther: "",
  needs: [],
  budget: "",
  timeline: "",
  contactName: "",
  email: "",
  phone: "",
  businessName: "",
  city: "",
  currentSite: "",
  message: "",
};

// ── Helpers ────────────────────────────────────────────────────────────────

function toggleItem(list: string[], item: string): string[] {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
}

function deriveRecommendation(data: WizardData): string {
  if (data.budget === "essentiel-690") return "Site Essentiel";
  if (data.budget === "pro-1190") return "Site Pro";
  if (data.budget === "avance-1790") return "Site Avancé";
  const hasAdvancedNeed =
    data.needs.includes("Réservation en ligne") ||
    data.needs.includes("Statistiques de visite") ||
    data.needs.length > 6;
  if (hasAdvancedNeed) return "Site Avancé";
  if (data.needs.length > 3 || data.objectives.length > 4) return "Site Pro";
  return "Site Essentiel";
}

function buildPayload(data: WizardData) {
  const activityType =
    data.activity === "Autre" ? data.activityOther : data.activity;
  const objectives = data.objectives
    .filter((o) => o !== "Autre")
    .concat(data.objectivesOther ? [data.objectivesOther] : []);

  return {
    project_type: data.project === "create" ? "creation" : "refonte",
    activity_type: activityType,
    has_website: data.project === "improve" ? ("yes" as const) : ("no" as const),
    goals: objectives.join(", "),
    notes: data.needs.join(", "),
    budget_range: data.budget,
    timeline: data.timeline,
    contact_name: data.contactName,
    email: data.email,
    phone: data.phone,
    whatsapp: "",
    business_name: data.businessName,
    city: data.city,
    current_website_url: data.currentSite,
    google_business_url: "",
    social_url: "",
    other_url: "",
    message: data.message,
  };
}

// ── Sub-components ─────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  const pct = Math.round((step / TOTAL_STEPS) * 100);
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
          Étape {step} sur {TOTAL_STEPS}
        </p>
        <p className="text-xs font-bold text-muted">{pct} %</p>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-sky transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function SingleCard({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`choice-card${active ? " choice-card-active" : ""}`}
    >
      {label}
    </button>
  );
}

function MultiCard({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`choice-card${active ? " choice-card-active" : ""}`}
    >
      <span
        className={`mr-2 inline-flex size-4 shrink-0 items-center justify-center rounded border ${
          active ? "border-sky/60 bg-sky/20" : "border-white/20 bg-transparent"
        }`}
        aria-hidden="true"
      >
        {active && (
          <svg
            viewBox="0 0 12 12"
            fill="none"
            className="size-2.5 text-sky"
            aria-hidden="true"
          >
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

function SummaryView({
  data,
  onBack,
  onSubmit,
  submitState,
}: {
  data: WizardData;
  onBack: () => void;
  onSubmit: () => void;
  submitState: SubmitState;
}) {
  const recommendation = deriveRecommendation(data);
  const projectLabel = data.project === "create" ? "Créer mon site internet" : "Améliorer mon site actuel";
  const activityLabel = data.activity === "Autre" ? data.activityOther : data.activity;
  const objectives = data.objectives.filter((o) => o !== "Autre").concat(data.objectivesOther ? [data.objectivesOther] : []);

  if (submitState.status === "success") {
    return (
      <div className="rounded-md border border-emerald-400/30 bg-emerald-400/[0.07] p-8 text-center">
        <p className="text-2xl font-black text-foreground">Demande reçue</p>
        <p className="mt-3 text-sm leading-7 text-muted">{submitState.message}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-md border border-sky/20 bg-sky/[0.06] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky">
          Première orientation
        </p>
        <p className="mt-2 text-lg font-black text-foreground">
          Votre projet semble correspondre à une formule{" "}
          <span className="text-sky">{recommendation}</span>.
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">
          Cette orientation est indicative. Elle sera confirmée après échange.
        </p>
      </div>

      <div className="grid gap-3 rounded-md border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-2">
        <SummaryRow label="Projet" value={projectLabel} />
        {activityLabel && <SummaryRow label="Activité" value={activityLabel} />}
        {objectives.length > 0 && (
          <SummaryRow label="Objectifs" value={objectives.join(", ")} full />
        )}
        {data.needs.length > 0 && (
          <SummaryRow label="Besoins" value={data.needs.join(", ")} full />
        )}
        {data.budget && <SummaryRow label="Budget" value={BUDGET_LABELS[data.budget] ?? data.budget} />}
        {data.timeline && <SummaryRow label="Délai" value={TIMELINE_LABELS[data.timeline] ?? data.timeline} />}
        <SummaryRow label="Contact" value={`${data.contactName}${data.businessName ? ` — ${data.businessName}` : ""}`} full />
        {data.email && <SummaryRow label="Email" value={data.email} />}
        {data.phone && <SummaryRow label="Téléphone" value={data.phone} />}
      </div>

      {submitState.status === "error" && (
        <p className="rounded-md border border-red-400/30 bg-red-400/[0.07] px-4 py-3 text-sm font-bold text-red-200" role="alert">
          {submitState.message}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">
          Modifier mes réponses
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitState.status === "loading"}
          className="btn-primary"
        >
          {submitState.status === "loading" ? "Envoi..." : "Recevoir mon analyse gratuite"}
        </button>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  full,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function ProjectWizard() {
  const [step, setStep] = useState(1);
  const [showSummary, setShowSummary] = useState(false);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  function set<K extends keyof WizardData>(key: K, value: WizardData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  const canAdvance = useMemo(() => {
    switch (step) {
      case 1:
        return data.project !== "";
      case 2:
        return data.activity !== "" && (data.activity !== "Autre" || data.activityOther.trim() !== "");
      case 3:
        return data.objectives.length > 0;
      case 4:
        return true;
      case 5:
        return data.budget !== "";
      case 6:
        return data.timeline !== "";
      case 7:
        return (
          data.contactName.trim() !== "" &&
          data.businessName.trim() !== "" &&
          data.city.trim() !== "" &&
          (data.email.trim() !== "" || data.phone.trim() !== "")
        );
      default:
        return false;
    }
  }, [step, data]);

  async function handleSubmit() {
    setSubmitState({ status: "loading" });
    try {
      const response = await fetch("/api/audit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(data)),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        errors?: Record<string, string>;
      };
      if (!response.ok || !result.ok) {
        const detail = result.errors ? ` ${Object.values(result.errors).join(" ")}` : "";
        throw new Error(`${result.message ?? "Impossible d'envoyer la demande."}${detail}`);
      }
      setSubmitState({
        status: "success",
        message: result.message ?? "Votre demande a bien été reçue.",
      });
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

  if (showSummary) {
    return (
      <SummaryView
        data={data}
        onBack={() => setShowSummary(false)}
        onSubmit={handleSubmit}
        submitState={submitState}
      />
    );
  }

  return (
    <div>
      <ProgressBar step={step} />

      <div className="min-h-64">
        {/* Étape 1 — Votre projet */}
        {step === 1 && (
          <fieldset>
            <legend className="text-2xl font-black text-foreground">
              Que voulez-vous faire ?
            </legend>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <SingleCard
                label="Créer mon site internet"
                active={data.project === "create"}
                onClick={() => set("project", "create")}
              />
              <SingleCard
                label="Améliorer mon site actuel"
                active={data.project === "improve"}
                onClick={() => set("project", "improve")}
              />
            </div>
          </fieldset>
        )}

        {/* Étape 2 — Votre activité */}
        {step === 2 && (
          <fieldset>
            <legend className="text-2xl font-black text-foreground">
              Quel type d&apos;activité avez-vous ?
            </legend>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ACTIVITY_OPTIONS.map((opt) => (
                <SingleCard
                  key={opt}
                  label={opt}
                  active={data.activity === opt}
                  onClick={() => set("activity", opt)}
                />
              ))}
            </div>
            {data.activity === "Autre" && (
              <div className="mt-4">
                <label htmlFor="activityOther" className="form-label">
                  Précisez votre activité
                </label>
                <input
                  id="activityOther"
                  className="form-input"
                  value={data.activityOther}
                  onChange={(e) => set("activityOther", e.target.value)}
                  placeholder="Décrivez votre activité..."
                />
              </div>
            )}
          </fieldset>
        )}

        {/* Étape 3 — Votre objectif principal */}
        {step === 3 && (
          <fieldset>
            <legend className="text-2xl font-black text-foreground">
              Quel est votre objectif principal ?
            </legend>
            <p className="mt-2 text-sm text-muted">Plusieurs choix possibles.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {OBJECTIVE_OPTIONS.map((opt) => (
                <MultiCard
                  key={opt}
                  label={opt}
                  active={data.objectives.includes(opt)}
                  onClick={() => set("objectives", toggleItem(data.objectives, opt))}
                />
              ))}
            </div>
            {data.objectives.includes("Autre") && (
              <div className="mt-4">
                <label htmlFor="objectivesOther" className="form-label">
                  Précisez votre objectif
                </label>
                <input
                  id="objectivesOther"
                  className="form-input"
                  value={data.objectivesOther}
                  onChange={(e) => set("objectivesOther", e.target.value)}
                  placeholder="Décrivez votre objectif..."
                />
              </div>
            )}
          </fieldset>
        )}

        {/* Étape 4 — Vos besoins */}
        {step === 4 && (
          <fieldset>
            <legend className="text-2xl font-black text-foreground">
              De quoi avez-vous besoin ?
            </legend>
            <p className="mt-2 text-sm text-muted">Plusieurs choix possibles.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {NEED_OPTIONS.map((opt) => (
                <MultiCard
                  key={opt}
                  label={opt}
                  active={data.needs.includes(opt)}
                  onClick={() => set("needs", toggleItem(data.needs, opt))}
                />
              ))}
            </div>
          </fieldset>
        )}

        {/* Étape 5 — Budget */}
        {step === 5 && (
          <fieldset>
            <legend className="text-2xl font-black text-foreground">
              Quel budget souhaitez-vous prévoir ?
            </legend>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {BUDGET_OPTIONS.map((opt) => (
                <SingleCard
                  key={opt.value}
                  label={opt.label}
                  active={data.budget === opt.value}
                  onClick={() => set("budget", opt.value)}
                />
              ))}
            </div>
          </fieldset>
        )}

        {/* Étape 6 — Délai */}
        {step === 6 && (
          <fieldset>
            <legend className="text-2xl font-black text-foreground">
              Quand souhaitez-vous lancer le site ?
            </legend>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {TIMELINE_OPTIONS.map((opt) => (
                <SingleCard
                  key={opt.value}
                  label={opt.label}
                  active={data.timeline === opt.value}
                  onClick={() => set("timeline", opt.value)}
                />
              ))}
            </div>
          </fieldset>
        )}

        {/* Étape 7 — Contact */}
        {step === 7 && (
          <fieldset>
            <legend className="text-2xl font-black text-foreground">
              Où peut-on vous répondre ?
            </legend>
            <div className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contactName" className="form-label">
                    Prénom / nom *
                  </label>
                  <input
                    id="contactName"
                    className="form-input"
                    value={data.contactName}
                    onChange={(e) => set("contactName", e.target.value)}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="businessName" className="form-label">
                    Nom de l&apos;activité *
                  </label>
                  <input
                    id="businessName"
                    className="form-input"
                    value={data.businessName}
                    onChange={(e) => set("businessName", e.target.value)}
                    placeholder="Restaurant Chez Juju, etc."
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="city" className="form-label">
                    Ville *
                  </label>
                  <input
                    id="city"
                    className="form-input"
                    value={data.city}
                    onChange={(e) => set("city", e.target.value)}
                    placeholder="Paris, Chelles..."
                    required
                  />
                </div>
                <div>
                  <label htmlFor="currentSite" className="form-label">
                    Site actuel (si existant)
                  </label>
                  <input
                    id="currentSite"
                    className="form-input"
                    type="url"
                    value={data.currentSite}
                    onChange={(e) => set("currentSite", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="form-label">
                    Email *
                  </label>
                  <input
                    id="email"
                    className="form-input"
                    type="email"
                    value={data.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="vous@exemple.fr"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="form-label">
                    Téléphone *
                  </label>
                  <input
                    id="phone"
                    className="form-input"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="06..."
                  />
                </div>
              </div>

              <p className="text-xs text-muted">* Email ou téléphone requis.</p>

              <div>
                <label htmlFor="message" className="form-label">
                  Message libre
                </label>
                <textarea
                  id="message"
                  className="form-input min-h-28 resize-y"
                  value={data.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="Ajoutez tout ce qui peut nous aider à mieux comprendre votre projet..."
                />
              </div>
            </div>
          </fieldset>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="btn-secondary"
        >
          Retour
        </button>
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance}
            className="btn-primary"
          >
            Continuer
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowSummary(true)}
            disabled={!canAdvance}
            className="btn-primary"
          >
            Voir ma synthèse
          </button>
        )}
      </div>
    </div>
  );
}
