import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectDetailPage } from "@/components/academy/SubjectMatterCatalog";
import { ce1Subjects, getCe1SubjectBySlug } from "@/content/ce1-subjects";
import {
  getCe1SubjectTree,
  getCe1Sequences,
} from "@/content/levels/ce1-learning-tree";
import { CE1_ACCENT } from "@/lib/ce1-accent";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ce1Subjects.map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const subject = getCe1SubjectBySlug(slug);
  if (!subject) return { title: "Matière introuvable | Académie Kerboeuf" };
  return {
    title: `${subject.title} CE1 | Académie Kerboeuf`,
    description: subject.shortDescription,
  };
}

export default async function Ce1SubjectPage({ params }: PageProps) {
  const { slug } = await params;
  const subject = getCe1SubjectBySlug(slug);

  if (!subject) notFound();
  // notFound() throws, but TypeScript doesn't infer the type narrowing automatically
  const safeSubject = subject!;

  const tree = getCe1SubjectTree(slug);
  const sequences = getCe1Sequences(slug);

  return (
    <SubjectDetailPage
      levelLabel="CE1"
      levelHref="/primaire/ce1"
      subjectsHref="/primaire/ce1/matieres"
      subject={safeSubject}
      tree={tree}
      accent={CE1_ACCENT}
      sequences={sequences}
      footerLinks={[{ href: "/primaire/ce1/matieres", label: "Matières CE1" }]}
    />
  );
}
