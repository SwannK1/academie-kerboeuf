import type { ComponentType } from "react";
import type {
  ActivityData,
  ActivityRendererProps,
  ActivityTypeKey,
} from "@/lib/activity-registry/types";

// Le registre stocke les renderers sous leur type de base commun.
// La sécurité de type est maintenue par le contrat de registerActivity :
// la clé `type` garantit que le renderer reçoit toujours le bon sous-type.
type AnyRenderer = ComponentType<ActivityRendererProps<ActivityData>>;

const registry = new Map<ActivityTypeKey, AnyRenderer>();

// ── Enregistrement ───────────────────────────────────────────────────────────
// Chaque renderer est enregistré avec son type discriminant.
// Le cast est intentionnel : le registre stocke des handlers pour le type
// de base, mais la dispatch par `activity.type` garantit la cohérence.
export function registerActivity<T extends ActivityData>(
  type: T["type"],
  renderer: ComponentType<ActivityRendererProps<T>>,
): void {
  registry.set(type, renderer as AnyRenderer);
}

// ── Dispatch ─────────────────────────────────────────────────────────────────
export function getActivityRenderer(
  type: ActivityTypeKey,
): AnyRenderer | null {
  return registry.get(type) ?? null;
}

// ── Inspection (dev / tests) ──────────────────────────────────────────────────
export function getRegisteredTypes(): ActivityTypeKey[] {
  return [...registry.keys()];
}

export function isActivityTypeRegistered(type: string): boolean {
  return registry.has(type as ActivityTypeKey);
}
