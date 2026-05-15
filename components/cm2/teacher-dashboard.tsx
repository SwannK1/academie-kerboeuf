import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import type { Cm2Mission } from "@/content/cm2";
import type { LearningMission } from "@/content/felix-types";

type TeacherDashboardProps = {
  missions: Cm2Mission[];
  projects: LearningMission[];
};

type TeacherItem = {
  family: "Mission courte" | "Projet enrichi";
  slug: string;
  title: string;
  href: string;
  status: Cm2Mission["status"] | LearningMission["status"];
  discipline: string;
  competency: string;
  objective: string;
  levelCycle: string;
  criteria: string[];
  evidence?: string;
  studentUse?: string;
  projection?: string;
  printing?: string;
  lsuLinks?: string[];
  crossLinks?: string[];
  quality?: string;
};

const progressionStates = [
  "Repéré",
  "En cours de consolidation",
  "Maîtrisé dans la mission",
  "Transféré dans une mission nouvelle",
];

const lsuScale = [
  "Non atteints",
  "Partiellement atteints",
  "Atteints",
  "Dépassés",
];

function formatList(items: string[], limit = 2) {
  if (items.length <= limit) {
    return items;
  }

  return [...items.slice(0, limit), `+${items.length - limit} autre(s)`];
}

function toMissionItem(mission: Cm2Mission): TeacherItem {
  return {
    family: "Mission courte",
    slug: mission.slug,
    title: mission.title,
    href: `/primaire/cm2/missions/${mission.slug}`,
    status: mission.status,
    discipline: mission.curriculumDomain ?? mission.subject,
    competency: mission.curriculumCompetency ?? mission.competencies[0],
    objective: mission.curriculumObjective ?? mission.objective,
    levelCycle: [mission.officialLevel, mission.cycle].filter(Boolean).join(" · "),
    criteria: mission.pedagogy.successCriteria ?? [],
    evidence: mission.pedagogy.shortWrittenTrace
      ? "Trace écrite courte et réponses justifiées"
      : undefined,
    studentUse: mission.studentUse,
    projection: mission.pedagogy.usage?.projection,
    printing: mission.pedagogy.usage?.printing,
    quality: mission.pedagogy.progressStatus
      ? `${mission.pedagogy.progressStatus.state} · ${mission.pedagogy.progressStatus.detail}`
      : undefined,
  };
}

function toProjectItem(project: LearningMission): TeacherItem {
  return {
    family: "Projet enrichi",
    slug: project.slug,
    title: project.title,
    href: `/primaire/cm2/missions/${project.slug}`,
    status: project.status,
    discipline: project.officialReference?.domain ?? project.mainSubject,
    competency: project.skills[0]?.observable ?? project.objectives[0],
    objective: project.objectives[0] ?? project.synopsis,
    levelCycle: [project.officialReference?.level, project.officialReference?.cycle]
      .filter(Boolean)
      .join(" · "),
    criteria: project.successCriteria,
    evidence: formatList(project.evidence.map((item) => item.description)).join(" · "),
    studentUse: project.felixRole,
    projection: formatList(project.projectableSupports).join(" · "),
    printing: formatList(project.printableSupports).join(" · "),
    lsuLinks: project.lsuLinks?.flatMap((link) =>
      link.items.map((item) => `${link.domain} : ${item}`),
    ),
    crossLinks: project.crossCurricular?.map(
      (link) => `${link.framework} : ${link.description}`,
    ),
    quality: project.qualityStatus
      ? `${project.qualityStatus.state}${project.qualityStatus.note ? ` · ${project.qualityStatus.note}` : ""}`
      : undefined,
  };
}

export function TeacherDashboard({ missions, projects }: TeacherDashboardProps) {
  const missionItems = missions.map(toMissionItem);
  const projectItems = projects.map(toProjectItem);
  const totalItems = missionItems.length + projectItems.length;
  const lsuLinkedProjects = projectItems.filter((item) => item.lsuLinks?.length).length;
  const crossLinkedProjects = projectItems.filter((item) => item.crossLinks?.length).length;

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8" aria-labelledby="teacher-dashboard-title">
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-white/10 pb-6">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky">
            Pilotage pédagogique
          </p>
          <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <h2 id="teacher-dashboard-title" className="text-3xl font-black text-foreground sm:text-4xl">
                Vue enseignant CM2
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                Une lecture commune des missions courtes et des projets enrichis :
                objectifs, compétences, critères de réussite, supports et repères
                d’évaluation, sans suivi individuel ni score.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Metric value={missions.length} label="missions courtes" />
              <Metric value={projects.length} label="projets enrichis" />
              <Metric value={totalItems} label="entrées pilotables" />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <ReferencePanel title="Progression pédagogique" items={progressionStates} />
          <ReferencePanel title="Correspondance LSU" items={lsuScale} />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <SummaryCard
            title="Liens institutionnels"
            lines={[
              `${lsuLinkedProjects} projet(s) Félix avec liens LSU détaillés.`,
              `${crossLinkedProjects} projet(s) avec liens CRCN, EMI, EMC ou EDD.`,
              "Les missions courtes portent un domaine, une compétence et des tags, sans liens LSU détaillés pour l’instant.",
            ]}
          />
          <SummaryCard
            title="Usage classe"
            lines={[
              "Aucune donnée élève, aucun compte, aucun suivi individuel.",
              "Les supports à projeter et à imprimer sont affichés seulement quand ils existent.",
              "Les critères servent de repères rapides pour préparer, observer et corriger.",
            ]}
          />
        </div>

        <DashboardGroup title="Missions CM2 courtes" description="Séances compactes, prêtes à projeter ou à imprimer." items={missionItems} />
        <DashboardGroup title="Projets Félix enrichis" description="Séquences longues avec preuves, différenciation et liens institutionnels quand ils sont renseignés." items={projectItems} />
      </div>
    </section>
  );
}

function DashboardGroup({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: TeacherItem[];
}) {
  return (
    <section className="mt-10">
      <div className="mb-5 flex flex-col justify-between gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-end">
        <div>
          <h3 className="text-2xl font-black text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
          {items.length} entrée{items.length > 1 ? "s" : ""}
        </p>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {items.map((item) => (
          <TeacherItemCard key={`${item.family}-${item.slug}`} item={item} />
        ))}
      </div>
    </section>
  );
}

function TeacherItemCard({ item }: { item: TeacherItem }) {
  return (
    <article className="flex min-h-full flex-col rounded-md border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            {item.family}
          </p>
          <h4 className="mt-2 text-xl font-black text-foreground">{item.title}</h4>
        </div>
        <PublicStatusBadge status={item.status} />
      </div>

      <div className="mt-4 grid gap-3 text-sm">
        <InfoLine label="Domaine" value={item.discipline} />
        <InfoLine label="Compétence" value={item.competency} />
        <InfoLine label="Objectif" value={item.objective} />
        {item.levelCycle ? <InfoLine label="Niveau" value={item.levelCycle} /> : null}
      </div>

      {item.criteria.length > 0 ? (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Critères de réussite
          </p>
          <ul className="mt-2 space-y-2">
            {formatList(item.criteria, 3).map((criterion) => (
              <li key={criterion} className="rounded border border-jade/20 bg-jade/10 p-2 text-sm leading-6 text-muted">
                {criterion}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-4 grid gap-2">
        {item.evidence ? <InfoLine label="Preuve" value={item.evidence} /> : null}
        {item.studentUse ? <InfoLine label="Élève" value={item.studentUse} /> : null}
        {item.projection ? <InfoLine label="Projection" value={item.projection} /> : null}
        {item.printing ? <InfoLine label="Impression" value={item.printing} /> : null}
        {item.quality ? <InfoLine label="Qualité" value={item.quality} /> : null}
      </div>

      {(item.lsuLinks?.length || item.crossLinks?.length) ? (
        <div className="mt-4 grid gap-2">
          {item.lsuLinks?.length ? (
            <TagList label="LSU" items={formatList(item.lsuLinks)} />
          ) : null}
          {item.crossLinks?.length ? (
            <TagList label="Transversal" items={formatList(item.crossLinks)} />
          ) : null}
        </div>
      ) : null}

      <div className="mt-auto pt-5">
        <Link
          href={item.href}
          aria-label={`Ouvrir ${item.family === "Mission courte" ? "la mission" : "le projet"} ${item.title}`}
          className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink"
        >
          Ouvrir
        </Link>
      </div>
    </article>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-white/10 bg-ink/30 p-3">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <p className="mt-1 text-sm leading-6 text-foreground">{value}</p>
    </div>
  );
}

function TagList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-xs leading-5 text-muted">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ReferencePanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
        {title}
      </h3>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-3 rounded border border-white/10 bg-ink/35 p-3">
            <span className="grid size-7 shrink-0 place-items-center rounded bg-sky/10 font-mono text-xs font-black text-sky">
              {index + 1}
            </span>
            <p className="text-sm font-bold text-foreground">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryCard({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
      <h3 className="text-sm font-black text-foreground">{title}</h3>
      <ul className="mt-3 space-y-2">
        {lines.map((line) => (
          <li key={line} className="text-sm leading-6 text-muted">
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.045] p-4">
      <p className="text-2xl font-black text-foreground">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
    </div>
  );
}
