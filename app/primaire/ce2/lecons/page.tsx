import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { ce2Level } from "@/content/levels/ce2";
import { getPublicStatusKey } from "@/content/public-status";
import type { Lesson, ProgramDomain, ProgramSubdomain } from "@/content/program-types";

// ── Types ─────────────────────────────────────────────────────────────────────

type LessonEntry = {
  lesson: Lesson;
  domain: ProgramDomain;
  subdomain: ProgramSubdomain;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function collectAvailableLessons(): LessonEntry[] {
  const entries: LessonEntry[] = [];
  for (const domain of ce2Level.domains) {
    for (const subdomain of domain.subdomains) {
      for (const lesson of subdomain.lessons) {
        if (getPublicStatusKey(lesson.status) === "available") {
          entries.push({ lesson, domain, subdomain });
        }
      }
    }
  }
  return entries;
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Leçons CE2 | Académie Kerboeuf",
  description:
    "Catalogue des leçons disponibles en CE2 — Cycle 2. Objectifs, compétences et exercices progressifs.",
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Ce2LessonsIndexPage() {
  const entries = collectAvailableLessons();

  return (
    <main>
      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Breadcrumb
            items={[
              { label: "Accueil",  href: "/"             },
              { label: "Primaire", href: "/primaire"     },
              { label: "CE2",      href: "/primaire/ce2" },
              { label: "Leçons" },
            ]}
          />
        </div>
      </div>

      {/* ── En-tête ───────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-md border border-jade/30 bg-jade/[0.06] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-jade">
              CE2 · Cycle 2
            </span>
          </div>
          <h1 className="mt-6 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Leçons CE2
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Prévisualisation des leçons disponibles en CE2. Chaque leçon propose
            un objectif clair, une compétence travaillée et des exercices
            progressifs.
          </p>
        </div>
      </section>

      {/* ── Catalogue ─────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {entries.length === 0 ? (
            <div className="rounded-md border border-white/10 bg-white/[0.025] p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                Aucune leçon disponible
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                Les leçons CE2 sont en cours de préparation. Revenez bientôt.
              </p>
            </div>
          ) : (
            <ul className="space-y-6" role="list">
              {entries.map(({ lesson, domain, subdomain }) => (
                <li key={lesson.id}>
                  <Link
                    href={`/primaire/ce2/lecons/${lesson.slug}`}
                    className="group block rounded-md border border-white/10 bg-white/[0.025] p-6 transition hover:border-jade/30 hover:bg-white/[0.04]"
                  >
                    {/* Domaine / Sous-domaine */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex rounded border border-jade/25 bg-jade/[0.05] px-2.5 py-1 text-xs font-bold text-jade">
                        {domain.title}
                      </span>
                      <span className="text-xs text-muted">/</span>
                      <span className="text-xs font-semibold text-muted">
                        {subdomain.title}
                      </span>
                    </div>

                    {/* Titre */}
                    <h2 className="mt-4 text-xl font-black text-foreground transition-colors group-hover:text-jade">
                      {lesson.title}
                    </h2>

                    {/* Objectif */}
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {lesson.objective}
                    </p>

                    {/* Compétence */}
                    <p className="mt-3 text-sm leading-6 text-muted">
                      <span className="font-semibold text-foreground">
                        Compétence :&nbsp;
                      </span>
                      {lesson.skill}
                    </p>

                    {/* Méta */}
                    <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4">
                      <span className="text-xs text-muted">
                        {lesson.exercises.length}{" "}
                        {lesson.exercises.length > 1 ? "exercices" : "exercice"}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 rounded-full bg-white/20"
                      />
                      <span className="ml-auto text-xs font-semibold text-jade opacity-0 transition-opacity group-hover:opacity-100">
                        Voir la leçon →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Continuer
          </p>
          <Link
            href="/primaire/ce2"
            className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
          >
            ← CE2
          </Link>
        </div>
      </section>
    </main>
  );
}
