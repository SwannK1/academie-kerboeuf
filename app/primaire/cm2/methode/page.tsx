import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";

export const metadata: Metadata = {
  title: "Méthode CM2 — Académie Kerboeuf",
  description:
    "Organisation des séquences CM2 : 5 séances progressives, progression des exercices et productions attendues.",
};

const SEANCES = [
  {
    num: 1,
    titre: "Situation-problème",
    desc: "Faire émerger le besoin d'apprendre.",
  },
  {
    num: 2,
    titre: "Cours / institutionnalisation",
    desc: "Construire et stabiliser la méthode.",
  },
  {
    num: 3,
    titre: "Initiation collective",
    desc: "Résoudre avec guidage.",
  },
  {
    num: 4,
    titre: "Consolidation",
    desc: "S'entraîner avec de moins en moins d'aide.",
  },
  {
    num: 5,
    titre: "Évaluation",
    desc: "Vérifier ce qui est compris et transférable.",
  },
];

const PROGRESSION = [
  { label: "Automatismes", desc: "Réponses rapides et sûres." },
  { label: "Application",  desc: "Transposer la méthode sur des cas nouveaux." },
  { label: "Raisonnement", desc: "Justifier ses choix par écrit." },
  { label: "Expression",   desc: "Produire une trace structurée." },
];

const PRODUCTIONS = [
  "Une réponse",
  "Une justification",
  "Une preuve",
  "Une trace écrite courte",
  "Une correction possible",
];

export default function MethodeCm2Page() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Breadcrumb
            items={[
              { label: "Accueil",  href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CM2",      href: "/primaire/cm2" },
              { label: "Méthode" },
            ]}
          />
        </div>
      </div>

      {/* ── En-tête ──────────────────────────────────────────────────────── */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded border border-gold/35 bg-gold/10 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              Niveau CM2
            </span>
            <span className="rounded border border-white/15 bg-white/[0.04] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Usage : enseignant
            </span>
            <PublicStatusBadge status="available" />
          </div>

          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Méthode CM2
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            Des séquences courtes, explicites et progressives
          </p>
        </div>
      </section>

      {/* ── Introduction ─────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-base leading-8 text-muted">
            Les contenus CM2 sont organisés en séquences courtes. Chaque notion
            suit une progression stable en 5 séances pour aider les élèves à
            comprendre, s&apos;entraîner, justifier et réinvestir.
          </p>
        </div>
      </section>

      {/* ── La séquence en 5 séances ─────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Structure
          </p>
          <h2 className="mt-3 text-2xl font-black text-foreground sm:text-3xl">
            La séquence en 5 séances
          </h2>
          <ol className="mt-8 space-y-4">
            {SEANCES.map((s) => (
              <li
                key={s.num}
                className="flex gap-4 rounded-md border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="shrink-0 text-xl font-black text-gold/60">
                  {s.num}
                </span>
                <div>
                  <p className="font-bold text-foreground">{s.titre}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Progression des exercices ────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Exercices
          </p>
          <h2 className="mt-3 text-2xl font-black text-foreground sm:text-3xl">
            Progression des exercices
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRESSION.map((step, idx) => (
              <div
                key={step.label}
                className="rounded-md border border-jade/20 bg-jade/[0.04] p-5"
              >
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-jade/70">
                  Étape {idx + 1}
                </p>
                <p className="mt-2 font-black text-foreground">{step.label}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Progression :{" "}
            <span className="font-bold text-foreground">automatismes</span>
            {" → "}
            <span className="font-bold text-foreground">application</span>
            {" → "}
            <span className="font-bold text-foreground">raisonnement</span>
            {" → "}
            <span className="font-bold text-foreground">expression</span>
          </p>
        </div>
      </section>

      {/* ── Ce que l'élève doit produire ────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Productions
          </p>
          <h2 className="mt-3 text-2xl font-black text-foreground sm:text-3xl">
            Ce que l&apos;élève doit produire
          </h2>
          <ul className="mt-6 space-y-2">
            {PRODUCTIONS.map((prod) => (
              <li key={prod} className="flex items-start gap-2 text-sm leading-6 text-muted">
                <span className="mt-1 shrink-0 text-white/30" aria-hidden="true">
                  ·
                </span>
                {prod}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Supports ─────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Ressources
          </p>
          <h2 className="mt-3 text-2xl font-black text-foreground sm:text-3xl">
            Supports
          </h2>
          <p className="mt-6 text-sm text-muted">
            Supports PDF à venir
          </p>
        </div>
      </section>
    </main>
  );
}
