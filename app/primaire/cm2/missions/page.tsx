import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { LevelHero } from "@/components/levels/level-hero";
import { MissionGrid } from "@/components/missions/mission-grid";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { TeacherDashboard } from "@/components/cm2/teacher-dashboard";
import type { MissionCardData } from "@/components/missions/mission-card";
import { cm2Level, cm2Missions, type Cm2Mission } from "@/content/cm2";
import { felixProjects } from "@/content/felix-missions";
import {
  getPublicStatusKey,
  getPublicStatusLabel,
  type PublicStatusKey,
} from "@/content/public-status";

export const metadata: Metadata = {
  title: "Missions CM2 | Académie Kerboeuf",
  description:
    "Vitrine pédagogique complète des missions CM2 de Félix : lecture, écriture, mathématiques, sciences, histoire-géographie et méthode.",
};

const domainSections: {
  title: string;
  description: string;
  slugs: string[];
}[] = [
  {
    title: "Lecture et compréhension",
    description:
      "Lire finement, repérer les indices et justifier une réponse avec le texte.",
    slugs: ["mission-inference", "lecture-strategique"],
  },
  {
    title: "Étude de la langue",
    description:
      "Observer la phrase, identifier les groupes et expliquer une analyse grammaticale.",
    slugs: ["enquete-grammaticale"],
  },
  {
    title: "Production d’écrit",
    description:
      "Planifier, rédiger, améliorer et relire un texte court avec une méthode claire.",
    slugs: ["production-ecrit"],
  },
  {
    title: "Mathématiques",
    description:
      "Calculer avec stratégie, choisir une démarche et vérifier une réponse.",
    slugs: ["mission-calcul", "defis-mathematiques"],
  },
  {
    title: "Sciences",
    description:
      "Observer, formuler une hypothèse et distinguer ce qui est vu de ce qui est expliqué.",
    slugs: ["laboratoire-scientifique"],
  },
  {
    title: "Histoire-Géographie",
    description:
      "Lire des documents, comprendre des traces du passé et utiliser les cartes pour organiser l’espace.",
    slugs: ["archives-historiques", "cartographe-du-monde"],
  },
];

const audienceCards = [
  {
    title: "Pour les élèves",
    text: "Chaque mission donne un rôle clair : lire comme un détective, calculer avec méthode, écrire pour transmettre ou explorer un document.",
    accent: "border-jade/30 text-jade",
  },
  {
    title: "Pour les parents",
    text: "Les statuts, les objectifs et les compétences permettent de comprendre rapidement ce qui est travaillé en CM2.",
    accent: "border-gold/30 text-gold",
  },
  {
    title: "Pour les enseignants",
    text: "Les séances sont pensées pour être projetées, imprimées, lancées en rituel ou utilisées en atelier guidé.",
    accent: "border-sky/30 text-sky",
  },
];

const projectStatusSummary: PublicStatusKey[] = [
  "available",
  "upcoming",
  "in-progress",
];

function toMissionCardData(mission: Cm2Mission): MissionCardData {
  return {
    ...mission,
    skill: mission.curriculumCompetency ?? mission.competencies[0],
    difficulty: mission.cycle ?? mission.officialLevel,
    professorName: cm2Level.character,
    associatedCharacter: "CM2",
  };
}

function missionsForSlugs(slugs: string[]) {
  return slugs
    .map((slug) => cm2Missions.find((mission) => mission.slug === slug))
    .filter((mission): mission is Cm2Mission => Boolean(mission))
    .map(toMissionCardData);
}

function hasProjectionAndPrint(mission: Cm2Mission) {
  return Boolean(
    mission.teacherUse?.includes("projection") &&
      mission.teacherUse.includes("impression"),
  );
}

export default function Cm2MissionsPage() {
  const availableMissions = cm2Missions.filter(
    (mission) => getPublicStatusKey(mission.status) === "available",
  );
  const projectionPrintMissions = cm2Missions.filter(hasProjectionAndPrint);

  return (
    <main className="cm2-catalog-print">
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CM2", href: "/primaire/cm2" },
              { label: "Missions" },
            ]}
          />
        </div>
      </div>

      <LevelHero
        eyebrow="Vitrine pédagogique CM2"
        title="Missions CM2 avec Félix"
        description="La première vitrine complète de l’Académie Kerboeuf : des missions organisées par domaines, lisibles pour les élèves, les parents et les enseignants, avec des supports pensés pour la classe."
        character={cm2Level.character}
        cycle="Cycle 3 · CM2"
      />

      <section className="cm2-print-hide px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {audienceCards.map((card) => (
              <article
                key={card.title}
                className={`rounded-md border bg-white/[0.045] p-5 ${card.accent.split(" ")[0]}`}
              >
                <h2 className={`text-xl font-black ${card.accent.split(" ")[1]}`}>
                  {card.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">{card.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-3 rounded-md border border-white/10 bg-panel/65 p-5 sm:grid-cols-4">
            <Metric value={cm2Missions.length} label="missions CM2" />
            <Metric value={felixProjects.length} label="projets Félix" />
            <Metric value={availableMissions.length} label="disponibles" />
            <Metric
              value={projectionPrintMissions.length}
              label="projection + impression"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/missions-recentes"
              className="rounded-md bg-gold px-5 py-3 text-sm font-black text-ink transition hover:bg-gold/90"
            >
              Voir toutes les missions
            </Link>
            <Link
              href="/univers"
              className="rounded-md border border-jade/35 bg-jade/10 px-5 py-3 text-sm font-black text-jade transition hover:bg-jade hover:text-ink"
            >
              Comprendre l’univers
            </Link>
            <Link
              href="/professeurs"
              className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
            >
              Voir les professeurs
            </Link>
          </div>
        </div>
      </section>

      <div className="cm2-print-hide">
        <TeacherDashboard missions={cm2Missions} projects={felixProjects} />
      </div>

      {/* Projets Félix enrichis */}
      <section className="cm2-print-section px-4 pb-16 sm:px-6 lg:px-8" aria-labelledby="felix-projects-title">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
                Projets transversaux Félix
              </p>
              <h2 id="felix-projects-title" className="mt-3 text-3xl font-black text-foreground">
                Les 9 projets enrichis de Félix
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                Chaque projet intègre compétences observables, critères de réussite, différenciation, supports imprimables et projectables, évaluation et restitution.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {projectStatusSummary.map((statusKey) => {
                const count = felixProjects.filter(
                  (project) => getPublicStatusKey(project.status) === statusKey,
                ).length;
                return count > 0 ? (
                  <span
                    key={statusKey}
                    className="rounded border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-muted"
                  >
                    {count} {getPublicStatusLabel(statusKey)}
                  </span>
                ) : null;
              })}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {felixProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/primaire/cm2/missions/${project.slug}`}
                className={`group flex min-h-full flex-col rounded-md border bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:bg-white/[0.07] ${project.theme.ringClass}`}
              >
                <div className={`mb-4 h-1 rounded-full ${project.theme.accentClass}`} aria-hidden="true" />
                <div className="flex items-start justify-between gap-3">
                  <p className={`text-xs font-bold uppercase tracking-[0.18em] ${project.theme.textClass}`}>
                    {project.mainSubject}
                  </p>
                  <PublicStatusBadge status={project.status} />
                </div>
                <h3 className="mt-3 text-xl font-black text-foreground">{project.title}</h3>
                <p className="mt-1 text-sm font-medium text-muted">{project.subtitle}</p>
                <p className="mt-3 flex-1 text-xs leading-6 text-muted line-clamp-3">
                  {project.synopsis}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs font-bold text-muted">
                    {project.duration}
                  </span>
                  <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs font-bold text-muted">
                    {project.skills.length} compétences
                  </span>
                </div>
                <span className={`mt-4 text-sm font-bold transition group-hover:translate-x-1 ${project.theme.textClass}`}>
                  Ouvrir le projet →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cm2-print-section px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-md border border-gold/25 bg-gold/[0.055] p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
                Prêtes pour la classe
              </p>
              <h2 className="mt-3 text-3xl font-black text-foreground">
                Missions disponibles à projeter et à imprimer
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
                Ces missions affichent un statut public disponible et possèdent
                des indications de projection et d’impression. Elles peuvent
                servir de modèle pour les prochaines séances CM2.
              </p>
            </div>
            <Link
              href="/primaire/cm2/parcours"
              className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-5 py-3 text-sm font-black text-gold transition hover:bg-gold hover:text-ink"
            >
              Voir le parcours CM2
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {availableMissions.map((mission) => (
              <Link
                key={mission.slug}
                href={`/primaire/cm2/missions/${mission.slug}`}
                className={`rounded-md border bg-ink/35 p-4 transition hover:-translate-y-1 hover:bg-white/[0.06] ${mission.theme.ringClass}`}
              >
                <p
                  className={`text-xs font-bold uppercase tracking-[0.16em] ${mission.theme.textClass}`}
                >
                  {mission.subject}
                </p>
                <h3 className="mt-2 text-lg font-black text-foreground">
                  {mission.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-xs leading-6 text-muted">
                  {mission.objective}
                </p>
                <p className="mt-3 text-xs font-bold text-gold">
                  Ouvrir la séance →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cm2-print-section px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
                Catalogue par domaine
              </p>
              <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
                Une progression CM2 lisible
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted">
              Chaque carte affiche le titre, l’objectif, la compétence, le
              statut public et le lien vers la mission détaillée.
            </p>
          </div>

          <div className="grid gap-12">
            {domainSections.map((section) => {
              const missions = missionsForSlugs(section.slugs);

              if (missions.length === 0) {
                return null;
              }

              return (
                <section key={section.title} className="border-t border-white/10 pt-8">
                  <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                      <h3 className="text-2xl font-black text-foreground">
                        {section.title}
                      </h3>
                      <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
                        {section.description}
                      </p>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                      {missions.length} mission{missions.length > 1 ? "s" : ""}
                    </p>
                  </div>
                  <MissionGrid
                    missions={missions}
                    linkBasePath="/primaire/cm2/missions"
                  />
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.045] p-4">
      <p className="text-3xl font-black text-foreground">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
    </div>
  );
}
