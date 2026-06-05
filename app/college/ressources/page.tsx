import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";

export const metadata: Metadata = {
  title: "Ressources collège | Académie Kerboeuf",
  description:
    "Supports pédagogiques pour le collège : leçons, exercices, évaluations, corrigés et méthodologie, de la 6e à la 3e.",
};

const LEVELS = [
  {
    slug: "6e",
    label: "6e",
    description: "Entrée au collège : consolidation des fondamentaux et méthode.",
    status: "en construction",
    href: "/college/6e",
  },
  {
    slug: "5e",
    label: "5e",
    description: "Approfondissement des disciplines et autonomie méthodologique.",
    status: "bientôt",
    href: "/college/5e",
  },
  {
    slug: "4e",
    label: "4e",
    description: "Montée en abstraction et préparation au cycle terminal.",
    status: "bientôt",
    href: "/college/4e",
  },
  {
    slug: "3e",
    label: "3e",
    description: "Préparation au brevet et transition vers le lycée.",
    status: "bientôt",
    href: "/college/3e",
  },
] as const;

const TRANSVERSAL_ITEMS = [
  {
    label: "Méthodologie collège",
    description:
      "Fiches méthode transversales pour structurer le travail personnel et les révisions au collège.",
  },
  {
    label: "Organisation",
    description:
      "Outils pour gérer son agenda, organiser ses cours et planifier ses révisions efficacement.",
  },
  {
    label: "Lecture de consigne",
    description:
      "Apprendre à analyser une consigne avant de répondre, pour éviter les hors-sujet.",
  },
  {
    label: "Révisions",
    description:
      "Méthodes de révision active : fiches, répétition espacée, entraînement aux évaluations.",
  },
  {
    label: "Oral",
    description:
      "Préparer et structurer une prise de parole en classe, un exposé ou un entretien.",
  },
] as const;

export default function RessourcesCollegePage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Collège", href: "/college" },
              { label: "Ressources" },
            ]}
          />
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(80,200,164,0.10),transparent_32%),linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Collège · 6e à 3e
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Ressources collège
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Des supports pour apprendre, s&apos;entraîner, s&apos;évaluer et progresser, de la 6e à la 3e.
          </p>
          <div className="mt-8">
            <Link
              href="/college"
              className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              ← Collège
            </Link>
          </div>
        </div>
      </section>

      {/* ── Niveaux ──────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Par niveau
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LEVELS.map((level) => (
              <Link
                key={level.slug}
                href={level.href}
                className="group flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-lg font-black text-foreground">
                    {level.label}
                  </span>
                  <PublicStatusBadge status={level.status} />
                </div>
                <p className="text-sm leading-6 text-muted">
                  {level.description}
                </p>
                <span className="mt-auto text-xs font-bold text-muted transition group-hover:text-foreground">
                  Voir le portail →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bloc transversal ─────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Transversal
          </p>
          <p className="mb-6 text-sm text-muted">
            Compétences communes à toutes les matières et tous les niveaux du collège.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRANSVERSAL_ITEMS.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="mb-2 font-bold text-foreground">{item.label}</p>
                <p className="text-sm leading-6 text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Note ressources en préparation ───────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-gold/25 bg-gold/[0.05] p-6 sm:p-8">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Ressources en préparation
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">
              Les ressources collège sont en cours de construction. Les documents seront
              ajoutés uniquement lorsqu&apos;ils seront finalisés. Aucun téléchargement ne
              sera proposé sans fichier réel disponible.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
