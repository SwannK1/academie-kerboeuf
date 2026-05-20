import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import type { AcademyLevel } from "@/content/academy";
import { publishedSubdomainPages } from "@/content/levels/published-subdomain-pages";
import { getCurriculumSubjectsForLevel } from "@/content/curriculum-map";
import {
  getPublicStatusKey,
  type PublicStatusKey,
} from "@/content/public-status";

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

type PrimaryPortalSubject = ReturnType<typeof getCurriculumSubjectsForLevel>[number];

type PortalLink = {
  label: string;
  description: string;
  href: string;
  status: PublicStatusKey;
};

export function PrimaireLevelEntry({ level }: Props) {
  const slug = level.slug;

  const subjects = getCurriculumSubjectsForLevel(slug);

  const secondaryLinks: PortalLink[] = [
    {
      label: "Programme",
      href: `/primaire/${slug}/programme`,
      description: "Vue courte des matières et des attendus du niveau.",
      status: "available",
    },
    {
      label: "Compétences",
      href: `/primaire/${slug}/competences`,
      description: "Repères de cycle pour vérifier ce qui est travaillé.",
      status: "available",
    },
    {
      label: "Missions",
      href: `/primaire/${slug}/missions`,
      description: "Entrée sobre vers les missions publiées ou prévues.",
      status: "available",
    },
  ];

  const resources = publishedSubdomainPages
    .filter((p) => (p.level as string) === slug)
    .map((p) => ({
      subject: DOMAIN_LABELS[p.domain] ?? p.domain,
      label: SUBDOMAIN_LABELS[p.subdomain] ?? p.subdomain,
      description:
        "Catalogue publié des ressources prévues, sans lien PDF fictif.",
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
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-black text-foreground">
                        {subject.label}
                      </p>
                      <p className="mt-1 text-xs font-bold text-muted">
                        {subject.domains.length} domaine
                        {subject.domains.length > 1 ? "s" : ""}
                      </p>
                    </div>
                    <PublicStatusBadge
                      status={getSubjectPortalStatus(subject)}
                      className="shrink-0"
                    />
                  </div>
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
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {secondaryLinks.map((link) => (
                <PortalLinkCard key={link.href} link={link} />
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
                Catalogues publiés
              </p>
              <h2 className="mt-1.5 text-xl font-black text-foreground">
                Premières pages de ressources
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

function getSubjectPortalStatus(subject: PrimaryPortalSubject): PublicStatusKey {
  const statusKeys = subject.domains.flatMap((domain) =>
    domain.subdomains.flatMap((subdomain) =>
      subdomain.competencies.map((competency) =>
        getPublicStatusKey(competency.status),
      ),
    ),
  );

  if (
    statusKeys.some((key) => key === "available" || key === "in-progress")
  ) {
    return "in-progress";
  }

  return "upcoming";
}

function PortalLinkCard({ link }: { link: PortalLink }) {
  const isAvailable = getPublicStatusKey(link.status) === "available";

  const card = (
    <article
      className={`group flex min-h-full flex-col rounded-md border p-5 transition ${
        isAvailable
          ? "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
          : "border-white/10 bg-white/[0.025] opacity-70"
      }`}
      aria-disabled={isAvailable ? undefined : true}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-black text-foreground">{link.label}</p>
        <PublicStatusBadge status={link.status} className="shrink-0" />
      </div>
      <p className="mt-3 flex-1 text-xs leading-5 text-muted">
        {link.description}
      </p>
      {isAvailable ? (
        <span className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-muted transition group-hover:translate-x-1 group-hover:text-foreground">
          Ouvrir →
        </span>
      ) : (
        <span className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">
          Disponible prochainement
        </span>
      )}
    </article>
  );

  if (!isAvailable) {
    return card;
  }

  return (
    <Link
      href={link.href}
      className="block focus:outline-none focus:ring-2 focus:ring-white/30"
    >
      {card}
    </Link>
  );
}
