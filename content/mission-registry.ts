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

/**
 * URL canonique de la page où une mission peut réellement être consultée.
 * - CM2 et lycée ont une page de détail par mission (.../missions/:slug),
 *   mais seulement pour les missions au statut public "disponible" : leur
 *   page de détail appelle notFound() sinon (cf. isMissionPubliclyAvailable).
 *   Pour une mission pas encore disponible, on renvoie vers la page de
 *   listing du niveau (qui existe toujours) plutôt que vers une page de
 *   détail qui répondrait en 404.
 * - Le collège et les autres niveaux de primaire n'ont pas de page de
 *   détail par mission : la mission est présentée sur la page du niveau
 *   (cf. getLevelMissionsPath). Réutiliser ce helper évite de dupliquer
 *   cette règle dans chaque page qui affiche des missions.
 */
export function getMissionHref(mission: Mission): string {
  if (mission.stage === "primaire" && mission.levelSlug !== "cm2") {
    return `/primaire/${mission.levelSlug}/missions`;
  }

  if (mission.stage === "college") {
    return getLevelMissionsPath({ stage: mission.stage, slug: mission.levelSlug });
  }

  if (getPublicStatusKey(mission.status) !== "available") {
    return `/${mission.stage}/${mission.levelSlug}/missions`;
  }

  return `/${mission.stage}/${mission.levelSlug}/missions/${mission.slug}`;
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
