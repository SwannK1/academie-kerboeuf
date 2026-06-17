import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { getPublicStatusKey } from "@/content/public-status";
import type { AccentTokens } from "@/lib/cm2-accent";

export type MatterSubject = {
  slug: string;
  title: string;
  shortDescription: string;
  domains: string[];
  status: unknown;
  accent: string;
  teacherFocus?: string;
};

export type MatterGuide = {
  id: string;
  name: string;
};

export type MatterTree = {
  place: { label: string };
  guides: MatterGuide[];
  domains: MatterDomain[];
};

export type MatterDomain = {
  id: string;
  title: string;
  zone?: string;
  subdomains: MatterSubdomain[];
};

export type MatterSubdomain = {
  id: string;
  title: string;
  items: MatterItem[];
};

export type MatterItem = {
  id: string;
  title: string;
  description?: string;
  status: unknown;
  href?: string;
};

export type MatterSequence = {
  id: string;
  title: string;
  domain: string;
  subdomain: string;
  skill: string;
  status: unknown;
};

type SubjectIndexPageProps<TSubject extends MatterSubject> = {
  levelLabel: string;
  levelHref: string;
  subjectsHref: string;
  subjects: TSubject[];
  accent: Record<string, AccentTokens>;
  description: string;
  primaryAction?: { href: string; label: string };
};

type SubjectDetailPageProps<TSubject extends MatterSubject> = {
  levelLabel: string;
  levelHref: string;
  subjectsHref: string;
  subject: TSubject;
  tree?: MatterTree;
  accent: Record<string, AccentTokens>;
  sequences: MatterSequence[];
  linkedCards?: LinkedCard[];
  footerLinks: { href: string; label: string; tone?: "gold" | "jade" }[];
  cycleLabel?: string;
  bottomSection?: React.ReactNode;
};

type LinkedCard = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  accentText: string;
  accentBorder: string;
};

export function SubjectIndexPage<TSubject extends MatterSubject>({
  levelLabel,
  levelHref,
  subjectsHref,
  subjects,
  accent,
  description,
  primaryAction,
}: SubjectIndexPageProps<TSubject>) {
  const available = subjects.filter(
    (subject) => getPublicStatusKey(subject.status) === "available",
  );
  const upcoming = subjects.filter(
    (subject) => getPublicStatusKey(subject.status) !== "available",
  );

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

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.03),rgba(9,16,15,0.95))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Programmes {levelLabel}
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Les matières du {levelLabel}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={levelHref}
              className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              ← Retour {levelLabel}
            </Link>
            {primaryAction ? (
              <Link
                href={primaryAction.href}
                className="rounded-md border border-gold/35 bg-gold/10 px-5 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink"
              >
                {primaryAction.label}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <SubjectGridSection
        label="Programmes disponibles"
        title="Matières avec domaines et séquences"
        subjects={available}
        subjectsHref={subjectsHref}
        accent={accent}
      />

      <SubjectGridSection
        label="À structurer"
        title="Matières en attente de ressources"
        subjects={upcoming}
        subjectsHref={subjectsHref}
        accent={accent}
        separated
      />
    </main>
  );
}

export function SubjectDetailPage<TSubject extends MatterSubject>({
  levelLabel,
  levelHref,
  subjectsHref,
  subject,
  tree,
  accent,
  sequences,
  linkedCards = [],
  footerLinks,
  cycleLabel = "Cycle 3",
  bottomSection,
}: SubjectDetailPageProps<TSubject>) {
  const t = accent[subject.accent] ?? accent.gold;
  const sequenceGroups = groupSequences(sequences);

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

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.03),rgba(9,16,15,0.95))]" />
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-2">
            <p
              className={`inline-flex rounded-md border ${t.border} ${t.bg} px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}
            >
              {levelLabel} · {cycleLabel}
            </p>
            <PublicStatusBadge status={subject.status} />
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            {subject.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            {subject.shortDescription}
          </p>

          {tree ? (
            <div className="mt-6 flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center rounded-md border ${t.border} ${t.bg} px-3 py-1.5 text-xs font-bold ${t.text}`}
              >
                {tree.place.label}
              </span>
              {tree.guides.map((guide) => (
                <span
                  key={guide.id}
                  className="inline-flex items-center rounded-md border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-muted"
                >
                  {guide.name}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {tree && tree.domains.length > 0 ? (
        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 border-b border-white/10 pb-5">
              <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
                Structure
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Domaines et sous-domaines
              </h2>
            </div>
            <div className="space-y-5">
              {tree.domains.map((domain) => (
                <DomainBlock key={domain.id} domain={domain} t={t} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-md border border-white/10 bg-white/[0.025] p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                En cours de structuration
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                Les domaines, notions et ressources pour cette matière sont en
                cours de construction dans l&apos;Académie Kerboeuf.
              </p>
            </div>
          </div>
        </section>
      )}

      {linkedCards.length > 0 ? (
        <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
                  Missions
                </p>
                <h2 className="mt-2 text-2xl font-black text-foreground">
                  Missions disponibles en {subject.title}
                </h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {linkedCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className={`group flex flex-col rounded-md border ${card.accentBorder} bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-gold/60`}
                >
                  <p className={`text-xs font-bold uppercase tracking-[0.18em] ${card.accentText}`}>
                    {card.eyebrow}
                  </p>
                  <h3 className="mt-3 text-lg font-black text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                    {card.description}
                  </p>
                  <span className={`mt-4 text-sm font-black transition group-hover:translate-x-1 ${card.accentText}`}>
                    Ouvrir la mission →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {sequenceGroups.length > 0 ? (
        <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 border-b border-white/10 pb-5">
              <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
                1 séquence = 1 compétence
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Séquences-compétences
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Architecture pédagogique · Supports en cours de création.
              </p>
            </div>
            <div className="space-y-6">
              {sequenceGroups.map(({ domain, subdomains }) => (
                <SequenceDomainBlock
                  key={domain}
                  domain={domain}
                  subdomains={subdomains}
                  t={t}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {subject.teacherFocus ? (
        <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                Pour l&apos;enseignant
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                {subject.teacherFocus}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {bottomSection}

      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Aller plus loin
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={subjectsHref}
              className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              ← Toutes les matières
            </Link>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={footerLinkClassName(link.tone)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function SubjectGridSection<TSubject extends MatterSubject>({
  label,
  title,
  subjects,
  subjectsHref,
  accent,
  separated = false,
}: {
  label: string;
  title: string;
  subjects: TSubject[];
  subjectsHref: string;
  accent: Record<string, AccentTokens>;
  separated?: boolean;
}) {
  if (subjects.length === 0) return null;

  return (
    <section
      className={[
        separated ? "border-t border-white/10 py-14" : "pb-14",
        "px-4 sm:px-6 lg:px-8",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl">
        <div className={separated ? "mb-6 pb-5" : "mb-6 border-b border-white/10 pb-5"}>
          <p
            className={[
              "text-xs font-bold uppercase tracking-[0.22em]",
              separated ? "text-muted" : "text-jade",
            ].join(" ")}
          >
            {label}
          </p>
          <h2 className="mt-2 text-2xl font-black text-foreground">{title}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.slug}
              subject={subject}
              href={`${subjectsHref}/${subject.slug}`}
              accent={accent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SubjectCard<TSubject extends MatterSubject>({
  subject,
  href,
  accent,
}: {
  subject: TSubject;
  href: string;
  accent: Record<string, AccentTokens>;
}) {
  const t = accent[subject.accent] ?? accent.gold;
  const isAvailable = getPublicStatusKey(subject.status) === "available";

  return (
    <Link
      href={href}
      className={`group flex min-h-full flex-col rounded-md border p-5 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold/60 ${t.border} bg-white/[0.04] ${t.hoverBorder} ${t.hoverBg}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className={`text-xs font-bold uppercase tracking-[0.18em] ${
            isAvailable ? t.text : "text-muted"
          }`}
        >
          {subject.title}
        </h3>
        <PublicStatusBadge status={subject.status} className="shrink-0" />
      </div>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted">
        {subject.shortDescription}
      </p>

      {subject.domains.length > 0 ? (
        <ul className="mt-4 space-y-1.5" aria-label={`Domaines ${subject.title}`}>
          {subject.domains.map((domain) => (
            <li
              key={domain}
              className="flex items-start gap-2 text-xs leading-5 text-muted"
            >
              <span className="mt-0.5 shrink-0 text-white/30" aria-hidden="true">
                ·
              </span>
              {domain}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <span className={`text-xs font-bold uppercase tracking-[0.12em] ${t.text}`}>
          Voir la structure
        </span>
        <span
          className={`text-xs transition group-hover:translate-x-0.5 ${t.text}`}
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </Link>
  );
}

function DomainBlock({ domain, t }: { domain: MatterDomain; t: AccentTokens }) {
  return (
    <div className={`rounded-md border ${t.border} bg-white/[0.025] p-5`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-xs font-bold uppercase tracking-[0.18em] ${t.text}`}>
            Domaine
          </p>
          <h3 className="mt-1 text-lg font-black text-foreground">{domain.title}</h3>
          {domain.zone ? (
            <p className="mt-1 text-xs text-muted">Zone · {domain.zone}</p>
          ) : null}
        </div>
        <span className="shrink-0 rounded border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-white/35">
          {domain.subdomains.length}&nbsp;sous-domaine
          {domain.subdomains.length > 1 ? "s" : ""}
        </span>
      </div>

      {domain.subdomains.length > 0 ? (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {domain.subdomains.map((subdomain) => (
            <SubdomainItem key={subdomain.id} subdomain={subdomain} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function SubdomainItem({ subdomain }: { subdomain: MatterSubdomain }) {
  return (
    <li className="rounded border border-white/10 bg-white/[0.03] px-3 py-3">
      <h4 className="text-sm font-semibold text-foreground">{subdomain.title}</h4>
      {subdomain.items.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {subdomain.items.map((item) => (
            <li key={item.id} className="flex items-start gap-2 text-xs text-muted">
              <span className="mt-1 shrink-0 text-white/25" aria-hidden="true">
                ·
              </span>
              <div className="min-w-0 flex-1">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="font-semibold text-foreground transition hover:underline"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <p className="font-semibold text-foreground">{item.title}</p>
                )}
                {item.description ? (
                  <p className="mt-0.5 leading-5 text-muted">{item.description}</p>
                ) : null}
              </div>
              <PublicStatusBadge status={item.status} className="shrink-0" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-1 text-xs text-white/30">À structurer</p>
      )}
    </li>
  );
}

function SequenceRow({ sequence }: { sequence: MatterSequence }) {
  return (
    <li className="flex flex-col gap-1 rounded border border-white/10 bg-white/[0.025] px-4 py-3 sm:flex-row sm:items-start sm:gap-4">
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">{sequence.title}</p>
        <p className="mt-0.5 text-xs leading-5 text-muted">{sequence.skill}</p>
      </div>
      <PublicStatusBadge status={sequence.status} className="shrink-0 self-start" />
    </li>
  );
}

function SequenceDomainBlock({
  domain,
  subdomains,
  t,
}: {
  domain: string;
  subdomains: { subdomain: string; sequences: MatterSequence[] }[];
  t: AccentTokens;
}) {
  return (
    <div className={`rounded-md border ${t.border} bg-white/[0.025] p-5`}>
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${t.text}`}>
        Domaine
      </p>
      <h3 className="mt-1 text-lg font-black text-foreground">{domain}</h3>
      <div className="mt-4 space-y-4">
        {subdomains.map(({ subdomain, sequences }) => (
          <div key={subdomain}>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
              {subdomain}
            </h4>
            <ul className="space-y-2">
              {sequences.map((sequence) => (
                <SequenceRow key={sequence.id} sequence={sequence} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function groupSequences(sequences: MatterSequence[]) {
  const domainMap = new Map<string, Map<string, MatterSequence[]>>();
  for (const sequence of sequences) {
    if (!domainMap.has(sequence.domain)) domainMap.set(sequence.domain, new Map());
    const subMap = domainMap.get(sequence.domain)!;
    if (!subMap.has(sequence.subdomain)) subMap.set(sequence.subdomain, []);
    subMap.get(sequence.subdomain)!.push(sequence);
  }
  return Array.from(domainMap.entries()).map(([domain, subMap]) => ({
    domain,
    subdomains: Array.from(subMap.entries()).map(([subdomain, groupedSequences]) => ({
      subdomain,
      sequences: groupedSequences,
    })),
  }));
}

function footerLinkClassName(tone?: "gold" | "jade") {
  if (tone === "gold") {
    return "rounded-md border border-gold/25 bg-gold/[0.05] px-4 py-2.5 text-sm font-bold text-gold transition hover:bg-gold/[0.09] hover:text-gold";
  }
  if (tone === "jade") {
    return "rounded-md border border-jade/25 bg-jade/[0.05] px-4 py-2.5 text-sm font-bold text-jade transition hover:bg-jade/[0.09]";
  }
  return "rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground";
}
