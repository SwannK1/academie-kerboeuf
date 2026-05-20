import type { Metadata } from "next";
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
    return { title: "Missions introuvables | Académie Kerboeuf" };
  }

  return {
    title: `Missions ${level.label} | Académie Kerboeuf`,
    description: `Catalogue de missions pédagogiques pour le niveau ${level.label}.`,
  };
}

export default async function PrimaireLevelMissionsPage({ params }: PageProps) {
  const { level: levelSlug } = await params;
  const level = getAcademyLevel("primaire", levelSlug);

  if (!level || level.slug === "cm2") {
    notFound();
  }

  return <LevelMissions level={level} />;
}
