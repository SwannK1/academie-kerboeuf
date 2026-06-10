import Image from "next/image";
import Link from "next/link";
import type { AccentColor } from "@/content/professors";

export type PersonCardData = {
  slug: string;
  profileHref?: string;
  name: string;
  role: string;
  subtitle: string;
  description?: string;
  initial: string;
  avatarImage?: string;
  accentColor?: AccentColor;
};

const ACCENT_GLOW: Record<AccentColor, string> = {
  gold: "243,196,91",
  jade: "80,200,164",
  sky: "139,200,255",
  ember: "222,104,72",
};

const ACCENT_TEXT: Record<AccentColor, string> = {
  gold: "text-gold",
  jade: "text-jade",
  sky: "text-sky",
  ember: "text-ember",
};

const ACCENT_BORDER: Record<AccentColor, string> = {
  gold: "border-gold/30",
  jade: "border-jade/30",
  sky: "border-sky/30",
  ember: "border-ember/30",
};

function PersonCard({ person, accent }: { person: PersonCardData; accent: AccentColor }) {
  const cardAccent = person.accentColor ?? accent;
  const glow = ACCENT_GLOW[cardAccent];
  const border = ACCENT_BORDER[cardAccent];
  const text = ACCENT_TEXT[cardAccent];

  const content = (
    <>
      <div
        className={`grid h-14 w-20 shrink-0 place-items-center overflow-hidden rounded-md border ${border}`}
        style={{
          background: `linear-gradient(135deg, rgba(${glow},0.20), rgba(${glow},0.05))`,
        }}
      >
        {person.avatarImage ? (
          <Image
            src={person.avatarImage}
            alt={person.name}
            width={160}
            height={112}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className={`text-xl font-black ${text}`}>{person.initial}</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-black text-foreground">{person.name}</p>
        <p className={`mt-0.5 text-xs font-bold ${text}`}>{person.role}</p>
        <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
          {person.subtitle}
        </p>
        {person.description ? (
          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted/80">
            {person.description}
          </p>
        ) : null}
      </div>
    </>
  );

  if (person.profileHref) {
    return (
      <Link
        href={person.profileHref}
        className={`group flex items-center gap-4 rounded-md border bg-white/[0.03] p-4 transition hover:-translate-y-px hover:bg-white/[0.055] ${border}`}
      >
        {content}
        <span
          aria-hidden="true"
          className={`shrink-0 text-sm font-bold ${text} transition-transform group-hover:translate-x-0.5`}
        >
          →
        </span>
      </Link>
    );
  }

  return (
    <div className={`flex items-center gap-4 rounded-md border bg-white/[0.03] p-4 ${border}`}>
      {content}
    </div>
  );
}

export function TeamSection({
  title,
  subtitle,
  accent,
  people,
  emptyLabel,
}: {
  title: string;
  subtitle: string;
  accent: AccentColor;
  people: PersonCardData[];
  emptyLabel: string;
}) {
  return (
    <div className={`rounded-md border bg-white/[0.025] p-6 ${ACCENT_BORDER[accent]}`}>
      <p className={`text-[10px] font-bold uppercase tracking-[0.28em] ${ACCENT_TEXT[accent]}`}>
        {subtitle}
      </p>
      <h2 className="mt-2 text-2xl font-black leading-tight text-foreground">{title}</h2>

      {people.length > 0 ? (
        <div className="mt-5 grid gap-3">
          {people.map((person) => (
            <PersonCard key={person.slug} person={person} accent={accent} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-md border border-dashed border-white/15 bg-white/[0.02] p-5">
          <p className="text-sm font-bold text-muted">{emptyLabel}</p>
        </div>
      )}
    </div>
  );
}
