import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { getPublicStatusKey } from "@/content/public-status";
import type {
  PedagogicalResourceKind,
  ProgramDomain,
  ProgramStatus,
} from "@/content/program-types";

export type SubjectSummary = {
  slug: string;
  title: string;
  shortDescription: string;
  domains: string[];
  status: ProgramStatus;
  accent: string;
};

export type AccentTokens = {
  text: string;
  border: string;
  bg: string;
};

export type SequenceSummary = {
  id: string;
  title: string;
  domain: string;
  subdomain: string;
  skill: string;
  status: ProgramStatus;
  sessions?: Array<{
    id: string;
    title: string;
    status: ProgramStatus;
  }>;
  resourceSlots?: Array<{
    kind: PedagogicalResourceKind;
    label: string;
    status: string;
  }>;
  sessionCount?: number;
  pdfSlotCount?: number;
};

type SubjectIndexPageProps = {
  levelLabel: string;
  levelHref: string;
  subjectsHref: string;
  subjects: SubjectSummary[];
  accent: Record<string, AccentTokens>;
  description: string;
  primaryAction?: {
    href: string;
    label: string;
  };
};

type SubjectDetailPageProps = {
  levelLabel: string;
  levelHref: string;
  subjectsHref: string;
  cycleLabel: string;
  subject: SubjectSummary;
  tree?: ProgramDomain | SubjectTree;
  accent: Record<string, AccentTokens>;
  sequences: SequenceSummary[];
  footerLinks?: Array<{
    href: string;
    label: string;
  }>;
};

type SubjectTree = {
  place?: { label: string };
  guides?: Array<{ id: string; name: string }>;
  domains: Array<{
    id?: string;
    slug?: string;
    title: string;
    description?: string;
    subdomains: Array<{
      id?: string;
      slug?: string;
      title: string;
      items?: Array<{
        id: string;
        title: string;
        description?: string;
        status: ProgramStatus;
      }>;
      competencies?: Array<{
        id?: string;
        slug?: string;
        title: string;
        objective?: string;
        status?: ProgramStatus;
      }>;
      status?: ProgramStatus;
      description?: string;
    }>;
  }>;
};

type TreeSection = {
  id: string;
  title: string;
  subdomains: Array<{
    id: string;
    title: string;
    description?: string;
    status?: ProgramStatus;
    items: Array<{
      id: string;
      title: string;
      description?: string;
      status: ProgramStatus;
    }>;
  }>;
};

export function SubjectIndexPage({
  levelLabel,
  levelHref,
  subjectsHref,
  subjects,
  accent,
  description,
  primaryAction,
}: SubjectIndexPageProps) {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: levelLabel, href: levelHref },
              { label: "Matières" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-jade/30 bg-jade/[0.06] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-jade">
            {levelLabel} · Cycle 2
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Matières {levelLabel}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
            {description}
          </p>
          {primaryAction ? (
            <Link
              href={primaryAction.href}
              className="mt-7 inline-flex rounded-md border border-jade/35 bg-jade/10 px-5 py-3 text-sm font-bold text-jade transition hover:bg-jade hover:text-ink"
            >
              {primaryAction.label}
            </Link>
          ) : null}
        </div>
      </section>

      <section className="border-t border-white/10 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.slug}
              subject={subject}
              href={`${subjectsHref}/${subject.slug}`}
              accent={accent[subject.accent]}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export function SubjectDetailPage({
  levelLabel,
  levelHref,
  subjectsHref,
  cycleLabel,
  subject,
  tree,
  accent,
  sequences,
  footerLinks = [],
}: SubjectDetailPageProps) {
  const tokens = accent[subject.accent];
  const treeSections = tree ? getTreeSections(tree) : [];

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: levelLabel, href: levelHref },
              { label: "Matières", href: subjectsHref },
              { label: subject.title },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-md border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] ${
                tokens ? `${tokens.border} ${tokens.bg} ${tokens.text}` : "border-jade/30 bg-jade/10 text-jade"
              }`}
            >
              {levelLabel} · {cycleLabel}
            </span>
            <PublicStatusBadge status={subject.status} />
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
            {subject.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
            {subject.shortDescription}
          </p>
        </div>
      </section>

      {tree ? (
        <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 border-b border-white/10 pb-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                Domaines et sous-domaines
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Structure de la matière
              </h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {treeSections.flatMap((section) =>
                section.subdomains.map((subdomain) => (
                  <div
                    key={`${section.id}-${subdomain.id}`}
                    className="rounded-md border border-white/10 bg-white/[0.025] p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                          {section.title}
                        </p>
                        <h3 className="mt-2 text-lg font-black text-foreground">
                          {subdomain.title}
                        </h3>
                        {subdomain.description ? (
                          <p className="mt-2 text-sm leading-6 text-muted">
                            {subdomain.description}
                          </p>
                        ) : null}
                      </div>
                      {subdomain.status ? (
                        <PublicStatusBadge
                          status={subdomain.status}
                          className="shrink-0"
                        />
                      ) : null}
                    </div>
                    <ul className="mt-5 grid gap-2" role="list">
                      {subdomain.items.map((item) => (
                        <li
                          key={item.id}
                          className="rounded border border-white/10 bg-ink/25 p-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-bold leading-6 text-foreground">
                              {item.title}
                            </p>
                            <PublicStatusBadge
                              status={item.status}
                              className="shrink-0"
                            />
                          </div>
                          {item.description ? (
                            <p className="mt-1 text-xs leading-5 text-muted">
                              {item.description}
                            </p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                )),
              )}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 border-b border-white/10 pb-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Séquences-compétences
            </p>
            <h2 className="mt-2 text-2xl font-black text-foreground">
              Une séquence par compétence
            </h2>
          </div>

          <div className="grid gap-4">
            {sequences.map((sequence) => (
              <SequenceCard key={sequence.id} sequence={sequence} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          <Link
            href={subjectsHref}
            className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
          >
            Retour aux matières
          </Link>
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md border border-jade/30 bg-jade/[0.05] px-4 py-2.5 text-sm font-bold text-jade transition hover:bg-jade/10"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function getTreeSections(tree: ProgramDomain | SubjectTree): TreeSection[] {
  if ("domains" in tree) {
    return tree.domains.map((domain) => ({
      id: domain.id ?? domain.slug ?? domain.title,
      title: domain.title,
      subdomains: domain.subdomains.map((subdomain) => ({
        id: subdomain.id ?? subdomain.slug ?? subdomain.title,
        title: subdomain.title,
        description: subdomain.description,
        status: subdomain.status,
        items:
          subdomain.items ??
          subdomain.competencies?.map((competency) => ({
            id: competency.id ?? competency.slug ?? competency.title,
            title: competency.title,
            description: competency.objective,
            status: competency.status ?? "upcoming",
          })) ??
          [],
      })),
    }));
  }

  return [
    {
      id: tree.id,
      title: tree.title,
      subdomains: tree.subdomains.map((subdomain) => ({
        id: subdomain.id,
        title: subdomain.title,
        description: subdomain.description,
        status: subdomain.status,
        items: subdomain.lessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          description: lesson.objective,
          status: lesson.status,
        })),
      })),
    },
  ];
}

function SubjectCard({
  subject,
  href,
  accent,
}: {
  subject: SubjectSummary;
  href: string;
  accent?: AccentTokens;
}) {
  const statusKey = getPublicStatusKey(subject.status);
  const isStructured = statusKey === "available" || statusKey === "in-progress";

  return (
    <Link
      href={href}
      className={`group flex min-h-full flex-col rounded-md border p-5 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/30 ${
        isStructured && accent
          ? `${accent.border} bg-white/[0.04] hover:bg-white/[0.07]`
          : "border-white/10 bg-white/[0.025] hover:bg-white/[0.04]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className={`text-xs font-bold uppercase tracking-[0.18em] ${
            isStructured && accent ? accent.text : "text-muted"
          }`}
        >
          {subject.title}
        </p>
        <PublicStatusBadge status={subject.status} className="shrink-0" />
      </div>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted">
        {subject.shortDescription}
      </p>
      <ul className="mt-4 grid gap-1.5" aria-label="Sous-domaines">
        {subject.domains.map((domain) => (
          <li key={domain} className="flex items-start gap-2 text-xs leading-5 text-muted">
            <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-white/30" />
            {domain}
          </li>
        ))}
      </ul>
      <span
        className={`mt-5 border-t border-white/10 pt-3 text-xs font-bold uppercase tracking-[0.12em] transition group-hover:translate-x-0.5 ${
          isStructured && accent ? accent.text : "text-white/35"
        }`}
      >
        Ouvrir la matière
      </span>
    </Link>
  );
}

function SequenceCard({ sequence }: { sequence: SequenceSummary }) {
  return (
    <article className="rounded-md border border-white/10 bg-white/[0.025] p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
            {sequence.domain} · {sequence.subdomain}
          </p>
          <h3 className="mt-2 text-xl font-black text-foreground">
            {sequence.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            Compétence : {sequence.skill}
          </p>
        </div>
        <PublicStatusBadge status={sequence.status} className="shrink-0" />
      </div>

      {sequence.sessions?.length ? (
        <div className="mt-5 rounded border border-white/10 bg-ink/25 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Séances prévues
          </p>
          <ol className="mt-3 grid gap-2">
            {sequence.sessions.map((session) => (
              <li
                key={session.id}
                className="flex items-center justify-between gap-3 rounded border border-white/10 bg-white/[0.025] px-3 py-2"
              >
                <span className="text-sm leading-6 text-muted">{session.title}</span>
                <PublicStatusBadge status={session.status} className="shrink-0" />
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {sequence.resourceSlots?.length ? (
        <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {sequence.resourceSlots.map((slot) => (
            <div
              key={slot.kind}
              className="rounded border border-white/10 bg-ink/30 px-3 py-3"
            >
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                {slot.label}
              </dt>
              <dd className="mt-2">
                <PublicStatusBadge status={slot.status} />
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {!sequence.resourceSlots?.length &&
      (sequence.sessionCount || sequence.pdfSlotCount) ? (
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em] text-muted">
          {sequence.sessionCount ? (
            <span className="rounded border border-white/10 bg-ink/30 px-3 py-2">
              {sequence.sessionCount} séance
              {sequence.sessionCount > 1 ? "s" : ""}
            </span>
          ) : null}
          {sequence.pdfSlotCount ? (
            <span className="rounded border border-white/10 bg-ink/30 px-3 py-2">
              {sequence.pdfSlotCount} slot
              {sequence.pdfSlotCount > 1 ? "s" : ""} PDF
            </span>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
