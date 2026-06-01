import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectDetailPage } from "@/components/academy/SubjectMatterCatalog";
import { ce2Competencies } from "@/content/levels/ce2-competencies";
import {
  ce2Subjects,
  getCe2SubjectBySlug,
  getCe2SubjectTree,
} from "@/content/levels/ce2-learning-tree";

const CE2_ACCENT = {
  jade: {
    text: "text-jade",
    border: "border-jade/30",
    bg: "bg-jade/[0.06]",
  },
  gold: {
    text: "text-gold",
    border: "border-gold/30",
    bg: "bg-gold/[0.06]",
  },
  sky: {
    text: "text-sky",
    border: "border-sky/30",
    bg: "bg-sky/[0.06]",
  },
  ember: {
    text: "text-ember",
    border: "border-ember/30",
    bg: "bg-ember/[0.06]",
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ce2Subjects.map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const subject = getCe2SubjectBySlug(slug);
  if (!subject) return { title: "Matière introuvable | Académie Kerboeuf" };

  return {
    title: `${subject.title} CE2 | Académie Kerboeuf`,
    description: subject.shortDescription,
  };
}

export default async function Ce2SubjectPage({ params }: PageProps) {
  const { slug } = await params;
  const subject = getCe2SubjectBySlug(slug);

  if (!subject) notFound();

  const tree = getCe2SubjectTree(slug);

  return (
    <SubjectDetailPage
      levelLabel="CE2"
      levelHref="/primaire/ce2"
      subjectsHref="/primaire/ce2/matieres"
      cycleLabel="Cycle 2"
      subject={subject}
      tree={tree ? mapCe2Tree(tree) : undefined}
      accent={CE2_ACCENT}
      sequences={ce2Competencies
        .filter((competency) => competency.subjectLabel === subject.title)
        .map((competency) => ({
          id: competency.id,
          title: competency.sequence.title,
          domain: getCe2DomainLabel(tree, competency.domainSlug),
          subdomain: getCe2SubdomainLabel(tree, competency.subdomainSlug),
          skill: competency.observableObjective,
          status: competency.status,
          sessions: competency.sequence.steps.map((step) => ({
            id: step.id,
            title: step.title,
            status: step.status,
          })),
          resourceSlots: competency.resourceSlots?.map((slot) => ({
            kind: slot.kind,
            label: slot.label,
            status: slot.resource?.status ?? "planned",
          })),
        }))}
      footerLinks={[{ href: "/primaire/ce2", label: "Portail CE2" }]}
    />
  );
}

function mapCe2Tree(tree: NonNullable<ReturnType<typeof getCe2SubjectTree>>) {
  return {
    domains: tree.domains.map((domain) => ({
      id: domain.slug,
      title: domain.title,
      subdomains: domain.subdomains.map((subdomain) => ({
        id: subdomain.slug,
        title: subdomain.title,
        description: subdomain.description,
        items: subdomain.competencies.map((competency) => ({
          id: competency.slug,
          title: competency.title,
          description: competency.objective,
          status: "upcoming" as const,
        })),
      })),
    })),
  };
}

function getCe2DomainLabel(
  tree: ReturnType<typeof getCe2SubjectTree>,
  domainSlug: string,
) {
  return (
    tree?.domains.find((domain) => domain.slug === domainSlug)?.title ??
    domainSlug
  );
}

function getCe2SubdomainLabel(
  tree: ReturnType<typeof getCe2SubjectTree>,
  subdomainSlug: string,
) {
  for (const domain of tree?.domains ?? []) {
    const subdomain = domain.subdomains.find(
      (item) => item.slug === subdomainSlug,
    );
    if (subdomain) return subdomain.title;
  }
  return subdomainSlug;
}
