import Link from "next/link";
import type { AcademyLevel } from "@/content/academy";
import { getLevelPath } from "@/content/academy";
import type { ProgramStatus } from "@/content/program-types";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";

type LevelCardProps = {
  level: AcademyLevel;
  status?: ProgramStatus;
};

export function LevelCard({ level, status }: LevelCardProps) {
  return (
    <Link
      href={getLevelPath(level)}
      aria-label={`Explorer ${level.label} – Professeur référent : ${level.professor.name}`}
      className="group rounded-md border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-gold/35 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-gold/70"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-jade">
            {level.cycle}
          </p>
          <h2 className="mt-4 text-3xl font-black text-foreground">
            {level.label}
          </h2>
        </div>
        <div className="flex flex-col items-end gap-2">
          {status !== undefined && <PublicStatusBadge status={status} />}
          <span aria-hidden="true" className="grid size-11 place-items-center rounded-md border border-gold/35 bg-gold/10 text-lg font-black text-gold">
            {level.professor.initial}
          </span>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-muted">{level.description}</p>
      <div className="mt-6 border-t border-white/10 pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
          Professeur référent
        </p>
        <p className="mt-2 text-sm font-bold text-foreground">
          {level.professor.name}
        </p>
      </div>
    </Link>
  );
}
