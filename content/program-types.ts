// Types pédagogiques communs — Académie Kerboeuf.
// Structure : Cycle → Niveau → Domaine → Sous-domaine → Leçon → Exercices.
//
// Ce fichier n'importe rien du reste du projet.
// Il est indépendant de types-program.ts (qui reste utilisé par CM2).
// Les fichiers content/levels/*.ts l'importeront progressivement.

// ── Identifiants de cycles officiels EN ──────────────────────────────────────

export type AcademyCycleId =
  | "cycle-1"  // Maternelle (PS, MS, GS)
  | "cycle-2"  // CP, CE1, CE2
  | "cycle-3"  // CM1, CM2, 6e
  | "cycle-4"  // 5e, 4e, 3e
  | "lycee";   // Seconde, Première, Terminale

/** @deprecated Utiliser AcademyCycleId */
export type AcademyCycle = AcademyCycleId;

// ── Niveaux scolaires ─────────────────────────────────────────────────────────

export type AcademyLevelSlug =
  | "ps" | "ms" | "gs"
  | "cp" | "ce1" | "ce2" | "cm1" | "cm2"
  | "6e" | "5e" | "4e" | "3e"
  | "seconde" | "premiere" | "terminale";

// ── Paliers scolaires ─────────────────────────────────────────────────────────

export type AcademyStage =
  | "maternelle"
  | "primaire"
  | "college"
  | "lycee";

// ── Statut commun pour tous les nœuds pédagogiques ───────────────────────────

export type ProgramStatus =
  | "available"    // contenu exploitable, affiché
  | "in-progress"  // visible mais incomplet
  | "upcoming";    // prévu, pas encore disponible

// ── Ressources pédagogiques PDF futures ──────────────────────────────────────
// Le site référence les ressources et leurs statuts ; les PDF portent le
// contenu d'enseignement complet. Ne définir href que pour une ressource réelle.

export type PedagogicalResourceStatus =
  | "planned"         // ressource prévue, pas encore produite
  | "in-preparation"  // ressource en cours de préparation
  | "available"       // ressource disponible avec un href réel
  | "missing"         // ressource volontairement absente pour cette leçon
  | "archived";       // ancienne ressource conservée mais non mise en avant

export type ResourceStatus = PedagogicalResourceStatus;

export type PedagogicalResourceKind =
  | "lesson-pdf"
  | "exercises-pdf"
  | "correction-pdf"
  | "assessment-pdf"
  | "projectable-pdf"
  | "parent-sheet-pdf";

export type ResourceAudience =
  | "student"
  | "teacher"
  | "parent"
  | "classroom";

export type AvailablePedagogicalResourceRef = {
  kind: PedagogicalResourceKind;
  label: string;
  status: "available";
  href: string;
  description?: string;
  audience?: ResourceAudience;
  updatedAt?: string;
};

export type UnavailablePedagogicalResourceRef = {
  kind: PedagogicalResourceKind;
  label: string;
  status: Exclude<PedagogicalResourceStatus, "available">;
  href?: never;
  description?: string;
  audience?: ResourceAudience;
  updatedAt?: string;
};

export type PedagogicalResourceRef =
  | AvailablePedagogicalResourceRef
  | UnavailablePedagogicalResourceRef;

// Type secondaire réservé à une éventuelle vue d'affichage.
// La source canonique d'une leçon reste resources: PedagogicalResourceRef[].
export type LessonResourceSet = {
  lesson?: PedagogicalResourceRef;
  exercises?: PedagogicalResourceRef;
  correction?: PedagogicalResourceRef;
  projectable?: PedagogicalResourceRef;
  parentSheet?: PedagogicalResourceRef;
};

// ── Compétences observables ──────────────────────────────────────────────────
// Le site organise les compétences et leurs ressources ; les PDF portent les
// contenus complets d'enseignement, d'exercices et de correction.

/**
 * @deprecated Utiliser LearningCompetency depuis @/content/learning-architecture-types.
 * Ce type est conservé pour le CM2 (univers Félix) et quelques fichiers legacy.
 * Il ne doit pas être utilisé pour CP, CE1, CE2, CM1, collège ou lycée.
 * Les deux types ont des shapes incompatibles (objective vs observableObjective,
 * resourceRefs vs resourceSlots, stage présent ici mais absent dans l'autre).
 */
export type LearningCompetency = {
  id: string;
  slug: string;
  title: string;
  levelSlug: AcademyLevelSlug;
  cycle: AcademyCycleId;
  stage: AcademyStage;
  domainSlug: string;
  subdomainSlug: string;
  objective: string;
  status: ProgramStatus;
  lessonIds: string[];
  description?: string;
  officialReference?: string;
  successCriteria?: string[];
  resourceRefs?: PedagogicalResourceRef[];
  prerequisiteIds?: string[];
  nextCompetencyIds?: string[];
  transversalTags?: string[];
  teacherNotes?: string;
  parentNotes?: string;
};

// ── Supports pédagogiques ─────────────────────────────────────────────────────

export type SupportRef = {
  label: string;
  hint?: string; // description courte pour enseignant ou parent
};

// ── Personnage-guide ──────────────────────────────────────────────────────────
// Lien léger — le personnage accompagne la leçon, il ne la structure pas.

export type AcademyCharacterLink = {
  characterSlug: string; // "kiwi" | "gaston" | "esteban" | "noisette" | "felix"
  name: string;
  roleHint?: string;     // ex. "Kiwi encourage à lire jusqu'au bout"
};

/** @deprecated Utiliser AcademyCharacterLink */
export type AcademyCharacter = {
  id: string;
  name: string;
  levelSlug?: string;
  role: string;
  description?: string;
};

// ── Mission liée ──────────────────────────────────────────────────────────────
// Lien léger — la mission accompagne la leçon, elle ne la remplace pas.

export type LearningMissionLink = {
  missionSlug: string;
  title?: string;
  description?: string;
};

// ── Vue parent ────────────────────────────────────────────────────────────────

export type ParentGuidance = {
  summary: string;                   // "Votre enfant apprend à…"
  quickTips: string[];               // conseils rapides pour aider à la maison
  successSigns: string[];            // signes observables que la leçon est acquise
  recommendedExerciseIds?: string[]; // ids d'exercices conseillés à la maison
};

// ── Exercice ──────────────────────────────────────────────────────────────────

export type ExerciseDifficulty =
  | "decouverte"         // guidé, premier contact avec la notion
  | "entrainement"       // application directe de la leçon
  | "approfondissement"; // transfert, situation nouvelle ou combinaison

export type ExerciseActivityType =
  | "qcm"
  | "fill-blank"
  | "free-text"
  | "reading-comprehension"
  | "matching"
  | "drawing"
  | "oral";

export type Exercise = {
  id: string;
  slug: string;
  lessonId: string;
  instruction: string;
  difficulty: ExerciseDifficulty;
  activityType: ExerciseActivityType;
  validation: string;   // critère de réussite ou correction courte
  status: ProgramStatus;
};

// ── Leçon ─────────────────────────────────────────────────────────────────────

export type Lesson = {
  id: string;
  slug: string;
  title: string;
  objective: string;              // "Comprendre qui fait quoi dans une phrase"
  skill: string;                  // compétence EN — formule courte
  skills?: string[];              // compétences courtes affichables sur une page portail
  parentGuidance: ParentGuidance;
  successCriteria: string[];
  exercises: Exercise[];
  // Convention canonique : les ressources PDF sont stockées en tableau.
  // getPedagogicalResourceSlots() les normalise en slots d'affichage.
  // Le site affiche statuts et liens, sans embarquer les contenus pédagogiques.
  resources?: PedagogicalResourceRef[];
  missionLink?: LearningMissionLink;
  linkedMissionSlugs?: string[];
  competencyIds?: string[];
  characterLink?: AcademyCharacterLink;
  guideCharacterSlug?: string;
  printableSupport?: SupportRef;
  projectableSupport?: SupportRef;
  status: ProgramStatus;
};

// ── Nœud de portail cible ────────────────────────────────────────────────────
// Version légère d'une leçon pour les futures pages de sous-domaine : elle
// organise les ressources sans embarquer le contenu complet des PDF.

export type PortalLessonNode = {
  id: string;
  slug: string;
  title: string;
  objective?: string;
  skills?: string[];
  status: PedagogicalResourceStatus;
  // Même convention que Lesson.resources : tableau canonique, slots côté affichage.
  resources: PedagogicalResourceRef[];
  linkedMissionSlugs?: string[];
  guideCharacterSlug?: string;
};

// ── Sous-domaine ──────────────────────────────────────────────────────────────

export type ProgramSubdomain = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  competencies?: LearningCompetency[];
  status: ProgramStatus;
};

// ── Domaine ───────────────────────────────────────────────────────────────────

export type ProgramDomain = {
  id: string;
  slug: string;
  title: string;
  officialLabel?: string; // libellé exact du programme officiel EN
  description?: string;
  subdomains: ProgramSubdomain[];
  status: ProgramStatus;
};

// ── Niveau avec son arbre de domaines ─────────────────────────────────────────

export type AcademyLevelProgram = {
  levelSlug: AcademyLevelSlug;
  label: string;
  cycle: AcademyCycleId;
  stage: AcademyStage;
  characterLink?: AcademyCharacterLink;
  domains: ProgramDomain[];
};

// ── Parcours annuels ──────────────────────────────────────────────────────────
// Modèle distinct des parcours de missions : il décrit une progression annuelle
// par périodes et semaines, sans embarquer les contenus complets des ressources.

export type AnnualResourceSlotKind =
  | "weekly-plan"
  | "student-sheet"
  | "teacher-guide"
  | "projectable-support"
  | "correction"
  | "assessment"
  | "parent-sheet";

export type AnnualResourceSlot = {
  kind: AnnualResourceSlotKind;
  label: string;
  resource?: PedagogicalResourceRef;
};

export type AnnualPathWeek = {
  weekNumber: number;
  title: string;
  objective: string;
  competencyIds: string[];
  status: ProgramStatus;
  lessonIds?: string[];
  resourceSlots?: AnnualResourceSlot[];
  periodId?: string;
  teacherNote?: string;
  parentNote?: string;
};

export type AnnualPathPeriod = {
  id: string;
  label: string;
  order: number;
  weeks: AnnualPathWeek[];
  objective?: string;
  competencyIds?: string[];
  status?: ProgramStatus;
};

export type AnnualLearningPath = {
  id: string;
  slug: string;
  title: string;
  levelSlug: AcademyLevelSlug;
  cycle: AcademyCycleId;
  subject: string;
  domainSlug?: string;
  subdomainSlug?: string;
  annualObjective: string;
  durationLabel: string;
  weekCount: number;
  periods: AnnualPathPeriod[];
  status: ProgramStatus;
  description?: string;
  competencyIds?: string[];
  lessonIds?: string[];
  guideCharacterSlug?: string;
  audienceNotes?: {
    teacher?: string;
    parent?: string;
    student?: string;
  };
};

/** @deprecated Utiliser AcademyLevelProgram */
export type AcademyLevel = {
  slug: string;
  label: string;
  cycle: AcademyCycleId;
  guideCharacterId?: string;
  domains: ProgramDomain[];
};

// ── Cycle ─────────────────────────────────────────────────────────────────────

export type AcademyCycleProgram = {
  cycleId: AcademyCycleId;
  label: string;          // "Cycle 2 — CP, CE1, CE2"
  levels: AcademyLevelProgram[];
};
