import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LevelMissions } from "@/components/academy/level-missions";
import { getAcademyLevel, getLevelsByStage } from "@/content/academy";
import { buildPageMetadata } from "@/lib/seo";

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
    return { title: "Missions introuvables", robots: { index: false, follow: false } };
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
