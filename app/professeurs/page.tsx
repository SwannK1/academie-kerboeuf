import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { professorProfiles } from "@/content/professors";
import { getProfessorCharacters } from "@/content/academy-characters";
import {
  ProfessorGallery,
  type ProfessorCardData,
} from "./_components/gallery";

export const metadata: Metadata = {
  title: "Professeurs | Académie Kerboeuf",
  description:
    "Les guides pédagogiques et professeurs de matière de l'Académie Kerboeuf — du CP à la 3e. Chaque guide accompagne un niveau, chaque professeur porte une discipline.",
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

export default function ProfesseursPage() {
  const cardData = toCardData(professorProfiles);
  const subjectTeachers = getProfessorCharacters();

  // Stats dynamiques — guides de niveau uniquement
  const primaire = professorProfiles.filter((p) => p.stage === "primaire").length;
  const college = professorProfiles.filter((p) => p.stage === "college").length;

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
      <Hero professors={cardData} stats={{ primaire, college }} />

      {/* Section 1 : Guides pédagogiques */}
      <SectionHeader
        tag="Guides pédagogiques"
        title="Guides de niveau"
        description="Chaque niveau scolaire est accompagné d'un guide pédagogique. Ces personnages structurent la méthode de travail propre à chaque étape — du CP à la 3e."
      />
      <ProfessorGallery professors={cardData} />

      {/* Section 2 : Professeurs de matière — Élémentaire */}
      <SectionHeader
        tag="Professeurs de matière"
        title="Professeurs élémentaires"
        description="Ces professeurs sont les référents disciplinaires du primaire. Chaque matière a son professeur attitré, reconnaissable à son animal emblématique."
      />
      <SubjectTeachersGrid teachers={subjectTeachers} />

      {/* Section narrative finale */}
      <ClosingSection />
    </main>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────

function SectionHeader({
  tag,
  title,
  description,
}: {
  tag: string;
  title: string;
  description: string;
}) {
  return (
    <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl border-t border-white/10 pt-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
          {tag}
        </p>
        <h2 className="mt-3 text-2xl font-black text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
          {description}
        </p>
      </div>
    </div>
  );
}

// ─── SubjectTeachersGrid ──────────────────────────────────────────────────────

type SubjectTeacher = ReturnType<typeof getProfessorCharacters>[number];

function SubjectTeachersGrid({ teachers }: { teachers: SubjectTeacher[] }) {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8" aria-label="Professeurs de matière — Élémentaire">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teachers.map((teacher) => (
            <SubjectTeacherCard key={teacher.slug} teacher={teacher} />
          ))}
        </div>
        <p className="mt-6 text-xs text-muted/60">
          Les statuts indiquent la disponibilité des ressources pédagogiques associées, pas le personnage lui-même.
        </p>
      </div>
    </section>
  );
}

function SubjectTeacherCard({ teacher }: { teacher: SubjectTeacher }) {
  return (
    <div className="flex flex-col gap-4 rounded-md border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="grid size-12 shrink-0 place-items-center rounded-md border border-white/15 bg-white/[0.04]">
          <span className="text-lg font-black text-foreground/60">
            {teacher.name.charAt(0)}
          </span>
        </div>
        <PublicStatusBadge status={teacher.publicStatus} />
      </div>

      <div>
        <p className="text-base font-black text-foreground">{teacher.name}</p>
        <p className="mt-0.5 text-xs font-bold text-gold">{teacher.mainSubject}</p>
        <p className="mt-0.5 text-xs text-muted/60">{teacher.species}</p>
      </div>

      <p className="text-xs leading-5 text-muted line-clamp-3">
        {teacher.shortDescription}
      </p>

      <div className="flex flex-wrap gap-1 border-t border-white/8 pt-3">
        {teacher.levels.map((level) => (
          <span
            key={level}
            className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-muted"
          >
            {level}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

type HeroProps = {
  professors: ProfessorCardData[];
  stats: { primaire: number; college: number };
};

function Hero({ professors, stats }: HeroProps) {
  // Uniquement les guides de niveau pour les avatars de preview
  const guideAvatars = professors.filter(
    (p) => p.stage === "primaire" || p.stage === "college",
  );

  return (
    <section className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Fond grid */}
      <div className="mission-grid absolute inset-0 -z-20 opacity-20" />

      {/* Double glow : jade haut-gauche, gold bas-droite */}
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

      {/* Trait diagonal Kerboeuf */}
      <div className="map-line absolute inset-x-[-12%] top-[55%] -z-10 h-40 rotate-[-5deg] opacity-15" />

      {/* Watermark de fond */}
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
        <div className="grid gap-12 lg:grid-cols-[1fr_0.65fr] lg:items-start">
          {/* Colonne principale */}
          <div>
            <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
              Équipe pédagogique
            </p>

            <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Guides et
              <br />
              <span className="text-foreground/50">Professeurs</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-muted">
              L&rsquo;Académie Kerboeuf compte deux types de personnages
              pédagogiques : les <strong className="font-bold text-foreground/80">guides de niveau</strong>{" "}
              qui accompagnent chaque étape scolaire, et les{" "}
              <strong className="font-bold text-foreground/80">professeurs de matière</strong>{" "}
              référents pour chaque discipline du primaire.
            </p>

            {/* Avatars preview — guides de niveau */}
            <div className="mt-8 flex flex-wrap gap-2">
              {guideAvatars.map((p) => {
                const glowRgb =
                  p.accentColor === "jade"
                    ? "80,200,164"
                    : p.accentColor === "sky"
                      ? "139,200,255"
                      : p.accentColor === "ember"
                        ? "222,104,72"
                        : "243,196,91";

                const borderClass =
                  p.accentColor === "jade"
                    ? "border-jade/35"
                    : p.accentColor === "sky"
                      ? "border-sky/35"
                      : p.accentColor === "ember"
                        ? "border-ember/35"
                        : "border-gold/35";

                const textClass =
                  p.accentColor === "jade"
                    ? "text-jade"
                    : p.accentColor === "sky"
                      ? "text-sky"
                      : p.accentColor === "ember"
                        ? "text-ember"
                        : "text-gold";

                return (
                  <Link
                    key={p.slug}
                    href={p.profileHref}
                    title={`${p.name} — ${p.role}`}
                    className={`group grid size-12 place-items-center overflow-hidden rounded-md border transition hover:-translate-y-px ${borderClass}`}
                    style={{
                      background: `linear-gradient(135deg, rgba(${glowRgb},0.16), rgba(${glowRgb},0.04))`,
                    }}
                  >
                    {p.avatarImage ? (
                      <Image
                        src={p.avatarImage}
                        alt={p.name}
                        width={96}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className={`text-sm font-black ${textClass}`}>
                        {p.initial}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Panneau de stats */}
          <aside className="rounded-md border border-white/10 bg-white/[0.035] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
              Conseil pédagogique
            </p>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <StatBlock value={String(stats.primaire)} label="Guides primaire" />
              <StatBlock value={String(stats.college)} label="Guides collège" />
              <StatBlock value="7" label="Profs de matière" />
              <StatBlock value="3" label="Cycles couverts" />
            </div>

            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="text-xs leading-6 text-muted">
                Les guides de niveau structurent la méthode de travail étape par
                étape. Les professeurs de matière sont les référents disciplinaires
                du primaire — Français, Maths, Sciences, Histoire-Géo, Arts,
                Musique, EPS.
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/primaire"
                className="inline-flex h-9 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-4 text-xs font-bold text-foreground transition hover:bg-white/[0.08]"
              >
                Niveaux Primaire
              </Link>
              <Link
                href="/college"
                className="inline-flex h-9 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-4 text-xs font-bold text-foreground transition hover:bg-white/[0.08]"
              >
                Niveaux Collège
              </Link>
              <Link
                href="/univers/personnages"
                className="inline-flex h-9 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-4 text-xs font-bold text-foreground transition hover:bg-white/[0.08]"
              >
                Tous les personnages
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-md border border-white/8 bg-white/[0.03] px-4 py-3">
      <p className="text-2xl font-black text-foreground">{value}</p>
      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
    </div>
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
            Les guides de niveau accompagnent les élèves du CP à la 3e, chacun
            avec sa méthode et son atmosphère propres. Les professeurs de matière
            — Hector, Rosa, Mélina, Elian, Pablo, Naïa et Max — sont les référents
            disciplinaires du primaire, présents de façon transversale sur
            l&rsquo;ensemble des niveaux élémentaires. Félix, guide CM2, prépare
            la transition vers le collège.
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
