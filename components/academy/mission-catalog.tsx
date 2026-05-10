"use client";

import { useMemo, useState } from "react";
import { MissionCard } from "@/components/missions/mission-card";
import type { PublicAcademyMission } from "@/content/public-academy";
import {
  getPublicStatusKey,
  type PublicStatusKey,
} from "@/content/public-status";

type MissionCatalogProps = {
  missions: PublicAcademyMission[];
  linkBasePath?: string | null;
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

export function MissionCatalog({ missions, linkBasePath }: MissionCatalogProps) {
  const subjects = useMemo(
    () => ["Toutes", ...Array.from(new Set(missions.map((mission) => mission.subject)))],
    [missions],
  );
  const [selectedSubject, setSelectedSubject] = useState("Toutes");

  const filteredMissions =
    selectedSubject === "Toutes"
      ? missions
      : missions.filter((mission) => mission.subject === selectedSubject);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <button
              key={subject}
              type="button"
              aria-pressed={selectedSubject === subject}
              onClick={() => setSelectedSubject(subject)}
              className={`rounded-md px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 ${
                selectedSubject === subject
                  ? "bg-gold text-ink"
                  : "border border-white/15 bg-white/[0.04] text-muted hover:bg-white/[0.08] hover:text-foreground"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
          {filteredMissions.length} mission
          {filteredMissions.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-8">
        {missionStatusSections.map((section) => {
          const sectionMissions = filteredMissions.filter(
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
    </div>
  );
}
