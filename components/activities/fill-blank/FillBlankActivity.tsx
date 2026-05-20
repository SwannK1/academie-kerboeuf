"use client";

import { useState } from "react";
import type {
  ActivityRendererProps,
  FillBlankActivityData,
  FillBlankEntry,
} from "@/lib/activity-registry/types";

type Props = ActivityRendererProps<FillBlankActivityData>;

// ── Parsing du template ──────────────────────────────────────────────────────
// Le template utilise {{blank:id}} pour marquer les trous.
// Exemple : "Le verbe {{blank:verbe}} s'accorde avec le {{blank:sujet}}."
type TemplatePart =
  | { kind: "text"; content: string }
  | { kind: "blank"; blankId: string };

function parseTemplate(template: string): TemplatePart[] {
  const parts: TemplatePart[] = [];
  const regex = /\{\{blank:([^}]+)\}\}/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(template)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ kind: "text", content: template.slice(lastIndex, match.index) });
    }
    parts.push({ kind: "blank", blankId: match[1] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < template.length) {
    parts.push({ kind: "text", content: template.slice(lastIndex) });
  }

  return parts;
}

function getBlankById(blanks: readonly FillBlankEntry[], id: string): FillBlankEntry | undefined {
  return blanks.find((b) => b.id === id);
}

export function FillBlankActivity({ activity, surface, showCorrection, onAnswer }: Props) {
  if (surface === "print") return <FillBlankPrint activity={activity} />;
  if (surface === "projection") return <FillBlankProjection activity={activity} />;
  if (surface === "reading") {
    return <FillBlankReading activity={activity} showCorrection={showCorrection ?? false} />;
  }
  return (
    <FillBlankInteractive
      activity={activity}
      showCorrection={showCorrection ?? false}
      onAnswer={onAnswer}
    />
  );
}

// ── Rendu interactif ─────────────────────────────────────────────────────────
function FillBlankInteractive({
  activity,
  showCorrection,
  onAnswer,
}: {
  activity: FillBlankActivityData;
  showCorrection: boolean;
  onAnswer?: (answer: string) => void;
}) {
  const parts = parseTemplate(activity.template);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(blankId: string, value: string) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [blankId]: value }));
  }

  function handleSubmit() {
    const allFilled = activity.blanks.every((b) => answers[b.id]?.trim());
    if (!allFilled) return;
    setSubmitted(true);
    onAnswer?.(JSON.stringify(answers));
  }

  function getResultClass(blankId: string): string {
    if (!submitted && !showCorrection) return "";
    const blank = getBlankById(activity.blanks, blankId);
    if (!blank) return "";
    const isCorrect = blank.acceptedAnswers.some(
      (a) => a.toLowerCase() === (answers[blankId] ?? "").toLowerCase().trim(),
    );
    return isCorrect ? "border-jade/50 bg-jade/10 text-jade" : "border-ember/50 bg-ember/10 text-ember";
  }

  return (
    <div className="space-y-4">
      <p className="flex flex-wrap items-baseline gap-1 text-sm leading-8 text-foreground">
        {parts.map((part, i) => {
          if (part.kind === "text") {
            return <span key={i}>{part.content}</span>;
          }
          const blank = getBlankById(activity.blanks, part.blankId);
          const resultClass = getResultClass(part.blankId);
          return (
            <input
              key={i}
              type="text"
              value={answers[part.blankId] ?? ""}
              onChange={(e) => handleChange(part.blankId, e.target.value)}
              disabled={submitted}
              aria-label={blank?.hint ?? `Trou ${part.blankId}`}
              className={`inline-block rounded border px-2 py-0.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-jade/40 disabled:cursor-not-allowed ${resultClass || "border-white/25 bg-white/[0.035]"}`}
              style={{ width: "8rem" }}
            />
          );
        })}
      </p>

      {activity.blanks.some((b) => b.hint) && !submitted && (
        <ul className="space-y-1">
          {activity.blanks
            .filter((b) => b.hint)
            .map((b) => (
              <li key={b.id} className="text-xs text-muted">
                <span className="font-bold text-gold">Aide : </span>
                {b.hint}
              </li>
            ))}
        </ul>
      )}

      {!submitted && (
        <button
          type="button"
          disabled={!activity.blanks.every((b) => answers[b.id]?.trim())}
          onClick={handleSubmit}
          className="rounded border border-jade/35 bg-jade/10 px-4 py-2 text-sm font-bold text-jade transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-jade/20"
        >
          Valider
        </button>
      )}

      {(submitted || showCorrection) && (
        <div className="rounded border border-gold/25 bg-gold/10 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
            Réponses attendues
          </p>
          <ul className="mt-2 space-y-1">
            {activity.blanks.map((b) => (
              <li key={b.id} className="text-sm text-muted">
                <span className="font-bold text-foreground">{b.id} : </span>
                {b.acceptedAnswers.join(" / ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Rendu lecture ────────────────────────────────────────────────────────────
function FillBlankReading({
  activity,
  showCorrection,
}: {
  activity: FillBlankActivityData;
  showCorrection: boolean;
}) {
  const parts = parseTemplate(activity.template);

  return (
    <p className="flex flex-wrap items-baseline gap-1 text-sm leading-8 text-foreground">
      {parts.map((part, i) => {
        if (part.kind === "text") {
          return <span key={i}>{part.content}</span>;
        }
        const blank = getBlankById(activity.blanks, part.blankId);
        const answer = blank?.acceptedAnswers[0] ?? "…";
        return showCorrection ? (
          <span
            key={i}
            className="rounded border border-jade/35 bg-jade/10 px-2 py-0.5 font-bold text-jade"
          >
            {answer}
          </span>
        ) : (
          <span
            key={i}
            className="inline-block border-b border-black/40 px-2"
            style={{ minWidth: "6rem" }}
            aria-label="Trou à compléter"
          >
            &nbsp;
          </span>
        );
      })}
    </p>
  );
}

// ── Rendu impression ─────────────────────────────────────────────────────────
function FillBlankPrint({ activity }: { activity: FillBlankActivityData }) {
  const parts = parseTemplate(activity.template);

  return (
    <p className="flex flex-wrap items-baseline gap-1 text-sm leading-8 text-foreground">
      {parts.map((part, i) => {
        if (part.kind === "text") {
          return <span key={i}>{part.content}</span>;
        }
        return (
          <span
            key={i}
            className="inline-block border-b border-black/50 px-1"
            style={{ minWidth: "7rem" }}
            aria-label="Trou à remplir"
          >
            &nbsp;
          </span>
        );
      })}
    </p>
  );
}

// ── Rendu projection ─────────────────────────────────────────────────────────
function FillBlankProjection({ activity }: { activity: FillBlankActivityData }) {
  const parts = parseTemplate(activity.template);

  return (
    <p className="flex flex-wrap items-baseline gap-2 text-xl font-medium leading-10 text-foreground sm:text-2xl">
      {parts.map((part, i) => {
        if (part.kind === "text") {
          return <span key={i}>{part.content}</span>;
        }
        return (
          <span
            key={i}
            className="inline-block rounded border-2 border-dashed border-white/30 px-4 py-1 text-center text-muted"
            style={{ minWidth: "8rem" }}
            aria-label="Trou à compléter"
          >
            ___
          </span>
        );
      })}
    </p>
  );
}
