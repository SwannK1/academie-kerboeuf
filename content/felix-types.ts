// ── Référence aux programmes officiels ─────────────────────────────────────
export type OfficialReference = {
  cycle: string;
  level: string;
  domain: string;
  competencyItems: string[];
  programReference?: string;
};

// ── Livret Scolaire Unique (LSU) ────────────────────────────────────────────
export type LsuDomain = {
  domain: string;
  items: string[];
};

// ── Liens transversaux : CRCN, EMI, EMC, EDD ───────────────────────────────
export type CrossCurricularLink = {
  framework: "CRCN" | "EMI" | "EMC" | "EDD";
  description: string;
};

// ── Adaptations pédagogiques pour l'accessibilité ──────────────────────────
export type MissionAccessibility = {
  dyslexia?: string;
  ulis?: string;
  eip?: string;
  general?: string[];
};

// ── Statut qualité interne (distinct du statut public) ─────────────────────
export type QualityStatus = {
  state: "validée" | "en relecture" | "prototype" | "brouillon";
  note?: string;
  updatedAt?: string;
};

// ── Découpage en séances ────────────────────────────────────────────────────
export type SequenceStep = {
  order: number;
  title: string;
  duration: string;
  type: "découverte" | "entraînement" | "évaluation" | "restitution";
  description: string;
};

export type AcademyCharacter = {
  slug: string;
  name: string;
  species: string;
  level: string;
  role: string;
  biography: string;
  personality: string;
  strengths: string[];
  vulnerabilities: string[];
  motivations: string[];
  voiceTone: string;
  associatedPlaces: string[];
  associatedBadges: string[];
};

export type AcademyPlace = {
  slug: string;
  name: string;
  description: string;
  activities: string[];
  character: string;
  accentColor: "jade" | "gold" | "sky" | "ember";
};

export type AcademyBadge = {
  slug: string;
  name: string;
  description: string;
  gesture: string;
  color: "jade" | "gold" | "sky" | "ember";
};

export type MissionSkill = {
  id: string;
  label: string;
  gesture: string;
  observable: string;
};

export type MissionEvidence = {
  type: "écrit" | "oral" | "production" | "trace" | "numérique";
  description: string;
};

export type MissionDifferentiation = {
  guidance: {
    label: string;
    description: string;
    supports: string[];
  };
  medium: {
    label: string;
    description: string;
    supports: string[];
  };
  autonomy: {
    label: string;
    description: string;
    supports: string[];
  };
};

export type MissionAssessment = {
  type: "formative" | "sommative" | "auto-évaluation" | "co-évaluation";
  criteria: string[];
  selfEvaluation?: string[];
};

export type LearningMission = {
  slug: string;
  title: string;
  subtitle: string;
  mainSubject: string;
  associatedSubjects: string[];
  duration: string;
  status: "disponible" | "bientôt" | "en préparation";
  theme: {
    name: string;
    accentClass: string;
    surfaceClass: string;
    textClass: string;
    ringClass: string;
  };
  synopsis: string;
  felixRole: string;
  skills: MissionSkill[];
  objectives: string[];
  successCriteria: string[];
  evidence: MissionEvidence[];
  printableSupports: string[];
  projectableSupports: string[];
  differentiation: MissionDifferentiation;
  assessment: MissionAssessment;
  restitution: {
    family: string;
    teacher: string;
  };
  associatedPlace: string;
  associatedBadges: string[];
  officialReference?: OfficialReference;
  lsuLinks?: LsuDomain[];
  crossCurricular?: CrossCurricularLink[];
  accessibility?: MissionAccessibility;
  qualityStatus?: QualityStatus;
  sequence?: SequenceStep[];
};
