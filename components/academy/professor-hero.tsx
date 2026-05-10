import Image from "next/image";
import type { ProfessorProfile, AccentColor } from "@/content/professors";

const ACCENT: Record<
  AccentColor,
  {
    text: string;
    textMuted: string;
    border: string;
    borderMid: string;
    bg: string;
    bgDeep: string;
    badge: string;
    glowRgb: string;
  }
> = {
  gold: {
    text: "text-gold",
    textMuted: "text-gold/70",
    border: "border-gold/35",
    borderMid: "border-gold/20",
    bg: "bg-gold/[0.07]",
    bgDeep: "bg-gold/[0.04]",
    badge: "border-gold/30 bg-gold/10 text-gold",
    glowRgb: "243,196,91",
  },
  jade: {
    text: "text-jade",
    textMuted: "text-jade/70",
    border: "border-jade/35",
    borderMid: "border-jade/20",
    bg: "bg-jade/[0.07]",
    bgDeep: "bg-jade/[0.04]",
    badge: "border-jade/30 bg-jade/10 text-jade",
    glowRgb: "80,200,164",
  },
  sky: {
    text: "text-sky",
    textMuted: "text-sky/70",
    border: "border-sky/35",
    borderMid: "border-sky/20",
    bg: "bg-sky/[0.07]",
    bgDeep: "bg-sky/[0.04]",
    badge: "border-sky/30 bg-sky/10 text-sky",
    glowRgb: "139,200,255",
  },
  ember: {
    text: "text-ember",
    textMuted: "text-ember/70",
    border: "border-ember/35",
    borderMid: "border-ember/20",
    bg: "bg-ember/[0.07]",
    bgDeep: "bg-ember/[0.04]",
    badge: "border-ember/30 bg-ember/10 text-ember",
    glowRgb: "222,104,72",
  },
};

function ac(professor: ProfessorProfile) {
  return ACCENT[professor.accentColor ?? "gold"];
}

function ProfessorAvatar({
  professor,
  size = "lg",
}: {
  professor: ProfessorProfile;
  size?: "sm" | "lg";
}) {
  const a = ac(professor);
  const isLg = size === "lg";
  const width = isLg ? 384 : 160;
  const height = isLg ? 256 : 112;

  const containerClass = isLg
    ? `grid aspect-[3/2] w-full max-w-sm shrink-0 place-items-center overflow-hidden rounded-md border ${a.border}`
    : `grid h-14 w-20 shrink-0 place-items-center overflow-hidden rounded-md border ${a.border}`;

  const gradientStyle = {
    background: `linear-gradient(135deg, rgba(${a.glowRgb},0.22), rgba(${a.glowRgb},0.06))`,
  };

  if (professor.avatarImage) {
    return (
      <div className={containerClass} style={gradientStyle}>
        <Image
          src={professor.avatarImage}
          alt={professor.name}
          width={width}
          height={height}
          className="h-full w-full object-cover"
          priority={isLg}
        />
      </div>
    );
  }

  return (
    <div className={containerClass} style={gradientStyle}>
      <span className={`${isLg ? "text-6xl" : "text-2xl"} font-black ${a.text}`}>
        {professor.initial}
      </span>
    </div>
  );
}

export { ProfessorAvatar };

export function ProfessorHero({ professor }: { professor: ProfessorProfile }) {
  const a = ac(professor);

  return (
    <section className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Grid de fond */}
      <div className="mission-grid absolute inset-0 -z-20 opacity-20" />

      {/* Glow radial de l'accent couleur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10"
        style={{
          inset: 0,
          background: `radial-gradient(ellipse 55% 70% at 0% 50%, rgba(${a.glowRgb},0.13), transparent 70%)`,
        }}
      />

      {/* Trait diagonal Kerboeuf */}
      <div className="map-line absolute inset-x-[-12%] top-[60%] -z-10 h-40 rotate-[-6deg] opacity-20" />

      {/* Watermark — nom du lieu en fond */}
      {professor.headquarters ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 select-none overflow-hidden"
        >
          <span
            className="block font-black uppercase leading-none tracking-tight text-foreground"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)", opacity: 0.028 }}
          >
            {professor.headquarters}
          </span>
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          {/* Avatar */}
          <div className="relative shrink-0">
            <ProfessorAvatar professor={professor} size="lg" />
            {/* Glow derrière l'avatar */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 rounded-md blur-2xl"
              style={{ background: `rgba(${a.glowRgb},0.18)`, transform: "scale(1.6)" }}
            />
          </div>

          {/* Contenu */}
          <div className="min-w-0 flex-1">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-md border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${a.badge}`}>
                {professor.mainSubject}
              </span>
              <span className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-muted">
                {professor.levelLabel} · {professor.cycle}
              </span>
              <span className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-muted">
                {professor.moodName}
              </span>
              {professor.headquarters ? (
                <span className={`rounded-md border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${a.textMuted} ${a.borderMid} ${a.bgDeep}`}>
                  {professor.headquarters}
                </span>
              ) : null}
            </div>

            {/* Nom */}
            <h1 className="mt-6 text-5xl font-black leading-[0.93] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {professor.name}
            </h1>

            {/* Rôle */}
            <p className={`mt-3 text-xl font-bold ${a.text}`}>{professor.role}</p>

            {/* Bio */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted">{professor.bio}</p>

            {/* Symbole */}
            <div className="mt-6 flex items-center gap-3">
              <div className={`h-px w-8 ${a.bg} border-t ${a.borderMid}`} />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
                {professor.symbol}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
