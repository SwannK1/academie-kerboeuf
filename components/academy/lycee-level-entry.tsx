// Portail d'entrée pour les niveaux lycée (Seconde, Première, Terminale).
// Modèle portail court — même logique que CollegeLevelEntry et PrimaireLevelEntry.
// Le site organise ; les PDF enseignent.
// Une seule route existante liée : /lycee/[slug]/missions.
// Les matières, compétences et ressources sont à venir — aucun lien fictif.

import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import type { AcademyLevel } from "@/content/academy";
import { getAcademyLevelBySlugOnly } from "@/content/academy-curriculum";
import type { ProgramStatus } from "@/content/program-types";

type Props = {
  level: AcademyLevel;
  status: ProgramStatus;
};

// Ressources prévues — aucun href : elles n'existent pas encore.
const COMING_SOON = [
  "Compétences et critères de réussite",
  "Ressources PDF de révision",
  "Supports de méthode et d'orientation",
];

export function LyceeLevelEntry({ level, status }: Props) {
  const slug = level.slug;
  const missionsHref = `/lycee/${slug}/missions`;
  const curriculumLevel = getAcademyLevelBySlugOnly(slug);
  const curriculumSubjects = curriculumLevel?.subjects ?? [];

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Lycée", href: "/lycee" },
              { label: level.label },
            ]}
          />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Lycée · {level.cycle}
            </p>
            <PublicStatusBadge status={status} />
          </div>
          <h1 className="mt-6 text-6xl font-black leading-[0.95] text-foreground sm:text-7xl">
            {level.label}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            {level.description}
          </p>
        </div>
      </section>

      {/* ── Accès disponibles ── */}
      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.22em] text-jade">
            Accès du niveau
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Missions — route existante, toujours liée */}
            <Link
              href={missionsHref}
              className="group flex flex-col rounded-md border border-jade/30 bg-jade/[0.05] p-6 transition hover:-translate-y-0.5 hover:border-jade/50 hover:bg-jade/[0.09]"
            >
              <h2 className="text-xl font-black text-foreground">Missions</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                Missions pédagogiques pour explorer et consolider les
                apprentissages du niveau {level.label}.
              </p>
              <span className="mt-6 inline-flex text-sm font-black text-jade transition group-hover:translate-x-1">
                Voir les missions →
              </span>
            </Link>

            {/* Matières — données depuis academy-curriculum */}
            {curriculumSubjects.length > 0 ? (
              <a
                href="#matieres"
                className="group flex flex-col rounded-md border border-jade/20 bg-jade/[0.04] p-6 transition hover:-translate-y-0.5 hover:border-jade/40 hover:bg-jade/[0.07]"
              >
                <h2 className="text-xl font-black text-foreground">Matières</h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                  {curriculumSubjects.length} matières — domaines et
                  sous-domaines structurés.
                </p>
                <span className="mt-6 inline-flex text-sm font-black text-jade transition group-hover:translate-x-1">
                  Voir les matières ↓
                </span>
              </a>
            ) : (
              <div
                aria-label="Matières du niveau"
                className="flex flex-col rounded-md border border-white/10 bg-white/[0.025] p-6 opacity-60"
              >
                <h2 className="text-xl font-black text-foreground">Matières</h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                  Français, Mathématiques, Sciences, Langues et disciplines du
                  lycée.
                </p>
                <span className="mt-6 inline-flex w-fit rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-muted">
                  À venir
                </span>
              </div>
            )}

            {/* Ressources — à venir, non cliquable */}
            <div
              aria-label="Ressources — à venir"
              className="flex flex-col rounded-md border border-white/10 bg-white/[0.025] p-6 opacity-60"
            >
              <h2 className="text-xl font-black text-foreground">Ressources</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                Fiches méthode, exercices, corrections et supports de révision
                en PDF.
              </p>
              <span className="mt-6 inline-flex w-fit rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-muted">
                À venir
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Matières et domaines (academy-curriculum) ── */}
      {curriculumSubjects.length > 0 && (
        <section id="matieres" className="px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 border-b border-white/10 pb-4">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
                Programme {level.label}
              </p>
              <h2 className="mt-1.5 text-2xl font-black text-foreground">
                Matières et domaines
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {curriculumSubjects.map((subject) => (
                <div
                  key={subject.slug}
                  className="flex flex-col rounded-md border border-white/10 bg-white/[0.04] p-5"
                >
                  <p className="text-sm font-black text-foreground">
                    {subject.label}
                  </p>
                  <p className="mt-1 text-xs font-bold text-muted">
                    {subject.domains.length} domaine
                    {subject.domains.length !== 1 ? "s" : ""}
                  </p>
                  {subject.domains.length > 0 && (
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {subject.domains.map((domain) => (
                        <li
                          key={domain.slug}
                          className="flex items-center gap-2 text-xs text-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="size-1.5 shrink-0 rounded-full bg-jade/40"
                          />
                          {domain.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── En préparation ── */}
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-md border border-white/10 bg-white/[0.025] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              En préparation
            </p>
            <p className="mt-2 text-sm font-bold text-foreground">
              Aucun lien avant disponibilité réelle
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {COMING_SOON.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-white/25"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Retour ── */}
      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/lycee"
            className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
          >
            ← Retour Lycée
          </Link>
        </div>
      </section>
    </main>
  );
}
