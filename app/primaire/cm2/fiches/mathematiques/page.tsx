import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  cm2MathsFiches,
  getCm2MathsFichesByDomain,
  CM2_MATHS_DOMAINS,
  type Cm2MathsNotion,
  type FicheType,
} from "@/content/cm2-mathematiques-fiches";

export const metadata: Metadata = {
  title: "Catalogue complet des fiches Mathématiques CM2 | Académie Kerboeuf",
  description:
    "Toutes les fiches pédagogiques Mathématiques CM2 : nombres, calcul, grandeurs et mesures, espace et géométrie, données.",
};

const FICHE_TYPE_COLORS: Record<FicheType, string> = {
  f1: "border-gold/40 bg-gold/10 text-gold hover:bg-gold/20",
  f2: "border-jade/40 bg-jade/10 text-jade hover:bg-jade/20",
  f3: "border-sky/40 bg-sky/10 text-sky hover:bg-sky/20",
  evaluation: "border-ember/40 bg-ember/10 text-ember hover:bg-ember/20",
};

const DOMAIN_ACCENT: Record<string, string> = {
  Nombres: "text-gold border-gold/35 bg-gold/10",
  Calcul: "text-jade border-jade/35 bg-jade/10",
  "Grandeurs et mesures": "text-sky border-sky/35 bg-sky/10",
  "Espace et géométrie": "text-ember border-ember/35 bg-ember/10",
  Données: "text-gold border-gold/35 bg-gold/10",
};

function NotionCard({ notion }: { notion: Cm2MathsNotion }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="mb-3 text-sm font-bold text-foreground">{notion.title}</p>
      <div className="flex flex-wrap gap-1.5">
        {notion.fiches.map((fiche) => (
          <a
            key={fiche.type}
            href={fiche.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center rounded border px-2.5 py-1 text-xs font-bold transition ${FICHE_TYPE_COLORS[fiche.type]}`}
          >
            {fiche.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function FichesMathematiquesPage() {
  const total = cm2MathsFiches.length;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CM2", href: "/primaire/cm2" },
              { label: "Matières", href: "/primaire/cm2/matieres" },
              { label: "Mathématiques", href: "/primaire/cm2/matieres/mathematiques" },
              { label: "Fiches" },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.03),rgba(9,16,15,0.95))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Mathématiques · CM2
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Fiches Mathématiques CM2
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            {total} notions · nombres, calcul, grandeurs et mesures, espace et
            géométrie, données. Chaque fiche s&apos;ouvre en plein écran.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded border border-gold/40 bg-gold/10 px-2.5 py-1 text-xs font-bold text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              F1 — Leçon / découverte
            </span>
            <span className="inline-flex items-center gap-1.5 rounded border border-jade/40 bg-jade/10 px-2.5 py-1 text-xs font-bold text-jade">
              <span className="h-1.5 w-1.5 rounded-full bg-jade" />
              F2 — Entraînement
            </span>
            <span className="inline-flex items-center gap-1.5 rounded border border-sky/40 bg-sky/10 px-2.5 py-1 text-xs font-bold text-sky">
              <span className="h-1.5 w-1.5 rounded-full bg-sky" />
              F3 — Approfondissement
            </span>
            <span className="inline-flex items-center gap-1.5 rounded border border-ember/40 bg-ember/10 px-2.5 py-1 text-xs font-bold text-ember">
              <span className="h-1.5 w-1.5 rounded-full bg-ember" />
              Évaluation
            </span>
          </div>
          <div className="mt-8">
            <Link
              href="/primaire/cm2/matieres/mathematiques"
              className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              ← Retour Mathématiques CM2
            </Link>
          </div>
        </div>
      </section>

      {CM2_MATHS_DOMAINS.map((domain) => {
        const notions = getCm2MathsFichesByDomain(domain);
        if (notions.length === 0) return null;
        const accentClass = DOMAIN_ACCENT[domain] ?? "text-gold border-gold/35 bg-gold/10";

        return (
          <section
            key={domain}
            className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-6 flex items-baseline gap-3">
                <span
                  className={`inline-flex rounded-md border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] ${accentClass}`}
                >
                  {domain}
                </span>
                <span className="text-xs text-muted">
                  {notions.length} notion{notions.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {notions.map((notion) => (
                  <NotionCard key={notion.slug} notion={notion} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Aller plus loin
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/primaire/cm2/matieres/mathematiques"
              className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              ← Mathématiques CM2
            </Link>
            <Link
              href="/primaire/cm2/matieres"
              className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              Toutes les matières
            </Link>
            <Link
              href="/primaire/cm2/missions"
              className="rounded-md border border-gold/35 bg-gold/10 px-4 py-2.5 text-sm font-bold text-gold transition hover:bg-gold/20"
            >
              Missions CM2
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}