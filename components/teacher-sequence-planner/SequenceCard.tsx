"use client";

import {
  getTeacherSequenceLevelLabel,
  getTeacherSequenceStatusLabel,
  getTeacherSequenceStepKindLabel,
  type TeacherSequence,
} from "@/content/teacher-sequence-planner";

type SequenceCardProps = {
  sequence: TeacherSequence;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onPrint: () => void;
};

export function SequenceCard({
  sequence,
  onEdit,
  onDuplicate,
  onDelete,
  onPrint,
}: SequenceCardProps) {
  const checklistDoneCount = sequence.checklist.filter(
    (item) => item.done,
  ).length;

  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-foreground">
            {sequence.title}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {[
              getTeacherSequenceLevelLabel(sequence.levelId),
              sequence.subject,
              sequence.domain,
              sequence.period,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <span className="rounded-md border border-jade/30 bg-jade/[0.08] px-3 py-1 text-xs font-bold text-jade">
          {getTeacherSequenceStatusLabel(sequence.statusId)}
        </span>
      </div>

      <p className="mt-3 text-sm font-bold text-foreground">
        Compétence : <span className="font-normal text-muted">{sequence.competency}</span>
      </p>

      {sequence.objective ? (
        <p className="mt-1 text-sm text-muted">Objectif : {sequence.objective}</p>
      ) : null}

      {sequence.duration ? (
        <p className="mt-1 text-sm text-muted">Durée : {sequence.duration}</p>
      ) : null}

      {sequence.material ? (
        <p className="mt-1 text-sm text-muted">Matériel : {sequence.material}</p>
      ) : null}

      {sequence.note ? (
        <p className="mt-1 text-sm text-muted">Note : {sequence.note}</p>
      ) : null}

      {sequence.steps.length > 0 ? (
        <div className="mt-4">
          <p className="text-sm font-bold text-foreground">Étapes</p>
          <ul className="mt-1 grid gap-1" role="list">
            {sequence.steps.map((step) => (
              <li key={step.id} className="text-sm text-muted">
                <span className="font-bold text-foreground">
                  {getTeacherSequenceStepKindLabel(step.kind)}
                </span>{" "}
                — {step.description}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {sequence.checklist.length > 0 ? (
        <p className="mt-4 text-sm text-muted">
          Checklist : {checklistDoneCount}/{sequence.checklist.length} faite(s)
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2 print:hidden">
        <button
          type="button"
          onClick={onEdit}
          className="min-h-9 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground hover:border-jade/40"
        >
          Modifier
        </button>
        <button
          type="button"
          onClick={onDuplicate}
          className="min-h-9 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground hover:border-jade/40"
        >
          Dupliquer
        </button>
        <button
          type="button"
          onClick={onPrint}
          className="min-h-9 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground hover:border-jade/40"
        >
          Imprimer
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="min-h-9 rounded-md border border-white/15 px-3 text-xs font-bold text-muted hover:border-ember/40 hover:text-ember"
        >
          Supprimer
        </button>
      </div>
    </article>
  );
}
