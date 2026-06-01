import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectDetailPage } from "@/components/academy/SubjectMatterCatalog";
import { cpSubjects, getCpSubjectBySlug } from "@/content/cp-subjects";
import { cpLearningTree } from "@/content/levels/cp-learning-tree";
import type { ProgramDomain } from "@/content/program-types";
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

  // notFound() throws but TypeScript can't narrow without next types
  const resolvedSubject = subject as NonNullable<typeof subject>;
  const domain = cpLearningTree.domains.find((d) => d.slug === slug);

  return (
    <SubjectDetailPage
      levelLabel="CP"
      levelHref="/primaire/cp"
      subjectsHref="/primaire/cp/matieres"
      subject={resolvedSubject}
      tree={domain ? mapDomainToTree(domain) : undefined}
      accent={CP_ACCENT}
      sequences={domain ? mapDomainToSequences(domain) : []}
      cycleLabel="Cycle 2"
      footerLinks={[
        { href: "/primaire/cp/programmes/francais/lecture-comprehension", label: "Lecture-compréhension CP", tone: "gold" },
      ]}
    />
  );
}

function mapDomainToTree(domain: ProgramDomain) {
  return {
    place: { label: `CP · ${domain.title}` },
    guides: [],
    domains: [
      {
        id: domain.id,
        title: domain.title,
        subdomains: domain.subdomains.map((subdomain) => ({
          id: subdomain.id,
          title: subdomain.title,
          items: subdomain.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            description: lesson.objective,
            status: lesson.status,
          })),
        })),
      },
    ],
  };
}

function mapDomainToSequences(domain: ProgramDomain) {
  return domain.subdomains.flatMap((subdomain) =>
    subdomain.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      domain: domain.title,
      subdomain: subdomain.title,
      skill: lesson.objective,
      status: lesson.status,
    })),
  );
}
