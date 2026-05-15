import Link from "next/link";
import type { ReactNode } from "react";

type LevelHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  character: string;
  cycle: string;
  ctaHref?: string;
  ctaLabel?: string;
  children?: ReactNode;
};

export function LevelHero({
  eyebrow,
  title,
  description,
  character,
  cycle,
  ctaHref,
  ctaLabel,
  children,
}: LevelHeroProps) {
  const characterInitial = character.trim().charAt(0).toUpperCase() || "A";

  return (
    <section className="relative isolate overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mission-grid absolute inset-0 -z-20 opacity-35" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.12),rgba(9,16,15,0.92))]" />

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-center">
        <div>
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            {description}
          </p>
          {ctaHref && ctaLabel ? (
            <Link
              href={ctaHref}
              className="mt-8 inline-flex rounded-md bg-gold px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
            >
              {ctaLabel}
            </Link>
          ) : null}
        </div>

        <div className="rounded-md border border-white/12 bg-panel/70 p-5 shadow-2xl shadow-black/35">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Dossier niveau
            </span>
            <span className="rounded bg-jade/15 px-2 py-1 font-mono text-xs font-bold text-jade">
              {cycle}
            </span>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <div aria-hidden="true" className="grid size-20 place-items-center rounded-md border border-jade/35 bg-jade/15 text-3xl font-black text-jade">
              {characterInitial}
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky">
                Personnage repère
              </p>
              <h2 className="mt-2 text-3xl font-black text-foreground">
                {character}
              </h2>
            </div>
          </div>
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
