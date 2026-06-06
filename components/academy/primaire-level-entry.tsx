import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import type { AcademyLevel } from "@/content/academy";
import { publishedSubdomainPages } from "@/content/levels/published-subdomain-pages";
import { getPublicStatusKey } from "@/content/public-status";
import { cpSubjects } from "@/content/cp-subjects";
import { ce1Subjects } from "@/content/ce1-subjects";
import { ce2Subjects } from "@/content/ce2-subjects";
import { cm1Subjects } from "@/content/cm1-subjects";
import type { MatterSubject } from "@/components/academy/SubjectMatterCatalog";

// ── Configuration par niveau ──────────────────────────────────────────────────

type AccentKey = "sky" | "jade" | "gold" | "ember";

type LevelConfig = {
  accent: AccentKey;
  tagline: string;
  heroBadge: string;
};

const LEVEL_CONFIG: Record<string, LevelConfig> = {
  cp: {
    accent: "sky",
    tagline: "CP — Premiers codes, premiers repères",
    heroBadge: "Cycle 2 · Guide : Zoé",
  },
  ce1: {
    accent: "sky",
    tagline: "CE1 — Choisir une stratégie et l'expliquer",
    heroBadge: "Cycle 2 · Guide : Gaston le Hérisson",
  },
  ce2: {
    accent: "sky",
    tagline: "CE2 — Organiser les connaissances",
    heroBadge: "Cycle 2 · Guide : Esteban",
  },
  cm1: {
    accent: "jade",
    tagline: "CM1 — Relier les disciplines, construire les méthodes",
    heroBadge: "Cycle 3 · Guide : Noisette",
  },
};

const ACCENT_CLASSES: Record<AccentKey, { text: string; border: string; bg: string; gradient: string }> = {
  sky: {
    text: "text-sky",
    border: "border-sky/35",
    bg: "bg-sky/10",
    gradient:
      "radial-gradient(circle_at_top_left,rgba(96,165,250,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(80,200,164,0.10),transparent_32%),linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))",
  },
  jade: {
    text: "text-jade",
    border: "border-jade/35",
    bg: "bg-jade/10",
    gradient:
      "radial-gradient(circle_at_top_left,rgba(80,200,164,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.10),transparent_32%),linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))",
  },
  gold: {
    text: "text-gold",
    border: "border-gold/35",
    bg: "bg-gold/10",
    gradient:
      "radial-gradient(circle_at_top_left,rgba(243,196,91,0.17),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(80,200,164,0.12),transparent_32%),linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))",
  },
  ember: {
    text: "text-ember",
    border: "border-ember/35",
    bg: "bg-ember/10",
    gradient:
      "radial-gradient(circle_at_top_left,rgba(251,146,60,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(243,196,91,0.10),transparent_32%),linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))",
  },
};

const SUBJECT_ACCENT: Record<string, { text: string; border: string }> = {
  jade: { text: "text-jade", border: "border-jade/30" },
  gold: { text: "text-gold", border: "border-gold/30" },
  sky: { text: "text-sky", border: "border-sky/30" },
  ember: { text: "text-ember", border: "border-ember/30" },
};

const LEVEL_SUBJECTS: Record<string, MatterSubject[]> = {
  cp: cpSubjects as MatterSubject[],
  ce1: ce1Subjects as MatterSubject[],
  ce2: ce2Subjects as MatterSubject[],
  cm1: cm1Subjects as MatterSubject[],
};

const SUBDOMAIN_LABELS: Record<string, string> = {
  "lecture-comprehension": "Lecture-compréhension",
  "etude-de-la-langue": "Étude de la langue",
  "nombres-calcul": "Nombres et calcul",
};

const DOMAIN_LABELS: Record<string, string> = {
  francais: "Français",
  mathematiques: "Mathématiques",
  qdm: "Questionner le monde",
};

// ── Composant principal ───────────────────────────────────────────────────────

type Props = {
  level: AcademyLevel;
};

export function PrimaireLevelEntry({ level }: Props) {
  const slug = level.slug;
  const config = LEVEL_CONFIG[slug];
  const accentKey: AccentKey = config?.accent ?? "jade";
  const ac = ACCENT_CLASSES[accentKey];
  const subjects = LEVEL_SUBJECTS[slug] ?? [];

  const resources = publishedSubdomainPages
    .filter((p) => (p.level as string) === slug)
    .map((p) => ({
      subject: DOMAIN_LABELS[p.domain] ?? p.domain,
      label: SUBDOMAIN_LABELS[p.subdomain] ?? p.subdomain,
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

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div
          className="absolute inset-0 -z-10"
          style={{ background: ac.gradient }}
        />
        <div className="mx-auto max-w-7xl">
          <p
            className={`inline-flex rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] ${ac.border} ${ac.bg} ${ac.text}`}
          >
            {config?.heroBadge ?? `${level.cycle} · ${level.label}`}
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            {config?.tagline ?? level.label}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            {level.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/primaire/${slug}/matieres`}
              className={`rounded-md border px-5 py-3 text-sm font-bold transition hover:bg-white/10 ${ac.border} ${ac.bg} ${ac.text}`}
            >
              Explorer les matières {level.label}
            </Link>
            <Link
              href="/primaire"
              className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              ← Primaire
            </Link>
          </div>
        </div>
      </section>

      {/* ── Matières ──────────────────────────────────────────────────────── */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className={`text-xs font-bold uppercase tracking-[0.22em] ${ac.text}`}>
                Programmes {level.label} · {level.cycle}
              </p>
              <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
                Matières, domaines et séquences
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                Chaque matière est structurée en domaines et sous-domaines.
                Les séquences s&apos;y rattachent progressivement selon les programmes.
              </p>
            </div>
            <Link
              href={`/primaire/${slug}/matieres`}
              className={`shrink-0 rounded-md border px-4 py-2.5 text-sm font-bold transition ${ac.border} bg-white/[0.04] ${ac.text} hover:bg-white/[0.09]`}
            >
              Voir toutes les matières →
            </Link>
          </div>

          {subjects.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.slug}
                  subject={subject}
                  levelSlug={slug}
                />
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

      {/* ── Navigation rapide ────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Accès direct
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: `Matières ${level.label}`, href: `/primaire/${slug}/matieres`, primary: true },
              { label: "Programme", href: `/primaire/${slug}/programme`, primary: false },
              { label: "Compétences", href: `/primaire/${slug}/competences`, primary: false },
              { label: "Missions", href: `/primaire/${slug}/missions`, primary: false },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-bold transition ${
                  link.primary
                    ? `${ac.border} bg-white/[0.04] ${ac.text} hover:bg-white/[0.09]`
                    : "border-white/10 bg-white/[0.04] text-muted hover:bg-white/[0.08] hover:text-foreground"
                }`}
              >
                {link.label}
                <span className="transition group-hover:translate-x-0.5">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ressources publiées ──────────────────────────────────────────── */}
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
                    <p className={`text-xs font-bold uppercase tracking-[0.16em] ${ac.text}`}>
                      {resource.subject}
                    </p>
                    <p className="mt-1 font-black text-foreground">
                      {resource.label}
                    </p>
                    <p className="mt-1.5 text-xs leading-5 text-muted">
                      Index des ressources prévues : leçons, exercices et corrections PDF.
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
    </main>
  );
}

// ── SubjectCard ───────────────────────────────────────────────────────────────

function SubjectCard({
  subject,
  levelSlug,
}: {
  subject: MatterSubject;
  levelSlug: string;
}) {
  const t = SUBJECT_ACCENT[subject.accent] ?? SUBJECT_ACCENT.jade;
  const isAvailable = getPublicStatusKey(subject.status) === "available";

  return (
    <Link
      href={`/primaire/${levelSlug}/matieres/${subject.slug}`}
      className={`group flex min-h-full flex-col rounded-md border p-5 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-jade/60 ${
        isAvailable
          ? `${t.border} bg-white/[0.04] hover:bg-white/[0.07]`
          : "border-white/10 bg-white/[0.025] hover:bg-white/[0.04]"
      }`}
    >
      <p
        className={`text-xs font-bold uppercase tracking-[0.18em] ${
          isAvailable ? t.text : "text-muted"
        }`}
      >
        {subject.title}
      </p>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted">
        {subject.shortDescription}
      </p>

      {subject.domains.length > 0 ? (
        <ul className="mt-4 space-y-1.5" aria-label="Domaines">
          {subject.domains.slice(0, 4).map((domain) => (
            <li key={domain} className="flex items-start gap-2 text-xs leading-5 text-muted">
              <span className="mt-0.5 shrink-0 text-white/30" aria-hidden="true">·</span>
              {domain}
            </li>
          ))}
          {subject.domains.length > 4 && (
            <li className="text-xs text-white/25">
              +{subject.domains.length - 4} domaine{subject.domains.length - 4 > 1 ? "s" : ""}
            </li>
          )}
        </ul>
      ) : null}

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <span
          className={`text-xs font-bold uppercase tracking-[0.12em] ${
            isAvailable ? t.text : "text-white/25"
          }`}
        >
          {isAvailable ? "Voir les domaines" : "À structurer"}
        </span>
        <span
          className={`text-xs transition group-hover:translate-x-0.5 ${
            isAvailable ? t.text : "text-white/20"
          }`}
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </Link>
  );
}
