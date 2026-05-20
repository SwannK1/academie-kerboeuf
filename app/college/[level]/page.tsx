import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LevelOverview } from "@/components/academy/level-overview";
import { CollegeLevelEntry } from "@/components/academy/college-level-entry";
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
    return { title: "Niveau introuvable | Académie Kerboeuf" };
  }

  return {
    title: `${level.label} | Académie Kerboeuf`,
    description: level.description,
  };
}

export default async function CollegeLevelPage({ params }: PageProps) {
  const { level: levelSlug } = await params;
  const level = getAcademyLevel("college", levelSlug);

  if (!level) {
    notFound();
  }

  const COLLEGE_ENTRY_PORTAL_SLUGS = ["5e", "4e", "3e"];
  if (COLLEGE_ENTRY_PORTAL_SLUGS.includes(levelSlug)) {
    return <CollegeLevelEntry level={level} />;
  }

  return <LevelOverview level={level} />;
}
