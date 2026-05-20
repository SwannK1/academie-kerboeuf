import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getPublicStatusKey } from "@/content/public-status";
import type { CollegeSubdomainCard } from "@/content/college-curriculum";

type BreadcrumbItem = { label: string; href?: string };

type CollegeSubjectPortalProps = {
  breadcrumbItems: BreadcrumbItem[];
  cycleLabel: string;
  subjectLabel: string;
  subtitle?: string;
  description: string;
  domainsHeading: string;
  subdomains: CollegeSubdomainCard[];
  levelHref: string;
  levelLabel: string;
};

export function CollegeSubjectPortal({
  breadcrumbItems,
  cycleLabel,
  subjectLabel,
  subtitle,
  description,
  domainsHeading,
  subdomains,
  levelHref,
  levelLabel,
}: CollegeSubjectPortalProps) {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* ── En-tête ── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            {cycleLabel}
          </p>
          <h1 className="mt-6 text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            {subjectLabel}
          </h1>
          {subtitle && (
            <p className="mt-4 text-2xl font-black text-gold">{subtitle}</p>
          )}
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{description}</p>
        </div>
      </section>

      {/* ── Domaines ── */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
              Domaines du programme
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground">{domainsHeading}</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {subdomains.map((subdomain) => {
              const isLinked = !!subdomain.href && getPublicStatusKey(subdomain.status) !== "upcoming";

              const cardInner = (
                <div
                  className={`group flex h-full flex-col rounded-md border p-6 transition ${
                    isLinked
                      ? "border-jade/30 bg-jade/[0.05] hover:-translate-y-0.5 hover:bg-jade/[0.09]"
                      : "border-white/10 bg-white/[0.035]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-black text-foreground">{subdomain.label}</h3>
                    <div className="shrink-0">
                      <PublicStatusBadge status={subdomain.status} />
                    </div>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted">{subdomain.description}</p>
                  {isLinked ? (
                    <span className="mt-5 inline-flex text-sm font-black text-jade transition group-hover:translate-x-1">
                      Accéder au domaine →
                    </span>
                  ) : (
                    <span className="mt-5 inline-flex w-fit rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-muted">
                      À venir
                    </span>
                  )}
                </div>
              );

              if (isLinked) {
                return (
                  <Link
                    key={subdomain.subdomainSlug}
                    href={subdomain.href!}
                    aria-label={`Accéder au domaine ${subjectLabel} : ${subdomain.label}`}
                  >
                    {cardInner}
                  </Link>
                );
              }

              return (
                <div
                  key={subdomain.subdomainSlug}
                  aria-label={`Domaine à venir : ${subdomain.label}`}
                >
                  {cardInner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Navigation ── */}
      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-md border border-jade/20 bg-jade/[0.045] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">Collège</p>
            <h2 className="mt-2 text-xl font-black text-foreground">{levelLabel}</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={levelHref}
                className="rounded-md bg-jade px-4 py-3 text-sm font-bold text-ink transition hover:bg-jade/80"
              >
                Retour au niveau
              </Link>
              <Link
                href="/college"
                className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
              >
                Collège
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
