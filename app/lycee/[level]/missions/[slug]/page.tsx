import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { MissionUnavailableNotice } from "@/components/academy/mission-unavailable-notice";
import { SharedMissionDetail } from "@/components/academy/shared-mission-detail";
import {
  getAcademyMission,
  getAcademyMissionParams,
  isMissionReadyForDetail,
} from "@/content/academy";
import { getLearningPathsWithSteps } from "@/content/learning-paths";
import {
  getPublicAcademyLevel,
  getPublicAcademyMission,
} from "@/content/public-academy";
import { getLyceeLevelStatus } from "@/content/levels/lycee-statuses";
import { getPublicStatusKey } from "@/content/public-status";

type PageProps = {
  params: Promise<{ level: string; slug: string }>;
};

export function generateStaticParams() {
  return getAcademyMissionParams("lycee");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { level: levelSlug, slug } = await params;
  const academyMission = getAcademyMission("lycee", levelSlug, slug);

  if (!academyMission) {
    return { title: "Mission introuvable | Académie Kerboeuf" };
  }

  const levelStatus = getLyceeLevelStatus(levelSlug);
  const isUpcoming = getPublicStatusKey(levelStatus) === "upcoming";

  if (isUpcoming) {
    return {
      title: "Mission en préparation | Académie Kerboeuf",
      description:
        "Cette mission sera publiée lorsque le niveau lycée sera prêt avec ses matières, domaines et ressources associées.",
    };
  }

  const { mission } = academyMission;

  return {
    title: `${mission.title} | Académie Kerboeuf`,
    description: mission.description,
  };
}

export default async function LyceeMissionDetailPage({ params }: PageProps) {
  const { level: levelSlug, slug } = await params;
  const academyMission = getAcademyMission("lycee", levelSlug, slug);

  if (!academyMission) {
    notFound();
  }

  const { level, mission } = academyMission;

  const levelStatus = getLyceeLevelStatus(levelSlug);
  const isUpcoming = getPublicStatusKey(levelStatus) === "upcoming";

  if (isUpcoming) {
    const missionsHref = `/lycee/${levelSlug}/missions`;
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
                { label: "Missions", href: missionsHref },
                { label: "Mission" },
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
              Mission en préparation
            </h1>
          </div>
        </section>

        <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-8">
              <h2 className="text-xl font-black text-foreground">
                Mission en préparation
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                Cette mission est prévue dans l&rsquo;architecture Académie
                Kerboeuf. Elle sera publiée lorsque le niveau sera prêt avec
                ses matières, domaines et ressources associées.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={missionsHref}
                  className="rounded-md bg-jade px-4 py-3 text-sm font-bold text-ink transition hover:bg-jade/80"
                >
                  ← Retour aux missions du niveau
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

  if (!isMissionReadyForDetail(mission)) {
    return <MissionUnavailableNotice level={level} mission={mission} />;
  }

  const publicLevel = getPublicAcademyLevel(level);
  const publicMission = getPublicAcademyMission(mission);

  const relatedPaths = getLearningPathsWithSteps()
    .filter((path) =>
      path.steps.some((step) => step.href === `/lycee/${levelSlug}/missions/${slug}`),
    )
    .map((path) => ({
      slug: path.slug,
      title: path.title,
      estimatedDuration: path.estimatedDuration,
    }));

  return (
    <SharedMissionDetail
      level={publicLevel}
      mission={publicMission}
      relatedPaths={relatedPaths}
    />
  );
}
