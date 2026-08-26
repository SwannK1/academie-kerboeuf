import { cm1LearningTree } from "@/content/cm1-learning-tree";
import { createPrimaryPdfResources } from "@/content/levels/primary-pdf-resources";
import type {
  AcademyLevelProgram,
  LearningCompetency,
  Lesson,
  ParentGuidance,
  ProgramDomain,
  ProgramSubdomain,
} from "@/content/program-types";

const emptyParentGuidance: ParentGuidance = {
  summary: "",
  quickTips: [],
  successSigns: [],
};

const publishedSubjects = new Set(["francais", "mathematiques"]);

function getPublicSubdomainSlug(subdomainId: string): string {
  if (subdomainId === "francais-lecture-recits") {
    return "lecture-comprehension";
  }

  return subdomainId
    .replace(/^francais-/, "")
    .replace(/^mathematiques-/, "")
    .replace(/^nombres-calculs-/, "")
    .replace(/^grandeurs-mesures-/, "")
    .replace(/^geometrie-/, "")
    .replace(/^problemes-/, "");
}

function createSequence(
  subjectSlug: string,
  subdomainSlug: string,
  sequence: (typeof cm1LearningTree)[number]["domains"][number]["subdomains"][number]["sequences"][number],
): { lesson: Lesson; competency: LearningCompetency } {
  const resources = createPrimaryPdfResources({
    level: "cm1",
    subject: subjectSlug,
    competencySlug: sequence.id,
    filePrefix: `cm1-${subjectSlug}-${sequence.id}`,
  });

  const lesson: Lesson = {
    id: sequence.id,
    slug: sequence.id,
    title: sequence.title,
    objective: sequence.competency,
    skill: sequence.title,
    parentGuidance: emptyParentGuidance,
    successCriteria: [],
    exercises: [],
    resources,
    competencyIds: [sequence.id],
    status: "available",
  };

  return {
    lesson,
    competency: {
      id: sequence.id,
      slug: sequence.id,
      title: sequence.title,
      levelSlug: "cm1",
      cycle: "cycle-3",
      stage: "primaire",
      domainSlug: subjectSlug,
      subdomainSlug,
      objective: sequence.competency,
      status: "available",
      lessonIds: [sequence.id],
      successCriteria: [],
    },
  };
}

function createSubdomain(
  subjectSlug: string,
  domainTitle: string,
  subdomain: (typeof cm1LearningTree)[number]["domains"][number]["subdomains"][number],
): ProgramSubdomain {
  const slug = getPublicSubdomainSlug(subdomain.id);
  const sequences = subdomain.sequences.map((sequence) =>
    createSequence(subjectSlug, slug, sequence),
  );

  return {
    id: subdomain.id,
    slug,
    title: subdomain.title,
    description: `${domainTitle} : ressources CM1 classées par compétence.`,
    lessons: sequences.map(({ lesson }) => lesson),
    competencies: sequences.map(({ competency }) => competency),
    status: "available",
  };
}

function createDomain(
  subject: (typeof cm1LearningTree)[number],
): ProgramDomain {
  return {
    id: `cm1-${subject.subjectSlug}`,
    slug: subject.subjectSlug,
    title: subject.title,
    officialLabel: `${subject.title} - Cycle 3`,
    description: `Catalogue des ressources CM1 de ${subject.title}.`,
    subdomains: subject.domains.flatMap((domain) =>
      domain.subdomains.map((subdomain) =>
        createSubdomain(subject.subjectSlug, domain.title, subdomain),
      ),
    ),
    status: "available",
  };
}

export const cm1ResourceCatalog: AcademyLevelProgram = {
  levelSlug: "cm1",
  label: "CM1",
  cycle: "cycle-3",
  stage: "primaire",
  domains: cm1LearningTree
    .filter((subject) => publishedSubjects.has(subject.subjectSlug))
    .map(createDomain),
};

export function getCm1ResourceDomain(
  domainSlug: string,
): ProgramDomain | undefined {
  return cm1ResourceCatalog.domains.find((domain) => domain.slug === domainSlug);
}

export function getCm1ResourceSubdomain(
  domainSlug: string,
  subdomainSlug: string,
): ProgramSubdomain | undefined {
  return getCm1ResourceDomain(domainSlug)?.subdomains.find(
    (subdomain) => subdomain.slug === subdomainSlug,
  );
}
