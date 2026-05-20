// Types pour la carte du programme détaillé — Académie Kerboeuf.
// Structure enrichie : Niveau → Domaine → Sous-domaine → Compétence attendue.
//
// Distinct de CurriculumMap (learning-architecture-types.ts) qui organise par
// subjects → domains → subdomains → competencies (structure antérieure).
// CurriculumLevelMap est le type cible pour la migration progressive.
//
// Ce fichier n'importe pas LearningCompetency : le lien vers une compétence
// observable existante se fait uniquement par competencyId?: string.
// Ce fichier n'importe rien depuis les fichiers CM2.

import type { AcademyLevelSlug, ProgramStatus } from "@/content/program-types";
import type { ResourceSlot } from "@/content/learning-architecture-types";

// ── Identifiant stable d'une entrée de programme ─────────────────────────────
// Convention : "[level]-[subject-code]-[subdomain-code]-[concept-slug]"
// Exemple : "cp-fr-lc-identifier-personnage"

export type CurriculumEntryId = string;

// ── Lien optionnel vers un parcours annuel ────────────────────────────────────

export type CurriculumAnnualPathRef = {
  annualPathId: string;
  weekNumbers?: number[];
};

// ── Compétence attendue — nœud central du programme détaillé ─────────────────
// Ce type est une carte structurée, pas une leçon complète.
// Il ne contient ni exercices, ni corrections, ni contenus pédagogiques.
// Les champs resourceSlots restent vides (status "planned") tant que les PDF
// n'existent pas : ne jamais placer de href sans fichier réel.

export type CurriculumEntry = {
  id: CurriculumEntryId;
  levelSlug: AcademyLevelSlug;
  subject: string;
  domainSlug: string;
  subdomainSlug: string;
  title: string;
  officialReference?: string;
  observableObjective: string;
  successCriteria: string[];
  status: ProgramStatus;
  resourceSlots?: ResourceSlot[];
  competencyId?: string;
  annualPathRef?: CurriculumAnnualPathRef;
  teacherHint?: string;
};

// ── Regroupement par sous-domaine ─────────────────────────────────────────────

export type CurriculumSubdomainMap = {
  subdomainSlug: string;
  label: string;
  entries: CurriculumEntry[];
};

// ── Regroupement par domaine (= matière) ─────────────────────────────────────

export type CurriculumDomainMap = {
  domainSlug: string;
  subject: string;
  label: string;
  subdomains: CurriculumSubdomainMap[];
};

// ── Carte complète d'un niveau (type enrichi) ────────────────────────────────
// Nommé CurriculumLevelMap pour ne pas entrer en conflit avec le CurriculumMap
// existant dans learning-architecture-types.ts (structure subjects/domains).
// Les fichiers content/levels/[level]-curriculum.ts exporteront ce type.

export type CurriculumLevelMap = {
  levelSlug: AcademyLevelSlug;
  domains: CurriculumDomainMap[];
};
