"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import {
  getCompetenciesByLevelAndSubject,
  progressionGroupKey,
  readProgrammationStore,
  readProgressionStore,
  teacherLevels,
  teacherPeriods,
  teacherSubjects,
  teacherWeeks,
  writeProgressionStore,
  type ProgressionStore,
  type TeacherCompetency,
  type TeacherLevel,
  type TeacherPeriod,
  type TeacherSubject,
  type TeacherWeek,
} from "@/content/teacher-planning";
import { buildTeacherLessonPlannerHref } from "@/content/teacher-lesson-planner";

type PlacedCompetency = TeacherCompetency & { week: TeacherWeek; order: number };

export function TeacherPeriodProgressionClient() {
  const [selectedLevel, setSelectedLevel] = useState<TeacherLevel>("cm2");
  const [selectedSubject, setSelectedSubject] = useState<TeacherSubject>("francais");
  const [selectedPeriod, setSelectedPeriod] = useState<TeacherPeriod>("periode-1");
  const [store, setStore] = useState<ProgressionStore>(() => readProgressionStore());
  const [selectedReserveId, setSelectedReserveId] = useState<string | null>(null);
  const [activePlacedId, setActivePlacedId] = useState<string | null>(null);

  const programmationStore = useMemo(() => readProgrammationStore(), []);
  const levelPlacements = useMemo(
    () => programmationStore[selectedLevel] ?? {},
    [programmationStore, selectedLevel],
  );

  const annualCompetencyIds = useMemo(
    () => new Set(Object.keys(levelPlacements)),
    [levelPlacements],
  );

  const periodCompetenciesForSubject = useMemo(() => {
    return getCompetenciesByLevelAndSubject(selectedLevel, selectedSubject).filter(
      (item) =>
        annualCompetencyIds.has(item.id) &&
        levelPlacements[item.id]?.period === selectedPeriod,
    );
  }, [selectedLevel, selectedSubject, selectedPeriod, annualCompetencyIds, levelPlacements]);

  const groupKey = progressionGroupKey(selectedLevel, selectedSubject, selectedPeriod);
  const groupPlacements = useMemo(
    () => store[groupKey] ?? {},
    [store, groupKey],
  );

  const placedItems = useMemo<PlacedCompetency[]>(() => {
    return periodCompetenciesForSubject
      .filter((item) => groupPlacements[item.id])
      .map((item) => ({ ...item, ...groupPlacements[item.id] }))
      .sort((a, b) => a.order - b.order);
  }, [periodCompetenciesForSubject, groupPlacements]);

  const reserveItems = useMemo(
    () => periodCompetenciesForSubject.filter((item) => !groupPlacements[item.id]),
    [periodCompetenciesForSubject, groupPlacements],
  );

  const allSubjectsCountForPeriod = useMemo(() => {
    const counts = new Map<TeacherSubject, number>();
    for (const subject of teacherSubjects) {
      const count = teacherCompetenciesCountForPeriod(
        selectedLevel,
        subject.id,
        selectedPeriod,
        levelPlacements,
      );
      counts.set(subject.id, count);
    }
    return counts;
  }, [selectedLevel, selectedPeriod, levelPlacements]);

  const weekCounts = useMemo(() => {
    const counts = new Map<TeacherWeek, number>();
    for (const week of teacherWeeks) {
      counts.set(
        week.id,
        placedItems.filter((item) => item.week === week.id).length,
      );
    }
    return counts;
  }, [placedItems]);

  function updateGroupPlacements(
    updater: (current: Record<string, { week: TeacherWeek; order: number }>) => Record<
      string,
      { week: TeacherWeek; order: number }
    >,
  ) {
    setStore((current) => {
      const next: ProgressionStore = {
        ...current,
        [groupKey]: updater(current[groupKey] ?? {}),
      };
      writeProgressionStore(next);
      return next;
    });
  }

  function selectReserveCard(id: string) {
    setActivePlacedId(null);
    setSelectedReserveId((current) => (current === id ? null : id));
  }

  function placeSelectedCardIn(week: TeacherWeek) {
    if (!selectedReserveId) return;
    updateGroupPlacements((current) => {
      const countInWeek = Object.values(current).filter(
        (placement) => placement.week === week,
      ).length;
      return { ...current, [selectedReserveId]: { week, order: countInWeek } };
    });
    setSelectedReserveId(null);
  }

  function openPlacedCard(id: string) {
    setSelectedReserveId(null);
    setActivePlacedId((current) => (current === id ? null : id));
  }

  function moveCardToWeek(id: string, targetWeek: TeacherWeek) {
    updateGroupPlacements((current) => {
      const countInTarget = Object.entries(current).filter(
        ([entryId, placement]) => entryId !== id && placement.week === targetWeek,
      ).length;
      return { ...current, [id]: { week: targetWeek, order: countInTarget } };
    });
    setActivePlacedId(null);
  }

  function moveCardWithinWeek(id: string, direction: -1 | 1) {
    const current = groupPlacements[id];
    if (!current) return;
    const weekItems = placedItems.filter((item) => item.week === current.week);
    const index = weekItems.findIndex((item) => item.id === id);
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= weekItems.length) return;

    const reordered = [...weekItems];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];

    updateGroupPlacements((existing) => {
      const next = { ...existing };
      reordered.forEach((item, order) => {
        next[item.id] = { week: item.week, order };
      });
      return next;
    });
  }

  function removeCard(id: string) {
    updateGroupPlacements((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    setActivePlacedId(null);
  }

  function resetPeriodProgression() {
    setStore((current) => {
      const next = { ...current, [groupKey]: {} };
      writeProgressionStore(next);
      return next;
    });
    setSelectedReserveId(null);
    setActivePlacedId(null);
  }

  const levelLabel = teacherLevels.find((l) => l.id === selectedLevel)?.label ?? "";
  const periodLabel = teacherPeriods.find((p) => p.id === selectedPeriod)?.label ?? "";

  return (
    <div className="mt-10 space-y-8">
      <section aria-labelledby="choix-niveau-matiere-periode">
        <h2 id="choix-niveau-matiere-periode" className="text-xl font-black text-foreground">
          Choisir le niveau, la matière et la période
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Niveau
            <select
              value={selectedLevel}
              onChange={(event) => {
                setSelectedLevel(event.target.value as TeacherLevel);
                setSelectedReserveId(null);
                setActivePlacedId(null);
              }}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {teacherLevels.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Matière
            <select
              value={selectedSubject}
              onChange={(event) => {
                setSelectedSubject(event.target.value as TeacherSubject);
                setSelectedReserveId(null);
                setActivePlacedId(null);
              }}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {teacherSubjects.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Période
            <select
              value={selectedPeriod}
              onChange={(event) => {
                setSelectedPeriod(event.target.value as TeacherPeriod);
                setSelectedReserveId(null);
                setActivePlacedId(null);
              }}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {teacherPeriods.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section aria-labelledby="compteurs-matiere">
        <h2 id="compteurs-matiere" className="text-sm font-black uppercase tracking-[0.1em] text-foreground">
          Compétences annuelles par matière — {periodLabel}
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2" role="list">
          {teacherSubjects.map((subject) => (
            <li
              key={subject.id}
              className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-bold text-muted"
            >
              {subject.label} : {allSubjectsCountForPeriod.get(subject.id) ?? 0}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="reserve-progression-titre">
        <h2 id="reserve-progression-titre" className="text-xl font-black text-foreground">
          Compétences de la période — {levelLabel} · {periodLabel}
        </h2>

        {periodCompetenciesForSubject.length === 0 ? (
          <p className="mt-4 text-sm leading-7 text-muted">
            Aucune compétence annuelle n&apos;est encore prévue pour cette période. Placez des
            compétences dans la programmation annuelle pour les retrouver ici.
          </p>
        ) : reserveItems.length === 0 ? (
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-muted">
            Toutes les compétences de cette période sont déjà placées dans une semaine.
          </p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-3" role="list" aria-label="Réserve de compétences de la période">
            {reserveItems.map((item) => {
              const isSelected = selectedReserveId === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => selectReserveCard(item.id)}
                    aria-pressed={isSelected}
                    className={[
                      "max-w-xs rounded-md border p-3 text-left transition",
                      isSelected
                        ? "border-gold/70 bg-gold/10 ring-2 ring-gold/40"
                        : "border-white/10 bg-white/[0.03] hover:border-gold/40",
                    ].join(" ")}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-sky">
                      {item.domain}
                    </p>
                    <p className="mt-1 text-sm font-bold text-foreground">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-muted">{item.skill}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <PublicStatusBadge status={item.status} />
                    </div>
                    {isSelected && (
                      <p className="mt-2 text-xs font-bold text-gold">
                        Sélectionnée — cliquez sur une semaine pour la placer.
                      </p>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section aria-labelledby="semaines-titre">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="semaines-titre" className="text-xl font-black text-foreground">
            Semaines de la période
          </h2>
          <button
            type="button"
            onClick={resetPeriodProgression}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember"
          >
            Réinitialiser la progression de cette période
          </button>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-4">
          {teacherWeeks.map((week) => {
            const weekItems = placedItems.filter((item) => item.week === week.id);

            return (
              <section
                key={week.id}
                aria-labelledby={`${week.id}-titre`}
                className="flex flex-col rounded-lg border border-white/10 bg-background/40 p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3
                    id={`${week.id}-titre`}
                    className="text-sm font-black uppercase tracking-[0.1em] text-foreground"
                  >
                    {week.label}
                    {week.optional ? " (facultative)" : ""}
                  </h3>
                  <span className="text-xs font-bold text-muted">
                    {weekCounts.get(week.id) ?? 0}
                  </span>
                </div>

                <Link
                  href={buildTeacherLessonPlannerHref({
                    niveau: selectedLevel,
                    matiere: selectedSubject,
                    periode: selectedPeriod,
                    semaine: week.id,
                  })}
                  className="mt-2 inline-flex min-h-9 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-2 text-center text-xs font-bold text-sky transition hover:bg-sky hover:text-ink"
                >
                  Préparer une séance pour cette semaine
                </Link>

                {selectedReserveId && (
                  <button
                    type="button"
                    onClick={() => placeSelectedCardIn(week.id)}
                    className="mt-2 min-h-11 rounded-md border border-gold/50 bg-gold/10 px-3 text-xs font-bold text-gold transition hover:bg-gold/20"
                  >
                    Placer ici
                  </button>
                )}

                <ul className="mt-3 flex flex-1 flex-col gap-3">
                  {weekItems.length === 0 ? (
                    <li className="text-xs leading-6 text-muted">
                      Aucune compétence cette semaine.
                    </li>
                  ) : (
                    weekItems.map((item, index) => {
                      const isOpen = activePlacedId === item.id;
                      return (
                        <li
                          key={item.id}
                          className="rounded-md border border-white/10 bg-white/[0.03] p-3"
                        >
                          <button
                            type="button"
                            onClick={() => openPlacedCard(item.id)}
                            aria-expanded={isOpen}
                            className="w-full text-left"
                          >
                            <p className="text-xs font-bold uppercase tracking-[0.08em] text-sky">
                              {item.domain}
                            </p>
                            <p className="mt-1 text-sm font-bold text-foreground">{item.title}</p>
                            <p className="mt-1 text-xs leading-5 text-muted">{item.skill}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <PublicStatusBadge status={item.status} />
                            </div>
                          </button>

                          {isOpen && (
                            <div
                              className="mt-3 flex flex-wrap gap-1"
                              role="group"
                              aria-label={`Actions pour ${item.title}`}
                            >
                              <button
                                type="button"
                                onClick={() => moveCardWithinWeek(item.id, -1)}
                                disabled={index === 0}
                                aria-label={`Monter ${item.title} dans ${week.label}`}
                                className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/40 disabled:opacity-30"
                              >
                                Monter
                              </button>
                              <button
                                type="button"
                                onClick={() => moveCardWithinWeek(item.id, 1)}
                                disabled={index === weekItems.length - 1}
                                aria-label={`Descendre ${item.title} dans ${week.label}`}
                                className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/40 disabled:opacity-30"
                              >
                                Descendre
                              </button>
                              {teacherWeeks.map((targetWeek) => (
                                <button
                                  key={targetWeek.id}
                                  type="button"
                                  onClick={() => moveCardToWeek(item.id, targetWeek.id)}
                                  disabled={targetWeek.id === week.id}
                                  aria-label={`Déplacer ${item.title} vers ${targetWeek.label}`}
                                  className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-muted transition hover:border-sky/40 hover:text-sky disabled:opacity-30"
                                >
                                  Déplacer vers {targetWeek.label}
                                </button>
                              ))}
                              <button
                                type="button"
                                onClick={() => removeCard(item.id)}
                                aria-label={`Retirer ${item.title} de la progression`}
                                className="min-h-9 rounded border border-rose/30 px-2 text-xs font-bold text-rose transition hover:bg-rose/10"
                              >
                                Retirer
                              </button>
                            </div>
                          )}
                        </li>
                      );
                    })
                  )}
                </ul>
              </section>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function teacherCompetenciesCountForPeriod(
  level: TeacherLevel,
  subject: TeacherSubject,
  period: TeacherPeriod,
  levelPlacements: Record<string, { period: TeacherPeriod; order: number }>,
): number {
  return getCompetenciesByLevelAndSubject(level, subject).filter(
    (item) => levelPlacements[item.id]?.period === period,
  ).length;
}
