import { getMission } from "@/content/mission-registry";
import type { ClassroomMode } from "@/content/resources";
import type { Mission, MissionStatus } from "@/content/types";

export type LearningPathStatus = "disponible" | "à venir" | "en préparation";

export type LearningPathMissionRef = {
  levelSlug: string;
  missionSlug: string;
};

export type LearningPath = {
  slug: string;
  title: string;
  level: string;
  levelSlug: string;
  stage: "primaire" | "college" | "lycee";
  subject: string;
  globalObjective: string;
  estimatedDuration: string;
  missions: LearningPathMissionRef[];
  competencies: string[];
  professorName: string;
  professorSlug: string;
  status: LearningPathStatus;
};

export type LearningPathStep = {
  title: string;
  level: string;
  subject: string;
  objective: string;
  href: string;
  status: LearningPathStatus;
  modes: ClassroomMode[];
};

export type LearningPathWithSteps = LearningPath & {
  steps: LearningPathStep[];
};

export const learningPaths: LearningPath[] = [
  {
    slug: "cm2-lire-comme-un-detective",
    title: "Lire comme un détective",
    level: "CM2",
    levelSlug: "cm2",
    stage: "primaire",
    subject: "Lecture",
    globalObjective:
      "Installer les réflexes de lecture experte : inférer, justifier et vérifier les indices du texte.",
    estimatedDuration: "3 séances courtes",
    missions: [
      { levelSlug: "cm2", missionSlug: "mission-inference" },
      { levelSlug: "cm2", missionSlug: "lecture-strategique" },
      { levelSlug: "cm2", missionSlug: "production-ecrit" },
    ],
    competencies: [
      "Prélever des indices explicites et implicites.",
      "Justifier une réponse avec des éléments du texte.",
      "Passer de la compréhension à une formulation écrite claire.",
    ],
    professorName: "Félix",
    professorSlug: "felix",
    status: "disponible",
  },
  {
    slug: "6e-entrer-au-college-avec-methode",
    title: "Entrer au collège avec méthode",
    level: "6e",
    levelSlug: "6e",
    stage: "college",
    subject: "Méthodologie",
    globalObjective:
      "Aider les élèves à comprendre les consignes, lire les supports et organiser leurs premières réponses de collégien.",
    estimatedDuration: "3 à 4 séances",
    missions: [
      { levelSlug: "6e", missionSlug: "lecture-de-carte" },
      { levelSlug: "6e", missionSlug: "recit-mythologique" },
      { levelSlug: "6e", missionSlug: "proportionnalite-simple" },
    ],
    competencies: [
      "Lire un document avant de répondre.",
      "Identifier ce que la consigne demande réellement.",
      "Construire une réponse complète et vérifiée.",
    ],
    professorName: "Oria",
    professorSlug: "oria",
    status: "disponible",
  },
  {
    slug: "3e-preparer-le-brevet",
    title: "Préparer le brevet",
    level: "3e",
    levelSlug: "3e",
    stage: "college",
    subject: "Méthodologie",
    globalObjective:
      "Structurer les gestes essentiels du brevet : analyser, répondre, citer et organiser ses révisions.",
    estimatedDuration: "4 séances",
    missions: [
      { levelSlug: "3e", missionSlug: "brevet" },
      { levelSlug: "3e", missionSlug: "analyse-de-document" },
      { levelSlug: "3e", missionSlug: "organisation-des-revisions" },
    ],
    competencies: [
      "Repérer les attentes d’un sujet.",
      "Transformer un document en preuve.",
      "Planifier une révision réaliste.",
    ],
    professorName: "Akira",
    professorSlug: "akira",
    status: "disponible",
  },
  {
    slug: "seconde-reussir-son-entree-au-lycee",
    title: "Réussir son entrée au lycée",
    level: "Seconde",
    levelSlug: "seconde",
    stage: "lycee",
    subject: "Méthodologie",
    globalObjective:
      "Installer des méthodes de travail solides pour passer du collège au lycée sans se disperser.",
    estimatedDuration: "3 séances",
    missions: [
      { levelSlug: "seconde", missionSlug: "methode-lycee" },
      { levelSlug: "seconde", missionSlug: "lecture-analytique" },
      { levelSlug: "seconde", missionSlug: "raisonnement-scientifique" },
    ],
    competencies: [
      "Découper une tâche longue.",
      "Relire efficacement un cours ou un texte.",
      "Raisonner à partir de données fiables.",
    ],
    professorName: "Oria",
    professorSlug: "oria",
    status: "disponible",
  },
  {
    slug: "terminale-philosophie-et-strategie-de-revision",
    title: "Philosophie et stratégie de révision",
    level: "Terminale",
    levelSlug: "terminale",
    stage: "lycee",
    subject: "Philosophie",
    globalObjective:
      "Préparer les élèves à penser, problématiser et organiser leurs révisions dans une année d’examen.",
    estimatedDuration: "4 séances",
    missions: [
      { levelSlug: "terminale", missionSlug: "philosophie" },
      { levelSlug: "terminale", missionSlug: "strategie-de-revision" },
      { levelSlug: "terminale", missionSlug: "orientation" },
    ],
    competencies: [
      "Définir une notion avant de répondre.",
      "Construire une problématique.",
      "Choisir une stratégie de révision active.",
    ],
    professorName: "Akira",
    professorSlug: "akira",
    status: "disponible",
  },
];

export function getLearningPath(slug: string) {
  return learningPaths.find((path) => path.slug === slug);
}

export function getLearningPathWithSteps(slug: string) {
  const path = getLearningPath(slug);

  if (!path) {
    return undefined;
  }

  return resolveLearningPath(path);
}

export function getLearningPathsWithSteps() {
  return learningPaths.map(resolveLearningPath);
}

function resolveLearningPath(path: LearningPath): LearningPathWithSteps {
  const steps = path.missions
    .map((missionRef) =>
      getMission(missionRef.levelSlug, missionRef.missionSlug),
    )
    .filter((mission): mission is Mission => Boolean(mission))
    .map((mission) => ({
      title: mission.title,
      level: mission.levelLabel,
      subject: mission.subject,
      objective: mission.objective ?? mission.description,
      href: missionHref(mission),
      status: normalizeMissionStatus(mission.status),
      modes: modesForMission(mission),
    }));

  return {
    ...path,
    steps,
  };
}

function normalizeMissionStatus(status: MissionStatus): LearningPathStatus {
  return status === "bientôt" ? "à venir" : status;
}

function missionHref(mission: Mission) {
  return `/${mission.stage}/${mission.levelSlug}/missions/${mission.slug}`;
}

function modesForMission(mission: Mission): ClassroomMode[] {
  return [
    mission.projectionHint ?? mission.pedagogy?.usage?.projection
      ? "projection"
      : null,
    mission.printHint ?? mission.pedagogy?.usage?.printing ? "impression" : null,
    mission.correction?.length ? "correction" : null,
  ].filter((mode): mode is ClassroomMode => Boolean(mode));
}
