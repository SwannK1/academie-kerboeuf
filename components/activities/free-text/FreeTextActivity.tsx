"use client";

import { useState } from "react";
import type {
  ActivityRendererProps,
  FreeTextActivityData,
} from "@/lib/activity-registry/types";

type Props = ActivityRendererProps<FreeTextActivityData>;

export function FreeTextActivity({ activity, surface, showCorrection, onAnswer }: Props) {
  if (surface === "print") return <FreeTextPrint activity={activity} />;
  if (surface === "projection") return <FreeTextProjection activity={activity} />;
  if (surface === "reading") {
    return <FreeTextReading activity={activity} showCorrection={showCorrection ?? false} />;
  }
  return (
    <FreeTextInteractive
      activity={activity}
      showCorrection={showCorrection ?? false}
      onAnswer={onAnswer}
    />
  );
}

// ── Rendu interactif ─────────────────────────────────────────────────────────
function FreeTextInteractive({
  activity,
  showCorrection,
  onAnswer,
}: {
  activity: FreeTextActivityData;
  showCorrection: boolean;
  onAnswer?: (answer: string) => void;
}) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (!value.trim()) return;
    setSubmitted(true);
    onAnswer?.(value);
  }

  return (
    <div className="space-y-4">
      <p className="text-base font-medium leading-7 text-foreground">
        {activity.prompt}
      </p>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={submitted}
        placeholder={activity.placeholder ?? "Écris ta réponse ici…"}
        maxLength={activity.maxLength}
        rows={4}
        className="w-full rounded border border-white/15 bg-white/[0.035] p-3 text-sm leading-6 text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-jade/40 disabled:cursor-not-allowed disabled:opacity-60 resize-y"
        aria-label="Zone de réponse"
      />

      {activity.maxLength && (
        <p className="text-right text-xs text-muted" aria-live="polite">
          {value.length} / {activity.maxLength}
        </p>
      )}

      {!submitted && (
        <button
          type="button"
          disabled={!value.trim()}
          onClick={handleSubmit}
          className="rounded border border-jade/35 bg-jade/10 px-4 py-2 text-sm font-bold text-jade transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-jade/20"
        >
          Soumettre
        </button>
      )}

      {submitted && activity.expectedAnswer && showCorrection && (
        <div className="rounded border border-gold/25 bg-gold/10 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
            Réponse de référence
          </p>
          <p className="mt-2 text-sm leading-7 text-foreground">
            {activity.expectedAnswer}
          </p>
        </div>
      )}

      {submitted && !showCorrection && (
        <p role="alert" className="rounded border border-jade/25 bg-jade/10 p-3 text-sm text-jade">
          Réponse enregistrée.
        </p>
      )}
    </div>
  );
}

// ── Rendu lecture ────────────────────────────────────────────────────────────
function FreeTextReading({
  activity,
  showCorrection,
}: {
  activity: FreeTextActivityData;
  showCorrection: boolean;
}) {
  return (
    <div className="space-y-3">
      <p className="text-base font-medium leading-7 text-foreground">
        {activity.prompt}
      </p>
      {showCorrection && activity.expectedAnswer ? (
        <div className="rounded border border-gold/25 bg-gold/10 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
            Réponse de référence
          </p>
          <p className="mt-2 text-sm leading-7 text-foreground">
            {activity.expectedAnswer}
          </p>
        </div>
      ) : (
        <div className="rounded border border-white/10 bg-white/[0.035] p-4 text-sm text-muted italic">
          Réponse libre.
        </div>
      )}
    </div>
  );
}

// ── Rendu impression ─────────────────────────────────────────────────────────
function FreeTextPrint({ activity }: { activity: FreeTextActivityData }) {
  const lineCount = Math.max(4, Math.ceil((activity.maxLength ?? 200) / 60));

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium leading-6 text-foreground">
        {activity.prompt}
      </p>
      <div
        aria-hidden="true"
        style={{ display: "grid", gap: "10px", paddingTop: "4px" }}
      >
        {Array.from({ length: lineCount }).map((_, i) => (
          <div
            key={i}
            style={{
              borderBottom: "1px solid rgba(0,0,0,0.3)",
              height: "24px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Rendu projection ─────────────────────────────────────────────────────────
function FreeTextProjection({ activity }: { activity: FreeTextActivityData }) {
  return (
    <div className="space-y-4">
      <p className="text-2xl font-bold leading-snug text-foreground sm:text-3xl">
        {activity.prompt}
      </p>
      <div className="rounded-md border-2 border-dashed border-white/20 p-6 text-center text-muted">
        Zone de réponse des élèves
      </div>
    </div>
  );
}
