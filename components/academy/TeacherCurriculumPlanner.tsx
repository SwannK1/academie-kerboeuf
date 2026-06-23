"use client";

import { useEffect, useMemo, useState } from "react";
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
import {
  planningPeriodNumbers,
  PLANNING_PRIORITIES,
  PLANNING_RESOURCE_STATUSES,
  PLANNING_STATUSES,
  nextFreeItemId,
  readPlanningState,
  writePlanningState,
  type PlanningFreeItem,
  type PlanningPeriodNumber,
  type PlanningPriority,
  type PlanningResourceStatus,
  type PlanningState,
  type PlanningStatus,
} from "@/content/teacher-programmation-planning";
import {
  nextCardId,
  readStoredCards,
  writeStoredCards,
  type PeriodCard,
} from "@/content/teacher-progression";

/**
 * Ancienne clé de l'outil de programmation (avant le catalogue enrichi).
 * On ne la supprime jamais automatiquement : elle reste consultable et
 * peut être reprise manuellement, sans correspondance de compétence
 * inventée vers le nouveau catalogue.
 */
const LEGACY_STORAGE_KEY = "academie-kerboeuf-programmation-v1";
const LEGACY_IGNORED_STORAGE_KEY = "academie-kerboeuf-programmation-v1-ignored";

function readIgnoredLegacyIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LEGACY_IGNORED_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeIgnoredLegacyIds(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LEGACY_IGNORED_STORAGE_KEY, JSON.stringify(ids));
}

type LegacyOverride = { period: string; order: number };
type LegacyOverrides = Record<string, LegacyOverride>;

function readLegacyOverrides(): LegacyOverrides | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return null;
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
  if (!overrides) return [];
  const entries: LegacyEntry[] = [];
  for (const [id, override] of Object.entries(overrides)) {
    const item = teacherProgrammationItems.find((entry) => entry.id === id);
    if (!item) continue;
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

type PlanningView = "annuelle" | "matiere" | "equilibrer" | "impression";

const PLANNING_VIEWS: { id: PlanningView; label: string }[] = [
  { id: "annuelle", label: "Vue annuelle" },
  { id: "matiere", label: "Vue par matière" },
  { id: "equilibrer", label: "À équilibrer" },
  { id: "impression", label: "Impression" },
];

/** Vue normalisée d'une carte placée, qu'elle soit issue du catalogue ou libre. */
type PlanningCard = {
  cardKey: string;
  kind: "catalogue" | "libre";
  competencyId: string;
  freeItemId: string | null;
  level: SchoolLevel;
  subjectId: string;
  subjectLabel: string;
  domainId: string;
  domainLabel: string;
  title: string;
  period: PlanningPeriodNumber;
  order: number;
  status: PlanningStatus;
  priority: PlanningPriority;
  dureeMinutes: number;
  teacherNote: string;
  hidden: boolean;
  resourceHref?: string;
  resourceStatus?: PlanningResourceStatus;
};

const HEAVY_PERIOD_MINUTES_THRESHOLD = 600;

export function TeacherCurriculumPlanner() {
  const [selectedLevel, setSelectedLevel] = useState<SchoolLevel>("cm2");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null);
  const [activeDomainId, setActiveDomainId] = useState<string | null>(null);
  const [view, setView] = useState<PlanningView>("annuelle");
  const [planningState, setPlanningState] = useState<PlanningState>(() => readPlanningState());
  const [showHidden, setShowHidden] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [resetConfirm, setResetConfirm] = useState<{ kind: "period"; period: PlanningPeriodNumber } | { kind: "subject"; subject: string } | null>(null);

  const [freeFormOpen, setFreeFormOpen] = useState(false);
  const [freeTitle, setFreeTitle] = useState("");
  const [freeSubjectId, setFreeSubjectId] = useState<string>("");
  const [freeDomain, setFreeDomain] = useState("");
  const [freePeriod, setFreePeriod] = useState<PlanningPeriodNumber>(1);
  const [freeDuree, setFreeDuree] = useState(45);

  const [legacyEntries] = useState<LegacyEntry[]>(() => buildLegacyEntries(readLegacyOverrides()));
  const [ignoredLegacyIds, setIgnoredLegacyIds] = useState<string[]>(() => readIgnoredLegacyIds());
  const [legacyDeletionConfirming, setLegacyDeletionConfirming] = useState(false);
  const [legacyDeleted, setLegacyDeleted] = useState(false);

  const [draggedKey, setDraggedKey] = useState<string | null>(null);
  const [dragOverPeriod, setDragOverPeriod] = useState<number | null>(null);

  function persist(next: PlanningState) {
    setPlanningState(next);
    writePlanningState(next);
  }

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

  const subjectsForLevel = useMemo(() => getSubjectsForLevel(selectedLevel), [selectedLevel]);

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
      .filter((competency) => query.length === 0 || competency.label.toLowerCase().includes(query));
  }, [subjectsForLevel, activeSubjectId, activeDomainId, searchQuery]);

  function selectSubject(subjectId: string | null) {
    setActiveSubjectId(subjectId);
    setActiveDomainId(null);
  }

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

  /** Toutes les cartes placées (catalogue + libres) pour le niveau sélectionné. */
  const planningCards = useMemo<PlanningCard[]>(() => {
    const cards: PlanningCard[] = [];

    for (const [competencyId, assignment] of Object.entries(planningState.assignments)) {
      const competency = competencyById.get(competencyId);
      if (!competency || competency.level !== selectedLevel) continue;
      cards.push({
        cardKey: `competence-${competencyId}`,
        kind: "catalogue",
        competencyId,
        freeItemId: null,
        level: selectedLevel,
        subjectId: competency.subjectId,
        subjectLabel: subjectLabelById.get(competency.subjectId) ?? competency.subjectId,
        domainId: competency.domainId,
        domainLabel: domainLabelById.get(competency.domainId) ?? competency.domainId,
        title: competency.label,
        period: assignment.period,
        order: assignment.order,
        status: assignment.status,
        priority: assignment.priority,
        dureeMinutes: assignment.dureeMinutes,
        teacherNote: assignment.teacherNote,
        hidden: assignment.hidden,
        resourceHref: assignment.resourceHref,
        resourceStatus: assignment.resourceStatus,
      });
    }

    for (const item of planningState.freeItems) {
      if (item.level !== selectedLevel) continue;
      cards.push({
        cardKey: `libre-${item.id}`,
        kind: "libre",
        competencyId: "",
        freeItemId: item.id,
        level: item.level,
        subjectId: item.subject,
        subjectLabel: item.subjectLabel,
        domainId: item.domain,
        domainLabel: item.domain,
        title: item.title,
        period: item.period,
        order: item.order,
        status: item.status,
        priority: item.priority,
        dureeMinutes: item.dureeMinutes,
        teacherNote: item.teacherNote,
        hidden: item.hidden,
        resourceHref: item.resourceHref,
        resourceStatus: item.resourceStatus,
      });
    }

    return cards;
  }, [planningState, competencyById, selectedLevel, subjectLabelById, domainLabelById]);

  const assignedCompetencyIds = useMemo(
    () => new Set(planningCards.filter((card) => card.kind === "catalogue").map((card) => card.competencyId)),
    [planningCards],
  );

  function cardsForPeriod(period: PlanningPeriodNumber) {
    return planningCards
      .filter((card) => card.period === period && (showHidden || !card.hidden))
      .sort((a, b) => a.order - b.order);
  }

  function maxOrderInPeriod(period: PlanningPeriodNumber) {
    let max = -1;
    for (const card of planningCards) {
      if (card.period === period && card.order > max) max = card.order;
    }
    return max;
  }

  function assignToPeriod(competencyId: string, period: PlanningPeriodNumber) {
    const order = maxOrderInPeriod(period) + 1;
    const existing = planningState.assignments[competencyId];
    persist({
      ...planningState,
      assignments: {
        ...planningState.assignments,
        [competencyId]: {
          period,
          status: existing?.status ?? "a-prevoir",
          order,
          priority: existing?.priority ?? "important",
          dureeMinutes: existing?.dureeMinutes ?? 45,
          teacherNote: existing?.teacherNote ?? "",
          hidden: false,
          resourceHref: existing?.resourceHref,
          resourceStatus: existing?.resourceStatus,
        },
      },
    });
  }

  function updateCatalogueAssignment(competencyId: string, patch: Partial<PlanningState["assignments"][string]>) {
    const existing = planningState.assignments[competencyId];
    if (!existing) return;
    persist({
      ...planningState,
      assignments: {
        ...planningState.assignments,
        [competencyId]: { ...existing, ...patch },
      },
    });
  }

  function removeAssignment(competencyId: string) {
    const next = { ...planningState.assignments };
    delete next[competencyId];
    persist({ ...planningState, assignments: next });
  }

  function updateFreeItem(id: string, patch: Partial<PlanningFreeItem>) {
    persist({
      ...planningState,
      freeItems: planningState.freeItems.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    });
  }

  function removeFreeItem(id: string) {
    persist({ ...planningState, freeItems: planningState.freeItems.filter((item) => item.id !== id) });
  }

  function addFreeItem() {
    if (!freeTitle.trim() || !freeSubjectId) return;
    const order = maxOrderInPeriod(freePeriod) + 1;
    const subjectLabel = subjectLabelById.get(freeSubjectId) ?? freeSubjectId;
    const newItem: PlanningFreeItem = {
      id: nextFreeItemId(),
      level: selectedLevel,
      subject: freeSubjectId,
      subjectLabel,
      domain: freeDomain.trim(),
      title: freeTitle.trim(),
      period: freePeriod,
      order,
      status: "a-prevoir",
      priority: "important",
      dureeMinutes: freeDuree,
      teacherNote: "",
      hidden: false,
    };
    persist({ ...planningState, freeItems: [...planningState.freeItems, newItem] });
    setFreeTitle("");
    setFreeDomain("");
    setFreeFormOpen(false);
  }

  function duplicateCard(card: PlanningCard) {
    const order = maxOrderInPeriod(card.period) + 1;
    const newItem: PlanningFreeItem = {
      id: nextFreeItemId(),
      level: card.level,
      subject: card.subjectId,
      subjectLabel: card.subjectLabel,
      domain: card.domainId,
      title: `${card.title} (copie)`,
      period: card.period,
      order,
      status: "a-prevoir",
      priority: card.priority,
      dureeMinutes: card.dureeMinutes,
      teacherNote: card.teacherNote,
      hidden: false,
      resourceHref: card.resourceHref,
      resourceStatus: card.resourceStatus,
    };
    persist({ ...planningState, freeItems: [...planningState.freeItems, newItem] });
  }

  function setHidden(card: PlanningCard, hidden: boolean) {
    if (card.kind === "catalogue") {
      updateCatalogueAssignment(card.competencyId, { hidden });
    } else if (card.freeItemId) {
      updateFreeItem(card.freeItemId, { hidden });
    }
  }

  function setPriority(card: PlanningCard, priority: PlanningPriority) {
    if (card.kind === "catalogue") {
      updateCatalogueAssignment(card.competencyId, { priority });
    } else if (card.freeItemId) {
      updateFreeItem(card.freeItemId, { priority });
    }
  }

  function setStatus(card: PlanningCard, status: PlanningStatus) {
    if (card.kind === "catalogue") {
      updateCatalogueAssignment(card.competencyId, { status });
    } else if (card.freeItemId) {
      updateFreeItem(card.freeItemId, { status });
    }
  }

  function removeCard(card: PlanningCard) {
    if (card.kind === "catalogue") {
      removeAssignment(card.competencyId);
    } else if (card.freeItemId) {
      removeFreeItem(card.freeItemId);
    }
  }

  function orderedCardKeysForPeriod(period: PlanningPeriodNumber) {
    return planningCards
      .filter((card) => card.period === period)
      .sort((a, b) => a.order - b.order)
      .map((card) => card.cardKey);
  }

  function applyReorder(
    base: PlanningState,
    targetPeriod: PlanningPeriodNumber,
    orderedKeys: string[],
  ): PlanningState {
    const next: PlanningState = {
      assignments: { ...base.assignments },
      freeItems: [...base.freeItems],
    };
    orderedKeys.forEach((key, index) => {
      const card = planningCards.find((c) => c.cardKey === key);
      if (!card) return;
      if (card.kind === "catalogue") {
        const existing = next.assignments[card.competencyId];
        if (existing) {
          next.assignments[card.competencyId] = { ...existing, period: targetPeriod, order: index };
        }
      } else if (card.freeItemId) {
        next.freeItems = next.freeItems.map((item) =>
          item.id === card.freeItemId ? { ...item, period: targetPeriod, order: index } : item,
        );
      }
    });
    return next;
  }

  function reorderInPeriod(targetPeriod: PlanningPeriodNumber, orderedKeys: string[]) {
    persist(applyReorder(planningState, targetPeriod, orderedKeys));
  }

  function moveCard(cardKey: string, targetPeriod: PlanningPeriodNumber, beforeKey?: string | null) {
    const card = planningCards.find((c) => c.cardKey === cardKey);
    if (!card) return;
    const sourcePeriod = card.period;

    const targetKeys = orderedCardKeysForPeriod(targetPeriod).filter((key) => key !== cardKey);
    let insertAt = targetKeys.length;
    if (beforeKey) {
      const index = targetKeys.indexOf(beforeKey);
      if (index !== -1) insertAt = index;
    }
    targetKeys.splice(insertAt, 0, cardKey);

    let next = applyReorder(planningState, targetPeriod, targetKeys);

    if (sourcePeriod !== targetPeriod) {
      const sourceKeys = orderedCardKeysForPeriod(sourcePeriod).filter((key) => key !== cardKey);
      next = applyReorder(next, sourcePeriod, sourceKeys);
    }

    persist(next);
  }

  function moveWithinPeriod(cardKey: string, direction: -1 | 1) {
    const card = planningCards.find((c) => c.cardKey === cardKey);
    if (!card) return;
    const keys = orderedCardKeysForPeriod(card.period);
    const index = keys.indexOf(cardKey);
    const targetIndex = index + direction;
    if (index === -1 || targetIndex < 0 || targetIndex >= keys.length) return;
    [keys[index], keys[targetIndex]] = [keys[targetIndex], keys[index]];
    reorderInPeriod(card.period, keys);
  }

  function moveToAdjacentPeriod(cardKey: string, direction: -1 | 1) {
    const card = planningCards.find((c) => c.cardKey === cardKey);
    if (!card) return;
    const targetPeriod = (card.period + direction) as PlanningPeriodNumber;
    if (targetPeriod < 1 || targetPeriod > 5) return;
    moveCard(cardKey, targetPeriod);
  }

  function handleDrop(targetPeriod: PlanningPeriodNumber, beforeKey: string | null) {
    if (draggedKey) {
      moveCard(draggedKey, targetPeriod, beforeKey);
    }
    setDraggedKey(null);
    setDragOverPeriod(null);
  }

  function sendCardToProgression(card: PlanningCard) {
    const periodId = `periode-${card.period}` as const;
    const cards = readStoredCards();
    const sourceId = card.cardKey;
    const existing = cards.find((c) => c.sourceProgrammationId === sourceId);
    if (existing) {
      const updated = cards.map((c) =>
        c.id === existing.id
          ? {
              ...c,
              matiere: card.subjectId,
              domaine: card.domainId,
              competenceLabel: card.title,
              dureeMinutes: card.dureeMinutes,
              priority: card.priority,
              noteEnseignant: card.teacherNote,
            }
          : c,
      );
      writeStoredCards(updated);
      return;
    }
    const newCard: PeriodCard = {
      id: nextCardId(),
      niveau: card.level,
      periode: periodId,
      matiere: card.subjectId,
      domaine: card.domainId,
      competenceId: card.competencyId,
      competenceLabel: card.title,
      dureeMinutes: card.dureeMinutes,
      statut: "a-prevoir",
      imprimablesDisponibles: [],
      priority: card.priority,
      sourceProgrammationId: sourceId,
      noteEnseignant: card.teacherNote,
    };
    writeStoredCards([...cards, newCard]);
  }

  function resetPeriod(period: PlanningPeriodNumber) {
    const nextAssignments = { ...planningState.assignments };
    for (const [id, assignment] of Object.entries(nextAssignments)) {
      const competency = competencyById.get(id);
      if (competency && competency.level === selectedLevel && assignment.period === period) {
        delete nextAssignments[id];
      }
    }
    const nextFreeItems = planningState.freeItems.filter(
      (item) => !(item.level === selectedLevel && item.period === period),
    );
    persist({ assignments: nextAssignments, freeItems: nextFreeItems });
    setResetConfirm(null);
  }

  function resetSubject(subjectId: string) {
    const nextAssignments = { ...planningState.assignments };
    for (const id of Object.keys(nextAssignments)) {
      const competency = competencyById.get(id);
      if (competency && competency.level === selectedLevel && competency.subjectId === subjectId) {
        delete nextAssignments[id];
      }
    }
    const nextFreeItems = planningState.freeItems.filter(
      (item) => !(item.level === selectedLevel && item.subject === subjectId),
    );
    persist({ assignments: nextAssignments, freeItems: nextFreeItems });
    setResetConfirm(null);
  }

  const editingCard = useMemo(
    () => planningCards.find((card) => card.cardKey === editingKey) ?? null,
    [planningCards, editingKey],
  );

  // --- Vue "à équilibrer" -----------------------------------------------
  const periodStats = useMemo(() => {
    return planningPeriodNumbers.map((period) => {
      const cards = planningCards.filter((card) => card.period === period && !card.hidden);
      const dureeTotale = cards.reduce((sum, card) => sum + card.dureeMinutes, 0);
      return { period, count: cards.length, dureeTotale };
    });
  }, [planningCards]);

  const cardsWithoutDuration = useMemo(
    () =>
      planningCards.filter(
        (card) => !card.hidden && (!card.dureeMinutes || Number.isNaN(card.dureeMinutes) || card.dureeMinutes <= 0),
      ),
    [planningCards],
  );

  const subjectsWithoutCards = useMemo(() => {
    const subjectsWithCards = new Set(
      planningCards.filter((card) => !card.hidden).map((card) => card.subjectId),
    );
    return subjectsForLevel.filter((subject) => !subjectsWithCards.has(subject.id));
  }, [planningCards, subjectsForLevel]);

  const unplacedCompetenciesCount = allCompetenciesForLevel.length - assignedCompetencyIds.size;

  const overweightPeriods = periodStats.filter((stat) => stat.dureeTotale > HEAVY_PERIOD_MINUTES_THRESHOLD);

  return (
    <div>
      {legacyEntries.length > 0 && !legacyDeleted ? (
        <section
          aria-labelledby="ancienne-programmation-titre"
          className="mb-8 rounded-lg border border-amber/40 bg-amber/10 p-5 print:hidden"
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

      <section aria-labelledby="planificateur-niveau-titre" className="print:hidden">
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

      <section aria-labelledby="planificateur-vues-titre" className="mt-8 print:hidden">
        <h2 id="planificateur-vues-titre" className="text-xl font-black text-foreground">
          Vues
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Vues de la programmation">
          {PLANNING_VIEWS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setView(option.id)}
              aria-pressed={view === option.id}
              className={[
                "min-h-11 rounded-md border px-4 text-sm font-bold transition",
                view === option.id
                  ? "border-sky/60 bg-sky/10 text-sky"
                  : "border-white/10 bg-white/[0.04] text-muted hover:border-sky/40",
              ].join(" ")}
            >
              {option.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/40"
          >
            Imprimer
          </button>
          <label className="flex min-h-11 items-center gap-2 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground">
            <input
              type="checkbox"
              checked={showHidden}
              onChange={(event) => setShowHidden(event.target.checked)}
            />
            Voir les cartes masquées
          </label>
        </div>
      </section>

      {view === "annuelle" || view === "impression" ? (
        <>
          <section aria-labelledby="planificateur-matieres-titre" className="mt-8 print:hidden">
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

          {view === "annuelle" ? (
            <section aria-labelledby="planificateur-recherche-titre" className="mt-8 print:hidden">
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
          ) : null}

          {view === "annuelle" ? (
            <section aria-labelledby="planificateur-resultats-titre" className="mt-8 print:hidden">
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
                    const isAssigned = assignedCompetencyIds.has(competency.id);
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
                          <span className="text-xs text-muted">{domainLabelById.get(competency.domainId)}</span>
                        </div>

                        <p className="mt-2 text-sm font-bold text-foreground">{competency.label}</p>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {isAssigned ? (
                            <span className="text-xs text-muted">
                              Déjà placée — voir la programmation par période ci-dessous
                            </span>
                          ) : (
                            <label className="flex items-center gap-2 text-xs text-muted">
                              Ajouter à
                              <select
                                defaultValue=""
                                onChange={(event) => {
                                  const period = Number(event.target.value) as PlanningPeriodNumber;
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
                                {planningPeriodNumbers.map((period) => (
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
          ) : null}

          {view === "annuelle" ? (
            <section aria-labelledby="planificateur-carte-libre-titre" className="mt-8 print:hidden">
              <h2 id="planificateur-carte-libre-titre" className="text-xl font-black text-foreground">
                Carte libre
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFreeFormOpen((open) => !open)}
                  className="min-h-11 rounded-md border border-jade/50 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25"
                >
                  Ajouter une carte
                </button>
              </div>
              {freeFormOpen ? (
                <div className="mt-4 grid gap-4 rounded-lg border border-white/10 bg-background/45 p-4 sm:grid-cols-2 lg:grid-cols-4">
                  <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
                    Titre
                    <input
                      type="text"
                      value={freeTitle}
                      onChange={(event) => setFreeTitle(event.target.value)}
                      placeholder="Ex : Atelier production d'écrits"
                      className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                    Matière
                    <select
                      value={freeSubjectId}
                      onChange={(event) => setFreeSubjectId(event.target.value)}
                      className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                    >
                      <option value="">Choisir</option>
                      {subjectsForLevel.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                    Domaine (libre)
                    <input
                      type="text"
                      value={freeDomain}
                      onChange={(event) => setFreeDomain(event.target.value)}
                      className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                    Période
                    <select
                      value={freePeriod}
                      onChange={(event) => setFreePeriod(Number(event.target.value) as PlanningPeriodNumber)}
                      className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                    >
                      {planningPeriodNumbers.map((period) => (
                        <option key={period} value={period}>
                          Période {period}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                    Durée estimée (minutes)
                    <input
                      type="number"
                      min={5}
                      step={5}
                      value={freeDuree}
                      onChange={(event) => setFreeDuree(Number(event.target.value) || 0)}
                      className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                    />
                  </label>
                  <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-4">
                    <button
                      type="button"
                      onClick={addFreeItem}
                      disabled={!freeTitle.trim() || !freeSubjectId}
                      className="min-h-11 rounded-md border border-jade/50 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Ajouter la carte
                    </button>
                  </div>
                </div>
              ) : null}
            </section>
          ) : null}

          <section aria-labelledby="planificateur-periodes-titre" className="mt-10">
            <h2 id="planificateur-periodes-titre" className="text-xl font-black text-foreground print:text-black">
              Programmation par période
            </h2>

            {planningCards.length === 0 ? (
              <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
                Aucune compétence n&apos;est encore placée dans une période pour ce niveau.
              </p>
            ) : (
              <div className="mt-4 grid gap-4 lg:grid-cols-5 print:grid-cols-1 print:gap-2">
                {planningPeriodNumbers.map((period) => {
                  const periodCards = cardsForPeriod(period);
                  const isDragOver = dragOverPeriod === period;

                  return (
                    <section
                      key={period}
                      aria-labelledby={`periode-${period}-titre`}
                      className={[
                        "flex flex-col rounded-lg border bg-background/40 p-3 transition print:break-inside-avoid print:border-black print:bg-transparent",
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
                      <div className="flex items-center justify-between print:hidden">
                        <h3
                          id={`periode-${period}-titre`}
                          className="text-sm font-black uppercase tracking-[0.1em] text-foreground"
                        >
                          Période {period}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setResetConfirm({ kind: "period", period })}
                          className="text-[11px] font-bold text-muted underline-offset-2 hover:text-rose hover:underline"
                        >
                          Réinitialiser
                        </button>
                      </div>
                      <h3 className="hidden text-sm font-black uppercase tracking-[0.1em] text-black print:block">
                        Période {period}
                      </h3>

                      {resetConfirm?.kind === "period" && resetConfirm.period === period ? (
                        <div className="mt-2 flex flex-wrap items-center gap-2 rounded border border-rose/40 bg-rose/10 p-2 text-xs print:hidden">
                          <span className="font-bold text-rose">Vider la période {period} ?</span>
                          <button
                            type="button"
                            onClick={() => resetPeriod(period)}
                            className="rounded border border-rose/50 px-2 py-1 font-bold text-rose hover:bg-rose/10"
                          >
                            Confirmer
                          </button>
                          <button
                            type="button"
                            onClick={() => setResetConfirm(null)}
                            className="rounded border border-white/15 px-2 py-1 font-bold text-muted hover:border-white/30"
                          >
                            Annuler
                          </button>
                        </div>
                      ) : null}

                      <ul className="mt-3 flex flex-1 flex-col gap-2">
                        {periodCards.length === 0 ? (
                          <li
                            className={[
                              "rounded border border-dashed p-3 text-xs leading-6 text-muted transition print:hidden",
                              isDragOver ? "border-jade/50 bg-jade/5 text-jade" : "border-white/15",
                            ].join(" ")}
                          >
                            {isDragOver ? "Déposer ici pour ajouter à cette période" : "Aucune carte dans cette période."}
                          </li>
                        ) : (
                          periodCards.map((card, index) => {
                            const isFirst = index === 0;
                            const isLast = index === periodCards.length - 1;
                            const isFirstPeriod = period === planningPeriodNumbers[0];
                            const isLastPeriod = period === planningPeriodNumbers[planningPeriodNumbers.length - 1];
                            const statusInfo = PLANNING_STATUSES.find((s) => s.id === card.status);
                            return (
                              <li
                                key={card.cardKey}
                                draggable
                                onDragStart={() => setDraggedKey(card.cardKey)}
                                onDragEnd={() => {
                                  setDraggedKey(null);
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
                                  handleDrop(period, card.cardKey);
                                }}
                                className={[
                                  "cursor-grab rounded border border-white/10 bg-white/[0.03] p-2 active:cursor-grabbing print:cursor-default print:border-black",
                                  draggedKey === card.cardKey ? "opacity-40" : "",
                                  card.hidden ? "opacity-50" : "",
                                ].join(" ")}
                              >
                                <div className="flex flex-wrap items-center gap-1">
                                  {card.priority === "essential" ? (
                                    <span className="rounded border border-rose/40 bg-rose/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-rose print:border-black print:bg-transparent print:text-black">
                                      Essentiel
                                    </span>
                                  ) : null}
                                  {card.hidden ? (
                                    <span className="rounded border border-white/20 px-1.5 py-0.5 text-[10px] font-bold uppercase text-muted print:hidden">
                                      Masquée
                                    </span>
                                  ) : null}
                                  <span className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-muted print:border-black print:text-black">
                                    {card.resourceStatus
                                      ? PLANNING_RESOURCE_STATUSES.find((r) => r.id === card.resourceStatus)?.label
                                      : "Aucune ressource"}
                                  </span>
                                </div>
                                <p className="mt-1 text-xs font-bold text-foreground print:text-black">{card.title}</p>
                                <p className="mt-1 text-[11px] text-muted print:text-black">
                                  {card.subjectLabel} · {card.domainLabel} · {card.dureeMinutes} min
                                </p>
                                {card.resourceHref ? (
                                  <a
                                    href={card.resourceHref}
                                    className="mt-1 inline-block text-[11px] font-bold text-jade underline-offset-2 hover:underline print:text-black"
                                  >
                                    Voir la ressource
                                  </a>
                                ) : null}
                                <button
                                  type="button"
                                  onClick={() => setStatus(card, statusInfo ? cycleNextStatus(statusInfo.id) : "a-prevoir")}
                                  className={[
                                    "mt-2 min-h-8 rounded border px-2 text-[11px] font-bold uppercase tracking-[0.08em] transition print:hidden",
                                    statusInfo?.className,
                                  ].join(" ")}
                                >
                                  {statusInfo?.label}
                                </button>

                                <div
                                  className="mt-2 flex flex-wrap gap-1 print:hidden"
                                  role="group"
                                  aria-label={`Actions ${card.title}`}
                                >
                                  <button
                                    type="button"
                                    onClick={() => moveWithinPeriod(card.cardKey, -1)}
                                    disabled={isFirst}
                                    className="min-h-7 rounded border border-white/15 px-2 text-[11px] font-bold text-muted transition hover:border-jade/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                                  >
                                    Monter
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => moveWithinPeriod(card.cardKey, 1)}
                                    disabled={isLast}
                                    className="min-h-7 rounded border border-white/15 px-2 text-[11px] font-bold text-muted transition hover:border-jade/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                                  >
                                    Descendre
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => moveToAdjacentPeriod(card.cardKey, -1)}
                                    disabled={isFirstPeriod}
                                    className="min-h-7 rounded border border-white/15 px-2 text-[11px] font-bold text-muted transition hover:border-sky/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                                  >
                                    Période précédente
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => moveToAdjacentPeriod(card.cardKey, 1)}
                                    disabled={isLastPeriod}
                                    className="min-h-7 rounded border border-white/15 px-2 text-[11px] font-bold text-muted transition hover:border-sky/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                                  >
                                    Période suivante
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingKey(card.cardKey)}
                                    className="min-h-7 rounded border border-sky/40 px-2 text-[11px] font-bold text-sky transition hover:bg-sky/10"
                                  >
                                    Modifier
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => duplicateCard(card)}
                                    className="min-h-7 rounded border border-white/15 px-2 text-[11px] font-bold text-muted transition hover:border-jade/40 hover:text-foreground"
                                  >
                                    Dupliquer
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setPriority(card, card.priority === "essential" ? "important" : "essential")}
                                    className="min-h-7 rounded border border-white/15 px-2 text-[11px] font-bold text-muted transition hover:border-rose/40 hover:text-rose"
                                  >
                                    {card.priority === "essential" ? "Retirer priorité" : "Marquer prioritaire"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setStatus(card, "termine")}
                                    className="min-h-7 rounded border border-white/15 px-2 text-[11px] font-bold text-muted transition hover:border-jade/40 hover:text-jade"
                                  >
                                    Marquer terminée
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setHidden(card, !card.hidden)}
                                    className="min-h-7 rounded border border-white/15 px-2 text-[11px] font-bold text-muted transition hover:border-white/30"
                                  >
                                    {card.hidden ? "Restaurer" : "Masquer"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => sendCardToProgression(card)}
                                    className="min-h-7 rounded border border-sky/40 px-2 text-[11px] font-bold text-sky transition hover:bg-sky/10"
                                  >
                                    Envoyer à la progression
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => removeCard(card)}
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
        </>
      ) : null}

      {view === "matiere" ? (
        <section aria-labelledby="vue-matiere-titre" className="mt-10">
          <h2 id="vue-matiere-titre" className="text-xl font-black text-foreground">
            Vue par matière
          </h2>
          <div className="mt-4 space-y-6">
            {subjectsForLevel.map((subject) => {
              const subjectCards = planningCards
                .filter((card) => card.subjectId === subject.id && (showHidden || !card.hidden))
                .sort((a, b) => a.period - b.period || a.order - b.order);
              return (
                <div key={subject.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase tracking-[0.08em] text-sky">{subject.label}</h3>
                    <button
                      type="button"
                      onClick={() => setResetConfirm({ kind: "subject", subject: subject.id })}
                      className="text-[11px] font-bold text-muted underline-offset-2 hover:text-rose hover:underline"
                    >
                      Réinitialiser cette matière
                    </button>
                  </div>
                  {resetConfirm?.kind === "subject" && resetConfirm.subject === subject.id ? (
                    <div className="mt-2 flex flex-wrap items-center gap-2 rounded border border-rose/40 bg-rose/10 p-2 text-xs">
                      <span className="font-bold text-rose">Vider toute la matière « {subject.label} » ?</span>
                      <button
                        type="button"
                        onClick={() => resetSubject(subject.id)}
                        className="rounded border border-rose/50 px-2 py-1 font-bold text-rose hover:bg-rose/10"
                      >
                        Confirmer
                      </button>
                      <button
                        type="button"
                        onClick={() => setResetConfirm(null)}
                        className="rounded border border-white/15 px-2 py-1 font-bold text-muted hover:border-white/30"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : null}
                  {subjectCards.length === 0 ? (
                    <p className="mt-2 text-sm text-muted">Aucune carte placée pour cette matière.</p>
                  ) : (
                    <ul className="mt-3 space-y-2">
                      {subjectCards.map((card) => (
                        <li
                          key={card.cardKey}
                          className="flex flex-wrap items-center gap-2 rounded border border-white/10 bg-background/40 p-2 text-sm"
                        >
                          <span className="rounded border border-white/15 px-2 py-0.5 text-xs font-bold text-muted">
                            Période {card.period}
                          </span>
                          <span className="font-bold text-foreground">{card.title}</span>
                          <span className="text-xs text-muted">{card.dureeMinutes} min</span>
                          {card.hidden ? <span className="text-xs text-muted">(masquée)</span> : null}
                          <button
                            type="button"
                            onClick={() => setEditingKey(card.cardKey)}
                            className="ml-auto min-h-8 rounded border border-sky/40 px-2 text-[11px] font-bold text-sky transition hover:bg-sky/10"
                          >
                            Modifier
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {view === "equilibrer" ? (
        <section aria-labelledby="vue-equilibrer-titre" className="mt-10">
          <h2 id="vue-equilibrer-titre" className="text-xl font-black text-foreground">
            À équilibrer
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {periodStats.map((stat) => (
              <div
                key={stat.period}
                className={[
                  "rounded-lg border p-4",
                  stat.dureeTotale > HEAVY_PERIOD_MINUTES_THRESHOLD
                    ? "border-rose/40 bg-rose/10"
                    : "border-white/10 bg-white/[0.03]",
                ].join(" ")}
              >
                <p className="text-sm font-black text-foreground">Période {stat.period}</p>
                <p className="mt-1 text-xs text-muted">{stat.count} carte(s)</p>
                <p className="mt-1 text-xs text-muted">
                  {stat.dureeTotale} min ({Math.round((stat.dureeTotale / 60) * 10) / 10} h)
                </p>
                {stat.dureeTotale > HEAVY_PERIOD_MINUTES_THRESHOLD ? (
                  <p className="mt-2 text-xs font-bold text-rose">Période chargée</p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <h3 className="text-sm font-black uppercase tracking-[0.08em] text-foreground">
                Matières peu présentes ({subjectsWithoutCards.length})
              </h3>
              {subjectsWithoutCards.length === 0 ? (
                <p className="mt-2 text-sm text-muted">Toutes les matières ont au moins une carte placée.</p>
              ) : (
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {subjectsWithoutCards.map((subject) => (
                    <li key={subject.id}>{subject.label}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <h3 className="text-sm font-black uppercase tracking-[0.08em] text-foreground">
                Compétences non placées
              </h3>
              <p className="mt-2 text-sm text-muted">
                {unplacedCompetenciesCount} compétence(s) du catalogue de ce niveau ne sont placées dans aucune période.
              </p>
            </div>
          </div>

          {overweightPeriods.length > 0 ? (
            <p className="mt-4 text-sm font-bold text-rose">
              {overweightPeriods.length} période(s) dépassent {HEAVY_PERIOD_MINUTES_THRESHOLD} minutes de contenu estimé.
            </p>
          ) : null}

          <div className="mt-6 rounded-lg border border-amber/40 bg-amber/10 p-4">
            <h3 className="text-sm font-black uppercase tracking-[0.08em] text-amber">
              Cartes sans durée ({cardsWithoutDuration.length})
            </h3>
            {cardsWithoutDuration.length === 0 ? (
              <p className="mt-2 text-sm text-muted">Toutes les cartes ont une durée estimée renseignée.</p>
            ) : (
              <ul className="mt-2 space-y-1 text-sm">
                {cardsWithoutDuration.map((card) => (
                  <li key={card.cardKey} className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-foreground">{card.title}</span>
                    <span className="rounded border border-white/15 px-2 py-0.5 text-xs font-bold text-muted">
                      Période {card.period}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ) : null}

      {editingCard ? (
        <PlanningCardEditor
          card={editingCard}
          onClose={() => setEditingKey(null)}
          onUpdate={(patch) => {
            if (editingCard.kind === "catalogue") {
              updateCatalogueAssignment(editingCard.competencyId, patch);
            } else if (editingCard.freeItemId) {
              const freePatch: Partial<PlanningFreeItem> = { ...patch };
              if (patch.title !== undefined) {
                freePatch.title = patch.title;
              }
              updateFreeItem(editingCard.freeItemId, freePatch);
            }
          }}
          onDelete={() => {
            removeCard(editingCard);
            setEditingKey(null);
          }}
        />
      ) : null}
    </div>
  );
}

function cycleNextStatus(status: PlanningStatus): PlanningStatus {
  const index = PLANNING_STATUSES.findIndex((s) => s.id === status);
  return PLANNING_STATUSES[(index + 1) % PLANNING_STATUSES.length].id;
}

interface PlanningCardEditorProps {
  card: PlanningCard;
  onClose: () => void;
  onUpdate: (patch: {
    title?: string;
    dureeMinutes?: number;
    period?: PlanningPeriodNumber;
    priority?: PlanningPriority;
    status?: PlanningStatus;
    teacherNote?: string;
    resourceHref?: string;
    resourceStatus?: PlanningResourceStatus;
  }) => void;
  onDelete: () => void;
}

function PlanningCardEditor({ card, onClose, onUpdate, onDelete }: PlanningCardEditorProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-[55] bg-background/40 print:hidden"
      />
      <aside
        role="dialog"
        aria-label={`Modifier la carte ${card.title}`}
        onClick={(event) => event.stopPropagation()}
        className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-sm flex-col gap-4 overflow-y-auto border-l border-white/10 bg-background p-6 shadow-2xl print:hidden"
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-black text-foreground">Modifier la carte</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le panneau"
            className="min-h-9 min-w-9 rounded-md border border-white/15 px-2 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember"
          >
            ✕
          </button>
        </div>

        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-muted">Matière</dt>
            <dd className="font-bold text-foreground">{card.subjectLabel}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-muted">Domaine</dt>
            <dd className="font-bold text-foreground">{card.domainLabel}</dd>
          </div>
        </dl>

        {card.kind === "libre" ? (
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Titre
            <input
              type="text"
              defaultValue={card.title}
              onBlur={(event) => onUpdate({ title: event.target.value })}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
        ) : (
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-muted">Compétence</dt>
            <dd className="font-bold text-foreground">{card.title}</dd>
          </div>
        )}

        <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
          Période
          <select
            value={card.period}
            onChange={(event) => onUpdate({ period: Number(event.target.value) as PlanningPeriodNumber })}
            className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
          >
            {planningPeriodNumbers.map((period) => (
              <option key={period} value={period}>
                Période {period}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
          Durée estimée (minutes)
          <input
            type="number"
            min={5}
            step={5}
            defaultValue={card.dureeMinutes}
            onBlur={(event) => onUpdate({ dureeMinutes: Number(event.target.value) || 0 })}
            className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
          Priorité
          <select
            value={card.priority}
            onChange={(event) => onUpdate({ priority: event.target.value as PlanningPriority })}
            className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
          >
            {PLANNING_PRIORITIES.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
          Statut
          <select
            value={card.status}
            onChange={(event) => onUpdate({ status: event.target.value as PlanningStatus })}
            className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
          >
            {PLANNING_STATUSES.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
          Note enseignant
          <textarea
            defaultValue={card.teacherNote}
            onBlur={(event) => onUpdate({ teacherNote: event.target.value })}
            rows={3}
            className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
          Lien vers une ressource réelle (optionnel)
          <input
            type="url"
            defaultValue={card.resourceHref ?? ""}
            onBlur={(event) => onUpdate({ resourceHref: event.target.value.trim() || undefined })}
            placeholder="https://…"
            className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
          État de la ressource
          <select
            value={card.resourceStatus ?? ""}
            onChange={(event) =>
              onUpdate({
                resourceStatus: (event.target.value || undefined) as PlanningResourceStatus | undefined,
              })
            }
            className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
          >
            <option value="">Non précisé</option>
            {PLANNING_RESOURCE_STATUSES.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={onDelete}
          className="mt-auto min-h-11 rounded-md border border-ember/50 bg-ember/10 px-4 text-sm font-bold text-ember transition hover:bg-ember/20"
        >
          Retirer la carte
        </button>
      </aside>
    </>
  );
}
