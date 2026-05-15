import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { getCm2SubjectBySlug } from "@/content/cm2-subjects";
import {
  getAllCm2LessonPaths,
  getCm2DomainById,
  getCm2LessonByRouteSlug,
  getCm2SubdomainById,
} from "@/content/cm2-learning-tree";
import { CM2_ACCENT } from "@/lib/cm2-accent";

type PageProps = {
  params: Promise<{
    slug: string;
    domainId: string;
    subdomainId: string;
    lessonId: string;
  }>;
};

// ── Static generation ─────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllCm2LessonPaths().map((p) => ({
    slug: p.subjectSlug,
    domainId: p.domainId,
    subdomainId: p.subdomainId,
    lessonId: p.lessonId,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, domainId, subdomainId, lessonId } = await params;
  const lesson = getCm2LessonByRouteSlug(slug, domainId, subdomainId, lessonId);
  if (!lesson) return { title: "Leçon introuvable | Académie Kerboeuf" };
  const subject = getCm2SubjectBySlug(slug);
  return {
    title: `${lesson.title} – ${subject?.title ?? "CM2"} | Académie Kerboeuf`,
    description: lesson.description,
  };
}

// ── Hardcoded pilot content ───────────────────────────────────────────────────

type LessonSection = { heading: string; body: string };
type LessonExample = { label: string; text: string; inference: string };

type LessonContent = {
  intro: string;
  retiens: LessonSection[];
  examplesTitle: string;
  exemples: LessonExample[];
  entrainement: string[];
};

const LESSON_CONTENT: Record<string, LessonContent> = {
  "reperer-les-indices": {
    intro:
      "Pour comprendre un texte, il ne suffit pas de lire les mots. Il faut aussi lire entre les lignes : repérer les petits indices cachés qui donnent des informations que l'auteur n'a pas écrites directement.",
    retiens: [
      {
        heading: "Qu'est-ce qu'un indice ?",
        body: "Un indice, c'est un mot, une expression ou une description qui nous aide à comprendre quelque chose qui n'est pas écrit clairement dans le texte.",
      },
      {
        heading: "Où trouver les indices ?",
        body: "Les indices peuvent être des mots de description (adjectifs, adverbes), des actions des personnages, des détails sur le lieu ou le moment, ou encore le ton de la narration.",
      },
      {
        heading: "Comment utiliser les indices ?",
        body: "On repère l'indice, on réfléchit à ce qu'il suggère, puis on relie plusieurs indices ensemble pour déduire une information. C'est comme une enquête !",
      },
    ],
    examplesTitle: "Comment repérer les indices ?",
    exemples: [
      {
        label: "Exemple 1",
        text: "\"Il frissonna, remonta son col et pressa le pas.\"",
        inference:
          "→ Les indices « frissonna » et « remonta son col » nous permettent de déduire qu'il fait froid dehors, même si le mot « froid » n'est pas écrit.",
      },
      {
        label: "Exemple 2",
        text: "\"Les yeux brillants, elle courut vers le sapin décoré.\"",
        inference:
          "→ Les indices « yeux brillants » et « sapin décoré » suggèrent que c'est Noël et que le personnage est heureux ou excité.",
      },
    ],
    entrainement: [
      "Lis chaque phrase et souligne les mots qui sont des indices.",
      "Pour chaque indice repéré, note ce qu'il te permet de comprendre.",
      "Essaie de formuler ton inférence en une phrase complète.",
    ],
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function Cm2LessonPage({ params }: PageProps) {
  const { slug, domainId, subdomainId, lessonId } = await params;

  const lesson = getCm2LessonByRouteSlug(slug, domainId, subdomainId, lessonId);
  if (!lesson) notFound();

  const subject = getCm2SubjectBySlug(slug);
  if (!subject) notFound();

  const domain = getCm2DomainById(slug, domainId);
  const subdomain = getCm2SubdomainById(slug, domainId, subdomainId);
  if (!domain || !subdomain) notFound();

  const t = CM2_ACCENT[subject.accent] ?? CM2_ACCENT.gold;
  const content = LESSON_CONTENT[lessonId];

  const subjectHref = `/primaire/cm2/matieres/${slug}`;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil",     href: "/"                           },
              { label: "Primaire",    href: "/primaire"                   },
              { label: "CM2",         href: "/primaire/cm2"               },
              { label: "Matières",    href: "/primaire/cm2/matieres"      },
              { label: subject.title, href: subjectHref                   },
              { label: domain?.title ?? domainId, href: subjectHref       },
              { label: subdomain?.title ?? subdomainId, href: subjectHref },
              { label: lesson.title                                        },
            ]}
          />
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.03),rgba(9,16,15,0.95))]" />
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex rounded-md border ${t.border} ${t.bg} px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
              {subject.title} · CM2
            </span>
            {domain && (
              <span className="inline-flex rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-muted">
                {domain.title}
              </span>
            )}
            {subdomain && (
              <span className="inline-flex rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-muted">
                {subdomain.title}
              </span>
            )}
          </div>
          <h1 className="mt-6 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            {lesson.title}
          </h1>
          {content && (
            <p className="mt-6 text-lg leading-8 text-muted">{content.intro}</p>
          )}
        </div>
      </section>

      {content ? (
        <>
          {/* ── Je retiens ──────────────────────────────────────────────── */}
          <section className="px-4 pb-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className={`mb-6 border-b ${t.border} pb-4`}>
                <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
                  Je retiens
                </p>
                <h2 className="mt-2 text-2xl font-black text-foreground">
                  L&apos;essentiel à connaître
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {content.retiens.map((item) => (
                  <div
                    key={item.heading}
                    className={`rounded-md border ${t.border} ${t.bg} p-5`}
                  >
                    <p className={`text-sm font-black ${t.text}`}>{item.heading}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Exemples guidés ─────────────────────────────────────────── */}
          <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 border-b border-white/10 pb-4">
                <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
                  Exemple guidé
                </p>
                <h2 className="mt-2 text-2xl font-black text-foreground">
                  {content.examplesTitle}
                </h2>
              </div>
              <div className="space-y-4">
                {content.exemples.map((ex) => (
                  <div
                    key={ex.label}
                    className="rounded-md border border-white/10 bg-white/[0.025] p-5"
                  >
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted">
                      {ex.label}
                    </p>
                    <p className="text-base font-semibold leading-7 text-foreground">
                      {ex.text}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted">{ex.inference}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Je m'entraîne ───────────────────────────────────────────── */}
          <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 border-b border-white/10 pb-4">
                <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
                  Je m&apos;entraîne
                </p>
                <h2 className="mt-2 text-2xl font-black text-foreground">
                  Méthode pas à pas
                </h2>
              </div>
              <ol className="space-y-3">
                {content.entrainement.map((step, i) => (
                  <li
                    key={`${lessonId}-${i}`}
                    className="flex gap-4 rounded-md border border-white/10 bg-white/[0.025] p-4"
                  >
                    <span className={`shrink-0 text-xl font-black ${t.text}`}>
                      {i + 1}.
                    </span>
                    <p className="text-sm leading-6 text-muted">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </>
      ) : (
        /* ── Contenu à venir ──────────────────────────────────────────────── */
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-md border border-white/10 bg-white/[0.025] p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                En cours de rédaction
              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
                Le contenu de cette leçon est en cours de préparation dans l&apos;Académie Kerboeuf.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Pied de page ──────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Continuer
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={subjectHref}
              className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              ← {subject.title}
            </Link>
            <Link
              href="/primaire/cm2/missions"
              className={`rounded-md border ${t.border} ${t.bg} px-4 py-2.5 text-sm font-bold ${t.text} transition hover:opacity-80`}
            >
              Missions CM2
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
