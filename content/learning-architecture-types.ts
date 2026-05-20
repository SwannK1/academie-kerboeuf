import type {
  AcademyCharacterLink,
  AcademyCycleId,
  AcademyLevelSlug,
  PedagogicalResourceKind,
  PedagogicalResourceRef,
  ProgramStatus,
} from "@/content/program-types";

export type ResourceSlot = {
  kind: PedagogicalResourceKind;
  label: string;
  resource?: PedagogicalResourceRef;
};

export type TeachingSequenceStepKind =
  | "discovery"
  | "explicit-lesson"
  | "guided-practice"
  | "consolidation"
  | "assessment";

export type TeachingSequenceStep = {
  id: string;
  order: 1 | 2 | 3 | 4 | 5;
  kind: TeachingSequenceStepKind;
  title: string;
  objective: string;
  resourceSlots?: ResourceSlot[];
  status: ProgramStatus;
};

export type TeachingSequence = {
  id: string;
  competencyId: string;
  title: string;
  steps: TeachingSequenceStep[];
  status: ProgramStatus;
};

export type LearningCompetency = {
  id: string;
  slug: string;
  levelSlug: AcademyLevelSlug;
  cycle?: AcademyCycleId;
  subject: string;
  subjectLabel?: string;
  domainSlug: string;
  subdomainSlug: string;
  title: string;
  observableObjective: string;
  successCriteria: string[];
  officialReference?: string;
  sequence: TeachingSequence;
  lessonIds?: string[];
  resourceSlots?: ResourceSlot[];
  guideCharacter?: AcademyCharacterLink;
  status: ProgramStatus;
};

export type AnnualPathPeriod = "P1" | "P2" | "P3" | "P4" | "P5";

export type AnnualPathWeek = {
  week: number;
  period?: AnnualPathPeriod;
  title: string;
  focus: string;
  competencyIds: string[];
  resourceSlots?: ResourceSlot[];
  status: ProgramStatus;
};

export type AnnualLearningPath = {
  id: string;
  slug: string;
  title: string;
  levelSlug: AcademyLevelSlug;
  subject: string;
  domainSlug?: string;
  subdomainSlug?: string;
  durationLabel: string;
  weekCount: number;
  annualObjective: string;
  guideCharacter?: AcademyCharacterLink;
  weeks: AnnualPathWeek[];
  status: ProgramStatus;
};

// ── Programme détaillé — squelette du curriculum ──────────────────────────────
// Types légers pour organiser le programme par niveau → matière → domaine →
// sous-domaine → compétence attendue.
// Règle : aucun href fictif — CurriculumResourceIntent ne porte jamais de lien.
// Le site organise ; les PDF enseignent.

export type CurriculumResourceIntent = {
  kind: PedagogicalResourceKind;
  label: string;
};

export type ExpectedCompetency = {
  id: string;
  title: string;
  description?: string;
  status: ProgramStatus;
  successCriteria?: string[];
  plannedResources?: CurriculumResourceIntent[];
  competencyId?: string; // id d'une LearningCompetency si elle existe
};

export type CurriculumSubdomainBlock = {
  slug: string;
  label: string;
  competencies: ExpectedCompetency[];
};

export type CurriculumDomainBlock = {
  slug: string;
  label: string;
  subdomains: CurriculumSubdomainBlock[];
};

export type CurriculumSubjectBlock = {
  slug: string;
  label: string;
  domains: CurriculumDomainBlock[];
};

export type CurriculumMap = {
  levelSlug: AcademyLevelSlug;
  subjects: CurriculumSubjectBlock[];
};
