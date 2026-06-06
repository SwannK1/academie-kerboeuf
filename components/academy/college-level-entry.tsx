import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import type { AcademyLevel } from "@/content/academy";
import { getCollegeMatiereCards } from "@/content/college-curriculum";
import { getPublicStatusKey } from "@/content/public-status";

type Props = {
  level: AcademyLevel;
};

export function CollegeLevelEntry({ level }: Props) {
  const slug = level.slug;
  const matiereCards = getCollegeMatiereCards(slug);

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Collège", href: "/college" },
              { label: level.label },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Collège · {level.cycle}
          </p>
          <h1 className="mt-6 text-6xl font-black leading-[0.95] text-foreground sm:text-7xl">
            {level.label}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Un espace pour retrouver les matières, les missions et les ressources
            du niveau {level.label}.
          </p>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.22em] text-jade">
            Matières et accès du niveau
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {matiereCards.map((matiere) => {
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

          {matiereCards.length === 0 && (
            <div className="mt-6 rounded-md border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                Contenu en préparation
              </p>
              <p className="mt-1 text-sm leading-6 text-muted">
                Les matières de ce niveau sont en cours de structuration.
                Aucun lien n&apos;est affiché tant que la ressource
                n&apos;existe pas.
              </p>
            </div>
          )}
        </div>
      </section>

      {slug === "6e" && (
        <section className="px-4 pb-8 pt-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.22em] text-jade">
              Accompagnement
            </p>
            <Link
              href="/college/6e/accompagnement"
              className="group inline-flex flex-col rounded-md border border-jade/30 bg-jade/[0.05] p-6 transition hover:-translate-y-0.5 hover:border-jade/50 hover:bg-jade/[0.09]"
            >
              <span className="text-xl font-black text-foreground">
                Accompagnement 6e
              </span>
              <span className="mt-3 text-sm leading-7 text-muted">
                Accéder aux ressources, méthodes et parcours pour réussir
                l&apos;entrée au collège.
              </span>
              <span className="mt-6 inline-flex text-sm font-black text-jade transition group-hover:translate-x-1">
                Entrer →
              </span>
            </Link>
          </div>
        </section>
      )}

      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/college"
            className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
          >
            ← Retour Collège
          </Link>
        </div>
      </section>
    </main>
  );
}
