import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  getLevelMissionsPath,
  getLevelPath,
  stageLabels,
  type AcademyLevel,
  type AcademyMission,
} from "@/content/academy";

type MissionUnavailableNoticeProps = {
  level: AcademyLevel;
  mission: AcademyMission;
};

export function MissionUnavailableNotice({
  level,
  mission,
}: MissionUnavailableNoticeProps) {
  const missionsPath = getLevelMissionsPath(level);
  const professorName = mission.professorName ?? level.professor.name;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: stageLabels[level.stage], href: `/${level.stage}` },
              { label: level.label, href: getLevelPath(level) },
              { label: "Missions", href: missionsPath },
              { label: mission.title },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.08),rgba(9,16,15,0.94))]" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.48fr] lg:items-end">
          <div>
            <p
              className={`inline-flex rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] ${mission.theme.surfaceClass} ${mission.theme.textClass} ${mission.theme.ringClass}`}
            >
              {level.label} · {mission.subject}
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
              {mission.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              Mission en préparation.
            </p>
            <Link
              href={missionsPath}
              className="mt-8 inline-flex rounded-md bg-gold px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
            >
              Retour aux missions {level.label}
            </Link>
          </div>

          <aside className="rounded-md border border-white/12 bg-panel/72 p-5 shadow-2xl shadow-black/35">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Mission en préparation
            </p>
            <div className="mt-5 grid gap-3 text-sm">
              <Meta label="Matière" value={mission.subject} />
              <Meta
                label="Statut"
                value="Mission en préparation"
              />
              <Meta label="Professeur" value={professorName} />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Meta({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.04] p-3">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
        {label}
      </p>
      <div className="mt-2 font-bold text-foreground">{value}</div>
    </div>
  );
}
