import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectDetailPage } from "@/components/academy/SubjectMatterCatalog";
import { cm1Subjects, getCm1SubjectBySlug } from "@/content/cm1-subjects";
import { cm1Competencies } from "@/content/levels/cm1-competencies";
import { cm1CurriculumLevelMap } from "@/content/levels/cm1-curriculum";
import { cm1Level } from "@/content/levels/cm1";
import { getPublicStatusKey } from "@/content/public-status";
import { CM1_ACCENT } from "@/lib/cm1-accent";
import type { CurriculumDomainMap } from "@/content/curriculum-map-types";
import type { LearningCompetency } from "@/content/learning-architecture-types";
import type { ProgramStatus } from "@/content/program-types";

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

  const subjectDomain = cm1CurriculumLevelMap.domains.find(
    (domain) => domain.domainSlug === slug,
  );
  const competencies = cm1Competencies.filter(
    (competency) => competency.domainSlug === slug,
  );

  return (
    <SubjectDetailPage
      levelLabel="CM1"
      levelHref="/primaire/cm1"
      subjectsHref="/primaire/cm1/matieres"
      cycleLabel="Cycle 3"
      subject={subject}
      tree={subjectDomain ? mapCm1Tree(subjectDomain) : undefined}
      accent={CM1_ACCENT}
      sequences={mapCm1Sequences(competencies, subjectDomain)}
      footerLinks={[{ href: "/primaire/cm1/programme", label: "Programme CM1" }]}
    />
  );
}

function mapCm1Tree(subjectDomain: CurriculumDomainMap) {
  return {
    id: subjectDomain.domainSlug,
    slug: subjectDomain.domainSlug,
    title: `${subjectDomain.label} · ${cm1Level.label}`,
    officialLabel: `${subjectDomain.label} — Cycle 3`,
    subdomains: subjectDomain.subdomains.map((subdomain) => ({
      id: subdomain.subdomainSlug,
      slug: subdomain.subdomainSlug,
      title: subdomain.label,
      lessons: subdomain.entries.map((entry) => ({
        id: entry.id,
        slug: entry.id,
        title: entry.title,
        objective: entry.observableObjective,
        skill: entry.title,
        parentGuidance: { summary: "", quickTips: [], successSigns: [] },
        successCriteria: entry.successCriteria,
        exercises: [],
        resources: entry.resourceSlots?.flatMap((slot) =>
          slot.resource ? [slot.resource] : [],
        ),
        status: entry.status,
      })),
      status: getAggregateStatus(subdomain.entries.map((entry) => entry.status)),
    })),
    status: getAggregateStatus(
      subjectDomain.subdomains.flatMap((subdomain) =>
        subdomain.entries.map((entry) => entry.status),
      ),
    ),
  };
}

function mapCm1Sequences(
  competencies: readonly LearningCompetency[],
  subjectDomain?: CurriculumDomainMap,
) {
  return competencies.map((competency) => ({
    id: competency.id,
    title: competency.title,
    domain: subjectDomain?.label ?? competency.subject,
    subdomain:
      subjectDomain?.subdomains.find(
        (subdomain) => subdomain.subdomainSlug === competency.subdomainSlug,
      )?.label ?? competency.subdomainSlug,
    skill: competency.observableObjective,
    sessions: competency.sequence.steps.map((step) => ({
      id: step.id,
      title: step.title,
      status: step.status,
    })),
    resourceSlots: (competency.resourceSlots ?? []).map((slot) => ({
      kind: slot.kind,
      label: slot.label,
      status: slot.resource?.status ?? "planned",
    })),
    status: competency.status,
  }));
}

function getAggregateStatus(statuses: ProgramStatus[]): ProgramStatus {
  if (statuses.some((status) => getPublicStatusKey(status) === "in-progress")) {
    return "in-progress";
  }
  if (statuses.some((status) => getPublicStatusKey(status) === "available")) {
    return "available";
  }
  return "upcoming";
}
