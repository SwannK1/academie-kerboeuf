"use client";

import { useEffect, useMemo, useState } from "react";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getPublicStatusKey } from "@/content/public-status";
import {
  primaryProgrammingEntries,
  type PrimaryLevel,
  type PrimaryProgrammingEntry,
  type PrimarySubject,
  type SchoolPeriod,
} from "@/content/primary-programmation";

const STORAGE_KEY = "academie-kerboeuf-progression-periode-v1";

const LEVELS: { id: PrimaryLevel; label: string }[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

const PERIODS: { id: SchoolPeriod; label: string }[] = [
  { id: "periode-1", label: "Période 1" },
  { id: "periode-2", label: "Période 2" },
  { id: "periode-3", label: "Période 3" },
  { id: "periode-4", label: "Période 4" },
  { id: "periode-5", label: "Période 5" },
];

const SUBJECT_LABELS: Record<PrimarySubject, string> = {
  francais: "Français",
  mathematiques: "Mathématiques",
  "questionner-le-monde": "Questionner le monde",
  "histoire-geographie": "Histoire-géographie",
  sciences: "Sciences",
  "enseignement-moral-et-civique": "Enseignement moral et civique",
  arts: "Arts",
  eps: "EPS",
  "langue-vivante": "Langue vivante",
};

type StoredOrders = Record<string, string[]>;

function readStoredOrders(): StoredOrders {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") {
      return parsed as StoredOrders;
    }
    return {};
  } catch {
    return {};
  }
}

function groupKey(level: PrimaryLevel, period: SchoolPeriod): string {
  return `${level}__${period}`;
}

export function TeacherPeriodProgressionClient() {
  const [level, setLevel] = useState<PrimaryLevel>("cp");
  const [period, setPeriod] = useState<SchoolPeriod>("periode-1");
  const [subjectFilter, setSubjectFilter] = useState<PrimarySubject | "all">(
    "all",
  );
  const [storedOrders, setStoredOrders] = useState<StoredOrders>(() =>
    readStoredOrders(),
  );

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedOrders));
  }, [storedOrders]);

  const key = groupKey(level, period);

  const baseEntries = useMemo(
    () =>
      primaryProgrammingEntries
        .filter((entry) => entry.level === level && entry.period === period)
        .sort((a, b) => a.order - b.order),
    [level, period],
  );

  const orderedEntries = useMemo<PrimaryProgrammingEntry[]>(() => {
    const customOrder = storedOrders[key];
    if (!customOrder) return baseEntries;
    const byId = new Map(baseEntries.map((entry) => [entry.id, entry]));
    const ordered = customOrder
      .map((id) => byId.get(id))
      .filter((entry): entry is PrimaryProgrammingEntry => Boolean(entry));
    const missing = baseEntries.filter(
      (entry) => !customOrder.includes(entry.id),
    );
    return [...ordered, ...missing];
  }, [baseEntries, storedOrders, key]);

  const availableSubjects = useMemo(() => {
    const seen = new Set<PrimarySubject>();
    const subjects: PrimarySubject[] = [];
    for (const entry of baseEntries) {
      if (!seen.has(entry.subject)) {
        seen.add(entry.subject);
        subjects.push(entry.subject);
      }
    }
    return subjects;
  }, [baseEntries]);

  const effectiveSubjectFilter =
    subjectFilter !== "all" && !availableSubjects.includes(subjectFilter)
      ? "all"
      : subjectFilter;

  const visibleEntries = useMemo(
    () =>
      effectiveSubjectFilter === "all"
        ? orderedEntries
        : orderedEntries.filter(
            (entry) => entry.subject === effectiveSubjectFilter,
          ),
    [orderedEntries, effectiveSubjectFilter],
  );

  function moveEntry(id: string, direction: -1 | 1) {
    const visibleIds = visibleEntries.map((entry) => entry.id);
    const visibleIndex = visibleIds.indexOf(id);
    const targetVisibleIndex = visibleIndex + direction;
    if (
      visibleIndex === -1 ||
      targetVisibleIndex < 0 ||
      targetVisibleIndex >= visibleIds.length
    ) {
      return;
    }
    const targetId = visibleIds[targetVisibleIndex];

    const fullIds = orderedEntries.map((entry) => entry.id);
    const i = fullIds.indexOf(id);
    const j = fullIds.indexOf(targetId);
    [fullIds[i], fullIds[j]] = [fullIds[j], fullIds[i]];

    setStoredOrders((prev) => ({ ...prev, [key]: fullIds }));
  }

  function resetPeriodProgression() {
    setStoredOrders((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  const hasCustomOrder = Boolean(storedOrders[key]);

  return (
    <div className="mt-10 space-y-8">
      <section aria-labelledby="choix-niveau-periode">
        <h2 id="choix-niveau-periode" className="text-xl font-black text-foreground">
          Choisir le niveau et la période
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Niveau
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value as PrimaryLevel)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {LEVELS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Période
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value as SchoolPeriod)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {PERIODS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section aria-labelledby="filtre-matiere">
        <h2 id="filtre-matiere" className="text-xl font-black text-foreground">
          Filtrer par matière
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrer par matière">
          <button
            type="button"
            aria-pressed={effectiveSubjectFilter === "all"}
            onClick={() => setSubjectFilter("all")}
            className={`min-h-11 rounded-md border px-4 text-sm font-bold transition ${
              effectiveSubjectFilter === "all"
                ? "border-jade/60 bg-jade/15 text-jade"
                : "border-white/15 text-foreground hover:border-jade/40"
            }`}
          >
            Toutes les matières
          </button>
          {availableSubjects.map((subject) => (
            <button
              key={subject}
              type="button"
              aria-pressed={effectiveSubjectFilter === subject}
              onClick={() => setSubjectFilter(subject)}
              className={`min-h-11 rounded-md border px-4 text-sm font-bold transition ${
                effectiveSubjectFilter === subject
                  ? "border-jade/60 bg-jade/15 text-jade"
                  : "border-white/15 text-foreground hover:border-jade/40"
              }`}
            >
              {SUBJECT_LABELS[subject]}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="liste-sequences">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="liste-sequences" className="text-xl font-black text-foreground">
            Séquences de la période
          </h2>
          <button
            type="button"
            onClick={resetPeriodProgression}
            disabled={!hasCustomOrder}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember disabled:cursor-not-allowed disabled:opacity-40"
          >
            Réinitialiser la progression de période
          </button>
        </div>

        {visibleEntries.length === 0 ? (
          <p className="mt-4 text-sm leading-7 text-muted">
            Aucune séquence prévue pour cette période et cette matière.
          </p>
        ) : (
          <ol className="mt-4 space-y-3" role="list">
            {visibleEntries.map((entry, index) => (
              <li
                key={entry.id}
                className="flex flex-col gap-3 rounded-lg border border-white/10 bg-background/45 p-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                    {SUBJECT_LABELS[entry.subject]} · {entry.domain}
                  </p>
                  <h3 className="mt-1 text-base font-black text-foreground">
                    {entry.notionTitle}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    Compétence : {entry.skill}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <PublicStatusBadge status={getPublicStatusKey(entry.status)} />
                    <span className="text-xs font-medium text-muted">
                      Durée indicative : ~1 semaine (estimation)
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2 sm:flex-col">
                  <button
                    type="button"
                    onClick={() => moveEntry(entry.id, -1)}
                    disabled={index === 0}
                    aria-label={`Monter ${entry.notionTitle}`}
                    className="min-h-11 min-w-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/50 hover:text-jade disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ↑ Monter
                  </button>
                  <button
                    type="button"
                    onClick={() => moveEntry(entry.id, 1)}
                    disabled={index === visibleEntries.length - 1}
                    aria-label={`Descendre ${entry.notionTitle}`}
                    className="min-h-11 min-w-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/50 hover:text-jade disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ↓ Descendre
                  </button>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
