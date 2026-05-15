import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { getCm2MissionBySlug } from "@/content/cm2";
import { cm2Subjects, getCm2SubjectBySlug } from "@/content/cm2-subjects";
import {
  getCm2SubjectTree,
  type Cm2DomainNode,
  type Cm2SubdomainNode,
} from "@/content/cm2-learning-tree";

type PageProps = { params: Promise<{ slug: string }> };

// ── Métadonnées ───────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return cm2Subjects.map((s) => ({ slug: s.slug }));
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

// ── Helpers UI ────────────────────────────────────────────────────────────────

type AccentTokens = { text: string; border: string; bg: string };

const ACCENT: Record<string, AccentTokens> = {
  jade:  { text: "text-jade",  border: "border-jade/30",  bg: "bg-jade/10"  },
  gold:  { text: "text-gold",  border: "border-gold/30",  bg: "bg-gold/10"  },
  sky:   { text: "text-sky",   border: "border-sky/30",   bg: "bg-sky/10"   },
  ember: { text: "text-ember", border: "border-ember/30", bg: "bg-ember/10" },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function Cm2SubjectPage({ params }: PageProps) {
  const { slug } = await params;
  const subject = getCm2SubjectBySlug(slug);

  if (!subject) notFound();

  const t = ACCENT[subject.accent];
  const isAvailable = subject.status === "available";

  const tree = getCm2SubjectTree(slug);

  const linkedMissions = (subject.missionSlugs ?? [])
    .map((s) => getCm2MissionBySlug(s))
    .filter((m): m is NonNullable<typeof m> => m !== undefined);

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil",  href: "/"                        },
              { label: "Primaire", href: "/primaire"                },
              { label: "CM2",      href: "/primaire/cm2"            },
              { label: "Matières", href: "/primaire/cm2/matieres"  },
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
            CM2 · Cycle 3
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            {subject.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            {subject.shortDescription}
          </p>

          {/* Lieu + guides */}
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
            </div>
          )}
        </div>
      </section>

      {/* ── Contenu disponible ────────────────────────────────────────────── */}
      {isAvailable ? (
        <>
          {/* Domaines + sous-domaines + leçons */}
          {tree && tree.domains.length > 0 && (
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
          )}

          {/* Missions liées */}
          {linkedMissions.length > 0 && (
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
                  <Link
                    href="/primaire/cm2/missions"
                    className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
                  >
                    Toutes les missions →
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {linkedMissions.map((mission) => (
                    <Link
                      key={mission.slug}
                      href={`/primaire/cm2/missions/${mission.slug}`}
                      className={`group flex flex-col rounded-md border ${mission.theme.ringClass ?? "border-white/10"} bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-gold/60`}
                    >
                      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${mission.theme.textClass}`}>
                        {mission.subject}
                      </p>
                      <h3 className="mt-3 text-lg font-black text-foreground">
                        {mission.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                        {mission.objective}
                      </p>
                      <span className={`mt-4 text-sm font-black transition group-hover:translate-x-1 ${mission.theme.textClass}`}>
                        Ouvrir la mission →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Focus enseignant */}
          {subject.teacherFocus && (
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
          )}
        </>
      ) : (
        /* ── Matière à structurer ─────────────────────────────────────────── */
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-md border border-white/10 bg-white/[0.025] p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                En cours de structuration
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                Les domaines, notions et missions pour cette matière sont en
                cours de construction dans l&apos;Académie Kerboeuf.
              </p>

              {/* Aperçu de l'arbre même pour les matières à venir */}
              {tree && tree.domains.length > 0 && (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {tree.domains.map((domain) => (
                    <li
                      key={domain.id}
                      className="rounded border border-white/10 bg-ink/30 px-4 py-3"
                    >
                      <p className="text-sm font-semibold text-muted">{domain.title}</p>
                      {domain.subdomains.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {domain.subdomains.map((sub) => (
                            <li key={sub.id} className="text-xs text-white/35">
                              · {sub.title}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
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
              href="/primaire/cm2/matieres"
              className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              ← Toutes les matières
            </Link>
            <Link
              href="/primaire/cm2/missions"
              className="rounded-md border border-gold/25 bg-gold/[0.05] px-4 py-2.5 text-sm font-bold text-gold transition hover:bg-gold/[0.09] hover:text-gold"
            >
              Toutes les missions CM2
            </Link>
            <Link
              href="/primaire/cm2/parcours"
              className="rounded-md border border-jade/25 bg-jade/[0.05] px-4 py-2.5 text-sm font-bold text-jade transition hover:bg-jade/[0.09]"
            >
              Parcours de l&apos;année
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// ── Composants ────────────────────────────────────────────────────────────────

function DomainBlock({ domain, t }: { domain: Cm2DomainNode; t: AccentTokens }) {
  return (
    <div className={`rounded-md border ${t.border} bg-white/[0.025] p-5`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-xs font-bold uppercase tracking-[0.18em] ${t.text}`}>
            Domaine
          </p>
          <h3 className="mt-1 text-lg font-black text-foreground">{domain.title}</h3>
          {domain.place?.zone && (
            <p className="mt-1 text-xs text-muted">
              Zone · {domain.place.zone}
            </p>
          )}
        </div>
        <span className="shrink-0 rounded border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-white/35">
          {domain.subdomains.length}&nbsp;sous-domaine{domain.subdomains.length > 1 ? "s" : ""}
        </span>
      </div>

      {domain.subdomains.length > 0 && (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {domain.subdomains.map((sub) => (
            <SubdomainItem key={sub.id} subdomain={sub} />
          ))}
        </ul>
      )}
    </div>
  );
}

function SubdomainItem({ subdomain }: { subdomain: Cm2SubdomainNode }) {
  return (
    <li className="rounded border border-white/10 bg-white/[0.03] px-3 py-3">
      <p className="text-sm font-semibold text-foreground">{subdomain.title}</p>
      {subdomain.lessons.length > 0 ? (
        <ul className="mt-2 space-y-1">
          {subdomain.lessons.map((lesson) => (
            <li key={lesson.id} className="flex items-baseline gap-2 text-xs text-muted">
              <span className="shrink-0 text-white/25" aria-hidden="true">·</span>
              <span className="flex-1">{lesson.title}</span>
              <span className="shrink-0 rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/25">
                à venir
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-1 text-xs text-white/30">À structurer</p>
      )}
    </li>
  );
}
