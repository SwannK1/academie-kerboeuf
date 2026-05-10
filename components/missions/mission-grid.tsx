import { MissionCard, type MissionCardData } from "@/components/missions/mission-card";
import {
  getPublicStatusKey,
  type PublicStatusKey,
} from "@/content/public-status";

type MissionGridProps = {
  missions: MissionCardData[];
  linkBasePath?: string | null;
  groupByStatus?: boolean;
};

const missionStatusSections: {
  key: PublicStatusKey;
  title: string;
  description: string;
}[] = [
  {
    key: "available",
    title: "Missions disponibles",
    description: "Contenus prêts à ouvrir et à utiliser.",
  },
  {
    key: "upcoming",
    title: "À venir",
    description: "Missions visibles au catalogue, publication complète à venir.",
  },
  {
    key: "in-progress",
    title: "En préparation",
    description: "Dossiers annoncés sans contenu pédagogique finalisé.",
  },
];

export function MissionGrid({
  missions,
  linkBasePath,
  groupByStatus = false,
}: MissionGridProps) {
  if (groupByStatus) {
    return (
      <div className="grid gap-8">
        {missionStatusSections.map((section) => {
          const sectionMissions = missions.filter(
            (mission) => getPublicStatusKey(mission.status) === section.key,
          );

          if (sectionMissions.length === 0) {
            return null;
          }

          return (
            <section key={section.key}>
              <div className="mb-4 flex flex-col gap-1 border-b border-white/10 pb-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-xl font-black text-foreground">
                    {section.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {section.description}
                  </p>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                  {sectionMissions.length} mission
                  {sectionMissions.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {sectionMissions.map((mission, index) => (
                  <MissionCard
                    key={mission.slug}
                    mission={mission}
                    index={index}
                    linkBasePath={linkBasePath}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {missions.map((mission, index) => (
        <MissionCard
          key={mission.slug}
          mission={mission}
          index={index}
          linkBasePath={linkBasePath}
        />
      ))}
    </div>
  );
}
