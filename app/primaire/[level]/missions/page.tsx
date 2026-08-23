import type { Metadata } from "next";
import { buildPageMetadata } from "@/content/seo";
import { notFound } from "next/navigation";
import { LevelMissions } from "@/components/academy/level-missions";
import { getAcademyLevel, getLevelsByStage } from "@/content/academy";

type PageProps = {
  params: Promise<{ level: string }>;
};

export function generateStaticParams() {
  return getLevelsByStage("primaire")
    .filter((level) => level.slug !== "cm2")
    .map((level) => ({ level: level.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { level: levelSlug } = await params;
  const level = getAcademyLevel("primaire", levelSlug);

  if (!level) {
    return buildPageMetadata({
      title: "Missions introuvables",
      description: "Ce catalogue de missions n'est pas publié dans le portail primaire.",
      path: "/primaire",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `Missions ${level.label}`,
    description: `Catalogue de missions pédagogiques pour le niveau ${level.label}.`,
    path: `/primaire/${levelSlug}/missions`,
  });
}

export default async function PrimaireLevelMissionsPage({ params }: PageProps) {
  const { level: levelSlug } = await params;
  const level = getAcademyLevel("primaire", levelSlug);

  if (!level || level.slug === "cm2") {
    notFound();
  }

  return <LevelMissions level={level} />;
}
