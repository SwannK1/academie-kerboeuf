import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CurriculumMapView } from "@/components/academy/curriculum-map-view";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { getCurriculumMap, getCurriculumMapLevels } from "@/content/curriculum-maps";
import { getCompetenciesForLevel } from "@/content/competencies";
import type { LearningCompetency } from "@/content/learning-architecture-types";

type PageProps = {
  params: Promise<{ level: string }>;
};

const levelLabels: Record<string, { label: string; cycle: string }> = {
  cp:  { label: "CP",  cycle: "Cycle 2" },
  ce1: { label: "CE1", cycle: "Cycle 2" },
  ce2: { label: "CE2", cycle: "Cycle 2" },
  cm1: { label: "CM1", cycle: "Cycle 3" },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getCurriculumMapLevels().map((level) => ({ level }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { level } = await params;
  const info = levelLabels[level];

  if (!info) {
    return { title: "Programme introuvable | Académie Kerboeuf" };
  }

  return {
    title: `Programme complet ${info.label} | Académie Kerboeuf`,
    description: `Cartographie complète des compétences attendues en ${info.label} : matières, domaines, sous-domaines et objectifs observables.`,
  };
}

export default async function PrimaryLevelFullProgramPage({ params }: PageProps) {
  const { level } = await params;

  const map = getCurriculumMap(level);
  if (!map) notFound();

  const info = levelLabels[level] ?? { label: level.toUpperCase(), cycle: "" };
  const competencies = getCompetenciesForLevel(level);

  const competenciesById = competencies.reduce<Record<string, LearningCompetency>>(
    (acc, c) => {
      acc[c.id] = c;
      return acc;
    },
    {},
  );

  const totalCompetencies = map.subjects.reduce(
    (sum, subject) =>
      sum +
      subject.domains.reduce(
        (s, domain) =>
          s + domain.subdomains.reduce((n, sd) => n + sd.competencies.length, 0),
        0,
      ),
    0,
  );

  return (
    <main>
      {/* ── Breadcrumb ── */}
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: info.label, href: `/primaire/${level}` },
              { label: "Programme complet" },
            ]}
          />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-md border border-sky/30 bg-sky/[0.06] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-sky">
              {info.label} · {info.cycle}
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Programme complet — {info.label}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            Le site organise le programme. Les PDF enseigneront les notions en
            détail : leçons, exercices, corrections et supports sont préparés
            progressivement.
          </p>

          {/* ── Compteurs matières ── */}
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-muted">
              <span className="font-black text-foreground">{totalCompetencies}</span>
              compétences attendues
            </span>
            {map.subjects.map((subject) => {
              const count = subject.domains.reduce(
                (sum, d) =>
                  sum + d.subdomains.reduce((s, sd) => s + sd.competencies.length, 0),
                0,
              );
              return (
                <span
                  key={subject.slug}
                  className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-muted"
                >
                  <span className="font-black text-foreground">{count}</span>
                  {subject.label}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Notice pédagogique ── */}
      <section className="border-t border-white/10 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-md border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
              Repère de programme
            </p>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-muted">
              Cette page cartographie les compétences attendues en{" "}
              {info.label}. Elle ne remplace pas les supports pédagogiques. Les
              leçons, exercices et corrections seront disponibles sous forme de
              PDF dès qu&rsquo;ils seront produits. Les ressources{" "}
              <span className="font-bold text-foreground">À venir</span> sont
              planifiées mais pas encore disponibles. Les ressources{" "}
              <span className="font-bold text-foreground">En préparation</span>{" "}
              sont en cours de production.
            </p>
          </div>
        </div>
      </section>

      {/* ── Cartographie ── */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CurriculumMapView
            map={map}
            competenciesById={competenciesById}
          />
        </div>
      </section>

      {/* ── Navigation retour ── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/primaire/${level}`}
              className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
            >
              ← Retour au {info.label}
            </Link>
            <Link
              href={`/primaire/${level}/competences`}
              className="rounded-md border border-sky/25 bg-sky/[0.06] px-4 py-2.5 text-sm font-bold text-sky transition hover:bg-sky/10"
            >
              Compétences observables
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
