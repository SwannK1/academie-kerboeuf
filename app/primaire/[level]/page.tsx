import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrimaireLevelEntry } from "@/components/academy/primaire-level-entry";
import { getAcademyLevel, getLevelsByStage } from "@/content/academy";

type PageProps = {
  params: Promise<{ level: string }>;
};

export function generateStaticParams() {
  return getLevelsByStage("primaire")
    .filter((level) => level.slug !== "cm2" && level.slug !== "cp")
    .map((level) => ({ level: level.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { level: levelSlug } = await params;
  const level = getAcademyLevel("primaire", levelSlug);

  if (!level) {
    return { title: "Niveau introuvable | Académie Kerboeuf" };
  }

  return {
    title: `${level.label} | Académie Kerboeuf`,
    description: level.description,
  };
}

export default async function PrimaireLevelPage({ params }: PageProps) {
  const { level: levelSlug } = await params;
  const level = getAcademyLevel("primaire", levelSlug);

  if (!level || level.slug === "cm2" || level.slug === "cp") {
    notFound();
  }

  return <PrimaireLevelEntry level={level} />;
}
