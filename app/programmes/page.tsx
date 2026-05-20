import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  curriculumLevels,
  type CurriculumLevel,
} from "@/content/curriculum";
import { sanitizePublicPedagogicalItems } from "@/content/public-sanitization";

export const metadata: Metadata = {
  title: "Programmes | Académie Kerboeuf",
  description:
    "Architecture pédagogique de l’Académie Kerboeuf, organisée par niveaux, domaines, compétences et missions associées.",
};

const groups: {
  title: string;
  eyebrow: string;
  description: string;
  slugs: CurriculumLevel["slug"][];
}[] = [
  {
    title: "Maternelle",
    eyebrow: "Cycle 1",
    description: "Les premiers repères de langage, d’exploration et de manipulation.",
    slugs: ["maternelle"],
  },
  {
    title: "Élémentaire",
    eyebrow: "Cycles 2 et 3",
    description: "Les fondations de lecture, d’écriture, de calcul, de raisonnement et de culture.",
    slugs: ["cp", "ce1", "ce2", "cm1", "cm2"],
  },
  {
    title: "Collège",
    eyebrow: "Cycle 3 et Cycle 4",
    description: "La consolidation des méthodes, l’analyse de documents et l’autonomie progressive.",
    slugs: ["6e", "5e", "4e", "3e"],
  },
  {
    title: "Lycée",
    eyebrow: "Seconde à Terminale",
    description: "L’entrée dans les exercices longs, la problématisation et les stratégies de révision.",
    slugs: ["seconde", "premiere", "terminale"],
  },
];

export default function ProgrammesPage() {
  const levelsBySlug = new Map(
    curriculumLevels.map((level) => [level.slug, level]),
  );
  const missionCount = curriculumLevels.reduce(
    (total, level) => total + level.missionLinks.length,
    0,
  );
  const pathCount = curriculumLevels.reduce(
    (total, level) => total + level.learningPathLinks.length,
    0,
  );

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
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.68fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Alignement pédagogique
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
              Programmes de l’Académie
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              Les programmes de l’Académie Kerboeuf structurent les
              apprentissages de la maternelle au lycée. Chaque niveau est
              organisé par domaines, compétences, attendus et missions
              associées.
            </p>
          </div>

          <aside className="rounded-md border border-white/12 bg-panel/72 p-5 shadow-2xl shadow-black/35">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Vue pédagogique
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <Metric value={curriculumLevels.length} label="niveaux" />
              <Metric value={missionCount} label="missions" />
              <Metric value={pathCount} label="parcours" />
            </div>
          </aside>
        </div>
      </section>

      <div className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12">
          {groups.map((group) => {
            const levels = group.slugs
              .map((slug) => levelsBySlug.get(slug))
              .filter((level): level is CurriculumLevel => Boolean(level));

            if (levels.length === 0) {
              return null;
            }

            return (
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

                <div className="grid gap-4 xl:grid-cols-2">
                  {levels.map((level) => (
                    <CurriculumCard key={level.slug} level={level} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-md border border-white/10 bg-white/[0.035] p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
            Continuer l&apos;exploration
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/ressources"
              className="rounded-md bg-gold px-5 py-3 text-sm font-black text-ink transition hover:bg-gold/90"
            >
              Toutes les ressources
            </Link>
            <Link
              href="/parcours"
              className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
            >
              Parcours progressifs
            </Link>
            <Link
              href="/missions-recentes"
              className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
            >
              Missions récentes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function CurriculumCard({ level }: { level: CurriculumLevel }) {
  return (
    <article className="rounded-md border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
            {level.cycle}
          </p>
          <h3 className="mt-2 text-3xl font-black text-foreground">
            {level.label}
          </h3>
        </div>
        <PublicStatusBadge status={level.status} />
      </div>

      <div className="mt-6 grid gap-5">
        <TagSection
          title="Matières principales"
          items={sanitizePublicPedagogicalItems(level.mainSubjects)}
        />
        <TagSection
          title="Grands domaines"
          items={sanitizePublicPedagogicalItems(level.majorDomains)}
        />
        <ListSection
          title="Compétences principales"
          items={sanitizePublicPedagogicalItems(level.coreCompetencies)}
        />
        <ListSection
          title="Attendus ou objectifs"
          items={sanitizePublicPedagogicalItems(level.expectedOutcomes)}
        />

        {level.missionLinks.length > 0 ? (
          <LinkSection
            title="Missions liées"
            links={level.missionLinks.map((mission) => ({
              title: mission.title,
              subtitle: mission.subject,
              href: mission.href,
            }))}
          />
        ) : null}

        {level.learningPathLinks.length > 0 ? (
          <LinkSection
            title="Parcours liés"
            links={level.learningPathLinks.map((path) => ({
              title: path.title,
              subtitle: path.subject,
              href: path.href,
            }))}
          />
        ) : null}

        <ListSection
          title="Notes pédagogiques"
          items={sanitizePublicPedagogicalItems(level.verificationNotes)}
        />
      </div>
    </article>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.04] p-4">
      <p className="font-mono text-3xl font-black text-gold">{value}</p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
    </div>
  );
}

function TagSection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;

  return (
    <section>
      <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
        {title}
      </h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.1em] text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;

  return (
    <section>
      <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
        {title}
      </h4>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded border border-white/10 bg-ink/35 p-3 text-sm leading-6 text-muted"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function LinkSection({
  title,
  links,
}: {
  title: string;
  links: { title: string; subtitle: string; href: string }[];
}) {
  if (links.length === 0) return null;

  return (
    <section>
      <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
        {title}
      </h4>
      <div className="mt-3 grid gap-2">
        {links.map((link) => (
          <Link
            key={`${link.href}-${link.title}`}
            href={link.href}
            className="rounded border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-muted transition hover:border-gold/30 hover:text-foreground"
          >
            <span className="font-bold text-foreground">{link.title}</span>
            <span className="block text-xs uppercase tracking-[0.12em] text-muted">
              {link.subtitle}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
