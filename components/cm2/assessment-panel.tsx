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
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
            Évaluation
          </p>
          <span
            className={`rounded border px-2 py-0.5 text-xs font-bold uppercase tracking-[0.12em] ${typeInfo.color}`}
          >
            {typeInfo.label}
          </span>
        </div>

        <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-foreground">
          Critères
        </p>
        <ul className="mt-2 space-y-2" aria-label="Critères d'évaluation">
          {assessment.criteria.map((criterion) => (
            <li
              key={criterion}
              className="rounded border border-white/10 bg-ink/35 p-2 text-xs leading-6 text-muted"
            >
              {criterion}
            </li>
          ))}
        </ul>

        {assessment.selfEvaluation && assessment.selfEvaluation.length > 0 ? (
          <>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-foreground">
              Auto-évaluation élève
            </p>
            <ul className="mt-2 space-y-2" aria-label="Auto-évaluation">
              {assessment.selfEvaluation.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-muted">
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
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
            Critères de réussite
          </p>
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
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
            Restitution
          </p>
          <div className="mt-3 space-y-3">
            <div>
              <p className="text-xs font-bold text-foreground">Pour les familles</p>
              <p className="mt-1 text-xs leading-6 text-muted">{restitution.family}</p>
            </div>
            <div className="border-t border-white/10 pt-3">
              <p className="text-xs font-bold text-foreground">Pour l&apos;enseignant</p>
              <p className="mt-1 text-xs leading-6 text-muted">{restitution.teacher}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
