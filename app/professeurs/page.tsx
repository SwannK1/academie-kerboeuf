import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { professorProfiles } from "@/content/professors";
import {
  ProfessorGallery,
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

export default function ProfesseursPage() {
  const cardData = toCardData(professorProfiles);

  // Stats dynamiques
  const primaire = professorProfiles.filter((p) => p.stage === "primaire").length;
  const college = professorProfiles.filter((p) => p.stage === "college").length;
  const cycles = [...new Set(professorProfiles.map((p) => p.cycle))].length;

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

      {/* Hero cinématique */}
      <Hero professors={cardData} stats={{ primaire, college, cycles }} />

      {/* Section Maternelle */}
      <MaternelleSection />

      {/* Galerie filtrée (client) */}
      <ProfessorGallery professors={cardData} />

      {/* Section narrative finale */}
      <ClosingSection />
    </main>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

type HeroProps = {
  professors: ProfessorCardData[];
  stats: { primaire: number; college: number; cycles: number };
};


function Hero({ professors, stats }: HeroProps) {
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
              Galerie officielle
            </p>

            <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Les Professeurs
              <br />
              <span className="text-foreground/50">de l&rsquo;Académie</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-muted">
              Chaque professeur est un univers. Chaque univers a sa méthode.
              Chaque méthode laisse une trace — des premiers apprentissages
              jusqu&rsquo;aux synthèses avancées.
            </p>

            {/* Avatars preview */}
            <div className="mt-8 flex flex-wrap gap-2">
              {professors.map((p) => {
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
              <StatBlock value={String(professors.length)} label="Professeurs" />
              <StatBlock value={String(stats.cycles)} label="Cycles" />
              <StatBlock value={String(stats.primaire)} label="Niveau primaire" />
              <StatBlock value={String(stats.college)} label="Niveau collège" />
            </div>

            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="text-xs leading-6 text-muted">
                Chaque professeur est un repère visuel et méthodologique, pas un
                compte ou une progression sauvegardée. Ils structurent l&rsquo;univers
                pédagogique de l&rsquo;Académie Kerboeuf du CP à la 3e, avec des
                relais au lycée.
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
                href="/lycee"
                className="inline-flex h-9 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-4 text-xs font-bold text-foreground transition hover:bg-white/[0.08]"
              >
                Niveaux Lycée
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

// ─── Section Maternelle ───────────────────────────────────────────────────────

const maternelleLevels = [
  {
    slug: "ps",
    label: "Petite Section",
    short: "PS",
    href: "/maternelle/ps",
    age: "3 ans",
  },
  {
    slug: "ms",
    label: "Moyenne Section",
    short: "MS",
    href: "/maternelle/ms",
    age: "4 ans",
  },
  {
    slug: "gs",
    label: "Grande Section",
    short: "GS",
    href: "/maternelle/gs",
    age: "5 ans",
  },
] as const;

const maternelleDomains = [
  {
    number: "1",
    label: "Mobiliser le langage dans toutes ses dimensions",
    icon: "◎",
  },
  {
    number: "2",
    label: "Agir, s’exprimer, comprendre à travers l’activité physique",
    icon: "◎",
  },
  {
    number: "3",
    label: "Agir, s’exprimer, comprendre à travers les activités artistiques",
    icon: "◎",
  },
  {
    number: "4",
    label: "Construire les premiers outils pour structurer sa pensée",
    icon: "◎",
  },
  {
    number: "5",
    label: "Explorer le monde",
    icon: "◎",
  },
] as const;

function MaternelleSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* En-tête de section */}
        <div className="mb-10">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-jade">
            Maternelle
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-foreground sm:text-4xl">
            Les repères de la maternelle
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            En maternelle, les personnages et enseignants-guides accompagnent
            les enfants dans les 5 grands domaines d&rsquo;apprentissage, avec
            une approche douce, concrète, orale, motrice et manipulatoire.
            Chaque niveau a son propre rythme et ses propres repères.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          {/* Colonne gauche : niveaux + statut */}
          <div className="space-y-6">
            {/* Niveaux PS / MS / GS */}
            <div className="grid gap-3 sm:grid-cols-3">
              {maternelleLevels.map((level) => (
                <Link
                  key={level.slug}
                  href={level.href}
                  className="group relative overflow-hidden rounded-md border border-jade/20 bg-jade/[0.04] p-4 transition hover:border-jade/40 hover:bg-jade/[0.08]"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-jade/70">
                    {level.age}
                  </p>
                  <p className="mt-1 text-2xl font-black text-foreground">
                    {level.short}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{level.label}</p>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-3 text-[10px] font-bold text-jade/30 transition group-hover:text-jade/60"
                  >
                    →
                  </div>
                </Link>
              ))}
            </div>

            {/* Statut des personnages maternelle */}
            <div className="rounded-md border border-white/10 bg-white/[0.025] p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/10">
                  <span className="text-[10px] font-black text-gold">~</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">
                    Personnages maternelle — en préparation
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Les guides-personnages dédiés à la maternelle (PS, MS, GS)
                    ne sont pas encore définis. Cette section accueillera leurs
                    profils dès qu&rsquo;ils seront créés.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite : 5 domaines */}
          <div className="rounded-md border border-white/10 bg-white/[0.02] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-jade">
              5 domaines d&rsquo;apprentissage
            </p>
            <ul className="mt-4 space-y-3">
              {maternelleDomains.map((domain) => (
                <li key={domain.number} className="flex gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded text-[10px] font-black text-jade/60">
                    {domain.number}
                  </span>
                  <span className="text-xs leading-5 text-muted">
                    {domain.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-white/8 pt-5">
              <Link
                href="/maternelle"
                className="inline-flex h-9 items-center justify-center rounded-md border border-jade/25 bg-jade/[0.06] px-4 text-xs font-bold text-jade transition hover:bg-jade/[0.12]"
              >
                Explorer la maternelle
              </Link>
            </div>
          </div>
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
            Les neuf professeurs de l&rsquo;Académie Kerboeuf ne sont pas des fiches
            de présentation — ils sont les gardiens de neuf méthodes distinctes,
            neuf atmosphères de travail, neuf façons d&rsquo;entrer dans l&rsquo;apprentissage.
            Ensemble, ils donnent une continuité lisible du CP à la 3e, puis
            certains prolongent leur rôle dans les pages lycée.
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
