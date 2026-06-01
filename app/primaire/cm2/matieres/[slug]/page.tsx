import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { cm2Subjects, getCm2SubjectBySlug } from "@/content/cm2-subjects";
import {
  getCm2SubjectTree,
  type Cm2DomainNode,
  type Cm2SubdomainNode,
} from "@/content/cm2-learning-tree";
import {
  getCm2SequenceBySlug,
  getCm2SequencesBySubjectSlug,
  type Cm2Sequence,
} from "@/content/cm2-sequences";
import { type AccentTokens, CM2_ACCENT } from "@/lib/cm2-accent";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cm2Subjects.map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const subject = getCm2SubjectBySlug(slug);
  if (!subject) return { title: "Matière introuvable | Académie Kerboeuf" };

  return {
    title: `${subject.title} CM2 | Académie Kerboeuf`,
    description: subject.shortDescription,
  };
}

export default async function Cm2SubjectPage({ params }: PageProps) {
  const { slug } = await params;
  const subject = getCm2SubjectBySlug(slug);

  if (!subject) notFound();

  const tree = getCm2SubjectTree(slug);
  const sequencesByDomainSubdomain = groupSequences(getCm2SequencesBySubjectSlug(slug));
  const t = CM2_ACCENT[subject.accent] ?? CM2_ACCENT.gold;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CM2", href: "/primaire/cm2" },
              { label: "Matières", href: "/primaire/cm2/matieres" },
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
            <p className={`inline-flex rounded-md border ${t.border} ${t.bg} px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
              CM2 · Cycle 3
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
              <span className={`inline-flex items-center rounded-md border ${t.border} ${t.bg} px-3 py-1.5 text-xs font-bold ${t.text}`}>
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
              <p className="mt-2 text-sm leading-6 text-muted">
                Catalogue de planification uniquement : aucune route de leçon,
                aucun contenu détaillé et aucun PDF réel.
              </p>
            </div>
            <div className="space-y-5">
              {tree.domains.map((domain) => (
                <DomainBlock key={domain.id} domain={domain} t={t} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-md border border-white/10 bg-white/[0.025] p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                En cours de structuration
              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
                Cette matière reste planifiée sans contenu détaillé.
              </p>
            </div>
          </div>
        </section>
      )}

      {sequencesByDomainSubdomain.length > 0 ? (
        <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 border-b border-white/10 pb-5">
              <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
                1 séquence = 1 compétence
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Séquences-compétences planifiées
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Chaque séquence contient 4 séances planifiées et 5 slots PDF
                non cliquables.
              </p>
            </div>
            <div className="space-y-6">
              {sequencesByDomainSubdomain.map(({ domain, subdomains }) => (
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

      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/primaire/cm2/matieres"
              className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              ← Toutes les matières
            </Link>
            <Link
              href="/primaire/cm2/sequences"
              className="rounded-md border border-jade/25 bg-jade/[0.05] px-4 py-2.5 text-sm font-bold text-jade transition hover:bg-jade/[0.09]"
            >
              Cartographie des séquences
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function DomainBlock({
  domain,
  t,
}: {
  domain: Cm2DomainNode;
  t: AccentTokens;
}) {
  return (
    <div className={`rounded-md border ${t.border} bg-white/[0.025] p-5`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-xs font-bold uppercase tracking-[0.18em] ${t.text}`}>
            Domaine
          </p>
          <h3 className="mt-1 text-lg font-black text-foreground">{domain.title}</h3>
          {domain.place?.zone ? (
            <p className="mt-1 text-xs text-muted">Zone · {domain.place.zone}</p>
          ) : null}
        </div>
        <span className="shrink-0 rounded border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-white/35">
          {domain.subdomains.length}&nbsp;sous-domaine{domain.subdomains.length > 1 ? "s" : ""}
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

function SubdomainItem({ subdomain }: { subdomain: Cm2SubdomainNode }) {
  const linkedSequences = subdomain.sequenceSlugs
    .map((sequenceSlug) => getCm2SequenceBySlug(sequenceSlug))
    .filter((sequence): sequence is Cm2Sequence => Boolean(sequence));

  return (
    <li className="rounded border border-white/10 bg-white/[0.03] px-3 py-3">
      <p className="text-sm font-semibold text-foreground">{subdomain.title}</p>
      {subdomain.description ? (
        <p className="mt-1 text-xs leading-5 text-muted">{subdomain.description}</p>
      ) : null}
      {subdomain.priorityNotions.length > 0 ? (
        <ul className="mt-3 space-y-1">
          {subdomain.priorityNotions.map((notion) => (
            <li key={notion} className="flex items-baseline gap-2 text-xs text-muted">
              <span className="shrink-0 text-white/25" aria-hidden="true">·</span>
              <span>{notion}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-xs text-white/30">Notions à planifier</p>
      )}
      <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/30">
        {linkedSequences.length} séquence{linkedSequences.length > 1 ? "s" : ""} planifiée{linkedSequences.length > 1 ? "s" : ""}
      </p>
      {linkedSequences.length > 0 ? (
        <ul className="mt-2 space-y-1">
          {linkedSequences.map((sequence) => (
            <li key={sequence.slug} className="text-xs font-semibold text-muted">
              {sequence.title}
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function SequenceRow({ seq }: { seq: Cm2Sequence }) {
  return (
    <li className="rounded border border-white/10 bg-white/[0.025] px-4 py-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">{seq.title}</p>
          <p className="mt-0.5 text-xs leading-5 text-muted">{seq.skill}</p>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/30">
            Notion prioritaire · {seq.priorityNotion}
          </p>
        </div>
        <PublicStatusBadge status={seq.status} className="shrink-0 self-start" />
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
            4 séances planifiées
          </p>
          <ol className="space-y-1.5">
            {seq.sessions.map((session) => (
              <li key={session.order} className="text-xs leading-5 text-muted">
                {session.order}. {session.title}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
            Slots PDF planned
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {seq.pdfSlots.map((slot) => (
              <li
                key={slot.type}
                className="rounded border border-white/10 bg-ink/35 px-2 py-1 text-[10px] font-semibold text-white/35"
              >
                {slot.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

function SequenceDomainBlock({
  domain,
  subdomains,
  t,
}: {
  domain: string;
  subdomains: { subdomain: string; sequences: Cm2Sequence[] }[];
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
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
              {subdomain}
            </p>
            <ul className="space-y-2">
              {sequences.map((seq) => (
                <SequenceRow key={seq.slug} seq={seq} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function groupSequences(sequences: Cm2Sequence[]) {
  const domainMap = new Map<string, Map<string, Cm2Sequence[]>>();

  for (const sequence of sequences) {
    if (!domainMap.has(sequence.domain)) domainMap.set(sequence.domain, new Map());
    const subdomainMap = domainMap.get(sequence.domain)!;
    if (!subdomainMap.has(sequence.subdomain)) subdomainMap.set(sequence.subdomain, []);
    subdomainMap.get(sequence.subdomain)!.push(sequence);
  }

  return Array.from(domainMap.entries()).map(([domain, subdomainMap]) => ({
    domain,
    subdomains: Array.from(subdomainMap.entries()).map(([subdomain, groupedSequences]) => ({
      subdomain,
      sequences: groupedSequences,
    })),
  }));
}
