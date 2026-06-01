import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectDetailPage } from "@/components/academy/SubjectMatterCatalog";
import { cpSubjects, getCpSubjectBySlug } from "@/content/cp-subjects";
import { getCpSubjectTree, getCpSequences } from "@/content/levels/cp-learning-tree";
import { CP_ACCENT } from "@/lib/cp-accent";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cpSubjects.map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const subject = getCpSubjectBySlug(slug);
  if (!subject) return { title: "Matière introuvable | Académie Kerboeuf" };
  return {
    title: `${subject.title} CP | Académie Kerboeuf`,
    description: subject.shortDescription,
  };
}

export default async function CpSubjectPage({ params }: PageProps) {
  const { slug } = await params;
  const subject = getCpSubjectBySlug(slug);

  if (!subject) notFound();

  const resolvedSubject = subject as NonNullable<typeof subject>;
  const tree = getCpSubjectTree(slug);
  const sequences = getCpSequences(slug);

  return (
    <SubjectDetailPage
      levelLabel="CP"
      levelHref="/primaire/cp"
      subjectsHref="/primaire/cp/matieres"
      subject={resolvedSubject}
      tree={tree}
      accent={CP_ACCENT}
      sequences={sequences}
      cycleLabel="Cycle 2"
      footerLinks={[
        { href: "/primaire/cp/programmes/francais/lecture-comprehension", label: "Lecture-compréhension CP", tone: "gold" },
      ]}
    />
  );
}
