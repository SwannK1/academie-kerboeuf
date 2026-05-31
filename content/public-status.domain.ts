export const publicStatusKeys = {
  available: "available",
  upcoming: "upcoming",
  "in-progress": "in-progress",
} as const;

export type PublicStatusKey =
  (typeof publicStatusKeys)[keyof typeof publicStatusKeys];

export type PublicStatus = {
  key: PublicStatusKey;
};

const publicStatuses: Record<PublicStatusKey, PublicStatus> = {
  available: { key: "available" },
  upcoming: { key: "upcoming" },
  "in-progress": { key: "in-progress" },
};

const internalStatusMap = {
  available: publicStatuses.available,
  disponible: publicStatuses.available,
  validé: publicStatuses.available,
  valide: publicStatuses.available,
  validated: publicStatuses.available,

  upcoming: publicStatuses.upcoming,
  "à venir": publicStatuses.upcoming,
  "a venir": publicStatuses.upcoming,
  bientôt: publicStatuses.upcoming,
  bientot: publicStatuses.upcoming,
  "coming soon": publicStatuses.upcoming,
  planned: publicStatuses.upcoming,

  "in-progress": publicStatuses["in-progress"],
  "en construction": publicStatuses["in-progress"],
  "en préparation": publicStatuses["in-progress"],
  "en preparation": publicStatuses["in-progress"],
  "à vérifier": publicStatuses["in-progress"],
  "a verifier": publicStatuses["in-progress"],
  draft: publicStatuses["in-progress"],
  partial: publicStatuses["in-progress"],
  partiel: publicStatuses["in-progress"],
} satisfies Record<string, PublicStatus>;

export const fallbackPublicStatus = publicStatuses["in-progress"];

export function isPublicStatus(status: unknown): status is PublicStatus {
  if (!status || typeof status !== "object") {
    return false;
  }

  const key = (status as { key?: unknown }).key;

  return typeof key === "string" && key in publicStatuses;
}

export function normalizePublicStatus(status: unknown): PublicStatus {
  if (isPublicStatus(status)) {
    return publicStatuses[status.key];
  }

  if (typeof status !== "string") {
    return fallbackPublicStatus;
  }

  return (
    (internalStatusMap as Record<string, PublicStatus>)[
      status.trim().toLowerCase()
    ] ?? fallbackPublicStatus
  );
}
