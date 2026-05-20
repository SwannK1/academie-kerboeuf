import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompetencyCard } from "@/components/academy/learning-architecture-cards";
import { CurriculumMapPreview } from "@/components/academy/CurriculumMapPreview";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { getCompetenciesForLevel } from "@/content/competencies";
import { getCurriculumMapForLevel } from "@/content/curriculum-map";
import type { LearningCompetency } from "@/content/learning-architecture-types";

type PageProps = {
  params: Promise<{ level: string }>;
};

const primaryCompetencyLevels = {
  cp: {
    label: "CP",
    cycle: "Cycle 2",
  },
  ce1: {
    label: "CE1",
    cycle: "Cycle 2",
  },
  ce2: {
    label: "CE2",
    cycle: "Cycle 2",
  },
  cm1: {
    label: "CM1",
    cycle: "Cycle 3",
  },
} as const;

type PrimaryCompetencyLevelSlug = keyof typeof primaryCompetencyLevels;

export function generateStaticParams() {
  return Object.keys(primaryCompetencyLevels).map((level) => ({ level }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { level } = await params;

  if (!isPrimaryCompetencyLevelSlug(level)) {
    return {
      title: "Compétences introuvables | Académie Kerboeuf",
    };
  }

  return {
    title: `Compétences observables ${primaryCompetencyLevels[level].label} | Académie Kerboeuf`,
    description:
      "Repères de compétences observables, critères de réussite et ressources associées pour organiser le travail sans remplacer les supports PDF.",
  };
}

export default async function PrimaryLevelCompetenciesPage({ params }: PageProps) {
  const { level } = await params;

  if (!isPrimaryCompetencyLevelSlug(level)) {
    notFound();
  }

  const levelInfo = primaryCompetencyLevels[level];
  const competencies = getCompetenciesForLevel(level);
  const curriculumMap = getCurriculumMapForLevel(level);

  return (
    <main className="primary-competencies-page">
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: levelInfo.label, href: `/primaire/${level}` },
              { label: "Compétences" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-md border border-sky/30 bg-sky/[0.06] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-sky">
              {levelInfo.label} · {levelInfo.cycle}
            </span>
          </div>

          <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight text-foreground sm:text-4xl">
            Compétences — {levelInfo.label}
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Programme par matière · compétences structurées · ressources PDF prévues
          </p>
        </div>
      </section>

      {curriculumMap && (
        <section className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky">
                  Programme détaillé
                </p>
                <h2 className="mt-1.5 text-xl font-black text-foreground">
                  Squelette — {levelInfo.label}
                </h2>
              </div>
            </div>
            <CurriculumMapPreview curriculumMap={curriculumMap} />
          </div>
        </section>
      )}

      <section className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky">
                Compétences structurées
              </p>
              <h2 className="mt-1.5 text-xl font-black text-foreground">
                {competencies.length} compétence
                {competencies.length > 1 ? "s" : ""} — {levelInfo.label}
              </h2>
            </div>
          </div>

          {competencies.length > 0 ? (
            <div className="grid gap-10">
              {groupBySubject(competencies).map(({ subject, items }) => (
                <div key={subject}>
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-gold">
                    {subject}
                  </p>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((competency) => (
                      <CompetencyCard key={competency.id} competency={competency} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-8 text-center">
              <p className="text-sm font-bold text-muted">
                Les compétences de ce niveau sont en cours de structuration.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function isPrimaryCompetencyLevelSlug(
  level: string,
): level is PrimaryCompetencyLevelSlug {
  return level === "cp" || level === "ce1" || level === "ce2" || level === "cm1";
}

function groupBySubject(
  competencies: LearningCompetency[],
): { subject: string; items: LearningCompetency[] }[] {
  const groups: { subject: string; items: LearningCompetency[] }[] = [];
  for (const competency of competencies) {
    const subject = competency.subjectLabel ?? competency.subject;
    const existing = groups.find((g) => g.subject === subject);
    if (existing) {
      existing.items.push(competency);
    } else {
      groups.push({ subject, items: [competency] });
    }
  }
  return groups;
}
