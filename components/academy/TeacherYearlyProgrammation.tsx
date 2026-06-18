"use client";

import { useMemo, useState } from "react";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import {
  teacherProgrammationItems,
  teacherProgrammationLevels,
  teacherProgrammationPeriods,
  teacherProgrammationSubjects,
  type TeacherProgrammationItem,
  type TeacherProgrammationLevel,
  type TeacherProgrammationPeriod,
  type TeacherProgrammationSubject,
} from "@/content/teacher-programmation";

const STORAGE_KEY = "academie-kerboeuf-programmation-v1";

type StoredOverrides = Record<
  string,
  { period: TeacherProgrammationPeriod; order: number }
>;

function readStoredOverrides(): StoredOverrides {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed as StoredOverrides;
    }
  } catch {
    // localStorage indisponible ou contenu corrompu : on repart de la
    // programmation conseillée par défaut.
  }
  return {};
}

function applyOverrides(
  items: TeacherProgrammationItem[],
  overrides: StoredOverrides,
): TeacherProgrammationItem[] {
  return items.map((item) => {
    const override = overrides[item.id];
    if (!override) {
      return item;
    }
    return { ...item, period: override.period };
  });
}

function periodIndex(period: TeacherProgrammationPeriod) {
  return teacherProgrammationPeriods.findIndex((p) => p.id === period);
}

export function TeacherYearlyProgrammation() {
  const [selectedLevel, setSelectedLevel] =
    useState<TeacherProgrammationLevel>("cm2");
  const [selectedSubjects, setSelectedSubjects] = useState<
    Set<TeacherProgrammationSubject>
  >(new Set());
  const [items, setItems] = useState<TeacherProgrammationItem[]>(() =>
    applyOverrides(teacherProgrammationItems, readStoredOverrides()),
  );

  function persistOverrides(nextItems: TeacherProgrammationItem[]) {
    if (typeof window === "undefined") {
      return;
    }
    const overrides: StoredOverrides = {};
    nextItems.forEach((item) => {
      const original = teacherProgrammationItems.find(
        (entry) => entry.id === item.id,
      );
      if (original && original.period !== item.period) {
        overrides[item.id] = { period: item.period, order: 0 };
      }
    });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  }

  function moveItem(
    itemId: string,
    direction: "previous" | "next",
  ) {
    setItems((current) => {
      const next = current.map((item) => {
        if (item.id !== itemId) {
          return item;
        }
        const currentIndex = periodIndex(item.period);
        const targetIndex =
          direction === "next" ? currentIndex + 1 : currentIndex - 1;
        if (
          targetIndex < 0 ||
          targetIndex >= teacherProgrammationPeriods.length
        ) {
          return item;
        }
        return {
          ...item,
          period: teacherProgrammationPeriods[targetIndex].id,
        };
      });
      persistOverrides(next);
      return next;
    });
  }

  function resetProgrammation() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setItems(teacherProgrammationItems);
  }

  function toggleSubject(subject: TeacherProgrammationSubject) {
    setSelectedSubjects((current) => {
      const next = new Set(current);
      if (next.has(subject)) {
        next.delete(subject);
      } else {
        next.add(subject);
      }
      return next;
    });
  }

  const visibleItems = useMemo(() => {
    return items.filter((item) => {
      if (item.level !== selectedLevel) {
        return false;
      }
      if (selectedSubjects.size > 0 && !selectedSubjects.has(item.subject)) {
        return false;
      }
      return true;
    });
  }, [items, selectedLevel, selectedSubjects]);

  const subjectLabel = (subject: TeacherProgrammationSubject) =>
    teacherProgrammationSubjects.find((s) => s.id === subject)?.label ??
    subject;

  return (
    <div>
      <section aria-labelledby="choisir-niveau-enseignant" className="mt-8">
        <h2
          id="choisir-niveau-enseignant"
          className="text-lg font-black text-foreground"
        >
          Choisir un niveau
        </h2>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {teacherProgrammationLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => setSelectedLevel(level.id)}
              aria-pressed={level.id === selectedLevel}
              className={[
                "min-h-11 rounded-md border px-3 text-sm font-bold transition",
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

      <section aria-labelledby="filtrer-matiere" className="mt-6">
        <h2 id="filtrer-matiere" className="text-lg font-black text-foreground">
          Filtrer par matière
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {teacherProgrammationSubjects.map((subject) => {
            const active = selectedSubjects.has(subject.id);
            return (
              <button
                key={subject.id}
                type="button"
                onClick={() => toggleSubject(subject.id)}
                aria-pressed={active}
                className={[
                  "min-h-11 rounded-md border px-3 text-sm font-bold transition",
                  active
                    ? "border-sky/60 bg-sky/10 text-sky"
                    : "border-white/10 bg-white/[0.04] text-foreground hover:border-sky/40",
                ].join(" ")}
              >
                {subject.label}
              </button>
            );
          })}
        </div>
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {visibleItems.length} séquence
          {visibleItems.length > 1 ? "s" : ""} pour ce niveau.
        </p>
        <button
          type="button"
          onClick={resetProgrammation}
          className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-gold/50 hover:text-gold"
        >
          Réinitialiser la programmation conseillée
        </button>
      </div>

      <section
        aria-label="Programmation par période"
        className="mt-6 grid gap-4 lg:grid-cols-5"
      >
        {teacherProgrammationPeriods.map((period) => {
          const periodItems = visibleItems.filter(
            (item) => item.period === period.id,
          );
          return (
            <div
              key={period.id}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
            >
              <h3 className="text-sm font-black uppercase tracking-[0.1em] text-foreground">
                {period.label}
              </h3>

              {periodItems.length === 0 ? (
                <p className="mt-3 text-xs text-muted">
                  Aucune séquence placée ici.
                </p>
              ) : (
                <ul className="mt-3 space-y-3">
                  {periodItems.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-md border border-white/10 bg-background/45 p-3"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-sky">
                        {subjectLabel(item.subject)}
                      </p>
                      <p className="mt-1 text-sm font-bold text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-muted">
                        {item.skill}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-muted">
                          {item.durationLabel}
                        </span>
                        <PublicStatusBadge status={item.status} />
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => moveItem(item.id, "previous")}
                          disabled={periodIndex(item.period) === 0}
                          aria-label={`Déplacer « ${item.title} » vers la période précédente`}
                          className="min-h-9 flex-1 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/40 hover:text-jade disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          ← Période précédente
                        </button>
                        <button
                          type="button"
                          onClick={() => moveItem(item.id, "next")}
                          disabled={
                            periodIndex(item.period) ===
                            teacherProgrammationPeriods.length - 1
                          }
                          aria-label={`Déplacer « ${item.title} » vers la période suivante`}
                          className="min-h-9 flex-1 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/40 hover:text-jade disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Période suivante →
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
