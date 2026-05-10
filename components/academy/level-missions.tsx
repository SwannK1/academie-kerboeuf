import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { MissionCatalog } from "@/components/academy/mission-catalog";
import { SubjectBadges } from "@/components/academy/subject-badges";
import { LevelHero } from "@/components/levels/level-hero";
import type { AcademyLevel } from "@/content/academy";
import { getLevelPath, getLevelMissionsPath, stageLabels } from "@/content/academy";
import { getPublicAcademyMission } from "@/content/public-academy";

type LevelMissionsProps = {
  level: AcademyLevel;
};

export function LevelMissions({ level }: LevelMissionsProps) {
  const missionsPath = getLevelMissionsPath(level);
  const professorPath = `/professeurs/${level.professor.slug}`;
  const linkBasePath =
    level.stage === "college" || level.stage === "lycee" || level.slug === "cm2"
      ? missionsPath
      : null;
  const hasMissionDetailPages = Boolean(linkBasePath);
  const publicMissions = level.missions.map((mission) => ({
    ...getPublicAcademyMission(mission),
  }));

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: stageLabels[level.stage], href: `/${level.stage}` },
              { label: level.label, href: getLevelPath(level) },
              { label: "Missions" },
            ]}
          />
        </div>
      </div>

      <LevelHero
        eyebrow="Tableau de missions"
        title={`Missions ${level.label}`}
        description={`Les dossiers de ${level.label} distinguent les missions prêtes, les publications à venir et les contenus encore en préparation.`}
        character={level.professor.name}
        cycle={level.cycle}
      >
        <SubjectBadges subjects={level.subjects.slice(0, 6)} />
      </LevelHero>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
                Catalogue pédagogique
              </p>
              <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
                {level.missions.length} missions structurées
              </h2>
            </div>
            <div className="max-w-xl">
              <p className="text-sm leading-7 text-muted">
                Les cartes restent visibles pour donner une vue claire du
                catalogue, sans afficher de faux contenu pédagogique.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={professorPath}
                  className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-4 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink"
                >
                  Voir {level.professor.name}
                </Link>
                {!hasMissionDetailPages ? (
                  <>
                    <Link
                      href={getLevelPath(level)}
                      className="inline-flex rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-foreground transition hover:border-jade/35 hover:bg-jade/10"
                    >
                      Retour au niveau
                    </Link>
                    <Link
                      href="/ressources"
                      className="inline-flex rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-foreground transition hover:border-sky/35 hover:bg-sky/10"
                    >
                      Ressources
                    </Link>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <MissionCatalog
            missions={publicMissions}
            linkBasePath={linkBasePath}
          />
        </div>
      </section>
    </main>
  );
}
