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

const STORAGE_KEY = "academie-kerboeuf-progression-periode-v1";

type StoredOrders = Record<string, number>;

function readStoredOrders(): StoredOrders {
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
    return parsed as StoredOrders;
  } catch {
    return {};
  }
}

function writeStoredOrders(orders: StoredOrders) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

function applyOrders(
  baseItems: TeacherProgrammationItem[],
  orders: StoredOrders,
): (TeacherProgrammationItem & { order: number })[] {
  return baseItems
    .map((item, index) => ({
      ...item,
      order: orders[item.id] ?? index,
    }))
    .sort((a, b) => a.order - b.order);
}

export function TeacherPeriodProgression() {
  const [selectedLevel, setSelectedLevel] = useState<TeacherLevel>("cm2");
  const [selectedPeriod, setSelectedPeriod] =
    useState<TeacherPeriod>("periode-1");
  const [activeSubjects, setActiveSubjects] = useState<Set<TeacherSubject>>(
    new Set(teacherSubjects.map((subject) => subject.id)),
  );
  const [orders, setOrders] = useState<StoredOrders>(() => readStoredOrders());

  const levelItems = useMemo(
    () => getTeacherProgrammationItemsByLevel(selectedLevel),
    [selectedLevel],
  );

  const periodItems = useMemo(
    () => applyOrders(
      levelItems.filter((item) => item.period === selectedPeriod),
      orders,
    ),
    [levelItems, selectedPeriod, orders],
  );

  const visibleItems = useMemo(
    () => periodItems.filter((item) => activeSubjects.has(item.subject)),
    [periodItems, activeSubjects],
  );

  const subjectCounts = useMemo(() => {
    const counts = new Map<TeacherSubject, number>();
    for (const item of periodItems) {
      counts.set(item.subject, (counts.get(item.subject) ?? 0) + 1);
    }
    return counts;
  }, [periodItems]);

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
    setOrders((current) => {
      const currentIndex = periodItems.findIndex((entry) => entry.id === itemId);
      const targetIndex = currentIndex + direction;

      if (currentIndex === -1 || targetIndex < 0 || targetIndex >= periodItems.length) {
        return current;
      }

      const reordered = [...periodItems];
      [reordered[currentIndex], reordered[targetIndex]] = [
        reordered[targetIndex],
        reordered[currentIndex],
      ];

      const next: StoredOrders = { ...current };
      reordered.forEach((entry, index) => {
        next[entry.id] = index;
      });
      writeStoredOrders(next);
      return next;
    });
  }

  function resetProgression() {
    setOrders({});
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  const levelHasNoSequences = levelItems.length === 0;

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

      {levelHasNoSequences ? (
        <p className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
          Aucune séquence n&apos;est encore disponible pour ce niveau.
        </p>
      ) : (
        <>
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
                const count = subjectCounts.get(subject.id) ?? 0;
                return (
                  <button
                    key={subject.id}
                    type="button"
                    onClick={() => toggleSubject(subject.id)}
                    aria-pressed={isActive}
                    className={[
                      "min-h-11 rounded-md border px-4 text-sm font-bold transition",
                      isActive
                        ? "border-ember/60 bg-ember/10 text-ember"
                        : "border-white/10 bg-white/[0.04] text-muted hover:border-ember/40",
                    ].join(" ")}
                  >
                    {subject.label} ({count})
                  </button>
                );
              })}
            </div>
          </section>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-black text-foreground">
              {teacherLevels.find((l) => l.id === selectedLevel)?.label} —{" "}
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

          {periodItems.length === 0 ? (
            <p className="mt-6 rounded-lg border border-amber/25 bg-amber/[0.05] p-5 text-sm leading-7 text-muted">
              Cette période ne contient encore aucune séquence pour ce niveau.
            </p>
          ) : visibleItems.length === 0 ? (
            <p className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
              Aucune séquence ne correspond aux matières sélectionnées.
            </p>
          ) : (
            <>
              {/* Tableau — affiché à partir des écrans larges */}
              <div className="mt-6 hidden overflow-x-auto rounded-lg border border-white/10 lg:block">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03] text-xs font-bold uppercase tracking-[0.08em] text-muted">
                      <th scope="col" className="px-3 py-3">Ordre</th>
                      <th scope="col" className="px-3 py-3">Matière</th>
                      <th scope="col" className="px-3 py-3">Domaine</th>
                      <th scope="col" className="px-3 py-3">Titre</th>
                      <th scope="col" className="px-3 py-3">Compétence</th>
                      <th scope="col" className="px-3 py-3">Durée</th>
                      <th scope="col" className="px-3 py-3">Statut</th>
                      <th scope="col" className="px-3 py-3">Réordonner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleItems.map((item, index) => (
                      <tr key={item.id} className="border-b border-white/5">
                        <td className="px-3 py-3 font-bold text-foreground">{index + 1}</td>
                        <td className="px-3 py-3 text-sky">
                          {teacherSubjects.find((s) => s.id === item.subject)?.label}
                        </td>
                        <td className="px-3 py-3 text-muted">{item.domain}</td>
                        <td className="px-3 py-3 font-bold text-foreground">{item.title}</td>
                        <td className="px-3 py-3 text-muted">{item.skill}</td>
                        <td className="px-3 py-3 text-muted">{item.durationLabel}</td>
                        <td className="px-3 py-3">
                          <PublicStatusBadge status={item.status} />
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={() => moveItem(item.id, -1)}
                              disabled={index === 0}
                              aria-label={`Monter ${item.title}`}
                              className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/40 disabled:opacity-30"
                            >
                              Monter
                            </button>
                            <button
                              type="button"
                              onClick={() => moveItem(item.id, 1)}
                              disabled={index === visibleItems.length - 1}
                              aria-label={`Descendre ${item.title}`}
                              className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/40 disabled:opacity-30"
                            >
                              Descendre
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cartes — affichées sur mobile et tablette */}
              <ul className="mt-6 flex flex-col gap-3 lg:hidden">
                {visibleItems.map((item, index) => (
                  <li
                    key={item.id}
                    className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-sky">
                      {index + 1}. {teacherSubjects.find((s) => s.id === item.subject)?.label}
                    </p>
                    <p className="mt-1 text-sm font-bold text-foreground">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-muted">Domaine : {item.domain}</p>
                    <p className="mt-1 text-xs leading-5 text-muted">Compétence : {item.skill}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <PublicStatusBadge status={item.status} />
                      <span className="text-xs text-muted">{item.durationLabel}</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => moveItem(item.id, -1)}
                        disabled={index === 0}
                        aria-label={`Monter ${item.title}`}
                        className="min-h-11 rounded border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-jade/40 disabled:opacity-30"
                      >
                        Monter
                      </button>
                      <button
                        type="button"
                        onClick={() => moveItem(item.id, 1)}
                        disabled={index === visibleItems.length - 1}
                        aria-label={`Descendre ${item.title}`}
                        className="min-h-11 rounded border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-jade/40 disabled:opacity-30"
                      >
                        Descendre
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
