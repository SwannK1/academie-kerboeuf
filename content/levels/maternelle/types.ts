import type { ProgramStatus } from "@/content/program-types";

// ---------------------------------------------------------------------------
// Niveau
// ---------------------------------------------------------------------------

export type MaternelleLevelSlug = "ps" | "ms" | "gs";

/**
 * Alias documentaire pour les slugs de domaines maternelle.
 * Valeurs possibles : "langage", "activite-physique", "activites-artistiques",
 * "premiers-outils-mathematiques", "explorer-le-monde".
 */
export type MaternelleDomainSlug = string;

// ---------------------------------------------------------------------------
// Type d'atelier
// ---------------------------------------------------------------------------

/**
 * Nature pédagogique d'un atelier maternelle.
 * - "dirige"       : mené par l'enseignant ou l'ATSEM
 * - "autonome"     : réalisé par les élèves sans aide active
 * - "manipulation" : exploration de matériel en petits groupes
 * - "collectif"    : regroupement classe (grand groupe)
 * - "jeu"          : activité à visée ludique structurée
 */
export type MaternelleWorkshopType =
  | "dirige"
  | "autonome"
  | "manipulation"
  | "collectif"
  | "jeu";

// ---------------------------------------------------------------------------
// Ressources
// ---------------------------------------------------------------------------

export type MaternelleResourceKind =
  | "grille-observation"
  | "fiche-atelier"
  | "support-projetable"
  | "fiche-parent"
  | "dictee-adulte";

/** Emplacement pour une ressource PDF future. href uniquement si le fichier existe réellement. */
export type MaternelleResourceSlot = {
  kind: MaternelleResourceKind;
  label: string;
  status: ProgramStatus;
  /** Uniquement si getPublicStatusKey(status) === "available" ET le fichier existe. */
  href?: string;
};

/** Référence précise à une ressource PDF (portail atelier ou séquence). */
export type MaternelleResourceRef = {
  kind: MaternelleResourceKind;
  label: string;
  status: ProgramStatus;
  /** Uniquement si getPublicStatusKey(status) === "available" ET le fichier existe. */
  href?: string;
};

// ---------------------------------------------------------------------------
// Observables (vue catalogue domaine)
// ---------------------------------------------------------------------------

export type MaternelleObservable = {
  id: string;
  title: string;
  description?: string;
  status: ProgramStatus;
};

// ---------------------------------------------------------------------------
// Situations et traces (vue catalogue domaine)
// ---------------------------------------------------------------------------

export type MaternelleSituation = {
  label: string;
};

export type MaternelleTrace = {
  label: string;
};

// ---------------------------------------------------------------------------
// Niveaux d'observation
// ---------------------------------------------------------------------------

/**
 * Palier de maîtrise pour une grille d'observation.
 * Correspond aux trois niveaux habituels en maternelle.
 * - "non-encore" : compétence non encore mobilisée
 * - "en-cours"   : compétence en cours d'acquisition
 * - "acquis"     : compétence stabilisée dans différents contextes
 */
export type MaternelleObservationLevel =
  | "non-encore"
  | "en-cours"
  | "acquis";

// ---------------------------------------------------------------------------
// Grille d'observation (niveau atelier)
// ---------------------------------------------------------------------------

/** Un critère observable dans une grille d'évaluation d'atelier. */
export type MaternelleObservationCriterion = {
  id: string;
  /** Libellé de l'item observable (ex: "Nomme l'objet avec un seul mot"). */
  label: string;
  /**
   * Descripteur de niveau attendu pour ce critère.
   * Ex: "Attendu PS", "Dépassement PS".
   */
  levelDescriptor?: string;
};

/** Grille d'observation associée à un atelier. */
export type MaternelleObservationGrid = {
  id: string;
  title: string;
  criteria: MaternelleObservationCriterion[];
  /**
   * Niveaux d'observation utilisés dans cette grille.
   * Si absent, les trois niveaux par défaut sont implicites :
   * "non-encore" | "en-cours" | "acquis".
   */
  observationLevels?: MaternelleObservationLevel[];
  /**
   * Instruction d'usage réservée à l'enseignant.
   * Ex: "Cocher en séance pour chaque élève du groupe."
   */
  teacherUse?: string;
  status: ProgramStatus;
  /** Référence vers le PDF de grille quand il sera disponible. */
  resourceRef?: MaternelleResourceRef;
};

// ---------------------------------------------------------------------------
// Étape pédagogique (déroulement optionnel d'un atelier)
// ---------------------------------------------------------------------------

/**
 * Étape du déroulement d'un atelier (introduction, activité, clôture).
 * Optionnel : ne renseigner que si le déroulement ne sera pas réservé au PDF.
 * Le site organise — les PDF enseignent.
 */
export type MaternellePedagogicalStep = {
  /** Ex: "Mise en situation", "Activité principale", "Synthèse". */
  label: string;
  /** Durée indicative de l'étape, ex: "5 min". */
  duration?: string;
  /** Description courte de ce qui se passe pendant cette étape. */
  description: string;
};

// ---------------------------------------------------------------------------
// Atelier (unité pédagogique fine)
// ---------------------------------------------------------------------------

export type MaternelleWorkshop = {
  id: string;
  /** Slug de l'atelier, ex: "sac-mystere". */
  slug?: string;
  title: string;
  /** Nature pédagogique de l'atelier. */
  type?: MaternelleWorkshopType;
  /** Objectif pédagogique principal de l'atelier. */
  objective: string;
  /** Durée indicative, ex: "20 min". */
  duration?: string;
  /** Taille de groupe cible, ex: "4-6 élèves". */
  groupSize?: string;
  /** Liste du matériel nécessaire. */
  materials?: string[];
  /** Consigne donnée aux élèves au début de l'atelier. */
  instruction?: string;
  /** Action attendue de la part de l'élève. */
  expectedAction?: string;
  /** Pistes de différenciation pédagogique (allègement / renforcement). */
  differentiation?: string;
  /**
   * Déroulement en étapes.
   * Optionnel — ne pas renseigner si le déroulement complet est réservé au PDF.
   */
  steps?: MaternellePedagogicalStep[];
  status: ProgramStatus;
  /** Grille d'observation propre à cet atelier. */
  observationGrid?: MaternelleObservationGrid;
  /** Ressources PDF futures (fiche atelier, support projetable, etc.). */
  resources?: MaternelleResourceRef[];
};

// ---------------------------------------------------------------------------
// Séquence (ensemble d'ateliers autour d'un objectif commun)
// ---------------------------------------------------------------------------

export type MaternelleSequence = {
  id: string;
  /** Slug de la séquence, ex: "ecouter-et-nommer". */
  slug?: string;
  title: string;
  /** Niveau maternelle de la séquence, ex: "ps". Utile pour les fonctions de filtrage. */
  levelSlug?: MaternelleLevelSlug;
  /** Domaine parent, ex: "langage". */
  domainSlug?: MaternelleDomainSlug;
  /** Sous-domaine parent, optionnel. */
  subdomainSlug?: string;
  /** Description courte de la séquence (1-2 phrases). */
  description?: string;
  /** Objectif principal de la séquence. */
  objective: string;
  /** Objectifs secondaires ou complémentaires. */
  objectives?: string[];
  /** Libellé de période, ex: "Période 1". */
  periodLabel?: string;
  /** Durée estimée de la séquence, ex: "4 séances × 20 min". */
  estimatedDuration?: string;
  /** Nombre de séances prévues. */
  sessionCount?: number;
  /** Compétences observables visées — libellés courts affichables. */
  observableSkills?: string[];
  /**
   * Ce sur quoi l'enseignant doit concentrer son observation pendant la séquence.
   * Ex: "Observer si l'élève nomme spontanément ou seulement sur sollicitation."
   */
  observationFocus?: string;
  status: ProgramStatus;
  workshops: MaternelleWorkshop[];
  /** Notes réservées à l'enseignant (non affichées aux familles). */
  teacherNotes?: string;
  /** Ressources PDF liées à la séquence globale (hors ateliers). */
  resources?: MaternelleResourceRef[];
};

// ---------------------------------------------------------------------------
// Sous-domaine (subdivision officielle d'un domaine)
// ---------------------------------------------------------------------------

export type MaternelleSubdomain = {
  id: string;
  slug: string;
  label: string;
  description: string;
  status: ProgramStatus;
  sequences: MaternelleSequence[];
};

// ---------------------------------------------------------------------------
// Domaine (entrée catalogue — niveau le plus haut)
// ---------------------------------------------------------------------------

export type MaternelleDomainEntry = {
  id: string;
  slug: string;
  label: string;
  shortLabel: string;
  levelSlug: MaternelleLevelSlug;
  officialReference: string;
  description: string;
  observables: MaternelleObservable[];
  situations: MaternelleSituation[];
  traces: MaternelleTrace[];
  resourceSlots: MaternelleResourceSlot[];
  status: ProgramStatus;
  href?: string;
  /**
   * Sous-domaines structurés (séquences + ateliers).
   * Absent (undefined) tant que le domaine n'est pas encore structuré.
   * Défini uniquement dans les fichiers *-subdomains.ts dédiés.
   */
  subdomains?: MaternelleSubdomain[];
};
