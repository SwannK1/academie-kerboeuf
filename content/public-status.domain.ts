export const publicStatusKeys = {
  available: "available",
  partial: "partial",
  preparing: "preparing",
  "coming-soon": "coming-soon",
} as const;

export type PublicStatusKey =
  (typeof publicStatusKeys)[keyof typeof publicStatusKeys];

export type PublicStatus = {
  key: PublicStatusKey;
};

const publicStatuses: Record<PublicStatusKey, PublicStatus> = {
  available: { key: "available" },
  partial: { key: "partial" },
  preparing: { key: "preparing" },
  "coming-soon": { key: "coming-soon" },
};

// Table de correspondance — référentiel central unique des statuts publics.
// Toute ancienne valeur brute (française, anglaise, avec ou sans tiret) doit
// rester listée ici tant que ses producteurs (content/*.ts) n'ont pas été
// migrés vers les clés canoniques ci-dessus. Ne jamais supprimer une entrée
// sans avoir vérifié qu'aucun consommateur ne produit plus cette valeur.
const internalStatusMap = {
  available: publicStatuses.available,
  disponible: publicStatuses.available,
  validé: publicStatuses.available,
  valide: publicStatuses.available,
  validated: publicStatuses.available,

  // "partial" — niveau/domaine ne couvrant qu'une partie de ses ressources.
  // Distinct de "preparing" : ce n'est pas une ressource en production, c'est
  // un ensemble dont une partie seulement est publiée.
  partial: publicStatuses.partial,
  partiel: publicStatuses.partial,

  // "preparing" — ressource en production active (ex-clé "in-progress").
  "in-progress": publicStatuses.preparing,
  preparing: publicStatuses.preparing,
  "en construction": publicStatuses.preparing,
  "en préparation": publicStatuses.preparing,
  "en preparation": publicStatuses.preparing,
  // "en-cours" avec tiret — valeur de CurriculumStatus dans academy-curriculum.types.ts
  "en-cours": publicStatuses.preparing,
  "à vérifier": publicStatuses.preparing,
  "a verifier": publicStatuses.preparing,
  draft: publicStatuses.preparing,
  // "brouillon" — synonyme français de "draft", valeur de CurriculumStatus
  brouillon: publicStatuses.preparing,
  // "in-preparation" — valeur de PedagogicalResourceStatus (program-types.ts)
  "in-preparation": publicStatuses.preparing,

  // "coming-soon" — ressource seulement prévue, pas encore commencée
  // (ex-clé "upcoming").
  upcoming: publicStatuses["coming-soon"],
  "coming-soon": publicStatuses["coming-soon"],
  "à venir": publicStatuses["coming-soon"],
  "a venir": publicStatuses["coming-soon"],
  // "a-venir" avec tiret — valeur de CurriculumStatus dans academy-curriculum.types.ts
  "a-venir": publicStatuses["coming-soon"],
  bientôt: publicStatuses["coming-soon"],
  bientot: publicStatuses["coming-soon"],
  "coming soon": publicStatuses["coming-soon"],
  planned: publicStatuses["coming-soon"],
  // "missing" — ressource volontairement absente pour une leçon (PedagogicalResourceStatus)
  // Affiché comme "À venir" : la ressource n'existe pas encore publiquement
  missing: publicStatuses["coming-soon"],
} satisfies Record<string, PublicStatus>;

export const fallbackPublicStatus = publicStatuses.preparing;

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
