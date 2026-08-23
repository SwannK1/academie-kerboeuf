import type { Metadata } from "next";
import { buildPageMetadata } from "@/content/seo";
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
    return buildPageMetadata({
      title: "Niveau introuvable",
      description: "Ce niveau n'est pas publié dans le portail lycée.",
      path: "/lycee",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: level.label,
    description: level.description,
    path: `/lycee/${levelSlug}`,
  });
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
