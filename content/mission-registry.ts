import { academyLevels, getLevelMissionsPath } from "@/content/academy";
import { cm2Missions } from "@/content/cm2";
import {
  academyMissionToMission,
  cm2MissionToMission,
} from "@/content/mission-adapters";
import { getPublicStatusKey } from "@/content/public-status";
import type { Mission } from "@/content/types";

// Transitional registry for the future `content/missions/index.ts`.
// The exact folder path cannot exist yet because `content/missions.ts`
// remains the legacy shared-missions module during this migration phase.

export type MissionRegistryIssue = {
  key: string;
  missionIds: string[];
};

export type MissionRegistryValidation = {
  duplicateIds: MissionRegistryIssue[];
  duplicateSlugsByLevel: MissionRegistryIssue[];
};

const cm2CanonicalMissions = cm2Missions.map(cm2MissionToMission);

const academyCanonicalMissions = academyLevels
  // CM2 is already represented by the richer CM2 source above. Keeping only
  // one source here prevents duplicate canonical ids during the transition.
  .filter((level) => level.slug !== "cm2")
  .flatMap((level) =>
    level.missions.map((mission) => academyMissionToMission(level, mission)),
  );

const candidateMissions = [
  ...cm2CanonicalMissions,
  ...academyCanonicalMissions,
];

export const missionRegistryValidation =
  validateMissionRegistry(candidateMissions);

export const allMissions = dedupeById(candidateMissions);

export function getMission(levelSlug: string, slug: string) {
  return allMissions.find(
    (mission) => mission.levelSlug === levelSlug && mission.slug === slug,
  );
}

export function getMissionsForLevel(levelSlug: string) {
  return allMissions.filter((mission) => mission.levelSlug === levelSlug);
}

export function getAvailableMissions() {
  return allMissions.filter((mission) => mission.status === "disponible");
}

// Individual mission detail pages only exist for CM2 and lycée missions, and
// only once a mission is published. Every other case (collège, which has no
// mission detail route at all; or an unavailable CM2/lycée mission, which is
// prerendered as a 404) must fall back to the level's missions path so no
// link ever points at a dead route.
export function getMissionHref(mission: Mission): string {
  const hasMissionDetailPage =
    mission.stage === "lycee" || mission.levelSlug === "cm2";
  const isAvailable = getPublicStatusKey(mission.status) === "available";

  if (hasMissionDetailPage && isAvailable) {
    return `/${mission.stage}/${mission.levelSlug}/missions/${mission.slug}`;
  }

  return getLevelMissionsPath({ stage: mission.stage, slug: mission.levelSlug });
}

function dedupeById(missions: Mission[]) {
  const seen = new Set<string>();

  return missions.filter((mission) => {
    if (seen.has(mission.id)) {
      return false;
    }

    seen.add(mission.id);
    return true;
  });
}

function validateMissionRegistry(
  missions: Mission[],
): MissionRegistryValidation {
  return {
    duplicateIds: findDuplicateKeys(missions, (mission) => mission.id),
    duplicateSlugsByLevel: findDuplicateKeys(
      missions,
      (mission) => `${mission.levelSlug}:${mission.slug}`,
    ),
  };
}

function findDuplicateKeys(
  missions: Mission[],
  getKey: (mission: Mission) => string,
): MissionRegistryIssue[] {
  const grouped = new Map<string, string[]>();

  for (const mission of missions) {
    const key = getKey(mission);
    grouped.set(key, [...(grouped.get(key) ?? []), mission.id]);
  }

  return [...grouped.entries()]
    .filter(([, missionIds]) => missionIds.length > 1)
    .map(([key, missionIds]) => ({ key, missionIds }));
}
