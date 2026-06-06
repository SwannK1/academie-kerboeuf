import Link from "next/link";
import type { ProfessorProfile, AccentColor } from "@/content/professors";

const ACCENT: Record<
  AccentColor,
  {
    text: string;
    borderMid: string;
    badge: string;
    glowRgb: string;
  }
> = {
  gold: {
    text: "text-gold",
    borderMid: "border-gold/20",
    badge: "border-gold/30 bg-gold/10 text-gold",
    glowRgb: "243,196,91",
  },
  jade: {
    text: "text-jade",
    borderMid: "border-jade/20",
    badge: "border-jade/30 bg-jade/10 text-jade",
    glowRgb: "80,200,164",
  },
  sky: {
    text: "text-sky",
    borderMid: "border-sky/20",
    badge: "border-sky/30 bg-sky/10 text-sky",
    glowRgb: "139,200,255",
  },
  ember: {
    text: "text-ember",
    borderMid: "border-ember/20",
    badge: "border-ember/30 bg-ember/10 text-ember",
    glowRgb: "222,104,72",
  },
};

function ac(professor: ProfessorProfile) {
  return ACCENT[professor.accentColor ?? "gold"];
}

export function ProfessorNavigation({ professor }: { professor: ProfessorProfile }) {
  const a = ac(professor);

  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          className={`rounded-md border ${a.borderMid} p-8`}
          style={{
            background: `linear-gradient(135deg, rgba(${a.glowRgb},0.06), rgba(${a.glowRgb},0.02))`,
          }}
        >
          <p className={`text-xs font-bold uppercase tracking-[0.22em] ${a.text}`}>
            Explorer davantage
          </p>
          <h2 className="mt-4 text-3xl font-black text-foreground">
            Continuer avec {professor.name}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
            {professor.levelDescription}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={professor.missionsPath}
              className={`inline-flex h-11 items-center justify-center rounded-md border px-6 text-sm font-extrabold transition hover:opacity-90 ${a.badge}`}
            >
              Missions {professor.levelLabel}
            </Link>
            <Link
              href="/missions-recentes"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-6 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Missions récentes
            </Link>
            <Link
              href="/ressources"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-6 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Ressources
            </Link>
            <Link
              href="/parcours"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-6 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Parcours
            </Link>
            <Link
              href={professor.levelPath}
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-6 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Niveau {professor.levelLabel}
            </Link>
            <Link
              href="/personnages"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-6 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Galerie
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
