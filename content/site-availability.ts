import {
  academyLevels,
  hasRealMissionContent,
  type AcademyStage,
} from "@/content/academy";
import { cm2FichesMaths } from "@/content/cm2-fiches-maths";
import type { AcademyLevelSlug } from "@/content/program-types";
import {
  getAggregatedPublicStatus,
  getPublicStatusKey,
  type PublicStatusKey,
} from "@/content/public-status";
import { getClassroomResources } from "@/content/resources";
import { teacherDashboardSections } from "@/content/teacher-dashboard";

export type AvailabilityCounts = Record<PublicStatusKey, number>;

export type LevelGroupAvailability = {
  id: "maternelle" | AcademyStage | "enseignants";
  label: string;
  href: string;
  status: PublicStatusKey;
  availableResources: number;
  counts: AvailabilityCounts;
};

const publicStatusKeys = [
  "available",
  "partial",
  "in-progress",
  "upcoming",
] as const satisfies readonly PublicStatusKey[];

const primaryLevelSlugs = ["cp", "ce1", "ce2", "cm1", "cm2"] as const;
const maternelleLevelSlugs = ["ps", "ms", "gs"] as const;

const emptyCounts = () =>
  Object.fromEntries(publicStatusKeys.map((key) => [key, 0])) as AvailabilityCounts;

function countByPublicStatus(statuses: readonly unknown[]) {
  const counts = emptyCounts();

  for (const status of statuses) {
    counts[getPublicStatusKey(status)] += 1;
  }

  return counts;
}

function statusFromCounts(counts: AvailabilityCounts) {
  return getAggregatedPublicStatus(
    publicStatusKeys.flatMap((key) => Array.from({ length: counts[key] }, () => key)),
  ).key;
}

function hasAvailableCm2Sheet() {
  return cm2FichesMaths.some((notion) =>
    notion.sheets.some(
      (sheet) => sheet.status === "available" && sheet.imageHref && sheet.pdfHref,
    ),
  );
}

function hasRealLevelContent(levelSlug: string) {
  if (levelSlug === "cm2" && hasAvailableCm2Sheet()) {
    return true;
  }

  const level = academyLevels.find((entry) => entry.slug === levelSlug);

  return level?.missions.some((mission) => hasRealMissionContent(mission)) ?? false;
}

export function getAvailableClassroomResources() {
  return getClassroomResources().filter(
    (resource) => getPublicStatusKey(resource.status) === "available",
  );
}

export function getClassroomResourceStatusCounts() {
  return countByPublicStatus(
    getClassroomResources().map((resource) => resource.status),
  );
}

export function getLevelAvailability(levelSlug: AcademyLevelSlug): PublicStatusKey {
  if (hasRealLevelContent(levelSlug)) {
    return "partial";
  }

  if (
    (primaryLevelSlugs as readonly string[]).includes(levelSlug) ||
    (maternelleLevelSlugs as readonly string[]).includes(levelSlug) ||
    levelSlug === "6e" ||
    levelSlug === "seconde"
  ) {
    return "in-progress";
  }

  return "upcoming";
}

export function getMaternelleAvailability(): PublicStatusKey {
  return "in-progress";
}

export function getSchoolStageAvailability(
  stage: AcademyStage,
): LevelGroupAvailability {
  const stageLevels = academyLevels.filter((level) => level.stage === stage);
  const levelStatuses = stageLevels.map((level) =>
    getLevelAvailability(level.slug as AcademyLevelSlug),
  );
  const counts = countByPublicStatus(levelStatuses);
  const availableResources = getAvailableClassroomResources().filter(
    (resource) => resource.stage === stage,
  ).length;

  return {
    id: stage,
    label:
      stage === "primaire" ? "Primaire" : stage === "college" ? "Collège" : "Lycée",
    href: `/${stage}`,
    status: statusFromCounts(counts),
    availableResources,
    counts,
  };
}

export function getLevelGroupAvailability(): LevelGroupAvailability[] {
  const teacherToolCount = teacherDashboardSections.flatMap(
    (section) => section.cards,
  ).length;
  const teacherCounts = emptyCounts();
  teacherCounts[teacherToolCount > 0 ? "available" : "upcoming"] =
    teacherToolCount;

  return [
    {
      id: "maternelle",
      label: "Maternelle",
      href: "/maternelle",
      status: getMaternelleAvailability(),
      availableResources: 0,
      counts: { ...emptyCounts(), "in-progress": 3 },
    },
    getSchoolStageAvailability("primaire"),
    getSchoolStageAvailability("college"),
    getSchoolStageAvailability("lycee"),
    {
      id: "enseignants",
      label: "Enseignants",
      href: "/enseignants",
      status: teacherToolCount > 0 ? "available" : "upcoming",
      availableResources: teacherToolCount,
      counts: teacherCounts,
    },
  ];
}

export function getLevelGroupAvailabilityById() {
  return Object.fromEntries(
    getLevelGroupAvailability().map((group) => [group.id, group]),
  ) as Record<LevelGroupAvailability["id"], LevelGroupAvailability>;
}

export const globalAvailability = {
  home: "available",
  resources: getAvailableClassroomResources().length > 0 ? "partial" : "in-progress",
  maternelle: getMaternelleAvailability(),
  primaire: getSchoolStageAvailability("primaire").status,
  college: getSchoolStageAvailability("college").status,
  lycee: getSchoolStageAvailability("lycee").status,
  teachers: "available",
  universe: "available",
} as const satisfies Record<string, PublicStatusKey>;

export const primaryLevelAvailability = primaryLevelSlugs.map((levelSlug) => ({
  levelSlug,
  status: getLevelAvailability(levelSlug),
}));
