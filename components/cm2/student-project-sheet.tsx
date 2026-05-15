import type { LearningMission } from "@/content/felix-types";

type StudentProjectSheetProps = {
  mission: LearningMission;
};

const MAX_STEPS = 5;
const MAX_CRITERIA = 4;
const MAX_SELF_EVALUATION = 3;

export function StudentProjectSheet({ mission }: StudentProjectSheetProps) {
  const steps = mission.sequence?.slice(0, MAX_STEPS) ?? [];
  const criteria = mission.successCriteria.slice(0, MAX_CRITERIA);
  const selfEvaluation =
    mission.assessment.selfEvaluation?.slice(0, MAX_SELF_EVALUATION) ?? [];
  const production = mission.evidence[0]?.description ?? mission.restitution.family;
  const studentObjective = mission.objectives[0] ?? mission.subtitle;

  return (
    <article
      className="student-project-sheet mission-detail-card rounded-md border border-white/10 bg-white/[0.045] p-5 sm:p-6"
      aria-labelledby="student-project-sheet-title"
    >
      <div className="student-project-sheet__header border-b border-white/10 pb-5">
        <p className={`text-xs font-bold uppercase tracking-[0.18em] ${mission.theme.textClass}`}>
          Fiche élève
        </p>
        <h2
          id="student-project-sheet-title"
          className="mt-2 text-2xl font-black leading-tight text-foreground sm:text-3xl"
        >
          {mission.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          {mission.synopsis}
        </p>
      </div>

      <div className="student-project-sheet__grid mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded border border-white/10 bg-ink/25 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Ma mission
          </p>
          <p className="mt-2 text-sm leading-7 text-foreground">
            {mission.felixRole}
          </p>
        </section>

        <section className="rounded border border-white/10 bg-ink/25 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Objectif élève
          </p>
          <p className="mt-2 text-sm leading-7 text-foreground">
            {studentObjective}
          </p>
        </section>
      </div>

      {steps.length > 0 ? (
        <section className="student-project-sheet__section mt-5">
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Les étapes essentielles
          </h3>
          <ol className="mt-3 grid gap-2">
            {steps.map((step) => (
              <li
                key={step.order}
                className="student-project-sheet__step grid gap-3 rounded border border-white/10 bg-white/[0.035] p-3 sm:grid-cols-[auto_1fr]"
              >
                <span className="grid size-8 place-items-center rounded bg-jade/10 font-mono text-xs font-black text-jade">
                  {step.order}
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">{step.title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <div className="student-project-sheet__grid mt-5 grid gap-4 lg:grid-cols-2">
        <section className="student-project-sheet__section rounded border border-white/10 bg-ink/25 p-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Critères de réussite
          </h3>
          <ul className="mt-3 space-y-2">
            {criteria.map((criterion) => (
              <li key={criterion} className="flex items-start gap-2 text-sm leading-6 text-muted">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-jade"
                  aria-hidden="true"
                />
                <span>{criterion}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="student-project-sheet__section rounded border border-white/10 bg-ink/25 p-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Production attendue
          </h3>
          <p className="mt-3 text-sm leading-7 text-foreground">{production}</p>
        </section>
      </div>

      <section className="student-project-sheet__trace mt-5 rounded border border-dashed border-white/20 bg-white/[0.025] p-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
          Ma trace / Ce que je retiens
        </h3>
        <div aria-hidden="true" className="mt-4 space-y-5">
          <div className="border-b border-white/20" />
          <div className="border-b border-white/20" />
          <div className="border-b border-white/20" />
        </div>
      </section>

      {selfEvaluation.length > 0 ? (
        <section className="student-project-sheet__section mt-5">
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Je me relis
          </h3>
          <ul className="mt-3 grid gap-2">
            {selfEvaluation.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-muted"
              >
                <span
                  className="mt-1 grid size-4 shrink-0 place-items-center rounded-sm border border-white/35"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
