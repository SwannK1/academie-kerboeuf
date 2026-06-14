import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";

export const metadata: Metadata = {
  title: "Félix le lynx | Académie Kerboeuf",
  description: "Félix, guide du CM2 : accès rapide aux ressources CM2.",
};

const RESOURCES = [
  {
    title: "Français CM2",
    text: "Fiches de leçon, consolidation et évaluation, par notion.",
    href: "/primaire/cm2/fiches/francais",
    status: "available" as const,
  },
  {
    title: "Mathématiques CM2",
    text: "Fiches de leçon, consolidation et évaluation, par notion.",
    href: "/primaire/cm2/fiches/mathematiques",
    status: "available" as const,
  },
  {
    title: "Autres matières",
    text: "Histoire-géographie, sciences et plus encore.",
    status: "in-progress" as const,
  },
];

const METHODE = ["Observer", "Comprendre", "S'entraîner", "Vérifier", "Progresser"];

export default function FelixPage() {
  return (
    <main className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Personnages", href: "/personnages" },
            { label: "Félix" },
          ]}
        />

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="mt-6">
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Guide du CM2
          </p>
          <h1 className="mt-6 text-4xl font-black text-foreground sm:text-5xl">
            Félix le lynx
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            Félix aide les élèves à s&apos;entraîner, vérifier leurs stratégies
            et progresser en CM2.
          </p>
        </section>

        {/* ── Ressources CM2 ────────────────────────────────────────────── */}
        <section className="mt-12">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Accéder aux ressources CM2
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {RESOURCES.map((resource) =>
              resource.href ? (
                <Link
                  key={resource.title}
                  href={resource.href}
                  className="group flex min-h-44 flex-col justify-between rounded-md border border-jade/30 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-jade/55 hover:bg-jade/[0.09] focus:outline-none focus:ring-2 focus:ring-gold/60"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-black text-foreground">{resource.title}</h3>
                      <PublicStatusBadge status={resource.status} />
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted">{resource.text}</p>
                  </div>
                  <span className="mt-4 inline-flex text-sm font-black text-jade transition group-hover:translate-x-1">
                    Voir les fiches →
                  </span>
                </Link>
              ) : (
                <div
                  key={resource.title}
                  className="flex min-h-44 flex-col justify-between rounded-md border border-white/10 bg-white/[0.025] p-6"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-black text-foreground">{resource.title}</h3>
                      <PublicStatusBadge status={resource.status} />
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted">{resource.text}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* ── Méthode de Félix ──────────────────────────────────────────── */}
        <section className="mt-12 border-t border-white/10 pt-8">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Méthode de Félix
          </h2>
          <div className="flex flex-wrap gap-3">
            {METHODE.map((step, index) => (
              <span
                key={step}
                className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-foreground"
              >
                {index + 1}. {step}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
