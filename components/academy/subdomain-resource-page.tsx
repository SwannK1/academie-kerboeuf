import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  getPedagogicalResourceSlots,
  isPedagogicalResourceAbsent,
  isPedagogicalResourceLinkable,
  type PedagogicalResourceSlot,
} from "@/content/pedagogical-resources";
import type {
  AcademyCharacterLink,
  LearningMissionLink,
  LearningCompetency,
  Lesson,
  ProgramDomain,
  ProgramSubdomain,
} from "@/content/program-types";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type SubdomainResourcePageProps = {
  breadcrumbItems: BreadcrumbItem[];
  levelLabel: string;
  cycleLabel: string;
  domain: ProgramDomain;
  subdomain: ProgramSubdomain;
  backHref: string;
  backLabel: string;
  guideCharacter?: AcademyCharacterLink;
  linkedMissions?: LearningMissionLink[];
};

export function SubdomainResourcePage({
  breadcrumbItems,
  levelLabel,
  cycleLabel,
  domain,
  subdomain,
  backHref,
  backLabel,
  guideCharacter,
  linkedMissions = [],
}: SubdomainResourcePageProps) {
  const hasStructuredCompetencies = Boolean(subdomain.competencies?.length);

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-md border border-jade/30 bg-jade/[0.06] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-jade">
              {levelLabel} · {cycleLabel}
            </span>
            <PublicStatusBadge status={subdomain.status} />
          </div>

          <h1 className="mt-6 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            {domain.title} · {subdomain.title}
          </h1>
          {subdomain.description ? (
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              {subdomain.description}
            </p>
          ) : null}

          {guideCharacter || linkedMissions.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted">
              {guideCharacter ? (
                <span className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1">
                  Guide : {guideCharacter.name}
                </span>
              ) : null}
              {linkedMissions.map((mission) => (
                <span
                  key={mission.missionSlug}
                  className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1"
                >
                  Mission liée : {mission.title ?? mission.missionSlug}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 border-b border-white/10 pb-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              {hasStructuredCompetencies
                ? "Organisation pédagogique"
                : "Ressources PDF"}
            </p>
            <h2 className="mt-2 text-2xl font-black text-foreground">
              {hasStructuredCompetencies
                ? "Compétences travaillées"
                : "Leçons du sous-domaine"}
            </h2>
          </div>

          {hasStructuredCompetencies ? (
            <ul className="space-y-5" role="list">
              {subdomain.competencies?.map((competency) => (
                <CompetencyResourceItem
                  key={competency.id}
                  competency={competency}
                  lessons={subdomain.lessons}
                />
              ))}
            </ul>
          ) : subdomain.lessons.length > 0 ? (
            <ul className="space-y-5" role="list">
              {subdomain.lessons.map((lesson) => (
                <LessonResourceItem key={lesson.id} lesson={lesson} />
              ))}
            </ul>
          ) : (
            <div className="rounded-md border border-white/10 bg-white/[0.025] p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                Leçons en préparation
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                Ce sous-domaine est prévu dans la progression. Les premières
                ressources PDF seront ajoutées progressivement.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href={backHref}
            className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
          >
            {backLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}

function CompetencyResourceItem({
  competency,
  lessons,
}: {
  competency: LearningCompetency;
  lessons: Lesson[];
}) {
  const linkedLessons = getLessonsForCompetency(competency, lessons);
  const resourceRefs = competency.resourceRefs ?? [];

  return (
    <li className="rounded-md border border-white/10 bg-white/[0.025] p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
            Compétence
          </p>
          <h3 className="mt-2 text-xl font-black text-foreground">
            {competency.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            Objectif : {competency.objective}
          </p>
          {competency.description ? (
            <p className="mt-2 text-sm leading-6 text-muted">
              Repère observable : {competency.description}
            </p>
          ) : null}
        </div>
        <PublicStatusBadge status={competency.status} className="shrink-0" />
      </div>

      {competency.successCriteria?.length ? (
        <div className="mt-5 rounded border border-white/10 bg-ink/25 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Critères de réussite
          </p>
          <ul className="mt-3 grid gap-2">
            {competency.successCriteria.map((criterion) => (
              <li key={criterion} className="flex gap-2 text-sm text-muted">
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-jade/60"
                />
                <span className="leading-6">{criterion}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {resourceRefs.length > 0 ? (
        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Ressources de compétence
          </p>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {getPedagogicalResourceSlots(resourceRefs).map((slot) => (
              <ResourceSlotRow key={slot.kind} slot={slot} />
            ))}
          </dl>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4">
        {linkedLessons.length > 0 ? (
          linkedLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="rounded border border-white/10 bg-ink/25 p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                    Leçon liée
                  </p>
                  <h4 className="mt-2 text-lg font-black text-foreground">
                    {lesson.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Objectif : {lesson.objective}
                  </p>
                </div>
                <PublicStatusBadge status={lesson.status} className="shrink-0" />
              </div>
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {getPedagogicalResourceSlots(lesson.resources).map((slot) => (
                  <ResourceSlotRow key={slot.kind} slot={slot} />
                ))}
              </dl>
            </div>
          ))
        ) : (
          <div className="rounded border border-white/10 bg-ink/25 p-4">
            <p className="text-sm font-bold text-muted">
              Leçons liées en cours de structuration.
            </p>
          </div>
        )}
      </div>
    </li>
  );
}

function LessonResourceItem({ lesson }: { lesson: Lesson }) {
  const slots = getPedagogicalResourceSlots(lesson.resources);

  return (
    <li className="rounded-md border border-white/10 bg-white/[0.025] p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-black text-foreground">{lesson.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            Objectif : {lesson.objective}
          </p>
        </div>
        <PublicStatusBadge status={lesson.status} className="shrink-0" />
      </div>

      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        {slots.map((slot) => (
          <ResourceSlotRow key={slot.kind} slot={slot} />
        ))}
      </dl>
    </li>
  );
}

function getLessonsForCompetency(
  competency: LearningCompetency,
  lessons: Lesson[],
): Lesson[] {
  const lessonIds = new Set(competency.lessonIds);

  return lessons.filter((lesson) => lessonIds.has(lesson.id));
}

function ResourceSlotRow({ slot }: { slot: PedagogicalResourceSlot }) {
  const { resource } = slot;
  const isAbsent = isPedagogicalResourceAbsent(resource);
  const isLinkable = isPedagogicalResourceLinkable(resource);

  return (
    <div className="rounded border border-white/10 bg-ink/30 px-4 py-3">
      <dt className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
        {slot.label}
      </dt>
      <dd className="mt-2">
        {isAbsent ? (
          <span className="inline-flex w-fit rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white/35">
            Absente
          </span>
        ) : isLinkable ? (
          <Link
            href={resource.href}
            className="inline-flex w-fit rounded border border-jade/35 bg-jade/10 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-jade transition hover:bg-jade/20"
          >
            Ouvrir le PDF
          </Link>
        ) : (
          <PublicStatusBadge status={resource?.status} />
        )}
      </dd>
    </div>
  );
}
