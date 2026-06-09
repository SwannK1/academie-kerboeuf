import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import {
  cm2MathDomains,
  getCm2MathNotionsByDomain,
  type Cm2MathFicheNotion,
  type Cm2MathDomain,
} from "@/content/cm2-mathematiques-fiches";
import { getPublicStatusKey } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Fiches mathématiques CM2 | Académie Kerboeuf",
  description:
    "108 fiches imprimables CM2 mathématiques organisées par domaine : nombres et calcul, géométrie, grandeurs et mesures, données.",
};

const SHEET_SHORT: Record<string, string> = {
  f1: "Feuille 1",
  f2: "Feuille 2",
  f3: "Feuille 3",
};

export default function Cm2FichesMathematiquesPage() {
  const totalNotions = cm2MathDomains.reduce(
    (acc, d) => acc + getCm2MathNotionsByDomain(d).length,
    0,
  );

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CM2", href: "/primaire/cm2" },
              { label: "Fiches mathématiques" },
            ]}
          />
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(243,196,91,0.14),transparent_34%),linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
            CM2 · Mathématiques · Fiches imprimables
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Fiches mathématiques<br className="hidden sm:block" /> CM2
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            {totalNotions} notions organisées par domaine. Chaque fiche est un
            support imprimable en trois feuilles : situation initiale et
            mini-leçon, exercices d&apos;application, évaluation courte.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/primaire/cm2"
              className="rounded-md border border-gold/35 bg-gold/10 px-5 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink"
            >
              ← Retour CM2
            </Link>
            <Link
              href="/primaire/cm2/matieres/mathematiques"
              className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Programme mathématiques
            </Link>
          </div>
        </div>
      </section>

      {/* ── Domaines ──────────────────────────────────────────────────────── */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-16">
          {cm2MathDomains.map((domain) => (
            <DomainSection key={domain.slug} domain={domain} />
          ))}
        </div>
      </section>
    </main>
  );
}

// ── Domaine ───────────────────────────────────────────────────────────────────

function DomainSection({ domain }: { domain: Cm2MathDomain }) {
  const notions = getCm2MathNotionsByDomain(domain);
  if (notions.length === 0) return null;

  const completeCount = notions.filter((n) => n.completeness === "complete").length;

  return (
    <div id={domain.slug}>
      <div className="mb-6 flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
            {domain.title}
          </p>
          <p className="mt-1 text-sm text-muted">
            {notions.length} notion{notions.length > 1 ? "s" : ""} —{" "}
            {completeCount} complète{completeCount > 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {notions.map((notion) => (
          <NotionCard key={notion.slug} notion={notion} />
        ))}
      </div>
    </div>
  );
}

// ── Carte notion ──────────────────────────────────────────────────────────────

function NotionCard({ notion }: { notion: Cm2MathFicheNotion }) {
  const isComplete = notion.completeness === "complete";

  return (
    <article className="flex flex-col gap-3 rounded-md border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/20 hover:bg-white/[0.06]">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold leading-5 text-foreground">
          {notion.title}
        </h3>
        {!isComplete && (
          <span className="shrink-0 rounded border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-400">
            Partielle
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {notion.sheets.map((sheet) => {
          const isAvailable =
            getPublicStatusKey(sheet.status) === "available" && sheet.href;
          return isAvailable ? (
            <a
              key={sheet.sheet}
              href={sheet.href}
              target="_blank"
              rel="noopener noreferrer"
              title={sheet.label}
              className="inline-flex items-center gap-1.5 rounded border border-gold/30 bg-gold/10 px-2.5 py-1 text-xs font-bold text-gold transition hover:border-gold/60 hover:bg-gold/20"
            >
              <span aria-hidden="true">↓</span>
              {SHEET_SHORT[sheet.sheet]}
            </a>
          ) : (
            <span
              key={sheet.sheet}
              title={sheet.label}
              className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-bold text-white/25"
              aria-label={`${sheet.label} — non disponible`}
            >
              <PublicStatusBadge status={sheet.status} />
              {SHEET_SHORT[sheet.sheet]}
            </span>
          );
        })}
      </div>
    </article>
  );
}
