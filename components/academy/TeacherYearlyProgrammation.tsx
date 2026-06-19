"use client";

import { useMemo, useState } from "react";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import {
  getTeacherProgrammationItemsByLevel,
  teacherLevels,
  teacherPeriods,
  teacherSubjects,
  type TeacherLevel,
  type TeacherPeriod,
  type TeacherProgrammationItem,
  type TeacherSubject,
} from "@/content/teacher-programmation";

const STORAGE_KEY = "academie-kerboeuf-programmation-v1";

type ItemOverride = {
  period: TeacherPeriod;
  order: number;
};

type StoredOverrides = Record<string, ItemOverride>;

function readStoredOverrides(): StoredOverrides {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return {};
    }
    return parsed as StoredOverrides;
  } catch {
    return {};
  }
}

function writeStoredOverrides(overrides: StoredOverrides) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

function applyOverrides(
  baseItems: TeacherProgrammationItem[],
  overrides: StoredOverrides,
): (TeacherProgrammationItem & { order: number })[] {
  return baseItems
    .map((item, index) => {
      const override = overrides[item.id];
      return {
        ...item,
        period: override?.period ?? item.period,
        order: override?.order ?? index,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function TeacherYearlyProgrammation() {
  const [selectedLevel, setSelectedLevel] = useState<TeacherLevel>("cm2");
  const [activeSubjects, setActiveSubjects] = useState<Set<TeacherSubject>>(
    new Set(teacherSubjects.map((subject) => subject.id)),
  );
  const [overrides, setOverrides] = useState<StoredOverrides>(() =>
    readStoredOverrides(),
  );

  const baseItems = useMemo(
    () => getTeacherProgrammationItemsByLevel(selectedLevel),
    [selectedLevel],
  );

  const items = useMemo(
    () => applyOverrides(baseItems, overrides),
    [baseItems, overrides],
  );

  const visibleItems = useMemo(
    () => items.filter((item) => activeSubjects.has(item.subject)),
    [items, activeSubjects],
  );

  function toggleSubject(subjectId: TeacherSubject) {
    setActiveSubjects((current) => {
      const next = new Set(current);
      if (next.has(subjectId)) {
        next.delete(subjectId);
      } else {
        next.add(subjectId);
      }
      return next;
    });
  }

  function moveItemToPeriod(itemId: string, targetPeriod: TeacherPeriod) {
    setOverrides((current) => {
      const itemsInTarget = items.filter((item) => item.period === targetPeriod);
      const next: StoredOverrides = {
        ...current,
        [itemId]: {
          period: targetPeriod,
          order: itemsInTarget.length,
        },
      };
      writeStoredOverrides(next);
      return next;
    });
  }

  function moveItemWithinPeriod(itemId: string, direction: -1 | 1) {
    setOverrides((current) => {
      const item = items.find((entry) => entry.id === itemId);
      if (!item) {
        return current;
      }

      const periodItems = items.filter((entry) => entry.period === item.period);
      const currentIndex = periodItems.findIndex((entry) => entry.id === itemId);
      const targetIndex = currentIndex + direction;

      if (targetIndex < 0 || targetIndex >= periodItems.length) {
        return current;
      }

      const reordered = [...periodItems];
      [reordered[currentIndex], reordered[targetIndex]] = [
        reordered[targetIndex],
        reordered[currentIndex],
      ];

      const next: StoredOverrides = { ...current };
      reordered.forEach((entry, index) => {
        next[entry.id] = { period: entry.period, order: index };
      });
      writeStoredOverrides(next);
      return next;
    });
  }

  function resetProgrammation() {
    setOverrides({});
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <div>
      <section aria-labelledby="choisir-niveau-titre">
        <h2 id="choisir-niveau-titre" className="text-xl font-black text-foreground">
          Choisir un niveau
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Niveaux">
          {teacherLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => setSelectedLevel(level.id)}
              aria-pressed={level.id === selectedLevel}
              className={[
                "min-h-11 rounded-md border px-4 text-sm font-bold transition",
                level.id === selectedLevel
                  ? "border-jade/60 bg-jade/10 text-jade"
                  : "border-white/10 bg-white/[0.04] text-foreground hover:border-jade/40",
              ].join(" ")}
            >
              {level.label}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="filtrer-matieres-titre" className="mt-8">
        <h2 id="filtrer-matieres-titre" className="text-xl font-black text-foreground">
          Filtrer par matière
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Matières">
          {teacherSubjects.map((subject) => {
            const isActive = activeSubjects.has(subject.id);
            return (
              <button
                key={subject.id}
                type="button"
                onClick={() => toggleSubject(subject.id)}
                aria-pressed={isActive}
                className={[
                  "min-h-11 rounded-md border px-4 text-sm font-bold transition",
                  isActive
                    ? "border-sky/60 bg-sky/10 text-sky"
                    : "border-white/10 bg-white/[0.04] text-muted hover:border-sky/40",
                ].join(" ")}
              >
                {subject.label}
              </button>
            );
          })}
        </div>
      </section>

      <div className="mt-8 flex items-center justify-between gap-3">
        <h2 className="text-xl font-black text-foreground">
          Programmation — {teacherLevels.find((l) => l.id === selectedLevel)?.label}
        </h2>
        <button
          type="button"
          onClick={resetProgrammation}
          className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-rose/40 hover:text-rose"
        >
          Réinitialiser la programmation conseillée
        </button>
      </div>

      {visibleItems.length === 0 ? (
        <p className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
          Aucune séquence n&apos;est encore renseignée pour ce niveau ou ces matières.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 lg:grid-cols-5">
          {teacherPeriods.map((period) => {
            const periodItems = visibleItems
              .filter((item) => item.period === period.id)
              .sort((a, b) => a.order - b.order);

            return (
              <section
                key={period.id}
                aria-labelledby={`${period.id}-titre`}
                className="flex flex-col rounded-lg border border-white/10 bg-background/40 p-3"
              >
                <h3
                  id={`${period.id}-titre`}
                  className="text-sm font-black uppercase tracking-[0.1em] text-foreground"
                >
                  {period.label}
                </h3>

                <ul className="mt-3 flex flex-1 flex-col gap-3">
                  {periodItems.length === 0 ? (
                    <li className="text-xs leading-6 text-muted">
                      Aucune séquence dans cette période.
                    </li>
                  ) : (
                    periodItems.map((item, index) => (
                      <li
                        key={item.id}
                        className="rounded-md border border-white/10 bg-white/[0.03] p-3"
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.08em] text-sky">
                          {teacherSubjects.find((s) => s.id === item.subject)?.label}
                        </p>
                        <p className="mt-1 text-sm font-bold text-foreground">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted">
                          {item.skill}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <PublicStatusBadge status={item.status} />
                          <span className="text-xs text-muted">
                            {item.durationLabel}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1">
                          <button
                            type="button"
                            onClick={() => moveItemWithinPeriod(item.id, -1)}
                            disabled={index === 0}
                            aria-label={`Monter ${item.title} dans ${period.label}`}
                            className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/40 disabled:opacity-30"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => moveItemWithinPeriod(item.id, 1)}
                            disabled={index === periodItems.length - 1}
                            aria-label={`Descendre ${item.title} dans ${period.label}`}
                            className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/40 disabled:opacity-30"
                          >
                            ↓
                          </button>
                          {teacherPeriods
                            .filter((p) => p.id !== period.id)
                            .map((targetPeriod) => (
                              <button
                                key={targetPeriod.id}
                                type="button"
                                onClick={() => moveItemToPeriod(item.id, targetPeriod.id)}
                                aria-label={`Déplacer ${item.title} vers ${targetPeriod.label}`}
                                className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-muted transition hover:border-sky/40 hover:text-sky"
                              >
                                → {targetPeriod.label.replace("Période ", "P")}
                              </button>
                            ))}
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
