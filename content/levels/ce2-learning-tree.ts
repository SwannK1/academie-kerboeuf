// Arbre pedagogique CE2 - Cycle 2, primaire.
// Structure de catalogue : niveau -> matieres -> domaines -> sequences-competences.
// Une sequence correspond a une seule competence, sans lecon detaillee ni exercice.

import { ce2CurriculumLevelMap } from "@/content/levels/ce2-curriculum";
import type { CurriculumEntry } from "@/content/curriculum-map-types";
import type {
  AcademyLevelProgram,
  Lesson,
  LearningCompetency,
  ParentGuidance,
  PedagogicalResourceRef,
  ProgramDomain,
  ProgramStatus,
  ProgramSubdomain,
} from "@/content/program-types";

const emptyParentGuidance: ParentGuidance = {
  summary: "",
  quickTips: [],
  successSigns: [],
};

const PLANNED_PDF_RESOURCES: PedagogicalResourceRef[] = [
  { kind: "lesson-pdf", label: "PDF de leçon", status: "planned" },
  { kind: "exercises-pdf", label: "PDF d'exercices", status: "planned" },
  { kind: "correction-pdf", label: "PDF de correction", status: "planned" },
  { kind: "projectable-pdf", label: "PDF projetable", status: "planned" },
  { kind: "parent-sheet-pdf", label: "Fiche parent", status: "planned" },
];

function clonePlannedPdfResources(): PedagogicalResourceRef[] {
  return PLANNED_PDF_RESOURCES.map((resource) => ({ ...resource }));
}

function getAggregateStatus(statuses: ProgramStatus[]): ProgramStatus {
  if (statuses.some((status) => status === "available")) {
    return "available";
  }

  if (statuses.some((status) => status === "in-progress")) {
    return "in-progress";
  }

  return "upcoming";
}

function createCompetencySequence(
  entry: CurriculumEntry,
): { lesson: Lesson; competency: LearningCompetency } {
  const resources = clonePlannedPdfResources();

  return {
    lesson: {
      id: entry.id,
      slug: entry.id,
      title: entry.title,
      objective: entry.observableObjective,
      skill: entry.title,
      parentGuidance: emptyParentGuidance,
      successCriteria: entry.successCriteria,
      exercises: [],
      resources,
      competencyIds: [entry.id],
      status: entry.status,
    },
    competency: {
      id: entry.id,
      slug: entry.id,
      title: entry.title,
      levelSlug: "ce2",
      cycle: "cycle-2",
      stage: "primaire",
      domainSlug: entry.domainSlug,
      subdomainSlug: entry.subdomainSlug,
      objective: entry.observableObjective,
      status: entry.status,
      lessonIds: [entry.id],
      successCriteria: entry.successCriteria,
      resourceRefs: clonePlannedPdfResources(),
    },
  };
}

function createSubdomain(
  domainSlug: string,
  subdomainSlug: string,
  title: string,
  entries: CurriculumEntry[],
): ProgramSubdomain {
  const sequences = entries.map(createCompetencySequence);

  return {
    id: `ce2-${domainSlug}-${subdomainSlug}`,
    slug: subdomainSlug,
    title,
    description: `Catalogue de séquences-compétences CE2 pour ${title}.`,
    lessons: sequences.map((sequence) => sequence.lesson),
    competencies: sequences.map((sequence) => sequence.competency),
    status: getAggregateStatus(entries.map((entry) => entry.status)),
  };
}

function createDomain(
  domain: (typeof ce2CurriculumLevelMap.domains)[number],
): ProgramDomain {
  const subdomains = domain.subdomains.map((subdomain) =>
    createSubdomain(
      domain.domainSlug,
      subdomain.subdomainSlug,
      subdomain.label,
      subdomain.entries,
    ),
  );

  return {
    id: `ce2-${domain.domainSlug}`,
    slug: domain.domainSlug,
    title: domain.label,
    officialLabel: `${domain.subject} - Cycle 2`,
    description: `Progression CE2 par compétences pour ${domain.label}.`,
    subdomains,
    status: getAggregateStatus(
      subdomains.flatMap((subdomain) =>
        subdomain.lessons.map((lesson) => lesson.status),
      ),
    ),
  };
}

export const ce2LearningTree: AcademyLevelProgram = {
  levelSlug: "ce2",
  label: "CE2",
  cycle: "cycle-2",
  stage: "primaire",
  characterLink: {
    characterSlug: "esteban",
    name: "Esteban",
    roleHint:
      "Esteban accompagne les élèves de CE2 dans l'observation, la méthode et la justification.",
  },
  domains: ce2CurriculumLevelMap.domains.map(createDomain),
};

export function getCe2Domain(domainSlug: string): ProgramDomain | undefined {
  return ce2LearningTree.domains.find((domain) => domain.slug === domainSlug);
}

export function getCe2Subdomain(
  domainSlug: string,
  subdomainSlug: string,
): ProgramSubdomain | undefined {
  return getCe2Domain(domainSlug)?.subdomains.find(
    (subdomain) => subdomain.slug === subdomainSlug,
  );
}

export function getCe2Lesson(
  domainSlug: string,
  subdomainSlug: string,
  lessonSlug: string,
): Lesson | undefined {
  return getCe2Subdomain(domainSlug, subdomainSlug)?.lessons.find(
    (lesson) => lesson.slug === lessonSlug,
  );
}

export function getCe2LessonById(lessonId: string): Lesson | undefined {
  for (const domain of ce2LearningTree.domains) {
    for (const subdomain of domain.subdomains) {
      const found = subdomain.lessons.find((lesson) => lesson.id === lessonId);
      if (found) return found;
    }
  }
  return undefined;
}
