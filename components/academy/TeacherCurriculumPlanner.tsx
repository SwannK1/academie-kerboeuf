"use client";

import { useMemo, useState } from "react";
import {
  curriculumSubjects,
  getSubjectsForLevel,
  schoolLevels,
  type CurriculumCompetency,
  type SchoolLevel,
} from "@/content/teacher-programming-curriculum";

const STORAGE_KEY = "academie-kerboeuf-curriculum-planning-v1";

const periods = [1, 2, 3, 4, 5] as const;

/**
 * Statut de planification de l'enseignant (à ne pas confondre avec le
 * statut public d'une ressource — c'est ici un suivi de mise en œuvre
 * propre à l'outil de programmation, sans lien avec PublicStatusBadge).
 */
export type PlanningStatus = "a-programmer" | "prevu" | "en-cours" | "termine";

const planningStatuses: { id: PlanningStatus; label: string; className: string }[] = [
  { id: "a-programmer", label: "À programmer", className: "border-white/15 bg-white/[0.04] text-muted" },
  { id: "prevu", label: "Prévu", className: "border-sky/40 bg-sky/10 text-sky" },
  { id: "en-cours", label: "En cours", className: "border-amber/40 bg-amber/10 text-amber" },
  { id: "termine", label: "Terminé", className: "border-jade/40 bg-jade/10 text-jade" },
];

function nextStatus(status: PlanningStatus): PlanningStatus {
  const index = planningStatuses.findIndex((s) => s.id === status);
  return planningStatuses[(index + 1) % planningStatuses.length].id;
}

type Assignment = {
  period: number;
  status: PlanningStatus;
};

type StoredAssignments = Record<string, Assignment>;

function readStoredAssignments(): StoredAssignments {
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
    return parsed as StoredAssignments;
  } catch {
    return {};
  }
}

function writeStoredAssignments(assignments: StoredAssignments) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
}

export function TeacherCurriculumPlanner() {
  const [selectedLevel, setSelectedLevel] = useState<SchoolLevel>("cm2");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null);
  const [activeDomainId, setActiveDomainId] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<StoredAssignments>(() =>
    readStoredAssignments(),
  );

  const subjectsForLevel = useMemo(
    () => getSubjectsForLevel(selectedLevel),
    [selectedLevel],
  );

  const subjectLabelById = useMemo(() => {
    const map = new Map<string, string>();
    curriculumSubjects.forEach((subject) => map.set(subject.id, subject.label));
    return map;
  }, []);

  const activeSubject = useMemo(
    () => subjectsForLevel.find((subject) => subject.id === activeSubjectId) ?? null,
    [subjectsForLevel, activeSubjectId],
  );

  const domainLabelById = useMemo(() => {
    const map = new Map<string, string>();
    subjectsForLevel.forEach((subject) =>
      subject.domains.forEach((domain) => map.set(domain.id, domain.label)),
    );
    return map;
  }, [subjectsForLevel]);

  const visibleCompetencies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return subjectsForLevel
      .filter((subject) => !activeSubjectId || subject.id === activeSubjectId)
      .flatMap((subject) =>
        subject.domains
          .filter((domain) => !activeDomainId || domain.id === activeDomainId)
          .flatMap((domain) => domain.competencies),
      )
      .filter((competency) =>
        query.length === 0 || competency.label.toLowerCase().includes(query),
      );
  }, [subjectsForLevel, activeSubjectId, activeDomainId, searchQuery]);

  function selectSubject(subjectId: string | null) {
    setActiveSubjectId(subjectId);
    setActiveDomainId(null);
  }

  function assignToPeriod(competencyId: string, period: number) {
    setAssignments((current) => {
      const existing = current[competencyId];
      const next: StoredAssignments = {
        ...current,
        [competencyId]: { period, status: existing?.status ?? "a-programmer" },
      };
      writeStoredAssignments(next);
      return next;
    });
  }

  function cycleStatus(competencyId: string) {
    setAssignments((current) => {
      const existing = current[competencyId];
      if (!existing) {
        return current;
      }
      const next: StoredAssignments = {
        ...current,
        [competencyId]: { ...existing, status: nextStatus(existing.status) },
      };
      writeStoredAssignments(next);
      return next;
    });
  }

  function removeAssignment(competencyId: string) {
    setAssignments((current) => {
      const next = { ...current };
      delete next[competencyId];
      writeStoredAssignments(next);
      return next;
    });
  }

  const allCompetenciesForLevel = useMemo(
    () => subjectsForLevel.flatMap((subject) => subject.domains.flatMap((d) => d.competencies)),
    [subjectsForLevel],
  );

  const competencyById = useMemo(() => {
    const map = new Map<string, CurriculumCompetency>();
    allCompetenciesForLevel.forEach((competency) => map.set(competency.id, competency));
    return map;
  }, [allCompetenciesForLevel]);

  const assignedIdsForLevel = useMemo(
    () =>
      Object.keys(assignments).filter((id) => competencyById.has(id)),
    [assignments, competencyById],
  );

  return (
    <div>
      <section aria-labelledby="planificateur-niveau-titre">
        <h2 id="planificateur-niveau-titre" className="text-xl font-black text-foreground">
          Choisir un niveau
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Niveaux">
          {schoolLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => {
                setSelectedLevel(level.id);
                selectSubject(null);
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
              <span className="ml-1 text-xs font-normal text-muted">
                ({level.cycle === "cycle-2" ? "cycle 2" : "cycle 3"})
              </span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="planificateur-matieres-titre" className="mt-8">
        <h2 id="planificateur-matieres-titre" className="text-xl font-black text-foreground">
          Matières
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Matières">
          <button
            type="button"
            onClick={() => selectSubject(null)}
            aria-pressed={activeSubjectId === null}
            className={[
              "min-h-11 rounded-md border px-4 text-sm font-bold transition",
              activeSubjectId === null
                ? "border-sky/60 bg-sky/10 text-sky"
                : "border-white/10 bg-white/[0.04] text-muted hover:border-sky/40",
            ].join(" ")}
          >
            Toutes
          </button>
          {subjectsForLevel.map((subject) => (
            <button
              key={subject.id}
              type="button"
              onClick={() => selectSubject(subject.id)}
              aria-pressed={activeSubjectId === subject.id}
              className={[
                "min-h-11 rounded-md border px-4 text-sm font-bold transition",
                activeSubjectId === subject.id
                  ? "border-sky/60 bg-sky/10 text-sky"
                  : "border-white/10 bg-white/[0.04] text-muted hover:border-sky/40",
              ].join(" ")}
            >
              {subject.label}
            </button>
          ))}
        </div>

        {activeSubject ? (
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Domaines">
            <button
              type="button"
              onClick={() => setActiveDomainId(null)}
              aria-pressed={activeDomainId === null}
              className={[
                "min-h-9 rounded border px-3 text-xs font-bold transition",
                activeDomainId === null
                  ? "border-jade/50 bg-jade/10 text-jade"
                  : "border-white/10 bg-white/[0.03] text-muted hover:border-jade/30",
              ].join(" ")}
            >
              Tous les domaines
            </button>
            {activeSubject.domains.map((domain) => (
              <button
                key={domain.id}
                type="button"
                onClick={() => setActiveDomainId(domain.id)}
                aria-pressed={activeDomainId === domain.id}
                className={[
                  "min-h-9 rounded border px-3 text-xs font-bold transition",
                  activeDomainId === domain.id
                    ? "border-jade/50 bg-jade/10 text-jade"
                    : "border-white/10 bg-white/[0.03] text-muted hover:border-jade/30",
                ].join(" ")}
              >
                {domain.label}
              </button>
            ))}
          </div>
        ) : null}
      </section>

      <section aria-labelledby="planificateur-recherche-titre" className="mt-8">
        <h2 id="planificateur-recherche-titre" className="text-xl font-black text-foreground">
          Rechercher une compétence
        </h2>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Ex : conjuguer, fractions, frise chronologique…"
          aria-label="Rechercher une compétence"
          className="mt-4 min-h-11 w-full max-w-xl rounded-md border border-white/15 bg-white/[0.04] px-4 text-sm text-foreground placeholder:text-muted focus:border-jade/50 focus:outline-none"
        />
      </section>

      <section aria-labelledby="planificateur-resultats-titre" className="mt-8">
        <h2 id="planificateur-resultats-titre" className="text-xl font-black text-foreground">
          Compétences ({visibleCompetencies.length})
        </h2>

        {visibleCompetencies.length === 0 ? (
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
            Aucune compétence ne correspond à cette recherche.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3 lg:grid-cols-2">
            {visibleCompetencies.map((competency) => {
              const assignment = assignments[competency.id];
              return (
                <li
                  key={competency.id}
                  className="rounded-md border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded border border-white/15 px-2 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-foreground">
                      {schoolLevels.find((l) => l.id === competency.level)?.label}
                    </span>
                    <span className="rounded border border-white/15 px-2 py-0.5 text-xs text-muted">
                      {competency.cycle === "cycle-2" ? "Cycle 2" : "Cycle 3"}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-sky">
                      {subjectLabelById.get(competency.subjectId)}
                    </span>
                    <span className="text-xs text-muted">
                      {domainLabelById.get(competency.domainId)}
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-bold text-foreground">{competency.label}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {assignment ? (
                      <>
                        <span className="text-xs text-muted">
                          Période {assignment.period}
                        </span>
                        <button
                          type="button"
                          onClick={() => cycleStatus(competency.id)}
                          className={[
                            "min-h-9 rounded border px-2.5 text-xs font-bold uppercase tracking-[0.1em] transition",
                            planningStatuses.find((s) => s.id === assignment.status)?.className,
                          ].join(" ")}
                        >
                          {planningStatuses.find((s) => s.id === assignment.status)?.label}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeAssignment(competency.id)}
                          className="min-h-9 rounded border border-white/15 px-2.5 text-xs font-bold text-muted transition hover:border-rose/40 hover:text-rose"
                        >
                          Retirer
                        </button>
                      </>
                    ) : (
                      <label className="flex items-center gap-2 text-xs text-muted">
                        Ajouter à
                        <select
                          defaultValue=""
                          onChange={(event) => {
                            const period = Number(event.target.value);
                            if (period) {
                              assignToPeriod(competency.id, period);
                            }
                          }}
                          aria-label={`Ajouter ${competency.label} à une période`}
                          className="min-h-9 rounded border border-white/15 bg-white/[0.04] px-2 text-xs text-foreground focus:border-jade/50 focus:outline-none"
                        >
                          <option value="" disabled>
                            Choisir une période
                          </option>
                          {periods.map((period) => (
                            <option key={period} value={period}>
                              Période {period}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section aria-labelledby="planificateur-periodes-titre" className="mt-10">
        <h2 id="planificateur-periodes-titre" className="text-xl font-black text-foreground">
          Programmation par période
        </h2>

        {assignedIdsForLevel.length === 0 ? (
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
            Aucune compétence n&apos;est encore placée dans une période pour ce niveau.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 lg:grid-cols-5">
            {periods.map((period) => {
              const periodCompetencyIds = assignedIdsForLevel.filter(
                (id) => assignments[id]?.period === period,
              );

              return (
                <section
                  key={period}
                  aria-labelledby={`periode-${period}-titre`}
                  className="flex flex-col rounded-lg border border-white/10 bg-background/40 p-3"
                >
                  <h3
                    id={`periode-${period}-titre`}
                    className="text-sm font-black uppercase tracking-[0.1em] text-foreground"
                  >
                    Période {period}
                  </h3>

                  <ul className="mt-3 flex flex-1 flex-col gap-2">
                    {periodCompetencyIds.length === 0 ? (
                      <li className="text-xs leading-6 text-muted">
                        Aucune compétence dans cette période.
                      </li>
                    ) : (
                      periodCompetencyIds.map((id) => {
                        const competency = competencyById.get(id);
                        const assignment = assignments[id];
                        if (!competency || !assignment) {
                          return null;
                        }
                        return (
                          <li
                            key={id}
                            className="rounded border border-white/10 bg-white/[0.03] p-2"
                          >
                            <p className="text-xs font-bold text-foreground">
                              {competency.label}
                            </p>
                            <p className="mt-1 text-[11px] text-muted">
                              {subjectLabelById.get(competency.subjectId)} ·{" "}
                              {domainLabelById.get(competency.domainId)}
                            </p>
                            <button
                              type="button"
                              onClick={() => cycleStatus(id)}
                              className={[
                                "mt-2 min-h-8 rounded border px-2 text-[11px] font-bold uppercase tracking-[0.08em] transition",
                                planningStatuses.find((s) => s.id === assignment.status)
                                  ?.className,
                              ].join(" ")}
                            >
                              {planningStatuses.find((s) => s.id === assignment.status)?.label}
                            </button>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
