import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";

export const metadata: Metadata = {
  title: "Espace enseignant — Académie Kerboeuf",
  description:
    "Des repères simples pour préparer une séance, organiser une période et utiliser les fiches en classe avec Académie Kerboeuf.",
};

const PREPARATION_STEPS = [
  {
    title: "Choisir le niveau",
    description: "Sélectionner la classe concernée (de la maternelle au lycée).",
  },
  {
    title: "Choisir la matière",
    description: "Repérer le domaine pédagogique correspondant à la séance.",
  },
  {
    title: "Choisir la notion",
    description: "Identifier la notion ou le sous-domaine à travailler.",
  },
  {
    title: "Utiliser les feuilles disponibles",
    description: "Récupérer les fiches proposées pour cette notion, selon leur statut.",
  },
] as const;

const SHEET_FORMAT = [
  {
    title: "Feuille 1",
    description: "Situation initiale, mini-leçon, automatismes.",
  },
  {
    title: "Feuille 2",
    description: "Application, consolidation, raisonnement.",
  },
  {
    title: "Feuille 3",
    description: "Évaluation courte.",
  },
] as const;

const DIFFERENTIATION_LEVELS = [
  {
    title: "Guidage fort",
    description: "Pour les élèves qui ont besoin d'un accompagnement étape par étape.",
  },
  {
    title: "Guidage moyen",
    description: "Pour les élèves qui peuvent avancer avec quelques repères.",
  },
  {
    title: "Autonomie",
    description: "Pour les élèves capables de travailler seuls sur la notion.",
  },
] as const;

const STATUS_EXAMPLES = [
  { label: "Disponible", status: "disponible" },
  { label: "En préparation", status: "en construction" },
  { label: "À venir", status: "bientôt" },
] as const;

export default function EspaceEnseignantPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Espace enseignant" }]} />

      <section className="mt-8 mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Espace enseignant
        </h1>
        <p className="mt-3 text-lg text-muted">
          Des repères simples pour préparer une séance, organiser une
          période et utiliser les fiches en classe.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground">
          Préparer une séance
        </h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-2" role="list">
          {PREPARATION_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <p className="text-sm font-bold text-gold">
                Étape {index + 1}
              </p>
              <p className="mt-1 text-base font-bold text-foreground">
                {step.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground">
          Comprendre le format des fiches
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          Chaque notion peut s&apos;appuyer sur un même modèle en trois
          feuilles :
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3" role="list">
          {SHEET_FORMAT.map((sheet) => (
            <li
              key={sheet.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <p className="text-base font-bold text-foreground">
                {sheet.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                {sheet.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground">
          Organiser sa période
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          Pour répartir les notions sur une période, consultez les
          ressources organisées par niveau.
        </p>
        <Link
          href="/primaire/ressources"
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-gold hover:text-gold"
        >
          Voir les ressources par niveau →
        </Link>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground">Différencier</h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          Les fiches peuvent être utilisées à différents niveaux
          d&apos;accompagnement :
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3" role="list">
          {DIFFERENTIATION_LEVELS.map((level) => (
            <li
              key={level.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <p className="text-base font-bold text-foreground">
                {level.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                {level.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground">
          Vérifier la disponibilité
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          Avant une séance, vérifiez toujours le statut des ressources :
        </p>
        <ul className="mt-4 flex flex-wrap gap-3" role="list">
          {STATUS_EXAMPLES.map((example) => (
            <li key={example.label} className="flex items-center gap-2">
              <PublicStatusBadge status={example.status} />
            </li>
          ))}
        </ul>
      </section>

      <nav className="mt-12 flex flex-wrap gap-4" aria-label="Liens connexes">
        <Link
          href="/primaire"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-muted transition hover:text-foreground"
        >
          ← Retour au primaire
        </Link>
      </nav>
    </main>
  );
}
