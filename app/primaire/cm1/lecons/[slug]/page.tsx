import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { cm1Level } from "@/content/levels/cm1";
import { getPublicStatusKey } from "@/content/public-status";
import type {
  ExerciseDifficulty,
  Lesson,
  ProgramDomain,
  ProgramSubdomain,
} from "@/content/program-types";

// ── Types ─────────────────────────────────────────────────────────────────────

type PageProps = {
  params: Promise<{ slug: string }>;
};

type LessonContext = {
  domain: ProgramDomain;
  subdomain: ProgramSubdomain;
  lesson: Lesson;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function findLessonContext(slug: string): LessonContext | null {
  for (const domain of cm1Level.domains) {
    for (const subdomain of domain.subdomains) {
      const lesson = subdomain.lessons.find((l) => l.slug === slug);
      if (lesson) return { domain, subdomain, lesson };
    }
  }
  return null;
}

const DIFFICULTY_LABELS: Record<ExerciseDifficulty, string> = {
  decouverte:        "Découverte",
  entrainement:      "Entraînement",
  approfondissement: "Approfondissement",
};

const DIFFICULTY_COLORS: Record<ExerciseDifficulty, string> = {
  decouverte:        "border-jade/30 bg-jade/[0.06] text-jade",
  entrainement:      "border-gold/30 bg-gold/[0.06] text-gold",
  approfondissement: "border-ember/30 bg-ember/[0.06] text-ember",
};

// ── Static generation ─────────────────────────────────────────────────────────

export function generateStaticParams() {
  return cm1Level.domains
    .flatMap((d) => d.subdomains)
    .flatMap((s) => s.lessons)
    .filter((l) => getPublicStatusKey(l.status) === "available")
    .map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ctx = findLessonContext(slug);
  if (!ctx) return { title: "Leçon introuvable | Académie Kerboeuf" };
  return {
    title: `${ctx.lesson.title} – CM1 | Académie Kerboeuf`,
    description: ctx.lesson.objective,
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function Cm1LessonPage({ params }: PageProps) {
  const { slug } = await params;
  const ctx = findLessonContext(slug);
  if (!ctx) notFound();

  const { domain, subdomain, lesson } = ctx;

  return (
    <main>
      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Breadcrumb
            items={[
              { label: "Accueil",  href: "/"                     },
              { label: "Primaire", href: "/primaire"             },
              { label: "CM1",      href: "/primaire/cm1"         },
              { label: "Leçons",   href: "/primaire/cm1/lecons"  },
              { label: lesson.title },
            ]}
          />
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-md border border-sky/30 bg-sky/[0.06] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-sky">
              {domain.title} · CM1
            </span>
            <span className="inline-flex rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-muted">
              Cycle 3
            </span>
            <span className="inline-flex rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-muted">
              {subdomain.title}
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            {lesson.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            {lesson.objective}
          </p>
        </div>
      </section>

      {/* ── Compétence travaillée ─────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky">
            Compétence travaillée
          </p>
          <h2 className="mt-2 text-xl font-black text-foreground">
            Ce que j&apos;apprends à faire
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            {lesson.skill}
          </p>
        </div>
      </section>

      {/* ── Critères de réussite ──────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky">
            Critères de réussite
          </p>
          <h2 className="mt-2 text-xl font-black text-foreground">
            Je réussis quand…
          </h2>
          <ul className="mt-6 space-y-3" role="list">
            {lesson.successCriteria.map((criterion) => (
              <li
                key={criterion}
                className="flex items-start gap-4 rounded-md border border-white/10 bg-white/[0.025] p-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border border-sky/40 bg-sky/[0.06]"
                />
                <span className="text-sm leading-6 text-muted">
                  {criterion}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Exercices ─────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky">
            Je m&apos;entraîne
          </p>
          <h2 className="mt-2 text-xl font-black text-foreground">
            Exercices progressifs
          </h2>

          <div className="mt-6 space-y-8">
            {lesson.exercises.map((exercise, i) => {
              const diffLabel =
                DIFFICULTY_LABELS[exercise.difficulty] ?? exercise.difficulty;
              const diffColor =
                DIFFICULTY_COLORS[exercise.difficulty] ??
                "border-white/10 bg-white/[0.04] text-muted";

              return (
                <div
                  key={exercise.id}
                  className="rounded-md border border-white/10 bg-white/[0.025] p-6"
                >
                  {/* En-tête exercice */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted">
                      Exercice {i + 1}
                    </span>
                    <span
                      className={`inline-flex rounded border px-2.5 py-1 text-xs font-bold ${diffColor}`}
                    >
                      {diffLabel}
                    </span>
                  </div>

                  {/* Consigne */}
                  <p className="mt-5 text-base font-semibold leading-7 text-foreground">
                    {exercise.instruction}
                  </p>

                  {/* Zone de travail */}
                  <div className="mt-5 rounded border border-dashed border-white/20 p-5 print:border-white/40">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
                      Ma réponse
                    </p>
                    <div className="space-y-3">
                      <div className="h-8 border-b border-white/10 print:border-white/30" />
                      <div className="h-8 border-b border-white/10 print:border-white/30" />
                      <div className="h-8 border-b border-white/10 print:border-white/30" />
                    </div>
                  </div>

                  {/* Correction — masquée à l'impression */}
                  <details className="mt-4 print:hidden">
                    <summary className="cursor-pointer select-none text-xs font-semibold text-muted transition hover:text-foreground">
                      Voir la correction
                    </summary>
                    <div className="mt-3 rounded-md border border-sky/20 bg-sky/[0.04] p-4">
                      <p className="text-sm leading-6 text-muted">
                        {exercise.validation}
                      </p>
                    </div>
                  </details>

                  {/* Correction — visible uniquement à l'impression */}
                  <div className="mt-4 hidden print:block">
                    <p className="text-xs font-semibold text-muted">
                      Correction :
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {exercise.validation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Guide parental ────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky">
            Pour les familles
          </p>
          <h2 className="mt-2 text-xl font-black text-foreground">
            Guide parental
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            {lesson.parentGuidance.summary}
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {lesson.parentGuidance.quickTips.length > 0 && (
              <div className="rounded-md border border-white/10 bg-white/[0.025] p-5">
                <h3 className="text-sm font-bold text-foreground">
                  Conseils pratiques
                </h3>
                <ul className="mt-3 space-y-2.5" role="list">
                  {lesson.parentGuidance.quickTips.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-2.5 text-sm leading-6 text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky"
                      />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {lesson.parentGuidance.successSigns.length > 0 && (
              <div className="rounded-md border border-white/10 bg-white/[0.025] p-5">
                <h3 className="text-sm font-bold text-foreground">
                  Signes de réussite
                </h3>
                <ul className="mt-3 space-y-2.5" role="list">
                  {lesson.parentGuidance.successSigns.map((sign) => (
                    <li
                      key={sign}
                      className="flex items-start gap-2.5 text-sm leading-6 text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky"
                      />
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Noisette ──────────────────────────────────────────────────────── */}
      {lesson.characterLink && lesson.characterLink.roleHint && (
        <section className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8 print:hidden">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-md border border-sky/20 bg-sky/[0.04] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky">
                {lesson.characterLink.name} dit…
              </p>
              <p className="mt-2 text-sm italic leading-6 text-muted">
                &laquo;&nbsp;{lesson.characterLink.roleHint}&nbsp;&raquo;
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8 print:hidden">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Continuer
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/primaire/cm1/lecons"
              className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              ← Leçons CM1
            </Link>
            <Link
              href="/primaire"
              className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              Primaire
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
