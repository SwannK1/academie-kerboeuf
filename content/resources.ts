import { allMissions } from "@/content/mission-registry";
import type { Mission, MissionStatus } from "@/content/types";

export type ResourceStatus = "disponible" | "à venir" | "en préparation";

export type ClassroomMode = "projection" | "impression" | "correction";

export type ClassroomResource = {
  id: string;
  title: string;
  level: string;
  levelSlug: string;
  stage: "primaire" | "college" | "lycee";
  subject: string;
  objective: string;
  difficulty: string;
  status: ResourceStatus;
  professorName: string;
  href: string;
  modes: ClassroomMode[];
};

const levelDifficulties: Record<string, string> = {
  cm2: "Cycle 3",
  "6e": "guidée",
  "5e": "intermédiaire",
  "4e": "approfondissement",
  "3e": "brevet",
  seconde: "lycée",
  premiere: "lycée",
  terminale: "lycée",
};

function normalizeMissionStatus(status: MissionStatus): ResourceStatus {
  return status === "disponible"
    ? "disponible"
    : status === "bientôt"
      ? "à venir"
      : "en préparation";
}

function modesForResource({
  hasProjection,
  hasPrinting,
  hasCorrection,
}: {
  hasProjection: boolean;
  hasPrinting: boolean;
  hasCorrection: boolean;
}): ClassroomMode[] {
  return [
    hasProjection ? "projection" : null,
    hasPrinting ? "impression" : null,
    hasCorrection ? "correction" : null,
  ].filter((mode): mode is ClassroomMode => Boolean(mode));
}

function missionHref(mission: Mission) {
  return `/${mission.stage}/${mission.levelSlug}/missions/${mission.slug}`;
}

function isLinkableMission(mission: Mission) {
  return mission.stage !== "primaire" || mission.levelSlug === "cm2";
}

function resourceFromMission(mission: Mission): ClassroomResource {
  return {
    id: mission.id,
    title: mission.title,
    level: mission.levelLabel,
    levelSlug: mission.levelSlug,
    stage: mission.stage,
    subject: mission.subject,
    objective: mission.objective ?? mission.description,
    difficulty: mission.difficulty ?? levelDifficulties[mission.levelSlug] ?? mission.curriculum?.cycle ?? mission.levelLabel,
    status: normalizeMissionStatus(mission.status),
    professorName: mission.professor.name,
    href: missionHref(mission),
    modes: modesForResource({
      hasProjection: Boolean(mission.projectionHint ?? mission.pedagogy?.usage?.projection),
      hasPrinting: Boolean(mission.printHint ?? mission.pedagogy?.usage?.printing),
      hasCorrection: Boolean(mission.correction?.length),
    }),
  };
}

export function getClassroomResources(): ClassroomResource[] {
  return allMissions.filter(isLinkableMission).map(resourceFromMission);
}
