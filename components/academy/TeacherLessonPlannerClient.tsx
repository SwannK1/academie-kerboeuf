"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createEmptyLessonPlan,
  TEACHER_LESSON_GROUPINGS,
  TEACHER_LESSON_LEVELS,
  TEACHER_LESSON_PERIODS,
  TEACHER_LESSON_PLANNER_STORAGE_KEY,
  TEACHER_LESSON_SUBJECTS,
  type TeacherLessonGrouping,
  type TeacherLessonLevel,
  type TeacherLessonPeriod,
  type TeacherLessonPhase,
  type TeacherLessonPlan,
} from "@/content/teacher-lesson-planner";
import {
  teacherProgrammationItems,
  type TeacherProgrammationItem,
} from "@/content/teacher-programmation";

const SUBJECT_LABEL_BY_ID = new Map(
  TEACHER_LESSON_SUBJECTS.map((subject) => [subject.id, subject.label]),
);

const PERIOD_LABEL_BY_ID = new Map(
  TEACHER_LESSON_PERIODS.map((period) => [period.id, period.label]),
);

function readStoredPlans(): TeacherLessonPlan[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(TEACHER_LESSON_PLANNER_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as TeacherLessonPlan[]) : [];
  } catch {
    return [];
  }
}

export function TeacherLessonPlannerClient() {
  const [plans, setPlans] = useState<TeacherLessonPlan[]>(() => readStoredPlans());
  const [draft, setDraft] = useState<TeacherLessonPlan>(() => createEmptyLessonPlan());
  const [search, setSearch] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_LESSON_PLANNER_STORAGE_KEY,
      JSON.stringify(plans),
    );
  }, [plans]);

  const linkableProgrammationItems = useMemo<TeacherProgrammationItem[]>(
    () =>
      teacherProgrammationItems.filter(
        (item) => item.level === draft.classLevel.toLowerCase(),
      ),
    [draft.classLevel],
  );

  const filteredPlans = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return plans;
    return plans.filter((plan) => {
      const subjectLabel = SUBJECT_LABEL_BY_ID.get(plan.subjectId) ?? plan.subjectId;
      const periodLabel = PERIOD_LABEL_BY_ID.get(plan.period) ?? plan.period;
      return (
        plan.title.toLowerCase().includes(query) ||
        subjectLabel.toLowerCase().includes(query) ||
        periodLabel.toLowerCase().includes(query)
      );
    });
  }, [plans, search]);

  function updateDraft<K extends keyof TeacherLessonPlan>(
    key: K,
    value: TeacherLessonPlan[K],
  ) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function updatePhase(phaseId: string, patch: Partial<TeacherLessonPhase>) {
    setDraft((prev) => ({
      ...prev,
      phases: prev.phases.map((phase) =>
        phase.id === phaseId ? { ...phase, ...patch } : phase,
      ),
    }));
  }

  function loadPlanIntoForm(plan: TeacherLessonPlan) {
    setDraft(plan);
    setSavedMessage(null);
  }

  function startNewPlan() {
    setDraft(createEmptyLessonPlan());
    setSavedMessage(null);
  }

  function savePlan() {
    if (!draft.title.trim()) {
      setSavedMessage("Ajoutez un titre de séance avant d'enregistrer.");
      return;
    }
    const now = new Date().toISOString();
    setPlans((prev) => {
      const exists = prev.some((plan) => plan.id === draft.id);
      const saved: TeacherLessonPlan = { ...draft, updatedAt: now };
      if (exists) {
        return prev.map((plan) => (plan.id === draft.id ? saved : plan));
      }
      return [...prev, { ...saved, createdAt: now }];
    });
    setDraft((prev) => ({ ...prev, updatedAt: now }));
    setSavedMessage("Séance enregistrée sur cet appareil.");
  }

  function duplicatePlan(plan: TeacherLessonPlan) {
    const now = new Date().toISOString();
    const duplicated: TeacherLessonPlan = {
      ...plan,
      id: `seance-${Math.random().toString(36).slice(2, 10)}`,
      title: `${plan.title} (copie)`,
      createdAt: now,
      updatedAt: now,
    };
    setPlans((prev) => [...prev, duplicated]);
  }

  function confirmDelete(id: string) {
    setPlans((prev) => prev.filter((plan) => plan.id !== id));
    setPendingDeleteId(null);
    if (draft.id === id) {
      startNewPlan();
    }
  }

  return (
    <div className="mt-10 space-y-10">
      <section aria-labelledby="contexte-seance">
        <h2 id="contexte-seance" className="text-xl font-black text-foreground">
          1. Contexte de la séance
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Niveau
            <select
              value={draft.classLevel}
              onChange={(event) =>
                updateDraft("classLevel", event.target.value as TeacherLessonLevel)
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {TEACHER_LESSON_LEVELS.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Matière
            <select
              value={draft.subjectId}
              onChange={(event) => updateDraft("subjectId", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {TEACHER_LESSON_SUBJECTS.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Période
            <select
              value={draft.period}
              onChange={(event) =>
                updateDraft("period", event.target.value as TeacherLessonPeriod)
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {TEACHER_LESSON_PERIODS.map((period) => (
                <option key={period.id} value={period.id}>
                  {period.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Semaine
            <input
              type="number"
              min={1}
              max={36}
              value={draft.week ?? ""}
              onChange={(event) =>
                updateDraft(
                  "week",
                  event.target.value === "" ? null : Number(event.target.value),
                )
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Date (facultative)
            <input
              type="date"
              value={draft.date ?? ""}
              onChange={(event) =>
                updateDraft("date", event.target.value || null)
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Durée totale (minutes)
            <input
              type="number"
              min={0}
              value={draft.durationMinutes}
              onChange={(event) =>
                updateDraft("durationMinutes", Number(event.target.value))
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2 lg:col-span-3">
            Titre de séance
            <input
              type="text"
              value={draft.title}
              onChange={(event) => updateDraft("title", event.target.value)}
              placeholder="Ex : Découvrir l'imparfait des verbes du 1er groupe"
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
        </div>
      </section>

      <section aria-labelledby="lien-pedagogique">
        <h2 id="lien-pedagogique" className="text-xl font-black text-foreground">
          2. Lien pédagogique
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Domaine
            <input
              type="text"
              value={draft.domain}
              onChange={(event) => updateDraft("domain", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Compétence
            <input
              type="text"
              value={draft.competency}
              onChange={(event) => updateDraft("competency", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Objectif d&apos;apprentissage
            <textarea
              value={draft.objective}
              onChange={(event) => updateDraft("objective", event.target.value)}
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Critère simple de réussite
            <textarea
              value={draft.successCriteria}
              onChange={(event) =>
                updateDraft("successCriteria", event.target.value)
              }
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Lien vers une compétence de la programmation (facultatif)
            <select
              value={draft.linkedProgrammationId ?? ""}
              onChange={(event) =>
                updateDraft(
                  "linkedProgrammationId",
                  event.target.value === "" ? null : event.target.value,
                )
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              <option value="">Aucun lien</option>
              {linkableProgrammationItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title} — {item.skill}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section aria-labelledby="deroule-seance">
        <h2 id="deroule-seance" className="text-xl font-black text-foreground">
          3. Déroulé de séance
        </h2>
        <ol className="mt-4 space-y-4" role="list">
          {draft.phases.map((phase, index) => (
            <li
              key={phase.id}
              className="rounded-lg border border-white/10 bg-background/45 p-4"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                Étape {index + 1}
              </p>
              <h3 className="mt-1 text-base font-black text-foreground">
                {phase.label}
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                  Durée (minutes)
                  <input
                    type="number"
                    min={0}
                    value={phase.durationMinutes}
                    onChange={(event) =>
                      updatePhase(phase.id, {
                        durationMinutes: Number(event.target.value),
                      })
                    }
                    className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                  Modalité
                  <select
                    value={phase.grouping}
                    onChange={(event) =>
                      updatePhase(phase.id, {
                        grouping: event.target.value as TeacherLessonGrouping,
                      })
                    }
                    className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                  >
                    {TEACHER_LESSON_GROUPINGS.map((grouping) => (
                      <option key={grouping.id} value={grouping.id}>
                        {grouping.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
                  Consigne courte
                  <textarea
                    value={phase.instruction}
                    onChange={(event) =>
                      updatePhase(phase.id, { instruction: event.target.value })
                    }
                    rows={2}
                    className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
                  Matériel
                  <input
                    type="text"
                    value={phase.materials}
                    onChange={(event) =>
                      updatePhase(phase.id, { materials: event.target.value })
                    }
                    className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                  />
                </label>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="differenciation">
        <h2 id="differenciation" className="text-xl font-black text-foreground">
          4. Différenciation
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Guidage fort
            <textarea
              value={draft.differentiation.strongGuidance}
              onChange={(event) =>
                updateDraft("differentiation", {
                  ...draft.differentiation,
                  strongGuidance: event.target.value,
                })
              }
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Guidage intermédiaire
            <textarea
              value={draft.differentiation.intermediateGuidance}
              onChange={(event) =>
                updateDraft("differentiation", {
                  ...draft.differentiation,
                  intermediateGuidance: event.target.value,
                })
              }
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Autonomie
            <textarea
              value={draft.differentiation.autonomy}
              onChange={(event) =>
                updateDraft("differentiation", {
                  ...draft.differentiation,
                  autonomy: event.target.value,
                })
              }
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Champ libre (facultatif)
            <textarea
              value={draft.differentiation.freeField}
              onChange={(event) =>
                updateDraft("differentiation", {
                  ...draft.differentiation,
                  freeField: event.target.value,
                })
              }
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
        </div>
      </section>

      <section aria-labelledby="apres-seance">
        <h2 id="apres-seance" className="text-xl font-black text-foreground">
          5. Après la séance
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Ce qui a fonctionné
            <textarea
              value={draft.reviewNotes.whatWorked}
              onChange={(event) =>
                updateDraft("reviewNotes", {
                  ...draft.reviewNotes,
                  whatWorked: event.target.value,
                })
              }
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            À reprendre
            <textarea
              value={draft.reviewNotes.toResume}
              onChange={(event) =>
                updateDraft("reviewNotes", {
                  ...draft.reviewNotes,
                  toResume: event.target.value,
                })
              }
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Élèves ou groupes à accompagner
            <textarea
              value={draft.reviewNotes.studentsToSupport}
              onChange={(event) =>
                updateDraft("reviewNotes", {
                  ...draft.reviewNotes,
                  studentsToSupport: event.target.value,
                })
              }
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Prochaine étape
            <textarea
              value={draft.reviewNotes.nextStep}
              onChange={(event) =>
                updateDraft("reviewNotes", {
                  ...draft.reviewNotes,
                  nextStep: event.target.value,
                })
              }
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
        </div>
      </section>

      <section aria-labelledby="gestion-locale" className="print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="gestion-locale" className="text-xl font-black text-foreground">
            6. Gestion locale
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={startNewPlan}
              className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/40"
            >
              Nouvelle séance
            </button>
            <button
              type="button"
              onClick={savePlan}
              className="min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25"
            >
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-sky/40"
            >
              Imprimer
            </button>
          </div>
        </div>
        {savedMessage ? (
          <p className="mt-3 text-sm font-bold text-jade" role="status">
            {savedMessage}
          </p>
        ) : null}

        <div className="mt-6">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:max-w-sm">
            Rechercher par titre, matière ou période
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ex : imparfait, mathématiques, P2"
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
        </div>

        {filteredPlans.length === 0 ? (
          <p className="mt-4 text-sm leading-7 text-muted">
            Aucune séance enregistrée pour le moment.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2" role="list">
            {filteredPlans.map((plan) => (
              <li
                key={plan.id}
                className="flex flex-col gap-3 rounded-lg border border-white/10 bg-background/45 p-4"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                    {plan.classLevel} ·{" "}
                    {SUBJECT_LABEL_BY_ID.get(plan.subjectId) ?? plan.subjectId} ·{" "}
                    {PERIOD_LABEL_BY_ID.get(plan.period) ?? plan.period}
                  </p>
                  <h3 className="mt-1 text-base font-black text-foreground">
                    {plan.title || "Sans titre"}
                  </h3>
                  {plan.objective ? (
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {plan.objective}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => loadPlanIntoForm(plan)}
                    className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/40"
                  >
                    Ouvrir
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicatePlan(plan)}
                    className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-sky/40"
                  >
                    Dupliquer
                  </button>
                  {pendingDeleteId === plan.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => confirmDelete(plan.id)}
                        className="min-h-11 rounded-md border border-ember/60 bg-ember/15 px-3 text-sm font-bold text-ember transition hover:bg-ember/25"
                      >
                        Confirmer la suppression
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDeleteId(null)}
                        className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition"
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPendingDeleteId(plan.id)}
                      className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
