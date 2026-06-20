"use client";

import { useEffect, useState } from "react";
import {
  TEACHER_CLASS_PROFILE_STORAGE_KEY,
  getDefaultTeacherClassProfile,
  teacherClassLevels,
  teacherClassPeriods,
  type TeacherClassProfile as TeacherClassProfileData,
} from "@/content/teacher-class-profile";

function readStoredProfile(): TeacherClassProfileData | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(TEACHER_CLASS_PROFILE_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as TeacherClassProfileData;
    if (!parsed || typeof parsed.level !== "string") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function useTeacherClassProfile() {
  const [profile, setProfile] = useState<TeacherClassProfileData>(
    () => readStoredProfile() ?? getDefaultTeacherClassProfile(),
  );

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_CLASS_PROFILE_STORAGE_KEY,
      JSON.stringify(profile),
    );
  }, [profile]);

  return { profile, setProfile };
}

export function TeacherClassProfileForm() {
  const { profile, setProfile } = useTeacherClassProfile();

  return (
    <div className="mt-6 grid gap-5">
      <div>
        <label
          htmlFor="ma-classe-niveau"
          className="block text-xs font-bold uppercase tracking-wide text-muted"
        >
          Niveau
        </label>
        <select
          id="ma-classe-niveau"
          value={profile.level}
          onChange={(event) =>
            setProfile((previous) => ({
              ...previous,
              level: event.target.value as TeacherClassProfileData["level"],
            }))
          }
          className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground sm:max-w-xs"
        >
          {teacherClassLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="ma-classe-nom"
          className="block text-xs font-bold uppercase tracking-wide text-muted"
        >
          Nom court de la classe (facultatif)
        </label>
        <input
          id="ma-classe-nom"
          type="text"
          value={profile.label}
          onChange={(event) =>
            setProfile((previous) => ({
              ...previous,
              label: event.target.value,
            }))
          }
          placeholder="Ex : CM2 A"
          className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground sm:max-w-xs"
        />
      </div>

      <div>
        <label
          htmlFor="ma-classe-effectif"
          className="block text-xs font-bold uppercase tracking-wide text-muted"
        >
          Nombre d’élèves
        </label>
        <input
          id="ma-classe-effectif"
          type="number"
          min={0}
          max={40}
          value={profile.pupilCount}
          onChange={(event) =>
            setProfile((previous) => ({
              ...previous,
              pupilCount: Number(event.target.value) || 0,
            }))
          }
          className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground sm:max-w-xs"
        />
      </div>

      <div>
        <label
          htmlFor="ma-classe-periode"
          className="block text-xs font-bold uppercase tracking-wide text-muted"
        >
          Période active
        </label>
        <select
          id="ma-classe-periode"
          value={profile.activePeriod}
          onChange={(event) =>
            setProfile((previous) => ({
              ...previous,
              activePeriod: event.target
                .value as TeacherClassProfileData["activePeriod"],
            }))
          }
          className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground sm:max-w-xs"
        >
          {teacherClassPeriods.map((period) => (
            <option key={period.id} value={period.id}>
              {period.label}
            </option>
          ))}
        </select>
      </div>

      <p role="status" className="text-sm text-muted">
        Ces réglages sont enregistrés sur cet appareil uniquement.
      </p>
    </div>
  );
}
