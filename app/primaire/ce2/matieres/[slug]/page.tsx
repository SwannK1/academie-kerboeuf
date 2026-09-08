import type { Metadata } from "next";
import { buildPageMetadata } from "@/content/seo";
import { notFound } from "next/navigation";
import { SubjectDetailPage } from "@/components/academy/SubjectMatterCatalog";
import { ce2Subjects, getCe2SubjectBySlug } from "@/content/ce2-subjects";
import { getCe2SubjectTree } from "@/content/levels/ce2-learning-tree";
import { CE2_ACCENT } from "@/lib/ce2-accent";
import { getPublishedSubdomainPagesForDomain } from "@/content/levels/published-subdomain-pages";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ce2Subjects.map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const subject = getCe2SubjectBySlug(slug);
  if (!subject) {
    return buildPageMetadata({
      title: "Matière introuvable",
      description: "Cette matière n'est pas publiée dans le catalogue public.",
      path: "/primaire/ce2/matieres",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${subject.title} CE2`,
    description: subject.shortDescription,
    path: `/primaire/ce2/matieres/${slug}`,
  });
}

export default async function Ce2SubjectPage({ params }: PageProps) {
  const { slug } = await params;
  const subject = getCe2SubjectBySlug(slug);

  if (!subject) notFound();

  const safeSubject = subject!;
  const tree = getCe2SubjectTree(slug);

  const footerLinks = getPublishedSubdomainPagesForDomain("ce2", slug).map(
    (page) => ({ href: page.route, label: page.label }),
  );

  return (
    <SubjectDetailPage
      levelLabel="CE2"
      levelHref="/primaire/ce2"
      subjectsHref="/primaire/ce2/matieres"
      subject={safeSubject}
      tree={tree}
      accent={CE2_ACCENT}
      sequences={[]}
      cycleLabel="Cycle 2"
      footerLinks={footerLinks}
    />
  );
}
