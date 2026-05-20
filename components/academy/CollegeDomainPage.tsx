import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import type { CurriculumEntry } from "@/content/curriculum-map-types";
import type { ProgramStatus } from "@/content/program-types";
import { getPublicStatusKey } from "@/content/public-status";

const plannedResources = [
  { kind: "lesson-pdf", label: "Leçon PDF" },
  { kind: "exercises-pdf", label: "Exercices PDF" },
  { kind: "correction-pdf", label: "Correction PDF" },
  { kind: "parent-sheet-pdf", label: "Fiche parent" },
  { kind: "projectable-pdf", label: "Support projetable" },
] as const;

type BreadcrumbItem = { label: string; href?: string };

type CollegeDomainPageProps = {
  breadcrumbItems: BreadcrumbItem[];
  cycleLabel: string;
  domainLabel: string;
  officialRef: string;
  description: string;
  status: ProgramStatus;
  entries: CurriculumEntry[];
  backHref: string;
  backLabel: string;
  levelHref: string;
  levelLabel: string;
  subjectLabel?: string;
};

export function CollegeDomainPage({
  breadcrumbItems,
  cycleLabel,
  domainLabel,
  officialRef,
  description,
  status,
  entries,
  backHref,
  backLabel,
  levelHref,
  levelLabel,
  subjectLabel = "6e — Collège",
}: CollegeDomainPageProps) {
  const isUpcoming = getPublicStatusKey(status) === "upcoming";

  const inProgressCount = entries.filter(
    (e) => getPublicStatusKey(e.status) === "in-progress",
  ).length;

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
          <div className="flex flex-wrap items-center gap-3">
            <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
              {cycleLabel}
            </p>
            <PublicStatusBadge status={status} />
          </div>
          <h1 className="mt-6 text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            {domainLabel}
          </h1>
          <p className="mt-3 text-sm font-bold text-jade/80">{officialRef}</p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{description}</p>

          {!isUpcoming && entries.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
                <span className="text-2xl font-black text-jade">{entries.length}</span>
                <span className="text-sm font-bold text-muted">
                  compétence{entries.length > 1 ? "s" : ""} attendue{entries.length > 1 ? "s" : ""}
                </span>
              </div>
              {inProgressCount > 0 && (
                <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
                  <span className="text-2xl font-black text-gold">{inProgressCount}</span>
                  <span className="text-sm font-bold text-muted">en préparation</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {isUpcoming ? (
        /* ── Notice "En préparation" ── */
        <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-8">
              <h2 className="text-xl font-black text-foreground">En préparation</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                Ce domaine est prévu dans l&rsquo;architecture 6e. Les sous-domaines et
                ressources seront ajoutés progressivement.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={backHref}
                  className="rounded-md bg-jade px-4 py-3 text-sm font-bold text-ink transition hover:bg-jade/80"
                >
                  {backLabel}
                </Link>
                <Link
                  href={levelHref}
                  className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
                >
                  {levelLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* ── Compétences attendues ── */}
          <section className="px-4 pb-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
                  Compétences attendues
                </p>
                <h2 className="mt-3 text-3xl font-black text-foreground">
                  Ce que l&rsquo;élève doit pouvoir faire
                </h2>
              </div>

              <div className="grid gap-4">
                {entries.map((entry, index) => (
                  <div
                    key={entry.id}
                    className="rounded-md border border-white/[0.08] bg-white/[0.035] p-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-baseline gap-3">
                        <span className="shrink-0 text-xs font-black text-muted/60">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-base font-black leading-6 text-foreground">
                          {entry.title}
                        </h3>
                      </div>
                      <div className="shrink-0 sm:ml-4">
                        <PublicStatusBadge status={entry.status} />
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-muted">
                      {entry.observableObjective}
                    </p>

                    {entry.successCriteria.length > 0 && (
                      <ul className="mt-4 grid gap-1.5">
                        {entry.successCriteria.map((criterion, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-jade/50"
                            />
                            <span className="leading-6">{criterion}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {entry.officialReference && (
                      <p className="mt-4 text-xs font-bold text-muted/60">
                        {entry.officialReference}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Ressources prévues ── */}
          <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">
                  Ressources prévues
                </p>
                <h2 className="mt-3 text-2xl font-black text-foreground">
                  Outils pédagogiques à venir
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                  Ces ressources sont planifiées pour ce domaine. Aucun lien n&rsquo;est
                  disponible tant que le document n&rsquo;est pas prêt.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {plannedResources.map((resource) => (
                  <div
                    key={resource.kind}
                    className="flex flex-col gap-2 rounded-md border border-white/[0.08] bg-white/[0.025] p-4"
                  >
                    <p className="text-xs font-bold leading-snug text-muted">
                      {resource.label}
                    </p>
                    <PublicStatusBadge status="upcoming" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Navigation retour ── */}
          <section className="px-4 pb-20 pt-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="rounded-md border border-jade/20 bg-jade/[0.045] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
                  {subjectLabel}
                </p>
                <h2 className="mt-2 text-xl font-black text-foreground">
                  Explorer les autres domaines
                </h2>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={backHref}
                    className="rounded-md bg-jade px-4 py-3 text-sm font-bold text-ink transition hover:bg-jade/80"
                  >
                    {backLabel}
                  </Link>
                  <Link
                    href={levelHref}
                    className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
                  >
                    {levelLabel}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
