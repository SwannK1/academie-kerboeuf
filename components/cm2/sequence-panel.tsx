import type { SequenceStep } from "@/content/felix-types";

type Props = {
  sequence?: SequenceStep[];
};

const typeConfig: Record<
  SequenceStep["type"],
  { label: string; color: string }
> = {
  découverte: { label: "Découverte", color: "border-sky/30 bg-sky/10 text-sky" },
  entraînement: { label: "Entraînement", color: "border-jade/30 bg-jade/10 text-jade" },
  évaluation: { label: "Évaluation", color: "border-gold/30 bg-gold/10 text-gold" },
  restitution: { label: "Restitution", color: "border-ember/30 bg-ember/10 text-ember" },
};

export function SequencePanel({ sequence }: Props) {
  if (!sequence || sequence.length === 0) return null;

  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-baseline gap-3">
        <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
          Séquence de séances
        </h2>
        <span className="text-xs font-bold text-foreground">
          {sequence.length} séance{sequence.length > 1 ? "s" : ""}
        </span>
      </div>

      <ol className="mt-4 space-y-3">
        {sequence.map((step) => {
          const config = typeConfig[step.type] ?? {
            label: step.type,
            color: "border-white/15 bg-white/[0.04] text-muted",
          };
          return (
            <li
              key={step.order}
              className="grid gap-3 rounded border border-white/10 bg-ink/30 p-4 sm:grid-cols-[auto_1fr]"
            >
              <span className="grid size-10 place-items-center rounded bg-white/[0.06] font-mono text-sm font-black text-foreground">
                {String(step.order).padStart(2, "0")}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-foreground">
                    {step.title}
                  </h3>
                  <span
                    className={`rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${config.color}`}
                  >
                    {config.label}
                  </span>
                  <span className="text-xs font-bold text-muted">
                    {step.duration}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-6 text-muted">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
