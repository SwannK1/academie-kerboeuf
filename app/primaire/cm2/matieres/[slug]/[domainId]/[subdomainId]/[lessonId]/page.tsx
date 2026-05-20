import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { getCm2SubjectBySlug } from "@/content/cm2-subjects";
import { getPublicStatusKey } from "@/content/public-status";
import {
  getAllCm2LessonPaths,
  getCm2DomainById,
  getCm2LessonByRouteSlug,
  getCm2SubdomainById,
} from "@/content/cm2-learning-tree";
import type { LearningSession } from "@/content/elementary-learning-model";
import { CM2_ACCENT } from "@/lib/cm2-accent";
import { LESSON_CONTENT } from "@/content/cm2-lesson-content";

type PageProps = {
  params: Promise<{
    slug: string;
    domainId: string;
    subdomainId: string;
    lessonId: string;
  }>;
};

// ── Static generation ─────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllCm2LessonPaths().map((p) => ({
    slug: p.subjectSlug,
    domainId: p.domainId,
    subdomainId: p.subdomainId,
    lessonId: p.lessonId,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, domainId, subdomainId, lessonId } = await params;
  const lesson = getCm2LessonByRouteSlug(slug, domainId, subdomainId, lessonId);
  if (!lesson) return { title: "Leçon introuvable | Académie Kerboeuf" };
  const subject = getCm2SubjectBySlug(slug);
  return {
    title: `${lesson.title} – ${subject?.title ?? "CM2"} | Académie Kerboeuf`,
    description: lesson.description,
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function Cm2LessonPage({ params }: PageProps) {
  const { slug, domainId, subdomainId, lessonId } = await params;

  const lesson = getCm2LessonByRouteSlug(slug, domainId, subdomainId, lessonId);
  if (!lesson) notFound();

  const subject = getCm2SubjectBySlug(slug);
  if (!subject) notFound();

  const domain = getCm2DomainById(slug, domainId);
  const subdomain = getCm2SubdomainById(slug, domainId, subdomainId);
  if (!domain || !subdomain) notFound();

  const t = CM2_ACCENT[subject.accent] ?? CM2_ACCENT.gold;
  const content = LESSON_CONTENT[lessonId];
  const sessions = [...(lesson.sessions ?? [])].sort((a, b) => a.order - b.order);

  const subjectHref = `/primaire/cm2/matieres/${slug}`;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil",     href: "/"                           },
              { label: "Primaire",    href: "/primaire"                   },
              { label: "CM2",         href: "/primaire/cm2"               },
              { label: "Matières",    href: "/primaire/cm2/matieres"      },
              { label: subject.title, href: subjectHref                   },
              { label: domain?.title ?? domainId, href: subjectHref       },
              { label: subdomain?.title ?? subdomainId, href: subjectHref },
              { label: lesson.title                                        },
            ]}
          />
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.03),rgba(9,16,15,0.95))]" />
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex rounded-md border ${t.border} ${t.bg} px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
              {subject.title} · CM2
            </span>
            {domain && (
              <span className="inline-flex rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-muted">
                {domain.title}
              </span>
            )}
            {subdomain && (
              <span className="inline-flex rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-muted">
                {subdomain.title}
              </span>
            )}
            <PublicStatusBadge status={lesson.status} />
          </div>
          <h1 className="mt-6 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            {lesson.title}
          </h1>
          {(lesson.description || content) && (
            <p className="mt-6 text-lg leading-8 text-muted">
              {lesson.description ?? content?.intro}
            </p>
          )}
          {lesson.objective ? (
            <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-muted">
              Objectif : {lesson.objective}
            </p>
          ) : null}
        </div>
      </section>

      {sessions.length > 0 ? (
        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className={`mb-6 border-b ${t.border} pb-4`}>
              <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
                Séquence
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                5 séances pour construire la notion
              </h2>
            </div>

            <ol className="space-y-4">
              {sessions.map((session) => (
                <LearningSessionItem key={session.id} session={session} accentText={t.text} />
              ))}
            </ol>

            {lesson.successCriteria?.length ? (
              <div className="mt-6 rounded-md border border-white/10 bg-white/[0.025] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                  Critères de réussite
                </p>
                <ul className="mt-3 grid gap-2">
                  {lesson.successCriteria.map((criterion) => (
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
          </div>
        </section>
      ) : null}

      {content ? (
        <>
          {/* ── Je retiens ──────────────────────────────────────────────── */}
          <section className="px-4 pb-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className={`mb-6 border-b ${t.border} pb-4`}>
                <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
                  Je retiens
                </p>
                <h2 className="mt-2 text-2xl font-black text-foreground">
                  L&apos;essentiel à connaître
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {content.retiens.map((item) => (
                  <div
                    key={item.heading}
                    className={`rounded-md border ${t.border} ${t.bg} p-5`}
                  >
                    <p className={`text-sm font-black ${t.text}`}>{item.heading}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Exemples guidés ─────────────────────────────────────────── */}
          <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 border-b border-white/10 pb-4">
                <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
                  Exemple guidé
                </p>
                <h2 className="mt-2 text-2xl font-black text-foreground">
                  {content.examplesTitle}
                </h2>
              </div>
              <div className="space-y-4">
                {content.exemples.map((ex) => (
                  <div
                    key={ex.label}
                    className="rounded-md border border-white/10 bg-white/[0.025] p-5"
                  >
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted">
                      {ex.label}
                    </p>
                    <p className="text-base font-semibold leading-7 text-foreground">
                      {ex.text}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted">{ex.inference}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Je m'entraîne ───────────────────────────────────────────── */}
          <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 border-b border-white/10 pb-4">
                <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
                  Je m&apos;entraîne
                </p>
                <h2 className="mt-2 text-2xl font-black text-foreground">
                  Méthode pas à pas
                </h2>
              </div>
              <ol className="space-y-3">
                {content.entrainement.map((step, i) => (
                  <li
                    key={`${lessonId}-${i}`}
                    className="flex gap-4 rounded-md border border-white/10 bg-white/[0.025] p-4"
                  >
                    <span className={`shrink-0 text-xl font-black ${t.text}`}>
                      {i + 1}.
                    </span>
                    <p className="text-sm leading-6 text-muted">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </>
      ) : sessions.length === 0 ? (
        /* ── Contenu à venir ──────────────────────────────────────────────── */
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-md border border-white/10 bg-white/[0.025] p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                En cours de rédaction
              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
                Le contenu de cette leçon est en cours de préparation dans l&apos;Académie Kerboeuf.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Pied de page ──────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Continuer
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={subjectHref}
              className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              ← {subject.title}
            </Link>
            <Link
              href="/primaire/cm2/missions"
              className={`rounded-md border ${t.border} ${t.bg} px-4 py-2.5 text-sm font-bold ${t.text} transition hover:opacity-80`}
            >
              Missions CM2
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const sessionTypeLabels: Record<LearningSession["type"], string> = {
  "problem-situation": "Situation-problème",
  lesson: "Cours",
  "guided-practice": "Initiation collective",
  consolidation: "Consolidation",
  assessment: "Évaluation",
};

const sessionPendingLabels: Record<LearningSession["type"], string> = {
  "problem-situation": "Support à venir",
  lesson: "Cours à venir",
  "guided-practice": "Support à venir",
  consolidation: "Support à venir",
  assessment: "Évaluation à venir",
};

function LearningSessionItem({
  session,
  accentText,
}: {
  session: LearningSession;
  accentText: string;
}) {
  const pdfHref =
    getPublicStatusKey(session.status) === "available" ? session.pdfHref : undefined;

  return (
    <li className="rounded-md border border-white/10 bg-white/[0.025] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className={`text-xs font-bold uppercase tracking-[0.18em] ${accentText}`}>
            {session.order}. {sessionTypeLabels[session.type]}
          </p>
          <h3 className="mt-2 text-xl font-black text-foreground">
            {session.title}
          </h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-muted">
            Objectif : {session.goal}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <span className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-bold text-muted">
            {session.duration}
          </span>
          <PublicStatusBadge status={session.status} />
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-muted">{session.summary}</p>

      <div className="mt-5">
        {pdfHref ? (
          <Link
            href={pdfHref}
            className="inline-flex rounded-md border border-jade/30 bg-jade/[0.06] px-3 py-2 text-sm font-bold text-jade transition hover:bg-jade/[0.1]"
          >
            Ouvrir le PDF
          </Link>
        ) : (
          <span className="inline-flex rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-bold text-white/40">
            {sessionPendingLabels[session.type]}
          </span>
        )}
      </div>
    </li>
  );
}
