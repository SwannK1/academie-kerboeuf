import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  cm2MathDomains,
  getCm2MathNotionsByDomain,
} from "@/content/cm2-mathematiques-fiches";
import { FichesCatalogue } from "./_components/FichesCatalogue";

export const metadata: Metadata = {
  title: "Fiches mathématiques CM2 | Académie Kerboeuf",
  description:
    "108 fiches imprimables CM2 mathématiques organisées par domaine : nombres et calcul, géométrie, grandeurs et mesures, données.",
};

export default function Cm2FichesMathematiquesPage() {
  // Build the notions-by-domain map in the server component
  const notionsByDomain = Object.fromEntries(
    cm2MathDomains.map((d) => [d.slug, getCm2MathNotionsByDomain(d)]),
  );

  const totalNotions = Object.values(notionsByDomain).reduce(
    (acc, notions) => acc + notions.length,
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

      {/* ── Catalogue avec filtres ─────────────────────────────────────────── */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FichesCatalogue domains={cm2MathDomains} notionsByDomain={notionsByDomain} />
        </div>
      </section>
    </main>
  );
}
