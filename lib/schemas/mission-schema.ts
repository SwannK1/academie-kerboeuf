// ── Validation de schéma des missions ────────────────────────────────────────
//
// Implémentation avec des type guards TypeScript purs.
// Architecture prête pour une migration vers Zod (zod.dev) :
//   - Remplacer chaque fonction validateXxx par z.object(...).safeParse()
//   - Le type SchemaValidationResult est déjà aligné sur le retour de Zod
//   - Les messages d'erreur peuvent devenir des ZodIssue
//
// Pourquoi des type guards plutôt que Zod maintenant ?
//   - Zod n'est pas encore dans les dépendances du projet
//   - La validation à l'ingestion est la priorité ; l'outillage peut évoluer
//   - Ces guards sont suffisants pour détecter les missions malformées
// ─────────────────────────────────────────────────────────────────────────────

import type { MissionDefinition } from "@/lib/mission-engine/types";
import type { ActivityTypeKey } from "@/lib/activity-registry/types";

export type SchemaValidationResult<T> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly errors: readonly string[] };

// ── Catalogue des types connus ───────────────────────────────────────────────
// À mettre à jour quand un nouveau type est ajouté au registre.
const KNOWN_ACTIVITY_TYPES: readonly ActivityTypeKey[] = [
  "QCM",
  "FREE_TEXT",
  "FILL_BLANK",
  "READING_COMPREHENSION",
];

// ── Helpers internes ─────────────────────────────────────────────────────────
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// ── SkillReference ───────────────────────────────────────────────────────────
function validateSkillReference(raw: unknown, prefix: string): string[] {
  if (!isObject(raw)) return [`${prefix} doit être un objet`];
  const errors: string[] = [];
  if (!isNonEmptyString(raw.id)) errors.push(`${prefix}.id est requis`);
  if (!isNonEmptyString(raw.label)) errors.push(`${prefix}.label est requis`);
  if (!isNonEmptyString(raw.domain)) errors.push(`${prefix}.domain est requis`);
  if (raw.cycle !== undefined && typeof raw.cycle !== "string") {
    errors.push(`${prefix}.cycle doit être une chaîne si présent`);
  }
  return errors;
}

// ── MissionStep ──────────────────────────────────────────────────────────────
function validateMissionStep(raw: unknown, index: number): string[] {
  const prefix = `steps[${index}]`;
  if (!isObject(raw)) return [`${prefix} doit être un objet`];
  const errors: string[] = [];

  if (!isNonEmptyString(raw.id)) errors.push(`${prefix}.id est requis`);

  if (!KNOWN_ACTIVITY_TYPES.includes(raw.activityType as ActivityTypeKey)) {
    errors.push(
      `${prefix}.activityType "${String(raw.activityType)}" n'est pas dans le catalogue [${KNOWN_ACTIVITY_TYPES.join(", ")}]`,
    );
  }

  if (raw.activityData === undefined || raw.activityData === null) {
    errors.push(`${prefix}.activityData est requis`);
  }

  if (typeof raw.isRequired !== "boolean") {
    errors.push(`${prefix}.isRequired doit être un booléen`);
  }

  if (raw.maxAttempts !== undefined) {
    if (typeof raw.maxAttempts !== "number" || raw.maxAttempts < 1) {
      errors.push(`${prefix}.maxAttempts doit être un entier ≥ 1 si présent`);
    }
  }

  return errors;
}

// ── Metadata ─────────────────────────────────────────────────────────────────
function validateMetadata(raw: unknown): string[] {
  if (!isObject(raw)) return ["metadata doit être un objet"];
  const errors: string[] = [];

  if (!isNonEmptyString(raw.createdAt)) {
    errors.push("metadata.createdAt est requis (format ISO 8601)");
  }
  if (!isNonEmptyString(raw.updatedAt)) {
    errors.push("metadata.updatedAt est requis (format ISO 8601)");
  }

  const validStatuses = ["draft", "review", "validated"] as const;
  if (
    raw.qualityStatus !== undefined &&
    !validStatuses.includes(raw.qualityStatus as (typeof validStatuses)[number])
  ) {
    errors.push(
      `metadata.qualityStatus doit être l'une de : ${validStatuses.join(", ")}`,
    );
  }

  return errors;
}

// ── MissionDefinition ─────────────────────────────────────────────────────────
export function validateMissionDefinition(
  raw: unknown,
): SchemaValidationResult<MissionDefinition> {
  if (!isObject(raw)) {
    return { success: false, errors: ["La mission doit être un objet"] };
  }

  const errors: string[] = [];

  if (!isNonEmptyString(raw.id)) errors.push("id est requis");
  if (!isNonEmptyString(raw.schemaVersion)) errors.push("schemaVersion est requis");
  if (!isNonEmptyString(raw.slug)) errors.push("slug est requis");
  if (!isNonEmptyString(raw.title)) errors.push("title est requis");
  if (typeof raw.description !== "string") errors.push("description est requise");
  if (!isNonEmptyString(raw.subject)) errors.push("subject est requis");
  if (!isNonEmptyString(raw.cycle)) errors.push("cycle est requis");
  if (!isNonEmptyString(raw.levelLabel)) errors.push("levelLabel est requis");

  if (!Array.isArray(raw.skills)) {
    errors.push("skills doit être un tableau");
  } else {
    (raw.skills as unknown[]).forEach((skill, i) => {
      errors.push(...validateSkillReference(skill, `skills[${i}]`));
    });
  }

  if (!Array.isArray(raw.steps)) {
    errors.push("steps doit être un tableau");
  } else if ((raw.steps as unknown[]).length === 0) {
    errors.push("steps ne peut pas être vide");
  } else {
    (raw.steps as unknown[]).forEach((step, i) => {
      errors.push(...validateMissionStep(step, i));
    });
  }

  if (typeof raw.successThreshold !== "number") {
    errors.push("successThreshold doit être un nombre");
  } else if (raw.successThreshold < 0 || raw.successThreshold > 1) {
    errors.push("successThreshold doit être entre 0 et 1");
  }

  if (!Array.isArray(raw.supportedSurfaces)) {
    errors.push("supportedSurfaces doit être un tableau");
  }

  if (raw.metadata !== undefined) {
    errors.push(...validateMetadata(raw.metadata));
  } else {
    errors.push("metadata est requis");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true, data: raw as MissionDefinition };
}

// ── Guard de type rapide (sans messages d'erreur) ────────────────────────────
export function isMissionDefinition(raw: unknown): raw is MissionDefinition {
  return validateMissionDefinition(raw).success;
}

// ── Validation avec log développement ────────────────────────────────────────
export function assertMissionDefinition(
  raw: unknown,
  context?: string,
): MissionDefinition {
  const result = validateMissionDefinition(raw);
  if (!result.success) {
    const prefix = context ? `[${context}] ` : "";
    throw new Error(
      `${prefix}Mission invalide :\n${result.errors.map((e) => `  • ${e}`).join("\n")}`,
    );
  }
  return result.data;
}
