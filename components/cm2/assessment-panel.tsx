import type { MissionAssessment } from "@/content/felix-types";

type AssessmentPanelProps = {
  assessment: MissionAssessment;
  successCriteria: string[];
  restitution: { family: string; teacher: string };
};

const typeLabel: Record<string, { label: string; color: string }> = {
  formative: { label: "Évaluation formative", color: "border-jade/30 bg-jade/10 text-jade" },
  sommative: { label: "Évaluation sommative", color: "border-gold/30 bg-gold/10 text-gold" },
  "auto-évaluation": { label: "Auto-évaluation", color: "border-sky/30 bg-sky/10 text-sky" },
  "co-évaluation": { label: "Co-évaluation", color: "border-ember/30 bg-ember/10 text-ember" },
};

export function AssessmentPanel({
  assessment,
  successCriteria,
  restitution,
}: AssessmentPanelProps) {
  const typeInfo = typeLabel[assessment.type] ?? {
    label: assessment.type,
    color: "border-white/20 bg-white/[0.04] text-muted",
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
        <div className="flex items-center gap-3">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
            Évaluation
          </h2>
          <span
            className={`rounded border px-2 py-0.5 text-xs font-bold uppercase tracking-[0.12em] ${typeInfo.color}`}
          >
            {typeInfo.label}
          </span>
        </div>

        <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-foreground">
          Critères
        </h3>
        <ul className="mt-2 space-y-2" aria-label="Critères d'évaluation">
          {assessment.criteria.map((criterion) => (
            <li
              key={criterion}
              className="rounded border border-white/10 bg-ink/35 p-2 text-sm leading-6 text-muted"
            >
              {criterion}
            </li>
          ))}
        </ul>

        {assessment.selfEvaluation && assessment.selfEvaluation.length > 0 ? (
          <>
            <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-foreground">
              Auto-évaluation élève
            </h3>
            <ul className="mt-2 space-y-2" aria-label="Auto-évaluation">
              {assessment.selfEvaluation.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-6 text-muted">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-sm border border-white/30" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      <div className="space-y-4">
        <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
            Critères de réussite
          </h2>
          <ul className="mt-3 space-y-2" aria-label="Critères de réussite">
            {successCriteria.map((criterion, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded bg-jade/10 font-mono text-xs font-black text-jade">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-muted">{criterion}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
            Restitution
          </h2>
          <div className="mt-3 space-y-3">
            <div>
              <h3 className="text-sm font-bold text-foreground">Pour les familles</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{restitution.family}</p>
            </div>
            <div className="border-t border-white/10 pt-3">
              <h3 className="text-sm font-bold text-foreground">Pour l&apos;enseignant</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{restitution.teacher}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
