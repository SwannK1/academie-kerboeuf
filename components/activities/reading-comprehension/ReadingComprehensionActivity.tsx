"use client";

import { useState } from "react";
import type {
  ActivityRendererProps,
  ReadingComprehensionActivityData,
  ReadingQuestion,
  ReadingQuestionLevel,
} from "@/lib/activity-registry/types";

type Props = ActivityRendererProps<ReadingComprehensionActivityData>;

const levelLabels: Record<ReadingQuestionLevel, string> = {
  indice: "Indice",
  raisonnement: "Raisonnement",
  justification: "Justification",
  "interprétation": "Interprétation",
  "synthèse": "Synthèse",
};

export function ReadingComprehensionActivity({
  activity,
  surface,
  showCorrection,
  onAnswer,
}: Props) {
  if (surface === "print") return <ReadingPrint activity={activity} />;
  if (surface === "projection") return <ReadingProjection activity={activity} />;
  if (surface === "reading") {
    return <ReadingReading activity={activity} showCorrection={showCorrection ?? false} />;
  }
  return (
    <ReadingInteractive
      activity={activity}
      showCorrection={showCorrection ?? false}
      onAnswer={onAnswer}
    />
  );
}

// ── Rendu interactif ─────────────────────────────────────────────────────────
function ReadingInteractive({
  activity,
  showCorrection,
  onAnswer,
}: {
  activity: ReadingComprehensionActivityData;
  showCorrection: boolean;
  onAnswer?: (answer: string) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(questionId: string, value: string) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleSubmit() {
    setSubmitted(true);
    onAnswer?.(JSON.stringify(answers));
  }

  return (
    <div className="space-y-6">
      {/* Texte support */}
      <div className="rounded-md border border-white/10 bg-white/[0.035] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
          Texte support
        </p>
        <p className="mt-3 text-sm leading-8 text-foreground">{activity.text}</p>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
          Questions
        </p>
        {activity.questions.map((question, index) => (
          <QuestionItem
            key={question.id}
            question={question}
            index={index}
            value={answers[question.id] ?? ""}
            submitted={submitted}
            showCorrection={showCorrection}
            onChange={(v) => handleChange(question.id, v)}
          />
        ))}
      </div>

      {!submitted && (
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded border border-jade/35 bg-jade/10 px-4 py-2 text-sm font-bold text-jade transition hover:bg-jade/20"
        >
          Soumettre toutes les réponses
        </button>
      )}

      {submitted && (
        <p role="alert" className="rounded border border-jade/25 bg-jade/10 p-3 text-sm text-jade">
          Réponses enregistrées.
        </p>
      )}
    </div>
  );
}

function QuestionItem({
  question,
  index,
  value,
  submitted,
  showCorrection,
  onChange,
}: {
  question: ReadingQuestion;
  index: number;
  value: string;
  submitted: boolean;
  showCorrection: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded bg-jade/10 font-mono text-xs font-black text-jade">
          {index + 1}
        </span>
        <div className="flex-1 space-y-2">
          {question.level && (
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              {levelLabels[question.level]}
            </span>
          )}
          <p className="text-sm leading-7 text-foreground">{question.prompt}</p>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={submitted}
            rows={3}
            placeholder="Ta réponse…"
            className="w-full rounded border border-white/15 bg-white/[0.03] p-2 text-sm leading-6 text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-jade/40 disabled:cursor-not-allowed disabled:opacity-60 resize-y"
            aria-label={`Réponse à la question ${index + 1}`}
          />
          {(submitted || showCorrection) && question.expectedAnswer && (
            <div className="rounded border border-gold/20 bg-gold/10 p-3">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
                Réponse attendue
              </p>
              <p className="mt-1 text-sm leading-6 text-muted">
                {question.expectedAnswer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Rendu lecture ────────────────────────────────────────────────────────────
function ReadingReading({
  activity,
  showCorrection,
}: {
  activity: ReadingComprehensionActivityData;
  showCorrection: boolean;
}) {
  return (
    <div className="space-y-5">
      <div className="rounded-md border border-white/10 bg-white/[0.035] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
          Texte support
        </p>
        <p className="mt-3 text-sm leading-8 text-foreground">{activity.text}</p>
      </div>

      <div className="space-y-3">
        {activity.questions.map((question, index) => (
          <div key={question.id} className="rounded border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-start gap-3">
              <span className="grid size-5 shrink-0 place-items-center rounded bg-jade/10 font-mono text-xs font-black text-jade">
                {index + 1}
              </span>
              <div className="space-y-2">
                {question.level && (
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                    {levelLabels[question.level]}
                  </span>
                )}
                <p className="text-sm leading-7 text-foreground">{question.prompt}</p>
                {showCorrection && question.expectedAnswer && (
                  <p className="rounded border border-gold/20 bg-gold/10 p-3 text-sm leading-6 text-muted">
                    {question.expectedAnswer}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Rendu impression ─────────────────────────────────────────────────────────
function ReadingPrint({ activity }: { activity: ReadingComprehensionActivityData }) {
  return (
    <div className="space-y-5">
      <div className="space-y-2 rounded border border-black/15 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em]">Texte support</p>
        <p className="text-sm leading-7">{activity.text}</p>
      </div>

      <ol className="space-y-5">
        {activity.questions.map((question, index) => (
          <li key={question.id} className="space-y-2">
            <p className="text-sm font-medium leading-6">
              <span className="font-bold">{index + 1}. </span>
              {question.prompt}
            </p>
            {/* Lignes de réponse pour l'impression */}
            {Array.from({ length: 4 }).map((_, lineIndex) => (
              <div
                key={lineIndex}
                style={{ borderBottom: "1px solid rgba(0,0,0,0.25)", height: "24px" }}
                aria-hidden="true"
              />
            ))}
          </li>
        ))}
      </ol>
    </div>
  );
}

// ── Rendu projection ─────────────────────────────────────────────────────────
// Texte + questions en grand, sans zone de saisie — l'enseignant fait répondre à l'oral.
function ReadingProjection({ activity }: { activity: ReadingComprehensionActivityData }) {
  return (
    <div className="space-y-6">
      <div className="rounded-md border border-white/15 bg-white/[0.04] p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
          Texte
        </p>
        <p className="mt-3 text-base leading-9 text-foreground sm:text-lg">
          {activity.text}
        </p>
      </div>

      <div className="space-y-4">
        {activity.questions.map((question, index) => (
          <div
            key={question.id}
            className="flex items-start gap-4 rounded border border-white/10 bg-white/[0.035] p-4"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-jade/10 font-mono text-sm font-bold text-jade">
              {index + 1}
            </span>
            <div>
              {question.level && (
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  {levelLabels[question.level]}
                </p>
              )}
              <p className="mt-1 text-lg font-medium leading-7 text-foreground sm:text-xl">
                {question.prompt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
