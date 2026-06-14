import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectDetailPage } from "@/components/academy/SubjectMatterCatalog";
import { getCm2MissionBySlug } from "@/content/cm2";
import { cm2Subjects, getCm2SubjectBySlug } from "@/content/cm2-subjects";
import {
  getCm2SubjectTree,
  type Cm2SubjectNode,
} from "@/content/cm2-learning-tree";
import {
  getCm2SequencesBySubjectSlug,
  type Cm2Sequence,
} from "@/content/cm2-sequences";
import { CM2_ACCENT } from "@/lib/cm2-accent";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cm2Subjects.map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const subject = getCm2SubjectBySlug(slug);
  if (!subject) return { title: "Matière introuvable | Académie Kerboeuf" };
  return {
    title: `${subject.title} CM2 | Académie Kerboeuf`,
    description: subject.shortDescription,
  };
}

export default async function Cm2SubjectPage({ params }: PageProps) {
  const { slug } = await params;
  const subject = getCm2SubjectBySlug(slug);

  if (!subject) notFound();

  const tree = getCm2SubjectTree(slug);
  const linkedCards = (subject.missionSlugs ?? [])
    .map((missionSlug) => getCm2MissionBySlug(missionSlug))
    .filter((mission): mission is NonNullable<typeof mission> => mission !== undefined)
    .map((mission) => ({
      href: `/primaire/cm2/missions/${mission.slug}`,
      eyebrow: mission.subject,
      title: mission.title,
      description: mission.objective,
      accentText: mission.theme.textClass,
      accentBorder: mission.theme.ringClass ?? "border-white/10",
    }));

  return (
    <SubjectDetailPage
      levelLabel="CM2"
      levelHref="/primaire/cm2"
      subjectsHref="/primaire/cm2/matieres"
      subject={subject}
      tree={tree ? mapCm2Tree(tree, slug) : undefined}
      accent={CM2_ACCENT}
      sequences={mapCm2Sequences(getCm2SequencesBySubjectSlug(slug))}
      cycleLabel="Cycle 3"
      linkedCards={linkedCards}
      footerLinks={[
        { href: "/primaire/cm2/missions", label: "Toutes les missions CM2", tone: "gold" },
        { href: "/primaire/cm2/parcours", label: "Parcours de l'année", tone: "jade" },
        ...(slug === "mathematiques"
          ? [{ href: "/primaire/cm2/fiches/mathematiques", label: "Compétences et fiches Mathématiques", tone: "jade" as const }]
          : []),
        ...(slug === "francais"
          ? [{ href: "/primaire/cm2/fiches/francais", label: "Compétences et fiches Français", tone: "jade" as const }]
          : []),
      ]}
    />
  );
}

function mapCm2Tree(tree: Cm2SubjectNode, subjectSlug: string) {
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
        items: subdomain.lessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          status: lesson.status,
          href: lesson.routeSlug
            ? `/primaire/cm2/matieres/${subjectSlug}/${domain.id}/${subdomain.id}/${lesson.routeSlug}`
            : undefined,
        })),
      })),
    })),
  };
}

function mapCm2Sequences(sequences: Cm2Sequence[]) {
  return sequences.map((sequence) => ({
    id: sequence.slug,
    title: sequence.title,
    domain: sequence.domain,
    subdomain: sequence.subdomain,
    skill: sequence.skill,
    status: sequence.status,
  }));
}
