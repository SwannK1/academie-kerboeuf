import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { LevelCard } from "@/components/academy/level-card";
import type { AcademyLevel, AcademyStage } from "@/content/academy";
import { stageLabels } from "@/content/academy";

type LevelHubProps = {
  stage: AcademyStage;
  title: string;
  description: string;
  levels: AcademyLevel[];
};

export function LevelHub({ stage, title, description, levels }: LevelHubProps) {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: stageLabels[stage] }]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-30" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.08),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Aile {stageLabels[stage]}
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            {description}
          </p>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-3">
          {levels.map((level) => (
            <LevelCard key={level.slug} level={level} />
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-md border border-white/10 bg-white/[0.035] p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
            Continuer dans l&apos;Académie
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/ressources"
              className="rounded-md bg-gold px-5 py-3 text-sm font-black text-ink transition hover:bg-gold/90"
            >
              Toutes les ressources
            </Link>
            <Link
              href="/parcours"
              className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
            >
              Parcours progressifs
            </Link>
            <Link
              href="/professeurs"
              className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
            >
              Les professeurs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
