// Modèle commun de contenu pédagogique — Académie Kerboeuf.
// Tous niveaux : maternelle (cycle 1) → lycée.
//
// Principe : 1 unité = 1 compétence.
// Le site organise (métadonnées, statuts, slots) — les PDF enseignent.
// Ne pas mettre de contenu pédagogique long dans ce fichier.
//
// Progression type : automatismes → application → raisonnement → expression.

import type {
  AcademyLevelSlug,
  ProgramStatus,
} from "@/content/program-types";
import type { ResourceSlot } from "@/content/learning-architecture-types";

// ── Nature de l'unité pédagogique ─────────────────────────────────────────────

export type PedagogicalUnitKind =
  | "sequence"   // maternelle : séquence multi-ateliers autour d'une compétence
  | "lesson"     // primaire / collège : leçon autonome (1 à 3 séances)
  | "module";    // lycée : module pluriséance (4 séances ou plus)

// ── Étapes de progression ─────────────────────────────────────────────────────
// Règle : aucune étape n'est obligatoire pour tous les niveaux.
// Maternelle n'utilise que "automatisms" ; lycée peut aller jusqu'à "expression".

export type LearningProgressionStep =
  | "automatisms"   // mémorisation, manipulation simple, répétition
  | "application"   // réinvestissement dans un contexte proche
  | "reasoning"     // résolution de problème, transfert, analyse
  | "expression";   // production orale/écrite, création, synthèse

// ── Unité pédagogique ─────────────────────────────────────────────────────────

/**
 * Représentation minimale d'une unité de contenu pédagogique.
 * Sert à planifier la production de ressources (PDF) — pas à la stocker.
 *
 * Compatible avec :
 * - MaternelleSequence (cycle 1) → kind "sequence"
 * - LearningCompetency CP/CE1/CE2/CM1 → kind "lesson"
 * - AcademySequence collège/lycée → kind "lesson" ou "module"
 */
export type PedagogicalUnit = {
  id: string;
  slug: string;
  levelSlug: AcademyLevelSlug;
  /** Référence vers l'id d'une LearningCompetency ou MaternelleSequence existante. */
  competencyId?: string;
  title: string;
  /** Objectif pédagogique principal, formulation observable. */
  objective: string;
  kind: PedagogicalUnitKind;
  /** Étapes de progression couvertes (ordre croissant de complexité). */
  progressionSteps?: LearningProgressionStep[];
  /** Slots de ressources PDF — 1 entrée par document prévu. */
  resourceSlots: ResourceSlot[];
  status: ProgramStatus;
};

// ── Slots de ressources standards ─────────────────────────────────────────────
// Ces tableaux définissent les documents attendus pour chaque contexte.
// Utiliser comme valeur initiale de resourceSlots, compléter au besoin.

/** Slots standards pour une unité primaire (CP → CM2) ou collège/lycée. */
export const standardLessonResourceSlots: ResourceSlot[] = [
  { kind: "lesson-pdf",       label: "Leçon" },
  { kind: "exercises-pdf",    label: "Exercices" },
  { kind: "correction-pdf",   label: "Correction" },
  { kind: "assessment-pdf",   label: "Évaluation" },
  { kind: "projectable-pdf",  label: "Support projetable" },
  { kind: "printable-pdf",    label: "Fiche imprimable" },
];

/** Slots standards pour une séquence maternelle (PS / MS / GS). */
export const standardMaternelleResourceSlots: ResourceSlot[] = [
  { kind: "lesson-pdf",        label: "Séquence enseignant" },
  { kind: "printable-pdf",     label: "Fiche atelier" },
  { kind: "projectable-pdf",   label: "Support projetable" },
  { kind: "teacher-guide-pdf", label: "Grille d'observation" },
  { kind: "parent-sheet-pdf",  label: "Fiche parent" },
];

/** Slots standards pour un module lycée (4 séances ou plus). */
export const standardModuleResourceSlots: ResourceSlot[] = [
  { kind: "lesson-pdf",        label: "Cours" },
  { kind: "exercises-pdf",     label: "Exercices d'application" },
  { kind: "correction-pdf",    label: "Correction" },
  { kind: "assessment-pdf",    label: "Évaluation" },
  { kind: "teacher-guide-pdf", label: "Guide enseignant" },
  { kind: "projectable-pdf",   label: "Support projetable" },
];
