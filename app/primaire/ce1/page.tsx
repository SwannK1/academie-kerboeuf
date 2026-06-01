import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { ce1LearningTree } from "@/content/levels/ce1-learning-tree";

export const metadata: Metadata = {
  title: "CE1 — Cycle 2 | Académie Kerboeuf",
  description:
    "Page niveau CE1 : matières, domaines et séquences-compétences du Cycle 2, guidées par Gaston le Hérisson.",
};

export default function Ce1Page() {
  const domainCount = ce1LearningTree.domains.length;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CE1" },
            ]}
          />
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(80,200,164,0.10),transparent_32%),linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-sky/35 bg-sky/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-sky">
            Cycle 2 · Guide : Gaston le Hérisson
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            CE1 — Choisir une stratégie<br className="hidden sm:block" /> et l&apos;expliquer
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            En CE1, Gaston accompagne la consolidation de la lecture, de l&apos;écriture
            et du raisonnement. Les séquences-compétences structurent les apprentissages
            en {domainCount} grandes matières du Cycle 2.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/primaire/ce1/matieres"
              className="rounded-md border border-sky/35 bg-sky/10 px-5 py-3 text-sm font-bold text-sky transition hover:bg-sky hover:text-ink"
            >
              Explorer les matières CE1
            </Link>
            <Link
              href="/primaire"
              className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              ← Primaire
            </Link>
          </div>
        </div>
      </section>

      {/* ── Navigation rapide ────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Accès direct
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/primaire/ce1/matieres"
              className="rounded-md border border-sky/25 bg-sky/[0.05] px-4 py-2.5 text-sm font-bold text-sky transition hover:bg-sky/[0.09]"
            >
              Matières CE1
            </Link>
            <Link
              href="/primaire/ce1/lecons"
              className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              Leçons disponibles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
