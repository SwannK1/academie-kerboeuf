// Types modèle séquences CM2.
// Couche intermédiaire entre sous-domaine et séances.
// Hiérarchie : domaine → sous-domaine → séquence → séances/ressources.

import type { PublicStatus } from "@/content/public-status";

// ── Ressource PDF associée à une séquence ─────────────────────────────────────

export type Cm2ResourceType =
  | "lesson"
  | "exercise"
  | "correction"
  | "projection"
  | "parent-guide";

export type Cm2SequenceResource = {
  type: Cm2ResourceType;
  label: string;
  status: PublicStatus;
  href?: string;
};

// ── Séance individuelle au sein d'une séquence ────────────────────────────────

export type Cm2Session = {
  slug: string;
  title: string;
  objective: string;
  estimatedDuration?: string;
  resources: Cm2SequenceResource[];
};

// ── Séquence pédagogique ──────────────────────────────────────────────────────

export type Cm2Sequence = {
  slug: string;
  title: string;
  domain: string;
  subdomain: string;
  level: "CM2";
  status: PublicStatus;
  objective: string;
  skills: string[];
  successCriteria: string[];
  evidenceExpected: string[];
  estimatedDuration: string;
  resources: Cm2SequenceResource[];
  teacherReference?: string;
  felixMethodTip?: string;
  printableAvailable: boolean;
  projectionAvailable: boolean;
  sessions?: Cm2Session[];
};

// ── Groupements ───────────────────────────────────────────────────────────────

export type Cm2SequencesBySubdomain = {
  subdomain: string;
  domain: string;
  sequences: Cm2Sequence[];
};
