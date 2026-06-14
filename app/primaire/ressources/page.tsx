import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";

export const metadata: Metadata = {
  title: "Ressources primaire | Académie Kerboeuf",
  description:
    "Supports pédagogiques pour le primaire : leçons, exercices, évaluations, corrigés et méthodologie, par niveau.",
};

const LEVELS = [
  {
    slug: "cp",
    label: "CP",
    description: "Premiers pas en lecture, écriture et numération.",
    status: "disponible",
    href: "/primaire/cp",
  },
  {
    slug: "ce1",
    label: "CE1",
    description: "Consolidation de la lecture et du raisonnement mathématique.",
    status: "disponible",
    href: "/primaire/ce1",
  },
  {
    slug: "ce2",
    label: "CE2",
    description: "Approfondissement des compétences fondamentales du Cycle 2.",
    status: "en construction",
    href: "/primaire/ce2",
  },
  {
    slug: "cm1",
    label: "CM1",
    description: "Entrée dans le Cycle 3 : abstraction et autonomie.",
    status: "bientôt",
    href: "/primaire/cm1",
  },
  {
    slug: "cm2",
    label: "CM2",
    description: "Consolidation du Cycle 3 avant l'entrée au collège.",
    status: "bientôt",
    href: "/primaire/cm2",
  },
] as const;

const RESOURCE_TYPES = [
  {
    label: "Leçons courtes",
    description:
      "Une notion par fiche. Format compact, adapté à une séance courte ou une révision rapide.",
  },
  {
    label: "Exercices progressifs",
    description:
      "Des séries graduées pour s'entraîner après la leçon, du niveau découverte au niveau consolidation.",
  },
  {
    label: "Évaluations",
    description:
      "Des bilans de compétences par séquence, utilisables en classe ou en accompagnement.",
  },
  {
    label: "Corrigés enseignants",
    description:
      "Les corrigés complets des exercices et évaluations, réservés à l'usage pédagogique.",
  },
  {
    label: "Méthodologie",
    description:
      "Des fiches méthode pour aider les élèves à structurer leur démarche : lecture de consigne, vérification, raisonnement.",
  },
] as const;

export default function RessourcesPrimairePage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
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
            Primaire · CP au CM2
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Ressources primaire
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Des supports pour apprendre, s&apos;entraîner, s&apos;évaluer et progresser.
          </p>
          <div className="mt-8">
            <Link
              href="/primaire"
              className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              ← Primaire
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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

      {/* ── Types de ressources ───────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Types de ressources
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCE_TYPES.map((type) => (
              <div
                key={type.label}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="mb-2 font-bold text-foreground">{type.label}</p>
                <p className="text-sm leading-6 text-muted">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rappel ───────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-gold/25 bg-gold/[0.05] p-6 sm:p-8">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Note importante
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">
              Les documents seront ajoutés uniquement lorsqu&apos;ils seront finalisés.
              Aucun téléchargement ne sera proposé sans fichier réel disponible.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
