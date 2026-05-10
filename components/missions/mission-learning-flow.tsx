import type { MissionPedagogy, ProgressiveQuestion } from "@/content/mission-types";
import { DetailPanel } from "@/components/missions/detail-panel";

type MissionLearningFlowProps = {
  pedagogy: MissionPedagogy;
};

const questionLevelLabels: Record<
  ProgressiveQuestion["level"],
  string
> = {
  indice: "Indice",
  raisonnement: "Raisonnement",
  justification: "Justification",
  "interprétation": "Interprétation",
  "synthèse": "Synthèse",
};

export function MissionLearningFlow({ pedagogy }: MissionLearningFlowProps) {
  const questions = pedagogy.progressiveQuestions ?? [];
  const correction = pedagogy.correction ?? [];
  const hasMethod = Boolean(pedagogy.schoolSkill || pedagogy.methodTip);
  const hasUsage = Boolean(pedagogy.usage?.projection || pedagogy.usage?.printing);
  const hasSessionOverview = Boolean(
    pedagogy.studentObjective ||
      pedagogy.duration ||
      pedagogy.level ||
      (pedagogy.materials && pedagogy.materials.length > 0),
  );
  const hasVocabulary =
    pedagogy.usefulVocabulary && pedagogy.usefulVocabulary.length > 0;
  const hasExtension = Boolean(
    pedagogy.reinvestmentActivity || pedagogy.shortWrittenTrace,
  );
  const hasProjectionOrPrint = Boolean(
    pedagogy.projectionVersion || pedagogy.printableVersion,
  );

  return (
    <div className="mx-auto mb-14 max-w-7xl">
      <div className="mb-8 grid gap-6 border-b border-white/10 pb-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
            Structure pédagogique
          </p>
          <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
            Mission prête à scénariser
          </h2>
        </div>
        {pedagogy.progressStatus ? (
          <div className="rounded-md border border-gold/25 bg-gold/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
              Statut de progression
            </p>
            <p className="mt-2 text-lg font-black text-foreground">
              {pedagogy.progressStatus.state}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {pedagogy.progressStatus.detail}
            </p>
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        {hasSessionOverview ? (
          <DetailPanel title="Fiche séance">
            <dl className="grid gap-3 sm:grid-cols-2">
              {pedagogy.studentObjective ? (
                <SessionMeta
                  label="Objectif élève"
                  value={pedagogy.studentObjective}
                />
              ) : null}
              {pedagogy.schoolSkill ? (
                <SessionMeta
                  label="Compétence travaillée"
                  value={pedagogy.schoolSkill}
                />
              ) : null}
              {pedagogy.duration ? (
                <SessionMeta label="Durée indicative" value={pedagogy.duration} />
              ) : null}
              {pedagogy.level ? (
                <SessionMeta label="Niveau" value={pedagogy.level} />
              ) : null}
            </dl>
            {pedagogy.materials && pedagogy.materials.length > 0 ? (
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                  Matériel
                </p>
                <ul className="mt-2 grid gap-2">
                  {pedagogy.materials.map((item) => (
                    <li
                      key={item}
                      className="rounded border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </DetailPanel>
        ) : null}

        {pedagogy.immersiveIntroduction ? (
          <DetailPanel title="Introduction immersive">
            <p className="text-base leading-8 text-foreground">
              {pedagogy.immersiveIntroduction}
            </p>
          </DetailPanel>
        ) : null}

        {pedagogy.narrativeContext ? (
          <DetailPanel title="Contexte narratif">
            <p className="text-sm leading-7 text-muted">
              {pedagogy.narrativeContext}
            </p>
          </DetailPanel>
        ) : null}

        {hasVocabulary ? (
          <DetailPanel title="Vocabulaire utile">
            <div className="flex flex-wrap gap-2">
              {pedagogy.usefulVocabulary!.map((word) => (
                <span
                  key={word}
                  className="rounded border border-jade/25 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-jade"
                >
                  {word}
                </span>
              ))}
            </div>
          </DetailPanel>
        ) : null}

        {pedagogy.mainChallenge ? (
          <DetailPanel title={pedagogy.mainChallenge.label}>
            <p className="text-base leading-8 text-foreground">
              {pedagogy.mainChallenge.content}
            </p>
          </DetailPanel>
        ) : null}

        {questions.length > 0 ? (
          <DetailPanel title="Questions progressives">
            <ol className="space-y-3">
              {questions.map((question, index) => (
                <li
                  key={`${question.level}-${question.prompt}`}
                  className="rounded border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-muted"
                >
                  <span className="mr-2 font-mono font-bold text-gold">
                    {index + 1}.
                  </span>
                  <span className="mr-2 font-bold text-foreground">
                    {questionLevelLabels[question.level]} :
                  </span>
                  {question.prompt}
                </li>
              ))}
            </ol>
          </DetailPanel>
        ) : null}

        {hasMethod ? (
          <DetailPanel title="Méthode / conseil">
            <div className="space-y-4">
              {pedagogy.schoolSkill ? (
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                    Compétence scolaire
                  </p>
                  <p className="mt-2 text-sm leading-7 text-foreground">
                    {pedagogy.schoolSkill}
                  </p>
                </div>
              ) : null}
              {pedagogy.methodTip ? (
                <div className="rounded border border-jade/25 bg-jade/10 p-4">
                  <p className="text-sm leading-7 text-muted">
                    {pedagogy.methodTip}
                  </p>
                </div>
              ) : null}
            </div>
          </DetailPanel>
        ) : null}

        {hasExtension ? (
          <DetailPanel title="Réinvestissement / trace écrite">
            <div className="space-y-4">
              {pedagogy.reinvestmentActivity ? (
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                    Activité de réinvestissement
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {pedagogy.reinvestmentActivity}
                  </p>
                </div>
              ) : null}
              {pedagogy.shortWrittenTrace ? (
                <div className="rounded border border-gold/25 bg-gold/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                    Trace écrite courte
                  </p>
                  <p className="mt-2 text-sm leading-7 text-foreground">
                    {pedagogy.shortWrittenTrace}
                  </p>
                </div>
              ) : null}
            </div>
          </DetailPanel>
        ) : null}

        {correction.length > 0 ? (
          <DetailPanel title="Correction">
            <ol className="space-y-3">
              {correction.map((item, index) => (
                <li
                  key={`${item.prompt}-${item.answer}`}
                  className="rounded border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-muted"
                >
                  <span className="mr-2 font-mono font-bold text-gold">
                    {index + 1}.
                  </span>
                  <span className="block font-bold text-foreground">
                    {item.prompt}
                  </span>
                  <span className="mt-1 block">{item.answer}</span>
                </li>
              ))}
            </ol>
          </DetailPanel>
        ) : null}

        {hasProjectionOrPrint ? (
          <DetailPanel title="Versions classe">
            <div className="grid gap-3 sm:grid-cols-2">
              {pedagogy.projectionVersion ? (
                <ClassroomVersion
                  accentClass="text-sky"
                  version={pedagogy.projectionVersion}
                />
              ) : null}
              {pedagogy.printableVersion ? (
                <ClassroomVersion
                  accentClass="text-gold"
                  version={pedagogy.printableVersion}
                />
              ) : null}
            </div>
          </DetailPanel>
        ) : null}

        {hasUsage ? (
          <DetailPanel title="Projection / impression">
            <div className="grid gap-3 sm:grid-cols-2">
              {pedagogy.usage?.projection ? (
                <div className="rounded border border-sky/25 bg-sky/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky">
                    À projeter
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {pedagogy.usage.projection}
                  </p>
                </div>
              ) : null}
              {pedagogy.usage?.printing ? (
                <div className="rounded border border-gold/25 bg-gold/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                    À imprimer
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {pedagogy.usage.printing}
                  </p>
                </div>
              ) : null}
            </div>
          </DetailPanel>
        ) : null}
      </div>
    </div>
  );
}

function SessionMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.035] p-3">
      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-6 text-foreground">{value}</dd>
    </div>
  );
}

function ClassroomVersion({
  version,
  accentClass,
}: {
  version: { title: string; content: string[] };
  accentClass: string;
}) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.035] p-4">
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${accentClass}`}>
        {version.title}
      </p>
      <ul className="mt-3 space-y-2">
        {version.content.map((item) => (
          <li key={item} className="text-sm leading-6 text-muted">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
