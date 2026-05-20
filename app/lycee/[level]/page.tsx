import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LyceeLevelEntry } from "@/components/academy/lycee-level-entry";
import { getAcademyLevel, getLevelsByStage } from "@/content/academy";
import { getLyceeLevelStatus } from "@/content/levels/lycee-statuses";

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
    return { title: "Niveau introuvable | Académie Kerboeuf" };
  }

  return {
    title: `${level.label} | Académie Kerboeuf`,
    description: level.description,
  };
}

export default async function LyceeLevelPage({ params }: PageProps) {
  const { level: levelSlug } = await params;
  const level = getAcademyLevel("lycee", levelSlug);

  if (!level) {
    notFound();
  }

  const levelStatus = getLyceeLevelStatus(levelSlug);

  return <LyceeLevelEntry level={level} status={levelStatus} />;
}
