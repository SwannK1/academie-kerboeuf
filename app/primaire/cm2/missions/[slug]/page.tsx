import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { AccessibilityPanel } from "@/components/cm2/accessibility-panel";
import { AssessmentPanel } from "@/components/cm2/assessment-panel";
import { BadgeGrid } from "@/components/cm2/badge-grid";
import { DifferentiationPanel } from "@/components/cm2/differentiation-panel";
import { MissionSkillPanel } from "@/components/cm2/mission-skill-panel";
import { OfficialReferencePanel } from "@/components/cm2/official-reference-panel";
import { SequencePanel } from "@/components/cm2/sequence-panel";
import { StudentProjectSheet } from "@/components/cm2/student-project-sheet";
import { CurriculumLinkPanel } from "@/components/missions/curriculum-link-panel";
import { DetailPanel } from "@/components/missions/detail-panel";
import { MissionLearningFlow } from "@/components/missions/mission-learning-flow";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PrintBodyClass } from "@/components/print/print-body-class";
import { cm2Missions, getCm2MissionBySlug } from "@/content/cm2";
import { getFelixBadgesBySlugs, getFelixPlaceBySlug } from "@/content/felix-character";
import { felixProjects, getFelixProjectBySlug } from "@/content/felix-missions";
import type { MissionEvidence } from "@/content/felix-types";
import { getLearningPathsWithSteps } from "@/content/learning-paths";
import { getPublicStatusLabel } from "@/content/public-status";

type MissionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const cm2Slugs = cm2Missions.map((m) => ({ slug: m.slug }));
  const felixSlugs = felixProjects.map((p) => ({ slug: p.slug }));
  return [...cm2Slugs, ...felixSlugs];
}

export async function generateMetadata({
  params,
}: MissionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const felix = getFelixProjectBySlug(slug);
  if (felix) {
    return {
      title: `${felix.title} | Projets CM2`,
      description: felix.subtitle,
    };
  }
  const cm2 = getCm2MissionBySlug(slug);
  if (!cm2) return { title: "Mission introuvable | Académie Kerboeuf" };
  return {
    title: `${cm2.title} | Missions CM2`,
    description: cm2.description,
  };
}

export default async function MissionDetailPage({ params }: MissionPageProps) {
  const { slug } = await params;
  const felixProject = getFelixProjectBySlug(slug);
  const cm2Mission = getCm2MissionBySlug(slug);

  if (!felixProject && !cm2Mission) {
    notFound();
  }

  // ── Enriched Felix project ──────────────────────────────────────────────────
  if (felixProject) {
    const place = getFelixPlaceBySlug(felixProject.associatedPlace);
    const badges = getFelixBadgesBySlugs(felixProject.associatedBadges);
    const hasInstitutionalContent = Boolean(
      (felixProject.sequence && felixProject.sequence.length > 0) ||
        felixProject.officialReference ||
        (felixProject.lsuLinks && felixProject.lsuLinks.length > 0) ||
        (felixProject.crossCurricular && felixProject.crossCurricular.length > 0) ||
        felixProject.accessibility,
    );

    return (
      <main className="mission-detail-page felix-project-detail">
        <PrintBodyClass className="print-mission-detail" />

        <div className="mission-detail-chrome px-4 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Breadcrumb
              items={[
                { label: "Accueil", href: "/" },
                { label: "CM2", href: "/primaire/cm2" },
                { label: "Missions", href: "/primaire/cm2/missions" },
                { label: felixProject.title },
              ]}
            />
          </div>
        </div>

        <section className="mission-detail-hero relative isolate overflow-hidden px-4 pb-16 pt-16 sm:px-6 lg:px-8">
          <div className="mission-detail-effects mission-grid absolute inset-0 -z-20 opacity-30" />
          <div className="mission-detail-effects absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.05),rgba(9,16,15,0.94))]" />

          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-start">
            <div>
              <p
                className={`inline-flex rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] ${felixProject.theme.surfaceClass} ${felixProject.theme.textClass} ${felixProject.theme.ringClass}`}
              >
                {felixProject.mainSubject}
              </p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
                {felixProject.title}
              </h1>
              <p className={`mt-3 text-xl font-bold ${felixProject.theme.textClass}`}>
                {felixProject.subtitle}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
                {felixProject.synopsis}
              </p>
              {felixProject.associatedSubjects.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {felixProject.associatedSubjects.map((subject) => (
                    <span
                      key={subject}
                      className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-xs font-bold text-muted"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <aside className="mission-detail-card rounded-md border border-white/12 bg-panel/72 p-5 shadow-2xl shadow-black/35">
              <div
                className={`mb-5 h-1 rounded-full ${felixProject.theme.accentClass}`}
                aria-hidden="true"
              />
              <dl className="space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Statut</dt>
                  <dd><PublicStatusBadge status={felixProject.status} /></dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Durée</dt>
                  <dd className="text-sm font-bold text-foreground">{felixProject.duration}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Discipline</dt>
                  <dd className={`text-sm font-bold ${felixProject.theme.textClass}`}>
                    {felixProject.mainSubject}
                  </dd>
                </div>
                {place ? (
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Lieu</dt>
                    <dd className="text-sm font-bold text-foreground">{place.name}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                    Rôle de Félix
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-muted">{felixProject.felixRole}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section className="mission-detail-body px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-4">

            <StudentProjectSheet mission={felixProject} />

            <div className="felix-teacher-detail grid gap-4 lg:grid-cols-2">
              <DetailPanel title="Objectifs de la mission">
                <ol className="space-y-3" aria-label="Objectifs">
                  {felixProject.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded bg-jade/10 font-mono text-xs font-black text-jade">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-7 text-muted">{obj}</p>
                    </li>
                  ))}
                </ol>
              </DetailPanel>

              <ExpectedProductionPanel
                evidence={felixProject.evidence}
                printableSupports={felixProject.printableSupports}
                projectableSupports={felixProject.projectableSupports}
              />
            </div>

            <div className="felix-teacher-detail">
              <SuccessCriteriaPanel criteria={felixProject.successCriteria} />
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                Pour l&apos;enseignant
              </p>
            </div>

            <div className="felix-teacher-detail">
              <MissionSkillPanel
                skills={felixProject.skills}
                evidence={felixProject.evidence}
              />
            </div>

            <div className="felix-teacher-detail">
              <DifferentiationPanel differentiation={felixProject.differentiation} />
            </div>

            <div className="felix-teacher-detail">
              <AssessmentPanel
                assessment={felixProject.assessment}
                successCriteria={felixProject.successCriteria}
                restitution={felixProject.restitution}
              />
            </div>

            {hasInstitutionalContent ? (
              <div className="border-t border-white/10 pt-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky">
                  Repères pédagogiques
                </p>
              </div>
            ) : null}

            <div className="felix-teacher-detail">
              <SequencePanel sequence={felixProject.sequence} />
            </div>

            <div className="felix-teacher-detail">
              <OfficialReferencePanel
                officialReference={felixProject.officialReference}
                lsuLinks={felixProject.lsuLinks}
                crossCurricular={felixProject.crossCurricular}
              />
            </div>

            <div className="felix-teacher-detail">
              <AccessibilityPanel accessibility={felixProject.accessibility} />
            </div>

            {badges.length > 0 ? (
              <div className="felix-teacher-detail mission-detail-card rounded-md border border-white/10 bg-white/[0.04] p-5">
                <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted">
                  Badges associés à ce projet
                </h2>
                <BadgeGrid badges={badges} />
              </div>
            ) : null}

          </div>

          <div className="mission-detail-chrome mx-auto mt-10 max-w-7xl">
            <Link
              href="/primaire/cm2/missions"
              className={`inline-flex rounded-md border px-4 py-3 text-sm font-bold transition hover:text-ink ${felixProject.theme.ringClass} ${felixProject.theme.surfaceClass} ${felixProject.theme.textClass}`}
            >
              Retour aux missions CM2
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // ── Legacy Cm2Mission ───────────────────────────────────────────────────────
  const mission = cm2Mission!;
  const relatedPaths = getLearningPathsWithSteps().filter((path) =>
    path.steps.some((step) => step.href === `/primaire/cm2/missions/${slug}`),
  );

  return (
    <main className="mission-detail-page">
      <PrintBodyClass className="print-mission-detail" />
      <div className="mission-detail-chrome px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "CM2", href: "/primaire/cm2" },
              { label: "Missions", href: "/primaire/cm2/missions" },
              { label: mission.title },
            ]}
          />
        </div>
      </div>

      <section className="mission-detail-hero relative isolate overflow-hidden px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <div className="mission-detail-effects mission-grid absolute inset-0 -z-20 opacity-30" />
        <div className="mission-detail-effects absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.05),rgba(9,16,15,0.94))]" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-start">
          <div>
            <p
              className={`inline-flex rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] ${mission.theme.surfaceClass} ${mission.theme.textClass} ${mission.theme.ringClass}`}
            >
              {mission.subject}
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
              {mission.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {mission.description}
            </p>
          </div>

          <aside className="mission-detail-card rounded-md border border-white/12 bg-panel/72 p-5 shadow-2xl shadow-black/35">
            <div className={`mb-5 h-1 rounded-full ${mission.theme.accentClass}`} aria-hidden="true" />
            <dl className="space-y-5">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Statut</dt>
                <dd><PublicStatusBadge status={mission.status} /></dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Matière</dt>
                <dd className="text-sm font-bold text-foreground">{mission.subject}</dd>
              </div>
              {mission.pedagogy.level ? (
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Niveau</dt>
                  <dd className="text-sm font-bold text-foreground">{mission.pedagogy.level}</dd>
                </div>
              ) : null}
              {mission.pedagogy.duration ? (
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Durée</dt>
                  <dd className="text-sm font-bold text-foreground">{mission.pedagogy.duration}</dd>
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-4">
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Thème</dt>
                <dd className={`text-sm font-bold ${mission.theme.textClass}`}>
                  {mission.theme.name}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="mission-detail-body px-4 pb-20 sm:px-6 lg:px-8">
        <MissionLearningFlow pedagogy={mission.pedagogy} />

        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
          {mission.objective ? (
            <DetailPanel title="Objectif de la mission">
              <p className="text-sm leading-7 text-muted">{mission.objective}</p>
            </DetailPanel>
          ) : null}

          {mission.competencies.length > 0 ? (
            <DetailPanel title="Compétences travaillées">
              <ul className="space-y-3">
                {mission.competencies.map((competency) => (
                  <li
                    key={competency}
                    className="rounded border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-muted"
                  >
                    {competency}
                  </li>
                ))}
              </ul>
            </DetailPanel>
          ) : null}

          {mission.upcomingActivities.length > 0 ? (
            <DetailPanel title="Activités à venir">
              <ul className="space-y-3">
                {mission.upcomingActivities.map((activity) => (
                  <li
                    key={activity}
                    className="rounded border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-muted"
                  >
                    {activity}
                  </li>
                ))}
              </ul>
            </DetailPanel>
          ) : null}
        </div>

        <div className="mx-auto mt-4 max-w-7xl">
          <CurriculumLinkPanel {...mission} />
        </div>

        {relatedPaths.length > 0 ? (
          <div className="mx-auto mt-4 max-w-7xl">
            <DetailPanel title="Parcours associés">
              <div className="grid gap-3 md:grid-cols-2">
                {relatedPaths.map((path) => (
                  <Link
                    key={path.slug}
                    href={`/parcours/${path.slug}`}
                    className="rounded border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-muted transition hover:border-gold/30 hover:text-foreground"
                  >
                    <span className="font-bold text-foreground">{path.title}</span>
                    <span className="block text-xs uppercase tracking-[0.12em] text-muted">
                      {path.estimatedDuration} · {getPublicStatusLabel(path.status)}
                    </span>
                  </Link>
                ))}
              </div>
            </DetailPanel>
          </div>
        ) : null}

        <div className="mission-detail-chrome mx-auto mt-10 max-w-7xl">
          <Link
            href="/primaire/cm2/missions"
            className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-4 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink"
          >
            Retour aux missions CM2
          </Link>
        </div>
      </section>
    </main>
  );
}

const evidenceTypeLabels: Record<MissionEvidence["type"], string> = {
  écrit: "Écrit",
  oral: "Oral",
  production: "Production",
  trace: "Trace",
  numérique: "Numérique",
};

function ExpectedProductionPanel({
  evidence,
  printableSupports,
  projectableSupports,
}: {
  evidence: MissionEvidence[];
  printableSupports: string[];
  projectableSupports: string[];
}) {
  return (
    <DetailPanel title="Production attendue">
      <div className="space-y-4">
        {evidence.length > 0 ? (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-jade">
              Ce que les élèves doivent laisser comme trace
            </h3>
            <ul className="mt-2 space-y-2">
              {evidence.map((item) => (
                <li
                  key={`${item.type}-${item.description}`}
                  className="rounded border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-muted"
                >
                  <span className="font-bold text-foreground">
                    {evidenceTypeLabels[item.type]}
                  </span>{" "}
                  - {item.description}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          {printableSupports.length > 0 ? (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-gold">
                À imprimer
              </h3>
              <ul className="mt-2 space-y-1">
                {printableSupports.map((support) => (
                  <li
                    key={support}
                    className="flex items-start gap-2 text-sm leading-6 text-muted"
                  >
                    <span
                      className="mt-1.5 size-1 shrink-0 rounded-full bg-gold"
                      aria-hidden="true"
                    />
                    {support}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {projectableSupports.length > 0 ? (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-sky">
                À projeter
              </h3>
              <ul className="mt-2 space-y-1">
                {projectableSupports.map((support) => (
                  <li
                    key={support}
                    className="flex items-start gap-2 text-sm leading-6 text-muted"
                  >
                    <span
                      className="mt-1.5 size-1 shrink-0 rounded-full bg-sky"
                      aria-hidden="true"
                    />
                    {support}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </DetailPanel>
  );
}

function SuccessCriteriaPanel({ criteria }: { criteria: string[] }) {
  if (criteria.length === 0) {
    return null;
  }

  return (
    <DetailPanel title="Critères de réussite">
      <ul className="grid gap-3 md:grid-cols-3">
        {criteria.map((criterion, index) => (
          <li
            key={criterion}
            className="rounded border border-jade/20 bg-jade/10 p-3 text-sm leading-6 text-muted"
          >
            <span className="mb-2 block font-mono text-xs font-black uppercase tracking-[0.14em] text-jade">
              Critère {index + 1}
            </span>
            {criterion}
          </li>
        ))}
      </ul>
    </DetailPanel>
  );
}
