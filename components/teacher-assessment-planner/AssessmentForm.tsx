"use client";

import { useState } from "react";
import {
  assessmentLevels,
  assessmentPeriods,
  assessmentStatuses,
  assessmentSubjects,
  createEmptyChecklist,
  type Assessment,
  type AssessmentLevel,
  type AssessmentPeriod,
  type AssessmentStatus,
  type AssessmentSubject,
} from "@/content/teacher-assessment-planner";

type FormValues = {
  title: string;
  level: AssessmentLevel | "";
  subject: AssessmentSubject;
  skill: string;
  period: AssessmentPeriod;
  date: string;
  durationLabel: string;
  materials: string;
  preparationNotes: string;
  status: AssessmentStatus;
};

const EMPTY_VALUES: FormValues = {
  title: "",
  level: "",
  subject: "francais",
  skill: "",
  period: "periode-1",
  date: "",
  durationLabel: "",
  materials: "",
  preparationNotes: "",
  status: "a-preparer",
};

function assessmentToValues(assessment: Assessment): FormValues {
  return {
    title: assessment.title,
    level: assessment.level ?? "",
    subject: assessment.subject,
    skill: assessment.skill,
    period: assessment.period,
    date: assessment.date ?? "",
    durationLabel: assessment.durationLabel,
    materials: assessment.materials,
    preparationNotes: assessment.preparationNotes,
    status: assessment.status,
  };
}

export function AssessmentForm({
  editingAssessment,
  onSubmit,
  onCancel,
}: {
  editingAssessment: Assessment | null;
  onSubmit: (assessment: Assessment) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<FormValues>(() =>
    editingAssessment ? assessmentToValues(editingAssessment) : EMPTY_VALUES,
  );

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!values.title.trim() || !values.skill.trim() || !values.durationLabel.trim()) {
      return;
    }

    const now = new Date().toISOString();

    const assessment: Assessment = {
      id: editingAssessment?.id ?? `evaluation-${crypto.randomUUID()}`,
      title: values.title.trim(),
      level: values.level || undefined,
      subject: values.subject,
      skill: values.skill.trim(),
      period: values.period,
      date: values.date || undefined,
      durationLabel: values.durationLabel.trim(),
      materials: values.materials.trim(),
      preparationNotes: values.preparationNotes.trim(),
      status: values.status,
      checklist: editingAssessment?.checklist ?? createEmptyChecklist(),
      createdAt: editingAssessment?.createdAt ?? now,
      updatedAt: now,
    };

    onSubmit(assessment);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-jade/25 bg-jade/[0.05] p-5 sm:p-6"
    >
      <h2 className="text-xl font-black text-foreground">
        {editingAssessment ? "Modifier l'évaluation" : "Créer une évaluation"}
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Titre" htmlFor="title">
          <input
            id="title"
            type="text"
            required
            value={values.title}
            onChange={(event) => update("title", event.target.value)}
            className="min-h-11 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
          />
        </Field>

        <Field label="Niveau (facultatif)" htmlFor="level">
          <select
            id="level"
            value={values.level}
            onChange={(event) =>
              update("level", event.target.value as AssessmentLevel | "")
            }
            className="min-h-11 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
          >
            <option value="">—</option>
            {assessmentLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Matière" htmlFor="subject">
          <select
            id="subject"
            value={values.subject}
            onChange={(event) =>
              update("subject", event.target.value as AssessmentSubject)
            }
            className="min-h-11 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
          >
            {assessmentSubjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Compétence ou objectif" htmlFor="skill">
          <input
            id="skill"
            type="text"
            required
            value={values.skill}
            onChange={(event) => update("skill", event.target.value)}
            className="min-h-11 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
          />
        </Field>

        <Field label="Période" htmlFor="period">
          <select
            id="period"
            value={values.period}
            onChange={(event) =>
              update("period", event.target.value as AssessmentPeriod)
            }
            className="min-h-11 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
          >
            {assessmentPeriods.map((period) => (
              <option key={period.id} value={period.id}>
                {period.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Date (facultative)" htmlFor="date">
          <input
            id="date"
            type="date"
            value={values.date}
            onChange={(event) => update("date", event.target.value)}
            className="min-h-11 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
          />
        </Field>

        <Field label="Durée" htmlFor="durationLabel">
          <input
            id="durationLabel"
            type="text"
            required
            placeholder="Ex : 30 min"
            value={values.durationLabel}
            onChange={(event) => update("durationLabel", event.target.value)}
            className="min-h-11 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
          />
        </Field>

        <Field label="Statut" htmlFor="status">
          <select
            id="status"
            value={values.status}
            onChange={(event) =>
              update("status", event.target.value as AssessmentStatus)
            }
            className="min-h-11 w-full rounded-md border border-white/15 bg-background/60 px-3 text-sm text-foreground"
          >
            {assessmentStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Matériel à prévoir" htmlFor="materials" full>
          <textarea
            id="materials"
            rows={2}
            value={values.materials}
            onChange={(event) => update("materials", event.target.value)}
            className="w-full rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm text-foreground"
          />
        </Field>

        <Field label="Consignes de préparation" htmlFor="preparationNotes" full>
          <textarea
            id="preparationNotes"
            rows={3}
            value={values.preparationNotes}
            onChange={(event) => update("preparationNotes", event.target.value)}
            className="w-full rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm text-foreground"
          />
        </Field>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          className="min-h-11 rounded-md border border-jade/50 bg-jade/15 px-5 text-sm font-black text-jade transition hover:bg-jade hover:text-ink"
        >
          {editingAssessment ? "Enregistrer les modifications" : "Créer l'évaluation"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="min-h-11 rounded-md border border-white/15 px-5 text-sm font-bold text-foreground transition hover:border-rose/40 hover:text-rose"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
  full,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label htmlFor={htmlFor} className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
