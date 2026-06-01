import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectDetailPage } from "@/components/academy/SubjectMatterCatalog";
import { cpSubjects, getCpSubjectBySlug } from "@/content/cp-subjects";
import { cpLearningTree } from "@/content/levels/cp-learning-tree";
import { CP_ACCENT } from "@/lib/cp-accent";
import type { MatterSequence, MatterTree } from "@/components/academy/SubjectMatterCatalog";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cpSubjects.map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

  const domain = cpLearningTree.domains.find((d) => d.slug === slug);
  const tree: MatterTree | undefined = domain
    ? {
        place: { label: "Cycle 2 · Primaire" },
        guides: [{ id: "kiwi", name: "Kiwi" }],
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
      }
    : undefined;

  const sequences: MatterSequence[] = domain
    ? domain.subdomains.flatMap((subdomain) =>
        subdomain.lessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          domain: domain.title,
          subdomain: subdomain.title,
          skill: lesson.skill,
          status: lesson.status,
        })),
      )
    : [];

  return (
    <SubjectDetailPage
      levelLabel="CP"
      levelHref="/primaire/cp"
      subjectsHref="/primaire/cp/matieres"
      subject={subject!}
      tree={tree}
      accent={CP_ACCENT}
      sequences={sequences}
      footerLinks={[
        {
          href: "/primaire/cp/programmes/francais/lecture-comprehension",
          label: "Catalogue Français CP",
          tone: "gold",
        },
      ]}
    />
  );
}
