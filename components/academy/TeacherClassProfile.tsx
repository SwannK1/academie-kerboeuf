"use client";

import { useState } from "react";
import {
  defaultClassProfile,
  readClassProfile,
  teacherLevels,
  teacherPeriods,
  writeClassProfile,
  type TeacherClassProfile as TeacherClassProfileData,
  type TeacherLevel,
  type TeacherPeriod,
} from "@/content/teacher-organizer";

export function TeacherClassProfile() {
  const [profile, setProfile] = useState<TeacherClassProfileData>(readClassProfile);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  function handleSave() {
    writeClassProfile(profile);
    setSavedAt(Date.now());
  }

  function handleReset() {
    setProfile(defaultClassProfile);
    writeClassProfile(defaultClassProfile);
    setSavedAt(Date.now());
  }

  return (
    <div className="mt-10 rounded-lg border border-white/10 bg-background/40 p-5 sm:p-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <fieldset>
          <legend className="text-sm font-bold text-foreground">Niveau</legend>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Niveau de la classe">
            {teacherLevels.map((level) => (
              <button
                key={level.id}
                type="button"
                onClick={() => setProfile((current) => ({ ...current, level: level.id }))}
                aria-pressed={profile.level === level.id}
                className={[
                  "min-h-11 rounded-md border px-4 text-sm font-bold transition",
                  profile.level === level.id
                    ? "border-jade/60 bg-jade/10 text-jade"
                    : "border-white/10 bg-white/[0.04] text-foreground hover:border-jade/40",
                ].join(" ")}
              >
                {level.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-bold text-foreground">Période active</legend>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Période active">
            {teacherPeriods.map((period) => (
              <button
                key={period.id}
                type="button"
                onClick={() =>
                  setProfile((current) => ({ ...current, activePeriod: period.id }))
                }
                aria-pressed={profile.activePeriod === period.id}
                className={[
                  "min-h-11 rounded-md border px-4 text-sm font-bold transition",
                  profile.activePeriod === period.id
                    ? "border-sky/60 bg-sky/10 text-sky"
                    : "border-white/10 bg-white/[0.04] text-muted hover:border-sky/40",
                ].join(" ")}
              >
                {period.shortLabel}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="class-name" className="text-sm font-bold text-foreground">
            Nom de la classe (facultatif)
          </label>
          <input
            id="class-name"
            type="text"
            maxLength={60}
            value={profile.className}
            onChange={(event) =>
              setProfile((current) => ({ ...current, className: event.target.value }))
            }
            placeholder="Ex. CM2 B"
            className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-3 text-sm text-foreground outline-none focus:border-sky/50"
          />
        </div>

        <div>
          <label htmlFor="student-count" className="text-sm font-bold text-foreground">
            Nombre d’élèves
          </label>
          <input
            id="student-count"
            type="number"
            min={0}
            max={40}
            value={profile.studentCount ?? ""}
            onChange={(event) => {
              const value = event.target.value;
              setProfile((current) => ({
                ...current,
                studentCount: value === "" ? null : Math.max(0, Number(value)),
              }));
            }}
            placeholder="Ex. 24"
            className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-3 text-sm text-foreground outline-none focus:border-sky/50"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="min-h-11 rounded-md border border-jade/50 bg-jade/10 px-5 text-sm font-black text-jade transition hover:bg-jade/20"
        >
          Enregistrer
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="min-h-11 rounded-md border border-white/15 px-5 text-sm font-bold text-foreground transition hover:border-rose/40 hover:text-rose"
        >
          Réinitialiser
        </button>
        {savedAt && (
          <span className="text-xs text-muted" role="status">
            Enregistré sur cet appareil.
          </span>
        )}
      </div>
    </div>
  );
}

export type { TeacherLevel, TeacherPeriod };
