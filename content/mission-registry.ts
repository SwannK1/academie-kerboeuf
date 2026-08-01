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
  return allMissions.filter(
    (mission) => getPublicStatusKey(mission.status) === "available",
  );
}

/**
 * Route publique d'une mission — logique centrale unique, réutilisée par
 * tous les pipelines qui construisent un lien vers une mission
 * (`/ressources`, `/missions-recentes`, `/parcours`).
 *
 * Le CM2 et le lycée disposent d'une page de détail par slug
 * (`missions/[slug]`). Le collège et le primaire hors CM2 n'en ont pas
 * encore : on retombe sur la page du niveau plutôt que de construire un
 * lien vers une route inexistante.
 */
export function getMissionHref(mission: Mission): string {
  if (mission.stage === "primaire" && mission.levelSlug !== "cm2") {
    return `/primaire/${mission.levelSlug}/missions`;
  }

  if (mission.stage === "college") {
    return getLevelMissionsPath({
      stage: mission.stage,
      slug: mission.levelSlug,
    });
  }

  return `/${mission.stage}/${mission.levelSlug}/missions/${mission.slug}`;
}

/**
 * Vrai seulement si une page de détail par slug existe réellement pour ce
 * niveau (CM2 et lycée). À utiliser pour décider si une liste doit inclure
 * une mission comme ressource cliquable en tant que telle, par opposition à
 * un simple renvoi vers la page de son niveau.
 */
export function isMissionDetailLinkable(mission: Mission): boolean {
  return mission.levelSlug === "cm2" || mission.stage === "lycee";
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
