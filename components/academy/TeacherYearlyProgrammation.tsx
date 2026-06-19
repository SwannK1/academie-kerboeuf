"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import {
  getCompetenciesByLevelAndSubject,
  readProgrammationStore,
  teacherLevels,
  teacherPeriods,
  teacherSubjects,
  writeProgrammationStore,
  type ProgrammationStore,
  type TeacherCompetency,
  type TeacherLevel,
  type TeacherPeriod,
  type TeacherSubject,
} from "@/content/teacher-planning";
import { buildTeacherLessonPlannerHref } from "@/content/teacher-lesson-planner";

type PlacedCompetency = TeacherCompetency & { period: TeacherPeriod; order: number };

export function TeacherYearlyProgrammation() {
  const [selectedLevel, setSelectedLevel] = useState<TeacherLevel>("cm2");
  const [selectedSubject, setSelectedSubject] = useState<TeacherSubject>("francais");
  const [store, setStore] = useState<ProgrammationStore>(() => readProgrammationStore());
  const [selectedReserveId, setSelectedReserveId] = useState<string | null>(null);
  const [activePlacedId, setActivePlacedId] = useState<string | null>(null);

  const levelLabel = teacherLevels.find((l) => l.id === selectedLevel)?.label ?? "";

  const pool = useMemo(
    () => getCompetenciesByLevelAndSubject(selectedLevel, selectedSubject),
    [selectedLevel, selectedSubject],
  );

  const levelPlacements = useMemo(
    () => store[selectedLevel] ?? {},
    [store, selectedLevel],
  );

  const placedItems = useMemo<PlacedCompetency[]>(() => {
    return pool
      .filter((item) => levelPlacements[item.id])
      .map((item) => ({ ...item, ...levelPlacements[item.id] }))
      .sort((a, b) => a.order - b.order);
  }, [pool, levelPlacements]);

  const reserveItems = useMemo(
    () => pool.filter((item) => !levelPlacements[item.id]),
    [pool, levelPlacements],
  );

  function updateLevelPlacements(
    updater: (current: Record<string, { period: TeacherPeriod; order: number }>) => Record<
      string,
      { period: TeacherPeriod; order: number }
    >,
  ) {
    setStore((current) => {
      const next: ProgrammationStore = {
        ...current,
        [selectedLevel]: updater(current[selectedLevel] ?? {}),
      };
      writeProgrammationStore(next);
      return next;
    });
  }

  function selectReserveCard(id: string) {
    setActivePlacedId(null);
    setSelectedReserveId((current) => (current === id ? null : id));
  }

  function placeSelectedCardIn(period: TeacherPeriod) {
    if (!selectedReserveId) return;
    updateLevelPlacements((current) => {
      const countInPeriod = Object.values(current).filter(
        (placement) => placement.period === period,
      ).length;
      return { ...current, [selectedReserveId]: { period, order: countInPeriod } };
    });
    setSelectedReserveId(null);
  }

  function openPlacedCard(id: string) {
    setSelectedReserveId(null);
    setActivePlacedId((current) => (current === id ? null : id));
  }

  function moveCardToPeriod(id: string, targetPeriod: TeacherPeriod) {
    updateLevelPlacements((current) => {
      const countInTarget = Object.entries(current).filter(
        ([entryId, placement]) => entryId !== id && placement.period === targetPeriod,
      ).length;
      return { ...current, [id]: { period: targetPeriod, order: countInTarget } };
    });
    setActivePlacedId(null);
  }

  function moveCardWithinPeriod(id: string, direction: -1 | 1) {
    const current = levelPlacements[id];
    if (!current) return;
    const periodItems = placedItems.filter((item) => item.period === current.period);
    const index = periodItems.findIndex((item) => item.id === id);
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= periodItems.length) return;

    const reordered = [...periodItems];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];

    updateLevelPlacements((existing) => {
      const next = { ...existing };
      reordered.forEach((item, order) => {
        next[item.id] = { period: item.period, order };
      });
      return next;
    });
  }

  function removeCard(id: string) {
    updateLevelPlacements((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    setActivePlacedId(null);
  }

  function resetProgrammation() {
    setStore((current) => {
      const next = { ...current, [selectedLevel]: {} };
      writeProgrammationStore(next);
      return next;
    });
    setSelectedReserveId(null);
    setActivePlacedId(null);
  }

  return (
    <div>
      <section aria-labelledby="choisir-niveau-titre">
        <h2 id="choisir-niveau-titre" className="text-xl font-black text-foreground">
          1. Choisir un niveau
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Niveaux">
          {teacherLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => {
                setSelectedLevel(level.id);
                setSelectedReserveId(null);
                setActivePlacedId(null);
              }}
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

      <section aria-labelledby="choisir-matiere-titre" className="mt-8">
        <h2 id="choisir-matiere-titre" className="text-xl font-black text-foreground">
          2. Choisir une matière
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Matières">
          {teacherSubjects.map((subject) => (
            <button
              key={subject.id}
              type="button"
              onClick={() => {
                setSelectedSubject(subject.id);
                setSelectedReserveId(null);
                setActivePlacedId(null);
              }}
              aria-pressed={subject.id === selectedSubject}
              className={[
                "min-h-11 rounded-md border px-4 text-sm font-bold transition",
                subject.id === selectedSubject
                  ? "border-sky/60 bg-sky/10 text-sky"
                  : "border-white/10 bg-white/[0.04] text-muted hover:border-sky/40",
              ].join(" ")}
            >
              {subject.label}
            </button>
          ))}
        </div>
      </section>

      <Link
        href="/enseignants/progression"
        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-4 text-sm font-bold text-sky transition hover:bg-sky hover:text-ink"
      >
        Ouvrir la progression de période
      </Link>

      <section aria-labelledby="reserve-titre" className="mt-8">
        <h2 id="reserve-titre" className="text-xl font-black text-foreground">
          3. Choisir une compétence
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted" id="regle-sequence">
          1 séquence = 1 compétence.
        </p>

        {reserveItems.length === 0 ? (
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
            Aucune compétence disponible : toutes les compétences de {levelLabel} en{" "}
            {teacherSubjects.find((s) => s.id === selectedSubject)?.label} sont déjà placées.
          </p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-3" role="list" aria-label="Réserve de compétences">
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
                      <span className="text-xs text-muted">{item.durationLabel}</span>
                    </div>
                    {isSelected && (
                      <p className="mt-2 text-xs font-bold text-gold">
                        Sélectionnée — cliquez sur une période pour la placer.
                      </p>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-black text-foreground">
          4. Placer dans une période — {levelLabel}
        </h2>
        <button
          type="button"
          onClick={resetProgrammation}
          className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-rose/40 hover:text-rose"
        >
          Réinitialiser ma programmation annuelle
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        {teacherPeriods.map((period) => {
          const periodItems = placedItems.filter((item) => item.period === period.id);

          return (
            <section
              key={period.id}
              aria-labelledby={`${period.id}-titre`}
              className="flex flex-col rounded-lg border border-white/10 bg-background/40 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <h3
                  id={`${period.id}-titre`}
                  className="text-sm font-black uppercase tracking-[0.1em] text-foreground"
                >
                  {period.label}
                </h3>
              </div>

              <Link
                href={buildTeacherLessonPlannerHref({
                  niveau: selectedLevel,
                  matiere: selectedSubject,
                  periode: period.id,
                })}
                className="mt-2 inline-flex min-h-9 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-2 text-center text-xs font-bold text-sky transition hover:bg-sky hover:text-ink"
              >
                Préparer une séance pour cette période
              </Link>

              {selectedReserveId && (
                <button
                  type="button"
                  onClick={() => placeSelectedCardIn(period.id)}
                  className="mt-2 min-h-11 rounded-md border border-gold/50 bg-gold/10 px-3 text-xs font-bold text-gold transition hover:bg-gold/20"
                >
                  Placer ici
                </button>
              )}

              <ul className="mt-3 flex flex-1 flex-col gap-3">
                {periodItems.length === 0 ? (
                  <li className="text-xs leading-6 text-muted">
                    Aucune compétence dans cette période.
                  </li>
                ) : (
                  periodItems.map((item, index) => {
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
                            {teacherSubjects.find((s) => s.id === item.subject)?.label} ·{" "}
                            {item.domain}
                          </p>
                          <p className="mt-1 text-sm font-bold text-foreground">{item.title}</p>
                          <p className="mt-1 text-xs leading-5 text-muted">{item.skill}</p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <PublicStatusBadge status={item.status} />
                            <span className="text-xs text-muted">{item.durationLabel}</span>
                          </div>
                        </button>

                        {isOpen && (
                          <div className="mt-3 flex flex-wrap gap-1" role="group" aria-label={`Actions pour ${item.title}`}>
                            <button
                              type="button"
                              onClick={() => moveCardWithinPeriod(item.id, -1)}
                              disabled={index === 0}
                              aria-label={`Monter ${item.title} dans ${period.label}`}
                              className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/40 disabled:opacity-30"
                            >
                              Monter
                            </button>
                            <button
                              type="button"
                              onClick={() => moveCardWithinPeriod(item.id, 1)}
                              disabled={index === periodItems.length - 1}
                              aria-label={`Descendre ${item.title} dans ${period.label}`}
                              className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/40 disabled:opacity-30"
                            >
                              Descendre
                            </button>
                            {teacherPeriods.map((targetPeriod) => (
                              <button
                                key={targetPeriod.id}
                                type="button"
                                onClick={() => moveCardToPeriod(item.id, targetPeriod.id)}
                                disabled={targetPeriod.id === period.id}
                                aria-label={`Déplacer ${item.title} vers ${targetPeriod.label}`}
                                className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-muted transition hover:border-sky/40 hover:text-sky disabled:opacity-30"
                              >
                                Déplacer vers {targetPeriod.shortLabel}
                              </button>
                            ))}
                            <button
                              type="button"
                              onClick={() => removeCard(item.id)}
                              aria-label={`Retirer ${item.title} de la programmation`}
                              className="min-h-9 rounded border border-rose/30 px-2 text-xs font-bold text-rose transition hover:bg-rose/10"
                            >
                              Retirer de la programmation
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
    </div>
  );
}
