"use client";

import { useState } from "react";
import type {
  ActivityRendererProps,
  QcmActivityData,
  QcmOption,
} from "@/lib/activity-registry/types";

type Props = ActivityRendererProps<QcmActivityData>;

// ── Dispatcher de surface ────────────────────────────────────────────────────
// Séparer les stratégies de rendu en fonctions distinctes garantit qu'aucune
// logique interactive n'est incluse dans le rendu print/projection, et que
// le rendu print ne contient pas de hooks React.
export function QcmActivity({ activity, surface, showCorrection, onAnswer }: Props) {
  if (surface === "print") return <QcmPrint activity={activity} />;
  if (surface === "projection") return <QcmProjection activity={activity} />;
  if (surface === "reading") {
    return <QcmReading activity={activity} showCorrection={showCorrection ?? false} />;
  }
  return (
    <QcmInteractive
      activity={activity}
      showCorrection={showCorrection ?? false}
      onAnswer={onAnswer}
    />
  );
}

// ── Rendu interactif ─────────────────────────────────────────────────────────
function QcmInteractive({
  activity,
  showCorrection,
  onAnswer,
}: {
  activity: QcmActivityData;
  showCorrection: boolean;
  onAnswer?: (answer: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = submitted && selected === activity.correctOptionId;

  function handleSubmit() {
    if (!selected) return;
    setSubmitted(true);
    onAnswer?.(selected);
  }

  return (
    <div className="space-y-4">
      <p className="text-base font-medium leading-7 text-foreground">
        {activity.question}
      </p>

      <fieldset>
        <legend className="sr-only">Choisissez une réponse</legend>
        <div className="space-y-2">
          {activity.options.map((option) => (
            <QcmOptionItem
              key={option.id}
              option={option}
              selected={selected === option.id}
              submitted={submitted}
              showCorrection={showCorrection}
              correctOptionId={activity.correctOptionId}
              disabled={submitted}
              onChange={() => setSelected(option.id)}
            />
          ))}
        </div>
      </fieldset>

      {!submitted && (
        <button
          type="button"
          disabled={!selected}
          onClick={handleSubmit}
          className="rounded border border-jade/35 bg-jade/10 px-4 py-2 text-sm font-bold text-jade transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-jade/20"
        >
          Valider
        </button>
      )}

      {submitted && (
        <p
          role="alert"
          className={`rounded border p-3 text-sm font-medium ${
            isCorrect
              ? "border-jade/35 bg-jade/10 text-jade"
              : "border-ember/35 bg-ember/10 text-ember"
          }`}
        >
          {isCorrect
            ? (activity.feedbackCorrect ?? "Bonne réponse !")
            : (activity.feedbackIncorrect ?? "Ce n'est pas la bonne réponse.")}
        </p>
      )}

      {activity.hint && !submitted && (
        <p className="text-xs leading-6 text-muted">
          <span className="font-bold text-gold">Indice : </span>
          {activity.hint}
        </p>
      )}
    </div>
  );
}

function QcmOptionItem({
  option,
  selected,
  submitted,
  showCorrection,
  correctOptionId,
  disabled,
  onChange,
}: {
  option: QcmOption;
  selected: boolean;
  submitted: boolean;
  showCorrection: boolean;
  correctOptionId: string;
  disabled: boolean;
  onChange: () => void;
}) {
  const isCorrectOption = option.id === correctOptionId;
  const revealResult = submitted || showCorrection;

  let borderClass = "border-white/15 bg-white/[0.035]";
  if (revealResult && isCorrectOption) {
    borderClass = "border-jade/40 bg-jade/10";
  } else if (revealResult && selected && !isCorrectOption) {
    borderClass = "border-ember/40 bg-ember/10";
  } else if (selected) {
    borderClass = "border-gold/35 bg-gold/10";
  }

  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded border p-3 transition ${borderClass} ${disabled ? "cursor-default" : ""}`}
    >
      <input
        type="radio"
        name="qcm-option"
        value={option.id}
        checked={selected}
        onChange={onChange}
        disabled={disabled}
        className="accent-jade"
        aria-label={option.label}
      />
      <span className="text-sm leading-6 text-foreground">{option.label}</span>
      {revealResult && isCorrectOption && (
        <span className="ml-auto text-jade" aria-label="Réponse correcte">
          ✓
        </span>
      )}
    </label>
  );
}

// ── Rendu lecture / correction ───────────────────────────────────────────────
function QcmReading({
  activity,
  showCorrection,
}: {
  activity: QcmActivityData;
  showCorrection: boolean;
}) {
  return (
    <div className="space-y-3">
      <p className="text-base font-medium leading-7 text-foreground">
        {activity.question}
      </p>
      <ul className="space-y-2">
        {activity.options.map((option) => {
          const isCorrect = option.id === activity.correctOptionId;
          return (
            <li
              key={option.id}
              className={`flex items-center justify-between rounded border p-3 text-sm leading-6 ${
                showCorrection && isCorrect
                  ? "border-jade/35 bg-jade/10 font-bold text-foreground"
                  : "border-white/10 bg-white/[0.035] text-muted"
              }`}
            >
              {option.label}
              {showCorrection && isCorrect && (
                <span className="ml-2 text-jade" aria-label="Bonne réponse">
                  ✓
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ── Rendu impression ─────────────────────────────────────────────────────────
// Pas de couleurs vives. Zone de réponse vierge. Pas de hooks React.
function QcmPrint({ activity }: { activity: QcmActivityData }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium leading-6 text-foreground">
        {activity.question}
      </p>
      <ul className="space-y-2">
        {activity.options.map((option, index) => (
          <li key={option.id} className="flex items-start gap-3 text-sm leading-6 text-foreground">
            <span
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-black/40 font-mono text-xs"
              aria-hidden="true"
            >
              {String.fromCharCode(65 + index)}
            </span>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Rendu projection ─────────────────────────────────────────────────────────
// Texte agrandi, fort contraste, sans éléments d'interaction.
function QcmProjection({ activity }: { activity: QcmActivityData }) {
  return (
    <div className="space-y-6">
      <p className="text-2xl font-bold leading-snug text-foreground sm:text-3xl">
        {activity.question}
      </p>
      <ul className="space-y-3">
        {activity.options.map((option, index) => (
          <li
            key={option.id}
            className="flex items-center gap-4 rounded-md border border-white/15 bg-white/[0.04] p-4 text-lg text-foreground"
          >
            <span
              className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 font-mono text-sm font-bold text-muted"
              aria-hidden="true"
            >
              {String.fromCharCode(65 + index)}
            </span>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
