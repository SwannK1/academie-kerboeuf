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

// ── Notions et fiches pédagogiques F1 / F2 / F3 ──────────────────────────────
// Une notion regroupe une compétence cible et les fiches qui la déclinent.
// 1 notion = 1 compétence. Chaque notion peut avoir jusqu'à 3 fiches.
// F1 : situation + mini-leçon + automatismes
// F2 : application + consolidation
// F3 : évaluation courte
//
// Règle PDF : resourceSlots reste vide (status "planned") tant que les fichiers
// n'existent pas. Ne jamais placer de href sans fichier réel.
// Côté élève, le mot "Séquence" n'apparaît pas : seul le titre de la notion est
// affiché, sans référence interne à la numérotation pédagogique.

export type NotionFicheKind = "f1" | "f2" | "f3";

export type NotionFiche = {
  kind: NotionFicheKind;
  /** Label court visible uniquement dans l'espace enseignant. */
  label: string;
  /** Description de l'intention pédagogique — non affichée côté élève. */
  teacherIntent: string;
  status: ProgramStatus;
  /**
   * Ressources PDF associées à cette fiche.
   * Laisser vide (undefined) si aucun fichier n'existe encore.
   * Un slot sans href actif ne doit générer aucun bouton cliquable.
   */
  resourceSlots?: ResourceSlot[];
};

export type NotionFiches = {
  /** F1 — situation déclenchante + mini-leçon + automatismes */
  f1?: NotionFiche;
  /** F2 — application guidée + consolidation */
  f2?: NotionFiche;
  /** F3 — évaluation courte */
  f3?: NotionFiche;
};

export type Notion = {
  id: string;
  slug: string;
  levelSlug: AcademyLevelSlug;
  cycle?: AcademyCycleId;
  subject: string;
  subjectLabel?: string;
  domainSlug: string;
  subdomainSlug: string;
  /** Titre lisible de la notion — c'est ce qu'on affiche côté élève. */
  title: string;
  observableObjective?: string;
  successCriteria?: string[];
  officialReference?: string;
  /** Liens vers les LearningCompetency correspondantes si elles existent. */
  competencyIds?: string[];
  fiches?: NotionFiches;
  guideCharacter?: AcademyCharacterLink;
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
