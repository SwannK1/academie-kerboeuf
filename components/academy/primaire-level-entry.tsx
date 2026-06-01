import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import type { AcademyLevel } from "@/content/academy";
import { publishedSubdomainPages } from "@/content/levels/published-subdomain-pages";
import { getCurriculumSubjectsForLevel } from "@/content/curriculum-map";

const DOMAIN_LABELS: Record<string, string> = {
  francais: "Français",
  mathematiques: "Mathématiques",
  qdm: "Questionner le monde",
};

const SUBDOMAIN_LABELS: Record<string, string> = {
  "lecture-comprehension": "Lecture-compréhension",
  "etude-de-la-langue": "Étude de la langue",
  "nombres-calcul": "Nombres et calcul",
};

type Props = {
  level: AcademyLevel;
};

export function PrimaireLevelEntry({ level }: Props) {
  const slug = level.slug;

  const subjects = getCurriculumSubjectsForLevel(slug);

  const secondaryLinks = [
    {
      label: "Programme",
      href: `/primaire/${slug}/programme`,
    },
    {
      label: "Compétences",
      href: `/primaire/${slug}/competences`,
    },
    {
      label: "Missions",
      href: `/primaire/${slug}/missions`,
    },
    ...(slug === "cp"
      ? [{ label: "Explorer les matières CP", href: "/primaire/cp/matieres" }]
      : []),
  ];

  const resources = publishedSubdomainPages
    .filter((p) => (p.level as string) === slug)
    .map((p) => ({
      subject: DOMAIN_LABELS[p.domain] ?? p.domain,
      label: SUBDOMAIN_LABELS[p.subdomain] ?? p.subdomain,
      description:
        "Index des ressources prévues : leçons, exercices et corrections PDF.",
      href: p.route,
    }));

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: level.label },
            ]}
          />
        </div>
      </div>

      <section className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-jade">
              {level.cycle} · {level.label}
            </span>
          </div>
          <h1 className="mt-5 text-5xl font-black leading-none text-foreground sm:text-6xl">
            {level.label}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            Retrouvez les matières, les compétences et les missions du{" "}
            {level.label}. Le site organise&nbsp;; les PDF enseigneront.
          </p>
        </div>
      </section>

      {/* ── Matières ── */}
      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 border-b border-white/10 pb-4">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Matières du niveau
            </p>
            <h2 className="mt-1.5 text-xl font-black text-foreground">
              Programme par matière
            </h2>
          </div>

          {subjects.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject) => (
                <div
                  key={subject.slug}
                  className="flex flex-col rounded-md border border-white/10 bg-white/[0.04] p-6"
                >
                  <p className="text-lg font-black text-foreground">
                    {subject.label}
                  </p>
                  <p className="mt-1 text-xs font-bold text-muted">
                    {subject.domains.length} domaine
                    {subject.domains.length > 1 ? "s" : ""}
                  </p>
                  <ul className="mt-4 flex flex-col gap-1.5">
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
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                Contenu en préparation
              </p>
              <p className="mt-1 text-sm leading-6 text-muted">
                Les matières de ce niveau sont en cours de structuration.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Accès complémentaires ── */}
      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="border-t border-white/10 pt-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-muted">
              Accès complémentaires
            </p>
            <div className="flex flex-wrap gap-3">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-bold text-muted transition hover:border-white/20 hover:bg-white/[0.06] hover:text-foreground"
                >
                  {link.label}
                  <span className="transition group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {resources.length > 0 && (
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5 border-b border-white/10 pb-4">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                Ressources disponibles
              </p>
              <h2 className="mt-1.5 text-xl font-black text-foreground">
                Premiers contenus publiés
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group flex items-start justify-between gap-4 rounded-md border border-white/10 bg-white/[0.035] p-5 transition hover:border-white/25 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky">
                      {resource.subject}
                    </p>
                    <p className="mt-1 font-black text-foreground">
                      {resource.label}
                    </p>
                    <p className="mt-1.5 text-xs leading-5 text-muted">
                      {resource.description}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-black text-muted transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {resources.length === 0 && (
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                Ressources prévues
              </p>
              <p className="mt-1 text-sm leading-6 text-muted">
                Les ressources PDF de ce niveau sont en cours de préparation.
                Aucun lien n&apos;est affiché tant que la ressource n&apos;existe
                pas.
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
