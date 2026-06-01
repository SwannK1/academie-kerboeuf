import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SubjectDetailPage,
  type SequenceSummary,
} from "@/components/academy/SubjectMatterCatalog";
import {
  cpSubjects,
  getCpSubjectBySlug,
  getCpSubjectTree,
  type CpSubjectNode,
} from "@/content/levels/cp-learning-tree";
import type { Lesson, ProgramStatus } from "@/content/program-types";
import { CP_ACCENT } from "@/lib/cp-accent";

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

  const tree = getCpSubjectTree(slug);

  return (
    <SubjectDetailPage
      levelLabel="CP"
      levelHref="/primaire/cp"
      subjectsHref="/primaire/cp/matieres"
      cycleLabel="Cycle 2"
      subject={subject}
      tree={tree}
      accent={CP_ACCENT}
      sequences={tree ? mapCpSequences(tree) : []}
      footerLinks={[
        {
          href: "/primaire/cp/programmes/francais/lecture-comprehension",
          label: "Catalogue PDF CP",
        },
      ]}
    />
  );
}

function mapCpSequences(tree: CpSubjectNode): SequenceSummary[] {
  return tree.subdomains.flatMap((subdomain) =>
    (subdomain.competencies ?? []).map((competency) => {
      const lesson = subdomain.lessons.find((item) =>
        competency.lessonIds.includes(item.id),
      );

      return {
        id: competency.id,
        title: competency.title,
        domain: tree.title,
        subdomain: subdomain.title,
        skill: competency.objective,
        status: competency.status,
        sessions: buildSimpleSessions(competency.id, competency.status),
        resourceSlots: getResourceSlotsForSequence(lesson),
      };
    }),
  );
}

function buildSimpleSessions(
  sequenceId: string,
  status: ProgramStatus,
): SequenceSummary["sessions"] {
  return [
    {
      id: `${sequenceId}-seance-1`,
      title: "Séance 1 · Découvrir la compétence",
      status,
    },
    {
      id: `${sequenceId}-seance-2`,
      title: "Séance 2 · S'entraîner avec guidage",
      status: "upcoming",
    },
    {
      id: `${sequenceId}-seance-3`,
      title: "Séance 3 · Vérifier et réinvestir",
      status: "upcoming",
    },
  ];
}

function getResourceSlotsForSequence(lesson: Lesson | undefined) {
  return (lesson?.resources ?? []).map((resource) => ({
    kind: resource.kind,
    label: resource.label,
    status: resource.status,
  }));
}
