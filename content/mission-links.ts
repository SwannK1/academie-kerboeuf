import type { Mission } from "@/content/types";

export function getMissionPublicHref(mission: Mission): string {
  if (mission.stage === "college") {
    return `/college/${mission.levelSlug}`;
  }

  if (mission.stage === "lycee") {
    return mission.status === "disponible"
      ? `/lycee/${mission.levelSlug}/missions/${mission.slug}`
      : `/lycee/${mission.levelSlug}/missions`;
  }

  if (mission.levelSlug === "cm2" && mission.status === "disponible") {
    return `/primaire/cm2/missions/${mission.slug}`;
  }

  return `/primaire/${mission.levelSlug}/missions`;
}
