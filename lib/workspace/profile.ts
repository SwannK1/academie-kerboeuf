"use client";

import { createLocalStore, isRecord, useLocalStore } from "@/lib/workspace/store";
import { isTeachLevel, type TeachLevel } from "@/lib/workspace/curriculum";
import type { Zone } from "@/lib/workspace/school-year";
import { recordRecent } from "@/lib/workspace/activity";

export type Role = "enseignant" | "direction" | "les-deux";
export type SchoolType = "maternelle" | "elementaire" | "primaire";

export type Profile = {
  role: Role | null;
  level: TeachLevel | null;
  schoolType: SchoolType | null;
  /** zone de vacances : null tant que non précisée (zone A utilisée par défaut) */
  zone: Zone | null;
  /** dernier écran de travail ouvert, pour « Continuer » */
  lastPath: string | null;
  lastLabel: string | null;
};

const ROLES: Role[] = ["enseignant", "direction", "les-deux"];
const SCHOOL_TYPES: SchoolType[] = ["maternelle", "elementaire", "primaire"];

export const PROFILE_KEY = "ak-profil-v1";

function emptyProfile(): Profile {
  return { role: null, level: null, schoolType: null, zone: null, lastPath: null, lastLabel: null };
}

export const profileStore = createLocalStore<Profile>(PROFILE_KEY, emptyProfile, (value) => {
  if (!isRecord(value)) return null;
  return {
    role: ROLES.includes(value.role as Role) ? (value.role as Role) : null,
    level: isTeachLevel(value.level) ? value.level : null,
    schoolType: SCHOOL_TYPES.includes(value.schoolType as SchoolType) ? (value.schoolType as SchoolType) : null,
    zone: value.zone === "A" || value.zone === "B" || value.zone === "C" ? value.zone : null,
    lastPath: typeof value.lastPath === "string" ? value.lastPath : null,
    lastLabel: typeof value.lastLabel === "string" ? value.lastLabel : null,
  };
});

export function useProfile(): Profile | null {
  return useLocalStore(profileStore);
}

export function updateProfile(patch: Partial<Profile>) {
  profileStore.update((current) => ({ ...current, ...patch }));
}

export function rememberPlace(path: string, label: string) {
  recordRecent({ kind: "page", id: path, label, href: path });
  const current = profileStore.get();
  if (current.lastPath === path && current.lastLabel === label) return;
  profileStore.set({ ...current, lastPath: path, lastLabel: label });
}

export function isTeacher(profile: Profile | null): boolean {
  return profile?.role === "enseignant" || profile?.role === "les-deux";
}

export function isDirector(profile: Profile | null): boolean {
  return profile?.role === "direction" || profile?.role === "les-deux";
}
