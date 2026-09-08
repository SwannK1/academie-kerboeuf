import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeacherHubPage } from "@/components/teacher-dashboard/TeacherHubPage";
import { buildPageMetadata } from "@/content/seo";
import { getTeacherHub, teacherHubs } from "@/content/teacher-hubs";

type PageProps = {
  params: Promise<{ hub: string }>;
};

export function generateStaticParams() {
  return teacherHubs.map((hub) => ({ hub: hub.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { hub: slug } = await params;
  const hub = getTeacherHub(slug);

  if (!hub) {
    return buildPageMetadata({
      title: "Parcours enseignant introuvable",
      description: "Ce parcours de préparation n’existe pas.",
      path: "/enseignants",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: hub.title,
    description: hub.shortDescription,
    path: `/enseignants/${hub.slug}`,
  });
}

export default async function TeacherHubRoute({ params }: PageProps) {
  const { hub: slug } = await params;
  const hub = getTeacherHub(slug);

  if (!hub) notFound();

  return <TeacherHubPage hub={hub} />;
}
