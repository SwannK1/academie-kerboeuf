"use client";

import { useMemo, useState } from "react";
import { AssessmentForm } from "@/components/teacher-assessment-planner/AssessmentForm";
import {
  ASSESSMENT_PLANNER_STORAGE_KEY,
  assessmentPeriods,
  assessmentStatuses,
  assessmentSubjects,
  getAssessmentLevelLabel,
  getAssessmentPeriodLabel,
  getAssessmentStatusLabel,
  getAssessmentSubjectLabel,
  type Assessment,
  type AssessmentPeriod,
  type AssessmentStatus,
  type AssessmentSubject,
} from "@/content/teacher-assessment-planner";

function readStoredAssessments(): Assessment[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(ASSESSMENT_PLANNER_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed as Assessment[];
  } catch {
    return [];
  }
}

function writeStoredAssessments(assessments: Assessment[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(
    ASSESSMENT_PLANNER_STORAGE_KEY,
    JSON.stringify(assessments),
  );
}

const STATUS_BADGE_CLASSES: Record<AssessmentStatus, string> = {
  "a-preparer": "border-white/20 bg-white/[0.05] text-foreground",
  prete: "border-jade/40 bg-jade/10 text-jade",
  realisee: "border-sky/40 bg-sky/10 text-sky",
  "a-corriger": "border-amber/40 bg-amber/10 text-amber",
  "bilan-a-faire": "border-rose/40 bg-rose/10 text-rose",
};

export function AssessmentPlanner() {
  const [assessments, setAssessments] = useState<Assessment[]>(() =>
    readStoredAssessments(),
  );
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [filterSubject, setFilterSubject] = useState<AssessmentSubject | "all">(
    "all",
  );
  const [filterPeriod, setFilterPeriod] = useState<AssessmentPeriod | "all">(
    "all",
  );
  const [filterStatus, setFilterStatus] = useState<AssessmentStatus | "all">(
    "all",
  );

  const editingAssessment = useMemo(
    () => assessments.find((entry) => entry.id === editingId) ?? null,
    [assessments, editingId],
  );

  const filteredAssessments = useMemo(() => {
    return assessments
      .filter((entry) =>
        filterSubject === "all" ? true : entry.subject === filterSubject,
      )
      .filter((entry) =>
        filterPeriod === "all" ? true : entry.period === filterPeriod,
      )
      .filter((entry) =>
        filterStatus === "all" ? true : entry.status === filterStatus,
      )
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }, [assessments, filterSubject, filterPeriod, filterStatus]);

  function persist(next: Assessment[]) {
    setAssessments(next);
    writeStoredAssessments(next);
  }

  function handleSubmit(assessment: Assessment) {
    const exists = assessments.some((entry) => entry.id === assessment.id);
    const next = exists
      ? assessments.map((entry) => (entry.id === assessment.id ? assessment : entry))
      : [...assessments, assessment];
    persist(next);
    setIsCreating(false);
    setEditingId(null);
  }

  function handleDuplicate(assessment: Assessment) {
    const now = new Date().toISOString();
    const newId = `evaluation-${crypto.randomUUID()}`;
    const duplicate: Assessment = {
      ...assessment,
      id: newId,
      title: `${assessment.title} (copie)`,
      checklist: assessment.checklist.map((item) => ({ ...item, done: false })),
      createdAt: now,
      updatedAt: now,
    };
    persist([...assessments, duplicate]);
  }

  function handleConfirmDelete(id: string) {
    persist(assessments.filter((entry) => entry.id !== id));
    setPendingDeleteId(null);
  }

  function toggleChecklistItem(assessmentId: string, checklistItemId: string) {
    const next = assessments.map((entry) => {
      if (entry.id !== assessmentId) {
        return entry;
      }
      return {
        ...entry,
        checklist: entry.checklist.map((item) =>
          item.id === checklistItemId ? { ...item, done: !item.done } : item,
        ),
        updatedAt: new Date().toISOString(),
      };
    });
    persist(next);
  }

  return (
    <div className="print:text-black">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <h2 className="text-xl font-black text-foreground">Mes évaluations</h2>
        <div className="flex flex-wrap gap-3">
          {!isCreating && !editingId ? (
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="min-h-11 rounded-md border border-jade/50 bg-jade/15 px-4 text-sm font-black text-jade transition hover:bg-jade hover:text-ink"
            >
              + Créer une évaluation
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-sky/40 hover:text-sky"
          >
            Imprimer
          </button>
        </div>
      </div>

      {isCreating ? (
        <div className="mt-5 print:hidden">
          <AssessmentForm
            editingAssessment={null}
            onSubmit={handleSubmit}
            onCancel={() => setIsCreating(false)}
          />
        </div>
      ) : null}

      {editingAssessment ? (
        <div className="mt-5 print:hidden">
          <AssessmentForm
            editingAssessment={editingAssessment}
            onSubmit={handleSubmit}
            onCancel={() => setEditingId(null)}
          />
        </div>
      ) : null}

      <section
        aria-labelledby="filtres-titre"
        className="mt-6 flex flex-wrap items-end gap-3 print:hidden"
      >
        <h3 id="filtres-titre" className="sr-only">
          Filtres
        </h3>
        <FilterSelect
          label="Matière"
          value={filterSubject}
          onChange={(value) => setFilterSubject(value as AssessmentSubject | "all")}
          options={assessmentSubjects.map((entry) => ({
            value: entry.id,
            label: entry.label,
          }))}
        />
        <FilterSelect
          label="Période"
          value={filterPeriod}
          onChange={(value) => setFilterPeriod(value as AssessmentPeriod | "all")}
          options={assessmentPeriods.map((entry) => ({
            value: entry.id,
            label: entry.label,
          }))}
        />
        <FilterSelect
          label="Statut"
          value={filterStatus}
          onChange={(value) => setFilterStatus(value as AssessmentStatus | "all")}
          options={assessmentStatuses.map((entry) => ({
            value: entry.id,
            label: entry.label,
          }))}
        />
      </section>

      {filteredAssessments.length === 0 ? (
        <p className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
          Aucune évaluation ne correspond à ces filtres.
        </p>
      ) : (
        <ul className="mt-6 grid gap-4" role="list">
          {filteredAssessments.map((assessment) => {
            const levelLabel = getAssessmentLevelLabel(assessment.level);
            const doneCount = assessment.checklist.filter((item) => item.done).length;

            return (
              <li
                key={assessment.id}
                className="rounded-lg border border-white/10 bg-background/40 p-5 print:break-inside-avoid print:border-black/30"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-sky">
                      {getAssessmentSubjectLabel(assessment.subject)}
                      {levelLabel ? ` · ${levelLabel}` : ""}
                    </p>
                    <h3 className="mt-1 text-lg font-black text-foreground">
                      {assessment.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {assessment.skill}
                    </p>
                  </div>
                  <span
                    className={[
                      "min-h-8 rounded-full border px-3 py-1 text-xs font-bold",
                      STATUS_BADGE_CLASSES[assessment.status],
                    ].join(" ")}
                  >
                    {getAssessmentStatusLabel(assessment.status)}
                  </span>
                </div>

                <dl className="mt-4 grid gap-2 text-sm text-muted sm:grid-cols-2">
                  <Detail label="Période" value={getAssessmentPeriodLabel(assessment.period)} />
                  <Detail label="Durée" value={assessment.durationLabel} />
                  {assessment.date ? (
                    <Detail label="Date" value={assessment.date} />
                  ) : null}
                  {assessment.materials ? (
                    <Detail label="Matériel" value={assessment.materials} />
                  ) : null}
                </dl>

                {assessment.preparationNotes ? (
                  <p className="mt-3 rounded-md border border-white/10 bg-white/[0.03] p-3 text-sm leading-6 text-muted">
                    {assessment.preparationNotes}
                  </p>
                ) : null}

                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-foreground">
                    Checklist de préparation ({doneCount}/{assessment.checklist.length})
                  </p>
                  <ul className="mt-2 grid gap-1.5" role="list">
                    {assessment.checklist.map((item) => (
                      <li key={item.id} className="flex items-center gap-2">
                        <input
                          id={`${assessment.id}-${item.id}`}
                          type="checkbox"
                          checked={item.done}
                          onChange={() => toggleChecklistItem(assessment.id, item.id)}
                          className="h-4 w-4 print:hidden"
                        />
                        <span className="hidden text-sm print:inline">
                          {item.done ? "[x]" : "[ ]"}
                        </span>
                        <label
                          htmlFor={`${assessment.id}-${item.id}`}
                          className={[
                            "text-sm",
                            item.done ? "text-muted line-through" : "text-foreground",
                          ].join(" ")}
                        >
                          {item.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 print:hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(assessment.id);
                      setIsCreating(false);
                    }}
                    className="min-h-9 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-sky/40 hover:text-sky"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDuplicate(assessment)}
                    className="min-h-9 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-jade/40 hover:text-jade"
                  >
                    Dupliquer
                  </button>

                  {pendingDeleteId === assessment.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-rose">Confirmer ?</span>
                      <button
                        type="button"
                        onClick={() => handleConfirmDelete(assessment.id)}
                        className="min-h-9 rounded-md border border-rose/50 bg-rose/15 px-3 text-xs font-bold text-rose"
                      >
                        Oui, supprimer
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDeleteId(null)}
                        className="min-h-9 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPendingDeleteId(assessment.id)}
                      className="min-h-9 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-rose/40 hover:text-rose"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.06em] text-foreground/70">
        {label}
      </dt>
      <dd>{value}</dd>
    </div>
  );
}

function FilterSelect<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T | "all";
  onChange: (value: string) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
        {label}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
      >
        <option value="all">Tous</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
