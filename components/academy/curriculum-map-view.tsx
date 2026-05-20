import { getPublicStatusKey } from "@/content/public-status";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import type {
  CurriculumMap,
  ExpectedCompetency,
  LearningCompetency,
} from "@/content/learning-architecture-types";

type CurriculumMapViewProps = {
  map: CurriculumMap;
  competenciesById: Record<string, LearningCompetency>;
};

export function CurriculumMapView({ map, competenciesById }: CurriculumMapViewProps) {
  return (
    <div className="space-y-20">
      {map.subjects.map((subject) => {
        const totalInSubject = subject.domains.reduce(
          (sum, d) =>
            sum + d.subdomains.reduce((s, sd) => s + sd.competencies.length, 0),
          0,
        );

        return (
          <section key={subject.slug} aria-label={subject.label}>
            {/* ── En-tête de matière ── */}
            <div className="mb-10 flex items-baseline justify-between gap-4 border-b border-white/15 pb-5">
              <h2 className="text-3xl font-black text-foreground">
                {subject.label}
              </h2>
              <span className="shrink-0 text-sm font-bold text-muted">
                {totalInSubject}&nbsp;compétence{totalInSubject > 1 ? "s" : ""}
              </span>
            </div>

            {/* ── Domaines et sous-domaines ── */}
            <div className="space-y-12">
              {subject.domains.map((domain) => (
                <div key={domain.slug} className="space-y-10">
                  {domain.subdomains.map((subdomain) => (
                    <div key={subdomain.slug}>
                      {/* ── En-tête de sous-domaine ── */}
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <h3 className="text-xl font-black text-foreground">
                          {subdomain.label}
                        </h3>
                        <span className="shrink-0 rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-muted">
                          {subdomain.competencies.length}&nbsp;compétence
                          {subdomain.competencies.length > 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* ── Grille des compétences ── */}
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {subdomain.competencies.map((expected) => (
                          <CompetencySlot
                            key={expected.id}
                            expected={expected}
                            full={
                              expected.competencyId
                                ? competenciesById[expected.competencyId]
                                : undefined
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

type CompetencySlotProps = {
  expected: ExpectedCompetency;
  full?: LearningCompetency;
};

function CompetencySlot({ expected, full }: CompetencySlotProps) {
  const statusKey = getPublicStatusKey(expected.status);
  const objective = full?.observableObjective;
  const criteria = full?.successCriteria ?? expected.successCriteria ?? [];
  const slotCount = full?.resourceSlots?.length ?? 0;

  const isInProgress = statusKey === "in-progress";

  return (
    <article
      className={[
        "flex flex-col rounded-md border p-4",
        isInProgress
          ? "border-sky/20 bg-sky/[0.04]"
          : "border-white/10 bg-white/[0.04]",
      ].join(" ")}
    >
      {/* ── Titre + statut ── */}
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm font-black leading-snug text-foreground">
          {expected.title}
        </h4>
        <PublicStatusBadge status={expected.status} className="shrink-0" />
      </div>

      {/* ── Objectif observable ── */}
      {objective ? (
        <p className="mt-2 text-xs leading-5 text-muted">{objective}</p>
      ) : null}

      {/* ── Critères de réussite ── */}
      {criteria.length > 0 ? (
        <ul className="mt-3 grid gap-1">
          {criteria.slice(0, 3).map((c) => (
            <li key={c} className="flex gap-2 text-xs leading-5 text-muted">
              <span
                aria-hidden="true"
                className={[
                  "mt-1.5 size-1 shrink-0 rounded-full",
                  isInProgress ? "bg-sky/60" : "bg-sky/40",
                ].join(" ")}
              />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* ── Ressources prévues ── */}
      {slotCount > 0 ? (
        <p className="mt-auto pt-3 text-[11px] text-white/30">
          {slotCount}&nbsp;ressource{slotCount > 1 ? "s" : ""} PDF
          prévue{slotCount > 1 ? "s" : ""}
        </p>
      ) : null}
    </article>
  );
}
