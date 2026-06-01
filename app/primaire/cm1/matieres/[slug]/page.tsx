import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { cm1Subjects, getCm1SubjectBySlug } from "@/content/cm1-subjects";
import {
  getCm1SubjectTree,
  type Cm1DomainNode,
  type Cm1SubdomainNode,
  type Cm1SequenceNode,
} from "@/content/cm1-learning-tree";
import { type AccentTokens, CM1_ACCENT } from "@/lib/cm1-accent";

type PageProps = { params: Promise<{ slug: string }> };

// ── Métadonnées ───────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return cm1Subjects.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const subject = getCm1SubjectBySlug(slug);
  if (!subject) return { title: "Matière introuvable | Académie Kerboeuf" };
  return {
    title: `${subject.title} CM1 | Académie Kerboeuf`,
    description: subject.shortDescription,
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function Cm1SubjectPage({ params }: PageProps) {
  const { slug } = await params;
  const subject = getCm1SubjectBySlug(slug);

  if (!subject) notFound();

  const t = CM1_ACCENT[subject.accent] ?? CM1_ACCENT.gold;
  const tree = getCm1SubjectTree(slug);

  const totalSequences = tree?.domains.flatMap((d) =>
    d.subdomains.flatMap((s) => s.sequences),
  ).length ?? 0;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil",  href: "/"                        },
              { label: "Primaire", href: "/primaire"                },
              { label: "CM1",      href: "/primaire/cm1"            },
              { label: "Matières", href: "/primaire/cm1/matieres"  },
              { label: subject.title                                 },
            ]}
          />
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.03),rgba(9,16,15,0.95))]" />
        <div className="mx-auto max-w-7xl">
          <p className={`inline-flex rounded-md border ${t.border} ${t.bg} px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
            CM1 · Cycle 3
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            {subject.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            {subject.shortDescription}
          </p>

          {/* Méta : lieu + guides + séquences */}
          {tree && (
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
              {totalSequences > 0 && (
                <span className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-white/40">
                  {totalSequences} séquence{totalSequences > 1 ? "s" : ""}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Focus enseignant ──────────────────────────────────────────────── */}
      {(subject.yearlyPathLabel ?? subject.teacherFocus) && (
        <section className="px-4 pb-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className={`rounded-md border ${t.border} bg-white/[0.025] p-6`}>
              {subject.yearlyPathLabel && (
                <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
                  {subject.yearlyPathLabel}
                </p>
              )}
              {subject.teacherFocus && (
                <p className="mt-2 text-sm leading-7 text-muted">
                  {subject.teacherFocus}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Domaines, sous-domaines et séquences ──────────────────────────── */}
      {tree && tree.domains.length > 0 && (
        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 border-b border-white/10 pb-5">
              <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
                1 séquence = 1 compétence
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Structure de la matière
              </h2>
            </div>
            <div className="space-y-5">
              {tree.domains.map((domain) => (
                <DomainBlock key={domain.id} domain={domain} t={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Pied de page ──────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Aller plus loin
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/primaire/cm1/matieres"
              className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              ← Toutes les matières CM1
            </Link>
            <Link
              href="/primaire/cm1"
              className="rounded-md border border-gold/25 bg-gold/[0.05] px-4 py-2.5 text-sm font-bold text-gold transition hover:bg-gold/[0.09]"
            >
              Vue d&apos;ensemble CM1
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// ── Composants ────────────────────────────────────────────────────────────────

function DomainBlock({ domain, t }: { domain: Cm1DomainNode; t: AccentTokens }) {
  const totalSeq = domain.subdomains.reduce((n, s) => n + s.sequences.length, 0);
  return (
    <div className={`rounded-md border ${t.border} bg-white/[0.025] p-5`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-xs font-bold uppercase tracking-[0.18em] ${t.text}`}>
            Domaine
          </p>
          <h3 className="mt-1 text-lg font-black text-foreground">{domain.title}</h3>
          {domain.description && (
            <p className="mt-1 text-xs leading-5 text-muted">{domain.description}</p>
          )}
        </div>
        <span className="shrink-0 rounded border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-white/35">
          {domain.subdomains.length}&nbsp;sous-domaine{domain.subdomains.length > 1 ? "s" : ""}
          {" · "}
          {totalSeq}&nbsp;séq.
        </span>
      </div>

      {domain.subdomains.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {domain.subdomains.map((sub) => (
            <SubdomainBlock key={sub.id} subdomain={sub} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}

function SubdomainBlock({
  subdomain,
  t,
}: {
  subdomain: Cm1SubdomainNode;
  t: AccentTokens;
}) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.03] px-3 py-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-foreground">{subdomain.title}</p>
        <PublicStatusBadge status={subdomain.status} className="shrink-0" />
      </div>
      {subdomain.sequences.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {subdomain.sequences.map((seq) => (
            <SequenceRow key={seq.id} seq={seq} t={t} />
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-xs text-white/30">À structurer</p>
      )}
    </div>
  );
}

function SequenceRow({ seq, t }: { seq: Cm1SequenceNode; t: AccentTokens }) {
  return (
    <li className="rounded border border-white/10 bg-white/[0.025] px-3 py-2.5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold text-foreground">{seq.title}</p>
        <PublicStatusBadge status={seq.status} className="shrink-0" />
      </div>
      <p className={`mt-1 text-[11px] leading-4 ${t.text} opacity-80`}>
        {seq.competency}
      </p>
    </li>
  );
}
