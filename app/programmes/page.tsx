import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { curriculumLevels } from "@/content/curriculum";

export const metadata: Metadata = {
  title: "Programmes | Académie Kerboeuf",
  description:
    "Architecture pédagogique de l'Académie Kerboeuf, organisée par niveaux, domaines, compétences et missions associées.",
};

type LevelEntry = {
  label: string;
  sublabel?: string;
  cycle: string;
  href: string;
  status: string;
  priority?: boolean;
};

type Group = {
  title: string;
  eyebrow: string;
  description: string;
  levels: LevelEntry[];
};

const levelsBySlug = new Map(curriculumLevels.map((l) => [l.slug, l]));

function entry(
  slug: string,
  href: string,
  opts?: { priority?: boolean; sublabel?: string },
): LevelEntry {
  const level = levelsBySlug.get(
    slug as Parameters<typeof levelsBySlug.get>[0],
  );
  return {
    label: level?.label ?? slug,
    sublabel: opts?.sublabel,
    cycle: level?.cycle ?? "",
    href,
    status: level?.status ?? "à vérifier",
    priority: opts?.priority,
  };
}

const groups: Group[] = [
  {
    title: "Maternelle",
    eyebrow: "Cycle 1",
    description:
      "Les premiers repères de langage, d'exploration et de manipulation.",
    levels: [
      {
        label: "Petite section",
        sublabel: "PS",
        cycle: "Cycle 1",
        href: "/maternelle/ps",
        status: "à vérifier",
      },
      {
        label: "Moyenne section",
        sublabel: "MS",
        cycle: "Cycle 1",
        href: "/maternelle/ms",
        status: "à vérifier",
      },
      {
        label: "Grande section",
        sublabel: "GS",
        cycle: "Cycle 1",
        href: "/maternelle/gs",
        status: "à vérifier",
      },
    ],
  },
  {
    title: "Primaire",
    eyebrow: "Cycles 2 et 3",
    description:
      "Les fondations de lecture, d'écriture, de calcul, de raisonnement et de culture.",
    levels: [
      entry("cp", "/primaire/cp"),
      entry("ce1", "/primaire/ce1"),
      entry("ce2", "/primaire/ce2"),
      entry("cm1", "/primaire/cm1"),
      entry("cm2", "/primaire/cm2", { priority: true }),
    ],
  },
  {
    title: "Collège",
    eyebrow: "Cycles 3 et 4",
    description:
      "La consolidation des méthodes, l'analyse de documents et l'autonomie progressive.",
    levels: [
      entry("6e", "/college/6e", { priority: true }),
      entry("5e", "/college/5e"),
      entry("4e", "/college/4e"),
      entry("3e", "/college/3e"),
    ],
  },
  {
    title: "Lycée",
    eyebrow: "Seconde à Terminale",
    description:
      "L'entrée dans les exercices longs, la problématisation et les stratégies de révision.",
    levels: [
      entry("seconde", "/lycee/seconde", { priority: true }),
      entry("premiere", "/lycee/premiere"),
      entry("terminale", "/lycee/terminale"),
    ],
  },
];

export default function ProgrammesPage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Programmes" }]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(243,196,91,0.16),transparent_34%),linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Alignement pédagogique
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Programmes de l&apos;Académie
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            Les programmes de l&apos;Académie Kerboeuf structurent les apprentissages
            de la maternelle au lycée. Chaque niveau est organisé par domaines,
            compétences, attendus et missions associées.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted/70">
            Les niveaux marqués{" "}
            <span className="rounded border border-jade/40 bg-jade/10 px-1.5 py-0.5 text-xs font-bold uppercase tracking-[0.14em] text-jade">
              Priorité V1
            </span>{" "}
            sont les premiers à être structurés et disponibles.
          </p>

        </div>
      </section>

      <div className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14">
          {groups.map((group) => (
            <section key={group.title}>
              <div className="mb-6 flex flex-col gap-3 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                    {group.eyebrow}
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-foreground">
                    {group.title}
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-muted">
                  {group.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.levels.map((level) => (
                  <LevelCard key={level.href} level={level} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

function LevelCard({ level }: { level: LevelEntry }) {
  return (
    <Link
      href={level.href}
      className="group relative flex flex-col gap-4 rounded-md border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/10 transition hover:border-white/20 hover:bg-white/[0.07]"
    >
      {level.priority ? (
        <span className="absolute right-3 top-3 rounded border border-jade/40 bg-jade/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-jade">
          Priorité V1
        </span>
      ) : null}

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted/60">
          {level.cycle}
        </p>
        <h3 className="mt-1 text-2xl font-black text-foreground group-hover:text-gold transition-colors">
          {level.label}
          {level.sublabel ? (
            <span className="ml-2 text-sm font-bold text-muted/60">
              {level.sublabel}
            </span>
          ) : null}
        </h3>
      </div>

      <PublicStatusBadge status={level.status} />
    </Link>
  );
}
