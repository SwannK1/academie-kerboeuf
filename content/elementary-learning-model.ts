import type { AcademyLevelSlug, ProgramStatus } from "@/content/program-types";

export type ElementaryLevelSlug = Extract<
  AcademyLevelSlug,
  "cp" | "ce1" | "ce2" | "cm1" | "cm2"
>;

export type LearningPeriod = "P1" | "P2" | "P3" | "P4" | "P5";

export type LearningSessionType =
  | "problem-situation"
  | "lesson"
  | "guided-practice"
  | "consolidation"
  | "assessment";

export type LearningSession = {
  id: string;
  title: string;
  type: LearningSessionType;
  order: 1 | 2 | 3 | 4 | 5;
  duration: string;
  goal: string;
  summary: string;
  pdfHref?: string;
  status: ProgramStatus;
};

export type LearningSequence = {
  id: string;
  title: string;
  level: ElementaryLevelSlug;
  subject: string;
  domain: string;
  subdomain: string;
  period: LearningPeriod;
  objective: string;
  successCriteria: string[];
  sessions: LearningSession[];
  status: ProgramStatus;
};

export type LearningNotion = LearningSequence;
