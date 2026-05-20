import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { getLearningPathsWithSteps } from "@/content/learning-paths";
import { getPublicStatus } from "@/content/public-status";
import { LearningPathCatalog } from "./_components/learning-path-catalog";

export const metadata: Metadata = {
  title: "Parcours pédagogiques | Académie Kerboeuf",
  description:
    "Des parcours progressifs pour organiser les missions de l’Académie Kerboeuf en séquences de classe.",
};

export default function ParcoursPage() {
  const paths = getLearningPathsWithSteps();
  const publicPaths = paths.map((path) => ({
    ...path,
    status: getPublicStatus(path.status),
  }));
  const missionCount = paths.reduce((total, path) => total + path.steps.length, 0);

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Parcours" }]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(243,196,91,0.18),transparent_34%),linear-gradient(180deg,rgba(5,8,7,0.06),rgba(9,16,15,0.94))]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Progressions pédagogiques
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
              Parcours de missions
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              Organiser plusieurs missions en séquences progressives pour lire,
              raisonner, s’entraîner et préparer une classe pas à pas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/ressources"
                className="rounded-md bg-gold px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
              >
                Voir les ressources
              </Link>
              <Link
                href="/missions-recentes"
                className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
              >
                Missions récentes
              </Link>
            </div>
          </div>

          <div className="rounded-md border border-white/12 bg-panel/72 p-5 shadow-2xl shadow-black/35">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Vue d’ensemble
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Metric value={paths.length} label="parcours" />
              <Metric value={missionCount} label="missions reliées" />
            </div>
          </div>
        </div>
      </section>

      <LearningPathCatalog paths={publicPaths} />
    </main>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.04] p-4">
      <p className="font-mono text-3xl font-black text-gold">{value}</p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
    </div>
  );
}
