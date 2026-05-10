import type { MissionDifferentiation } from "@/content/felix-types";

type DifferentiationPanelProps = {
  differentiation: MissionDifferentiation;
};

const tiers = [
  {
    key: "guidance" as const,
    label: "Guidage fort",
    color: "border-ember/30 bg-ember/10 text-ember",
    dot: "bg-ember",
  },
  {
    key: "medium" as const,
    label: "Guidage intermédiaire",
    color: "border-gold/30 bg-gold/10 text-gold",
    dot: "bg-gold",
  },
  {
    key: "autonomy" as const,
    label: "Autonomie",
    color: "border-jade/30 bg-jade/10 text-jade",
    dot: "bg-jade",
  },
];

export function DifferentiationPanel({ differentiation }: DifferentiationPanelProps) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky">
        Différenciation
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {tiers.map((tier) => {
          const data = differentiation[tier.key];
          return (
            <div
              key={tier.key}
              className="rounded border border-white/10 bg-ink/35 p-4"
            >
              <span
                className={`inline-flex rounded border px-2 py-0.5 text-xs font-bold uppercase tracking-[0.12em] ${tier.color}`}
              >
                {tier.label}
              </span>
              <p className="mt-3 text-xs leading-6 text-muted">{data.description}</p>
              <ul className="mt-3 space-y-1" aria-label={`Supports — ${tier.label}`}>
                {data.supports.map((support) => (
                  <li key={support} className="flex items-start gap-2 text-xs text-muted">
                    <span
                      className={`mt-1.5 size-1 shrink-0 rounded-full ${tier.dot}`}
                      aria-hidden="true"
                    />
                    {support}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
