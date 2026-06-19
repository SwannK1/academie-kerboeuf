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

const STORAGE_KEY = "academie-kerboeuf-progression-v1";

type StoredOrder = Record<string, number>;

function readStoredOrder(): StoredOrder {
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
    return parsed as StoredOrder;
  } catch {
    return {};
  }
}

function writeStoredOrder(order: StoredOrder) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

function applyOrder(
  items: TeacherProgrammationItem[],
  order: StoredOrder,
): (TeacherProgrammationItem & { order: number })[] {
  return items
    .map((item, index) => ({
      ...item,
      order: order[item.id] ?? index,
    }))
    .sort((a, b) => a.order - b.order);
}

export function TeacherPeriodProgression() {
  const [selectedLevel, setSelectedLevel] = useState<TeacherLevel>("cm2");
  const [selectedPeriod, setSelectedPeriod] = useState<TeacherPeriod>(
    "periode-1",
  );
  const [activeSubjects, setActiveSubjects] = useState<Set<TeacherSubject>>(
    new Set(teacherSubjects.map((subject) => subject.id)),
  );
  const [order, setOrder] = useState<StoredOrder>(() => readStoredOrder());

  const baseItems = useMemo(
    () =>
      getTeacherProgrammationItemsByLevel(selectedLevel).filter(
        (item) => item.period === selectedPeriod,
      ),
    [selectedLevel, selectedPeriod],
  );

  const items = useMemo(() => applyOrder(baseItems, order), [baseItems, order]);

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

  function moveItem(itemId: string, direction: -1 | 1) {
    setOrder((current) => {
      const currentIndex = visibleItems.findIndex((entry) => entry.id === itemId);
      const targetIndex = currentIndex + direction;

      if (currentIndex === -1 || targetIndex < 0 || targetIndex >= visibleItems.length) {
        return current;
      }

      const reordered = [...visibleItems];
      [reordered[currentIndex], reordered[targetIndex]] = [
        reordered[targetIndex],
        reordered[currentIndex],
      ];

      const next: StoredOrder = { ...current };
      reordered.forEach((entry, index) => {
        next[entry.id] = index;
      });
      writeStoredOrder(next);
      return next;
    });
  }

  function resetProgression() {
    setOrder({});
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

      <section aria-labelledby="choisir-periode-titre" className="mt-8">
        <h2 id="choisir-periode-titre" className="text-xl font-black text-foreground">
          Choisir une période
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Périodes">
          {teacherPeriods.map((period) => (
            <button
              key={period.id}
              type="button"
              onClick={() => setSelectedPeriod(period.id)}
              aria-pressed={period.id === selectedPeriod}
              className={[
                "min-h-11 rounded-md border px-4 text-sm font-bold transition",
                period.id === selectedPeriod
                  ? "border-sky/60 bg-sky/10 text-sky"
                  : "border-white/10 bg-white/[0.04] text-foreground hover:border-sky/40",
              ].join(" ")}
            >
              {period.label}
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

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-black text-foreground">
          Progression — {teacherLevels.find((l) => l.id === selectedLevel)?.label}
          {" · "}
          {teacherPeriods.find((p) => p.id === selectedPeriod)?.label}
        </h2>
        <button
          type="button"
          onClick={resetProgression}
          className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-rose/40 hover:text-rose"
        >
          Réinitialiser la progression de période
        </button>
      </div>

      {visibleItems.length === 0 ? (
        <p className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
          Aucune séquence n&apos;est encore renseignée pour ce niveau, cette
          période et ces matières.
        </p>
      ) : (
        <>
          {/* Tableau — ordinateur */}
          <div className="mt-6 hidden overflow-x-auto rounded-lg border border-white/10 md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-xs font-black uppercase tracking-[0.08em] text-muted">
                  <th scope="col" className="px-4 py-3">Ordre</th>
                  <th scope="col" className="px-4 py-3">Titre</th>
                  <th scope="col" className="px-4 py-3">Matière</th>
                  <th scope="col" className="px-4 py-3">Durée</th>
                  <th scope="col" className="px-4 py-3">Statut</th>
                  <th scope="col" className="px-4 py-3">Réordonner</th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((item, index) => (
                  <tr key={item.id} className="border-b border-white/5">
                    <td className="px-4 py-3 font-bold text-foreground">{index + 1}</td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-foreground">{item.title}</p>
                      <p className="mt-1 text-xs leading-5 text-muted">{item.skill}</p>
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {teacherSubjects.find((s) => s.id === item.subject)?.label}
                    </td>
                    <td className="px-4 py-3 text-muted">{item.durationLabel}</td>
                    <td className="px-4 py-3">
                      <PublicStatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => moveItem(item.id, -1)}
                          disabled={index === 0}
                          aria-label={`Monter ${item.title}`}
                          className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/40 disabled:opacity-30"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveItem(item.id, 1)}
                          disabled={index === visibleItems.length - 1}
                          aria-label={`Descendre ${item.title}`}
                          className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/40 disabled:opacity-30"
                        >
                          ↓
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cartes — mobile */}
          <ul className="mt-6 flex flex-col gap-3 md:hidden">
            {visibleItems.map((item, index) => (
              <li
                key={item.id}
                className="rounded-md border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="text-xs font-black uppercase tracking-[0.08em] text-sky">
                  {index + 1}. {teacherSubjects.find((s) => s.id === item.subject)?.label}
                </p>
                <p className="mt-1 text-sm font-bold text-foreground">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{item.skill}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <PublicStatusBadge status={item.status} />
                  <span className="text-xs text-muted">{item.durationLabel}</span>
                </div>
                <div className="mt-3 flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(item.id, -1)}
                    disabled={index === 0}
                    aria-label={`Monter ${item.title}`}
                    className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-jade/40 disabled:opacity-30"
                  >
                    ↑ Monter
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(item.id, 1)}
                    disabled={index === visibleItems.length - 1}
                    aria-label={`Descendre ${item.title}`}
                    className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-jade/40 disabled:opacity-30"
                  >
                    ↓ Descendre
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
