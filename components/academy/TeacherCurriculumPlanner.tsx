"use client";

import { useMemo, useState } from "react";
import {
  curriculumSubjects,
  getSubjectsForLevel,
  schoolLevels,
  type CurriculumCompetency,
  type SchoolLevel,
} from "@/content/teacher-programming-curriculum";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import {
  teacherProgrammationItems,
  teacherSubjects as legacyTeacherSubjects,
} from "@/content/teacher-programmation";

const STORAGE_KEY = "academie-kerboeuf-curriculum-planning-v1";

/**
 * Ancienne clé de l'outil de programmation (avant le catalogue enrichi).
 * On ne la supprime jamais automatiquement : elle reste consultable et
 * peut être reprise manuellement, sans correspondance de compétence
 * inventée vers le nouveau catalogue.
 */
const LEGACY_STORAGE_KEY = "academie-kerboeuf-programmation-v1";

/**
 * Liste des anciens éléments explicitement ignorés par l'enseignant.
 * Ne touche jamais à LEGACY_STORAGE_KEY : permet seulement de masquer
 * un élément du bandeau sans rien supprimer.
 */
const LEGACY_IGNORED_STORAGE_KEY = "academie-kerboeuf-programmation-v1-ignored";

function readIgnoredLegacyIds(): string[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(LEGACY_IGNORED_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeIgnoredLegacyIds(ids: string[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(LEGACY_IGNORED_STORAGE_KEY, JSON.stringify(ids));
}

type LegacyOverride = { period: string; order: number };
type LegacyOverrides = Record<string, LegacyOverride>;

function readLegacyOverrides(): LegacyOverrides | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Object.keys(parsed).length === 0) {
      return null;
    }
    return parsed as LegacyOverrides;
  } catch {
    return null;
  }
}

type LegacyEntry = {
  id: string;
  level: string;
  period: string;
  subjectLabel: string;
  title: string;
  status: (typeof teacherProgrammationItems)[number]["status"];
};

function buildLegacyEntries(overrides: LegacyOverrides | null): LegacyEntry[] {
  if (!overrides) {
    return [];
  }
  const entries: LegacyEntry[] = [];
  for (const [id, override] of Object.entries(overrides)) {
    const item = teacherProgrammationItems.find((entry) => entry.id === id);
    if (!item) {
      continue;
    }
    entries.push({
      id,
      level: item.level,
      period: override.period ?? item.period,
      subjectLabel:
        legacyTeacherSubjects.find((subject) => subject.id === item.subject)?.label ??
        item.subject,
      title: item.title,
      status: item.status,
    });
  }
  return entries;
}

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
  order: number;
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
    const entries = parsed as Record<string, Partial<Assignment> & { period: number; status: PlanningStatus }>;
    const normalized: StoredAssignments = {};
    Object.entries(entries).forEach(([id, value], index) => {
      normalized[id] = {
        period: value.period,
        status: value.status,
        order: typeof value.order === "number" ? value.order : index,
      };
    });
    return normalized;
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
  const [legacyEntries] = useState<LegacyEntry[]>(() =>
    buildLegacyEntries(readLegacyOverrides()),
  );
  const [ignoredLegacyIds, setIgnoredLegacyIds] = useState<string[]>(() =>
    readIgnoredLegacyIds(),
  );
  const [legacyDeletionConfirming, setLegacyDeletionConfirming] = useState(false);
  const [legacyDeleted, setLegacyDeleted] = useState(false);

  const visibleLegacyEntries = useMemo(
    () => legacyEntries.filter((entry) => !ignoredLegacyIds.includes(entry.id)),
    [legacyEntries, ignoredLegacyIds],
  );

  function ignoreLegacyEntry(entryId: string) {
    setIgnoredLegacyIds((current) => {
      const next = current.includes(entryId) ? current : [...current, entryId];
      writeIgnoredLegacyIds(next);
      return next;
    });
  }

  function confirmDeleteLegacyProgrammation() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
    setLegacyDeletionConfirming(false);
    setLegacyDeleted(true);
  }

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

  /**
   * Reprise manuelle d'une ancienne entrée : on amène l'enseignant sur le
   * bon niveau et on préremplit la recherche avec l'ancien intitulé, pour
   * qu'il retrouve et place lui-même la compétence correspondante du
   * nouveau catalogue. Aucune correspondance n'est devinée automatiquement.
   */
  function resumeLegacyEntry(entry: LegacyEntry) {
    setSelectedLevel(entry.level as SchoolLevel);
    selectSubject(null);
    setSearchQuery(entry.title);
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

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverPeriod, setDragOverPeriod] = useState<number | null>(null);

  function maxOrderInPeriod(current: StoredAssignments, period: number, excludeId?: string) {
    let max = -1;
    for (const [id, assignment] of Object.entries(current)) {
      if (id === excludeId) continue;
      if (assignment.period === period && assignment.order > max) {
        max = assignment.order;
      }
    }
    return max;
  }

  function assignToPeriod(competencyId: string, period: number) {
    setAssignments((current) => {
      // Une compétence ne peut être placée que dans une seule période :
      // l'attribution remplace toujours l'éventuelle entrée précédente.
      const existing = current[competencyId];
      const order = maxOrderInPeriod(current, period, competencyId) + 1;
      const next: StoredAssignments = {
        ...current,
        [competencyId]: { period, status: existing?.status ?? "a-programmer", order },
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

  function competencyBelongsToLevel(competencyId: string, level: SchoolLevel) {
    return competencyById.has(competencyId) && competencyById.get(competencyId)?.level === level;
  }

  function orderedIdsForPeriod(current: StoredAssignments, level: SchoolLevel, period: number) {
    return Object.entries(current)
      .filter(([id, assignment]) => assignment.period === period && competencyBelongsToLevel(id, level))
      .sort((a, b) => a[1].order - b[1].order)
      .map(([id]) => id);
  }

  /**
   * Déplace une compétence vers une période cible, en l'insérant juste avant
   * `beforeId` (ou en fin de liste si absent). Recalcule les ordres des deux
   * périodes concernées pour éviter tout doublon de position.
   */
  function moveCompetency(competencyId: string, targetPeriod: number, beforeId?: string | null) {
    setAssignments((current) => {
      const existing = current[competencyId];
      if (!existing) {
        return current;
      }

      const sourcePeriod = existing.period;
      const targetIds = orderedIdsForPeriod(current, selectedLevel, targetPeriod).filter(
        (id) => id !== competencyId,
      );

      let insertAt = targetIds.length;
      if (beforeId) {
        const index = targetIds.indexOf(beforeId);
        if (index !== -1) {
          insertAt = index;
        }
      }
      targetIds.splice(insertAt, 0, competencyId);

      const next: StoredAssignments = { ...current };
      targetIds.forEach((id, index) => {
        next[id] = { ...next[id], period: targetPeriod, order: index };
      });

      if (sourcePeriod !== targetPeriod) {
        const sourceIds = orderedIdsForPeriod(current, selectedLevel, sourcePeriod).filter(
          (id) => id !== competencyId,
        );
        sourceIds.forEach((id, index) => {
          next[id] = { ...next[id], order: index };
        });
      }

      writeStoredAssignments(next);
      return next;
    });
  }

  function moveWithinPeriod(competencyId: string, direction: -1 | 1) {
    setAssignments((current) => {
      const existing = current[competencyId];
      if (!existing) {
        return current;
      }
      const ids = orderedIdsForPeriod(current, selectedLevel, existing.period);
      const index = ids.indexOf(competencyId);
      const targetIndex = index + direction;
      if (index === -1 || targetIndex < 0 || targetIndex >= ids.length) {
        return current;
      }
      const swapId = ids[targetIndex];
      const next: StoredAssignments = {
        ...current,
        [competencyId]: { ...current[competencyId], order: current[swapId].order },
        [swapId]: { ...current[swapId], order: current[competencyId].order },
      };
      writeStoredAssignments(next);
      return next;
    });
  }

  function moveToAdjacentPeriod(competencyId: string, direction: -1 | 1) {
    const existing = assignments[competencyId];
    if (!existing) {
      return;
    }
    const targetPeriod = existing.period + direction;
    if (targetPeriod < periods[0] || targetPeriod > periods[periods.length - 1]) {
      return;
    }
    moveCompetency(competencyId, targetPeriod);
  }

  function handleDrop(targetPeriod: number, beforeId: string | null) {
    if (draggedId) {
      moveCompetency(draggedId, targetPeriod, beforeId);
    }
    setDraggedId(null);
    setDragOverPeriod(null);
  }

  return (
    <div>
      {legacyEntries.length > 0 && !legacyDeleted ? (
        <section
          aria-labelledby="ancienne-programmation-titre"
          className="mb-8 rounded-lg border border-amber/40 bg-amber/10 p-5"
        >
          <h2 id="ancienne-programmation-titre" className="text-lg font-black text-amber">
            Ancienne programmation détectée
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Des données de l&apos;ancien outil de programmation ont été trouvées sur cet
            appareil. Elles ne sont pas reliées automatiquement au nouveau catalogue : vous
            pouvez les consulter ci-dessous, reprendre chaque élément manuellement ou l&apos;ignorer.
          </p>

          {visibleLegacyEntries.length === 0 ? (
            <p className="mt-4 text-sm text-muted">
              Tous les éléments ont été ignorés. L&apos;ancienne sauvegarde reste disponible sur
              cet appareil.
            </p>
          ) : (
            <ul className="mt-4 space-y-2">
              {visibleLegacyEntries.map((entry) => (
                <li
                  key={entry.id}
                  className="flex flex-wrap items-center gap-2 rounded border border-white/10 bg-background/40 p-3"
                >
                  <span className="rounded border border-white/15 px-2 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-foreground">
                    {entry.level.toUpperCase()}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-sky">
                    {entry.subjectLabel}
                  </span>
                  <span className="text-xs text-muted">{entry.period}</span>
                  <PublicStatusBadge status={entry.status} />
                  <span className="text-sm font-bold text-foreground">{entry.title}</span>
                  <div className="ml-auto flex gap-2">
                    <button
                      type="button"
                      onClick={() => ignoreLegacyEntry(entry.id)}
                      className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-muted transition hover:border-white/30 hover:text-foreground"
                    >
                      Ignorer
                    </button>
                    <button
                      type="button"
                      onClick={() => resumeLegacyEntry(entry)}
                      className="min-h-9 rounded border border-jade/40 px-3 text-xs font-bold text-jade transition hover:bg-jade/10"
                    >
                      Reprendre manuellement
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 border-t border-white/10 pt-4">
            {legacyDeletionConfirming ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-rose">
                  Confirmer la suppression définitive de l&apos;ancienne programmation ?
                </span>
                <button
                  type="button"
                  onClick={confirmDeleteLegacyProgrammation}
                  className="min-h-9 rounded border border-rose/50 px-3 text-xs font-bold text-rose transition hover:bg-rose/10"
                >
                  Confirmer la suppression
                </button>
                <button
                  type="button"
                  onClick={() => setLegacyDeletionConfirming(false)}
                  className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-muted transition hover:border-white/30"
                >
                  Annuler
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setLegacyDeletionConfirming(true)}
                className="min-h-9 rounded border border-white/15 px-3 text-xs font-bold text-muted transition hover:border-rose/40 hover:text-rose"
              >
                Supprimer l&apos;ancienne programmation
              </button>
            )}
          </div>
        </section>
      ) : null}

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
              const periodCompetencyIds = assignedIdsForLevel
                .filter((id) => assignments[id]?.period === period)
                .sort((a, b) => assignments[a].order - assignments[b].order);
              const isDragOver = dragOverPeriod === period;

              return (
                <section
                  key={period}
                  aria-labelledby={`periode-${period}-titre`}
                  className={[
                    "flex flex-col rounded-lg border bg-background/40 p-3 transition",
                    isDragOver ? "border-jade/60 bg-jade/5" : "border-white/10",
                  ].join(" ")}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragOverPeriod(period);
                  }}
                  onDragLeave={() => setDragOverPeriod((current) => (current === period ? null : current))}
                  onDrop={(event) => {
                    event.preventDefault();
                    handleDrop(period, null);
                  }}
                >
                  <h3
                    id={`periode-${period}-titre`}
                    className="text-sm font-black uppercase tracking-[0.1em] text-foreground"
                  >
                    Période {period}
                  </h3>

                  <ul className="mt-3 flex flex-1 flex-col gap-2">
                    {periodCompetencyIds.length === 0 ? (
                      <li
                        className={[
                          "rounded border border-dashed p-3 text-xs leading-6 text-muted transition",
                          isDragOver ? "border-jade/50 bg-jade/5 text-jade" : "border-white/15",
                        ].join(" ")}
                      >
                        {isDragOver
                          ? "Déposer ici pour ajouter à cette période"
                          : "Aucune compétence dans cette période."}
                      </li>
                    ) : (
                      periodCompetencyIds.map((id, index) => {
                        const competency = competencyById.get(id);
                        const assignment = assignments[id];
                        if (!competency || !assignment) {
                          return null;
                        }
                        const isFirst = index === 0;
                        const isLast = index === periodCompetencyIds.length - 1;
                        const isFirstPeriod = period === periods[0];
                        const isLastPeriod = period === periods[periods.length - 1];
                        return (
                          <li
                            key={id}
                            draggable
                            onDragStart={() => setDraggedId(id)}
                            onDragEnd={() => {
                              setDraggedId(null);
                              setDragOverPeriod(null);
                            }}
                            onDragOver={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              setDragOverPeriod(period);
                            }}
                            onDrop={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              handleDrop(period, id);
                            }}
                            className={[
                              "cursor-grab rounded border border-white/10 bg-white/[0.03] p-2 active:cursor-grabbing",
                              draggedId === id ? "opacity-40" : "",
                            ].join(" ")}
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

                            <div
                              className="mt-2 flex flex-wrap gap-1"
                              role="group"
                              aria-label={`Déplacer ${competency.label}`}
                            >
                              <button
                                type="button"
                                onClick={() => moveWithinPeriod(id, -1)}
                                disabled={isFirst}
                                aria-label={`Monter ${competency.label} dans la période ${period}`}
                                className="min-h-7 rounded border border-white/15 px-2 text-[11px] font-bold text-muted transition hover:border-jade/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                              >
                                Monter
                              </button>
                              <button
                                type="button"
                                onClick={() => moveWithinPeriod(id, 1)}
                                disabled={isLast}
                                aria-label={`Descendre ${competency.label} dans la période ${period}`}
                                className="min-h-7 rounded border border-white/15 px-2 text-[11px] font-bold text-muted transition hover:border-jade/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                              >
                                Descendre
                              </button>
                              <button
                                type="button"
                                onClick={() => moveToAdjacentPeriod(id, -1)}
                                disabled={isFirstPeriod}
                                aria-label={`Déplacer ${competency.label} vers la période précédente`}
                                className="min-h-7 rounded border border-white/15 px-2 text-[11px] font-bold text-muted transition hover:border-sky/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                              >
                                Période précédente
                              </button>
                              <button
                                type="button"
                                onClick={() => moveToAdjacentPeriod(id, 1)}
                                disabled={isLastPeriod}
                                aria-label={`Déplacer ${competency.label} vers la période suivante`}
                                className="min-h-7 rounded border border-white/15 px-2 text-[11px] font-bold text-muted transition hover:border-sky/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                              >
                                Période suivante
                              </button>
                              <button
                                type="button"
                                onClick={() => removeAssignment(id)}
                                aria-label={`Retirer ${competency.label} de la programmation`}
                                className="min-h-7 rounded border border-white/15 px-2 text-[11px] font-bold text-muted transition hover:border-rose/40 hover:text-rose"
                              >
                                Retirer
                              </button>
                            </div>
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
