"use client";

/**
 * Favoris et récents : ressources, outils, pages. Local, sans compte.
 */

import { createLocalStore, isRecord, useLocalStore } from "@/lib/workspace/store";

export const ACTIVITY_KEY = "ak-activite-v1";

export type ActivityKind = "ressource" | "outil" | "page";

export type ActivityItem = { kind: ActivityKind; id: string; label: string; href: string; detail?: string; at: string };

export type ActivityState = { version: 1; favorites: ActivityItem[]; recents: ActivityItem[] };

const KINDS: ActivityKind[] = ["ressource", "outil", "page"];
const MAX_RECENTS = 30;

function isItem(value: unknown): value is ActivityItem {
  return (
    isRecord(value) &&
    KINDS.includes(value.kind as ActivityKind) &&
    typeof value.id === "string" &&
    typeof value.label === "string" &&
    typeof value.href === "string"
  );
}

export const activityStore = createLocalStore<ActivityState>(
  ACTIVITY_KEY,
  () => ({ version: 1, favorites: [], recents: [] }),
  (value) => {
    if (!isRecord(value) || value.version !== 1) return null;
    return {
      version: 1,
      favorites: Array.isArray(value.favorites) ? value.favorites.filter(isItem) : [],
      recents: Array.isArray(value.recents) ? value.recents.filter(isItem) : [],
    };
  },
);

export function useActivity(): ActivityState | null {
  return useLocalStore(activityStore);
}

const key = (item: Pick<ActivityItem, "kind" | "id">) => `${item.kind}:${item.id}`;

export function isFavorite(state: ActivityState | null, kind: ActivityKind, id: string): boolean {
  return Boolean(state?.favorites.some((f) => f.kind === kind && f.id === id));
}

export function toggleFavoriteItem(item: Omit<ActivityItem, "at">) {
  activityStore.update((s) => {
    const exists = s.favorites.some((f) => key(f) === key(item));
    return {
      ...s,
      favorites: exists
        ? s.favorites.filter((f) => key(f) !== key(item))
        : [{ ...item, at: new Date().toISOString() }, ...s.favorites],
    };
  });
}

export function recordRecent(item: Omit<ActivityItem, "at">) {
  const current = activityStore.get();
  if (current.recents[0] && key(current.recents[0]) === key(item)) return;
  activityStore.set({
    ...current,
    recents: [{ ...item, at: new Date().toISOString() }, ...current.recents.filter((r) => key(r) !== key(item))].slice(0, MAX_RECENTS),
  });
}

export function clearRecents() {
  activityStore.update((s) => ({ ...s, recents: [] }));
}
