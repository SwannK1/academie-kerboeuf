// Types du modèle curriculum global — Académie Kerboeuf.
// Structure : Palier → Niveau → Matière → Domaine → Sous-domaine → Séquence → Ressources.
//
// Compatible avec les types existants de program-types.ts et cm2-learning-tree.ts.
// Ce fichier ne duplique pas AcademyCycleId, AcademyLevelSlug, AcademyStage — déjà dans program-types.ts.
// Il définit une couche globale indépendante, utilisable pour tous les niveaux.

// ── Paliers scolaires ─────────────────────────────────────────────────────────

export type AcademySchoolStage =
  | "maternelle"
  | "elementaire"
  | "college"
  | "lycee";

// ── Types de ressources pédagogiques ─────────────────────────────────────────

export type AcademyResourceType =
  | "lesson"
  | "exercises"
  | "assessment"
  | "correction"
  | "projection"
  | "sequence"
  | "printable"
  | "teacher-guide";

// ── Statut curriculum (pour les nœuds de ce modèle global) ──────────────────

export type CurriculumStatus =
  | "disponible"
  | "a-venir"
  | "en-cours"
  | "brouillon";

// ── Ressource pédagogique ─────────────────────────────────────────────────────

export type AcademyResource = {
  type: AcademyResourceType;
  title: string;
  status: CurriculumStatus;
  /** Défini uniquement si la page ou le fichier existe réellement. */
  href?: string;
  description?: string;
};

// ── Séquence pédagogique ──────────────────────────────────────────────────────

export type AcademySequence = {
  slug: string;
  title: string;
  description: string;
  status: CurriculumStatus;
  objectives: string[];
  estimatedDuration?: string;
  /** Slug du professeur référent existant (professors.ts). */
  teacherReference?: string;
  /** Slug du personnage-guide (ex. "felix"). */
  characterGuide?: string;
  resources: AcademyResource[];
};

// ── Sous-domaine ──────────────────────────────────────────────────────────────

export type AcademySubdomain = {
  slug: string;
  label: string;
  description: string;
  sequences: AcademySequence[];
};

// ── Domaine ───────────────────────────────────────────────────────────────────

export type AcademyDomain = {
  slug: string;
  label: string;
  description: string;
  subdomains: AcademySubdomain[];
};

// ── Matière ───────────────────────────────────────────────────────────────────

export type AcademySubject = {
  slug: string;
  label: string;
  description: string;
  domains: AcademyDomain[];
};

// ── Niveau scolaire ───────────────────────────────────────────────────────────

export type AcademyLevel = {
  slug: string;
  label: string;
  /** Cycle officiel : "cycle-1" | "cycle-2" | "cycle-3" | "cycle-4" | "lycee" */
  cycle: string;
  stage: AcademySchoolStage;
  description: string;
  subjects: AcademySubject[];
};
