import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectDetailPage } from "@/components/academy/SubjectMatterCatalog";
import {
  ce1Subjects,
  getCe1SubjectBySlug,
  getCe1SubjectTree,
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

  const tree = getCe1SubjectTree(slug);

  return (
    <SubjectDetailPage
      levelLabel="CE1"
      levelHref="/primaire/ce1"
      subjectsHref="/primaire/ce1/matieres"
      cycleLabel="Cycle 2"
      subject={subject}
      tree={tree}
      accent={CE1_ACCENT}
      sequences={tree ? mapCe1Sequences(tree) : []}
      footerLinks={[{ href: "/primaire/ce1/programme", label: "Programme CE1" }]}
    />
  );
}

function mapCe1Sequences(tree: NonNullable<ReturnType<typeof getCe1SubjectTree>>) {
  return tree.subdomains.flatMap((subdomain) =>
    (subdomain.competencies ?? []).map((competency) => ({
      id: competency.id,
      title: competency.title,
      domain: tree.title,
      subdomain: subdomain.title,
      skill: competency.objective,
      status: competency.status,
      sessions: subdomain.lessons
        .filter((lesson) => competency.lessonIds.includes(lesson.id))
        .map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          status: lesson.status,
        })),
      resourceSlots: (competency.resourceRefs ?? []).map((resource) => ({
        kind: resource.kind,
        label: resource.label,
        status: resource.status,
      })),
    })),
  );
}
