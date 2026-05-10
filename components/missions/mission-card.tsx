import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";

export type MissionCardData = {
  slug: string;
  title: string;
  description: string;
  subject: string;
  status: unknown;
  objective?: string;
  skill?: string;
  difficulty?: string;
  professorName?: string;
  professorSlug?: string;
  associatedCharacter?: string;
  theme: {
    name: string;
    accentClass: string;
    surfaceClass: string;
    textClass: string;
    ringClass: string;
  };
};

type MissionCardProps = {
  mission: MissionCardData;
  index: number;
  linkBasePath?: string | null;
};

export function MissionCard({ mission, index, linkBasePath }: MissionCardProps) {
  const cardClassName = `group relative block overflow-hidden rounded-md border bg-white/[0.045] p-5 ${mission.theme.ringClass}`;
  const linkedClassName = `${cardClassName} transition hover:-translate-y-1 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-gold/70`;
  const staticClassName = `${cardClassName} cursor-default`;
  const content = (
    <>
      <div
        className={`absolute inset-x-0 top-0 h-1 ${mission.theme.accentClass}`}
      />
      <div className="flex items-start justify-between gap-4">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-md border font-mono text-sm font-black ${mission.theme.surfaceClass} ${mission.theme.textClass} ${mission.theme.ringClass}`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <PublicStatusBadge status={mission.status} />
      </div>

      <div className="mt-6">
        <p
          className={`text-xs font-bold uppercase tracking-[0.2em] ${mission.theme.textClass}`}
        >
          {mission.subject}
        </p>
        <h3 className="mt-3 text-2xl font-black text-foreground">
          {mission.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-muted">
          {mission.description}
        </p>
      </div>

      {mission.objective || mission.skill ? (
        <div className="mt-5 grid gap-3">
          {mission.objective ? (
            <p className="rounded border border-white/10 bg-ink/35 p-3 text-xs leading-6 text-muted">
              <span className="font-bold text-foreground">Objectif : </span>
              {mission.objective}
            </p>
          ) : null}
          {mission.skill ? (
            <p className="rounded border border-white/10 bg-ink/35 p-3 text-xs leading-6 text-muted">
              <span className="font-bold text-foreground">Compétence : </span>
              {mission.skill}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
          Thème
        </span>
        <span className={`text-sm font-bold ${mission.theme.textClass}`}>
          {mission.theme.name}
        </span>
      </div>

      {mission.difficulty || mission.professorName ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {mission.difficulty ? (
            <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-muted">
              {mission.difficulty}
            </span>
          ) : null}
          {mission.professorName ? (
            <span className="rounded border border-gold/25 bg-gold/10 px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-gold">
              {mission.professorName}
            </span>
          ) : null}
          {mission.associatedCharacter ? (
            <span className="rounded border border-jade/25 bg-jade/10 px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-jade">
              {mission.associatedCharacter}
            </span>
          ) : null}
        </div>
      ) : null}
    </>
  );

  if (linkBasePath) {
    return (
      <Link href={`${linkBasePath}/${mission.slug}`} className={linkedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <article className={staticClassName} aria-label={mission.title}>
      {content}
      <div className="mt-4 inline-flex rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
        Détail non disponible
      </div>
    </article>
  );
}
