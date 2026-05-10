import type { AcademyCharacter } from "@/content/felix-types";

type CharacterHeroProps = {
  character: AcademyCharacter;
  accentColor?: "jade" | "gold" | "sky" | "ember";
};

const colorMap = {
  jade: {
    eyebrow: "border-jade/35 bg-jade/10 text-jade",
    accent: "text-jade",
    badge: "border-jade/25 bg-jade/10 text-jade",
    bar: "bg-jade",
  },
  gold: {
    eyebrow: "border-gold/35 bg-gold/10 text-gold",
    accent: "text-gold",
    badge: "border-gold/25 bg-gold/10 text-gold",
    bar: "bg-gold",
  },
  sky: {
    eyebrow: "border-sky/35 bg-sky/10 text-sky",
    accent: "text-sky",
    badge: "border-sky/25 bg-sky/10 text-sky",
    bar: "bg-sky",
  },
  ember: {
    eyebrow: "border-ember/35 bg-ember/10 text-ember",
    accent: "text-ember",
    badge: "border-ember/25 bg-ember/10 text-ember",
    bar: "bg-ember",
  },
};

export function CharacterHero({
  character,
  accentColor = "jade",
}: CharacterHeroProps) {
  const c = colorMap[accentColor];

  return (
    <section
      className="px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="felix-hero-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.65fr] lg:items-start">
          <div>
            <p
              className={`inline-flex rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] ${c.eyebrow}`}
            >
              {character.species} · Guide du {character.level}
            </p>
            <h2
              id="felix-hero-title"
              className="mt-6 text-4xl font-black leading-[0.98] text-foreground sm:text-5xl"
            >
              {character.name}
            </h2>
            <p className={`mt-3 text-xl font-bold ${c.accent}`}>
              {character.role.split("—")[1]?.trim() ?? character.role}
            </p>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted">
              {character.biography}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted italic">
              {character.personality}
            </p>
          </div>

          <div className="space-y-4">
            <CharacterPanel title="Forces" items={character.strengths} color={accentColor} />
            <CharacterPanel title="Ce qui l'anime" items={character.motivations.slice(0, 2)} color={accentColor} />
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoBlock title="Ton de voix" text={character.voiceTone} accentClass={c.bar} />
          <InfoBlock
            title="Points d'attention"
            text={character.vulnerabilities[0]}
            accentClass={c.bar}
          />
          <InfoBlock
            title="Mission principale"
            text={character.motivations[0]}
            accentClass={c.bar}
          />
        </div>
      </div>
    </section>
  );
}

function CharacterPanel({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: keyof typeof colorMap;
}) {
  const c = colorMap[color];
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${c.accent}`}>
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-muted">
            <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${c.bar}`} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoBlock({
  title,
  text,
  accentClass,
}: {
  title: string;
  text: string;
  accentClass: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
      <div className={`mb-3 h-0.5 w-8 rounded-full ${accentClass}`} aria-hidden="true" />
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{title}</p>
      <p className="mt-2 text-sm leading-7 text-foreground">{text}</p>
    </div>
  );
}
