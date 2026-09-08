import type { Metadata } from "next";
import { buildPageMetadata } from "@/content/seo";
import { notFound } from "next/navigation";
import { SubjectDetailPage } from "@/components/academy/SubjectMatterCatalog";
import { cpSubjects, getCpSubjectBySlug } from "@/content/cp-subjects";
import { getCpSubjectTree } from "@/content/levels/cp-learning-tree";
import { CP_ACCENT } from "@/lib/cp-accent";
import { getPublishedSubdomainPagesForDomain } from "@/content/levels/published-subdomain-pages";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cpSubjects.map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const subject = getCpSubjectBySlug(slug);
  if (!subject) {
    return buildPageMetadata({
      title: "Matière introuvable",
      description: "Cette matière n'est pas publiée dans le catalogue public.",
      path: "/primaire/cp/matieres",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${subject.title} CP`,
    description: subject.shortDescription,
    path: `/primaire/cp/matieres/${slug}`,
  });
}

export default async function CpSubjectPage({ params }: PageProps) {
  const { slug } = await params;
  const subject = getCpSubjectBySlug(slug);

  if (!subject) notFound();

  const resolvedSubject = subject as NonNullable<typeof subject>;
  const tree = getCpSubjectTree(slug);

  return (
    <SubjectDetailPage
      levelLabel="CP"
      levelHref="/primaire/cp"
      subjectsHref="/primaire/cp/matieres"
      subject={resolvedSubject}
      tree={tree}
      accent={CP_ACCENT}
      sequences={[]}
      cycleLabel="Cycle 2"
      footerLinks={getPublishedSubdomainPagesForDomain("cp", slug).map(
        (page) => ({ href: page.route, label: page.label, tone: "gold" as const }),
      )}
    />
  );
}
