import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { buildPageMetadata } from "@/content/seo";
import { getLevelsByStage, getLevelPath } from "@/content/academy";
import { getLevelAvailability } from "@/content/site-availability";
import type { AcademyLevelSlug } from "@/content/program-types";

export const metadata = buildPageMetadata({
  title: "Ressources",
  description: "Leçons, exercices et évaluations classés par niveau et matière.",
  path: "/ressources",
});

const secondaryStages = [
  { id: "maternelle", label: "Maternelle", href: "/maternelle", levels: "PS · MS · GS" },
  { id: "college", label: "Collège", href: "/college", levels: "6e · 5e · 4e · 3e" },
  { id: "lycee", label: "Lycée", href: "/lycee", levels: "Seconde · Première · Terminale" },
] as const;

export default function RessourcesPage() {
  const primaryLevels = getLevelsByStage("primaire");

  return (
    <main id="contenu-principal" className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Ressources" },
          ]}
        />

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-jade">
          Ressources pédagogiques
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
          Choisissez votre niveau
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          Vous choisirez ensuite une matière, une compétence, puis le PDF dont
          vous avez besoin.
        </p>

        <section aria-labelledby="niveaux-primaire" className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                Primaire
              </p>
              <h2 id="niveaux-primaire" className="mt-2 text-2xl font-black text-foreground">
                Du CP au CM2
              </h2>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {primaryLevels.map((level) => (
              <Link
                key={level.slug}
                href={getLevelPath(level)}
                className="group flex min-h-44 flex-col rounded-md border border-gold/30 bg-gold/[0.05] p-5 transition hover:-translate-y-0.5 hover:bg-gold/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-2xl font-black text-foreground">{level.label}</span>
                  <PublicStatusBadge
                    status={getLevelAvailability(level.slug as AcademyLevelSlug)}
                  />
                </div>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                  {level.cycle}
                </p>
                <span className="mt-4 text-sm font-black text-gold transition group-hover:translate-x-1">
                  Choisir une matière →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="autres-niveaux" className="mt-12 border-t border-white/10 pt-8">
          <h2 id="autres-niveaux" className="text-xl font-black text-foreground">
            Autres niveaux
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            Ces espaces restent accessibles selon l’avancement de leurs ressources.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {secondaryStages.map((stage) => (
              <Link
                key={stage.id}
                href={stage.href}
                className="rounded-md border border-white/12 bg-white/[0.035] p-5 transition hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <h3 className="text-lg font-black text-foreground">{stage.label}</h3>
                <p className="mt-2 text-sm text-muted">{stage.levels}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
