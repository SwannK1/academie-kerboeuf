import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MissionUnavailableNotice } from "@/components/academy/mission-unavailable-notice";
import { SharedMissionDetail } from "@/components/academy/shared-mission-detail";
import {
  getAcademyMission,
  getAcademyMissionParams,
  isMissionPubliclyAvailable,
  isMissionReadyForDetail,
} from "@/content/academy";
import { getLearningPathsWithSteps } from "@/content/learning-paths";
import {
  getPublicAcademyLevel,
  getPublicAcademyMission,
} from "@/content/public-academy";

type PageProps = {
  params: Promise<{ level: string; slug: string }>;
};

export function generateStaticParams() {
  return getAcademyMissionParams("college");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { level: levelSlug, slug } = await params;
  const academyMission = getAcademyMission("college", levelSlug, slug);

  if (!academyMission) {
    return { title: "Mission introuvable | Académie Kerboeuf" };
  }

  const { mission } = academyMission;

  if (!isMissionPubliclyAvailable(mission)) {
    return { title: "Mission introuvable | Académie Kerboeuf" };
  }

  return {
    title: `${mission.title} | Académie Kerboeuf`,
    description: mission.description,
  };
}

export default async function CollegeMissionDetailPage({ params }: PageProps) {
  const { level: levelSlug, slug } = await params;
  const academyMission = getAcademyMission("college", levelSlug, slug);

  if (!academyMission) {
    notFound();
  }

  const { level, mission } = academyMission;

  if (!isMissionPubliclyAvailable(mission)) {
    notFound();
  }

  if (!isMissionReadyForDetail(mission)) {
    return <MissionUnavailableNotice level={level} mission={mission} />;
  }

  const publicLevel = getPublicAcademyLevel(level);
  const publicMission = getPublicAcademyMission(mission);

  const relatedPaths = getLearningPathsWithSteps()
    .filter((path) =>
      path.steps.some((step) => step.href === `/college/${levelSlug}/missions/${slug}`),
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
