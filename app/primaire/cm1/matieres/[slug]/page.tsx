import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectDetailPage } from "@/components/academy/SubjectMatterCatalog";
import { cm1Subjects, getCm1SubjectBySlug } from "@/content/cm1-subjects";
import {
  getCm1SubjectTree,
  type Cm1SubjectNode,
} from "@/content/cm1-learning-tree";
import { CM1_ACCENT } from "@/lib/cm1-accent";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cm1Subjects.map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const subject = getCm1SubjectBySlug(slug);
  if (!subject) return { title: "Matière introuvable | Académie Kerboeuf" };
  return {
    title: `${subject.title} CM1 | Académie Kerboeuf`,
    description: subject.shortDescription,
  };
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
      sequences={tree ? mapCm1Sequences(tree) : []}
      cycleLabel="Cycle 3"
      footerLinks={[]}
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

function mapCm1Sequences(tree: Cm1SubjectNode) {
  return tree.domains.flatMap((domain) =>
    domain.subdomains.flatMap((subdomain) =>
      subdomain.sequences.map((sequence) => ({
        id: sequence.id,
        title: sequence.title,
        domain: domain.title,
        subdomain: subdomain.title,
        skill: sequence.competency,
        status: sequence.status,
      })),
    ),
  );
}
