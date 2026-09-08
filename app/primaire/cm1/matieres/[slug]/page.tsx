import type { Metadata } from "next";
import { buildPageMetadata } from "@/content/seo";
import { notFound } from "next/navigation";
import { SubjectDetailPage } from "@/components/academy/SubjectMatterCatalog";
import { cm1Subjects, getCm1SubjectBySlug } from "@/content/cm1-subjects";
import {
  getCm1SubjectTree,
  type Cm1SubjectNode,
} from "@/content/cm1-learning-tree";
import { CM1_ACCENT } from "@/lib/cm1-accent";
import { getPublishedSubdomainPagesForDomain } from "@/content/levels/published-subdomain-pages";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cm1Subjects.map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const subject = getCm1SubjectBySlug(slug);
  if (!subject) {
    return buildPageMetadata({
      title: "Matière introuvable",
      description: "Cette matière n'est pas publiée dans le catalogue public.",
      path: "/primaire/cm1/matieres",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${subject.title} CM1`,
    description: subject.shortDescription,
    path: `/primaire/cm1/matieres/${slug}`,
  });
}

export default async function Cm1SubjectPage({ params }: PageProps) {
  const { slug } = await params;
  const subject = getCm1SubjectBySlug(slug);

  if (!subject) notFound();

  const tree = getCm1SubjectTree(slug);

  return (
    <SubjectDetailPage
      levelLabel="CM1"
      levelHref="/primaire/cm1"
      subjectsHref="/primaire/cm1/matieres"
      subject={subject}
      tree={tree ? mapCm1Tree(tree) : undefined}
      accent={CM1_ACCENT}
      sequences={[]}
      cycleLabel="Cycle 3"
      footerLinks={getPublishedSubdomainPagesForDomain("cm1", slug).map(
        (page) => ({ href: page.route, label: page.label }),
      )}
    />
  );
}

function mapCm1Tree(tree: Cm1SubjectNode) {
  return {
    place: tree.place,
    guides: tree.guides,
    domains: tree.domains.map((domain) => ({
      id: domain.id,
      title: domain.title,
      zone: domain.place?.zone,
      subdomains: domain.subdomains.map((subdomain) => ({
        id: subdomain.id,
        title: subdomain.title,
        items: subdomain.sequences.map((sequence) => ({
          id: sequence.id,
          title: sequence.title,
          description: sequence.competency,
          status: sequence.status,
        })),
      })),
    })),
  };
}
