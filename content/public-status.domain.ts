export const publicStatusKeys = {
  available: "available",
  partial: "partial",
  "in-progress": "in-progress",
  upcoming: "upcoming",
} as const;

export type PublicStatusKey =
  (typeof publicStatusKeys)[keyof typeof publicStatusKeys];

export type PublicStatus = {
  key: PublicStatusKey;
};

const publicStatuses: Record<PublicStatusKey, PublicStatus> = {
  available: { key: "available" },
  partial: { key: "partial" },
  "in-progress": { key: "in-progress" },
  upcoming: { key: "upcoming" },
};

const internalStatusMap = {
  available: publicStatuses.available,
  disponible: publicStatuses.available,
  validé: publicStatuses.available,
  valide: publicStatuses.available,
  validated: publicStatuses.available,

  partial: publicStatuses.partial,
  partiel: publicStatuses.partial,
  "disponible partiellement": publicStatuses.partial,
  "premières ressources disponibles": publicStatuses.partial,
  "premieres ressources disponibles": publicStatuses.partial,

  upcoming: publicStatuses.upcoming,
  "coming-soon": publicStatuses.upcoming,
  "à venir": publicStatuses.upcoming,
  "a venir": publicStatuses.upcoming,
  "a-venir": publicStatuses.upcoming,
  bientôt: publicStatuses.upcoming,
  bientot: publicStatuses.upcoming,
  "coming soon": publicStatuses.upcoming,
  planned: publicStatuses.upcoming,
  missing: publicStatuses.upcoming,

  "in-progress": publicStatuses["in-progress"],
  preparing: publicStatuses["in-progress"],
  "en construction": publicStatuses["in-progress"],
  "en préparation": publicStatuses["in-progress"],
  "en preparation": publicStatuses["in-progress"],
  "en-cours": publicStatuses["in-progress"],
  "à vérifier": publicStatuses["in-progress"],
  "a verifier": publicStatuses["in-progress"],
  draft: publicStatuses["in-progress"],
  brouillon: publicStatuses["in-progress"],
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

export function aggregatePublicStatus(statuses: readonly unknown[]): PublicStatus {
  const keys = statuses.map((status) => normalizePublicStatus(status).key);

  if (keys.length === 0) {
    return publicStatuses.upcoming;
  }

  if (keys.every((key) => key === "available")) {
    return publicStatuses.available;
  }

  if (keys.some((key) => key === "available" || key === "partial")) {
    return publicStatuses.partial;
  }

  if (keys.some((key) => key === "in-progress")) {
    return publicStatuses["in-progress"];
  }

  return publicStatuses.upcoming;
}
