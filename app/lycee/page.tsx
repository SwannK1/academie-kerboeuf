import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import {
  getLyceeLevelStatus,
  type LyceeLevelSlug,
} from "@/content/levels/lycee-statuses";
import { getPublicStatusKey } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Lycée | Académie Kerboeuf",
  description:
    "L’aile lycée de l’Académie Kerboeuf, de la Seconde à la Terminale.",
};

const lyceeLevels: {
  slug: LyceeLevelSlug;
  label: string;
  href: string;
  description: string;
  cta: string;
}[] = [
  {
    slug: "seconde",
    label: "Seconde",
    href: "/lycee/seconde",
    description:
      "Construire les méthodes et consolider les disciplines du lycée.",
    cta: "Entrer en Seconde",
  },
  {
    slug: "premiere",
    label: "Première",
    href: "/lycee/premiere",
    description:
      "Préparer les spécialités, les méthodes d’analyse et les épreuves à venir.",
    cta: "Entrer en Première",
  },
  {
    slug: "terminale",
    label: "Terminale",
    href: "/lycee/terminale",
    description:
      "Organiser la préparation au baccalauréat et à l’orientation.",
    cta: "Entrer en Terminale",
  },
];

export default function LyceePage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Lycée" }]} />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-6xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Seconde · Première · Terminale
          </p>
          <h1 className="mt-6 text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Lycée
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Trois niveaux structurés progressivement autour des méthodes, des
            disciplines et des compétences attendues.
          </p>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
              Niveaux
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground">
              Choisir un niveau
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {lyceeLevels.map((level) => {
              const status = getLyceeLevelStatus(level.slug);
              const isLinked = getPublicStatusKey(status) !== "upcoming";

              const cardContent = (
                <div
                  className={`flex h-full flex-col rounded-md border p-6 transition ${
                    isLinked
                      ? "group border-white/10 bg-white/[0.045] hover:-translate-y-0.5 hover:border-jade/30 hover:bg-white/[0.065]"
                      : "border-white/10 bg-white/[0.025] opacity-60"
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-2xl font-black text-foreground">
                      {level.label}
                    </h3>
                    <div className="max-w-full sm:shrink-0">
                      <PublicStatusBadge
                        status={status}
                        className="max-w-full whitespace-normal text-center leading-tight sm:whitespace-nowrap"
                      />
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted">
                    {level.description}
                  </p>
                  {isLinked ? (
                    <span className="mt-6 text-sm font-black text-jade transition group-hover:translate-x-1">
                      {level.cta} →
                    </span>
                  ) : (
                    <span className="mt-6 inline-flex w-full justify-center rounded border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-center text-xs font-bold leading-snug text-muted sm:w-fit">
                      Préparation en cours
                    </span>
                  )}
                </div>
              );

              if (isLinked) {
                return (
                  <Link key={level.href} href={level.href}>
                    {cardContent}
                  </Link>
                );
              }
              return (
                <div
                  key={level.href}
                  aria-disabled="true"
                  aria-label={`${level.label} — en préparation`}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
