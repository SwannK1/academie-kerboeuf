import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import type {
  CurriculumMap,
  CurriculumDomainBlock,
  CurriculumSubdomainBlock,
  ExpectedCompetency,
} from "@/content/learning-architecture-types";
import { getExpectedCompetencyLinkStatus } from "@/content/curriculum-map";

type CurriculumMapPreviewProps = {
  curriculumMap: CurriculumMap;
};

const resourceKindLabels: Record<string, string> = {
  "lesson-pdf": "Leçon PDF",
  "exercises-pdf": "Exercices PDF",
  "correction-pdf": "Correction PDF",
  "assessment-pdf": "Évaluation PDF",
  "projectable-pdf": "Support projetable",
  "parent-sheet-pdf": "Fiche parent",
};

export function CurriculumMapPreview({
  curriculumMap,
}: CurriculumMapPreviewProps) {
  if (curriculumMap.subjects.length === 0) return null;

  return (
    <div className="grid gap-5">
      {curriculumMap.subjects.map((subject) => (
        <section
          key={subject.slug}
          aria-labelledby={`subject-${subject.slug}`}
          className="rounded-md border border-white/10 bg-white/[0.025]"
        >
          <div className="flex flex-col gap-2 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <h3
              id={`subject-${subject.slug}`}
              className="text-sm font-black uppercase tracking-[0.2em] text-sky"
            >
              {subject.label}
            </h3>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              {subject.domains.length} domaine
              {subject.domains.length > 1 ? "s" : ""} ·{" "}
              {countSubjectCompetencies(subject)} compétence
              {countSubjectCompetencies(subject) > 1 ? "s" : ""}
            </p>
          </div>
          <div className="grid gap-4 p-4 sm:p-5">
            {subject.domains.map((domain) => (
              <CurriculumDomainSection
                key={domain.slug}
                domain={domain}
                levelSlug={curriculumMap.levelSlug}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

type CurriculumDomainSectionProps = {
  domain: CurriculumDomainBlock;
  levelSlug: string;
};

function CurriculumDomainSection({
  domain,
  levelSlug,
}: CurriculumDomainSectionProps) {
  const competencyCount = countDomainCompetencies(domain);

  return (
    <div className="rounded-md border border-white/[0.09] bg-ink/20">
      <div className="flex flex-col gap-1 border-b border-white/[0.08] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-bold text-foreground">{domain.label}</p>
        <p className="text-xs font-bold text-muted">
          {competencyCount} compétence{competencyCount > 1 ? "s" : ""}
        </p>
      </div>
      <div className="divide-y divide-white/[0.06] px-4">
        {domain.subdomains.map((subdomain) => (
          <CurriculumSubdomainSection
            key={subdomain.slug}
            subdomain={subdomain}
            levelSlug={levelSlug}
          />
        ))}
      </div>
    </div>
  );
}

type CurriculumSubdomainSectionProps = {
  subdomain: CurriculumSubdomainBlock;
  levelSlug: string;
};

function CurriculumSubdomainSection({
  subdomain,
  levelSlug,
}: CurriculumSubdomainSectionProps) {
  return (
    <div className="py-4">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
          {subdomain.label}
        </p>
        <p className="text-xs text-muted">
          {subdomain.competencies.length} attendu
          {subdomain.competencies.length > 1 ? "s" : ""}
        </p>
      </div>
      <div className="grid gap-3">
        {subdomain.competencies.map((competency) => (
          <ExpectedCompetencyRow
            key={competency.id}
            competency={competency}
            isLinked={
              getExpectedCompetencyLinkStatus(levelSlug, competency) === "linked"
            }
          />
        ))}
      </div>
    </div>
  );
}

type ExpectedCompetencyRowProps = {
  competency: ExpectedCompetency;
  isLinked: boolean;
};

function ExpectedCompetencyRow({ competency, isLinked }: ExpectedCompetencyRowProps) {
  return (
    <div className="flex flex-col gap-3 rounded border border-white/[0.08] bg-white/[0.03] p-3.5 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <p className="text-sm font-bold leading-6 text-foreground">
            {competency.title}
          </p>
          {isLinked && (
            <span
              className="inline-flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-500/[0.08] px-2 py-0.5 text-xs font-bold text-emerald-400"
              aria-label="Compétence observable déjà structurée dans le site"
            >
              <span aria-hidden="true">✓</span>
              Déjà structurée
            </span>
          )}
        </div>

        {competency.description && (
          <p className="mt-1 text-xs leading-5 text-muted">
            {competency.description}
          </p>
        )}

        {competency.plannedResources && competency.plannedResources.length > 0 && (
          <div className="mt-3" aria-label="Ressources prévues non cliquables">
            <p className="mb-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">
              Ressources prévues
            </p>
            <div className="flex flex-wrap gap-1.5">
              {competency.plannedResources.map((resource) => (
                <span
                  key={resource.kind}
                  className="inline-flex items-center rounded border border-white/[0.08] bg-ink/35 px-2 py-0.5 text-xs text-muted"
                  title={resourceKindLabels[resource.kind] ?? resource.label}
                >
                  {resource.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="shrink-0 sm:ml-4">
        <PublicStatusBadge status={competency.status} />
      </div>
    </div>
  );
}

function countDomainCompetencies(domain: CurriculumDomainBlock) {
  return domain.subdomains.reduce(
    (count, subdomain) => count + subdomain.competencies.length,
    0,
  );
}

function countSubjectCompetencies(
  subject: CurriculumMap["subjects"][number],
) {
  return subject.domains.reduce(
    (count, domain) => count + countDomainCompetencies(domain),
    0,
  );
}
