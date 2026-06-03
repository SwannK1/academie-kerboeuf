// Agrégation interne des séquences pédagogiques pour le tableau de suivi.
// Données exclusivement statiques — aucun lien fictif, aucune ressource inventée.

import { cpLearningTree } from "@/content/levels/cp-learning-tree";
import { ce1LearningTree } from "@/content/levels/ce1-learning-tree";
import { ce2LearningTree } from "@/content/levels/ce2-learning-tree";
import { cm1LearningTree } from "@/content/cm1-learning-tree";
import { cm2LearningTree } from "@/content/cm2-learning-tree";
import type { AcademyLevelProgram, PedagogicalResourceRef } from "@/content/program-types";
import type { Cm1LearningTree } from "@/content/cm1-learning-tree";
import type { Cm2LearningTree } from "@/content/cm2-learning-tree";

export type ResourceCellStatus =
  | "available"
  | "in-preparation"
  | "planned"
  | "missing"
  | "none";

export type SequenceRow = {
  level: string;
  subject: string;
  domain: string;
  subdomain: string;
  title: string;
  competency: string;
  status: string;
  lesson: ResourceCellStatus;
  exercises: ResourceCellStatus;
  evaluation: ResourceCellStatus;
  correction: ResourceCellStatus;
  projectable: ResourceCellStatus;
  parentSheet: ResourceCellStatus;
  updatedAt?: string;
};

function resourceCellStatus(
  resources: PedagogicalResourceRef[] | undefined,
  kind: PedagogicalResourceRef["kind"],
): ResourceCellStatus {
  if (!resources) return "none";
  const ref = resources.find((r) => r.kind === kind);
  if (!ref) return "none";
  return ref.status as ResourceCellStatus;
}

function fromAcademyLevelProgram(
  tree: AcademyLevelProgram,
  levelLabel: string,
): SequenceRow[] {
  const rows: SequenceRow[] = [];
  for (const domain of tree.domains) {
    for (const subdomain of domain.subdomains) {
      for (const lesson of subdomain.lessons) {
        rows.push({
          level: levelLabel,
          subject: domain.title,
          domain: domain.title,
          subdomain: subdomain.title,
          title: lesson.title,
          competency: lesson.skill,
          status: lesson.status,
          lesson: resourceCellStatus(lesson.resources, "lesson-pdf"),
          exercises: resourceCellStatus(lesson.resources, "exercises-pdf"),
          evaluation: resourceCellStatus(lesson.resources, "assessment-pdf"),
          correction: resourceCellStatus(lesson.resources, "correction-pdf"),
          projectable: resourceCellStatus(lesson.resources, "projectable-pdf"),
          parentSheet: resourceCellStatus(lesson.resources, "parent-sheet-pdf"),
        });
      }
    }
  }
  return rows;
}

function fromCm1Tree(tree: Cm1LearningTree): SequenceRow[] {
  const rows: SequenceRow[] = [];
  for (const subject of tree) {
    for (const domain of subject.domains) {
      for (const subdomain of domain.subdomains) {
        for (const seq of subdomain.sequences) {
          const lessonSlot = seq.pdfSlots.find((s) => s.type === "lesson");
          const exerciseSlot = seq.pdfSlots.find((s) => s.type === "exercise");
          const correctionSlot = seq.pdfSlots.find(
            (s) => s.type === "correction",
          );
          rows.push({
            level: "CM1",
            subject: subject.title,
            domain: domain.title,
            subdomain: subdomain.title,
            title: seq.title,
            competency: seq.competency,
            status: seq.status,
            lesson: lessonSlot ? (lessonSlot.status as ResourceCellStatus) : "none",
            exercises: exerciseSlot ? (exerciseSlot.status as ResourceCellStatus) : "none",
            evaluation: "none",
            correction: correctionSlot ? (correctionSlot.status as ResourceCellStatus) : "none",
            projectable: "none",
            parentSheet: "none",
          });
        }
      }
    }
  }
  return rows;
}

function fromCm2Tree(tree: Cm2LearningTree): SequenceRow[] {
  const rows: SequenceRow[] = [];
  for (const subject of tree) {
    for (const domain of subject.domains) {
      for (const subdomain of domain.subdomains) {
        for (const lesson of subdomain.lessons) {
          const lessonRes = lesson.resources.find((r) => r.type === "lesson");
          const exerciseRes = lesson.resources.find(
            (r) => r.type === "exercise",
          );
          const evalRes = lesson.resources.find((r) => r.type === "evaluation");
          rows.push({
            level: "CM2",
            subject: subject.title,
            domain: domain.title,
            subdomain: subdomain.title,
            title: lesson.title,
            competency: "",
            status: lesson.status,
            lesson: lessonRes ? (lessonRes.status as ResourceCellStatus) : "none",
            exercises: exerciseRes ? (exerciseRes.status as ResourceCellStatus) : "none",
            evaluation: evalRes ? (evalRes.status as ResourceCellStatus) : "none",
            correction: "none",
            projectable: "none",
            parentSheet: "none",
          });
        }
      }
    }
  }
  return rows;
}

export function getAllSequenceRows(): SequenceRow[] {
  return [
    ...fromAcademyLevelProgram(cpLearningTree, "CP"),
    ...fromAcademyLevelProgram(ce1LearningTree, "CE1"),
    ...fromAcademyLevelProgram(ce2LearningTree, "CE2"),
    ...fromCm1Tree(cm1LearningTree),
    ...fromCm2Tree(cm2LearningTree),
  ];
}

export const ALL_LEVELS = ["CP", "CE1", "CE2", "CM1", "CM2"] as const;
