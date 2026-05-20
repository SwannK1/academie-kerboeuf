import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LevelMissions } from "@/components/academy/level-missions";
import { getAcademyLevel, getLevelsByStage } from "@/content/academy";

type PageProps = {
  params: Promise<{ level: string }>;
};

export function generateStaticParams() {
  return getLevelsByStage("college").map((level) => ({ level: level.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { level: levelSlug } = await params;
  const level = getAcademyLevel("college", levelSlug);

  if (!level) {
    return { title: "Missions introuvables | Académie Kerboeuf" };
  }

  return {
    title: `Missions ${level.label} | Académie Kerboeuf`,
    description: `Catalogue de missions pédagogiques structurées pour le niveau ${level.label}.`,
  };
}

export default async function CollegeLevelMissionsPage({ params }: PageProps) {
  const { level: levelSlug } = await params;
  const level = getAcademyLevel("college", levelSlug);

  if (!level) {
    notFound();
  }

  return <LevelMissions level={level} />;
}
