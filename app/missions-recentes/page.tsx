import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { allMissions } from "@/content/mission-registry";
import {
  getPublicStatusKey,
  type PublicStatusKey,
} from "@/content/public-status";
import type { Mission, ThemeKey } from "@/content/types";

export const metadata: Metadata = {
  title: "Missions pédagogiques | Académie Kerboeuf",
  description:
    "La vitrine des missions pédagogiques de l’Académie Kerboeuf, classées par statut public et niveau scolaire.",
};

const themeClasses: Record<
  ThemeKey,
  {
    name: string;
    ringClass: string;
    surfaceClass: string;
    textClass: string;
  }
> = {
  jade: {
    name: "Exploration verte",
    ringClass: "border-jade/35",
    surfaceClass: "bg-jade/10",
    textClass: "text-jade",
  },
  gold: {
    name: "Expédition dorée",
    ringClass: "border-gold/35",
    surfaceClass: "bg-gold/10",
    textClass: "text-gold",
  },
  sky: {
    name: "Carte azur",
    ringClass: "border-sky/35",
    surfaceClass: "bg-sky/10",
    textClass: "text-sky",
  },
  ember: {
    name: "Archives braise",
    ringClass: "border-ember/35",
    surfaceClass: "bg-ember/10",
    textClass: "text-ember",
  },
};

const statusSections: {
  key: PublicStatusKey;
  title: string;
  description: string;
}[] = [
  {
    key: "available",
    title: "Missions disponibles",
    description:
      "Séances complètes avec support, questions, correction ou structure exploitable en classe.",
  },
  {
    key: "in-progress",
    title: "Missions en préparation",
    description:
      "Dossiers annoncés pour organiser le catalogue, sans faux contenu pédagogique.",
  },
  {
    key: "upcoming",
    title: "Missions à venir",
    description:
      "Missions prévues dans la progression, visibles pour donner une trajectoire claire.",
  },
];

const classroomUses = [
  "Projeter une consigne claire pour lancer une séance.",
  "Faire chercher les élèves avec un support et des questions progressives.",
  "Utiliser la correction comme moment de méthode et de justification.",
];

const teacherUses = [
  "Repérer rapidement ce qui est prêt, en préparation ou à venir.",
  "Choisir une mission par niveau, matière ou professeur.",
  "Préparer une séance sans afficher de contenu placeholder.",
];

function missionHref(mission: Mission) {
  if (mission.stage === "primaire" && mission.levelSlug !== "cm2") {
    return `/primaire/${mission.levelSlug}/missions`;
  }

  return `/${mission.stage}/${mission.levelSlug}/missions/${mission.slug}`;
}

function MissionShowcaseCard({ mission }: { mission: Mission }) {
  const theme = themeClasses[mission.theme];

  return (
    <Link
      href={missionHref(mission)}
      className={`group flex h-full flex-col rounded-md border bg-white/[0.045] p-5 transition duration-200 hover:-translate-y-1 hover:bg-white/[0.075] ${theme.ringClass}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded bg-white/[0.06] px-2.5 py-1 text-xs font-black uppercase tracking-[0.16em] text-foreground">
          {mission.levelLabel}
        </span>
        <span
          className={`rounded px-2.5 py-1 text-xs font-black uppercase tracking-[0.16em] ${theme.surfaceClass} ${theme.textClass}`}
        >
          {mission.subject}
        </span>
        <PublicStatusBadge status={mission.status} />
      </div>

      <div className="mt-6 flex-1">
        <p
          className={`text-xs font-bold uppercase tracking-[0.22em] ${theme.textClass}`}
        >
          {theme.name}
        </p>
        <h3 className="mt-3 text-2xl font-black leading-tight text-foreground">
          {mission.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-muted">
          {mission.description}
        </p>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm">
        <span className="font-bold text-muted">
          {mission.professor.name}
        </span>
        <span
          className={`font-black transition group-hover:translate-x-1 ${theme.textClass}`}
        >
          Ouvrir →
        </span>
      </div>
    </Link>
  );
}

function UsagePanel({
  title,
  description,
  items,
  accentClass,
}: {
  title: string;
  description: string;
  items: string[];
  accentClass: string;
}) {
  return (
    <article className={`rounded-md border bg-white/[0.045] p-6 ${accentClass}`}>
      <h2 className="text-2xl font-black text-foreground">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function MissionSection({
  title,
  description,
  missions,
}: {
  title: string;
  description: string;
  missions: Mission[];
}) {
  if (missions.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-white/10 pt-10">
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-black text-foreground">{title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
            {description}
          </p>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
          {missions.length} mission{missions.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {missions.map((mission) => (
          <MissionShowcaseCard key={mission.id} mission={mission} />
        ))}
      </div>
    </section>
  );
}

export default function MissionsRecentesPage() {
  const missionsByStatus = statusSections.map((section) => ({
    ...section,
    missions: allMissions.filter(
      (mission) => getPublicStatusKey(mission.status) === section.key,
    ),
  }));

  const availableCount =
    missionsByStatus.find((section) => section.key === "available")?.missions
      .length ?? 0;
  const inProgressCount =
    missionsByStatus.find((section) => section.key === "in-progress")?.missions
      .length ?? 0;
  const upcomingCount =
    missionsByStatus.find((section) => section.key === "upcoming")?.missions
      .length ?? 0;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Missions" },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-30" />
        <div className="map-line absolute left-1/2 top-8 -z-10 h-72 w-[46rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Salle des missions
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
              Missions pédagogiques
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              Une mission est une courte séance guidée : un objectif clair, un
              contexte motivant, une activité, des questions et une correction
              quand le contenu est prêt. Les statuts indiquent franchement ce
              qui est disponible, en préparation ou à venir.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/primaire"
                className="rounded-md bg-gold px-5 py-3 text-sm font-black text-ink transition hover:bg-gold/90"
              >
                Choisir un niveau
              </Link>
              <Link
                href="/primaire/cm2/missions"
                className="rounded-md border border-gold/35 bg-gold/10 px-5 py-3 text-sm font-black text-gold transition hover:bg-gold hover:text-ink"
              >
                Catalogue CM2 — niveau pilote
              </Link>
              <Link
                href="/professeurs"
                className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
              >
                Voir les professeurs
              </Link>
            </div>
          </div>

          <div className="grid gap-3 rounded-md border border-white/10 bg-panel/70 p-5 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
              État du catalogue
            </p>
            <div className="grid grid-cols-3 gap-3">
              <Metric value={availableCount} label="Disponibles" />
              <Metric value={inProgressCount} label="En préparation" />
              <Metric value={upcomingCount} label="À venir" />
            </div>
            <p className="text-xs leading-6 text-muted">
              Une mission incomplète reste classée en préparation ou à venir :
              aucun faux support ni correction fictive n’est présenté comme
              utilisable.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
          <UsagePanel
            title="Pour la classe"
            description="Les missions disponibles sont pensées pour être ouvertes rapidement et utilisées en collectif, en atelier ou en rituel."
            items={classroomUses}
            accentClass="border-jade/30"
          />
          <UsagePanel
            title="Pour préparer"
            description="La vitrine distingue clairement les contenus prêts des dossiers encore en construction."
            items={teacherUses}
            accentClass="border-gold/30"
          />
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12">
          {missionsByStatus.map((section) => (
            <MissionSection
              key={section.key}
              title={section.title}
              description={section.description}
              missions={section.missions}
            />
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-md border border-white/10 bg-white/[0.045] p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
            Continuer l’exploration
          </p>
          <h2 className="mt-4 text-3xl font-black text-foreground">
            Choisir une autre entrée de l’Académie
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/primaire"
              className="rounded-md bg-gold px-5 py-3 text-sm font-black text-ink transition hover:bg-gold/90"
            >
              Choisir un niveau
            </Link>
            <Link
              href="/univers"
              className="rounded-md border border-jade/35 bg-jade/10 px-5 py-3 text-sm font-black text-jade transition hover:bg-jade hover:text-ink"
            >
              Univers
            </Link>
            <Link
              href="/professeurs"
              className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
            >
              Professeurs
            </Link>
            <Link
              href="/ressources"
              className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
            >
              Ressources classe
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-md bg-white/[0.045] p-4">
      <p className="text-3xl font-black text-foreground">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
    </div>
  );
}
