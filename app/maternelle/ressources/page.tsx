import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Ressources maternelle | Académie Kerboeuf",
  description:
    "Des activités simples pour observer, manipuler, parler et grandir — ressources PS, MS et GS en préparation.",
};

const DOMAINS = [
  "Mobiliser le langage dans toutes ses dimensions",
  "Agir, s'exprimer, comprendre à travers l'activité physique",
  "Agir, s'exprimer, comprendre à travers les activités artistiques",
  "Acquérir les premiers outils mathématiques",
  "Explorer le monde",
];

const SECTIONS = [
  { slug: "ps", label: "Petite Section", short: "PS" },
  { slug: "ms", label: "Moyenne Section", short: "MS" },
  { slug: "gs", label: "Grande Section", short: "GS" },
] as const;

export default function MaternelleRessourcesPage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Maternelle", href: "/maternelle" },
              { label: "Ressources" },
            ]}
          />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Cycle 1
          </p>
          <h1 className="mt-6 text-5xl font-black leading-[0.95] text-foreground sm:text-6xl">
            Ressources maternelle
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Des activités simples pour observer, manipuler, parler et grandir.
          </p>
        </div>
      </section>

      {/* ── PS / MS / GS ── */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            {SECTIONS.map(({ slug, label, short }) => (
              <div
                key={slug}
                className="rounded-md border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded border border-jade/30 bg-jade/10 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-jade">
                    Cycle 1 · {short}
                  </span>
                  <PublicStatusBadge status="in-progress" />
                </div>

                <h2 className="mt-4 text-2xl font-black text-foreground">
                  {label}
                </h2>

                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  5 domaines
                </p>

                <ul className="mt-5 space-y-3">
                  {DOMAINS.map((domain) => (
                    <li key={domain} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-jade/40"
                      />
                      <div>
                        <p className="text-sm font-bold text-foreground/80">
                          {domain}
                        </p>
                        <p className="mt-0.5 text-xs text-muted">
                          Ateliers et grilles d&apos;observation en préparation
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rappel ── */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-md border border-white/10 bg-white/[0.025] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Rappel
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2.5 text-sm text-muted">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-white/25"
                />
                <span>
                  Les grilles d&apos;observation seront intégrées aux fiches ateliers.
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-white/25"
                />
                <span>
                  Les supports écran ne sont pas prioritaires — le geste et la manipulation priment en maternelle.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Retour ── */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/maternelle"
            className="inline-flex text-sm font-black text-jade transition hover:-translate-x-1"
          >
            ← Retour à la maternelle
          </Link>
        </div>
      </section>
    </main>
  );
}
