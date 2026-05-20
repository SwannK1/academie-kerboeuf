import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { LevelMissions } from "@/components/academy/level-missions";
import { getAcademyLevel, getLevelsByStage } from "@/content/academy";
import { getLyceeLevelStatus } from "@/content/levels/lycee-statuses";
import { getPublicStatusKey } from "@/content/public-status";

type PageProps = {
  params: Promise<{ level: string }>;
};

export function generateStaticParams() {
  return getLevelsByStage("lycee").map((level) => ({ level: level.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { level: levelSlug } = await params;
  const level = getAcademyLevel("lycee", levelSlug);

  if (!level) {
    return { title: "Missions introuvables | Académie Kerboeuf" };
  }

  return {
    title: `Missions ${level.label} | Académie Kerboeuf`,
    description: `Catalogue de missions pédagogiques structurées pour le niveau ${level.label}.`,
  };
}

export default async function LyceeLevelMissionsPage({ params }: PageProps) {
  const { level: levelSlug } = await params;
  const level = getAcademyLevel("lycee", levelSlug);

  if (!level) {
    notFound();
  }

  const levelStatus = getLyceeLevelStatus(levelSlug);
  const isUpcoming = getPublicStatusKey(levelStatus) === "upcoming";

  if (isUpcoming) {
    const levelHref = `/lycee/${levelSlug}`;

    return (
      <main>
        <div className="px-4 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Breadcrumb
              items={[
                { label: "Accueil", href: "/" },
                { label: "Lycée", href: "/lycee" },
                { label: level.label, href: levelHref },
                { label: "Missions" },
              ]}
            />
          </div>
        </div>

        <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
          <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
                Lycée · {level.label}
              </p>
              <PublicStatusBadge status={levelStatus} />
            </div>
            <h1 className="mt-6 text-5xl font-black leading-[0.95] text-foreground sm:text-6xl">
              Missions — {level.label}
            </h1>
          </div>
        </section>

        <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-8">
              <h2 className="text-xl font-black text-foreground">
                Missions en préparation
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                Les missions de ce niveau sont prévues dans l&rsquo;architecture
                Académie Kerboeuf. Elles seront ajoutées progressivement avec
                les matières, domaines et ressources associées.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={levelHref}
                  className="rounded-md bg-jade px-4 py-3 text-sm font-bold text-ink transition hover:bg-jade/80"
                >
                  ← Retour au niveau {level.label}
                </Link>
                <Link
                  href="/lycee"
                  className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
                >
                  Retour au lycée
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return <LevelMissions level={level} />;
}
