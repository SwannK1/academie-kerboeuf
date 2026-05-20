import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { CurriculumSubjectPanel } from "@/components/academy/curriculum-subject-panel";
import { getCurriculumLevelMap } from "@/content/curriculum-map";

type PageProps = {
  params: Promise<{ level: string }>;
};

// CP, CE1, CE2 et CM1 branchés.
// "cm2" est intentionnellement absent.
const PROGRAMME_LEVEL_SLUGS = ["cp", "ce1", "ce2", "cm1"] as const;
type ProgrammeLevelSlug = (typeof PROGRAMME_LEVEL_SLUGS)[number];

const levelMeta: Record<ProgrammeLevelSlug, { label: string; cycle: string }> = {
  cp: { label: "CP", cycle: "Cycle 2" },
  ce1: { label: "CE1", cycle: "Cycle 2" },
  ce2: { label: "CE2", cycle: "Cycle 2" },
  cm1: { label: "CM1", cycle: "Cycle 3" },
};

export function generateStaticParams() {
  return PROGRAMME_LEVEL_SLUGS.map((level) => ({ level }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { level } = await params;

  if (!isProgrammeLevelSlug(level)) {
    return { title: "Programme introuvable | Académie Kerboeuf" };
  }

  return {
    title: `Programme complet ${levelMeta[level].label} | Académie Kerboeuf`,
    description: `Carte structurée du programme de ${levelMeta[level].label} par matière, domaine et compétence attendue. Le site organise ; les PDF enseignent.`,
  };
}

export default async function ProgrammePage({ params }: PageProps) {
  const { level } = await params;

  if (!isProgrammeLevelSlug(level)) {
    notFound();
  }

  const meta = levelMeta[level];
  const curriculumLevelMap = getCurriculumLevelMap(level);

  if (!curriculumLevelMap) {
    notFound();
  }

  const totalEntries = curriculumLevelMap.domains.flatMap((d) =>
    d.subdomains.flatMap((sd) => sd.entries),
  ).length;

  return (
    <main>
      <div className="px-4 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: meta.label, href: `/primaire/${level}` },
              { label: "Programme" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-md border border-sky/30 bg-sky/[0.06] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-sky">
              {meta.label} · {meta.cycle}
            </span>
          </div>

          <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight text-foreground sm:text-4xl">
            Programme complet — {meta.label}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
            Carte du programme par matière, domaine et sous-domaine. Les PDF
            seront ajoutés quand ils existeront.
          </p>

          <div className="mt-5">
            <Link
              href={`/primaire/${level}/competences`}
              className="inline-flex rounded-md border border-sky/30 bg-sky/[0.06] px-4 py-2 text-sm font-bold text-sky transition hover:bg-sky/[0.12]"
            >
              Voir les compétences observables →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-col gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky">
                Carte du programme
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                {totalEntries} compétence{totalEntries > 1 ? "s" : ""} attendue
                {totalEntries > 1 ? "s" : ""}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted">
              Chaque carte indique quoi travailler et quelles ressources sont
              prévues.
            </p>
          </div>

          <CurriculumSubjectPanel curriculumLevelMap={curriculumLevelMap} />
        </div>
      </section>
    </main>
  );
}

function isProgrammeLevelSlug(level: string): level is ProgrammeLevelSlug {
  return (PROGRAMME_LEVEL_SLUGS as readonly string[]).includes(level);
}
