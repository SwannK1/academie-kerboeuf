import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { professorProfiles } from "@/content/professors";
import {
  ProfessorGallery,
  ProfessorCard,
  type ProfessorCardData,
} from "./_components/gallery";

export const metadata: Metadata = {
  title: "Professeurs | Académie Kerboeuf",
  description:
    "Les professeurs référents de l'Académie Kerboeuf — du CP à la 3e, avec des relais au lycée. Chaque profil porte une méthode, une atmosphère et un rôle pédagogique distinct.",
};

// Projection allégée : on ne passe pas les missions ni la méthode au client
function toCardData(profiles: typeof professorProfiles): ProfessorCardData[] {
  return profiles.map((p) => ({
    slug: p.slug,
    profileHref: p.profileHref,
    name: p.name,
    characterType: p.characterType ?? "professeur référent",
    role: p.role,
    initial: p.initial,
    mainSubject: p.mainSubject,
    symbol: p.symbol,
    description: p.description,
    specialty: p.specialty,
    levelLabel: p.levelLabel,
    cycle: p.cycle,
    stage: p.stage as "primaire" | "college" | "lycee" | "officiel",
    moodName: p.moodName,
    headquarters: p.headquarters,
    accentColor: p.accentColor,
    avatarImage: p.avatarImage,
    dominantTraits: p.personalityProfile?.dominantTraits ?? [],
  }));
}

// Ordre de progression scolaire des guides de niveau
const LEVEL_ORDER = ["CP", "CE1", "CE2", "CM1", "CM2", "6e", "5e", "4e", "3e"];

function sortByLevel(professors: ProfessorCardData[]): ProfessorCardData[] {
  return [...professors].sort((a, b) => {
    const ia = LEVEL_ORDER.indexOf(a.levelLabel);
    const ib = LEVEL_ORDER.indexOf(b.levelLabel);
    if (ia === -1 && ib === -1) return 0;
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

export default function ProfesseursPage() {
  const allCards = toCardData(professorProfiles);
  const levelGuides = sortByLevel(allCards.filter((p) => p.characterType === "professeur référent"));
  const officialPersonalities = allCards.filter((p) => p.characterType === "personnalité officielle");

  return (
    <main>
      {/* Breadcrumb */}
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Professeurs" }]}
          />
        </div>
      </div>

      {/* Hero */}
      <Hero />

      {/* Comprendre l'équipe */}
      <TeamOverview />

      {/* Guides de niveau */}
      <LevelGuidesSection professors={levelGuides} />

      {/* Personnalités officielles */}
      <OfficialPersonalitiesSection professors={officialPersonalities} />

      {/* Galerie filtrée complète */}
      <ProfessorGallery professors={allCards} />

      {/* Section narrative finale */}
      <ClosingSection />
    </main>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Fond grid */}
      <div className="mission-grid absolute inset-0 -z-20 opacity-20" />

      {/* Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10"
        style={{
          inset: 0,
          background: `
            radial-gradient(ellipse 50% 60% at 0% 20%, rgba(80,200,164,0.10), transparent 65%),
            radial-gradient(ellipse 40% 50% at 100% 90%, rgba(243,196,91,0.08), transparent 60%)
          `,
        }}
      />

      {/* Trait diagonal */}
      <div className="map-line absolute inset-x-[-12%] top-[55%] -z-10 h-40 rotate-[-5deg] opacity-15" />

      {/* Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 select-none overflow-hidden"
      >
        <span
          className="block font-black uppercase tracking-tight text-foreground"
          style={{ fontSize: "clamp(4rem, 14vw, 12rem)", opacity: 0.022, lineHeight: 0.85 }}
        >
          ACADÉMIE
        </span>
      </div>

      <div className="mx-auto max-w-7xl">
        <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-jade">
          Portail pédagogique
        </p>

        <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Les professeurs
          <br />
          <span className="text-foreground/50">de l&rsquo;Académie</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-8 text-muted">
          Des repères pédagogiques pour guider les élèves, les matières et les méthodes.
        </p>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted/70">
          Chaque professeur incarne une méthode, une matière ou un niveau. Ils aident à rendre
          l&rsquo;univers de l&rsquo;Académie Kerboeuf lisible du primaire au collège.
        </p>
      </div>
    </section>
  );
}

// ─── Comprendre l'équipe ──────────────────────────────────────────────────────

function TeamOverview() {
  const categories = [
    {
      key: "guides",
      label: "Guides de niveau",
      icon: "◈",
      color: "jade" as const,
      description:
        "Un professeur référent pour chaque niveau, du CP à la 3e. Ils structurent la progression scolaire et donnent une continuité lisible sur toute la scolarité.",
    },
    {
      key: "matieres",
      label: "Personnalités de matière",
      icon: "◇",
      color: "gold" as const,
      description:
        "Des personnages officiels liés à une discipline : lecture, mathématiques, sciences, arts, EPS… Ils incarnent chaque matière de façon mémorable.",
    },
    {
      key: "officielles",
      label: "Personnalités officielles",
      icon: "✦",
      color: "sky" as const,
      description:
        "Figures transversales de l&rsquo;Académie Kerboeuf. Elles habitent l&rsquo;univers pédagogique et enrichissent chaque discipline sans être liées à un niveau précis.",
    },
  ] as const;

  const colorMap = {
    jade: {
      badge: "border-jade/30 bg-jade/10 text-jade",
      icon: "text-jade",
      border: "border-jade/20",
    },
    gold: {
      badge: "border-gold/30 bg-gold/10 text-gold",
      icon: "text-gold",
      border: "border-gold/20",
    },
    sky: {
      badge: "border-sky/30 bg-sky/10 text-sky",
      icon: "text-sky",
      border: "border-sky/20",
    },
  };

  return (
    <section
      aria-labelledby="team-overview-heading"
      className="px-4 pb-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
          Structure de l&rsquo;équipe
        </p>
        <h2
          id="team-overview-heading"
          className="mt-2 text-2xl font-black text-foreground"
        >
          Comprendre l&rsquo;équipe
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {categories.map((cat) => {
            const cm = colorMap[cat.color];
            return (
              <div
                key={cat.key}
                className={`rounded-md border bg-white/[0.025] p-6 ${cm.border}`}
              >
                <p className={`text-lg font-black ${cm.icon}`} aria-hidden="true">
                  {cat.icon}
                </p>
                <p className={`mt-3 rounded border px-2 py-0.5 inline-block text-[10px] font-bold uppercase tracking-[0.14em] ${cm.badge}`}>
                  {cat.label}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">{cat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Guides de niveau ─────────────────────────────────────────────────────────

const PRIMAIRE_LEVELS = ["CP", "CE1", "CE2", "CM1", "CM2"];
const COLLEGE_LEVELS = ["6e", "5e", "4e", "3e"];

function LevelGuidesSection({ professors }: { professors: ProfessorCardData[] }) {
  const primaire = professors.filter((p) => PRIMAIRE_LEVELS.includes(p.levelLabel));
  const college = professors.filter((p) => COLLEGE_LEVELS.includes(p.levelLabel));
  const other = professors.filter(
    (p) => !PRIMAIRE_LEVELS.includes(p.levelLabel) && !COLLEGE_LEVELS.includes(p.levelLabel),
  );

  return (
    <section
      aria-labelledby="level-guides-heading"
      className="px-4 pb-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-jade">
            Progression scolaire
          </p>
          <h2
            id="level-guides-heading"
            className="mt-2 text-2xl font-black text-foreground"
          >
            Guides de niveau
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Un professeur référent pour chaque niveau — du CP à la 3e. Ils donnent une lecture simple
            de la progression et incarnent les méthodes propres à chaque étape.
          </p>
        </div>

        {primaire.length > 0 && (
          <div className="mb-10">
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
              Primaire
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {primaire.map((p) => (
                <LevelGuideCard key={p.slug} professor={p} />
              ))}
            </div>
          </div>
        )}

        {college.length > 0 && (
          <div className="mb-10">
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
              Collège
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {college.map((p) => (
                <LevelGuideCard key={p.slug} professor={p} />
              ))}
            </div>
          </div>
        )}

        {other.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {other.map((p) => (
              <ProfessorCard key={p.slug} professor={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function LevelGuideCard({ professor }: { professor: ProfessorCardData }) {
  const accentRgb =
    professor.accentColor === "jade"
      ? "80,200,164"
      : professor.accentColor === "sky"
        ? "139,200,255"
        : professor.accentColor === "ember"
          ? "222,104,72"
          : "243,196,91";

  const borderClass =
    professor.accentColor === "jade"
      ? "border-jade/25"
      : professor.accentColor === "sky"
        ? "border-sky/25"
        : professor.accentColor === "ember"
          ? "border-ember/25"
          : "border-gold/25";

  const textClass =
    professor.accentColor === "jade"
      ? "text-jade"
      : professor.accentColor === "sky"
        ? "text-sky"
        : professor.accentColor === "ember"
          ? "text-ember"
          : "text-gold";

  const badgeClass =
    professor.accentColor === "jade"
      ? "border-jade/30 bg-jade/10 text-jade"
      : professor.accentColor === "sky"
        ? "border-sky/30 bg-sky/10 text-sky"
        : professor.accentColor === "ember"
          ? "border-ember/30 bg-ember/10 text-ember"
          : "border-gold/30 bg-gold/10 text-gold";

  return (
    <Link
      href={professor.profileHref}
      className={`group relative flex flex-col overflow-hidden rounded-md border bg-white/[0.03] transition-all duration-200 hover:-translate-y-px hover:bg-white/[0.055] ${borderClass}`}
    >
      {/* Ligne accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, rgba(${accentRgb},0.9), rgba(${accentRgb},0.2) 70%, transparent)` }}
      />

      <div className="flex flex-col items-center gap-3 p-5 pt-6 text-center">
        {/* Niveau badge */}
        <span className={`rounded border px-2.5 py-0.5 text-[11px] font-black uppercase tracking-[0.18em] ${badgeClass}`}>
          {professor.levelLabel}
        </span>

        {/* Avatar */}
        <div
          className={`grid h-14 w-20 place-items-center overflow-hidden rounded-md border ${borderClass}`}
          style={{ background: `linear-gradient(135deg, rgba(${accentRgb},0.18), rgba(${accentRgb},0.04))` }}
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
            <span className={`text-2xl font-black ${textClass}`}>{professor.initial}</span>
          )}
        </div>

        {/* Nom */}
        <div>
          <p className="text-sm font-black text-foreground">{professor.name}</p>
          <p className={`mt-0.5 text-xs font-bold ${textClass}`}>{professor.mainSubject}</p>
        </div>
      </div>

      {/* Footer */}
      <div className={`border-t border-white/[0.07] px-4 py-2.5 text-center`}>
        <span className={`text-[11px] font-bold ${textClass} transition-transform group-hover:translate-x-0.5 inline-flex items-center gap-1`}>
          Voir le profil <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

// ─── Personnalités officielles ────────────────────────────────────────────────

function OfficialPersonalitiesSection({ professors }: { professors: ProfessorCardData[] }) {
  if (professors.length === 0) return null;

  return (
    <section
      aria-labelledby="personalities-heading"
      className="px-4 pb-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
            Figures de l&rsquo;Académie
          </p>
          <h2
            id="personalities-heading"
            className="mt-2 text-2xl font-black text-foreground"
          >
            Personnalités officielles
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Des personnages transversaux qui incarnent chaque matière et enrichissent l&rsquo;univers de
            l&rsquo;Académie Kerboeuf. Ils ne sont pas liés à un niveau précis mais à une discipline.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {professors.map((p) => (
            <ProfessorCard key={p.slug} professor={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section narrative finale ─────────────────────────────────────────────────

function ClosingSection() {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.025] p-10">
          {/* Glow de fond */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 0% 100%, rgba(80,200,164,0.05), transparent 60%)",
            }}
          />

          {/* Watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-4 select-none"
          >
            <span
              className="block font-black uppercase leading-none text-foreground"
              style={{ fontSize: "clamp(2rem,6vw,5rem)", opacity: 0.035 }}
            >
              KERBOEUF
            </span>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-jade">
            L&rsquo;équipe pédagogique
          </p>

          <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight text-foreground sm:text-4xl">
            Une équipe pensée
            <br />
            comme un univers
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
            Les professeurs de l&rsquo;Académie Kerboeuf ne sont pas des fiches de présentation —
            ils sont les gardiens de méthodes distinctes, d&rsquo;atmosphères de travail, de façons
            d&rsquo;entrer dans l&rsquo;apprentissage. Ensemble, ils donnent une continuité lisible
            du CP à la 3e.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/primaire/cm2/missions"
              className="inline-flex h-11 items-center justify-center rounded-md bg-gold px-6 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
            >
              Missions CM2 avec Félix
            </Link>
            <Link
              href="/primaire"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-6 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
            >
              Niveaux primaire
            </Link>
            <Link
              href="/college"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-6 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
            >
              Niveaux collège
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
