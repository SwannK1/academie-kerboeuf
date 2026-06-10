import Link from "next/link";
import Image from "next/image";
import type { ProfessorCardData } from "./gallery";
import type { AccentColor } from "@/content/professors";

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

// Équipe primaire validée : guides de niveau (CP à CM1) + professeurs de matière officiels.
// Félix (CM2) reste guide de mission, pas professeur de matière — exclu volontairement.
const PRIMAIRE_SUBJECT_TEACHER_SLUGS = [
  "rosa",
  "hector",
  "melina",
  "elias",
  "pablo",
  "naia",
  "max",
];

export function getTeamGroups(profiles: ProfessorCardData[]) {
  const primaire = [
    ...profiles.filter((p) => p.stage === "primaire" && p.slug !== "felix"),
    ...profiles.filter((p) => PRIMAIRE_SUBJECT_TEACHER_SLUGS.includes(p.slug)),
  ];

  const dedupe = (list: ProfessorCardData[]) => {
    const seen = new Set<string>();
    return list.filter((p) => {
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    });
  };

  return {
    maternelle: [] as ProfessorCardData[],
    primaire: dedupe(primaire),
    college: dedupe(profiles.filter((p) => p.stage === "college")),
    lycee: dedupe(profiles.filter((p) => p.stage === "lycee")),
  };
}

type TeamSectionProps = {
  title: string;
  subtitle: string;
  accent: AccentColor;
  professors: ProfessorCardData[];
  emptyLabel: string;
};

function TeamCard({ professor, accent }: { professor: ProfessorCardData; accent: AccentColor }) {
  const glow = ACCENT_GLOW[professor.accentColor ?? accent];
  const border = ACCENT_BORDER[professor.accentColor ?? accent];
  const text = ACCENT_TEXT[professor.accentColor ?? accent];

  return (
    <Link
      href={professor.profileHref}
      className={`group flex items-center gap-4 rounded-md border bg-white/[0.03] p-4 transition hover:-translate-y-px hover:bg-white/[0.055] ${border}`}
    >
      <div
        className={`grid h-14 w-20 shrink-0 place-items-center overflow-hidden rounded-md border ${border}`}
        style={{
          background: `linear-gradient(135deg, rgba(${glow},0.20), rgba(${glow},0.05))`,
        }}
      >
        {professor.avatarImage ? (
          <Image
            src={professor.avatarImage}
            alt={professor.name}
            width={160}
            height={112}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className={`text-xl font-black ${text}`}>{professor.initial}</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-black text-foreground">{professor.name}</p>
        <p className={`mt-0.5 text-xs font-bold ${text}`}>{professor.role}</p>
        <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
          {professor.mainSubject} · {professor.levelLabel}
        </p>
        {professor.description ? (
          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted/80">
            {professor.description}
          </p>
        ) : null}
      </div>

      <span
        aria-hidden="true"
        className={`shrink-0 text-sm font-bold ${text} transition-transform group-hover:translate-x-0.5`}
      >
        →
      </span>
    </Link>
  );
}

function TeamSection({ title, subtitle, accent, professors, emptyLabel }: TeamSectionProps) {
  return (
    <div
      className={`rounded-md border bg-white/[0.025] p-6 ${ACCENT_BORDER[accent]}`}
    >
      <p className={`text-[10px] font-bold uppercase tracking-[0.28em] ${ACCENT_TEXT[accent]}`}>
        {subtitle}
      </p>
      <h3 className="mt-2 text-2xl font-black leading-tight text-foreground">{title}</h3>

      {professors.length > 0 ? (
        <div className="mt-5 grid gap-3">
          {professors.map((professor) => (
            <TeamCard key={professor.slug} professor={professor} accent={accent} />
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

export function TeamSections({ professors }: { professors: ProfessorCardData[] }) {
  const groups = getTeamGroups(professors);

  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-jade">
          L&rsquo;équipe par niveau
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight text-foreground sm:text-4xl">
          Quatre équipes,
          <br />
          un même fil pédagogique
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <TeamSection
            title="Équipe Maternelle"
            subtitle="Petite, Moyenne, Grande section"
            accent="sky"
            professors={groups.maternelle}
            emptyLabel="Équipe maternelle en préparation."
          />
          <TeamSection
            title="Équipe Primaire"
            subtitle="CP au CM2"
            accent="jade"
            professors={groups.primaire}
            emptyLabel="Équipe primaire en préparation."
          />
          <TeamSection
            title="Équipe Collège"
            subtitle="6e à la 3e"
            accent="gold"
            professors={groups.college}
            emptyLabel="Équipe collège en préparation."
          />
          <TeamSection
            title="Équipe Lycée"
            subtitle="Seconde à la Terminale"
            accent="ember"
            professors={groups.lycee}
            emptyLabel="Équipe lycée en préparation."
          />
        </div>
      </div>
    </section>
  );
}
