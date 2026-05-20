import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { sixiemeMatieres } from "@/content/levels/college/6e-curriculum";
import { getPublicStatusKey } from "@/content/public-status";

export const metadata: Metadata = {
  title: "6e | Académie Kerboeuf",
  description:
    "Portail 6e : retrouvez les matières, les compétences et les ressources du niveau 6e — Français, Mathématiques, Histoire-Géographie-EMC.",
};

export default function SixiemePage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Collège", href: "/college" },
              { label: "6e" },
            ]}
          />
        </div>
      </div>

      {/* ── En-tête ── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Collège · Cycle 3
          </p>
          <h1 className="mt-6 text-6xl font-black leading-[0.95] text-foreground sm:text-7xl">
            6e
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Un espace pour retrouver les matières, les compétences et les
            ressources du niveau 6e.
          </p>
        </div>
      </section>

      {/* ── Matières ── */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.22em] text-jade">
            Matières du niveau
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sixiemeMatieres.map((matiere) => {
              const isLinked =
                !!matiere.href &&
                getPublicStatusKey(matiere.status) !== "upcoming";

              const cardContent = (
                <div
                  className={`group flex h-full flex-col rounded-md border p-6 transition ${
                    isLinked
                      ? "border-jade/30 bg-jade/[0.05] hover:-translate-y-0.5 hover:border-jade/50 hover:bg-jade/[0.09]"
                      : "border-white/10 bg-white/[0.025] opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-xl font-black text-foreground">
                      {matiere.label}
                    </h2>
                    <div className="shrink-0">
                      <PublicStatusBadge status={matiere.status} />
                    </div>
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                    {matiere.description}
                  </p>

                  {isLinked ? (
                    <span className="mt-6 inline-flex text-sm font-black text-jade transition group-hover:translate-x-1">
                      Entrer →
                    </span>
                  ) : (
                    <span className="mt-6 inline-flex w-fit rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-muted">
                      À venir
                    </span>
                  )}
                </div>
              );

              if (isLinked) {
                return (
                  <Link
                    key={matiere.slug}
                    href={matiere.href!}
                    aria-label={`Entrer en ${matiere.label}`}
                  >
                    {cardContent}
                  </Link>
                );
              }
              return (
                <div
                  key={matiere.slug}
                  aria-label={`${matiere.label} — à venir`}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Navigation retour ── */}
      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/college"
              className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
            >
              ← Retour Collège
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
