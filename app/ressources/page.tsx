import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { getClassroomResources } from "@/content/resources";
import { getPublicStatus } from "@/content/public-status";
import { ResourcesCatalog } from "./_components/resources-catalog";

export const metadata: Metadata = {
  title: "Ressources | Académie Kerboeuf",
  description:
    "Toutes les missions pédagogiques prêtes à projeter, imprimer ou corriger en classe.",
};

export default function RessourcesPage() {
  const resources = getClassroomResources().map((resource) => ({
    ...resource,
    status: getPublicStatus(resource.status),
  }));
  const projectionCount = resources.filter((resource) =>
    resource.modes.includes("projection"),
  ).length;
  const printCount = resources.filter((resource) =>
    resource.modes.includes("impression"),
  ).length;
  const correctionCount = resources.filter((resource) =>
    resource.modes.includes("correction"),
  ).length;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Ressources" }]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.06),rgba(9,16,15,0.94))]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Tableau enseignant
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
              Ressources prêtes pour la classe
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              Retrouver rapidement les missions à projeter, imprimer et corriger
              pour lancer une séance sans chercher dans chaque niveau.
            </p>
          </div>

          <div className="rounded-md border border-white/12 bg-panel/72 p-5 shadow-2xl shadow-black/35">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Disponibilité classe
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <Metric value={projectionCount} label="à projeter" />
              <Metric value={printCount} label="à imprimer" />
              <Metric value={correctionCount} label="corrigées" />
            </div>
          </div>
        </div>
      </section>

      <ResourcesCatalog resources={resources} />

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-md border border-white/10 bg-white/[0.035] p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
            Continuer dans l&apos;Académie
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/parcours"
              className="rounded-md bg-gold px-5 py-3 text-sm font-black text-ink transition hover:bg-gold/90"
            >
              Parcours progressifs
            </Link>
            <Link
              href="/missions-recentes"
              className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
            >
              Missions récentes
            </Link>
            <Link
              href="/programmes"
              className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
            >
              Programmes
            </Link>
          </div>
        </div>
      </section>
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
