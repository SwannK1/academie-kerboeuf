import type { Metadata } from "next";
import { buildPageMetadata } from "@/content/seo";
import { notFound } from "next/navigation";
import { PrimaireLevelEntry } from "@/components/academy/primaire-level-entry";
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
      title: "Niveau introuvable",
      description: "Ce niveau n'est pas publié dans le portail primaire.",
      path: "/primaire",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: level.label,
    description: level.description,
    path: `/primaire/${levelSlug}`,
  });
}

export default async function PrimaireLevelPage({ params }: PageProps) {
  const { level: levelSlug } = await params;
  const level = getAcademyLevel("primaire", levelSlug);

  if (!level || level.slug === "cm2") {
    notFound();
  }

  return <PrimaireLevelEntry level={level} />;
}
